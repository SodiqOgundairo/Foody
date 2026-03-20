const HEIGHTS = ["h-48", "h-64", "h-56", "h-52", "h-60", "h-44"];

export default function Skeleton({ count = 9 }) {
  return (
    <div className="masonry">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="masonry-item bg-white rounded-2xl overflow-hidden border border-stone-200/60">
          <div className={`skeleton w-full ${HEIGHTS[i % HEIGHTS.length]}`} />
          <div className="p-5 space-y-3">
            <div className="skeleton h-5 w-3/4 rounded-lg" />
            <div className="skeleton h-4 w-full rounded-lg" />
            {i % 2 === 0 && <div className="skeleton h-4 w-2/3 rounded-lg" />}
            {i % 3 === 0 && <div className="skeleton h-4 w-1/2 rounded-lg" />}
          </div>
        </div>
      ))}
    </div>
  );
}
