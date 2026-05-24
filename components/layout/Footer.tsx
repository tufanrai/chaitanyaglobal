"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineLocationOn, MdPhone, MdMail } from "react-icons/md";
import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface INav {
  name: string;
  url: string;
}

interface IContacts {
  icon: React.ReactNode;
  name: string;
  url: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const quickLinks: INav[] = [
  { name: "Home", url: "/" },
  { name: "About us", url: "/about-us" },
  { name: "Services", url: "/services" },
  { name: "Destination", url: "/destinations" },
  { name: "Contact", url: "/contact" },
  { name: "Universities", url: "/universities" },
];

const resourcesLink: INav[] = [{ name: "FAQs", url: "/faq" }];

const contactLinks: IContacts[] = [
  {
    icon: <MdOutlineLocationOn />,
    name: "New Baneswor, Kathmandu",
    url: "https://maps.app.goo.gl/6JpJFbEFKrHqGYDB9",
  },
  {
    icon: <MdPhone />,
    name: "+977-9851434022",
    url: "tel:9851434022",
  },
  {
    icon: <MdMail />,
    name: "info@chaitanyaglobal.com.np",
    url: "mailto:info@chaitanyaglobal.com.np",
  },
];

// ─── InView Hook ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── FadeUp Wrapper ───────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = () => {
  return (
    <>
      <style>{`
        /* Nav link underline slide-in */
        .footer-link {
          position: relative;
          transition: color 0.2s ease;
        }
        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 1.5px;
          width: 0;
          border-radius: 99px;
          background-color: #38bdf8;
          transition: width 0.25s ease;
        }
        .footer-link:hover::after { width: 100%; }
        .footer-link:hover { color: #38bdf8; }

        /* Social icon bounce + colour */
        .social-icon {
          transition: transform 0.25s ease, color 0.2s ease;
        }
        .social-icon:hover {
          transform: translateY(-4px) scale(1.18);
          color: #f97316;
        }

        /* Contact row slide-right */
        .contact-row {
          transition: transform 0.22s ease, color 0.2s ease;
        }
        .contact-row:hover {
          transform: translateX(4px);
          color: #38bdf8;
        }

        /* Copyright fade-in pulse on hover */
        .copyright-text {
          transition: color 0.2s ease;
        }
        .copyright-text:hover { color: #0ea5e9; }
      `}</style>

      <footer className="w-full bg-stone-100">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {/* ── Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-12">
            {/* Brand + Socials */}
            <FadeUp delay={0}>
              <div className="flex flex-col gap-3">
                {/* Logo */}
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-xl sm:text-2xl text-sky-500">
                    Chaitanya
                  </span>
                  <span className="font-bold text-xs text-orange-500 tracking-wide">
                    Global Education
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-[260px]">
                  Simplifying international education for Nepalese students with
                  transparency and integrity.
                </p>

                {/* Social icons */}
                <div className="flex items-center gap-3 mt-1">
                  <a
                    href="https://www.facebook.com/profile.php?id=61581152831067"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="social-icon text-neutral-400 text-lg"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://www.instagram.com/chaitanya.global/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="social-icon text-neutral-400 text-lg"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.tiktok.com/@chaitanyaglobal?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="social-icon text-neutral-400 text-lg"
                  >
                    <FaTiktok />
                  </a>
                </div>
              </div>
            </FadeUp>

            {/* Quick Links */}
            <FadeUp delay={80}>
              <div className="flex flex-col gap-3">
                <span className="font-bold text-neutral-800 text-sm sm:text-base">
                  Quick Links
                </span>
                <ul className="flex flex-col gap-2">
                  {quickLinks.map((nav, i) => (
                    <li key={i}>
                      <a
                        href={nav.url}
                        className="footer-link text-neutral-500 text-xs sm:text-sm font-medium"
                      >
                        {nav.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Resources */}
            <FadeUp delay={160}>
              <div className="flex flex-col gap-3">
                <span className="font-bold text-neutral-800 text-sm sm:text-base">
                  Resources
                </span>
                <ul className="flex flex-col gap-2">
                  {resourcesLink.map((nav, i) => (
                    <li key={i}>
                      <a
                        href={nav.url}
                        className="footer-link text-neutral-500 text-xs sm:text-sm font-medium"
                      >
                        {nav.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Contact */}
            <FadeUp delay={240}>
              <div className="flex flex-col gap-3">
                <span className="font-bold text-neutral-800 text-sm sm:text-base">
                  Contact
                </span>
                <ul className="flex flex-col gap-3">
                  {contactLinks.map((details, i) => (
                    <li key={i}>
                      <a
                        href={details.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-row flex items-start gap-2 text-neutral-500 group"
                      >
                        <span className="text-orange-500 text-base flex-shrink-0 mt-0.5">
                          {details.icon}
                        </span>
                        <span className="text-xs sm:text-sm leading-snug">
                          {details.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>

          {/* ── Copyright ── */}
          <FadeUp delay={300}>
            <div className="border-t border-neutral-300/70 pt-5 md:pt-6">
              <p className="copyright-text text-xs sm:text-sm text-neutral-400 text-center cursor-default select-none">
                &copy; 2026 Chaitanya Global Education. All rights reserved.
              </p>
            </div>
          </FadeUp>
        </div>
      </footer>
    </>
  );
};

export default Footer;
