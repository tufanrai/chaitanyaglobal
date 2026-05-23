"use client";
import React, { useEffect, useRef, useState } from "react";
import { LuFlag, LuEye, LuGraduationCap, LuHeart } from "react-icons/lu";
import { GiAlliedStar } from "react-icons/gi";
import { ImHammer2 } from "react-icons/im";
import { CiCircleCheck } from "react-icons/ci";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface IMissionAndVision {
  icon: React.ReactNode;
  title: string;
  description: string;
}

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

const AboutUsPage = () => {
  const overviewContent: string[] = [
    `Founded with a deep-rooted commitment to Nepalese students, Chaitanya Global Education began as a small advisory with a big vision. We recognized the immense potential of ambitious students in Nepal and the often confusing landscape of international education.`,
    `Through meticulous guidance and a student-first approach, we have grown into a premier consultancy. Our journey is defined by the thousands of successful admissions and the enduring trust of families who seek a brighter, global future.`,
  ];

  const missionAndVisionContent: IMissionAndVision[] = [
    {
      icon: <LuFlag className="text-xl text-sky-600" />,
      title: "Our Mission",
      description:
        "To provide transparent and personalized guidance to students aspiring for international education, ensuring every applicant finds the perfect match for their academic and career goals.",
    },
    {
      icon: <LuEye className="text-xl text-orange-600" />,
      title: "Our Vision",
      description:
        "To be the most trusted name in global education consultancy, setting the benchmark for ethical practices and successful student outcomes worldwide.",
    },
  ];

  const coreValues: { icon: React.ReactNode; title: string }[] = [
    { icon: <LuEye />, title: "Transparency" },
    { icon: <LuGraduationCap />, title: "Personalized Mentorship" },
    { icon: <GiAlliedStar />, title: "Excellence" },
    { icon: <ImHammer2 />, title: "Integrity" },
    { icon: <LuHeart />, title: "Student Centricity" },
  ];

  const trustContents = {
    title: "Why Nepali Students Trust Us",
    description:
      "Our local expertise is unmatched. We understand the specific educational context of Nepal — from local curriculum equivalencies to financial documentation requirements. This localized knowledge, paired with our expansive global network of partner universities, gives our students a competitive edge.",
    lists: [
      "10+ Years of Local Market Experience",
      "Direct Partnerships with 200+ Global Universities",
      "98% Visa Success Rate for Nepalese Applicants",
    ],
  };

  const stats: { value: string; label: string; color: string; text: string }[] =
    [
      {
        value: "5,000+",
        label: "Students Placed",
        color: "bg-sky-100",
        text: "text-sky-700",
      },
      {
        value: "15+",
        label: "Countries Served",
        color: "bg-orange-100",
        text: "text-orange-700",
      },
      {
        value: "200+",
        label: "Partner Universities",
        color: "bg-green-100",
        text: "text-green-700",
      },
      {
        value: "98%",
        label: "Visa Success Rate",
        color: "bg-purple-100",
        text: "text-purple-700",
      },
    ];

  const team: { img: string; name: string; role: string }[] = [
    {
      img: "https://chaitanyaglobal.com.np/wp-content/uploads/elementor/thumbs/basu-re3k7pebogrk8dnul75yq31h1rsdp7yenmpefebag0.avif",
      name: "Basu Pandey",
      role: "Founder",
    },
    {
      img: "https://chaitanyaglobal.com.np/wp-content/uploads/elementor/thumbs/madan-rdwntrwu5xxqscbc6i0p71s0rvf9f24296okpuloyo.png",
      name: "Madan Pandey",
      role: "C.E.O.",
    },
  ];

  return (
    <>
      <style>{`
        /* Image zoom on hover */
        .story-img {
          transition: transform 0.5s ease, box-shadow 0.4s ease;
        }
        .story-img:hover {
          transform: scale(1.03);
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
        }

        /* Mission/Vision card lift */
        .mv-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .mv-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.08);
        }
        .mv-icon {
          transition: transform 0.3s ease;
        }
        .mv-card:hover .mv-icon {
          transform: rotate(-8deg) scale(1.15);
        }

        /* Core value bubble */
        .value-item {
          transition: transform 0.25s ease;
        }
        .value-item:hover { transform: translateY(-5px); }
        .value-bubble {
          transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .value-item:hover .value-bubble {
          background-color: #0ea5e9;
          color: #fff;
          transform: scale(1.15);
        }

        /* Stat card pop */
        .stat-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        /* Trust list item slide */
        .trust-item {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .trust-item:hover {
          transform: translateX(5px);
          color: #0ea5e9;
        }

        /* Team card */
        .team-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(14,165,233,0.18);
        }
        .team-avatar {
          transition: transform 0.3s ease;
        }
        .team-card:hover .team-avatar {
          transform: scale(1.08);
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

        /* Number count-up feel via scale */
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.85); }
          70%  { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .stat-num { animation: popIn 0.5s ease both; }
      `}</style>

      <div className="w-full bg-white flex flex-col items-center">
        {/* ── Hero ── */}
        <section className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center gap-3 text-center">
          <FadeUp>
            <h1 className="font-bold text-3xl sm:text-4xl text-neutral-900 leading-tight mt-1">
              About Chaitanya Global Education
            </h1>
          </FadeUp>
          <FadeUp delay={120}>
            <p className="text-sm text-neutral-500 max-w-sm sm:max-w-lg leading-relaxed mt-1">
              A trusted partner for global education success since foundation.
              We navigate the complexities of international admissions so you
              can focus on your future.
            </p>
          </FadeUp>
        </section>

        {/* ── Overview / Our Story ── */}
        <section className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          {/* Text */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <FadeUp>
              <h2 className="font-bold text-xl sm:text-2xl text-neutral-800">
                Our Story
              </h2>
            </FadeUp>
            {overviewContent.map((content, i) => (
              <FadeUp key={i} delay={100 + i * 100}>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 text-justify">
                  {content}
                </p>
              </FadeUp>
            ))}
          </div>

          {/* Image */}
          <FadeUp delay={200} className="w-full lg:w-1/2 flex justify-center">
            <div className="overflow-hidden rounded-xl border-2 border-neutral-100 shadow-md w-full max-w-sm lg:max-w-none">
              <img
                src="https://i.pinimg.com/736x/70/4e/54/704e54d345527e61bfb0747b85cf5854.jpg"
                alt="Consulting student"
                className="story-img w-full h-56 sm:h-72 lg:h-80 object-cover"
              />
            </div>
          </FadeUp>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="w-full bg-neutral-100/60 py-12 sm:py-16">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch gap-5 sm:gap-6">
            {missionAndVisionContent.map((contents, i) => (
              <FadeUp key={i} delay={i * 120} className="flex-1">
                <div className="mv-card h-full bg-white rounded-xl shadow-sm border border-neutral-100 p-6 sm:p-8 flex flex-col gap-3">
                  <span
                    className={`mv-icon w-10 h-10 p-2.5 flex items-center justify-center rounded-lg flex-shrink-0 ${i === 0 ? "bg-sky-100" : "bg-orange-100"}`}
                  >
                    {contents.icon}
                  </span>
                  <h3 className="font-semibold text-base sm:text-lg text-neutral-700">
                    {contents.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {contents.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="w-full bg-white py-12 sm:py-16">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8 sm:gap-10">
            <FadeUp className="flex flex-col items-center gap-3">
              <h2 className="font-bold text-lg sm:text-xl text-neutral-800 text-center">
                Our Core Values
              </h2>
              <div className="w-14 h-0.5 rounded-full bg-orange-400" />
            </FadeUp>

            <div className="w-full grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6">
              {coreValues.map((contents, i) => (
                <FadeUp key={i} delay={i * 80}>
                  <div className="value-item flex flex-col items-center gap-2 cursor-default">
                    <span className="value-bubble w-10 h-10 sm:w-12 sm:h-12 rounded-full p-2.5 flex items-center justify-center bg-neutral-100 text-neutral-600 text-lg sm:text-xl shadow-sm">
                      {contents.icon}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-700 font-medium text-center leading-snug">
                      {contents.title}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust / Why Us ── */}
        <section className="w-full bg-neutral-50 py-12 sm:py-16">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Text */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <FadeUp>
                <h2 className="font-bold text-xl sm:text-2xl text-neutral-800">
                  {trustContents.title}
                </h2>
              </FadeUp>
              <FadeUp delay={100}>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  {trustContents.description}
                </p>
              </FadeUp>
              <ul className="flex flex-col gap-2 mt-1">
                {trustContents.lists.map((plus, i) => (
                  <FadeUp key={i} delay={180 + i * 80}>
                    <li className="trust-item flex items-center gap-2 text-xs sm:text-sm text-neutral-600 cursor-default">
                      <CiCircleCheck className="text-green-600 text-lg flex-shrink-0" />
                      {plus}
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </div>

            {/* Stats grid */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, i) => (
                <FadeUp key={i} delay={i * 90}>
                  <div
                    className={`stat-card ${stat.color} rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center gap-1 cursor-default`}
                  >
                    <span
                      className={`stat-num font-extrabold text-2xl sm:text-3xl ${stat.text}`}
                    >
                      {stat.value}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-medium ${stat.text} text-center opacity-80`}
                    >
                      {stat.label}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ── */}
        <section className="w-full bg-white py-12 sm:py-16">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8 sm:gap-10">
            <FadeUp className="flex flex-col items-center gap-3">
              <h2 className="font-bold text-lg sm:text-xl text-neutral-800 text-center">
                Our Leadership
              </h2>
              <div className="w-14 h-0.5 rounded-full bg-sky-400" />
            </FadeUp>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              {team.map((member, i) => (
                <FadeUp key={i} delay={i * 120}>
                  <div className="team-card flex flex-col items-center gap-2 bg-white rounded-2xl shadow-md border border-neutral-100 px-8 py-6 w-48 sm:w-52 cursor-default">
                    <div className="overflow-hidden rounded-full border-2 border-white shadow-md w-20 h-20 sm:w-24 sm:h-24">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="team-avatar w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-bold text-sm sm:text-base text-neutral-700 text-center mt-2">
                      {member.name}
                    </p>
                    <p className="text-xs text-sky-500 font-medium text-center">
                      {member.role}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full bg-neutral-50 py-12 sm:py-16">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <div className="rounded-2xl bg-gradient-to-br from-cyan-600 to-sky-700 px-6 sm:px-12 py-10 sm:py-14 flex flex-col items-center gap-4 text-white text-center shadow-lg shadow-sky-400/30">
                <h3 className="font-bold text-xl sm:text-2xl md:text-3xl leading-snug max-w-xs sm:max-w-lg">
                  Your international education dream is closer than you think
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-xs sm:max-w-sm leading-relaxed">
                  Connect with our experts today and start your journey toward a
                  world-class degree.
                </p>
                <a
                  href="/contact"
                  className="cta-btn mt-2 px-7 py-2.5 rounded-full bg-yellow-400 text-neutral-800 text-sm font-semibold shadow-md shadow-yellow-300/40"
                >
                  Get a Quote
                </a>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUsPage;
