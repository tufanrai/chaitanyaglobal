"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface IUrl {
  name: string;
  url: string;
}

interface IInfo {
  icon: React.ReactNode;
  category: string;
  content: IUrl[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const informations: IInfo[] = [
  {
    icon: <MdLocationOn />,
    category: "VISIT US",
    content: [
      {
        name: "New Baneshwor, Kathmandu, Nepal",
        url: "https://maps.app.goo.gl/bgcxJjxDEFwALDbE8",
      },
    ],
  },
  {
    icon: <MdEmail />,
    category: "EMAIL SUPPORT",
    content: [
      {
        name: "info@chaitanyaglobal.com.np",
        url: "mailto:info@chaitanyaglobal.com.np",
      },
    ],
  },
  {
    icon: <MdPhone />,
    category: "CALL US",
    content: [
      { name: "+977-01-5927986", url: "tel:01-5927986" },
      { name: "+977-9851434022", url: "tel:9851434022" },
    ],
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const ContactUs = () => {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClass = (name: string) =>
    `w-full text-sm text-neutral-700 border rounded-md px-3 py-2 bg-neutral-50 outline-none transition-all duration-200 ${
      focused === name
        ? "border-sky-400 bg-white ring-2 ring-sky-100"
        : "border-neutral-300 hover:border-neutral-400"
    }`;

  return (
    <>
      <style>{`
        /* Info card hover */
        .info-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .info-card:hover {
          transform: translateX(5px);
        }
        .info-icon {
          transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .info-card:hover .info-icon {
          background-color: #0ea5e9;
          color: #fff;
          transform: scale(1.12) rotate(-6deg);
        }

        /* Submit button shimmer */
        .submit-btn {
          position: relative;
          overflow: hidden;
          transition: background-color 0.25s ease, transform 0.2s ease;
        }
        .submit-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,.15);
          transform: translateX(-100%);
          transition: transform 0.35s ease;
        }
        .submit-btn:hover::after { transform: translateX(0); }
        .submit-btn:hover { transform: translateY(-2px); background-color: #0284c7; }
        .submit-btn:active { transform: translateY(0); }

        /* Success pop */
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.9); }
          60%  { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        .pop-in { animation: popIn 0.35s ease forwards; }

        /* Map fade-in */
        @keyframes mapFade {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .map-animate { animation: mapFade 0.7s ease 0.2s both; }
      `}</style>

      <div className="w-full flex flex-col items-center bg-gradient-to-br from-neutral-100 to-white text-black">
        {/* ── Hero ── */}
        <section className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center gap-3 text-center">
          <FadeUp>
            <h1 className="font-bold text-3xl sm:text-4xl text-neutral-800 leading-tight">
              Contact Us
            </h1>
          </FadeUp>
          <FadeUp delay={120}>
            <p className="text-sm text-neutral-500 max-w-sm sm:max-w-md leading-relaxed">
              Let&apos;s help you start your global journey with guided clarity
              and professional excellence.
            </p>
          </FadeUp>
        </section>

        {/* ── Form + Contacts ── */}
        <section className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 flex flex-col lg:flex-row items-start gap-8 lg:gap-14">
          {/* ── Left: Contact Info ── */}
          <FadeUp
            delay={80}
            className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-xl sm:text-2xl text-sky-700">
                Get in Touch
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
                Our educational experts are ready to guide you through every
                step of your international application process.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {informations.map((info, i) => (
                <FadeUp key={i} delay={160 + i * 80}>
                  <div className="info-card flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-neutral-100 cursor-default">
                    <span className="info-icon p-2.5 text-xl text-sky-500 bg-sky-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      {info.icon}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-xs text-neutral-400 tracking-wider">
                        {info.category}
                      </span>
                      {info.content.map((c, ind) => (
                        <a
                          key={ind}
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm text-neutral-600 hover:text-sky-500 transition-colors duration-200"
                        >
                          {c.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {/* ── Right: Form ── */}
          <FadeUp delay={200} className="w-full flex-1">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-2xl shadow-md border border-neutral-100 bg-white p-5 sm:p-8 flex flex-col gap-4"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    className="text-sm font-medium text-neutral-700"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    className={inputClass("fullName")}
                    onFocus={() => setFocused("fullName")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-sm font-medium text-neutral-700"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className={inputClass("emailAddress")}
                    onFocus={() => setFocused("emailAddress")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    className="text-sm font-medium text-neutral-700"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+977 98XXXXXX"
                    className={inputClass("phoneNumber")}
                    onFocus={() => setFocused("phoneNumber")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-sm font-medium text-neutral-700"
                    htmlFor="country"
                  >
                    Interested Country
                  </label>
                  <select
                    id="country"
                    className={inputClass("country")}
                    onFocus={() => setFocused("country")}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="">Select a country</option>
                    <option value="Canada">Canada</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Europe">Europe</option>
                    <option value="SouthKorea">South Korea</option>
                  </select>
                </div>
              </div>

              {/* Textarea */}
              <div className="flex flex-col gap-1">
                <label
                  className="text-sm font-medium text-neutral-700"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your educational goals..."
                  rows={5}
                  className={`resize-none ${inputClass("message")}`}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {/* Submit */}
              {submitted ? (
                <div className="pop-in w-full py-2.5 rounded-md bg-green-500 text-white text-sm font-medium text-center">
                  ✓ Message sent! We&apos;ll be in touch soon.
                </div>
              ) : (
                <button
                  type="submit"
                  className="submit-btn w-full py-2.5 rounded-md bg-sky-500 text-white text-sm font-medium shadow-md shadow-sky-400/30"
                >
                  Send Message
                </button>
              )}
            </form>
          </FadeUp>
        </section>

        {/* ── Map ── */}
        <section className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <div className="map-animate w-full rounded-2xl overflow-hidden border-2 border-white shadow-lg shadow-neutral-300/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3831.9588761533787!2d85.3323021756726!3d27.688049026341915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190066fe59d5%3A0x7c75f049297fd452!2sChaitanya%20Global%20Education!5e1!3m2!1sen!2snp!4v1778386906031!5m2!1sen!2snp"
              width="600"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-56 sm:h-72 md:h-96"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
