import {
  TwitterLogo,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import LocationMap from "./location-map";
import { TooltipProvider } from "@/components/ui/tooltip";
import TechStack from "./tech-stack";

export default function Home() {
  return (
    <TooltipProvider>
      <div className="p-6 bg-[#FFF2E0] border-4 border-[#C0C9EE] rounded-3xl flex flex-col flex-grow">
        <div className="mb-6">
          <div className="bg-[#898AC4] border-4 border-[#C0C9EE] rounded-2xl p-4 max-w-xl mx-auto w-full">
            <div className="p-2 w-full h-64">
              <LocationMap />
            </div>
            <div className="flex flex-col items-center text-center gap-4 w-full">
              <h1 className="text-3xl text-[#FFF2E0] font-bold">
                Hey, I'm Arman
                <br />
                <span className="text-sm text-[#C0C9EE]">(urr-man)</span>
              </h1>
              <p className="text-[#FFF2E0] text-md font-medium max-w-md">
                I'm a full-stack developer and a software engineering student. I
                specialize in UI design with great attention to detail and I
                like to build blazing fast tools.
              </p>
              <div className="flex items-center justify-center gap-2 mt-2 mb-2">
                <a
                  href="https://github.com/armancurr"
                  target="_blank"
                  className="p-3 rounded-full bg-[#A2AADB] hover:bg-[#898AC4] transition-colors duration-200"
                >
                  <GithubLogo
                    size={18}
                    weight="fill"
                    className="text-[#FFF2E0]"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/armancurr"
                  target="_blank"
                  className="p-3 rounded-full bg-[#A2AADB] hover:bg-[#898AC4] transition-colors duration-200"
                >
                  <LinkedinLogo
                    size={18}
                    weight="fill"
                    className="text-[#FFF2E0]"
                  />
                </a>
                <a
                  href="https://x.com/rrucnamra"
                  target="_blank"
                  className="p-3 rounded-full bg-[#A2AADB] hover:bg-[#898AC4] transition-colors duration-200"
                >
                  <TwitterLogo
                    size={18}
                    weight="fill"
                    className="text-[#FFF2E0]"
                  />
                </a>

                <a
                  href="mailto:armancurr@proton.me"
                  target="_blank"
                  className="p-3 rounded-full bg-[#A2AADB] hover:bg-[#898AC4] transition-colors duration-200"
                >
                  <EnvelopeSimple
                    size={18}
                    weight="fill"
                    className="text-[#FFF2E0]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="bg-[#898AC4] border-4 border-[#C0C9EE] rounded-2xl p-4 max-w-xl mx-auto w-full">
            <TechStack />
          </div>
        </div>

        {/* <div className="">
          <div className="bg-[#898AC4] border-4 border-[#C0C9EE] rounded-2xl p-4 max-w-xl mx-auto w-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-[#FFF2E0]">
                  Recent Projects
                </h2>
                <button
                  onClick={() => setActiveTab("projects")}
                  className="text-sm text-[#FFF2E0] hover:text-[#373A40] transition-colors flex items-center gap-1"
                >
                  View All <ArrowRight size={14} />
                </button>
              </div>
              <div className="relative overflow-hidden carousel-container">
                <div className="gap-4 project-carousel">
                  {duplicatedProjects.map((project, index) => (
                    <ProjectPreviewCard
                      key={`${project.id}-${index}`}
                      project={project}
                      onClick={handleProjectClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="flex-grow"></div>
      </div>
    </TooltipProvider>
  );
}
