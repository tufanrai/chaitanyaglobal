"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  CircleDollarSign,
  FileBadge2,
  GraduationCap,
  HelpCircle,
} from "lucide-react";

interface FAQItem {
  icon: React.ReactNode;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    icon: <CircleDollarSign />,
    question: "What is the total cost to study in Canada?",
    answer:
      "The total cost varies by province and program. On average, tuition fees range from CAD 15,000 to 35,000 per year, while living expenses and GIC requirements are around CAD 20,635 annually.",
  },
  {
    icon: <GraduationCap />,
    question: "What are the IELTS requirements for a student visa?",
    answer:
      "For SDS applications, many undergraduate and postgraduate pathways expect a minimum IELTS score of 6.0 in each band. Some universities and competitive programs may ask for 6.5 or 7.0.",
  },
  {
    icon: <BriefcaseBusiness />,
    question: "Can I work while studying in Canada?",
    answer:
      "Yes. International students with a valid study permit can usually work up to 20 hours per week off campus during academic sessions and full time during scheduled breaks.",
  },
  {
    icon: <FileBadge2 />,
    question: "What are the PR prospects after graduation?",
    answer:
      "Canada offers post-graduation work opportunities that help students build local experience. That experience can strengthen future permanent residency pathways such as Express Entry and provincial nominee programs.",
  },
  {
    icon: <CircleDollarSign />,
    question: "How much bank balance is required for the visa?",
    answer:
      "Students are typically expected to show proof of first-year tuition payment and the required GIC amount. Extra funds for travel and any accompanying family members are also recommended.",
  },
  {
    icon: <HelpCircle />,
    question: "What is the difference between SDS and Non-SDS applications?",
    answer:
      "SDS is generally a faster stream for eligible students who meet stricter language and financial requirements. Non-SDS follows the regular visa route with standard processing and documentation review.",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <style>{`
        .faq-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .faq-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 38px rgba(14,165,233,0.12);
          border-color: rgba(125,211,252,0.9);
        }
        .faq-icon {
          transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
        }
        .faq-card:hover .faq-icon {
          transform: scale(1.08) rotate(-6deg);
          background-color: #0ea5e9;
          color: #fff;
        }
        .faq-toggle {
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .faq-open .faq-toggle {
          transform: rotate(180deg);
          color: #0ea5e9;
        }
      `}</style>

      <div className="w-full bg-white">
        <section className="w-full bg-gradient-to-br from-orange-50 via-white to-sky-50 py-14 sm:py-20">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-3 text-center">
            <FadeUp>
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-sky-100 text-sky-600 rounded-full mb-2">
                STUDENT SUPPORT
              </span>
              <h1 className="font-bold text-3xl sm:text-4xl text-neutral-700 tracking-wide">
                Frequently Asked <span className="text-sky-400">Questions</span>
              </h1>
            </FadeUp>
          </div>
        </section>

        <section className="w-full bg-neutral-100 py-12 sm:py-16">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <FadeUp className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-white border border-neutral-100 shadow-sm px-5 sm:px-7 py-5">
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-base sm:text-lg text-neutral-700">
                    Canada FAQ 
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Tuition, IELTS, visa funding, work rights, and post-study
                    pathways in one place.
                  </p>
                </div>
              </div>
            </FadeUp>

            <div className="flex flex-col gap-4">
              {faqData.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <FadeUp key={faq.question} delay={index * 70}>
                    <article
                      className={`faq-card ${isOpen ? "faq-open" : ""} rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenIndex(isOpen ? null : index)
                        }
                        className="w-full px-5 sm:px-6 py-5 text-left flex items-start gap-4"
                        aria-expanded={isOpen}
                      >
                        <span className="faq-icon mt-0.5 w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                          {faq.icon}
                        </span>
                        <span className="flex-1">
                          <span className="block font-semibold text-sm sm:text-base text-neutral-700 leading-relaxed">
                            {faq.question}
                          </span>
                        </span>
                        <ChevronDown className="faq-toggle w-5 h-5 text-neutral-400 flex-shrink-0 mt-1" />
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-5">
                          <div className="ml-14 border-l-2 border-sky-100 pl-4">
                            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </article>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
