export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="page-header relative overflow-hidden border-b border-line bg-grid-fade">
      <div className="relative z-10 container-px py-20 md:py-24 max-w-3xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>
        }
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight text-paper">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-muted text-lg leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
