import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Mail,
  MessageCircle,
  Instagram,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "../components/shared";
import { useT } from "../providers";

const serviceMap: Record<string, string> = {
  website: "Website Development",
  "mobile-app": "Mobile App Development",
  "ai-ml": "AI/ML Solutions",
};

export function Contact() {
  const { t } = useT();
  const [params] = useSearchParams();
  const preset = params.get("service");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    business: "",
    email: "",
    whatsapp: "",
    projectType: "",
    referral: "",
    description: "",
  });

  useEffect(() => {
    if (preset && serviceMap[preset]) {
      setForm((f) => ({ ...f, projectType: serviceMap[preset] }));
    }
  }, [preset]);

  const onChange =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
Hallo DhurvaTech! Saya ingin mengajukan project inquiry 🙏

*Nama:* ${form.fullName}
*Bisnis/Perusahaan:* ${form.business || "-"}
*Email:* ${form.email}
*WhatsApp:* ${form.whatsapp || "-"}
*Tipe Project:* ${form.projectType}
*Referral:* ${form.referral || "-"}

*Deskripsi Project:*
${form.description}
  `.trim();

    const url = `https://wa.me/6289514693178?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title={
          <>
            {t("contact_hero_t1")}{" "}
            <span className="text-[#004B08]">{t("contact_hero_t2")}</span>
          </>
        }
        subtitle={t("contact_hero_sub")}
      />

      <section className="bg-[#f5f5f5] pt-8 sm:pt-10 lg:pt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="rounded-[26px] border border-[#1F2A1F]/10 bg-white px-5 py-6 shadow-[0_18px_55px_rgba(31,42,31,0.045)] sm:rounded-[30px] sm:px-8 sm:py-8 lg:px-10">
            <div className="flex gap-4">
              <span className="mt-1 h-auto w-1 shrink-0 rounded-full bg-[#C99A3D]" />

              <p className="max-w-3xl text-[clamp(1.1rem,4vw,1.65rem)] leading-snug tracking-tight text-[#1F2A1F]">
                <span className="text-[#C99A3D]">&ldquo;</span>
                {t("contact_form_hint")}
                <span className="text-[#C99A3D]">&rdquo;</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-28 lg:pt-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
          <div className="lg:col-span-7">
            <div className="rounded-[28px] border border-[#1F2A1F]/10 bg-white p-5 shadow-[0_20px_65px_rgba(31,42,31,0.055)] sm:p-6 lg:rounded-[32px] lg:p-8">
              {submitted ? (
                <div className="py-12 text-center sm:py-14">
                  <div className="mx-auto mb-6 grid h-[58px] w-[58px] place-items-center rounded-2xl border border-[#D7D2B8] bg-[#F7F6F0] text-[#004B08]">
                    <ArrowUpRight size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold text-[#1F2A1F] sm:text-2xl">
                    {t("contact_received")}
                  </h3>

                  <p className="mx-auto max-w-md text-sm leading-relaxed text-[#5F6756] sm:text-base">
                    {t("contact_received_msg")}
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                    <Field label={t("form_full_name")} required>
                      <input
                        value={form.fullName}
                        onChange={onChange("fullName")}
                        required
                        type="text"
                        className={inputCls}
                      />
                    </Field>

                    <Field label={t("form_business")}>
                      <input
                        value={form.business}
                        onChange={onChange("business")}
                        type="text"
                        className={inputCls}
                      />
                    </Field>

                    <Field label={t("form_email")} required>
                      <input
                        value={form.email}
                        onChange={onChange("email")}
                        required
                        type="email"
                        className={inputCls}
                      />
                    </Field>

                    <Field label={t("form_whatsapp")}>
                      <input
                        value={form.whatsapp}
                        onChange={onChange("whatsapp")}
                        type="tel"
                        className={inputCls}
                      />
                    </Field>

                    <Field label={t("form_project_type")} required>
                      <select
                        value={form.projectType}
                        onChange={onChange("projectType")}
                        required
                        className={inputCls}
                      >
                        <option value="">{t("form_select_type")}</option>
                        <option>Website Development</option>
                        <option>Mobile App Development</option>
                        <option>AI/ML Solutions</option>
                      </select>
                    </Field>

                    <Field label={t("form_referral")}>
                      <select
                        value={form.referral}
                        onChange={onChange("referral")}
                        className={inputCls}
                      >
                        <option value="">{t("form_select_referral")}</option>
                        <option>{t("form_ref_instagram")}</option>
                        <option>{t("form_ref_linkedin")}</option>
                        <option>{t("form_ref_whatsapp")}</option>
                        <option>{t("form_ref_google")}</option>
                        <option>{t("form_ref_friend")}</option>
                        <option>{t("form_ref_portfolio")}</option>
                        <option>{t("form_ref_other")}</option>
                      </select>
                    </Field>
                  </div>

                  <Field label={t("form_description")} required>
                    <textarea
                      value={form.description}
                      onChange={onChange("description")}
                      required
                      rows={5}
                      placeholder={t("form_desc_placeholder")}
                      className={`${inputCls} min-h-[150px] resize-y`}
                    />
                  </Field>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#004B08] px-7 py-3.5 text-sm font-semibold text-[#F3EFDF] shadow-[0_16px_38px_rgba(0,75,8,0.16)] transition-colors hover:bg-[#24452A] sm:w-auto"
                  >
                    {t("cta_send_inquiry")}
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-[28px] border border-[#1F2A1F]/10 bg-white p-5 shadow-[0_20px_65px_rgba(31,42,31,0.055)] sm:p-6 lg:rounded-[32px] lg:p-8">
              <h3 className="mb-5 max-w-sm text-2xl font-semibold leading-tight tracking-tight text-[#1F2A1F] sm:text-3xl">
                {t("contact_direct_title")}
              </h3>

              <ul className="space-y-3">
                <ContactRow
                  icon={MessageCircle}
                  label="WhatsApp"
                  value="+62 895-1469-3178 (DhurvaTech)"
                  link={`https://wa.me/6289514693178?text=${encodeURIComponent(
                    "Hallo DhurvaTech! Saya ingin konsultasi mengenai project saya.",
                  )}`}
                />

                <ContactRow
                  icon={Mail}
                  label="Email"
                  value="dhurvatech@gmail.com"
                  link="mailto:dhurvatech@gmail.com"
                />

                <ContactRow
                  icon={Instagram}
                  label="Instagram"
                  value="@dhruvatech_"
                  link="https://www.instagram.com/dhruvatech_"
                />
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-2xl border border-[#1F2A1F]/10 bg-[#f5f5f5] px-4 py-3 text-sm text-[#1F2A1F] placeholder:text-[#5F6756]/55 transition-colors focus:border-[#004B08]/50 focus:bg-white focus:outline-none sm:text-base";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium leading-snug text-[#1F2A1F]">
        {label} {required && <span className="text-[#C99A3D]">*</span>}
      </span>
      {children}
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  link,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  link?: string;
}) {
  const content = (
    <li className="flex items-center gap-3 rounded-2xl border border-[#1F2A1F]/10 bg-[#f5f5f5] p-3.5 transition-colors hover:border-[#004B08]/25 hover:bg-white sm:gap-4 sm:p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] border border-[#1F2A1F]/10 bg-white text-[#004B08] sm:h-11 sm:w-11 sm:rounded-[14px]">
        <Icon size={18} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-xs leading-snug text-[#5F6756]">{label}</div>
        <div className="truncate text-sm font-medium text-[#1F2A1F] sm:text-base">
          {value}
        </div>
      </div>

      {link && (
        <ArrowUpRight
          size={16}
          className="shrink-0 text-[#5F6756]"
          aria-hidden="true"
        />
      )}
    </li>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}