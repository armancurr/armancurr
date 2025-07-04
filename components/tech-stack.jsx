import {
  TypeScriptIcon,
  NextJSIcon,
  ReactIcon,
  TailwindIcon,
  NodeJSIcon,
  MongoDBIcon,
  PrismaIcon,
  PostgreSQLIcon,
  GitIcon,
} from "@/components/icons";

export default function TechStack() {
  const technologies = [
    {
      icon: <TypeScriptIcon size={32} />,
      description: "Enjoy writing robust, type-safe code with TypeScript.",
    },
    {
      icon: <NextJSIcon size={32} />,
      description: "Build modern, performant web apps using Next.js.",
    },
    {
      icon: <ReactIcon size={32} />,
      description: "Experienced in crafting interactive UIs with React.",
    },
    {
      icon: <TailwindIcon size={32} />,
      description:
        "Prefer utility-first styling for rapid UI development with Tailwind CSS.",
    },
    {
      icon: <NodeJSIcon size={32} />,
      description: "Comfortable building scalable backends with Node.js.",
    },
    {
      icon: <MongoDBIcon size={32} />,
      description: "Skilled in using MongoDB for document-based data storage.",
    },
    {
      icon: <PrismaIcon size={32} />,
      description: "Leverage Prisma for type-safe database access.",
    },
    {
      icon: <PostgreSQLIcon size={32} />,
      description: "Rely on PostgreSQL for robust data management.",
    },
    {
      icon: <GitIcon size={32} />,
      description: "Version control and collaboration handled with Git.",
    },
  ];

  return (
    <div className="space-y-2 p-2">
      <div className="grid grid-cols-3 gap-6">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 hover:bg-zinc-800/20 rounded-xl transition-colors duration-200 text-zinc-100"
          >
            <div className="flex items-center bg-gradient-to-b from-zinc-300 to-zinc-500 p-2 rounded-full justify-center mb-3">
              {tech.icon}
            </div>
            <p className="text-xs font-medium text-center line-clamp-3 leading-relaxed">
              {tech.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
