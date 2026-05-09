"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

interface INav {
  name: string;
  url: string;
}

const navigationList: INav[] = [
  { name: "Home", url: "/" },
  { name: "About us", url: "/about-us" },
  { name: "Services", url: "/services" },
  { name: "Destination", url: "/destinations" },
  { name: "Contact", url: "/contact" },
  { name: "Universities", url: "/universities" },
];

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <>
      <style>{`
        /* Underline slide-in for nav links */
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 2px;
          border-radius: 99px;
          background-color: #38bdf8;
          width: 0;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        /* Mobile menu slide-down */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu { animation: slideDown 0.22s ease forwards; }

        /* Mobile active indicator */
        .mobile-nav-link {
          position: relative;
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .mobile-nav-link.active {
          color: #0ea5e9;
          padding-left: 10px;
        }
        .mobile-nav-link.active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          border-radius: 99px;
          background-color: #0ea5e9;
        }
        .mobile-nav-link:not(.active):hover {
          color: #38bdf8;
          padding-left: 6px;
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
          background: rgba(255,255,255,.15);
          transform: translateX(-100%);
          transition: transform 0.35s ease;
        }
        .cta-btn:hover::after { transform: translateX(0); }
        .cta-btn:hover { transform: translateY(-1px); }

        /* Hamburger icon transition */
        .hamburger-icon {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .hamburger-icon:hover { color: #0ea5e9; transform: scale(1.1); }
      `}</style>

      <header
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-6px)",
          transition:
            "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
        }}
        className="w-full sticky top-0 z-50 bg-white border-b border-neutral-200"
      >
        <div className="max-w-[1250px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-2">
          {/* ── Logo ── */}
          <a
            href="/"
            className="flex flex-col items-start leading-tight p-1 md:p-2 flex-shrink-0"
          >
            <span className="font-bold text-lg sm:text-xl md:text-2xl text-sky-500 leading-none">
              Chaitanya
            </span>
            <span className="font-bold text-[10px] sm:text-xs text-orange-500 tracking-wide">
              Global Education
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1 lg:gap-2">
              {navigationList.map((nav, i) => {
                const active = isActive(nav.url);
                return (
                  <li key={i}>
                    <a
                      href={nav.url}
                      className={`nav-link relative font-medium text-xs lg:text-sm px-2 py-1 rounded transition-colors duration-200 ${
                        active
                          ? "text-sky-500 active"
                          : "text-neutral-500 hover:text-sky-500"
                      }`}
                    >
                      {nav.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Desktop CTA ── */}
          <a
            href="/contact"
            className="cta-btn hidden md:block px-4 py-2 rounded-md bg-sky-500 text-white text-xs lg:text-sm font-medium shadow-sm shadow-sky-400/30 flex-shrink-0"
          >
            Get a Quote
          </a>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="hamburger-icon md:hidden text-neutral-700 flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {isOpen && (
          <div className="mobile-menu md:hidden bg-white border-t border-neutral-100 px-4 sm:px-6 py-4">
            <ul className="flex flex-col gap-1">
              {navigationList.map((nav, i) => {
                const active = isActive(nav.url);
                return (
                  <li key={i}>
                    <a
                      href={nav.url}
                      className={`mobile-nav-link block text-sm font-medium py-2.5 ${
                        active ? "active" : "text-neutral-600"
                      }`}
                    >
                      {nav.name}
                    </a>
                  </li>
                );
              })}
              <li className="pt-3 border-t border-neutral-100 mt-1">
                <a
                  href="/contact"
                  className="cta-btn block w-full text-center px-4 py-2.5 rounded-md bg-sky-500 text-white text-sm font-medium"
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
