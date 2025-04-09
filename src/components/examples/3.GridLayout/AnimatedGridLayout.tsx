import { AnimatePresence, motion } from "motion/react";

interface Card {
  id: number;
  title: string;
  color: string;
}

interface GridLayoutProps {
  cards: Card[];
  removeCard: (id: number) => void;
}

export function AnimatedGridLayout({ cards, removeCard }: GridLayoutProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-visible">
      <AnimatePresence mode="popLayout">
        {cards.map((card) => (
          <motion.div
            layout
            key={card.id}
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              type: "spring",
              duration: 0.5,
              bounce: 0.35,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className={`${card.color} p-6 rounded-lg text-white h-40 flex items-center justify-center relative`}
          >
            <button
              onClick={() => removeCard(card.id)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer"
            >
              <span className="text-white text-sm font-bold">✕</span>
            </button>
            <h3 className="text-xl font-bold">{card.title}</h3>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
