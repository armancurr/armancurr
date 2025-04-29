"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CELLS from "vanta/dist/vanta.cells.min.js";
import { House, Eye, HeartStraight, ChatCircle, Timer } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const GitHubIcon = () => (
  <svg
    fill="#ffffff"
    height="32px"
    width="32px"
    viewBox="-143 145 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M177.1,398.4c-8.6-1.5-17.6-1.3-26.4-0.8c-20,1.1-40,3-60,1.2c-9.5-0.9-19.1-1.8-28.7-1.6c-17.4,0.3-32,6-40.6,22.6 c-4.3,8.2-5.3,17-5,26.1c0.7,25.6,11.8,40.2,36.2,47.5c19.6,5.8,39.7,6.6,59.9,6.2c7.5,0,15,0.4,22.5-0.1 c15.5-0.9,30.7-3.2,45.4-8.6c15.2-5.6,24.3-16.3,27.6-31.8c1.3-6,1.9-12.3,1.8-18.4C209.6,420,195.6,401.5,177.1,398.4z M78.7,466.1c-6.5,7.1-15.9,7.2-22.6,0.3c-4.9-5-7.7-12.7-7.7-22.3c0.2-6.5,2.1-13.6,7.7-19.3c6.7-6.9,16.1-6.8,22.6,0.2 C88.5,435.6,88.5,455.5,78.7,466.1z M169.6,466.6c-6.1,6.3-14.9,6.5-21.4,0.7c-11.2-10.2-11.2-32.9,0-43.2 c6.4-5.9,15.2-5.7,21.4,0.6c5.7,5.8,7.6,13.1,7.9,20.9C177.2,453.5,175.2,460.7,169.6,466.6z"></path>
      <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M244.2,423.4 c-1.4,11.4-3.8,23.1-7.9,33.8c-12,30.7-36,47.6-67.8,52.7c-18.2,2.9-36.9,3-57.1,4.5c-18.1-1.6-38-1.8-57.3-5.2 c-37.4-6.6-62.8-32.8-70.2-70.3c-3.8-19.1-4.9-38.3,1-57.3c3.1-9.8,8.2-18.5,14.8-26.4c0.9-1,1.7-2.5,1.6-3.8 c-1.1-17.2,0.9-34.2,6-50.6c4.2-13.7,1.1-12.9,16.3-8.9c18.3,4.8,34.3,14.7,50,25c1.8,1.2,4.6,1.7,6.8,1.3 c22.2-3.4,44.3-3.6,66.5,0.3c1.6,0.3,3.7-0.3,5.2-1.2c13.5-8.8,27.4-16.7,42.6-22.2c5.5-2,11.3-3.3,16.9-5c2.5-0.7,3.6,0.2,4.5,2.6 c6.8,19,9.6,38.5,8.6,58.6c-0.1,1.1,0.5,2.6,1.2,3.5C243,374.6,247.3,398.2,244.2,423.4z"></path>
    </g>
  </svg>
);

const LinkedInIcon = () => (
  <svg
    fill="#ffffff"
    height="32px"
    width="32px"
    viewBox="-143 145 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M41.4,508.1H-8.5V348.4h49.9 V508.1z M15.1,328.4h-0.4c-18.1,0-29.8-12.2-29.8-27.7c0-15.8,12.1-27.7,30.5-27.7c18.4,0,29.7,11.9,30.1,27.7 C45.6,316.1,33.9,328.4,15.1,328.4z M241,508.1h-56.6v-82.6c0-21.6-8.8-36.4-28.3-36.4c-14.9,0-23.2,10-27,19.6 c-1.4,3.4-1.2,8.2-1.2,13.1v86.3H71.8c0,0,0.7-146.4,0-159.7h56.1v25.1c3.3-11,21.2-26.6,49.8-26.6c35.5,0,63.3,23,63.3,72.4V508.1z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg
    fill="#ffffff"
    height="32px"
    width="32px"
    viewBox="-143 145 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M215.2,361.2 c0.1,2.2,0.1,4.5,0.1,6.8c0,69.5-52.9,149.7-149.7,149.7c-29.7,0-57.4-8.7-80.6-23.6c4.1,0.5,8.3,0.7,12.6,0.7 c24.6,0,47.3-8.4,65.3-22.5c-23-0.4-42.5-15.6-49.1-36.5c3.2,0.6,6.5,0.9,9.9,0.9c4.8,0,9.5-0.6,13.9-1.9 C13.5,430-4.6,408.7-4.6,383.2v-0.6c7.1,3.9,15.2,6.3,23.8,6.6c-14.1-9.4-23.4-25.6-23.4-43.8c0-9.6,2.6-18.7,7.1-26.5 c26,31.9,64.7,52.8,108.4,55c-0.9-3.8-1.4-7.8-1.4-12c0-29,23.6-52.6,52.6-52.6c15.1,0,28.8,6.4,38.4,16.6 c12-2.4,23.2-6.7,33.4-12.8c-3.9,12.3-12.3,22.6-23.1,29.1c10.6-1.3,20.8-4.1,30.2-8.3C234.4,344.5,225.5,353.7,215.2,361.2z"></path>
  </svg>
);

export default function HomePage() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      try {
        setVantaEffect(
          CELLS({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            color1: 0x777777,
            color2: 0x999999,
            size: 0.1,
            speed: 1.8,
          })
        );
      } catch (error) {
        console.error("Error initializing Vanta:", error);
      }
    }

    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (error) {
          console.error("Error destroying Vanta:", error);
        }
        setVantaEffect(null);
      }
    };
  }, [vantaEffect]);

  const navItems = [
    { id: "home", icon: <House size={20} weight="fill" /> },
    { id: "timeline", icon: <Timer size={20} weight="fill" /> },
    { id: "projects", icon: <Eye size={20} weight="fill" /> },
    { id: "socials", icon: <HeartStraight size={20} weight="fill" /> },
    { id: "contact", icon: <ChatCircle size={20} weight="fill" /> },
  ];

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  return (
    <div
      ref={vantaRef}
      className="relative h-screen w-screen overflow-hidden font-mono"
      style={{ color: "white", backgroundColor: "#111" }}
    >
      <motion.nav 
        className="absolute top-4 left-0 w-full flex justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-black/40 backdrop-blur-md rounded-full p-2 flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                m-1 p-3 rounded-full transition cursor-pointer
                ${activeTab === item.id
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white/90"
                }
              `}
              aria-label={item.id}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </motion.nav>

      <div className="absolute top-0 left-0 w-full h-full pt-20 flex flex-col items-center justify-start">
        <div className="max-w-3xl mx-auto px-4 flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* Home Content */}
            {activeTab === "home" && (
              <motion.section 
                key="home"
                className="flex flex-col justify-center items-center text-center"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeIn}
              >
                <p className="mb-8 max-w-prose">
                  I am Arman and I build beautiful, functional, and responsive web applications
                  with modern technologies. Passionate about creating intuitive
                  user experiences and solving complex problems.
                </p>
                <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300 cursor-pointer">
                  Download Resume
                </button>
              </motion.section>
            )}

            {/* Timeline Content */}
            {activeTab === "timeline" && (
              <motion.section 
                key="timeline"
                className="flex flex-col justify-start items-center"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeIn}
              >
                <div className="space-y-6">
                  {/* Timeline Item */}
                  <div className="relative pl-10 border-l-2 border-white/20 pb-6">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-white"></div>
                    <h3 className="text-xl font-bold">Senior Developer</h3>
                    <p className="text-gray-400 mb-2">
                      Tech Company • 2022-Present
                    </p>
                    <p className="text-sm">
                      Led development of various web applications using React,
                      Next.js, and other modern frameworks. Implemented CI/CD
                      pipelines and mentored junior developers.
                    </p>
                  </div>

                  <div className="relative pl-10 border-l-2 border-white/20 pb-6">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-white"></div>
                    <h3 className="text-xl font-bold">Full Stack Developer</h3>
                    <p className="text-gray-400 mb-2">Agency Inc. • 2019-2022</p>
                    <p className="text-sm">
                      Developed and maintained client websites and applications
                      using React, Node.js, and various databases. Collaborated
                      with designers to implement responsive UI designs.
                    </p>
                  </div>

                  <div className="relative pl-10 border-l-2 border-white/20 pb-6">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-white"></div>
                    <h3 className="text-xl font-bold">Junior Developer</h3>
                    <p className="text-gray-400 mb-2">Startup Co. • 2017-2019</p>
                    <p className="text-sm">
                      Assisted in developing web applications, fixed bugs, and
                      implemented new features. Focused on frontend development
                      with HTML, CSS, and JavaScript.
                    </p>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Projects Content */}
            {activeTab === "projects" && (
              <motion.section 
                key="projects"
                className="flex flex-col justify-start items-center"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeIn}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Project Card */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2">Better Summerize</h3>
                    <p className="text-zinc-400 mb-3 text-sm">
                      A simple and powerful app that lets you paste text, upload PDFs,
                      or enter YouTube links to instantly get clear, concise summaries
                      of the content. 
                    </p>
                    <div className="flex space-x-2 mb-3">
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        Next.js
                      </span>
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        TypeScript
                      </span>
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        PostgreSQL
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2">Better Chat</h3>
                    <p className="text-zinc-400 mb-3 text-sm">
                      Real-time chat app: customizable themes, group chats, file sharing, end-to-end encryption for secure, instant messaging. 
                    </p>
                    <div className="flex space-x-2 mb-3">
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        Next.js
                      </span>
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        Socket.io
                      </span>
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        PostgreSQL
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2">Crown Cuisine</h3>
                    <p className="text-zinc-400 mb-3 text-sm">
                    Streamline restaurant operations: Customers book tables & order food. Owners manage inventory, menu, tables, and staff effortlessly. 
                    </p>
                    <div className="flex space-x-2 mb-3">
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        Next.js
                      </span>
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        JavaScript
                      </span>
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        PostgreSQL
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2">Better Notes</h3>
                    <p className="text-zinc-400 mb-3 text-sm">
                    Notes app for capturing thoughts, lists, and ideas. Save information and keep code snippets neatly formatted and organized. 
                    </p>
                    <div className="flex space-x-2 mb-3">
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        Next.js
                      </span>
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        TypeScript
                      </span>
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        PostgreSQL
                      </span>
                    </div>
                  </div>
{/* 
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2">Upcoming Project</h3>
                    <p className="text-gray-400 mb-3 text-sm">
                      Stay tuned! Details about this exciting project are coming soon.
                    </p>
                    <div className="flex space-x-2 mb-3">
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        TBD
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2">Upcoming Project</h3>
                    <p className="text-gray-400 mb-3 text-sm">
                      Another exciting project is on the horizon. Check back later for more information!
                    </p>
                    <div className="flex space-x-2 mb-3">
                      <span className="bg-white/10 px-2 py-1 rounded-md text-xs">
                        TBD
                      </span>
                    </div> 
                  </div> */}
                </div>
              </motion.section>
            )}

            {/* Socials Content */}
            {activeTab === "socials" && (
              <motion.section 
                key="socials"
                className="flex flex-col justify-start items-center text-center"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeIn}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a
                    href="#"
                    className="flex flex-col items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="mb-3">
                      <GitHubIcon />
                    </div>
                    <h3 className="font-semibold text-sm">GitHub</h3>
                  </a>
                  <a
                    href="#"
                    className="flex flex-col items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="mb-3">
                      <LinkedInIcon />
                    </div>
                    <h3 className="font-semibold text-sm">LinkedIn</h3>
                  </a>
                  <a
                    href="#"
                    className="flex flex-col items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="mb-3">
                      <TwitterIcon />
                    </div>
                    <h3 className="font-semibold text-sm">Twitter</h3>
                  </a>
                </div>
                <div className="mt-8">
                  <p className="text-zinc-400 mb-4 text-sm">
                    Follow my journey as I explore new technologies and <br/>
                    share my learnings with others.
                  </p>
                </div>
              </motion.section>
            )}

            {/* Contact Content */}
            {activeTab === "contact" && (
              <motion.section 
                key="contact"
                className="flex flex-col justify-start items-center"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeIn}
              >
                <form className="space-y-4 w-full max-w-md">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-white/5 border border-white/10 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-white/5 border border-white/10 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="3"
                      className="w-full bg-white/5 border border-white/10 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
                      placeholder="How can I help you?"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-all duration-300 text-sm cursor-pointer"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-zinc-400 text-sm">
                    Prefer email? Reach out directly at{" "}
                    <a
                      href="vereoman@gmail.com"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      vereoman
                    </a>
                  </p>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}