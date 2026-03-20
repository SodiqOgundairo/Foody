export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  // Build page numbers with ellipsis
  const pages = [];
  const addPage = (n) => {
    if (!pages.includes(n) && n >= 1 && n <= total) pages.push(n);
  };

  addPage(1);
  for (let i = current - 1; i <= current + 1; i++) addPage(i);
  addPage(total);
  pages.sort((a, b) => a - b);

  // Insert ellipsis markers
  const items = [];
  for (let i = 0; i < pages.length; i++) {
    if (i > 0 && pages[i] - pages[i - 1] > 1) {
      items.push("...");
    }
    items.push(pages[i]);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      {/* Prev */}
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
      </button>

      {items.map((item, i) =>
        item === "..." ? (
          <span key={`e${i}`} className="w-10 h-10 flex items-center justify-center text-stone-400 text-sm">
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
              item === current
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/25 scale-105"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            {item}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="w-10 h-10 rounded-xl flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
