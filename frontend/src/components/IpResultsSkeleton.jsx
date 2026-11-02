const DETAIL_COUNT = 8;

// Show one placeholder card with shimmering lines
function SkeletonCard({ isDark = false }) {
  return (
    <div className={isDark ? "card card-dark" : "card"}>
      <span className="skeleton skeleton-title" />
      <span className="skeleton skeleton-body" />
    </div>
  );
}

// Show placeholder cards while the IP details load
export default function IpResultsSkeleton() {
  return (
    <section className="results" role="status" aria-label="Loading">
      <SkeletonCard isDark />
      <div className="card-grid">
        {Array.from({ length: DETAIL_COUNT }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </section>
  );
}
