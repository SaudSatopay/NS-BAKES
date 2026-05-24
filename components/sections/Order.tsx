"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { buildInquiryWhatsAppLink, whatsappLink } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useSound } from "@/context/SoundContext";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DessertArt } from "@/components/ui/DessertArt";
import { BagIcon, CheckIcon, WhatsAppIcon } from "@/components/ui/icons";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const fieldClass =
  "peer w-full rounded-2xl border border-line bg-bg px-4 pb-2.5 pt-6 text-ink outline-none transition-colors placeholder-transparent focus:border-gold";
const labelClass =
  "pointer-events-none absolute left-4 top-4 text-muted transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs";

export function Order() {
  const { open } = useCart();
  const sound = useSound();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = buildInquiryWhatsAppLink(form);
    window.open(link, "_blank", "noopener,noreferrer");
    setSent(true);
    sound.play("add");
  };

  const details = [
    {
      Icon: WhatsAppIcon,
      label: "WhatsApp",
      value: site.phoneDisplay,
      href: whatsappLink(`Hello ${site.name}!`),
    },
    { Icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    {
      Icon: PinIcon,
      label: "Based in",
      value: `${site.location.area}, ${site.location.city}`,
    },
    { Icon: ClockIcon, label: "Hours", value: site.hours },
  ];

  return (
    <section id="order" className="relative overflow-hidden py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-10 hidden h-24 w-24 text-gold/30 lg:block"
      >
        <div className="animate-floater">
          <DessertArt type="donut" />
        </div>
      </div>

      <div className="container grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <span className="eyebrow">Order &amp; enquiries</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tightest sm:text-5xl">
              Let&apos;s make something{" "}
              <span className="gold-text">sweet</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted">
              Tell us what you&apos;re dreaming up, or build your box from the
              menu and check out on WhatsApp in seconds.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={whatsappLink(
                  `Hello ${site.name}! I'd like to place an order.`,
                )}
                target="_blank"
              >
                <WhatsAppIcon className="h-5 w-5" /> Chat to order
              </Button>
              <Button variant="outline" onClick={open}>
                <BagIcon className="h-5 w-5" /> Open my cart
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <dl className="mt-10 grid gap-5 sm:grid-cols-2">
              {details.map(({ Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-gold transition-colors group-hover:border-gold">
                      <Icon className="h-[1.15rem] w-[1.15rem]" />
                    </span>
                    <span>
                      <dt className="text-[0.68rem] uppercase tracking-eyebrow text-muted">
                        {label}
                      </dt>
                      <dd className="mt-0.5 text-ink">{value}</dd>
                    </span>
                  </>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-cursor
                    className="group flex items-center gap-3"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label} className="group flex items-center gap-3">
                    {content}
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <form
            onSubmit={handleSubmit}
            className="rounded-4xl border border-line bg-surface p-6 shadow-soft sm:p-8"
          >
            <h3 className="font-display text-2xl">Send an enquiry</h3>
            <p className="mt-1.5 text-sm text-muted">
              We&apos;ll pick it up on WhatsApp and reply shortly.
            </p>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={fieldClass}
                />
                <label htmlFor="name" className={labelClass}>
                  Your name *
                </label>
              </div>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className={fieldClass}
                />
                <label htmlFor="phone" className={labelClass}>
                  Phone number *
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="What can we bake for you?"
                  value={form.message}
                  onChange={handleChange}
                  className={fieldClass}
                />
                <label htmlFor="message" className={labelClass}>
                  What can we bake for you?
                </label>
              </div>
            </div>

            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink"
              >
                <CheckIcon className="h-4 w-4 text-gold" />
                Opening WhatsApp with your message — see you there!
              </motion.p>
            )}

            <div className="mt-6">
              <Button type="submit" size="lg" fullWidth magnetic={false}>
                <WhatsAppIcon className="h-5 w-5" />
                {sent ? "Open WhatsApp again" : "Send via WhatsApp"}
              </Button>
            </div>
            <p className="mt-3 text-center text-xs text-muted">
              No app spam — this just opens a pre-filled chat.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
