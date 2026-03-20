import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSavedMeals } from "../context/SavedMealsContext";

const navLinks = [
  { to: "/", label: "Discover" },
  { to: "/meal-of-the-day", label: "Surprise Me" },
  { to: "/my-meals", label: "Saved" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { savedMeals } = useSavedMeals();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🍜</span>
            <span className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-brand-600 transition-colors">
              foody
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {link.label}
                  {link.to === "/my-meals" && savedMeals.length > 0 && (
                    <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                      active ? "bg-white text-brand-600" : "bg-brand-500 text-white"
                    }`}>
                      {savedMeals.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-stone-100 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-stone-700 rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-stone-700 rounded-full transition-all duration-300 ${open ? "opacity-0 scale-0" : ""}`} />
              <span className={`block h-0.5 bg-stone-700 rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-64" : "max-h-0"}`}>
        <nav className="px-4 pb-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                {link.label}
                {link.to === "/my-meals" && savedMeals.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-500 text-white text-[11px] font-bold">
                    {savedMeals.length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
