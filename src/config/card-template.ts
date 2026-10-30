/**
 * Fixed text of the bilingual (Arabic + English) UPD card, matching the official
 * SASO regulatory template.
 */
export const CARD_TEXT = {
  title_en: ["Unique Under-run Protection Device (UPD)", "Card"],
  title_ar: "بطاقة الرقم المميز للحاجز",
  card_number: { en: "Card Number:", ar: "رقم البطاقة:" },
  card_issue_date: { en: "Card Issue Date:", ar: "تاريخ إصدار البطاقة:" },
  cert_en: "SASO certifies that the Unique Under-run Protection Device (UPD) Card is granted for the device detailed below.",
  cert_ar: "تشهد الهيئة السعودية للمواصفات والمقاييس والجودة بأنه تم منح بطاقة الرقم المميز للحاجز الموضحة بياناتها أدناه.",
  vin: { en: "Vehicle Chassis Number (VIN)", ar: "رقم هيكل المركبة (VIN)" },
  fields: {
    manufacturer_name: { en: "Manufacturer's Name", ar: "اسم المصنع/الورشة" },
    manufacturer_code: { en: "Manufacturer Assigned Code", ar: "رمز المنشأة" },
    country_of_origin: { en: "Country of Origin", ar: "بلد المنشأ" },
    date_of_manufacture: { en: "Date of Manufacture", ar: "تاريخ الصنع" },
    vehicle_model_name: { en: "Vehicle Model Name", ar: "اسم طراز المركبة" },
    vehicle_brand: { en: "Vehicle Brand", ar: "ماركة المركبة" },
    vehicle_model_year: { en: "Vehicle Model Year", ar: "سنة موديل المركبة" },
    upd_type: { en: "UPD Type (Front, Side, Rear)", ar: "نوع الحاجز (أمامي، جانبي، خلفي)" },
    sample_reference: { en: "Sample Reference", ar: "مرجع تجريبي" },
    technical_references: { en: "Technical References", ar: "المتطلبات الفنية" },
  },
  upd_types: {
    F: "Front Barrier",
    S: "Side Barrier",
    R: "Rear Barrier",
  } as Record<string, string>,
  verify_en: [
    "This card was issued electronically and does not require a",
    "stamp or signature. To verify the card and its details, you",
    "can scan the QR code.",
  ],
  verify_ar: [
    "هذه البطاقة صدرت إلكترونياً ولا تحتاج إلى ختم وتوقيع،",
    "وللتحقق من صحة البطاقة وتفاصيلها يمكنكم مسح الـ QR",
    ".Code",
  ],
  disclaimer: "تخضع هذه الشهادة خلال مدة سريانها للأنظمة واللوائح ذات العلاقة في المملكة العربية السعودية وأي تعليمات أو تعديلات تصدرها الهيئة.",
  country_line: { en: "Kingdom of Saudi Arabia", ar: "المملكة العربية السعودية" },
  po_box: { en: "P.O.Box 3437 Riyadh 11471", ar: "ص.ب 3437 الرياض 11471" },
  phones: { t: "T 8001160000", f: "F 0114520086" },
  links: { web: "www.saso.gov.sa", email: "info@saso.gov.sa" },
} as const;

/** Default value of the "Technical References" field (stored on each card in Arabic). */
export const DEFAULT_TECHNICAL_REFERENCES =
  "اللائحة الفنية للحواجز الأمامية والخلفية والجانبية للشاحنات والمقطورات";

/** How the default technical reference is printed on the card: English / Arabic. */
export const DEFAULT_TECHNICAL_REFERENCES_PRINTED =
  `Technical Regulation for Front, Rear, and Side Barriers for Trucks and Trailers / ${DEFAULT_TECHNICAL_REFERENCES}`;
