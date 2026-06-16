import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  Mail,
  MessageCircle,
  Instagram,
  Linkedin,
  ArrowUpRight,
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

    const url = `https://wa.me/6289514693178?text=${encodeURIComponent(message)}`;
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
      <section className="relative overflow-hidden bg-[#f5f5f5] pt-8 lg:pt-10 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] contact-texture" />
        <div className="pointer-events-none absolute -top-40 right-[-160px] h-[520px] w-[520px] rounded-full bg-[#004B08]/[0.06] blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[28px] border border-[#1F2A1F]/10 bg-white/70 px-7 py-8 shadow-[0_18px_60px_rgba(31,42,31,0.06)] backdrop-blur lg:px-10 lg:py-10">
            <span className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-gradient-to-b from-[#C99A3D] to-[#E0C16A]" />

            <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-[#C99A3D]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-28 -left-28 w-[320px] h-[320px] rounded-full bg-[#004B08]/[0.05] blur-3xl pointer-events-none" />

            <p className="relative text-[clamp(1.2rem,2vw,1.65rem)] leading-snug text-[#1F2A1F] max-w-3xl">
              <span className="text-[#C99A3D]">&ldquo;</span>
              {t("contact_form_hint")}
              <span className="text-[#C99A3D]">&rdquo;</span>
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f5f5f5] pt-8 pb-20 lg:pt-10 lg:pb-28 transition-colors">
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] contact-texture" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-[#C99A3D]/[0.06] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="rounded-[28px] bg-white/70 border border-[#1F2A1F]/10 p-6 lg:p-8 shadow-[0_18px_60px_rgba(31,42,31,0.06)] backdrop-blur">
              {submitted ? (
                <div className="text-center py-14">
                  <div className="w-[60px] h-[60px] rounded-[18px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] grid place-items-center mx-auto mb-6">
                    <ArrowUpRight size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-2xl text-[#1F2A1F] mb-3">
                    {t("contact_received")}
                  </h3>

                  <p className="text-[#5F6756] max-w-md mx-auto leading-relaxed">
                    {t("contact_received_msg")}
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
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
                      className={inputCls}
                    />
                  </Field>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#004B08] text-[#F3EFDF] shadow-[0_16px_40px_rgba(0,75,8,0.16)] hover:bg-[#24452A] transition-colors"
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

          <aside className="lg:col-span-5 space-y-5">
            <div className="rounded-[28px] bg-white/70 text-[#1F2A1F] border border-[#1F2A1F]/10 p-6 lg:p-8 relative overflow-hidden shadow-[0_18px_60px_rgba(31,42,31,0.06)] backdrop-blur">
              <div className="absolute -top-24 -right-24 w-[320px] h-[320px] rounded-full bg-[#C99A3D]/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-28 -left-28 w-[320px] h-[320px] rounded-full bg-[#004B08]/[0.05] blur-3xl pointer-events-none" />

              <div className="relative">
                <h3 className="text-2xl mb-5 leading-snug text-[#1F2A1F]">
                  {t("contact_direct_title")}
                </h3>

                <ul className="space-y-3">
                  <ContactRow
                    icon={MessageCircle}
                    label="WhatsApp"
                    value="+62 895-1469-3178 (DhurvaTech)"
                    link={`https://wa.me/6289514693178?text=${encodeURIComponent("Hallo DhurvaTech! Saya ingin konsultasi mengenai project saya.")}`}
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
            background-size: 72px 72px;
            animation: contactTextureMove 24s linear infinite;
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
  "w-full px-4 py-3 rounded-2xl border border-[#1F2A1F]/10 bg-[#f5f5f5]/80 text-[#1F2A1F] placeholder:text-[#5F6756]/60 focus:outline-none focus:border-[#C99A3D] focus:bg-white transition-colors";

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
      <span className="block text-sm text-[#1F2A1F] mb-2">
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
  icon: any;
  label: string;
  value: string;
  link?: string;
}) {
  const inner = (
    <li className="flex items-center gap-4 rounded-2xl border border-[#1F2A1F]/10 bg-[#f5f5f5]/70 p-4 transition-colors hover:border-[#C99A3D]/50 hover:bg-white">
      <div className="w-11 h-11 rounded-[14px] border border-[#D7D2B8] bg-[#F7F6F0]/80 text-[#004B08] grid place-items-center shrink-0">
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-[#5F6756]">{label}</div>
        <div className="text-[#1F2A1F] truncate">{value}</div>
      </div>
      {link && <ArrowUpRight size={16} className="text-[#5F6756] shrink-0" />}
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
        {inner}
      </a>
    );
  }

  return inner;
}
