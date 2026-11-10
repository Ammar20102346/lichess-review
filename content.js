(() => {
  'use strict';

  const api =
    globalThis.browser ??
    globalThis.chrome;

  const ICONS = {
    brilliant: 'assets/chesscom/brilliant.png',
    great: 'assets/chesscom/great.png',
    best: 'assets/chesscom/best.png',
    excellent: 'assets/chesscom/excellent.png',
    good: 'assets/chesscom/good.png',
    book: 'assets/chesscom/book.png',
    inaccuracy: 'assets/chesscom/inaccuracy.png',
    mistake: 'assets/chesscom/mistake.png',
    blunder: 'assets/chesscom/blunder.png',
    miss: 'assets/chesscom/miss.png'
  };

  let currentKey = null;

  function removeBadge() {
    document
      .querySelectorAll('.lgr-move-badge')
      .forEach(el => el.remove());

    currentKey = null;
  }

  function getBoard() {
    return document.querySelector('cg-board');
  }

  function positionForSquare(
    board,
    square,
    orientation
  ) {
    if (!square || square.length !== 2) {
      return null;
    }

    const file =
      square.charCodeAt(0) - 97;

    const rank =
      Number(square[1]) - 1;

    if (
      file < 0 ||
      file > 7 ||
      rank < 0 ||
      rank > 7
    ) {
      return null;
    }

    const rect =
      board.getBoundingClientRect();

    const size =
      Math.min(
        rect.width,
        rect.height
      ) / 8;

    const col =
      orientation === 'black'
        ? 7 - file
        : file;

    const row =
      orientation === 'black'
        ? rank
        : 7 - rank;

    return {
      x: col * size,
      y: row * size,
      size
    };
  }

  function showBadge(
    classification,
    uci,
    orientation
  ) {
    removeBadge();

    const board = getBoard();

    if (!board || !uci) {
      return;
    }

    const destination =
      uci.slice(2, 4);

    const pos =
      positionForSquare(
        board,
        destination,
        orientation
      );

    if (!pos) {
      return;
    }

    const icon =
      ICONS[classification];

    if (!icon) {
      return;
    }

    const img =
      document.createElement('img');

    img.className =
      'lgr-move-badge';

    img.src =
      api.runtime.getURL(icon);

    img.alt =
      classification;

    img.title =
      classification;

    img.draggable = false;

    img.style.left =
      `${pos.x + pos.size - 40}px`;

    img.style.top =
      `${pos.y - 3}px`;

    board.appendChild(img);

    currentKey =
      `${uci}:${classification}`;
  }

  window.addEventListener(
    'message',
    event => {
      if (event.source !== window) {
        return;
      }

      const data =
        event.data;

      if (
        !data ||
        data.source !==
          'lichess-review-engine'
      ) {
        return;
      }

      if (data.type === 'clear') {
        removeBadge();
        return;
      }

      if (
        data.type !== 'move-review'
      ) {
        return;
      }

      if (
        !data.classification ||
        !data.uci
      ) {
        return;
      }

      const key =
        `${data.uci}:${data.classification}`;

      if (key === currentKey) {
        return;
      }

      showBadge(
        data.classification,
        data.uci,
        data.orientation
      );
    }
  );
})();
