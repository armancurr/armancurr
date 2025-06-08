import type { JSX } from "react/jsx-runtime";

export const FileSystem = {
  ls: (): JSX.Element => (
    <div>
      <span className="text-neutral-300">bun.lock</span>
      <span className="ml-8 text-neutral-300">eslint.config.mjs</span>
      <span className="ml-8 text-neutral-300">next-env.d.ts</span>
      <span className="ml-8 text-neutral-300">package.json</span>
      <span className="ml-8 text-blue-400">public/</span>
      <span className="ml-8 text-blue-400">src/</span>
      <br />
      <span className="text-neutral-300">components.json</span>
      <span className="ml-8 text-neutral-300">next.config.ts</span>
      <span className="ml-8 text-blue-400">node_modules/</span>
      <span className="ml-8 text-neutral-300">postcss.config.mjs</span>
      <span className="ml-8 text-neutral-300">README.md</span>
      <span className="ml-8 text-neutral-300">tsconfig.json</span>
    </div>
  ),

  bunDev: (): JSX.Element => (
    <div>
      <span className="text-yellow-500">$ next dev --turbopack</span>
      <br />
      <span className="text-purple-500">▲ Next.js 15.3.3</span>
      <span className="text-neutral-300"> (Turbopack)</span>
      <br />
      <span className="text-neutral-300">- Local:</span>
      <span className="ml-12 text-neutral-300">http://localhost:3000</span>
      <br />
      <span className="text-neutral-300">- Network:</span>
      <span className="ml-8 text-neutral-300">http://10.2.0.2:3000</span>
      <br />
      <br />
      <span className="text-green-500">✓ Starting...</span>
    </div>
  ),
};
