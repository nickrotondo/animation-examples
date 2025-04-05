import { useState } from "react";
import { AnimationToggle } from "../../AnimationToggle";
import { StaticAccordion } from "./StaticAccordion";
import { AnimatedAccordion } from "./AnimatedAccordion";
import { CodeViewer } from "../../CodeViewer";

const staticCode = `// Static implementation without animations
{expandedIndex === index && (
  <div className="p-4 text-gray-600">
    {item.answer}
  </div>
)}`;

const animatedCode = `// With Framer Motion animations
import { AnimatePresence, motion } from "motion/react";

// Wrap content in AnimatePresence to handle enter/exit transitions
<AnimatePresence>
  {expandedIndex === index && (
    // Add motion.div with height animations and transition properties for smooth accordion expansion
    <motion.div
      initial={{ height: 0 }}
      animate={{
        height: "auto",
        transition: {
          height: { type: "spring", stiffness: 300, damping: 22 }
        }
      }}
      exit={{ height: 0 }}
    >
      <div className="p-4 text-gray-600">
        {item.answer}
      </div>
    </motion.div>
  )}
</AnimatePresence>`;

export function AccordionExample() {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "What should I do if a tornado is coming?",
      answer:
        "First, grab your favorite snack—because if you're going to ride out a tornado, you might as well enjoy some chips. Then, head to the nearest basement or sturdy shelter. Remember, tornadoes don't care about your plans!",
    },
    {
      question: "Why are tornadoes?",
      answer:
        "Tornadoes are nature's way of saying, 'I wanted to rearrange your house, but I forgot to bring my interior designer!' They're just really enthusiastic about spring cleaning—unfortunately, they take it a bit too far!",
    },
    {
      question:
        "Why do tornadoes seem to have a personal vendetta against my house?",
      answer:
        "It's not personal; tornadoes just have a knack for picking favorites. Maybe you should consider a tornado-proof lawn gnome as a peace offering!",
    },
    {
      question: "Should I just move back to California?",
      answer:
        "Yeah, probably. The commie's are trying their best to make it unappealing, but you can't beat the beach, mountains and weather.",
    },
  ];

  const toggleItem = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <div className="w-full flex justify-center mb-8">
        <AnimationToggle
          isEnabled={animationsEnabled}
          onToggle={() => setAnimationsEnabled(!animationsEnabled)}
        />
      </div>

      {animationsEnabled ? (
        <AnimatedAccordion
          faqItems={faqItems}
          expandedIndex={expandedIndex}
          toggleItem={toggleItem}
        />
      ) : (
        <StaticAccordion
          faqItems={faqItems}
          expandedIndex={expandedIndex}
          toggleItem={toggleItem}
        />
      )}

      <CodeViewer staticCode={staticCode} animatedCode={animatedCode} />
    </div>
  );
}
