/* eslint-disable @next/next/no-img-element -- plain <img> elements keep the logos exportable to PDF */
import { CARD_TEXT, DEFAULT_TECHNICAL_REFERENCES, DEFAULT_TECHNICAL_REFERENCES_PRINTED } from "@/config/card-template";
import { COMPANY } from "@/config/company";
import { formatDisplayDate, type UpdCard as UpdCardRecord } from "@/lib/cards";
import s from "./UpdCard.module.css";

export type UpdCardData = Pick<
  UpdCardRecord,
  | "card_number"
  | "manufacturer_name"
  | "manufacturer_code"
  | "country_of_origin"
  | "date_of_manufacture"
  | "technical_references"
  | "vehicle_model_name"
  | "vehicle_brand"
  | "vehicle_model_year"
  | "upd_type"
  | "vehicle_chassis_number"
  | "under_run_number_full"
  | "card_issue_date"
>;

type Props = {
  card: UpdCardData;
  /** Inline SVG markup of the QR code (generated server-side from the verification URL). */
  qrSvg: string;
  ref?: React.Ref<HTMLDivElement>;
};

type FieldKey = keyof typeof CARD_TEXT.fields;

const COLUMN_LEFT = [15.5, 206.5, 397.5];
const ROWS = [
  { top: 294, height: 64 },
  { top: 367, height: 64 },
  { top: 440, height: 64 },
  { top: 513, height: 78 },
];
const VIN_BOXES = 17;

function Field({ field, col, row, children }: { field: FieldKey; col: number; row: number; children: React.ReactNode }) {
  const label = CARD_TEXT.fields[field];
  const { top, height } = ROWS[row];
  return (
    <div className={s.field} style={{ left: `${COLUMN_LEFT[col]}pt`, top: `${top}pt`, height: `${height}pt` }}>
      <div className={s.value}>{children}</div>
      <div className={s.label}>
        <span className={s.labelEn}>{label.en}</span>
        <span lang="ar" className={s.labelAr}>{label.ar}</span>
      </div>
    </div>
  );
}

function countryText(stored: string): string {
  return stored === COMPANY.country_of_origin_ar
    ? `${COMPANY.country_of_origin_en} / ${CARD_TEXT.country_line.ar}`
    : stored;
}

function updTypeDisplay(updType: string): string {
  const parts = updType.toUpperCase().split("/");
  const names: string[] = [];
  if (parts.includes("F")) names.push("Front Barrier");
  if (parts.includes("S")) names.push("Side Barrier");
  if (parts.includes("R")) names.push("Rear Barrier");
  return names.length > 0 ? names.join(", ") : updType;
}

export function UpdCard({ card, qrSvg, ref }: Props) {
  const vin = card.vehicle_chassis_number.split("");
  const vinBoxes = Math.max(VIN_BOXES, vin.length);
  const technicalReferences =
    card.technical_references === DEFAULT_TECHNICAL_REFERENCES
      ? DEFAULT_TECHNICAL_REFERENCES_PRINTED
      : card.technical_references;

  return (
    <div ref={ref} className={s.card} data-upd-card>
      {/* ---------- header band ---------- */}
      <div className={s.header} aria-hidden>
        <i /><i /><i /><i /><i /><i />
      </div>

      <div className={s.titleEn}>
        {CARD_TEXT.title_en.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>

      <div lang="ar" className={s.titleAr}>
        {CARD_TEXT.title_ar}
      </div>

      <dl className={s.metaEn}>
        <dt>{CARD_TEXT.card_number.en}</dt>
        <dd className={s.numHighlight}>{card.card_number}</dd>
        <dt>{CARD_TEXT.card_issue_date.en}</dt>
        <dd>{formatDisplayDate(card.card_issue_date)}</dd>
      </dl>

      <dl className={s.metaAr}>
        <dd className={s.numHighlight}>{card.card_number}</dd>
        <dt lang="ar" dir="rtl">
          {CARD_TEXT.card_number.ar}
        </dt>
        <dd>{formatDisplayDate(card.card_issue_date)}</dd>
        <dt lang="ar" dir="rtl">
          {CARD_TEXT.card_issue_date.ar}
        </dt>
      </dl>

      {/* SASO logo in header */}
      <div className={s.brand}>
        <img className={s.brandLogo} src="/logo.png" alt="Saudi Standards / SASO" />
      </div>

      {/* ---------- Certification statement & ribbon logo ---------- */}
      <div className={s.certArea}>
        <p className={s.certEn}>{CARD_TEXT.cert_en}</p>
        <p lang="ar" dir="rtl" className={s.certAr}>
          {CARD_TEXT.cert_ar}
        </p>
      </div>

      <img className={s.sasoRibbonLogo} src="/saso-ribbon-logo.png" alt="SASO" />

      {/* ---------- Watermark ---------- */}
      <img className={s.watermark} src="/logo-mark.png" alt="" aria-hidden />

      {/* ---------- VIN row ---------- */}
      <div className={s.vin}>
        <div className={s.vinBoxes}>
          {Array.from({ length: vinBoxes }, (_, i) => (
            <div key={i}>{vin[i] ?? ""}</div>
          ))}
        </div>
        <div className={s.vinLabel}>
          <span lang="ar" className={s.labelAr}>{CARD_TEXT.vin.ar}</span>
          <span className={s.labelEn}>{CARD_TEXT.vin.en}</span>
        </div>
      </div>

      {/* ---------- Details grid (3 columns x 4 rows) ---------- */}
      <Field field="manufacturer_name" col={0} row={0}>
        {card.manufacturer_name}
      </Field>
      <Field field="manufacturer_code" col={1} row={0}>
        {card.manufacturer_code}
      </Field>
      <Field field="country_of_origin" col={2} row={0}>
        {countryText(card.country_of_origin)}
      </Field>

      <Field field="date_of_manufacture" col={0} row={1}>
        {card.date_of_manufacture}
      </Field>
      <Field field="vehicle_model_name" col={1} row={1}>
        {card.vehicle_model_name}
      </Field>
      <Field field="vehicle_brand" col={2} row={1}>
        {card.vehicle_brand}
      </Field>

      <Field field="vehicle_model_year" col={0} row={2}>
        {card.vehicle_model_year}
      </Field>
      <Field field="upd_type" col={1} row={2}>
        {updTypeDisplay(card.upd_type)}
      </Field>
      <Field field="sample_reference" col={2} row={2}>
        <span dir="ltr">{card.under_run_number_full}</span>
      </Field>

      <Field field="technical_references" col={0} row={3}>
        {technicalReferences}
      </Field>

      {/* ---------- Divider line ---------- */}
      <div className={s.midDivider} />

      {/* ---------- Verification section with QR code & side boxes ---------- */}
      <div className={s.verifyContainer}>
        <div className={s.verifyCardEn}>
          {CARD_TEXT.verify_en.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div className={s.qrWrapper} dangerouslySetInnerHTML={{ __html: qrSvg }} />

        <div lang="ar" dir="rtl" className={s.verifyCardAr}>
          {CARD_TEXT.verify_ar.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>

      {/* ---------- Legal disclaimer bar ---------- */}
      <div className={s.disclaimerBar}>
        <span>{CARD_TEXT.disclaimer}</span>
      </div>

      {/* ---------- Official SASO contact footer ---------- */}
      <div className={s.footer}>
        <div className={s.footerCol}>
          <span lang="ar" className={s.footerAr}>{CARD_TEXT.country_line.ar}</span>
          <span className={s.footerEn}>{CARD_TEXT.country_line.en}</span>
        </div>
        <div className={s.footerCol}>
          <span lang="ar" className={s.footerAr}>{CARD_TEXT.po_box.ar}</span>
          <span className={s.footerEn}>{CARD_TEXT.po_box.en}</span>
        </div>
        <div className={s.footerCol}>
          <span className={s.footerEn}>{CARD_TEXT.phones.t}</span>
          <span className={s.footerEn}>{CARD_TEXT.phones.f}</span>
        </div>
        <div className={s.footerCol}>
          <span className={s.footerLink}>{CARD_TEXT.links.web}</span>
          <span className={s.footerLink}>{CARD_TEXT.links.email}</span>
        </div>
      </div>
    </div>
  );
}
