"use client";
import React, { useEffect, useRef, useState } from "react";
import { BrainCircuit, GraduationCap, Compass } from "lucide-react";
import { FaRegFileAlt } from "react-icons/fa";
import { PiBookOpenTextLight, PiFunnelLight } from "react-icons/pi";
import { MdFlightTakeoff } from "react-icons/md";
import { LuMapPinHouse } from "react-icons/lu";
import { RiCompassesLine, RiGeminiLine } from "react-icons/ri";
import { BsTools } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";

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

const ServicePage = () => {
  const services: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[] = [
    {
      icon: <BrainCircuit />,
      title: "Career Counselling",
      description:
        "Personalized sessions to map your interests and strengths with global career opportunities, ensuring a future-proof path.",
    },
    {
      icon: <GraduationCap />,
      title: "University Selection & Admission",
      description:
        "Strategic shortlisting of universities and end-to-end assistance with applications, SOPs, and LORs for top-tier institutions.",
    },
    {
      icon: <FaRegFileAlt />,
      title: "Visa Assistance",
      description:
        "Expert guidance through complex visa documentation, interview preparation, and financial requirement compliance for high success rates.",
    },
    {
      icon: <PiBookOpenTextLight />,
      title: "IELTS / PTE Preparation",
      description:
        "Comprehensive coaching modules and mock tests designed to help you achieve your target scores in proficiency exams.",
    },
    {
      icon: <MdFlightTakeoff />,
      title: "Pre-Departure Support",
      description:
        "Briefing sessions covering travel arrangements, insurance, currency exchange, and cultural adaptation to your new environment.",
    },
    {
      icon: <LuMapPinHouse />,
      title: "Post-Arrival Assistance",
      description:
        "On-ground support for accommodation, local networking, bank account opening, and part-time job guidance in your new city.",
    },
  ];

  const sixPillars: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[] = [
    {
      icon: <Compass />,
      title: "Discover",
      description: "Explore potential and global trends.",
    },
    {
      icon: <PiFunnelLight />,
      title: "Define",
      description: "Specify goals and constraints.",
    },
    {
      icon: <RiCompassesLine />,
      title: "Design",
      description: "Create your academic roadmap.",
    },
    {
      icon: <BsTools />,
      title: "Develop",
      description: "Strengthen your application profile.",
    },
    {
      icon: <AiOutlineSend />,
      title: "Deliver",
      description: "Execute and secure admissions.",
    },
    {
      icon: <RiGeminiLine />,
      title: "Drive",
      description: "Propel your career to new heights.",
    },
  ];

  const guidancePoints: string[] = [
    "Financial documentation tailored to specific embassy rules.",
    "Cultural integration and part-time work law briefings.",
    "Extensive alumni network in every major city.",
  ];

  return (
    <>
      <style>{`
        /* Service card hover */
        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .service-icon {
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        .service-card:hover .service-icon {
          background-color: #0ea5e9;
          color: #fff;
          transform: scale(1.15) rotate(-6deg);
        }

        /* Pillar bubble */
        .pillar-bubble {
          transition: background-color 0.25s ease, border-color 0.25s ease,
                      color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .pillar-item:hover .pillar-bubble {
          background-color: #0ea5e9;
          border-color: #0ea5e9;
          color: #fff;
          transform: scale(1.2);
          box-shadow: 0 6px 20px rgba(14,165,233,0.4);
        }
        .pillar-item {
          transition: transform 0.25s ease;
        }
        .pillar-item:hover { transform: translateY(-4px); }

        /* Connector line fade */
        .pillar-line {
          background: linear-gradient(to right, #bae6fd, #7dd3fc, #38bdf8, #7dd3fc, #bae6fd);
        }

        /* CTA button shimmer */
        .cta-btn {
          position: relative;
          overflow: hidden;
          transition: background-color 0.25s ease, transform 0.2s ease;
        }
        .cta-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.2);
          transform: translateX(-100%);
          transition: transform 0.35s ease;
        }
        .cta-btn:hover::after { transform: translateX(0); }
        .cta-btn:hover { transform: translateY(-2px); }
        .cta-btn:active { transform: translateY(0); }

        /* Guidance image tilt */
        .guidance-img {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .guidance-img:hover {
          transform: scale(1.03) rotate(-1deg);
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
        }

        /* Trust list slide */
        .trust-item {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .trust-item:hover {
          transform: translateX(5px);
          color: #0ea5e9;
        }

        /* Decorative blobs */
        @keyframes blobFloat {
          0%, 100% { transform: scale(1) translate(0,0); }
          50%       { transform: scale(1.08) translate(4px, -6px); }
        }
        .blob { animation: blobFloat 6s ease-in-out infinite; }
      `}</style>

      <div className="w-full bg-white">
        {/* ── Hero ── */}
        <section className="w-full bg-gradient-to-br from-orange-50 via-white to-sky-50 py-14 sm:py-20">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-3 text-center">
            <FadeUp>
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-sky-100 text-sky-600 rounded-full mb-2">
                WHAT WE OFFER
              </span>
              <h1 className="font-bold text-3xl sm:text-4xl text-neutral-700 tracking-wide mt-1">
                Our <span className="text-sky-400">Services</span>
              </h1>
            </FadeUp>
            <FadeUp delay={120}>
              <p className="text-sm text-neutral-500 max-w-xs sm:max-w-md leading-relaxed mt-1">
                Comprehensive support for your study abroad journey. From
                identifying your dreams to landing in your destination, we are
                your trusted partners.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section className="w-full bg-neutral-100 py-12 sm:py-16">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service, i) => (
                <FadeUp key={i} delay={i * 80}>
                  <div className="service-card h-full bg-white rounded-xl shadow-sm border border-neutral-100 p-6 flex flex-col gap-3 cursor-default">
                    <span className="service-icon w-10 h-10 p-2.5 flex items-center justify-center rounded-lg bg-sky-100/70 text-sky-600 text-lg flex-shrink-0">
                      {service.icon}
                    </span>
                    <h3 className="font-semibold text-base text-neutral-700 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Six Pillars ── */}
        <section className="w-full bg-neutral-200/50 py-12 sm:py-16">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-12">
            {/* Header */}
            <FadeUp className="flex flex-col items-center gap-3">
              <h2 className="font-bold text-lg sm:text-xl text-neutral-700 text-center">
                The Six Pillars of Success
              </h2>
              <div className="w-16 h-1 rounded-full bg-orange-400" />
            </FadeUp>

            {/* Pillars — mobile: 2-col grid; lg: single row with connector */}
            <div className="relative">
              {/* Connector line — visible only on lg */}
              <div className="hidden lg:block absolute top-[22px] left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] h-0.5 pillar-line z-0" />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 relative z-10">
                {sixPillars.map((pillar, i) => (
                  <FadeUp key={i} delay={i * 80}>
                    <div className="pillar-item flex flex-col items-center text-center gap-2 cursor-default">
                      <span className="pillar-bubble w-11 h-11 p-2.5 rounded-full border-4 border-sky-300 bg-white text-sky-600 text-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        {pillar.icon}
                      </span>
                      <h3 className="font-semibold text-xs sm:text-sm text-neutral-700 mt-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-snug">
                        {pillar.description}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA + Guidance ── */}
        <section className="w-full py-12 sm:py-16">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14 sm:gap-20">
            {/* CTA card */}
            <FadeUp>
              <div className="rounded-2xl bg-gradient-to-br from-cyan-600 to-sky-700 px-6 sm:px-12 py-10 sm:py-14 flex flex-col items-center gap-4 text-white text-center shadow-lg shadow-sky-400/30 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="blob w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-orange-300/30 absolute -top-10 -right-10 pointer-events-none" />
                <div
                  className="blob w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 absolute -bottom-10 -left-10 pointer-events-none"
                  style={{ animationDelay: "2s" }}
                />

                <h3 className="font-bold text-xl sm:text-2xl md:text-3xl leading-snug max-w-xs sm:max-w-lg relative z-10">
                  Start your journey with expert guidance
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-xs sm:max-w-sm leading-relaxed relative z-10">
                  Our team of seasoned consultants is ready to help you navigate
                  the complexities of global education. Let&apos;s make your
                  dream a reality.
                </p>
                <a
                  href="/contact"
                  className="cta-btn relative z-10 mt-2 px-7 py-2.5 rounded-full bg-yellow-400 text-neutral-800 text-sm font-semibold shadow-md shadow-yellow-300/40"
                >
                  Get a Quote
                </a>
              </div>
            </FadeUp>

            {/* Country Guidance */}
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 pb-8 sm:pb-14">
              {/* Text */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <FadeUp>
                  <h2 className="font-bold text-xl sm:text-2xl text-neutral-800">
                    Country Specific Guidance
                  </h2>
                </FadeUp>
                <FadeUp delay={100}>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    We provide niche expertise across major education hubs
                    including USA, UK, Canada, Australia, and Germany. Each
                    destination has unique challenges — our specialists ensure
                    you&apos;re prepared for all of them.
                  </p>
                </FadeUp>
                <ul className="flex flex-col gap-2 mt-1">
                  {guidancePoints.map((point, i) => (
                    <FadeUp key={i} delay={160 + i * 80}>
                      <li className="trust-item flex items-center gap-2 text-xs sm:text-sm text-neutral-600 cursor-default">
                        <CiCircleCheck className="text-green-600 text-lg flex-shrink-0" />
                        {point}
                      </li>
                    </FadeUp>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <FadeUp
                delay={150}
                className="w-full lg:w-1/2 flex items-center justify-center"
              >
                <div className="relative w-full max-w-sm sm:max-w-md">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq7G6ynVBjl6NQbLqM-ZYpfwtJI7UfA0a4305QhAQz0bZLqB4mVFGPYaOi2w_r7s4YuEDlAn4U4jFBBMJFTFeIah2fThDYJSABzYD214YxW4BydlqRit-0Z9NrRLANBP_xPhfNLOSe96f4YePiIG2axOBgtdredq0n7ITr8wFJ41YVEcLmPcCmio-r4v03a1VarvEUaOxegpgbxwEjXN5d6gzMeH6Zonmkb25I_On6zgPqrb1l5275xaCs_4WkLVaibZCEpG8OF1Rb"
                    className="guidance-img relative z-10 rounded-xl w-full object-cover max-h-72 sm:max-h-80 shadow-md"
                    alt="University campus"
                  />
                  {/* Decorative background tile */}
                  <div className="absolute inset-0 bg-sky-100 rounded-xl rotate-3 z-0" />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicePage;
