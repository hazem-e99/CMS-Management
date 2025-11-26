# تحديث الصفحة - دليل الاستخدام

## UpdatePageDTO Schema

عند تحديث صفحة موجودة، يجب إرسال البيانات بالتنسيق التالي:

### الحقول المطلوبة (Required):
```javascript
{
  id: 1,                    // رقم الصفحة (integer)
  categoryId: 1,            // رقم التصنيف (integer)
  nameEn: "Page Name",      // الاسم بالإنجليزية (2-100 حرف)
  nameAr: "اسم الصفحة",     // الاسم بالعربية (2-100 حرف)
  nameKu: "ناوی پەڕە"        // الاسم بالكردية (2-100 حرف)
}
```

### الحقول الاختيارية (Optional):
```javascript
{
  descriptionEn: "Description",
  descriptionAr: "الوصف",
  descriptionKu: "وەسف",
  
  slug: "page-url-slug",              // max 200 chars
  
  metaTitleEn: "SEO Title",           // max 60 chars
  metaTitleAr: "عنوان SEO",           // max 60 chars
  metaTitleKu: "سەردێڕی SEO",         // max 60 chars
  
  metaDescriptionEn: "SEO Description",  // max 160 chars
  metaDescriptionAr: "وصف SEO",          // max 160 chars
  metaDescriptionKu: "وەسفی SEO",        // max 160 chars
  
  isHomepage: false,
  isPublished: true
}
```

## ملاحظات مهمة:

1. **أسماء الحقول بـ camelCase** (الحرف الأول صغير):
   - ✅ `id`, `categoryId`, `nameEn`, `nameAr`, `nameKu`
   - ❌ `Id`, `CategoryId`, `NameEn`, `NameAr`, `NameKu`

2. **الفرق بين Create و Update**:
   - **CreatePageDTO**: يستخدم PascalCase (`CategoryId`, `NameEn`)
   - **UpdatePageDTO**: يستخدم camelCase (`categoryId`, `nameEn`)

3. **الحقول المطلوبة**:
   - `id` - رقم الصفحة المراد تحديثها
   - `categoryId` - رقم التصنيف
   - `nameEn`, `nameAr`, `nameKu` - الأسماء بالثلاث لغات

## مثال كامل:

```javascript
const updateData = {
  id: 5,
  categoryId: 2,
  nameEn: "About Us",
  nameAr: "من نحن",
  nameKu: "دەربارەی ئێمە",
  descriptionEn: "Learn about our organization",
  descriptionAr: "تعرف على مؤسستنا",
  descriptionKu: "زانیاری دەربارەی دامەزراوەکەمان",
  slug: "about-us",
  metaTitleEn: "About Us - People Institute",
  metaTitleAr: "من نحن - معهد الشعب",
  metaTitleKu: "دەربارەی ئێمە - پێپڵز ئینستیتیوت",
  metaDescriptionEn: "Learn about our mission and values",
  metaDescriptionAr: "تعرف على رسالتنا وقيمنا",
  metaDescriptionKu: "زانیاری دەربارەی ئامانج و بەهاکانمان",
  isPublished: true,
  isHomepage: false
};

await updatePage.mutateAsync(updateData);
```

## الإصلاحات المطبقة:

✅ تم تصحيح `PageBuilderPage.jsx` لاستخدام camelCase
✅ تم تصحيح `PageForm.jsx` لاستخدام PascalCase في Create
✅ تم إضافة console.log لمراقبة البيانات المرسلة
