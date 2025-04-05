type AccordionProps = {
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
  expandedIndex: number | null;
  toggleItem: (index: number) => void;
};

export function StaticAccordion({
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
              className={`w-5 h-5 ${
                expandedIndex === index ? "rotate-180" : ""
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

          {expandedIndex === index && (
            <div className="p-4 text-gray-600">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
