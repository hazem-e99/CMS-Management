# تقرير المشكلة: Components لا تُحفظ

## الوضع الحالي

عند إضافة sections في Page Builder والضغط على Save:
- ✅ لا توجد أخطاء في الـ console
- ✅ تظهر رسالة "Page and components saved successfully!"
- ❌ لكن الـ components لا تظهر في Pages Management (0 components)
- ❌ عند إعادة تحميل Page Builder، الـ sections تختفي

## التحقيقات

### 1. Schema Validation
تم التحقق من `CreatePageComponentDTO`:
- ✅ `pageId`: integer ✓
- ✅ `componentType`: string (max 50) ✓
- ✅ `componentName`: string (max 100, nullable) ✓
- ✅ `contentJsonAr/En/Ku`: string (minLength: 1) ✓
- ✅ `isVisible`: boolean ✓
- ✅ `theme`: ThemeMode (enum: 1 or 2) ✓
- ✅ `orderIndex`: integer ✓

### 2. البيانات المُرسلة
```javascript
{
  pageId: 1,
  componentType: "hero",
  componentName: "hero",
  contentJsonAr: "{}",  // ← قد تكون المشكلة هنا
  contentJsonEn: "{}",
  contentJsonKu: "{}",
  isVisible: true,
  theme: 1,
  orderIndex: 0
}
```

## الاحتمالات

### احتمال 1: Empty JSON Objects
الـ `contentJson` يحتوي على `"{}"` فقط. ربما الـ backend يرفض هذا.

**الحل**: إرسال محتوى فعلي بدلاً من object فارغ.

### احتمال 2: API Call Fails Silently
الـ `createPageComponent` قد يفشل لكن لا نرى الخطأ.

**الحل**: إضافة try-catch لكل component وطباعة الأخطاء.

### احتمال 3: Wrong Endpoint
نستخدم `POST /api/Pages/{pageId}/components` لكن قد يكون هناك endpoint آخر.

**الحل**: التحقق من الـ OpenAPI spec مرة أخرى.

## الخطوات التالية

1. **فتح Console** (F12) في المتصفح
2. **إضافة section** في Page Builder
3. **الضغط على Save**
4. **مراقبة الـ Network tab** لرؤية:
   - هل الـ API calls تُرسل؟
   - ما هي الـ response codes؟
   - هل هناك errors؟

5. **إرسال screenshot** من:
   - Console logs
   - Network tab (filtered by "Pages")

## ملاحظات للمطور

- الكود الحالي يحذف الـ components القديمة ثم يضيف الجديدة
- إذا فشل الحفظ في منتصف العملية، قد تُفقد البيانات
- يُنصح بإضافة transaction أو rollback mechanism
