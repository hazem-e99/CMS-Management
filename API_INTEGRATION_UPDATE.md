# تحديث النظام لاستخدام الـ API الحقيقي

## التغييرات المطبقة

### 1. تحديث API Configuration
**الملف:** `src/api/config.js`
- تم إرجاع `baseURL` إلى `http://pgs.runasp.net/api`
- النظام الآن يتصل بالـ API الحقيقي بدلاً من json-server المحلي

### 2. تحديث Pages API
**الملف:** `src/api/pages.js`
- تم إرجاع جميع الـ endpoints إلى الصيغة الصحيحة من `openApi.json`:
  - `/Pages/public/{slug}` - للحصول على صفحة بواسطة slug
  - `/Pages/public/id/{id}` - للحصول على صفحة بواسطة ID
  - `/Pages/public/homepage` - للحصول على الصفحة الرئيسية
  - `/Pages/public/category/{categoryId}` - للحصول على صفحات category معين

### 3. تحديث Navigation Menu Service
**الملف:** `src/services/publicPagesService.js`
- تم تحديث `getNavigationMenu()` لاستخدام `/Categories/navbar` endpoint
- هذا الـ endpoint يرجع `CategoryWithPagesDTO[]` الذي يحتوي على:
  - Categories مع الصفحات الخاصة بها
  - كل category يحتوي على: `nameEn`, `nameAr`, `nameKu`
  - كل category يحتوي على `pages` array

### 4. تحديث PublicNavbar Component
**الملف:** `src/features/public/components/PublicNavbar.jsx`

#### أ. تحديث `getItemTitle()` Function
الدالة الآن تدعم صيغ متعددة للأسماء:
1. **صيغة API** (الأولوية الأولى): `nameEn`, `nameAr`, `nameKu`
2. **صيغة title object** (للتوافق مع الإصدارات السابقة)
3. **صيغة name object** (احتياطي)

```javascript
const getItemTitle = (item) => {
  if (!item) return '';
  
  // Try API format (nameEn, nameAr, nameKu)
  const apiName = item[`name${language.charAt(0).toUpperCase() + language.slice(1)}`];
  if (apiName) return apiName;
  
  // Fallback to nameEn
  if (item.nameEn) return item.nameEn;
  
  // Try title object format (for backward compatibility)
  if (item.title) {
    if (typeof item.title === 'object') {
      return item.title[language] || item.title.en || '';
    }
    return item.title;
  }
  
  // Try name object format
  if (item.name) {
    if (typeof item.name === 'object') {
      return item.name[language] || item.name.en || '';
    }
    return item.name;
  }
  
  return '';
};
```

#### ب. تحديث Menu Rendering
- تم تغيير `item.children` إلى `item.pages || item.children`
- تم إضافة fallback للـ slug: `item.slug || item.nameEn?.toLowerCase()`
- هذا يدعم كلاً من:
  - الـ API الحقيقي (يستخدم `pages` و `nameEn`)
  - البيانات المحلية (تستخدم `children` و `slug`)

### 5. هيكل البيانات المتوقع من API

#### CategoryWithPagesDTO
```json
{
  "id": 1,
  "nameEn": "PGS Academy",
  "nameAr": "أكاديمية PGS",
  "nameKu": "ئەکادیمیای PGS",
  "descriptionEn": "...",
  "descriptionAr": "...",
  "descriptionKu": "...",
  "sortOrder": 1,
  "pages": [
    {
      "id": 1,
      "nameEn": "Leadership",
      "nameAr": "القيادة",
      "nameKu": "سەرکردایەتی",
      "slug": "leadership",
      "isPublished": true
    }
  ]
}
```

## كيفية الاستخدام

### التشغيل
```bash
npm run dev
```

النظام الآن سيتصل تلقائياً بـ `http://pgs.runasp.net/api`

### تغيير الـ API URL
يمكنك تغيير الـ API URL عن طريق:

1. **Environment Variable:**
   ```bash
   VITE_API_BASE_URL=http://your-api-url.com npm run dev
   ```

2. **ملف `.env`:**
   ```
   VITE_API_BASE_URL=http://your-api-url.com
   ```

## الـ Endpoints المستخدمة

### للـ Navigation Menu
- `GET /api/Categories/navbar`
  - يرجع: `CategoryWithPagesDTOListApiResponse`
  - يحتوي على: Categories مع الصفحات الخاصة بها

### للصفحات العامة
- `GET /api/Pages/public/{slug}` - صفحة بواسطة slug
- `GET /api/Pages/public/id/{id}` - صفحة بواسطة ID
- `GET /api/Pages/public/homepage` - الصفحة الرئيسية
- `GET /api/Pages/public/category/{categoryId}` - صفحات category

### للإعدادات
- `GET /api/siteSettings` - إعدادات الموقع (logo, footer, etc.)

## ملاحظات مهمة

1. **التوافق مع الإصدارات السابقة:** الكود يدعم كلاً من:
   - البيانات من الـ API الحقيقي
   - البيانات المحلية من db.json (للتطوير)

2. **معالجة الأخطاء:** جميع الـ API calls تحتوي على try-catch blocks
   - في حالة فشل الاتصال، يتم إرجاع array فارغ
   - الأخطاء يتم تسجيلها في console

3. **اللغات المدعومة:**
   - English (en)
   - Arabic (ar)
   - Kurdish (ku)

4. **الـ Slug Generation:**
   - إذا لم يكن `slug` موجوداً، يتم استخدام `nameEn.toLowerCase()`
   - هذا يضمن عمل الروابط حتى لو لم يكن slug محدد

## الاختبار

للتأكد من أن كل شيء يعمل:

1. شغل المشروع: `npm run dev`
2. افتح المتصفح على `http://localhost:3000`
3. تحقق من:
   - ظهور القوائم في الـ Navbar
   - عمل القوائم المنسدلة
   - تغيير اللغة
   - الروابط تعمل بشكل صحيح

## المشاكل المحتملة وحلولها

### 1. القوائم لا تظهر
- تأكد من أن الـ API يعمل: `http://pgs.runasp.net/api/Categories/navbar`
- تحقق من console للأخطاء

### 2. الأسماء تظهر بالإنجليزية فقط
- تأكد من أن البيانات في الـ API تحتوي على `nameAr` و `nameKu`

### 3. الروابط لا تعمل
- تأكد من أن الصفحات موجودة في الـ API
- تحقق من الـ routing في `App.jsx`
