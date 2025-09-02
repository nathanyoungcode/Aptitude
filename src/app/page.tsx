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
            

            {/* CTA Button */}
            <Link
              href="/auth/signin"
              className="px-6 py-2 text-black font-medium text-sm rounded-lg hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200" style={{backgroundColor: '#f59e0b', '--tw-ring-color': '#f59e0b'}} onMouseEnter={e => e.target.style.backgroundColor = '#d97706'} onMouseLeave={e => e.target.style.backgroundColor = '#f59e0b'}
            >
              Get Started
            </Link>
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
          {/* Left Column - Main Explanation */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl leading-relaxed font-light" style={{color: '#e4e4e7'}}>
              Transform your n8n automation workflows into interactive chat experiences. 
              No complex setup, no learning curves—just connect your webhook and start chatting.
            </p>
            
            {/* CTA Button */}
            <div className="pt-8">
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-black hover:transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 tracking-wide rounded-lg shadow-sm hover:shadow-md"
                style={{backgroundColor: '#f59e0b', '--tw-ring-color': '#f59e0b'}}
                onMouseEnter={e => e.target.style.backgroundColor = '#d97706'}
                onMouseLeave={e => e.target.style.backgroundColor = '#f59e0b'}
              >
                Get Started
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Column - How it works */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold" style={{color: '#fafafa'}}>How it works</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#3f3f46'}}>
                  <span className="text-sm font-bold" style={{color: '#e4e4e7'}}>1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{color: '#fafafa'}}>Create your n8n workflow</h4>
                  <p className="text-sm" style={{color: '#a1a1aa'}}>Build any automation workflow in n8n with your preferred tools and services.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#3f3f46'}}>
                  <span className="text-sm font-bold" style={{color: '#e4e4e7'}}>2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{color: '#fafafa'}}>Add webhook endpoint</h4>
                  <p className="text-sm" style={{color: '#a1a1aa'}}>Configure a webhook trigger in your n8n workflow to receive chat messages.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#3f3f46'}}>
                  <span className="text-sm font-bold" style={{color: '#e4e4e7'}}>3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2" style={{color: '#fafafa'}}>Connect and chat</h4>
                  <p className="text-sm" style={{color: '#a1a1aa'}}>Paste your webhook URL into n8n Chat and start conversing with your workflows.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
