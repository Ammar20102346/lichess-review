# ♟️ Lichess Game Review

**An independent browser extension that enhances the Lichess analysis experience with visual move classifications and chess evaluation insights.**

Lichess Game Review brings a familiar move-review experience to Lichess, displaying move classifications directly on the analysis board.

---

## English

### Overview

Lichess Game Review is an experimental browser extension designed to make chess analysis more informative and accessible.

It integrates with Lichess's existing analysis environment and displays move-quality classifications as visual annotations directly on the chessboard.

The project aims to provide a more intuitive way to explore individual moves, recognize tactical opportunities, and understand the quality of decisions throughout a game.

### Features

- **Move Classification** — Visual classifications for different levels of move quality.
- **Brilliant Move Detection** — Experimental detection of exceptional tactical moves and sacrifices.
- **Opening Recognition** — Identifies moves found in the included opening database.
- **Board Annotations** — Displays classification badges directly on the relevant chessboard squares.
- **Lichess Integration** — Works within the existing Lichess analysis interface.

### Installation

The extension can be installed manually in Chromium-based browsers and Firefox.

**Chromium-based browsers**

1. Download the project using **Code → Download ZIP**.
2. Extract the downloaded archive.
3. Open the browser's extensions page.
4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the extracted project folder containing `manifest.json`.

**Firefox**

1. Download the project using **Code → Download ZIP**.
2. Extract the downloaded archive.
3. Open `about:debugging#/runtime/this-firefox`.
4. Select **This Firefox**.
5. Click **Load Temporary Add-on**.
6. Select the `manifest.json` file from the extracted project folder.

**Note:** Firefox temporary add-ons are removed when the browser restarts, so you will need to load the extension again. In Chromium-based browsers, the unpacked extension remains installed, but you may need to reload it after making changes to its files.

### Known Limitations

The project is currently in beta. Some features are experimental and may not behave consistently in every position.

- Brilliant move detection is experimental and may produce inaccurate classifications.
- Move markers do not yet scale consistently across all board sizes.
- The extension relies on internal Lichess interfaces that may change with platform updates.
- The current version focuses on individual move analysis rather than generating a complete game review report.

### Development & Feedback

Contributions, bug reports, and feature suggestions are welcome.

To report a problem or suggest a feature, open an issue in the repository:

[GitHub Issues](https://github.com/Ammar20102346/lichess-review/issues)

When reporting a bug, include the relevant game link, move number, browser information, and steps to reproduce the issue whenever possible.

---

## العربية

### نظرة عامة

Lichess Game Review هي إضافة متصفح تجريبية تهدف إلى تحسين تجربة تحليل الشطرنج على منصة Lichess.

تتكامل الإضافة مع بيئة التحليل الموجودة في Lichess، وتعرض تصنيفات جودة النقلات على شكل علامات مرئية مباشرة على رقعة الشطرنج.

يهدف المشروع إلى جعل تحليل النقلات أكثر وضوحًا، ومساعدة اللاعبين على استكشاف الفرص التكتيكية وفهم جودة قراراتهم خلال المباراة.

### المميزات

- **تصنيف النقلات:** عرض تصنيفات مرئية لمستويات جودة النقلات المختلفة.
- **اكتشاف نقلات Brilliant:** محاولة اكتشاف النقلات التكتيكية الاستثنائية والتضحيات باستخدام نظام تجريبي.
- **التعرف على الافتتاحيات:** تحديد النقلات الموجودة في قاعدة بيانات الافتتاحيات المرفقة بالمشروع.
- **علامات على الرقعة:** عرض شارات التصنيف مباشرة على المربعات المرتبطة بالنقلات.
- **التكامل مع Lichess:** العمل ضمن واجهة تحليل المباريات الموجودة على المنصة.

### التثبيت

يمكن تثبيت الإضافة يدويًا على متصفحات Chromium وFirefox.

**متصفحات Chromium**

1. حمّل المشروع من خلال **Code → Download ZIP**.
2. فك ضغط الملف الذي تم تنزيله.
3. افتح صفحة الإضافات في المتصفح.
4. فعّل **Developer mode**.
5. اضغط على **Load unpacked**.
6. اختر مجلد المشروع الذي يحتوي على ملف `manifest.json`.

**Firefox**

1. حمّل المشروع من خلال **Code → Download ZIP**.
2. فك ضغط الملف.
3. افتح العنوان التالي:

   `about:debugging#/runtime/this-firefox`

4. اختر **This Firefox**.
5. اضغط على **Load Temporary Add-on**.
6. اختر ملف `manifest.json` من مجلد المشروع.

**ملاحظة:** الإضافات المؤقتة في Firefox تُزال عند إعادة تشغيل المتصفح، وستحتاج إلى تحميل الإضافة مجددًا. أما في متصفحات Chromium، فتبقى الإضافة المثبتة بهذه الطريقة موجودة، لكن قد تحتاج إلى إعادة تحميلها عند تعديل ملفاتها.

### القيود الحالية

المشروع حاليًا في مرحلة Beta، وبعض الوظائف تجريبية وقد لا تعمل بالدقة نفسها في جميع الوضعيات.

- اكتشاف نقلات **Brilliant** تجريبي، وقد ينتج عنه بعض التصنيفات غير الدقيقة.
- أحجام علامات النقلات لا تتكيف بصورة متناسقة مع جميع أحجام الرقعة.
- تعتمد الإضافة على واجهات داخلية في Lichess قد تتغير مع تحديثات المنصة.
- يركز الإصدار الحالي على تحليل النقلات الفردية، ولا ينشئ حتى الآن تقرير مراجعة شاملًا للمباراة.

### التطوير والإبلاغ عن المشاكل

نرحب بالمساهمات والإبلاغ عن الأخطاء واقتراح الميزات الجديدة.

يمكنك الإبلاغ عن مشكلة أو اقتراح ميزة من خلال:

[GitHub Issues](https://github.com/Ammar20102346/lichess-review/issues)

عند الإبلاغ عن مشكلة، يُفضّل إرفاق رابط المباراة ورقم النقلة ومعلومات المتصفح والخطوات اللازمة لإعادة إنتاج المشكلة.

---

**Built for better chess analysis ♟️**

**صُنع لتحليل شطرنج أفضل**
