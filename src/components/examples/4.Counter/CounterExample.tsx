import { useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { AnimationToggle } from "../../AnimationToggle";
import { CodeViewer } from "../../CodeViewer";

const staticCode = `// Static implementation without animations
<div className="text-6xl font-bold text-gray-600">4.8</div>`;

const animatedCode = `import { motion, useMotionValue, useTransform, animate } from "motion/react";

// Create a motion value to track the count
const count = useMotionValue(0);

// Transform the motion value to display correctly formatted text
const displayValue = useTransform(count, (value) => value.toFixed(1));

// Animation function
const startAnimation = () => {
  if (isAnimating) return;

  setIsAnimating(true);
  count.set(0);

  // Animate from 0 to 4.8 with custom easing
  animate(count, 4.8, {
    duration: 3.75,
    ease: [0.02, 0.53, 0.37, 0.99], // Custom ease curve for natural motion
    onComplete: () => setIsAnimating(false),
  });
};

// Make the counter container itself clickable
<motion.div
  onClick={startAnimation}
  className="bg-gray-100 rounded-2xl w-60 h-60 flex flex-col items-center justify-center shadow-lg cursor-pointer"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
>
  <motion.div className="text-6xl font-bold text-blue-600">
    {displayValue}
  </motion.div>
</motion.div>`;

function StaticCounter() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="bg-gray-100 rounded-2xl w-60 h-60 flex flex-col items-center justify-center shadow-lg">
        <div className="text-6xl font-bold text-gray-600">4.8</div>
      </div>

      <div className="max-w-md text-center text-gray-500 text-sm">
        Enable animations to see the animated counter.
      </div>
    </div>
  );
}

function AnimatedCounter() {
  const [isAnimating, setIsAnimating] = useState(false);
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (value) => value.toFixed(1));

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    count.set(0);

    animate(count, 4.8, {
      duration: 3.75,
      ease: [0.02, 0.53, 0.37, 0.99],
      onComplete: () => setIsAnimating(false),
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        onClick={startAnimation}
        className={`bg-gray-100 rounded-2xl w-60 h-60 flex flex-col items-center justify-center shadow-lg ${
          isAnimating ? "" : "cursor-pointer"
        }`}
        whileHover={!isAnimating ? { scale: 1.03 } : {}}
        whileTap={!isAnimating ? { scale: 0.97 } : {}}
      >
        <motion.div className="text-6xl font-bold text-blue-600">
          {displayValue}
        </motion.div>
      </motion.div>

      <div className="max-w-md text-center text-gray-500 text-sm">
        Click on the box to watch the counter animate with a weighted feel.
      </div>
    </div>
  );
}

export function CounterExample() {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  return (
    <div>
      <div className="w-full flex justify-center">
        <AnimationToggle
          isEnabled={animationsEnabled}
          onToggle={() => setAnimationsEnabled(!animationsEnabled)}
        />
      </div>

      {animationsEnabled ? <AnimatedCounter /> : <StaticCounter />}

      <CodeViewer staticCode={staticCode} animatedCode={animatedCode} />
    </div>
  );
}
