(() => {
  'use strict';

  const SOURCE = 'lichess-review-engine';

  function send(data) {
    window.postMessage(
      {
        source: SOURCE,
        ...data
      },
      '*'
    );
  }

  function scoreValue(value) {
    if (!value) return null;

    if (typeof value.cp === 'number') {
      return value.cp;
    }

    if (typeof value.mate === 'number') {
      return value.mate > 0 ? 100000 : -100000;
    }

    return null;
  }

  function parseFen(fen) {
    if (!fen) return null;

    const board = [];

    for (const row of fen.split(' ')[0].split('/')) {
      for (const ch of row) {
        if (ch >= '1' && ch <= '8') {
          for (let i = 0; i < Number(ch); i++) {
            board.push(null);
          }
        } else {
          board.push(ch);
        }
      }
    }

    return board.length === 64 ? board : null;
  }

  function squareIndex(square) {
    if (!square || square.length !== 2) return -1;

    const file = square.charCodeAt(0) - 97;
    const rank = Number(square[1]);

    if (
      file < 0 ||
      file > 7 ||
      rank < 1 ||
      rank > 8
    ) {
      return -1;
    }

    return (8 - rank) * 8 + file;
  }

  function pieceValue(piece) {
    if (!piece) return 0;

    switch (piece.toLowerCase()) {
      case 'p': return 1;
      case 'n': return 3;
      case 'b': return 3;
      case 'r': return 5;
      case 'q': return 9;
      case 'k': return 100;
      default: return 0;
    }
  }

  function isBrilliant(
    parentEval,
    ev,
    parent,
    node,
    playedMove,
    rank,
    loss,
    moverIsWhite
  ) {
    try {
      /*
       * ================================================
       * BRILLIANT - CUSTOM RULE
       * ================================================
       *
       * loss <= 0.50
       *
       * The moved piece must be N/B/R/Q.
       *
       * BEFORE:
       *   It must NOT have a LEGAL enemy capture.
       *
       * AFTER:
       *   It must be ATTACKED by the enemy.
       *
       * DEFENSE:
       *   If any friendly piece attacks the square,
       *   the piece is considered protected.
       *
       * IMPORTANT:
       *
       * AFTER uses attackers(), not legal captures().
       * Therefore:
       *
       *   pinned attacker
       *   attacker while in check
       *   king-safety restriction
       *
       * can still make the piece "look capturable",
       * which is what this custom rule wants.
       *
       * Best + Brilliant => Brilliant.
       */

      if (
        !Number.isFinite(loss) ||
        loss > 0.50
      ) {
        return false;
      }

      const Chess =
        globalThis.LGRChess;

      if (
        typeof Chess !== 'function'
      ) {
        return false;
      }

      const parentFen =
        parent?.fen ??
        parentEval?.fen ??
        null;

      const childFen =
        node?.fen ??
        ev?.fen ??
        null;

      if (
        !parentFen ||
        !childFen
      ) {
        return false;
      }

      let before;
      let after;

      try {
        before =
          new Chess(parentFen);

        after =
          new Chess(childFen);
      } catch {
        return false;
      }

      const from =
        playedMove.slice(0, 2);

      const to =
        playedMove.slice(2, 4);

      const movedPiece =
        before.get(from);

      if (!movedPiece) {
        return false;
      }

      /*
       * Only piece sacrifices:
       * Knight / Bishop / Rook / Queen.
       */
      if (
        !['n', 'b', 'r', 'q']
          .includes(movedPiece.type)
      ) {
        return false;
      }

      /*
       * Make sure the moved piece is really on the
       * destination square after the move.
       */
      const afterPiece =
        after.get(to);

      if (
        !afterPiece ||
        afterPiece.color !==
          movedPiece.color ||
        afterPiece.type !==
          movedPiece.type
      ) {
        return false;
      }

      const moverColor =
        movedPiece.color;

      const enemyColor =
        moverColor === 'w'
          ? 'b'
          : 'w';

      /*
       * ==================================================
       * 1. BEFORE THE MOVE
       *
       * Was there an ACTUAL LEGAL enemy capture?
       *
       * If yes, the piece was already hanging.
       *
       * Example:
       * enemy piece attacks it but is pinned:
       *
       * attackers()  -> YES
       * legal move    -> NO
       *
       * Therefore the piece is NOT considered hanging
       * before the move.
       * ==================================================
       */
      const enemyLegalMovesBefore =
        before.moves({
          color: enemyColor,
          verbose: true
        });

      const capturableBefore =
        enemyLegalMovesBefore.some(
          move =>
            move.to === from &&
            Boolean(move.captured)
        );

      if (capturableBefore) {
        return false;
      }

      /*
       * ==================================================
       * 2. AFTER THE MOVE
       *
       * Is the sacrificed piece ATTACKED?
       *
       * Deliberately use attackers(), NOT moves().
       *
       * This means a pinned enemy piece still counts
       * as attacking the square.
       * ==================================================
       */
      const attackersAfter =
        after.attackers(
          to,
          enemyColor
        );

      if (
        !attackersAfter ||
        attackersAfter.length === 0
      ) {
        return false;
      }

      /*
       * ==================================================
       * 3. PROTECTION
       *
       * If one of our pieces attacks the destination
       * square, consider the sacrificed piece protected.
       *
       * User rule:
       * protected => NOT Brilliant.
       *
       * We intentionally use attackers() here because
       * "protected" means another friendly piece controls
       * the square.
       * ==================================================
       */
      const defendersAfter =
        after.attackers(
          to,
          moverColor
        );

      if (
        defendersAfter &&
        defendersAfter.length > 0
      ) {
        return false;
      }

      /*
       * ==================================================
       * 4. SUCCESS
       * ==================================================
       */
      return true;

    } catch {
      return false;
    }
  }


  function classify(ctrl, ev, path, threatMode) {
    try {
      if (
        threatMode ||
        !ev ||
        !ctrl
      ) {
        return null;
      }

      const nodes =
        ctrl.tree.getNodeList(path);

      if (
        !nodes ||
        nodes.length < 2
      ) {
        return null;
      }

      const node =
        nodes[nodes.length - 1];

      const parent =
        nodes[nodes.length - 2];

      const parentEval =
        parent?.ceval;

      if (
        !node?.uci ||
        !parentEval
      ) {
        return null;
      }

      const playedMove =
        node.uci;

      const pvs =
        Array.isArray(parentEval.pvs)
          ? parentEval.pvs
          : [];

      if (!pvs.length) {
        return null;
      }

      /*
       * Lichess ceval scores are WHITE POV.
       * Convert exactly once to the mover's POV.
       */
      const parentPly =
        Number.isFinite(parent?.ply)
          ? parent.ply
          : Math.max(0, nodes.length - 2);

      const moverIsWhite =
        parentPly % 2 === 0;

      const moverScore = value => {
        const raw = scoreValue(value);

        if (raw === null) {
          return null;
        }

        return moverIsWhite
          ? raw
          : -raw;
      };

      const bestPv =
        pvs[0] ?? null;

      const secondPv =
        pvs[1] ?? null;

      const thirdPv =
        pvs[2] ?? null;

      const bestMove =
        bestPv?.moves?.[0] ??
        parentEval.bestmove ??
        null;

      if (!bestMove) {
        return null;
      }

      const bestScore =
        moverScore(bestPv);

      const secondScore =
        moverScore(secondPv);

      const thirdScore =
        moverScore(thirdPv);

      if (bestScore === null) {
        return null;
      }

      /*
       * Determine actual rank inside MultiPV.
       */
      let rank = null;

      for (let i = 0; i < pvs.length; i++) {
        if (
          pvs[i]?.moves?.[0] ===
          playedMove
        ) {
          rank = i + 1;
          break;
        }
      }

      /*
       * If it is engine bestmove but was omitted from
       * the MultiPV array, it is still Best.
       */
      if (
        rank === null &&
        playedMove === bestMove
      ) {
        rank = 1;
      }

      /*
       * Played move evaluation.
       */
      let playedScore = null;

      for (const pv of pvs) {
        if (
          pv?.moves?.[0] ===
          playedMove
        ) {
          playedScore =
            moverScore(pv);
          break;
        }
      }

      /*
       * If absent from MultiPV, evaluate the resulting node.
       */
      if (playedScore === null) {
        const afterWhite =
          scoreValue(ev);

        if (afterWhite === null) {
          return null;
        }

        playedScore =
          moverIsWhite
            ? afterWhite
            : -afterWhite;
      }

      /*
       * Custom loss thresholds are in PAWNS.
       */
      const loss =
        Math.max(
          0,
          (bestScore - playedScore) / 100
        );

      const before =
        moverScore(parentEval);

      if (before === null) {
        return null;
      }

      /*
       * ------------------------------------------------------
       * BOOK
       * ------------------------------------------------------
       */
      const moveSequence =
        nodes
          .slice(1)
          .map(n => n.uci)
          .filter(Boolean)
          .join(' ');

      if (
        globalThis.LGR_OPENING_BOOK?.[
          moveSequence
        ]
      ) {
        return {
          classification: 'book',
          uci: playedMove,
          bestMove,
          loss,
          depth: ev.depth ?? 0
        };
      }

      /*
       * ------------------------------------------------------
       * BRILLIANT
       * ------------------------------------------------------
       */
      if (
        isBrilliant(
          parentEval,
          ev,
          parent,
          node,
          playedMove,
          rank,
          loss,
          moverIsWhite
        )
      ) {
        return {
          classification: 'brilliant',
          uci: playedMove,
          bestMove,
          loss,
          depth: ev.depth ?? 0
        };
      }

      /*
       * ------------------------------------------------------
       * GREAT
       * Best move AND second is at least 0.50 worse.
       * ------------------------------------------------------
       */
      if (
        rank === 1 &&
        secondScore !== null &&
        (bestScore - secondScore) / 100 >= 0.50
      ) {
        return {
          classification: 'great',
          uci: playedMove,
          bestMove,
          loss: 0,
          depth: ev.depth ?? 0
        };
      }

      /*
       * ------------------------------------------------------
       * BEST
       * ------------------------------------------------------
       */
      if (rank === 1) {
        return {
          classification: 'best',
          uci: playedMove,
          bestMove,
          loss,
          depth: ev.depth ?? 0
        };
      }

      /*
       * ------------------------------------------------------
       * EXCELLENT
       * Second or third best AND <= 0.50 worse.
       * ------------------------------------------------------
       */
      if (
        (rank === 2 || rank === 3) &&
        loss <= 0.50
      ) {
        return {
          classification: 'excellent',
          uci: playedMove,
          bestMove,
          loss,
          depth: ev.depth ?? 0
        };
      }

      /*
       * ------------------------------------------------------
       * BLUNDER
       * > 2.00 pawns lost.
       * Checked before Mistake/Inaccuracy.
       * ------------------------------------------------------
       */
      if (loss > 2.00) {
        return {
          classification: 'blunder',
          uci: playedMove,
          bestMove,
          loss,
          depth: ev.depth ?? 0
        };
      }

      /*
       * ------------------------------------------------------
       * MISS
       * Had an advantage before the move and lost > 1.00.
       *
       * We keep Miss in the 1.00-2.00 range so >2.00
       * remains a Blunder.
       * ------------------------------------------------------
       */
      if (
        before > 0 &&
        loss > 1.00
      ) {
        return {
          classification: 'miss',
          uci: playedMove,
          bestMove,
          loss,
          depth: ev.depth ?? 0
        };
      }

      /*
       * ------------------------------------------------------
       * MISTAKE
       * > 1.00 pawns lost.
       * ------------------------------------------------------
       */
      if (loss > 1.00) {
        return {
          classification: 'mistake',
          uci: playedMove,
          bestMove,
          loss,
          depth: ev.depth ?? 0
        };
      }

      /*
       * ------------------------------------------------------
       * INACCURACY
       * > 0.50 pawns lost.
       * ------------------------------------------------------
       */
      if (loss > 0.50) {
        return {
          classification: 'inaccuracy',
          uci: playedMove,
          bestMove,
          loss,
          depth: ev.depth ?? 0
        };
      }

      /*
       * ------------------------------------------------------
       * GOOD
       * ------------------------------------------------------
       */
      return {
        classification: 'good',
        uci: playedMove,
        bestMove,
        loss,
        depth: ev.depth ?? 0
      };

    } catch {
      return null;
    }
  }


  function hook(ctrl) {
    if (
      !ctrl ||
      ctrl.__lgrHooked
    ) {
      return false;
    }

    const original =
      ctrl.onNewCeval;

    if (
      typeof original !==
      'function'
    ) {
      return false;
    }

    ctrl.__lgrHooked = true;

    ctrl.onNewCeval =
      function (
        ev,
        path,
        threatMode
      ) {
        const result =
          original.call(
            this,
            ev,
            path,
            threatMode
          );

        const review =
          classify(
            this,
            ev,
            path,
            threatMode
          );

        if (review) {
          send({
            type: 'move-review',
            ...review,
            orientation:
              this.getOrientation?.() ??
              'white'
          });
        }

        return result;
      };

    return true;
  }

  function getController() {
    return window.lichess
      ?.analysis
      ?.navigate
      ?.ctrl ?? null;
  }

  function start() {
    const ctrl =
      getController();

    if (
      ctrl &&
      hook(ctrl)
    ) {
      return;
    }

    /*
     * Only retry during initial loading.
     * No continuous polling after initialization.
     */
    let tries = 0;

    const retry = () => {
      const current =
        getController();

      if (
        current &&
        hook(current)
      ) {
        return;
      }

      tries++;

      if (tries < 120) {
        requestAnimationFrame(retry);
      }
    };

    requestAnimationFrame(retry);
  }

  if (
    document.readyState ===
    'loading'
  ) {
    document.addEventListener(
      'DOMContentLoaded',
      start,
      { once: true }
    );
  } else {
    start();
  }
})();
