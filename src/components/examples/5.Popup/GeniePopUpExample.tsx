import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimationToggle } from "../../AnimationToggle";
import { CodeViewer } from "../../CodeViewer";

const staticCode = `{isOpen && (
  <div className="absolute bottom-full right-0 mb-3 w-80 bg-white rounded-lg shadow-xl overflow-hidden h-[400px] flex flex-col">
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h3 className="font-bold">Chat</h3>
      <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
    </div>

    <div className="p-4 overflow-y-auto flex-grow">
      {/* Chat content */}
    </div>

    {/* Message input */}
  </div>
)}`;

const animatedCode = `import { motion, AnimatePresence } from "motion/react";

{/* Add AnimatePresence around the element that enters and leaves the dom */}
<AnimatePresence>
  {isOpen && (
    // A motion.div with initial, animate, and exit props
    <motion.div
      className="absolute bottom-full right-0 mb-3 w-80 bg-white rounded-lg shadow-xl overflow-hidden h-[400px] flex flex-col"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 27,
      }}
      // Optional: Add transformOrigin to control the scaling point
      style={{ transformOrigin: "bottom right" }}
    >
      {/* Header */}

      {/* Staggered message animations */}
      <motion.div
        className="p-4 overflow-y-auto flex-grow"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2, delay: 0.7 } },
          hidden: {},
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {/* Message content */}
        </motion.div>

        {/* More messages */}
      </motion.div>

      {/* Input area */}
    </motion.div>
  )}
</AnimatePresence>`;

function StaticPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-[500px] border border-gray-200 rounded-lg bg-gray-50 p-4 flex flex-col">
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Main content area</p>
      </div>

      <div className="flex justify-end relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md flex items-center"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </span>
          Chat
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-3 w-80 bg-white rounded-lg shadow-xl overflow-hidden h-[400px] flex flex-col">
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold">Chat</h3>
              <button onClick={() => setIsOpen(false)} className="text-white">
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-grow">
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="ml-2 bg-gray-100 p-2 rounded-lg max-w-[80%]">
                    <p className="text-sm">Hello! How can I help you today?</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="mr-2 bg-blue-100 p-2 rounded-lg max-w-[80%]">
                    <p className="text-sm">
                      I'm just checking out this animation demo!
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    Y
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-3 flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AnimatedPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative h-[500px] border border-gray-200 rounded-lg bg-gray-50 p-4 flex flex-col">
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Main content area</p>
      </div>

      <div className="flex justify-end relative">
        <motion.button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-md flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </span>
          Chat
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-full right-0 mb-3 w-80 bg-white rounded-lg shadow-xl overflow-hidden h-[400px] flex flex-col"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 27,
              }}
              style={{ transformOrigin: "bottom right" }}
            >
              <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h3 className="font-bold">Chat</h3>
                <button onClick={() => setIsOpen(false)} className="text-white">
                  ✕
                </button>
              </div>

              <motion.div
                className="p-4 overflow-y-auto flex-grow"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.2, delay: 0.7 } },
                  hidden: {},
                }}
              >
                <div className="space-y-4">
                  <motion.div
                    className="flex"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div className="ml-2 bg-gray-100 p-2 rounded-lg max-w-[80%]">
                      <p className="text-sm">
                        Hello! How can I help you today?
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex justify-end"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <div className="mr-2 bg-blue-100 p-2 rounded-lg max-w-[80%]">
                      <p className="text-sm">
                        I'm just checking out this animation demo!
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      Y
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="border-t p-3 flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg">
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function GeniePopupExample() {
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  return (
    <div>
      <div className="w-full flex justify-center mb-6">
        <AnimationToggle
          isEnabled={animationsEnabled}
          onToggle={() => setAnimationsEnabled(!animationsEnabled)}
        />
      </div>

      {animationsEnabled ? <AnimatedPopup /> : <StaticPopup />}

      <CodeViewer staticCode={staticCode} animatedCode={animatedCode} />
    </div>
  );
}
