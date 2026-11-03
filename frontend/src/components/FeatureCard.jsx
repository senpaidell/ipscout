// Feature card
export default function FeatureCard({ title, body, isDark = false }) {
  return (
    <article className={isDark ? "card card-dark" : "card"}>
      <h3 className="card-title">{title}</h3>
      <p className="card-body">{body}</p>
    </article>
  );
}
