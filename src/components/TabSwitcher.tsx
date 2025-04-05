import { motion, AnimatePresence } from "motion/react";
import { useState, ReactNode } from "react";

export type Tab = {
  id: string;
  label: string;
  component: ReactNode;
};

type TabSwitcherProps = {
  tabs: Tab[];
};

export function TabSwitcher({ tabs }: TabSwitcherProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center relative border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-md font-semibold relative cursor-pointer ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                initial={false}
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 relative overflow-visible ">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="w-full"
          >
            {tabs.find((tab) => tab.id === activeTab)?.component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
