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
      <div className="p-6 bg-zinc-900 border-2 border-zinc-700 rounded-3xl flex flex-col flex-grow">
        <div className="mb-6">
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-4 max-w-xl mx-auto w-full">
            <div className="p-2 w-full h-64">
              <LocationMap />
            </div>
            <div className="flex flex-col items-start pl-2 gap-4 w-full">
              <h1 className="text-2xl text-zinc-100 font-bold mt-2">
                Hey, I'm Arman{" "}
                <span className="text-sm text-zinc-400">(urr-maan)</span>
              </h1>
              <p className="text-zinc-100 text-md font-medium max-w-md mb-2">
                I'm a full-stack developer and a software engineering student. I
                specialize in UI design with great attention to detail.
              </p>
              <div className="flex items-start justify-end gap-2 mb-4 pr-2">
                <a
                  href="https://github.com/armancurr"
                  target="_blank"
                  className="p-3 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-800 border-2 border-zinc-700 hover:bg-gradient-to-b hover:from-zinc-800 hover:to-zinc-900 transition-colors duration-200"
                >
                  <GithubLogo
                    size={18}
                    weight="fill"
                    className="text-zinc-100"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/armancurr"
                  target="_blank"
                  className="p-3 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-800 border-2 border-zinc-700 hover:bg-gradient-to-b hover:from-zinc-800 hover:to-zinc-900 transition-colors duration-200"
                >
                  <LinkedinLogo
                    size={18}
                    weight="fill"
                    className="text-zinc-100"
                  />
                </a>
                <a
                  href="https://x.com/rrucnamra"
                  target="_blank"
                  className="p-3 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-800 border-2 border-zinc-700 hover:bg-gradient-to-b hover:from-zinc-800 hover:to-zinc-900 transition-colors duration-200"
                >
                  <TwitterLogo
                    size={18}
                    weight="fill"
                    className="text-zinc-100"
                  />
                </a>

                <a
                  href="mailto:armancurr@proton.me"
                  target="_blank"
                  className="p-3 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-800 border-2 border-zinc-700 hover:bg-gradient-to-b hover:from-zinc-800 hover:to-zinc-900 transition-colors duration-200"
                >
                  <EnvelopeSimple
                    size={18}
                    weight="fill"
                    className="text-zinc-100"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="bg-zinc-900 border-2 border-zinc-700 rounded-2xl p-4 max-w-xl mx-auto w-full">
            <TechStack />
          </div>
        </div>

        {/* <div className="">
          <div className="bg-zinc-800 border-4 border-zinc-600 rounded-2xl p-4 max-w-xl mx-auto w-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-zinc-100">
                  Recent Projects
                </h2>
                <button
                  onClick={() => setActiveTab("projects")}
                  className="text-sm text-zinc-100 hover:text-zinc-900 transition-colors flex items-center gap-1"
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
