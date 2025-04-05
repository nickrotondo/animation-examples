import { motion } from "motion/react";

type AnimationToggleProps = {
  isEnabled: boolean;
  onToggle: () => void;
};

export function AnimationToggle({ isEnabled, onToggle }: AnimationToggleProps) {
  const springTransition = {
    type: "spring",
    stiffness: 700,
    damping: 30,
    bounce: 0.4,
  };

  return (
    <div className="mb-8 pt-4">
      <button
        className={`w-32 h-14 rounded-full p-2.5 cursor-pointer flex ${
          isEnabled ? "bg-blue-500/20" : "bg-gray-400/20"
        }`}
        style={{
          justifyContent: `flex-${isEnabled ? "end" : "start"}`,
        }}
        onClick={onToggle}
      >
        <motion.div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-5xl font-medium text-white ${
            isEnabled ? "bg-blue-500" : "bg-gray-600"
          }`}
          layout
          transition={springTransition}
          whileHover={{ scale: 1.15, transition: springTransition }}
        >
          {isEnabled ? "🤩" : "😐"}
        </motion.div>
      </button>
    </div>
  );
}
