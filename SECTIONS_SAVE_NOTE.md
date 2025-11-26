# حفظ الـ Sections - ملاحظة مهمة

## الوضع الحالي

⚠️ **الـ Backend لا يدعم حفظ Page Components حالياً**

لم يتم العثور على endpoint في الـ OpenAPI spec لحفظ الـ page components/sections. الـ DTOs الموجودة:
- `CreatePageWithComponentsDTO` - يحتوي على `components` array لكن لا يوجد endpoint يستخدمه
- `UpdatePageDTO` - لا يحتوي على حقل `components`

## الحل المؤقت

تم تطبيق حل مؤقت باستخدام **localStorage**:

### كيف يعمل:

1. **عند الحفظ**:
   ```javascript
   // يتم حفظ الـ sections في localStorage
   localStorage.setItem(`page_${pageId}_sections`, JSON.stringify(sections));
   
   // يتم تحديث بيانات الصفحة الأساسية فقط
   await updatePage.mutateAsync(updateData);
   ```

2. **عند التحميل**:
   ```javascript
   // يتم قراءة الـ sections من localStorage
   const savedSections = localStorage.getItem(`page_${pageId}_sections`);
   const sections = savedSections ? JSON.parse(savedSections) : [];
   ```

### المميزات:
- ✅ الـ sections تُحفظ محلياً على المتصفح
- ✅ تعمل بشكل كامل في Page Builder
- ✅ تظهر في الـ Preview

### العيوب:
- ❌ البيانات محلية فقط (لا تُحفظ على السيرفر)
- ❌ إذا تم مسح الـ cache، تُفقد الـ sections
- ❌ لا تظهر على أجهزة أخرى

## الحل النهائي (يحتاج تطوير Backend)

يجب على الـ Backend توفير أحد الحلول التالية:

### الخيار 1: إضافة Components API
```
POST   /api/PageComponents          - إنشاء component جديد
PUT    /api/PageComponents          - تحديث component
DELETE /api/PageComponents/{id}     - حذف component
GET    /api/Pages/{id}/components   - جلب components الخاصة بصفحة
```

### الخيار 2: تحديث UpdatePageDTO
إضافة حقل `components` لـ `UpdatePageDTO`:
```json
{
  "id": 1,
  "categoryId": 1,
  "nameEn": "...",
  // ... باقي الحقول
  "components": [
    {
      "componentType": "hero",
      "contentJsonAr": "{}",
      "contentJsonEn": "{}",
      "contentJsonKu": "{}",
      "isVisible": true,
      "theme": 1,
      "orderIndex": 0
    }
  ]
}
```

## ملاحظات للمطور:

عند توفر الـ API:
1. حذف كود localStorage من `PageBuilderPage.jsx`
2. تحديث `handleSave` لإرسال الـ sections للـ backend
3. تحديث `usePages` hook لجلب الـ components مع الصفحة
4. اختبار الحفظ والتحميل من السيرفر

## الملفات المعدلة:

- `src/features/pageBuilder/pages/PageBuilderPage.jsx` - إضافة localStorage save/load
