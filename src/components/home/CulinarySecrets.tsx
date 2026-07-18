const steps = [
  {
    label: "01",
    title: "Slow-built flavor",
    text: "Spices are bloomed carefully so every dish starts with depth, aroma, and warmth.",
  },
  {
    label: "02",
    title: "Fresh daily prep",
    text: "Rice, herbs, sauces, and proteins are prepared in focused batches for cleaner taste.",
  },
  {
    label: "03",
    title: "Finished to order",
    text: "Final heat, garnish, and packing happen close to dispatch so meals arrive bright.",
  },
];

export default function CulinarySecrets() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28 2xl:py-36">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px] 2xl:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20 2xl:gap-24">
          <div className="py-4 sm:py-6 2xl:py-8">
            <span className="text-xs font-black uppercase tracking-[0.35em] text-brand-primary">
              From our kitchen
            </span>
            <h2 className="mt-5 text-4xl font-black uppercase leading-none tracking-tight text-brand-dark sm:text-5xl">
              Culinary secrets, served simply
            </h2>
            <p className="mt-6 max-w-xl text-base font-medium leading-8 text-brand-dark/65">
              Every plate follows a quiet rhythm: disciplined prep, honest ingredients, and
              final touches that make the food feel freshly made, not factory assembled.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 2xl:gap-6">
            {steps.map((step) => (
              <article
                key={step.label}
                className="group border border-gray-100 bg-brand-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/30 hover:bg-white hover:shadow-[0_24px_70px_rgba(17,24,39,0.08)] sm:p-6 2xl:p-7"
              >
                <span className="text-sm font-black text-brand-primary">{step.label}</span>
                <h3 className="mt-6 text-xl font-black uppercase leading-tight text-brand-dark sm:mt-8">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm font-medium leading-6 text-brand-dark/60">
                  {step.text}
                </p>
                <div className="mt-6 h-1 w-10 bg-brand-primary transition-all duration-300 group-hover:w-20 sm:mt-8" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
