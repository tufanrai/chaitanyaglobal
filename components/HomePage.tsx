"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GiGraduateCap } from "react-icons/gi";
import { MdEditNote } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { PiHeadCircuitLight } from "react-icons/pi";

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface IService {
  icon: React.ReactNode;
  title: string;
  content: string;
}

interface ISteps {
  title: string;
  content: string;
}

interface IDestination {
  img: string;
  name: string;
  url: string;
}

interface IMember {
  img: string;
  name: string;
  designation: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const services: string[] = [
  "BRITISH COUNCIL",
  "PTE ACADEMIC",
  "TOEFL IBT",
  "IDP IELTS",
];

const keyPoints: string[] = [
  "Transparent Process",
  "Personalized Mentorship",
  "Top Global Partners",
  "Success Oriented",
];

const serviceContent: IService[] = [
  {
    icon: <PiHeadCircuitLight />,
    title: "Career Counselling",
    content:
      "Professional guidance to align your academic choices with long-term career goals.",
  },
  {
    icon: <GiGraduateCap />,
    title: "University Selection",
    content:
      "Curating the best fit universities based on your profile and financial goals.",
  },
  {
    icon: <FaRegFileAlt />,
    title: "Visa Assistance",
    content:
      "Meticulous documentation support to maximize your visa success rate.",
  },
  {
    icon: <MdEditNote />,
    title: "Test Preparation",
    content: "Expert coaching for IELTS and PTE with certified instructors.",
  },
];

const lifeCycleSteps: ISteps[] = [
  { title: "Discover", content: "Exploring potential and interests." },
  { title: "Define", content: "Setting clear academic goals." },
  { title: "Design", content: "Crafting the application strategy." },
  { title: "Develop", content: "Document and profile building." },
  { title: "Deliver", content: "Submission and visa filing." },
  { title: "Drive", content: "Post arrival career success." },
];

const destinations: IDestination[] = [
  {
    img: "https://i.pinimg.com/736x/b7/06/82/b706825591d19f2107752315e71a9640.jpg",
    name: "Canada",
    url: "#",
  },
  {
    img: "https://i.pinimg.com/736x/a4/5f/e0/a45fe0ceef5677c787221b3f3280bfd5.jpg",
    name: "USA",
    url: "#",
  },
  {
    img: "https://i.pinimg.com/736x/58/c4/f7/58c4f75396942c9fc3cb78df04b99757.jpg",
    name: "UK",
    url: "#",
  },
  {
    img: "https://i.pinimg.com/736x/8d/00/ea/8d00ea834b0b5a31a03b9308ef7f97c1.jpg",
    name: "Europe",
    url: "#",
  },
  {
    img: "https://i.pinimg.com/736x/07/f5/43/07f543e865fc3d0cb94a242496bad6b1.jpg",
    name: "South Korea",
    url: "#",
  },
];

const members: IMember[] = [
  {
    img: "https://chaitanyaglobal.com.np/wp-content/uploads/elementor/thumbs/basu-re3k7pebogrk8dnul75yq31h1rsdp7yenmpefebag0.avif",
    name: "Basu Pandey",
    designation: "Founder",
  },
  {
    img: "https://chaitanyaglobal.com.np/wp-content/uploads/elementor/thumbs/madan-rdwntrwu5xxqscbc6i0p71s0rvf9f24296okpuloyo.png",
    name: "Madan Pandey",
    designation: "C.E.O.",
  },
];

// ─── Intersection Observer Hook ───────────────────────────────────────────────

function useInView(threshold = 0.15) {
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

// ─── Animated Section Wrapper ─────────────────────────────────────────────────

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const HomePage = () => {
  // Hero text animation on mount
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Global micro-animation styles ── */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 18s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(30deg); }
          50%       { transform: translateY(-12px) rotate(30deg); }
        }
        @keyframes floatR {
          0%, 100% { transform: translateY(0px) rotate(-30deg); }
          50%       { transform: translateY(-10px) rotate(-30deg); }
        }
        .float-icon  { animation: float  4s ease-in-out infinite; }
        .floatR-icon { animation: floatR 5s ease-in-out infinite; }

        .service-card:hover .service-icon {
          transform: scale(1.18) rotate(-6deg);
          background-color: #38bdf8;
          color: #fff;
        }
        .service-icon { transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease; }

        .dest-card img { transition: transform 0.5s ease; }
        .dest-card:hover img { transform: scale(1.07); }
        .dest-card::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.25) 45%, transparent 100%);
          border-radius: 0.5rem;
          pointer-events: none;
        }

        .member-avatar {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .member-card:hover .member-avatar {
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 16px 40px rgba(14,165,233,.35);
        }

        .step-bubble {
          transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .step-item:hover .step-bubble {
          transform: scale(1.15);
          background-color: #f97316;
          box-shadow: 0 4px 20px rgba(249,115,22,.45);
        }

        .cta-btn {
          position: relative;
          overflow: hidden;
          transition: background-color 0.25s ease, transform 0.2s ease;
        }
        .cta-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,.15);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .cta-btn:hover::after { transform: translateX(0); }
        .cta-btn:hover { transform: translateY(-2px); }
        .cta-btn:active { transform: translateY(0); }

        .outline-btn {
          transition: background-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .outline-btn:hover { transform: translateY(-2px); }
        .outline-btn:active { transform: translateY(0); }

        .key-point {
          transition: transform 0.2s ease;
        }
        .key-point:hover { transform: translateX(4px); }
      `}</style>

      <div className="overflow-x-hidden">
        {/* ── Hero ── */}
        <section className="relative w-full min-h-screen flex items-center overflow-hidden">
          {/* bg image */}
          <div className="absolute inset-0">
            <img
              src="https://i.pinimg.com/736x/0a/db/37/0adb3722e722b445d0c6efba40420823.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20 md:to-white/40" />

          {/* content */}
          <div className="relative w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <span className="inline-block px-3 py-1 font-semibold text-xs bg-orange-400 shadow-md shadow-orange-300/50 text-white rounded-full mb-5">
                EXPERT EDUCATION CONSULTANCY
              </span>
            </div>

            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.7s ease 150ms, transform 0.7s ease 150ms",
              }}
            >
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-neutral-800 max-w-xs sm:max-w-sm lg:max-w-lg tracking-tight leading-tight pb-4">
                Your Dream to Study Abroad Starts Here
              </h1>
            </div>

            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.7s ease 280ms, transform 0.7s ease 280ms",
              }}
            >
              <p className="text-sm sm:text-base text-neutral-700 max-w-xs sm:max-w-sm lg:max-w-md pb-6 leading-relaxed">
                From IELTS preparation to visa processing, we simplify your
                international education journey with personalized roadmaps and
                expert guidance.
              </p>
            </div>

            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.7s ease 400ms, transform 0.7s ease 400ms",
              }}
              className="flex flex-row gap-3"
            >
              <button className="max-w-50 cta-btn px-6 py-2.5 rounded-md bg-sky-500 text-white text-sm font-medium shadow-md shadow-sky-400/40 w-full xs:w-auto">
                Get a Quote
              </button>
              <button className="max-w-50 outline-btn px-6 py-2.5 rounded-md border border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white text-sm font-medium w-full xs:w-auto">
                Explore Destinations
              </button>
            </div>
          </div>
        </section>

        {/* ── Marquee ticker ── */}
        <section className="w-full bg-white border-y border-neutral-100 py-4 overflow-hidden">
          <div className="flex">
            <div className="marquee-track flex items-center gap-10 whitespace-nowrap pr-10">
              {[...services, ...services].map((s, i) => (
                <span
                  key={i}
                  className="font-bold text-sm sm:text-base text-neutral-300 hover:text-sky-400 transition-colors duration-200 cursor-default select-none"
                >
                  {s}
                  <span className="ml-10 text-orange-300">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section className="w-full bg-gradient-to-br from-neutral-100 to-white py-14 md:py-20">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            {/* image block */}
            <FadeUp className="w-full lg:w-auto flex-shrink-0 flex justify-center">
              <div className="relative">
                <div className="rounded-xl overflow-hidden border-4 border-white shadow-xl shadow-neutral-300/60 w-full max-w-sm lg:w-80 lg:h-80">
                  <img
                    src="https://i.pinimg.com/736x/69/fa/43/69fa434336a8cd5585573c087e001aa0.jpg"
                    alt="Chaitanya Global Education"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* floating badge */}
                <div className="absolute -bottom-4 -right-4 sm:bottom-4 sm:right-0 sm:-translate-x-1/2 lg:-right-10 lg:bottom-6 lg:translate-x-0 flex flex-col items-start gap-0.5 text-xs p-3 rounded-xl bg-white/80 backdrop-blur-md shadow-lg border border-white">
                  <span className="text-sky-500 font-extrabold text-lg leading-none">
                    10+
                  </span>
                  <span className="text-neutral-600 tracking-wide">
                    YEARS EXCELLENCE
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* text */}
            <div className="flex flex-col gap-5 w-full lg:max-w-lg">
              <FadeUp delay={100}>
                <h2 className="font-bold text-xl sm:text-2xl text-neutral-800 leading-snug">
                  Empowering Nepalese Students for Global Success
                </h2>
              </FadeUp>
              <FadeUp delay={180}>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed text-justify">
                  Based in Kathmandu, Nepal, Chaitanya Global Education is a
                  premier consultancy dedicated to bridging the gap between
                  local talent and international academic institutions. We
                  specialize in providing transparent, personalized guidance for
                  students aiming for Canada, USA, UK, Europe, and South Korea.
                </p>
              </FadeUp>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {keyPoints.map((point, i) => (
                  <FadeUp key={i} delay={250 + i * 70}>
                    <span className="key-point flex items-center gap-2 text-neutral-700 text-xs sm:text-sm py-2 cursor-default">
                      <FaRegCircleCheck className="text-orange-500 text-base flex-shrink-0" />
                      {point}
                    </span>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="w-full bg-gradient-to-r from-neutral-50 to-white py-14 md:py-20">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp className="flex flex-col items-center gap-2 mb-10 md:mb-14">
              <h2 className="font-bold text-lg sm:text-xl text-neutral-800 text-center">
                Our Comprehensive Services
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 text-center max-w-xs sm:max-w-sm">
                End-to-end support to ensure your study abroad transition is
                seamless and successful.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {serviceContent.map((content, i) => (
                <FadeUp key={i} delay={i * 100}>
                  <div className="service-card h-full flex flex-col gap-4 p-5 md:p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer border border-neutral-100/80">
                    <span className="service-icon w-10 h-10 p-2 rounded-lg bg-sky-100 text-sky-500 flex items-center justify-center text-xl flex-shrink-0">
                      {content.icon}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-neutral-800">
                      {content.title}
                    </span>
                    <span className="text-xs leading-relaxed text-neutral-500">
                      {content.content}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Life-cycle steps ── */}
        <section className="w-full bg-neutral-100 py-14 md:py-20">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-10 md:gap-14">
            <FadeUp className="flex flex-col items-center gap-3">
              <h2 className="font-bold text-lg sm:text-xl text-neutral-800 text-center">
                Our 6-Step Excellence Process
              </h2>
              <div className="w-16 h-0.5 rounded-full bg-orange-400" />
            </FadeUp>

            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
              {lifeCycleSteps.map((step, i) => (
                <FadeUp key={i} delay={i * 90}>
                  <div className="step-item flex flex-col items-center text-center gap-2.5 cursor-default">
                    <span className="step-bubble font-semibold text-white bg-sky-500 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-sm md:text-base shadow-md shadow-sky-300/40">
                      {i + 1}
                    </span>
                    <span className="font-bold text-neutral-800 text-xs sm:text-sm">
                      {step.title}
                    </span>
                    <span className="text-neutral-500 text-xs leading-snug">
                      {step.content}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Destinations ── */}
        <section className="w-full bg-neutral-200 py-10 md:py-14">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 md:gap-8">
            <FadeUp className="flex flex-col gap-1 relative">
              <h2 className="font-bold text-lg sm:text-xl text-neutral-800">
                Study Destinations
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Global opportunities at your fingertips.
              </p>
              <span className="w-12 h-1 rounded-full bg-orange-500 mt-3" />
            </FadeUp>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {destinations.map((destination, i) => (
                <FadeUp key={i} delay={i * 80}>
                  <a
                    href={destination.url}
                    className="dest-card relative block rounded-xl overflow-hidden h-36 sm:h-48 md:h-60 lg:h-72 group"
                  >
                    <img
                      src={destination.img}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-3 md:p-4 font-semibold text-xs sm:text-sm text-white">
                      {destination.name}
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ── */}
        <section className="w-full bg-white py-14 md:py-20">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8 md:gap-12">
            <FadeUp className="flex flex-col items-center gap-1">
              <h2 className="font-bold text-base sm:text-lg text-neutral-800 text-center">
                Our Leadership
              </h2>
              <p className="text-xs text-neutral-500 text-center">
                The visionary experts behind Chaitanya Global
              </p>
            </FadeUp>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
              {members.map((member, i) => (
                <FadeUp key={i} delay={i * 120}>
                  <div className="member-card flex flex-col items-center gap-3 cursor-default">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="member-avatar w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <span className="font-semibold text-base md:text-lg text-sky-500 text-center">
                      {member.name}
                    </span>
                    <span className="font-medium text-xs md:text-sm text-neutral-600 text-center -mt-2">
                      {member.designation}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full bg-linear-90 from-blue-950 from-50% to-sky-400 border-y border-neutral-200 py-14 md:py-20">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-5 md:gap-8 relative">
            {/* decorative floating icons */}
            <span className="float-icon pointer-events-none select-none absolute top-0 left-0 text-4xl sm:text-6xl md:text-8xl text-orange-500/50">
              <GiGraduateCap />
            </span>
            <span className="floatR-icon pointer-events-none select-none absolute bottom-0 right-0 text-4xl sm:text-6xl md:text-8xl text-sky-500/50">
              <PiHeadCircuitLight />
            </span>

            <FadeUp className="flex flex-col items-center gap-4 md:gap-6 z-10">
              <h2 className="font-light text-2xl sm:text-3xl md:text-4xl text-neutral-100 text-center leading-snug">
                Your international education <br className="hidden sm:block" />
                dream is closer than you <br className="hidden sm:block" />
                think
              </h2>
              <p className="text-xs sm:text-sm text-neutral-200 text-center max-w-xs sm:max-w-sm">
                Join thousands of students who have successfully launched their
                careers abroad with Chaitanya Global.
              </p>
              <a
                href="/contact"
                className="cta-btn px-6 py-2.5 rounded-md bg-sky-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-sky-400/40 w-full sm:w-auto text-center"
              >
                GET A QUOTE TODAY
              </a>
            </FadeUp>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
