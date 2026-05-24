"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Globe,
  BadgeCheck,
  HeartHandshake,
  Search,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IUniversity {
  img: string;
  country: string;
  name: string;
  description: string;
  courses: string[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const universities: IUniversity[] = [
  {
    img: "https://i.pinimg.com/736x/b7/06/82/b706825591d19f2107752315e71a9640.jpg",
    country: "Canada",
    name: "University of Waterloo",
    description:
      "Famous for its cooperative education (co-op) programs, offering unparalleled industry experience alongside academics.",
    courses: ["Computer Science", "Engineering", "Mathematics"],
  },
  {
    img: "https://i.pinimg.com/736x/a4/5f/e0/a45fe0ceef5677c787221b3f3280bfd5.jpg",
    country: "USA",
    name: "Stanford University",
    description:
      "Located in Silicon Valley, it is renowned for its entrepreneurial spirit and world-class programs across all disciplines.",
    courses: ["Business", "Computer Science", "Law"],
  },
  {
    img: "https://i.pinimg.com/736x/8d/00/ea/8d00ea834b0b5a31a03b9308ef7f97c1.jpg",
    country: "Europe",
    name: "Sorbonne University",
    description:
      "A world-class, multidisciplinary research university located in the heart of Paris, renowned for arts, humanities, and sciences.",
    courses: ["Arts", "Humanities", "Sciences"],
  },
  {
    img: "https://i.pinimg.com/736x/07/f5/43/07f543e865fc3d0cb94a242496bad6b1.jpg",
    country: "South Korea",
    name: "Seoul National University (SNU)",
    description:
      "The most prestigious university in South Korea, offering highly competitive and globally recognized academic programs.",
    courses: ["Engineering", "Business", "Medicine"],
  },
  {
    img: "https://i.pinimg.com/736x/58/c4/f7/58c4f75396942c9fc3cb78df04b99757.jpg",
    country: "UK",
    name: "University of Cambridge",
    description:
      "Globally revered for its historic tradition of academic excellence, particularly in mathematics and the sciences.",
    courses: ["Mathematics", "Sciences", "Engineering"],
  },
  {
    img: "https://i.pinimg.com/736x/b7/06/82/b706825591d19f2107752315e71a9640.jpg",
    country: "Canada",
    name: "University of British Columbia",
    description:
      "Renowned for its beautiful campuses and strong emphasis on research, sustainability, and global perspectives.",
    courses: ["Environmental Science", "Business", "Forestry"],
  },
  {
    img: "https://i.pinimg.com/736x/58/c4/f7/58c4f75396942c9fc3cb78df04b99757.jpg",
    country: "UK",
    name: "University of Oxford",
    description:
      "The oldest university in the English-speaking world, offering a unique collegiate system and unparalleled academic history.",
    courses: ["Humanities", "Medicine", "Law"],
  },
  {
    img: "https://i.pinimg.com/736x/8d/00/ea/8d00ea834b0b5a31a03b9308ef7f97c1.jpg",
    country: "Europe",
    name: "KU Leuven",
    description:
      "A highly ranked research university in Belgium, celebrated for its historic campus and cutting-edge innovation.",
    courses: ["Theology", "Engineering", "Medicine"],
  },
  {
    img: "https://i.pinimg.com/736x/a4/5f/e0/a45fe0ceef5677c787221b3f3280bfd5.jpg",
    country: "USA",
    name: "Massachusetts Institute of Technology (MIT)",
    description:
      "A global leader in science and technology, known for cutting-edge research and innovation.",
    courses: ["Engineering", "Computer Science", "Physics"],
  },
  {
    img: "https://i.pinimg.com/736x/07/f5/43/07f543e865fc3d0cb94a242496bad6b1.jpg",
    country: "South Korea",
    name: "Korea Advanced Institute of Science and Technology (KAIST)",
    description:
      "A premier national research university focused heavily on deep science, engineering, and technology innovation.",
    courses: ["Robotics", "Computer Science", "Engineering"],
  },
  {
    img: "https://i.pinimg.com/736x/b7/06/82/b706825591d19f2107752315e71a9640.jpg",
    country: "Canada",
    name: "University of Alberta",
    description:
      "A top teaching and research university in Canada, internationally recognized for excellence across the humanities, sciences, and engineering.",
    courses: ["Engineering", "Energy", "Agriculture"],
  },
  {
    img: "https://i.pinimg.com/736x/8d/00/ea/8d00ea834b0b5a31a03b9308ef7f97c1.jpg",
    country: "Europe",
    name: "ETH Zurich",
    description:
      "A leading player in research and education in Switzerland and worldwide, specializing in science, technology, engineering, and mathematics.",
    courses: ["Engineering", "Architecture", "Physics"],
  },
  {
    img: "https://i.pinimg.com/736x/58/c4/f7/58c4f75396942c9fc3cb78df04b99757.jpg",
    country: "UK",
    name: "Imperial College London",
    description:
      "A science-based institution consistently rated amongst the world's best, focusing on science, engineering, medicine, and business.",
    courses: ["Engineering", "Medicine", "Business"],
  },
  {
    img: "https://i.pinimg.com/736x/a4/5f/e0/a45fe0ceef5677c787221b3f3280bfd5.jpg",
    country: "USA",
    name: "Harvard University",
    description:
      "The oldest institution of higher education in the US, known for its historic legacy, vast resources, and academic excellence.",
    courses: ["Law", "Medicine", "Humanities"],
  },
  {
    img: "https://i.pinimg.com/736x/a4/5f/e0/a45fe0ceef5677c787221b3f3280bfd5.jpg",
    country: "USA",
    name: "California Institute of Technology (Caltech)",
    description:
      "A world-renowned science and engineering institute marshaling some of the world's brightest minds and most innovative tools.",
    courses: ["Physics", "Engineering", "Astronomy"],
  },
  {
    img: "https://i.pinimg.com/736x/07/f5/43/07f543e865fc3d0cb94a242496bad6b1.jpg",
    country: "South Korea",
    name: "Pohang University of Science and Technology (POSTECH)",
    description:
      "A private research university dedicated to science and engineering, working closely with industry partners.",
    courses: ["Materials Science", "Physics", "Engineering"],
  },
  {
    img: "https://i.pinimg.com/736x/8d/00/ea/8d00ea834b0b5a31a03b9308ef7f97c1.jpg",
    country: "Europe",
    name: "University of Amsterdam",
    description:
      "The Netherlands' largest university, offering a highly international environment and top-ranked programs in media and communication.",
    courses: ["Social Sciences", "Media Studies", "Business"],
  },
  {
    img: "https://i.pinimg.com/736x/07/f5/43/07f543e865fc3d0cb94a242496bad6b1.jpg",
    country: "South Korea",
    name: "Yonsei University",
    description:
      "A leading private research university in Seoul known for its beautiful campus, comprehensive programs, and international exchange.",
    courses: ["Business", "Medicine", "International Relations"],
  },
  {
    img: "https://i.pinimg.com/736x/58/c4/f7/58c4f75396942c9fc3cb78df04b99757.jpg",
    country: "UK",
    name: "University College London (UCL)",
    description:
      "London's leading multidisciplinary university, known for its progressive approach and diverse, international community.",
    courses: ["Architecture", "Education", "Social Sciences"],
  },
  {
    img: "https://i.pinimg.com/736x/b7/06/82/b706825591d19f2107752315e71a9640.jpg",
    country: "Canada",
    name: "McMaster University",
    description:
      "A research-intensive public university widely recognized for its innovative, problem-based approach to learning.",
    courses: ["Health Sciences", "Engineering", "Business"],
  },
  {
    img: "https://i.pinimg.com/736x/8d/00/ea/8d00ea834b0b5a31a03b9308ef7f97c1.jpg",
    country: "Europe",
    name: "Technical University of Munich (TUM)",
    description:
      "One of Europe's top universities, known for its strong focus on engineering, technology, and applied sciences in Germany.",
    courses: ["Engineering", "Computer Science", "Management"],
  },
  {
    img: "https://i.pinimg.com/736x/b7/06/82/b706825591d19f2107752315e71a9640.jpg",
    country: "Canada",
    name: "McGill University",
    description:
      "A prestigious institution known for its rigorous academics, diverse international student body, and strong research focus.",
    courses: ["Medicine", "Arts", "Engineering"],
  },
  {
    img: "https://i.pinimg.com/736x/58/c4/f7/58c4f75396942c9fc3cb78df04b99757.jpg",
    country: "UK",
    name: "University of Edinburgh",
    description:
      "One of Scotland's ancient universities, deeply embedded in the historic and cultural fabric of its capital city.",
    courses: ["Medicine", "Arts", "Informatics"],
  },
  {
    img: "https://i.pinimg.com/736x/07/f5/43/07f543e865fc3d0cb94a242496bad6b1.jpg",
    country: "South Korea",
    name: "Korea University",
    description:
      "One of the SKY universities, renowned for its strong alumni network, rigorous academics, and historic traditions.",
    courses: ["Law", "Business", "Engineering"],
  },
  {
    img: "https://i.pinimg.com/736x/a4/5f/e0/a45fe0ceef5677c787221b3f3280bfd5.jpg",
    country: "USA",
    name: "University of California, Berkeley",
    description:
      "A premier public research university known for its activism, diverse community, and top-tier academic programs.",
    courses: ["Computer Science", "Engineering", "Economics"],
  },
];

const reasonContents: {
  icon: React.ReactNode;
  title: string;
  overview: string;
}[] = [
  {
    icon: <Globe className="text-sky-600" />,
    title: "Wide Network",
    overview:
      "Access to 500+ top-tier universities across more than 20 countries worldwide.",
  },
  {
    icon: <BadgeCheck className="text-orange-600" />,
    title: "High Success Rate",
    overview:
      "98% admission success rate with personalized application mentoring and portfolio reviews.",
  },
  {
    icon: <HeartHandshake className="text-sky-600" />,
    title: "Direct Partnerships",
    overview:
      "Official representative status for major global institutions ensuring smooth communication.",
  },
];

const PAGE_SIZE = 9;

// ─── InView Hook ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
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
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── University Card ──────────────────────────────────────────────────────────

function UniCard({ uni, delay }: { uni: IUniversity; delay: number }) {
  return (
    <FadeUp delay={delay} className="h-full">
      <div className="uni-card h-full bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-100 flex flex-col">
        <div className="overflow-hidden h-40 sm:h-44 flex-shrink-0">
          <img
            src={uni.img}
            alt={uni.country}
            className="uni-card-img w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1">
          <span className="py-1 px-3 font-semibold text-xs bg-sky-100/70 text-sky-600 rounded-full w-fit">
            {uni.country}
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-semibold text-sm sm:text-base text-neutral-700 leading-snug">
              {uni.name}
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {uni.description}
            </p>
          </div>
          <div className="mt-auto pt-3">
            <h4 className="font-bold text-xs text-neutral-400 tracking-wider mb-2">
              POPULAR COURSES
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {uni.courses.map((course, j) => (
                <span
                  key={j}
                  className="course-tag rounded-lg font-semibold text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 cursor-default"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const UniversitiesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("null");
  const [selectedCourse, setSelectedCourse] = useState("null");
  const [pageNo, setPageNo] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter logic
  const filtered = useMemo(() => {
    return universities.filter((uni) => {
      const matchesSearch = uni.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      const matchesCountry =
        selectedCountry === "null" || uni.country === selectedCountry;
      const matchesCourse =
        selectedCourse === "null" ||
        uni.courses.some((c) =>
          c.toLowerCase().includes(selectedCourse.toLowerCase()),
        );
      return matchesSearch && matchesCountry && matchesCourse;
    });
  }, [searchQuery, selectedCountry, selectedCourse]);

  // Reset to page 1 on filter change
  useEffect(() => {
    setPageNo(1);
  }, [searchQuery, selectedCountry, selectedCourse]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (pageNo - 1) * PAGE_SIZE,
    pageNo * PAGE_SIZE,
  );

  const handlePageChange = (next: number) => {
    setPageNo(next);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("null");
    setSelectedCourse("null");
  };

  const hasFilters =
    searchQuery || selectedCountry !== "null" || selectedCourse !== "null";

  return (
    <>
      <style>{`
        /* University card */
        .uni-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .uni-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.09); }
        .uni-card-img { transition: transform 0.5s ease; }
        .uni-card:hover .uni-card-img { transform: scale(1.06); }

        /* Course tag */
        .course-tag { transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
        .course-tag:hover { background-color: #0ea5e9; color: #fff; transform: translateY(-2px); }

        /* Search bar focus ring */
        .search-bar { transition: box-shadow 0.25s ease; }
        .search-bar:focus-within { box-shadow: 0 0 0 3px rgba(56,189,248,0.25); }

        /* Reason card */
        .reason-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .reason-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
        .reason-icon { transition: background-color 0.25s ease, color 0.25s ease, transform 0.25s ease; }
        .reason-card:hover .reason-icon { background-color: #0ea5e9; color: #fff; transform: scale(1.15) rotate(-6deg); }

        /* Pagination buttons */
        .page-btn { transition: background-color 0.2s ease, transform 0.2s ease; }
        .page-btn:hover:not(:disabled) { background-color: #0ea5e9; color: #fff; transform: scale(1.08); }
        .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* CTA buttons */
        .cta-primary { position: relative; overflow: hidden; transition: background-color 0.25s ease, transform 0.2s ease; }
        .cta-primary::after { content: ""; position: absolute; inset: 0; background: rgba(255,255,255,0.2); transform: translateX(-100%); transition: transform 0.35s ease; }
        .cta-primary:hover::after { transform: translateX(0); }
        .cta-primary:hover { background-color: #ca8a04; transform: translateY(-2px); }
        .cta-outline { transition: background-color 0.25s ease, color 0.25s ease, transform 0.2s ease; }
        .cta-outline:hover { background-color: rgba(255,255,255,0.15); transform: translateY(-2px); }

        /* Blob float */
        @keyframes blobFloat { 0%,100%{transform:scale(1) translate(0,0);} 50%{transform:scale(1.1) translate(6px,-8px);} }
        .blob { animation: blobFloat 7s ease-in-out infinite; }

        /* No results fade */
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
        .no-results { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      <div className="w-full bg-white">
        {/* ── Hero ── */}
        <section
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcj-cL-bnvyPBdyGlGLJDUyF5iMbWqY89_Yms1TNc6e9E9EGGpdkBRR8wIPqLwnd6sM05jyfkL9iMeSozmR8MfpdEibEEjzvUJtULzIO2cKdhkI7dithW6xO1ruke7t5HbBOYjzZuUl9ZwE1HgIsrI_0lSqBPtpo6vCk9jFDZd5HobF7bA_vfvP0GUKSK7eJH01jGKOJCqERIACNbKxgVfd7yKTnnPBvI2C1ZwXDGdWNM_ZVRCb2ry1s-YY5r0odAhtBxMz8GNLHpp")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full"
        >
          <div className="w-full flex flex-col items-center justify-center bg-white/85 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 gap-3 text-center">
            <div className="max-w-[1250px] mx-auto flex flex-col items-center gap-3">
              <FadeUp>
                <h1 className="font-bold text-3xl sm:text-4xl text-neutral-700 tracking-wide mt-1">
                  Our Partner Universities
                </h1>
              </FadeUp>
              <FadeUp delay={120}>
                <p className="text-sm text-neutral-500 max-w-xs sm:max-w-md leading-relaxed">
                  Study at globally recognized institutions and build your
                  future with the world&apos;s most prestigious academic
                  partners across 5 continents.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── Search + Grid ── */}
        <section className="w-full py-8 sm:py-12" ref={gridRef}>
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
            {/* Search bar */}
            <FadeUp>
              <div className="search-bar flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 p-3 sm:p-2 rounded-2xl shadow-md border border-neutral-100 bg-white">
                {/* Search input */}
                <div className="flex items-center gap-2 flex-1 px-3 py-1.5 sm:border-r border-neutral-200">
                  <Search
                    size={16}
                    className="text-neutral-400 flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by university name..."
                    className="text-sm text-neutral-600 flex-1 outline-none bg-transparent placeholder:text-neutral-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Country filter */}
                <div className="flex items-center gap-2 px-3 py-1.5 sm:border-r border-neutral-200">
                  <Globe size={16} className="text-neutral-400 flex-shrink-0" />
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="text-sm text-neutral-600 outline-none bg-transparent cursor-pointer"
                  >
                    <option value="null">All Countries</option>
                    <option value="Canada">Canada</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Europe">Europe</option>
                    <option value="South Korea">South Korea</option>
                  </select>
                </div>

                {/* Course filter */}
                <div className="flex items-center gap-2 px-3 py-1.5 sm:border-r border-neutral-200">
                  <GraduationCap
                    size={16}
                    className="text-neutral-400 flex-shrink-0"
                  />
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="text-sm text-neutral-600 outline-none bg-transparent cursor-pointer"
                  >
                    <option value="null">Course Discipline</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Business">Business</option>
                    <option value="Arts">Arts & Design</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Law">Law</option>
                    <option value="Robotics">Robotics</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 px-2">
                  <button
                    onClick={clearFilters}
                    disabled={!hasFilters}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:text-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Clear
                  </button>
                  <button className="px-5 py-2 font-semibold text-sm text-neutral-800 bg-yellow-400 rounded-xl hover:bg-yellow-500 transition-colors shadow-sm w-full sm:w-auto">
                    Find Matches
                  </button>
                </div>
              </div>
            </FadeUp>

            {/* Results count + active filters */}
            <FadeUp delay={60}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-neutral-500">
                  Showing{" "}
                  <span className="font-semibold text-neutral-700">
                    {filtered.length}
                  </span>{" "}
                  universit{filtered.length === 1 ? "y" : "ies"}
                  {hasFilters && " matching your filters"}
                </span>
                {hasFilters && (
                  <div className="flex flex-wrap gap-1.5">
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-medium">
                        &quot;{searchQuery}&quot;
                        <button onClick={() => setSearchQuery("")}>
                          <X size={11} />
                        </button>
                      </span>
                    )}
                    {selectedCountry !== "null" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
                        {selectedCountry}
                        <button onClick={() => setSelectedCountry("null")}>
                          <X size={11} />
                        </button>
                      </span>
                    )}
                    {selectedCourse !== "null" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        {selectedCourse}
                        <button onClick={() => setSelectedCourse("null")}>
                          <X size={11} />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </FadeUp>

            {/* Cards grid */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {paginated.map((uni, i) => (
                  <UniCard key={`${uni.name}-${i}`} uni={uni} delay={i * 60} />
                ))}
              </div>
            ) : (
              <div className="no-results flex flex-col items-center justify-center py-16 gap-3 text-center">
                <span className="text-4xl">🎓</span>
                <h3 className="font-semibold text-base text-neutral-700">
                  No universities found
                </h3>
                <p className="text-sm text-neutral-400 max-w-xs">
                  Try adjusting your search or filters to find what you&apos;re
                  looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-2 px-5 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <FadeUp>
                <div className="flex items-center justify-center gap-2 py-4">
                  <button
                    onClick={() => handlePageChange(pageNo - 1)}
                    disabled={pageNo === 1}
                    className="page-btn w-9 h-9 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`page-btn w-9 h-9 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors ${
                          p === pageNo
                            ? "bg-sky-500 text-white shadow-md shadow-sky-300/40"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => handlePageChange(pageNo + 1)}
                    disabled={pageNo === totalPages}
                    className="page-btn w-9 h-9 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </FadeUp>
            )}
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="w-full bg-neutral-50 py-12 sm:py-16">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10">
            <FadeUp className="flex flex-col items-center gap-2">
              <h2 className="font-bold text-lg sm:text-xl text-neutral-700 text-center">
                Why Choose Chaitanya Partners?
              </h2>
              <p className="text-sm text-neutral-500 text-center max-w-xs sm:max-w-sm leading-relaxed">
                Connecting you to the pinnacle of global academia.
              </p>
              <div className="w-14 h-1 rounded-full bg-orange-400 mt-1" />
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {reasonContents.map((content, i) => (
                <FadeUp key={i} delay={i * 100}>
                  <div className="reason-card flex flex-col items-center text-center gap-3 rounded-xl shadow-sm bg-white border border-neutral-100 p-6 sm:p-8 cursor-default">
                    <span className="reason-icon w-11 h-11 rounded-full bg-neutral-100 flex items-center justify-center text-lg flex-shrink-0">
                      {content.icon}
                    </span>
                    <h3 className="font-semibold text-sm sm:text-base text-neutral-700">
                      {content.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                      {content.overview}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full py-10 sm:py-14">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <div className="w-full rounded-2xl bg-gradient-to-br from-cyan-600 to-sky-700 relative overflow-hidden flex flex-col items-center justify-center gap-4 py-12 sm:py-16 px-6 text-center shadow-lg shadow-sky-400/30">
                <div className="blob w-40 h-40 rounded-full bg-orange-300/30 absolute -top-10 -right-10 pointer-events-none" />
                <div
                  className="blob w-40 h-40 rounded-full bg-white/10 absolute -bottom-10 -left-10 pointer-events-none"
                  style={{ animationDelay: "3s" }}
                />

                <h2 className="font-bold text-xl sm:text-2xl text-white relative z-10">
                  Ready to find your perfect match?
                </h2>
                <p className="text-sm text-white/80 max-w-xs sm:max-w-md leading-relaxed relative z-10">
                  Our expert counselors are ready to help you navigate the
                  application process and secure your spot at your dream
                  university.
                </p>
                <div className="flex flex-col xs:flex-row items-center justify-center gap-3 mt-1 w-full sm:w-auto relative z-10">
                  <a
                    href="/contact"
                    className="cta-primary w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-sm text-neutral-800 bg-yellow-400 shadow-md shadow-yellow-300/40 text-center"
                  >
                    Apply Now
                  </a>
                  <a
                    href="/contact"
                    className="cta-outline w-full sm:w-auto px-6 py-2.5 rounded-lg font-semibold text-sm text-white border-2 border-white/60 text-center"
                  >
                    Book Free Consultation
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </>
  );
};

export default UniversitiesPage;
