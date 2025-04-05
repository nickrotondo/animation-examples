import { useState } from "react";
import { AnimationToggle } from "../../AnimationToggle";
import { AnimatedGridLayout } from "./AnimatedGridLayout";
import { StaticGridLayout } from "./StaticGridLayout";
import { CodeViewer } from "../../CodeViewer";

const staticCode = `// Static implementation without animations
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {cards.map((card) => (
    <div
      key={card.id}
      className={\`\${card.color} p-6 rounded-lg text-white h-40 flex items-center justify-center relative\`}
    >
      <button
        onClick={() => removeCard(card.id)}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50"
      >
        <span className="text-white text-sm font-bold">✕</span>
      </button>
      <h3 className="text-xl font-bold">{card.title}</h3>
    </div>
  ))}
</div>`;

const animatedCode = `import { AnimatePresence, motion } from "motion/react";

<div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-visible">
  {/* AnimatePresence handles the exit animations when cards are removed */}
  <AnimatePresence mode="popLayout">
    {cards.map((card) => (
      <motion.div
        layout // Smoothly animates the layout changes
        key={card.id}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{
          type: "spring",
          duration: 0.5,
          bounce: 0.35
        }}
        className={\`\${card.color} p-6 rounded-lg text-white h-40 flex items-center justify-center relative\`}
      >
        <button
          onClick={() => removeCard(card.id)}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50"
        >
          <span className="text-white text-sm font-bold">✕</span>
        </button>
        <h3 className="text-xl font-bold">{card.title}</h3>
      </motion.div>
    ))}
  </AnimatePresence>
</div>`;

export function GridLayoutExample() {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [cards, setCards] = useState([
    { id: 1, title: "Card 1", color: "bg-blue-500" },
    { id: 2, title: "Card 2", color: "bg-emerald-500" },
    { id: 3, title: "Card 3", color: "bg-purple-500" },
    { id: 4, title: "Card 4", color: "bg-rose-500" },
  ]);

  const addCard = () => {
    const id =
      cards.length > 0 ? Math.max(...cards.map((card) => card.id)) + 1 : 1;
    const colors = [
      "bg-blue-500",
      "bg-emerald-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-yellow-500",
      "bg-rose-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setCards([
      {
        id,
        title: `Card ${id}`,
        color: randomColor,
      },
      ...cards,
    ]);
  };

  const removeCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const removeLastCard = () => {
    if (cards.length > 0) {
      const newCards = [...cards];
      newCards.pop();
      setCards(newCards);
    }
  };

  const shuffleCards = () => {
    const newCards = [...cards];
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    setCards(newCards);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <AnimationToggle
          isEnabled={animationsEnabled}
          onToggle={() => setAnimationsEnabled(!animationsEnabled)}
        />
      </div>

      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        <button
          onClick={addCard}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Card
        </button>
        <button
          onClick={removeLastCard}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove Last Card
        </button>
        <button
          onClick={shuffleCards}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Shuffle Cards
        </button>
      </div>

      {animationsEnabled ? (
        <AnimatedGridLayout cards={cards} removeCard={removeCard} />
      ) : (
        <StaticGridLayout cards={cards} removeCard={removeCard} />
      )}

      <CodeViewer staticCode={staticCode} animatedCode={animatedCode} />
    </>
  );
}
