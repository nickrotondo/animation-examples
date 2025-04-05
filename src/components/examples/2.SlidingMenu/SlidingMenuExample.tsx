import { useState } from "react";
import { AnimationToggle } from "../../AnimationToggle";
import { AnimatedMenu } from "./AnimatedMenu";
import { StaticMenu } from "./StaticMenu";
import { CodeViewer } from "../../CodeViewer";

const staticCode = `// Static implementation without animations
{isMenuOpen && (
  <div className="absolute top-20 left-0 bottom-0 w-64 bg-gray-800 text-white shadow-lg">
    <div className="p-4">
      <h3 className="text-3xl font-semibold mb-4">Menu</h3>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center text-xl"
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  </div>
)}`;

const animatedCode = `import { AnimatePresence, motion } from "motion/react";

// Wrap the menu in AnimatePresence to handle enter/exit animations
<AnimatePresence>
  {isMenuOpen && (
    // Add a motion.div for the menu with initial, animate, and exit states and a transition
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: 0.2,
      }}
      className="absolute top-20 left-0 bottom-0 w-64 bg-gray-800 text-white shadow-lg"
    >
      <div className="p-4">
        <h3 className="text-3xl font-semibold mb-4">Menu</h3>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            // We can also stagger the items' intro with a delay
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 1,
                delay: 0.1 + index * 0.05,
              }}
              className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center text-xl"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )}
</AnimatePresence>`;

export function SlidingMenuExample() {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: "🏠", label: "Home" },
    { icon: "👤", label: "Profile" },
    { icon: "⚙️", label: "Settings" },
    { icon: "📊", label: "Dashboard" },
    { icon: "📝", label: "Documents" },
    { icon: "❓", label: "Help & Support" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <AnimationToggle
          isEnabled={animationsEnabled}
          onToggle={() => setAnimationsEnabled(!animationsEnabled)}
        />
      </div>

      {animationsEnabled ? (
        <AnimatedMenu
          menuItems={menuItems}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      ) : (
        <StaticMenu
          menuItems={menuItems}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      )}

      <CodeViewer staticCode={staticCode} animatedCode={animatedCode} />
    </div>
  );
}
