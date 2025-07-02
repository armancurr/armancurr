import { House, FolderOpen, DownloadSimple } from "@phosphor-icons/react";

export default function Header({ setActiveTab, activeTab }) {
  const getButtonClass = (tabName) => {
    const baseClass =
      "flex items-center justify-center gap-2 px-6 py-2 rounded-lg transition-colors duration-200 font-medium cursor-pointer";
    const activeClass = "bg-zinc-800 text-zinc-100";
    const inactiveClass =
      "bg-zinc-800 hover:bg-zinc-900 hover:text-zinc-100 text-zinc-100";

    return `${baseClass} ${activeTab === tabName ? activeClass : inactiveClass}`;
  };

  return (
    <header className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("home")}
            className={getButtonClass("home")}
            aria-label="Home"
          >
            <House size={16} weight="bold" />
            <span className="text-sm">Home</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={getButtonClass("projects")}
            aria-label="Projects"
          >
            <FolderOpen size={16} weight="bold" />
            <span className="text-sm">Projects</span>
          </button>

          <a
            href="/resume.pdf"
            download
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-900 text-zinc-100 hover:text-zinc-100 transition-colors font-medium cursor-pointer"
            aria-label="Download Resume"
          >
            <DownloadSimple size={16} weight="bold" />
            <span className="text-sm">Resume</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
