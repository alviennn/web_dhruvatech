import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  Mail,
  MessageCircle,
  Instagram,
  Linkedin,
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

      {/* Highlighted guidance callout */}
      <section className="relative overflow-hidden bg-[#f5f5f5] pt-6 sm:pt-8 lg:pt-10">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] contact-texture sm:opacity-[0.16]" />
        <div className="pointer-events-none absolute -top-40 right-[-220px] h-[420px] w-[420px] rounded-full bg-[#004B08]/[0.055] blur-3xl sm:right-[-160px] sm:h-[520px] sm:w-[520px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[22px] border border-[#1F2A1F]/10 bg-white/70 px-5 py-6 shadow-[0_16px_50px_rgba(31,42,31,0.055)] backdrop-blur sm:rounded-[26px] sm:px-7 sm:py-8 lg:rounded-[28px] lg:px-10 lg:py-10">
            <span className="absolute bottom-6 left-0 top-6 w-1 rounded-r-full bg-gradient-to-b from-[#C99A3D] to-[#E0C16A] sm:bottom-8 sm:top-8" />

            <div className="pointer-events-none absolute -right-28 -top-28 h-[240px] w-[240px] rounded-full bg-[#C99A3D]/10 blur-3xl sm:h-[300px] sm:w-[300px]" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-[260px] w-[260px] rounded-full bg-[#004B08]/[0.05] blur-3xl sm:h-[320px] sm:w-[320px]" />

            <p className="relative max-w-3xl pl-2 text-[clamp(1.05rem,4.8vw,1.65rem)] leading-snug text-[#1F2A1F] sm:pl-0">
              <span className="text-[#C99A3D]">&ldquo;</span>
              {t("contact_form_hint")}
              <span className="text-[#C99A3D]">&rdquo;</span>
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f5f5f5] pb-16 pt-6 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] contact-texture sm:opacity-[0.12]" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#C99A3D]/[0.055] blur-3xl sm:h-[540px] sm:w-[540px]" />

        <div className="relative mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
          <div className="lg:col-span-7">
            <div className="rounded-[22px] border border-[#1F2A1F]/10 bg-white/70 p-5 shadow-[0_16px_50px_rgba(31,42,31,0.055)] backdrop-blur sm:rounded-[26px] sm:p-6 lg:rounded-[28px] lg:p-8">
              {submitted ? (
                <div className="py-12 text-center sm:py-14">
                  <div className="mx-auto mb-6 grid h-[56px] w-[56px] place-items-center rounded-[16px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] sm:h-[60px] sm:w-[60px] sm:rounded-[18px]">
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
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#004B08] px-7 py-3.5 text-sm font-semibold text-[#F3EFDF] shadow-[0_16px_40px_rgba(0,75,8,0.16)] transition-colors hover:bg-[#24452A] sm:w-auto"
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

          <aside className="space-y-5 lg:col-span-5">
            <div className="relative overflow-hidden rounded-[22px] border border-[#1F2A1F]/10 bg-white/70 p-5 text-[#1F2A1F] shadow-[0_16px_50px_rgba(31,42,31,0.055)] backdrop-blur sm:rounded-[26px] sm:p-6 lg:sticky lg:top-28 lg:rounded-[28px] lg:p-8">
              <div className="pointer-events-none absolute -right-28 -top-28 h-[260px] w-[260px] rounded-full bg-[#C99A3D]/10 blur-3xl sm:h-[320px] sm:w-[320px]" />
              <div className="pointer-events-none absolute -bottom-28 -left-28 h-[260px] w-[260px] rounded-full bg-[#004B08]/[0.05] blur-3xl sm:h-[320px] sm:w-[320px]" />

              <div className="relative">
                <h3 className="mb-5 text-xl font-semibold leading-snug text-[#1F2A1F] sm:text-2xl">
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
            </div>
          </aside>
        </div>

        <style>{`
          @keyframes contactTextureMove {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 72px 72px;
            }
          }

          .contact-texture {
            background-image:
              linear-gradient(rgba(31, 42, 31, 0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(31, 42, 31, 0.055) 1px, transparent 1px);
            background-size: 56px 56px;
            animation: contactTextureMove 24s linear infinite;
          }

          @media (min-width: 640px) {
            .contact-texture {
              background-size: 72px 72px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .contact-texture {
              animation: none;
            }
          }
        `}</style>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-2xl border border-[#1F2A1F]/10 bg-[#f5f5f5]/80 px-4 py-3 text-sm text-[#1F2A1F] placeholder:text-[#5F6756]/60 transition-colors focus:border-[#C99A3D] focus:bg-white focus:outline-none sm:text-base";

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
      <span className="mb-2 block text-sm leading-snug text-[#1F2A1F]">
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
    <li className="flex items-center gap-3 rounded-2xl border border-[#1F2A1F]/10 bg-[#f5f5f5]/70 p-3.5 transition-colors hover:border-[#C99A3D]/50 hover:bg-white sm:gap-4 sm:p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] sm:h-11 sm:w-11 sm:rounded-[14px]">
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