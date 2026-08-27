export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-grid-fade">
      <div className="container-px py-20 md:py-24 max-w-3xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>
        }
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-paper/70 text-lg leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
