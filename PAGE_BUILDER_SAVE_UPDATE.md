# تحديث آلية حفظ الـ Components في Page Builder

## المشكلة
حاولنا استخدام `POST /api/Pages/{pageId}/components` لإرسال قائمة (Array) من المكونات لتحديث الصفحة دفعة واحدة، لكن الـ API رفض الطلب بـ `400 Bad Request`.
تبين أن الـ Endpoint يقبل فقط كائن واحد (Object) لإنشاء مكون واحد، ولا يدعم Bulk Insert/Update.

## الحل المطبق

### Manual Bulk Update (Delete All → Create All)

بما أن الـ API لا يوفر Endpoint لاستبدال القائمة بالكامل، قمنا بتنفيذ المنطق التالي في الـ Frontend:

1. **حذف جميع المكونات القديمة:**
   - نمر على قائمة `page.components`.
   - نستدعي `DELETE /api/Pages/components/{id}` لكل مكون.

2. **إضافة المكونات الجديدة:**
   - نمر على قائمة الـ sections الجديدة.
   - نستدعي `POST /api/Pages/{pageId}/components` لكل مكون.

```javascript
// 1. Delete existing
for (const comp of existingComponents) {
  await pagesApi.deletePageComponent(comp.id);
}

// 2. Create new
for (const section of sections) {
  await pagesApi.createPageComponent(pageId, componentData);
}
```

## الفوائد

1. **Reliability:** نستخدم Endpoints مجربة وموثقة (`createPageComponent`, `deletePageComponent`).
2. **Consistency:** نضمن أن حالة الصفحة في الـ Frontend تتطابق تماماً مع الـ Backend (لأننا نحذف كل شيء ونعيد بنائه).
3. **No Backend Changes:** لا نحتاج لتعديل الـ Backend.

## العيوب

1. **Performance:** عدد الطلبات يساوي (عدد المكونات القديمة + عدد المكونات الجديدة). قد يكون بطيئاً للصفحات الكبيرة.
2. **IDs Change:** جميع المكونات ستحصل على IDs جديدة عند كل حفظ.

## كيفية الاختبار

1. افتح صفحة في Page Builder.
2. أضف/احذف/عدّل مكونات.
3. اضغط **Save**.
4. راقب الـ Network tab: سترى سلسلة من طلبات `DELETE` ثم سلسلة من طلبات `POST`.
5. الصفحة يجب أن تُحفظ بنجاح.
