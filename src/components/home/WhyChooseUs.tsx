import { Truck, ShieldCheck, Sparkles, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast delivery",
    description: "Orders reach you within 2–4 business days, carefully packaged.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine titles",
    description: "Every book is sourced directly from trusted publishers.",
  },
  {
    icon: Sparkles,
    title: "AI recommendations",
    description: "Get personalized suggestions based on what you love to read.",
  },
  {
    icon: HeartHandshake,
    title: "Reader support",
    description: "Real people ready to help with orders, returns, or book advice.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-white/60 bg-white/15 p-8 shadow-[0_16px_50px_rgba(58,42,29,0.16)] backdrop-blur-xl sm:p-12">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary-accent)]">
            Why Adhunik Boighor
          </span>
          <h2 className="mt-2 text-3xl font-medium text-[var(--text-color)]">
            Built for readers, by readers
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-accent)]/15 text-[var(--primary-accent)]">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 font-semibold text-[var(--text-color)]">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}