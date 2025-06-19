import { House, FolderOpen, DownloadSimple } from "@phosphor-icons/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FloatingNav({ setActiveTab, activeTab }) {
  const getButtonClass = (tabName) => {
    const baseClass =
      "w-12 h-12 rounded-full flex items-center justify-center shadow transition-colors";
    const activeClass = "bg-[#FFF2E0] hover:bg-[#FFF2E0] text-[#898AC4]";
    const inactiveClass = "bg-[#FFF2E0] hover:bg-[#FFF2E0] text-[#898AC4]";

    return `${baseClass} ${activeTab === tabName ? activeClass : inactiveClass}`;
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setActiveTab("home")}
              className={getButtonClass("home")}
              aria-label="Home"
            >
              <House size={18} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-[#FFF2E0] text-[#EEEEEE]">
            Home
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setActiveTab("projects")}
              className={getButtonClass("projects")}
              aria-label="Projects"
            >
              <FolderOpen size={18} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-[#FFF2E0] text-[#EEEEEE]">
            Projects
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => window.open("#", "_blank")}
              className="bg-[#FFF2E0] text-[#898AC4] w-12 h-12 rounded-full flex items-center justify-center shadow transition-colors"
              aria-label="Download Resume"
            >
              <DownloadSimple size={18} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-[#FFF2E0] text-[#EEEEEE]">
            Download Resume
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
