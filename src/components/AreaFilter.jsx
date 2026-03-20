import { useEffect, useState } from "react";
import requests from "../Requests";

const AFRICAN = ["Egyptian", "Kenyan", "Moroccan", "Tunisian"];

export default function AreaFilter({ active, onSelect }) {
  const [areas, setAreas] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(requests.mdb.listAreas)
      .then((r) => r.json())
      .then((data) => {
        const all = (data.meals || []).map((a) => a.strArea).filter(Boolean);
        setAreas(all);
      })
      .catch(() => {});
  }, []);

  if (areas.length === 0) return null;

  const african = areas.filter((a) => AFRICAN.includes(a));
  const others = areas.filter((a) => !AFRICAN.includes(a));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
          active
            ? "bg-brand-50 border-brand-300 text-brand-700"
            : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
        </svg>
        {active || "Cuisine"}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute top-full mt-2 left-0 z-40 bg-white rounded-xl border border-stone-200 shadow-xl w-56 max-h-80 overflow-y-auto">
            {/* Clear */}
            {active && (
              <button
                onClick={() => { onSelect(null); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm text-stone-500 hover:bg-stone-50 border-b border-stone-100"
              >
                Clear filter
              </button>
            )}

            {/* African cuisines */}
            {african.length > 0 && (
              <>
                <p className="px-4 pt-3 pb-1 text-xs font-semibold text-brand-600 uppercase tracking-wider">
                  African Cuisines
                </p>
                {african.map((area) => (
                  <button
                    key={area}
                    onClick={() => { onSelect(area); setOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      active === area
                        ? "bg-brand-50 text-brand-700 font-medium"
                        : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    {area}
                  </button>
                ))}
                <div className="border-b border-stone-100 mx-3 my-1" />
              </>
            )}

            {/* All other cuisines */}
            <p className="px-4 pt-3 pb-1 text-xs font-semibold text-stone-400 uppercase tracking-wider">
              All Cuisines
            </p>
            {others.map((area) => (
              <button
                key={area}
                onClick={() => { onSelect(area); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  active === area
                    ? "bg-brand-50 text-brand-700 font-medium"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
