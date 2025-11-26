# ميزة إدارة التصنيفات (Categories Management)

تم إضافة ميزة جديدة لإدارة التصنيفات في لوحة التحكم.

## المكونات الجديدة

### 1. API (`src/api/categories.js`)
تم إنشاء خدمة للتعامل مع الـ API الخاص بالتصنيفات:
- `getCategories`: جلب جميع التصنيفات.
- `getCategory`: جلب تصنيف محدد.
- `createCategory`: إنشاء تصنيف جديد.
- `updateCategory`: تعديل تصنيف.
- `deleteCategory`: حذف تصنيف.

### 2. Hooks (`src/features/categories/hooks/useCategories.js`)
تم إنشاء Custom Hooks باستخدام TanStack Query لإدارة حالة البيانات:
- `useCategories`
- `useCategory`
- `useCreateCategory`
- `useUpdateCategory`
- `useDeleteCategory`

### 3. واجهة المستخدم

#### `CategoriesListPage.jsx`
صفحة تعرض قائمة التصنيفات مع إمكانية:
- عرض الاسم (EN/AR/KU) والـ Slug.
- زر لإضافة تصنيف جديد (يفتح Modal).
- زر لتعديل تصنيف (يفتح Modal).
- زر لحذف تصنيف (مع تأكيد).

#### `CategoryForm.jsx`
نموذج (Form) لإدخال بيانات التصنيف:
- الاسم (إنجليزي، عربي، كردي).
- الرابط (Slug).
- Validation للحقول المطلوبة.

### 4. التنقل (Navigation)
- تم إضافة مسار `/admin/categories` في `App.jsx`.
- تم إضافة رابط "Categories" في الشريط الجانبي (`Sidebar.jsx`) مع أيقونة المجلد.

## كيفية الاستخدام
1. افتح لوحة التحكم (Admin Dashboard).
2. اضغط على "Categories" في القائمة الجانبية.
3. ستظهر قائمة التصنيفات الحالية.
4. اضغط "Add Category" لإضافة تصنيف جديد.
5. استخدم أزرار التعديل والحذف بجانب كل تصنيف لإدارته.
