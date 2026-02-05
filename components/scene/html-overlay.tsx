"use client"

import { Mail, Github, Linkedin, Twitter, ArrowUp } from "lucide-react"

export function HTMLOverlay() {
  return (
    <div className="w-full">
      {/* Intro Section - Page 1 */}
      <section className="h-screen flex items-end justify-center pb-20 pointer-events-auto">
        <div className="text-center text-white/40 text-sm tracking-widest animate-bounce">
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* Parley Section - Page 2 */}
      <section className="h-screen flex items-center justify-end pr-8 md:pr-16 pointer-events-auto">
        <div className="max-w-md text-right">
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            A modern messaging platform designed for seamless communication.
            Built with real-time sync, end-to-end encryption, and beautiful UI.
          </p>
          <div className="mt-4 flex gap-3 justify-end">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
              React Native
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
              WebSockets
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
              E2E Encryption
            </span>
          </div>
        </div>
      </section>

      {/* TanksInc Section - Page 3 */}
      <section className="h-screen flex items-center justify-start pl-8 md:pl-16 pointer-events-auto">
        <div className="max-w-md">
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            A multiplayer tank battle game with physics-based gameplay. 
            Features destructible environments and strategic combat mechanics.
          </p>
          <div className="mt-4 flex gap-3">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              Unity
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              Multiplayer
            </span>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
              Physics
            </span>
          </div>
        </div>
      </section>

      {/* Dini Section - Page 4 */}
      <section className="h-screen flex items-center justify-end pr-8 md:pr-16 pointer-events-auto">
        <div className="max-w-md text-right">
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            Personal finance dashboard with real-time portfolio tracking,
            expense analytics, and intelligent budgeting recommendations.
          </p>
          <div className="mt-4 flex gap-3 justify-end">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
              Next.js
            </span>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
              D3.js
            </span>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">
              Plaid API
            </span>
          </div>
        </div>
      </section>

      {/* About/Contact Section - Page 5 */}
      <section className="h-screen flex items-center justify-center px-8 pointer-events-auto">
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Let&apos;s Work Together
          </h2>
          
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            I&apos;m a creative developer passionate about building immersive digital
            experiences. Currently available for freelance projects and full-time
            opportunities.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <span className="px-4 py-2 bg-white/5 text-white/70 text-sm rounded-lg border border-white/10">
              React / Next.js
            </span>
            <span className="px-4 py-2 bg-white/5 text-white/70 text-sm rounded-lg border border-white/10">
              Three.js / R3F
            </span>
            <span className="px-4 py-2 bg-white/5 text-white/70 text-sm rounded-lg border border-white/10">
              TypeScript
            </span>
            <span className="px-4 py-2 bg-white/5 text-white/70 text-sm rounded-lg border border-white/10">
              Node.js
            </span>
            <span className="px-4 py-2 bg-white/5 text-white/70 text-sm rounded-lg border border-white/10">
              WebGL / GLSL
            </span>
          </div>

          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-full transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </a>

          <div className="flex gap-6 justify-center mt-10">
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>

          <div className="mt-16 text-white/20 text-xs">
            <p>© 2026 Portfolio. All rights reserved.</p>
          </div>

          {/* Back to top hint */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 flex items-center gap-2 mx-auto text-white/30 hover:text-white/60 transition-colors text-sm"
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </button>
        </div>
      </section>
    </div>
  )
}
