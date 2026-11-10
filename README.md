# ♟️ Lichess Game Review

[![Beta](https://img.shields.io/badge/status-beta-orange.svg)](https://github.com/Ammar20102346/lichess-review)
[![Platform](https://img.shields.io/badge/platform-Lichess-8B64C8.svg)](https://lichess.org)
[![Manifest](https://img.shields.io/badge/Manifest-V3-blue.svg)](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

**An independent browser extension that enhances the Lichess analysis experience with visual move classifications and chess evaluation insights.**

Lichess Game Review brings a familiar, Chess.com-inspired move review experience to Lichess, displaying move classifications directly on the analysis board.

> [English](#english) · [العربية](#العربية)

---

## English

### Overview

Lichess Game Review is an experimental browser extension built to make chess analysis more informative and accessible.

It integrates with Lichess's existing analysis environment and presents move-quality classifications as visual annotations directly on the chessboard.

The project aims to provide a more intuitive way to explore individual moves, recognize tactical opportunities, and understand the quality of decisions throughout a game.

### Features

- **Move Classification** — Visual classifications for different levels of move quality.
- **Brilliant Move Detection** — Experimental detection of exceptional tactical moves and sacrifices.
- **Opening Recognition** — Identifies moves found in the included opening database.
- **Board Annotations** — Displays classification badges directly on the relevant chessboard squares.
- **Lichess Integration** — Works within the existing Lichess analysis interface.

### Installation

The extension is currently distributed as an unpacked browser extension.

1. Download the project using **Code → Download ZIP**.
2. Extract the downloaded archive.
3. Open `about:debugging#/runtime/this-firefox` in Zen Browser or Firefox.
4. Select **This Firefox**.
5. Click **Load Temporary Add-on**.
6. Locate the extracted project directory and select `manifest.json`.
7. Open a Lichess analysis page and refresh it.

**Note:** Temporary extensions are removed when the browser restarts. You may need to load the extension again.

### Current Limitations

This project is under active development. Some functionality is experimental and may not behave consistently in every position.

Known limitations include:

- Brilliant move detection is experimental and may produce inaccurate classifications.
- Move markers do not yet scale consistently across all board sizes.
- The extension relies on internal Lichess interfaces that may change without notice.
- The current implementation focuses on individual move analysis rather than generating a complete game review report.

### Development

Contributions, bug reports, and suggestions are welcome.

For bugs or feature requests, please open an issue in the repository:

[GitHub Issues](https://github.com/Ammar20102346/lichess-review/issues)

When reporting a problem, include the relevant game link, move number, browser information, and steps to reproduce the issue whenever possible.

### Disclaimer

Lichess Game Review is an independent, unofficial project. It is not affiliated with, endorsed by, or sponsored by Lichess or Chess.com.

All third-party names, trademarks, and assets remain the property of their respective owners.

---

## العربية

### نظرة عامة

Lichess Game Review هي إضافة متصفح تجريبية تهدف إلى تطوير تجربة تحليل الشطرنج على منصة Lichess.

تتكامل الإضافة مع بيئة التحليل الموجودة في Lichess، وتعرض تصنيفات جودة النقلات على شكل علامات مرئية مباشرة فوق رقعة الشطرنج.

يهدف المشروع إلى جعل تحليل النقلات أكثر وضوحًا وسهولة، ومساعدة اللاعبين على استكشاف الفرص التكتيكية وفهم جودة قراراتهم أثناء المباراة.

### المميزات

- **تصنيف النقلات:** عرض تصنيفات مرئية لمستويات مختلفة من جودة النقلات.
- **اكتشاف النقلات العبقرية:** محاولة اكتشاف النقلات التكتيكية الاستثنائية والتضحيات، باستخدام نظام تجريبي.
- **التعرف على الافتتاحيات:** تحديد النقلات الموجودة في قاعدة بيانات الافتتاحيات المرفقة بالمشروع.
- **علامات على الرقعة:** إظهار شارات التصنيف مباشرة على المربعات المرتبطة بالنقلات.
- **التكامل مع Lichess:** العمل داخل واجهة تحليل المباريات الموجودة على المنصة.

### التثبيت

تُوزّع الإضافة حاليًا بصيغة إضافة متصفح غير معبأة.

1. حمّل المشروع من خلال **Code → Download ZIP**.
2. فك ضغط الملف الذي تم تنزيله.
3. افتح العنوان التالي في متصفح Zen أو Firefox:

   `about:debugging#/runtime/this-firefox`

4. اختر **This Firefox**.
5. اضغط على **Load Temporary Add-on**.
6. انتقل إلى مجلد المشروع الذي فككت ضغطه، ثم اختر `manifest.json`.
7. افتح صفحة تحليل مباراة على Lichess وأعد تحميلها.

**ملاحظة:** الإضافات المؤقتة تُحذف عند إعادة تشغيل المتصفح، وقد تحتاج إلى تحميل الإضافة مرة أخرى.

### القيود الحالية

لا يزال المشروع قيد التطوير، وبعض وظائفه تجريبية وقد لا تعمل بالدقة نفسها في جميع الوضعيات.

من القيود المعروفة:

- اكتشاف النقلات العبقرية تجريبي، وقد ينتج عنه بعض التصنيفات غير الدقيقة.
- أحجام علامات النقلات لا تتكيف بصورة متناسقة مع جميع أحجام الرقعة.
- تعتمد الإضافة على واجهات داخلية في Lichess قد تتغير مع تحديثات المنصة.
- يركز التنفيذ الحالي على تحليل النقلات الفردية، ولا ينشئ حتى الآن تقرير مراجعة شاملًا للمباراة.

### التطوير والمساهمة

نرحب بالمساهمات، والإبلاغ عن الأخطاء، والاقتراحات التي تساعد على تطوير المشروع.

يمكنك الإبلاغ عن مشكلة أو اقتراح ميزة جديدة من خلال:

[GitHub Issues](https://github.com/Ammar20102346/lichess-review/issues)

عند الإبلاغ عن مشكلة، يُفضّل إرفاق رابط المباراة، ورقم النقلة، ومعلومات المتصفح، والخطوات اللازمة لإعادة إنتاج المشكلة.

### إخلاء المسؤولية

Lichess Game Review مشروع مستقل وغير رسمي، ولا يتبع منصة Lichess أو Chess.com، ولا يحظى برعايتهما أو اعتمادهما.

جميع الأسماء والعلامات التجارية والموارد التابعة لأطراف أخرى تظل ملكًا لأصحابها.

---

<p align="center">
  <sub>Developed independently with ♟️</sub>
  <br/>
  <sub>طُوّر بشكل مستقل</sub>
</p>
