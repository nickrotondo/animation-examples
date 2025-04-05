import { AnimatePresence, motion } from "motion/react";

type MenuProps = {
  menuItems: Array<{
    icon: string;
    label: string;
  }>;
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export function AnimatedMenu({ menuItems, isMenuOpen, toggleMenu }: MenuProps) {
  return (
    <div className="relative min-h-[500px] border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={toggleMenu}
        className="m-4 w-12 h-12 flex flex-col items-center justify-center focus:outline-none"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div className="w-8 flex flex-col items-center justify-center gap-[5px]">
          <span
            className={`block h-[3px] w-full bg-black rounded transition-all duration-300 ${
              isMenuOpen ? "transform rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-[3px] w-full bg-black rounded transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[3px] w-full bg-black rounded transition-all duration-300 ${
              isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      <div className="p-4">
        <div className="rounded-lg p-4 bg-gray-100">
          <h3 className="font-bold mb-2">Main Content</h3>
          <p>
            This is the main content area. Open the menu to see it appear
            instantly.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              x: "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100%",
            }}
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
                  <motion.li
                    key={index}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
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
      </AnimatePresence>
    </div>
  );
}
