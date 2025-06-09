import {
  User,
  Wrench,
  FolderOpen,
  At,
  Broom,
  ClockCounterClockwise,
  Terminal,
} from "@phosphor-icons/react";

export const Help = () => {
  return (
    <div className="space-y-2 font-mono">
      <div className="mb-2 mt-2">Available commands:</div>

      <div className="flex items-center gap-3">
        <User size={16} className="text-blue-400" />
        <span className="text-yellow-400">about</span>
        <span className="text-gray-300">
          - Discover the essence of my journey
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Wrench size={16} className="text-orange-400" />
        <span className="text-yellow-400">skills</span>
        <span className="text-gray-300">
          - Unveil the arsenal of my expertise
        </span>
      </div>

      <div className="flex items-center gap-3">
        <FolderOpen size={16} className="text-purple-400" />
        <span className="text-yellow-400">projects</span>
        <span className="text-gray-300">
          - Witness the manifestation of my craft
        </span>
      </div>

      <div className="flex items-center gap-3">
        <At size={16} className="text-green-400" />
        <span className="text-yellow-400">contact</span>
        <span className="text-gray-300">
          - Establish a pathway to communication
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Broom size={16} className="text-red-400" />
        <span className="text-yellow-400">clear</span>
        <span className="text-gray-300">
          - Purge the terminal of all traces
        </span>
      </div>

      <div className="flex items-center gap-3">
        <ClockCounterClockwise size={16} className="text-cyan-400" />
        <span className="text-yellow-400">history</span>
        <span className="text-gray-300">- View command history</span>
      </div>

      <div className="mt-8 mb-2">Navigation shortcuts:</div>

      <div className="flex items-center gap-3">
        <Terminal size={16} className="text-gray-400" />
        <span className="text-yellow-400">↑ / ↓</span>
        <span className="text-gray-300">- Navigate command history</span>
      </div>

      <div className="flex items-center gap-3">
        <Terminal size={16} className="text-gray-400" />
        <span className="text-yellow-400">Tab</span>
        <span className="text-gray-300">- Auto-complete commands</span>
      </div>

      <div className="flex items-center gap-3">
        <Terminal size={16} className="text-gray-400" />
        <span className="text-yellow-400">Esc</span>
        <span className="text-gray-300">- Hide auto-complete suggestions</span>
      </div>
    </div>
  );
};
