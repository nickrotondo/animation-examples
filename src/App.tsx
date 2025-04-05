import "./App.css";
import { TabSwitcher, Tab } from "./components/TabSwitcher";
import { AccordionExample } from "./components/examples/1.Accordion/AccordionExample";
import { SlidingMenuExample } from "./components/examples/2.SlidingMenu/SlidingMenuExample";
import { GridLayoutExample } from "./components/examples/3.GridLayout/GridLayoutExample";
import { CounterExample } from "./components/examples/4.Counter/CounterExample";
import { GeniePopupExample } from "./components/examples/5.Popup/GeniePopUpExample";
import { DraggableSphereExample } from "./components/examples/6.DraggableSphere/DraggableSphereExample";

function App() {
  const tabs: Tab[] = [
    {
      id: "accordion",
      label: "FAQ Accordion",
      component: <AccordionExample />,
    },
    {
      id: "sliding-menu",
      label: "Sliding Menu",
      component: <SlidingMenuExample />,
    },
    {
      id: "grid-layout",
      label: "Grid Layout",
      component: <GridLayoutExample />,
    },
    {
      id: "counter",
      label: "Counter",
      component: <CounterExample />,
    },
    {
      id: "genie-popup",
      label: "Genie Popup",
      component: <GeniePopupExample />,
    },
    {
      id: "draggable-sphere",
      label: "Draggable Sphere",
      component: <DraggableSphereExample />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Animation Examples</h1>
        <p className="text-gray-600">
          Simple<em>-ish</em> animations using{" "}
          <a
            href="https://motion.dev/"
            className="text-purple-600 underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Motion
          </a>
          , formerly Framer-Motion
        </p>
        <p className="text-gray-600">
          <em>Framer? I hardly knew her! Boom.</em>
        </p>
      </header>

      <main className="overflow-visible">
        <TabSwitcher tabs={tabs} />
      </main>
    </div>
  );
}

export default App;
