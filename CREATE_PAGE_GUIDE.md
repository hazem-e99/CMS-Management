# إنشاء صفحة جديدة - دليل الاستخدام

## الحقول المطلوبة (Required)

عند إنشاء صفحة جديدة، يجب إرسال الحقول التالية:

\`\`\`javascript
{
  CategoryId: 1,              // رقم التصنيف (مطلوب)
  NameAr: "اسم الصفحة",       // الاسم بالعربية (2-100 حرف)
  NameEn: "Page Name",        // الاسم بالإنجليزية (2-100 حرف)
  NameKu: "ناوی پەڕە"          // الاسم بالكردية (2-100 حرف)
}
\`\`\`

## الحقول الاختيارية (Optional)

\`\`\`javascript
{
  DescriptionAr: "وصف بالعربية",
  DescriptionEn: "Description in English",
  DescriptionKu: "وەسف بە كوردی",
  
  Slug: "page-url-slug",                    // max 200 chars
  
  MetaTitleAr: "عنوان SEO بالعربية",        // max 60 chars
  MetaTitleEn: "SEO Title in English",      // max 60 chars
  MetaTitleKu: "سەردێڕی SEO بە كوردی",      // max 60 chars
  
  MetaDescriptionAr: "وصف SEO بالعربية",    // max 160 chars
  MetaDescriptionEn: "SEO Description",     // max 160 chars
  MetaDescriptionKu: "وەسفی SEO",           // max 160 chars
  
  IsHomepage: false,        // هل هي الصفحة الرئيسية؟
  IsPublished: true         // هل منشورة؟
}
\`\`\`

## مثال كامل

\`\`\`javascript
import { useCreatePage } from '../hooks/usePages';

function CreatePageForm() {
  const createPage = useCreatePage();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const pageData = {
      // Required fields
      CategoryId: 1,
      NameAr: "من نحن",
      NameEn: "About Us",
      NameKu: "دەربارەی ئێمە",
      
      // Optional fields
      DescriptionAr: "صفحة تعريفية عن المؤسسة",
      DescriptionEn: "About our organization",
      DescriptionKu: "دەربارەی دامەزراوەکەمان",
      
      Slug: "about-us",
      
      MetaTitleAr: "من نحن - معهد الشعب",
      MetaTitleEn: "About Us - People Institute",
      MetaTitleKu: "دەربارەی ئێمە - پێپڵز ئینستیتیوت",
      
      MetaDescriptionAr: "تعرف على معهد الشعب ورسالتنا",
      MetaDescriptionEn: "Learn about People Institute and our mission",
      MetaDescriptionKu: "زانیاری دەربارەی پێپڵز ئینستیتیوت",
      
      IsHomepage: false,
      IsPublished: true
    };

    createPage.mutate(pageData, {
      onSuccess: (response) => {
        console.log('Page created:', response);
        alert('تم إنشاء الصفحة بنجاح!');
      },
      onError: (error) => {
        console.error('Error:', error);
        alert('خطأ: ' + error.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
      <button type="submit" disabled={createPage.isLoading}>
        {createPage.isLoading ? 'جاري الإنشاء...' : 'إنشاء صفحة'}
      </button>
    </form>
  );
}
\`\`\`

## ملاحظات مهمة

1. **أسماء الحقول بـ PascalCase**: 
   - ✅ `CategoryId` (صحيح)
   - ❌ `categoryId` (خطأ)

2. **الحقول المطلوبة**:
   - يجب إرسال `CategoryId`, `NameAr`, `NameEn`, `NameKu`
   - إذا نسيت أي حقل مطلوب، ستحصل على خطأ 400

3. **طول النصوص**:
   - الأسماء: 2-100 حرف
   - Slug: حتى 200 حرف
   - Meta Title: حتى 60 حرف
   - Meta Description: حتى 160 حرف

4. **القيم الافتراضية**:
   - إذا لم ترسل `IsHomepage` أو `IsPublished`، ستكون `false` افتراضياً
   - إذا لم ترسل `Slug`، سيتم إنشاؤه تلقائياً من الاسم

## استكشاف الأخطاء

### خطأ 400: Bad Request
- تحقق من أن جميع الحقول المطلوبة موجودة
- تحقق من أن أسماء الحقول بـ PascalCase
- تحقق من طول النصوص

### خطأ 401: Unauthorized
- تأكد من تسجيل الدخول أولاً
- تحقق من صلاحية التوكن

### مثال على خطأ شائع:

\`\`\`javascript
// ❌ خطأ - أسماء الحقول بـ camelCase
{
  categoryId: 1,
  nameAr: "اسم",
  nameEn: "Name",
  nameKu: "ناو"
}

// ✅ صحيح - PascalCase
{
  CategoryId: 1,
  NameAr: "اسم",
  NameEn: "Name",
  NameKu: "ناو"
}
\`\`\`
