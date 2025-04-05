import { useState } from "react";
import { motion } from "motion/react";
import { AnimationToggle } from "../../AnimationToggle";
import { CodeViewer } from "../../CodeViewer";

const staticCode = `<div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-300 to-blue-600" />`;

const animatedCode = `import { motion } from "motion/react";

<motion.div
  className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 cursor-grab active:cursor-grabbing"
  drag                        // Enable dragging
  dragConstraints={{          // Constrain the drag area
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }}
  dragElastic={1.1}           // Allow some elasticity beyond constraints
  dragMomentum={true}         // Enable momentum after dragging
  dragTransition={{           // Configure the spring physics
    bounceStiffness: 300,
    bounceDamping: 12,
  }}
/>`;

export function DraggableSphereExample() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  return (
    <div>
      <div className="w-full flex justify-center">
        <AnimationToggle
          isEnabled={animationsEnabled}
          onToggle={() => setAnimationsEnabled(!animationsEnabled)}
        />
      </div>

      <div className="relative h-[500px] border border-gray-200 rounded-lg bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center">
          {animationsEnabled ? (
            <motion.div
              className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 cursor-grab active:cursor-grabbing"
              drag
              dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              dragElastic={1.1}
              dragMomentum={true}
              dragTransition={{
                bounceStiffness: 300,
                bounceDamping: 12,
              }}
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 cursor-grab active:cursor-grabbing" />
          )}
        </div>
      </div>

      <CodeViewer staticCode={staticCode} animatedCode={animatedCode} />
    </div>
  );
}
