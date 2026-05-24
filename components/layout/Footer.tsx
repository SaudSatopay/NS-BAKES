import { navLinks, site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  ArrowUpRightIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

const socialIcon: Record<string, (p: { className?: string }) => JSX.Element> = {
  Instagram: InstagramIcon,
};

export function Footer() {
  const waHello = whatsappLink(
    `Hello ${site.name}! I'd love to know more about your bakes.`,
  );

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <div className="container relative z-10 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <Reveal className="max-w-sm">
            <a
              href="#home"
              className="font-display text-3xl font-semibold tracking-tight"
            >
              NS <span className="gold-text">BAKES</span>
            </a>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              {site.tagline} in {site.location.city}. Small-batch cakes,
              brownies, cupcakes &amp; cookies — baked to order with love.
            </p>
            <div className="mt-6 flex gap-3">
              {site.socials.map((s) => {
                const Icon = socialIcon[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    data-cursor
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    {Icon ? <Icon /> : null}
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="eyebrow !text-muted">Explore</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-underline text-ink/80 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="eyebrow !text-muted">Visit</h3>
            <ul className="mt-5 space-y-3 text-ink/80">
              <li>{site.location.area}</li>
              <li>
                {site.location.city}, {site.location.region}
              </li>
              <li className="text-muted">{site.hours}</li>
            </ul>
          </Reveal>

          <Reveal delay={0.18}>
            <h3 className="eyebrow !text-muted">Order &amp; enquiries</h3>
            <p className="mt-5 text-muted">
              Fastest way to reach us is a quick message.
            </p>
            <div className="mt-5">
              <Button href={waHello} target="_blank" size="sm">
                <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
              </Button>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-4 inline-block text-sm text-ink/80 hover:text-ink"
            >
              {site.email}
            </a>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 text-sm text-muted sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Handcrafted &amp; baked with care.</p>
          <a
            href="#home"
            className="group inline-flex items-center gap-1.5 text-ink/80 transition-colors hover:text-gold"
          >
            Back to top
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[20vw] font-semibold leading-none text-ink/[0.035]"
      >
        NS BAKES
      </span>
    </footer>
  );
}
