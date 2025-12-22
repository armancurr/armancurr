type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: "Motion Primitives Pro",
    description:
      "Advanced components and templates to craft beautiful websites.",
    link: "https://pro.motion-primitives.com/",
    video:
      "https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0",
    id: "project1",
  },
  {
    name: "Motion Primitives",
    description: "UI kit to make beautiful, animated interfaces.",
    link: "https://motion-primitives.com/",
    video:
      "https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0",
    id: "project2",
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: "OneSol AI Labs",
    title: "Full-Stack Developer",
    start: "Dec, 2025",
    end: "Present",
    link: "https://www.onesol.in",
    id: "work1",
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Github",
    link: "https://github.com/armancurr",
  },
  {
    label: "Twitter",
    link: "https://x.com/rrucnamra",
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/armancurr",
  },
]

export const EMAIL = "armancurr@proton.me"
