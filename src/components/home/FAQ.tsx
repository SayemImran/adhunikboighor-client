"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders arrive within 2–4 business days depending on your location. You'll get tracking details by email once your order ships.",
  },
  {
    question: "Can I return a book?",
    answer:
      "Yes — unopened books can be returned within 7 days of delivery for a full refund. Visit your order history to start a return.",
  },
  {
    question: "Do you ship outside the city?",
    answer:
      "Yes, we deliver nationwide. Delivery times may vary slightly for locations outside major cities.",
  },
  {
    question: "How does the AI assistant work?",
    answer:
      "Our chat assistant can recommend books, summarize titles in our catalog, and answer questions about ordering — just click the chat icon in the corner of any page.",
  },
  {
    question: "Can I sell my own books here?",
    answer:
      "Currently only our admin team lists titles, but we're exploring options for reader-submitted listings in the future.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary-accent)]">
          Questions
        </span>
        <h2 className="mt-2 text-3xl font-medium text-[var(--text-color)]">
          Frequently asked
        </h2>
      </div>

      <div className="mt-8 space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-white/50 bg-white/15 shadow-[0_8px_24px_rgba(58,42,29,0.08)] backdrop-blur-lg"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-[var(--text-color)]">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[var(--primary-accent)] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}