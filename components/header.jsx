import {
  HouseSimple,
  SuitcaseSimple,
  DownloadSimple,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavItem = ({ icon: Icon, tabId, activeTab, setActiveTab, tooltip }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant={activeTab === tabId ? "secondary" : "ghost"}
        size="icon"
        onClick={() => setActiveTab(tabId)}
        className={`rounded-lg transition-colors duration-200 cursor-pointer ${
          activeTab === tabId
            ? "bg-[#DC5F00] text-[#EEEEEE]"
            : "hover:bg-[#DC5F00] text-[#D1D8BE]"
        }`}
        aria-label={tooltip}
      >
        <Icon size={20} weight="fill" />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="ml-2 bg-[#686D76] text-[#EEEEEE]">{tooltip}</TooltipContent>
  </Tooltip>
);

export default function Header({ activeTab, setActiveTab }) {
  return (
    <TooltipProvider>
      <header className="flex items-center justify-between bg-[#373A40] backdrop-blur-sm p-4 rounded-xl sticky top-4 z-10">
        <nav className="flex items-center gap-2">
          <NavItem
            icon={HouseSimple}
            tabId="home"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tooltip="Home"
          />
          <NavItem
            icon={SuitcaseSimple}
            tabId="projects"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tooltip="Projects"
          />
        </nav>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setActiveTab("contact")}
                variant="secondary"
                className="flex items-center gap-2 bg-[#DC5F00] text-[#EEEEEE] text-sm py-2 px-4 rounded-lg cursor-pointer"
                aria-label="Download Resume"
              >
                <DownloadSimple size={16} />
                Resume
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2 bg-[#686D76] text-[#EEEEEE]">Download Resume</TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
}