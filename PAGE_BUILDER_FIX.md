# إصلاح Page Builder - حفظ الـ Sections/Components

## المشكلة
كانت الـ sections/components لا تُحفظ عند إنشاء صفحة جديدة في Page Builder.

## السبب الجذري
1. **Components Array فارغ**: في الكود القديم، كان `Components: []` فارغاً بدلاً من إرسال الـ components الفعلية
2. **خطأ في تسمية Properties**: كان يستخدم PascalCase (`CategoryId`, `NameEn`) بدلاً من camelCase (`categoryId`, `nameEn`)
3. **Endpoints غير صحيحة**: بعض الـ endpoints كانت تستخدم `/pages` بدلاً من `/Pages`

## الإصلاحات المطبقة

### 1. تحديث `src/api/pages.js`
```javascript
export const pagesApi = {
  // جميع الـ endpoints تستخدم /Pages بحرف P كبير
  createPageWithComponents: (data) => apiClient.post('/Pages/with-components', data),
  createPageComponent: (pageId, data) => apiClient.post(`/Pages/${pageId}/components`, data),
  updatePageComponent: (componentId, data) => apiClient.put(`/Pages/components/${componentId}`, data),
  deletePageComponent: (componentId) => apiClient.delete(`/Pages/components/${componentId}`),
  // ... باقي الـ endpoints
};
```

### 2. تحديث `src/features/pageBuilder/pages/PageBuilderPage.jsx`

#### أ. إصلاح createData Object
**قبل:**
```javascript
const createData = {
  CategoryId: pageData.categoryId,
  NameEn: "Debug Page En",
  // ...
  Components: [], // ❌ فارغ!
};
```

**بعد:**
```javascript
const createData = {
  categoryId: pageData.categoryId,
  nameEn: pageData.nameEn || "New Page",
  nameAr: pageData.nameAr || "صفحة جديدة",
  nameKu: pageData.nameKu || "پەڕەی نوێ",
  // ... باقي البيانات
  components: components, // ✅ يحتوي على الـ components الفعلية!
};
```

#### ب. تحسين معالجة Response
```javascript
// يدعم كلا الصيغتين من الـ API response
if (response.success || response.data) {
  const newPageId = response.data?.data?.id || response.data?.id;
  // ...
}
```

## هيكل البيانات من openApi.json

### CreatePageWithComponentsDTO
```json
{
  "categoryId": 1,
  "nameEn": "Page Name",
  "nameAr": "اسم الصفحة",
  "nameKu": "ناوی پەڕە",
  "descriptionEn": "Description",
  "descriptionAr": "الوصف",
  "descriptionKu": "وەسف",
  "slug": "page-slug",
  "metaTitleEn": "Meta Title",
  "metaTitleAr": "عنوان ميتا",
  "metaTitleKu": "سەردێڕی میتا",
  "metaDescriptionEn": "Meta Description",
  "metaDescriptionAr": "وصف ميتا",
  "metaDescriptionKu": "وەسفی میتا",
  "isHomepage": false,
  "isPublished": false,
  "components": [
    {
      "componentType": "HeroSection",
      "componentName": "Hero",
      "contentJsonEn": "{\"title\":\"Welcome\"}",
      "contentJsonAr": "{\"title\":\"مرحباً\"}",
      "contentJsonKu": "{\"title\":\"بەخێربێیت\"}",
      "orderIndex": 0,
      "isVisible": true,
      "theme": 1
    }
  ]
}
```

### NewPageComponentDTO
```json
{
  "componentType": "HeroSection",
  "componentName": "Hero Section",
  "contentJsonEn": "{\"title\":\"Welcome\",\"subtitle\":\"Subtitle\"}",
  "contentJsonAr": "{\"title\":\"مرحباً\",\"subtitle\":\"عنوان فرعي\"}",
  "contentJsonKu": "{\"title\":\"بەخێربێیت\",\"subtitle\":\"ژێرناونیشان\"}",
  "orderIndex": 0,
  "isVisible": true,
  "theme": 1
}
```

## الـ Endpoints المتاحة

### إنشاء صفحة مع components
```
POST /api/Pages/with-components
Body: CreatePageWithComponentsDTO
Response: PageDTOApiResponse
```

### إضافة component لصفحة موجودة
```
POST /api/Pages/{pageId}/components
Body: CreatePageComponentDTO
Response: PageComponentDTOApiResponse
```

### تحديث component
```
PUT /api/Pages/components/{componentId}
Body: UpdatePageComponentDTO
Response: PageComponentDTOApiResponse
```

### حذف component
```
DELETE /api/Pages/components/{componentId}
Response: BooleanApiResponse
```

### الحصول على صفحة مع components
```
GET /api/Pages/{id}?includeComponents=true
Response: PageDTOApiResponse (with components array)
```

## كيفية الاختبار

### 1. استخدام ملف الاختبار HTML
افتح `api-test.html` في المتصفح:
```bash
# في Windows
start api-test.html

# أو افتحه مباشرة من المتصفح
```

الملف يحتوي على:
- ✅ إنشاء صفحة مع components
- ✅ الحصول على تفاصيل الصفحة
- ✅ إضافة component جديد
- ✅ تحديث component
- ✅ حذف component

### 2. اختبار من Page Builder
1. اذهب إلى `/admin/pages/create`
2. املأ بيانات الصفحة
3. اضغط "Next" للذهاب إلى Page Builder
4. أضف sections من المكتبة
5. عدّل المحتوى
6. اضغط "Save"
7. تحقق من أن الصفحة تم إنشاؤها مع جميع الـ components

### 3. اختبار التحديث
1. افتح صفحة موجودة في Page Builder
2. أضف section جديد
3. عدّل section موجود
4. احذف section
5. اضغط "Save"
6. تحقق من أن التغييرات تم حفظها

## سير العمل (Workflow)

### إنشاء صفحة جديدة
```
1. User fills page info → CreatePageForm
2. User clicks "Next" → Navigate to /admin/pages/builder/new
3. User adds sections → PageBuilder state
4. User clicks "Save" → handleSave()
5. Transform sections → components array
6. POST /Pages/with-components
7. Get new page ID from response
8. Navigate to /admin/pages/{id}/builder
9. Reload page to show saved data
```

### تحديث صفحة موجودة
```
1. Load page with components → GET /Pages/{id}?includeComponents=true
2. Transform components → sections
3. User modifies sections → PageBuilder state
4. User clicks "Save" → handleSave()
5. Classify operations:
   - toUpdate: existing components that changed
   - toCreate: new components
   - toDelete: removed components
6. Execute operations:
   a. UPDATE existing components
   b. DELETE removed components
   c. CREATE new components
7. Update page metadata
8. Reload to show changes
```

## ملاحظات مهمة

### 1. Property Naming
- **API يستخدم camelCase**: `categoryId`, `nameEn`, `isPublished`
- **ليس PascalCase**: ~~`CategoryId`~~, ~~`NameEn`~~

### 2. Component Type
- يجب أن يكون نص واضح: `"HeroSection"`, `"FeaturesSection"`, `"CtaSection"`
- يمكن استخدام أي نص، لكن يُفضل PascalCase

### 3. Content JSON
- يجب أن يكون **string** (JSON.stringify)
- ليس object مباشر
- مثال: `contentJsonEn: JSON.stringify({ title: "Hello" })`

### 4. Order Index
- يبدأ من 0
- يحدد ترتيب ظهور الـ components
- مهم للـ sorting

### 5. Theme
- رقم integer (1, 2, 3, ...)
- يمثل الـ theme/style للـ component

## استكشاف الأخطاء

### خطأ: "Cannot read properties of undefined"
**السبب**: pageData غير موجود
**الحل**: تأكد من أن المستخدم ملأ form إنشاء الصفحة أولاً

### خطأ: "NullReferenceException"
**السبب**: categoryId غير صحيح أو Category غير موجود
**الحل**: تأكد من أن الـ category موجود في قاعدة البيانات

### خطأ: "Duplicate key"
**السبب**: محاولة إنشاء component بنفس الـ ID
**الحل**: استخدم الـ workflow الصحيح (UPDATE بدلاً من CREATE للـ components الموجودة)

### Components لا تظهر بعد الحفظ
**السبب**: `includeComponents=true` غير موجود في GET request
**الحل**: تأكد من أن الـ API call يتضمن `?includeComponents=true`

### Components تُحفظ لكن بترتيب خاطئ
**السبب**: `orderIndex` غير صحيح
**الحل**: تأكد من أن `orderIndex` يبدأ من 0 ويزيد بشكل متسلسل

## الخلاصة

✅ **تم إصلاح**:
- حفظ components عند إنشاء صفحة جديدة
- تحديث components في صفحة موجودة
- حذف components
- إضافة components جديدة
- ترتيب components

✅ **تم تحسين**:
- معالجة الأخطاء
- Logging للـ debugging
- Property naming (camelCase)
- API endpoints (صحيحة حسب openApi.json)

🧪 **للاختبار**:
- استخدم `api-test.html` للاختبار المباشر
- استخدم Page Builder في التطبيق
- تحقق من console logs للـ debugging
