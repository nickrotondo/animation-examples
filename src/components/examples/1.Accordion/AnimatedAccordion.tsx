import { AnimatePresence, motion } from "motion/react";

type AccordionProps = {
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
  expandedIndex: number | null;
  toggleItem: (index: number) => void;
};

export function AnimatedAccordion({
  faqItems,
  expandedIndex,
  toggleItem,
}: AccordionProps) {
  return (
    <div className="max-w-2xl mx-auto rounded-xl overflow-hidden">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full p-4 text-left hover:bg-gray-100 bg-gray-50 flex justify-between items-center"
          >
            <span className="font-medium text-gray-800">{item.question}</span>
            <svg
              className={`w-5 h-5 duration-300 transition-transform ${
                expandedIndex === index ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{
                  height: 0,
                }}
                animate={{
                  height: "auto",
                  transition: {
                    height: { type: "spring", stiffness: 300, damping: 22 },
                  },
                }}
                exit={{
                  height: 0,
                }}
              >
                <div className="p-4 text-gray-600">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
