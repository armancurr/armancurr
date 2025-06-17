import {
  HouseSimple,
  User,
  SuitcaseSimple,
  ShoppingBag,
  Sun,
  Plus,
} from "@phosphor-icons/react";

const NavItem = ({ icon: Icon, tabId, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(tabId)}
    className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
      activeTab === tabId
        ? "bg-nord-900 text-white"
        : "text-nord-400 hover:bg-nord-800 hover:text-white"
    }`}
  >
    <Icon size={20} />
  </button>
);

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="flex items-center justify-between bg-nord-1000 backdrop-blur-sm p-4 rounded-xl sticky top-4 z-10 border border-nord-1000">
      <nav className="flex items-center gap-2">
        <NavItem
          icon={HouseSimple}
          tabId="home"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <NavItem
          icon={SuitcaseSimple}
          tabId="projects"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </nav>
      <div className="flex items-center gap-2">
        <button className="p-2 text-nord-400 hover:text-white transition-colors">
          <Sun size={20} />
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className="flex items-center gap-2 bg-nord-300 text-nord-950 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-nord-500 transition-colors"
        >
          <Plus size={16} />
          Hire Me
        </button>
      </div>
    </header>
  );
}
