import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeViewerProps = {
  staticCode: string;
  animatedCode: string;
};

export function CodeViewer({ staticCode, animatedCode }: CodeViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"static" | "animated">("animated");

  return (
    <div className="mt-8 flex flex-col items-center">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-sm flex items-center gap-2 hover:bg-blue-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <span>{isOpen ? "Hide Code" : "Show Code"}</span>
        <svg
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none">
            <path d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M14.486 3.143a1 1 0 0 1 .692 1.233l-4.43 15.788a1 1 0 0 1-1.926-.54l4.43-15.788a1 1 0 0 1 1.234-.693M7.207 7.05a1 1 0 0 1 0 1.414L3.672 12l3.535 3.535a1 1 0 1 1-1.414 1.415L1.55 12.707a1 1 0 0 1 0-1.414L5.793 7.05a1 1 0 0 1 1.414 0m9.586 1.414a1 1 0 1 1 1.414-1.414l4.243 4.243a1 1 0 0 1 0 1.414l-4.243 4.243a1 1 0 0 1-1.414-1.415L20.328 12z"
            />
          </g>
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
              transition: {
                opacity: { duration: 0.2 },
                height: { type: "spring", stiffness: 300, damping: 22 },
                y: { type: "spring", stiffness: 500, damping: 30 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -20,
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.3 },
              },
            }}
            className="w-full overflow-hidden mt-4 border border-gray-200 rounded-lg"
          >
            <div>
              <div className="flex border-b border-gray-200 relative">
                <button
                  onClick={() => setActiveTab("static")}
                  className={`px-4 py-2 font-medium text-sm relative z-10 ${
                    activeTab === "static"
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Static Version
                  {activeTab === "static" && (
                    <motion.div
                      layoutId="activeCodeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      initial={false}
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("animated")}
                  className={`px-4 py-2 font-medium text-sm relative z-10 ${
                    activeTab === "animated"
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Animated Version
                  {activeTab === "animated" && (
                    <motion.div
                      layoutId="activeCodeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      initial={false}
                    />
                  )}
                </button>
              </div>

              <div className="bg-gray-900 relative overflow-hidden">
                <SyntaxHighlighter
                  language="tsx"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: "0",
                    fontSize: "0.875rem",
                    maxHeight: "500px",
                  }}
                >
                  {activeTab === "static" ? staticCode : animatedCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
