'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Fade in colors after page load
    const fadeTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 300) // Start fade after 300ms

    // Initialize Lenis
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Animation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing curve
      direction: 'vertical', // Scroll direction
      gestureDirection: 'vertical', // Gesture direction
      smooth: true,
      mouseMultiplier: 1, // Mouse wheel sensitivity
      smoothTouch: false, // Disable on touch devices (better performance)
      touchMultiplier: 2,
      infinite: false,
    })

    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
      clearTimeout(fadeTimer)
    }
  }, [])

  return (
    <div className="min-h-screen relative" style={{backgroundColor: '#18181b'}}>
      {/* Subtle overlay that fades out - behind content */}
      <div className={`absolute inset-0 bg-white transition-opacity duration-[3000ms] ease-out z-0 ${
        isLoaded ? 'opacity-0' : 'opacity-100'
      }`} />
      
      {/* Clean Header */}
      <header className="fixed top-4 left-8 right-8 z-50">
        <div className="backdrop-blur-md border shadow-lg rounded-2xl" style={{backgroundColor: 'rgba(39, 39, 42, 0.9)', borderColor: '#3f3f46'}}>
          <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold tracking-wide" style={{color: '#fafafa'}}>n8n Chat</h1>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="hover:focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors text-sm font-medium rounded-sm px-2 py-1" style={{color: '#a1a1aa', '--tw-ring-color': '#2563eb'}} onMouseEnter={e => e.target.style.color = '#fafafa'} onMouseLeave={e => e.target.style.color = '#a1a1aa'}>About</a>
              <a href="#" className="hover:focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors text-sm font-medium rounded-sm px-2 py-1" style={{color: '#a1a1aa', '--tw-ring-color': '#2563eb'}} onMouseEnter={e => e.target.style.color = '#fafafa'} onMouseLeave={e => e.target.style.color = '#a1a1aa'}>Features</a>
              <a href="#" className="hover:focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors text-sm font-medium rounded-sm px-2 py-1" style={{color: '#a1a1aa', '--tw-ring-color': '#2563eb'}} onMouseEnter={e => e.target.style.color = '#fafafa'} onMouseLeave={e => e.target.style.color = '#a1a1aa'}>Docs</a>
              <a href="#" className="hover:focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors text-sm font-medium rounded-sm px-2 py-1" style={{color: '#a1a1aa', '--tw-ring-color': '#2563eb'}} onMouseEnter={e => e.target.style.color = '#fafafa'} onMouseLeave={e => e.target.style.color = '#a1a1aa'}>Contact</a>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="px-6 py-2 text-black font-medium text-sm rounded-lg hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200" style={{backgroundColor: '#f59e0b', '--tw-ring-color': '#f59e0b'}} onMouseEnter={e => e.target.style.backgroundColor = '#d97706'} onMouseLeave={e => e.target.style.backgroundColor = '#f59e0b'}
              >
                Get Started
              </Link>
              
              {/* Mobile Menu Button */}
              <button className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1">
                <span className="w-5 h-0.5 bg-stone-600"></span>
                <span className="w-5 h-0.5 bg-stone-600"></span>
                <span className="w-5 h-0.5 bg-stone-600"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-32">
        <div className="text-center mb-32">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-8 tracking-tight" style={{color: '#fafafa'}}>
            Simple webhooks,
            <br />
            <span className="italic font-light">Extraordinary chats</span>
          </h1>
          
          {/* Divider Line */}
          <div className="w-24 h-px mx-auto my-16" style={{backgroundColor: '#3f3f46'}}></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed font-light" style={{color: '#e4e4e7'}}>
              We specialize in connecting your n8n workflows to conversational interfaces that create memorable user experiences.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed" style={{color: '#a1a1aa'}}>
                n8n Chat was built for developers who want to transform their automation workflows into interactive chat experiences. 
                No complex setup, no learning curves—just connect your webhook and start chatting.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-black hover:transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 tracking-wide rounded-lg shadow-sm hover:shadow-md"
                style={{backgroundColor: '#f59e0b', '--tw-ring-color': '#f59e0b'}}
                onMouseEnter={e => e.target.style.backgroundColor = '#d97706'}
                onMouseLeave={e => e.target.style.backgroundColor = '#f59e0b'}
              >
                Connect to n8n
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Content for Scrolling */}
        <section className="max-w-6xl mx-auto px-8 py-32 space-y-24">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold" style={{color: '#fafafa'}}>Simple Setup</h3>
              <p className="text-lg leading-relaxed" style={{color: '#a1a1aa'}}>
                Connect your n8n webhook in seconds. No complex configuration or lengthy onboarding process required.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold" style={{color: '#fafafa'}}>Powerful Workflows</h3>
              <p className="text-lg leading-relaxed" style={{color: '#a1a1aa'}}>
                Transform any automation into an interactive conversation. Your workflows become accessible to everyone.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold" style={{color: '#fafafa'}}>Instant Results</h3>
              <p className="text-lg leading-relaxed" style={{color: '#a1a1aa'}}>
                See your chat interface come alive immediately. Real-time responses from your n8n workflows.
              </p>
            </div>
          </div>

          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight" style={{color: '#fafafa'}}>
              Ready to transform your workflows?
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{color: '#a1a1aa'}}>
              Join developers who are already building amazing conversational experiences with their n8n automations.
            </p>
            <div className="pt-8">
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-12 py-4 text-xl font-semibold text-black hover:transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 tracking-wide rounded-lg shadow-sm hover:shadow-md"
                style={{backgroundColor: '#f59e0b', '--tw-ring-color': '#f59e0b'}}
                onMouseEnter={e => e.target.style.backgroundColor = '#d97706'}
                onMouseLeave={e => e.target.style.backgroundColor = '#f59e0b'}
              >
                Start Building Today
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-12" style={{color: '#fafafa'}}>How it works</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#3f3f46'}}>
                    <span className="text-sm font-bold" style={{color: '#e4e4e7'}}>1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2" style={{color: '#fafafa'}}>Create your n8n workflow</h4>
                    <p style={{color: '#a1a1aa'}}>Build any automation workflow in n8n with your preferred tools and services.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#3f3f46'}}>
                    <span className="text-sm font-bold" style={{color: '#e4e4e7'}}>2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2" style={{color: '#fafafa'}}>Add webhook endpoint</h4>
                    <p style={{color: '#a1a1aa'}}>Configure a webhook trigger in your n8n workflow to receive chat messages.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#3f3f46'}}>
                    <span className="text-sm font-bold" style={{color: '#e4e4e7'}}>3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2" style={{color: '#fafafa'}}>Connect and chat</h4>
                    <p style={{color: '#a1a1aa'}}>Paste your webhook URL into n8n Chat and start conversing with your workflows.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl p-8 border" style={{backgroundColor: '#27272a', borderColor: '#3f3f46'}}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="rounded-lg p-4 font-mono text-sm border" style={{backgroundColor: '#18181b', borderColor: '#3f3f46'}}>
                    <div style={{color: '#a1a1aa'}}>POST webhook-url</div>
                    <div className="mt-2" style={{color: '#fafafa'}}>{"{ \"message\": \"Hello workflow!\" }"}</div>
                    <div className="mt-4" style={{color: '#a1a1aa'}}>Response:</div>
                    <div style={{color: '#fafafa'}}>{"{ \"reply\": \"Workflow executed!\" }"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
