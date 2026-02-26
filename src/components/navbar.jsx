import { useState } from "react";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const navLinks = ["Home", "About", "Features", "FRA Atlas", "Data Gallery", "Insights", "Testimonials"];

  return (
    <nav className="w-full bg-white shadow-sm font-sans fixed top-0 left-0 z-[999]">
      {/* ── Desktop Bar ── */}
      <div className="flex items-center justify-between px-10 h-16">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 flex-shrink-0">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <ellipse cx="22" cy="16" rx="13" ry="10" fill="#5aac1e" opacity="0.85" transform="rotate(-20 22 16)" />
            <ellipse cx="14" cy="20" rx="10" ry="7" fill="#3d8a10" opacity="0.9" transform="rotate(15 14 20)" />
            <line x1="19" y1="34" x2="19" y2="18" stroke="#3d8a10" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-gray-800 tracking-tight">VanMitra</span>
            <span className="text-xs text-gray-400 font-normal tracking-wide" style={{ fontSize: "0.62rem" }}>
              FRA Atlas &amp; DSS
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map((link) =>
            link === "Features" ? (
              <li key={link} className="relative">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-green-600 transition-colors bg-transparent border-none cursor-pointer p-0"
                  onClick={() => setServicesOpen((o) => !o)}
                  onBlur={() => setTimeout(() => setServicesOpen(false), 150)}
                >
                  Features
                  <span className={`text-xs transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>▼</span>
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-40 z-50">
                    {["IFR Mapping", "CFR Rights", "Asset Mapping", "DSS Tools"].map((s) => (
                      <a key={s} href="#" className="block px-5 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                        {s}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={link}>
                <a
                  href="#"
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${
                    link === "Home" ? "text-green-600 font-semibold" : "text-gray-800 hover:text-green-600"
                  }`}
                >
                  {link}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Desktop Contact Button */}
        <a
          href="#"
          className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-gray-800 rounded-full text-sm font-semibold text-gray-800 hover:border-green-600 hover:text-green-600 transition-colors flex-shrink-0"
        >
          Get Access
          <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9 bg-transparent border-none cursor-pointer p-1 z-50"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-full bg-gray-800 rounded transition-all duration-300 origin-center ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-full bg-gray-800 rounded transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-0.5 w-full bg-gray-800 rounded transition-all duration-300 origin-center ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col py-2">
          {navLinks.map((link) =>
            link === "Features" ? (
              <div key={link}>
                <button
                  className="flex items-center justify-between w-full px-7 py-3 text-sm font-medium text-gray-800 hover:text-green-600 hover:bg-green-50 transition-colors bg-transparent border-none cursor-pointer text-left"
                  onClick={() => setMobileServicesOpen((o) => !o)}
                >
                  Features
                  <span className={`text-xs transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}>▼</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 bg-gray-50 border-y border-gray-100 ${
                    mobileServicesOpen ? "max-h-48" : "max-h-0"
                  }`}
                >
                  {["IFR Mapping", "CFR Rights", "Asset Mapping", "DSS Tools"].map((s) => (
                    <a key={s} href="#" className="block px-11 py-2.5 text-sm text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link}
                href="#"
                className={`px-7 py-3 text-sm font-medium transition-colors ${
                  link === "Home" ? "text-green-600 font-semibold" : "text-gray-800 hover:text-green-600 hover:bg-green-50"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link}
              </a>
            )
          )}

          {/* Mobile Contact */}
          <div className="px-7 pt-4 pb-2">
            <a
              href="#"
              className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-800 rounded-full text-sm font-semibold text-gray-800 hover:border-green-600 hover:text-green-600 transition-colors"
            >
              Get Access
              <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}