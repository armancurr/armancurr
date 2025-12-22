"use client"
import {
  GithubLogo,
  TwitterLogo,
  LinkedinLogo,
  InstagramLogo,
} from "phosphor-react"
import { PROJECTS, WORK_EXPERIENCE, EMAIL, SOCIAL_LINKS } from "./data"

type ProjectVideoProps = {
  src: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      className="aspect-video w-full rounded-xl"
    />
  )
}

function SocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <a
      href={link}
      className="group relative inline-flex shrink-0 items-center gap-2 rounded-full bg-zinc-100 p-2 text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
    >
      {children}
    </a>
  )
}

export default function Personal() {
  return (
    <main className="space-y-24">
      <section>
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            Focused on creating intuitive and performant web experiences.
            Bridging the gap between design and development.
          </p>
        </div>
      </section>

      <section>
        <h3 className="mb-5 text-lg font-medium">Selected Projects</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectVideo src={project.video} />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-5 text-lg font-medium">Work Experience</h3>
        <div className="flex flex-col space-y-2">
          {WORK_EXPERIENCE.map((job) => (
            <a
              className="relative overflow-hidden rounded-2xl bg-zinc-300/30 p-[1px] dark:bg-zinc-600/30"
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              key={job.id}
            >
              <div className="relative h-full w-full rounded-[15px] bg-white p-4 dark:bg-zinc-950">
                <div className="relative flex w-full flex-row justify-between">
                  <div>
                    <h4 className="font-normal dark:text-zinc-100">
                      {job.title}
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {job.company}
                    </p>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {job.start} - {job.end}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-5 text-lg font-medium">Connect</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Feel free to contact me at{" "}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} link={link.link}>
              {link.label === "Github" && <GithubLogo size={18} />}
              {link.label === "Twitter" && <TwitterLogo size={18} />}
              {link.label === "LinkedIn" && <LinkedinLogo size={18} />}
              {link.label === "Instagram" && <InstagramLogo size={18} />}
            </SocialLink>
          ))}
        </div>
      </section>
    </main>
  )
}
