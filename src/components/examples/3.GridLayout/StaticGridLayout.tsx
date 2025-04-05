interface Card {
  id: number;
  title: string;
  color: string;
}

interface GridLayoutProps {
  cards: Card[];
  removeCard: (id: number) => void;
}

export function StaticGridLayout({ cards, removeCard }: GridLayoutProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${card.color} p-6 rounded-lg text-white h-40 flex items-center justify-center relative`}
        >
          <button
            onClick={() => removeCard(card.id)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50 transition-colors cursor-pointer"
          >
            <span className="text-white text-sm font-bold">✕</span>
          </button>
          <h3 className="text-xl font-bold">{card.title}</h3>
        </div>
      ))}
    </div>
  );
}
