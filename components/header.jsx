import { House, FolderOpen, DownloadSimple } from "@phosphor-icons/react";

export default function Header({ setActiveTab, activeTab }) {
  const getButtonClass = (tabName) => {
    const baseClass =
      "flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 font-medium cursor-pointer";
    const activeClass = "bg-[#898AC4] text-[#FFF2E0]";
    const inactiveClass =
      "bg-[#FFF2E0] hover:bg-[#A2AADB] hover:text-[#FFF2E0] text-[#898AC4]";

    return `${baseClass} ${activeTab === tabName ? activeClass : inactiveClass}`;
  };

  return (
    <header className="bg-[#FFF2E0] border-4 border-[#C0C9EE] rounded-2xl p-4 mb-6">
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
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#FFF2E0] hover:bg-[#A2AADB] text-[#898AC4] hover:text-[#FFF2E0] transition-colors font-medium cursor-pointer"
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
