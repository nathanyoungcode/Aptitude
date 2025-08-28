import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-blue-600">
      {/* Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
          <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-black tracking-wide">n8n Chat</h1>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-black/80 hover:text-black transition-colors text-sm font-medium">About</a>
              <a href="#" className="text-black/80 hover:text-black transition-colors text-sm font-medium">Features</a>
              <a href="#" className="text-black/80 hover:text-black transition-colors text-sm font-medium">Docs</a>
              <a href="#" className="text-black/80 hover:text-black transition-colors text-sm font-medium">Contact</a>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-black font-medium text-sm rounded-full hover:bg-white/30 transition-all duration-300"
              >
                Get Started
              </Link>
              
              {/* Mobile Menu Button */}
              <button className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1">
                <span className="w-5 h-0.5 bg-black/70"></span>
                <span className="w-5 h-0.5 bg-black/70"></span>
                <span className="w-5 h-0.5 bg-black/70"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 pt-24 pb-32">
        <div className="text-center mb-32">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black leading-none mb-8 tracking-tight">
            Simple webhooks,
            <br />
            <span className="italic font-light">Extraordinary chats</span>
          </h1>
          
          {/* Divider Line */}
          <div className="w-24 h-px bg-black mx-auto my-16"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-black leading-relaxed font-light">
              We specialize in connecting your n8n workflows to conversational interfaces that create memorable user experiences.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-lg text-black leading-relaxed">
                n8n Chat was built for developers who want to transform their automation workflows into interactive chat experiences. 
                No complex setup, no learning curves—just connect your webhook and start chatting.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-black bg-black/10 backdrop-blur-sm border border-black/20 hover:bg-black/20 transition-all duration-300 tracking-wide"
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
              <h3 className="text-2xl font-bold text-black">Simple Setup</h3>
              <p className="text-lg text-black/80 leading-relaxed">
                Connect your n8n webhook in seconds. No complex configuration or lengthy onboarding process required.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black">Powerful Workflows</h3>
              <p className="text-lg text-black/80 leading-relaxed">
                Transform any automation into an interactive conversation. Your workflows become accessible to everyone.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black">Instant Results</h3>
              <p className="text-lg text-black/80 leading-relaxed">
                See your chat interface come alive immediately. Real-time responses from your n8n workflows.
              </p>
            </div>
          </div>

          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-black leading-tight">
              Ready to transform your workflows?
            </h2>
            <p className="text-xl text-black/80 max-w-3xl mx-auto">
              Join developers who are already building amazing conversational experiences with their n8n automations.
            </p>
            <div className="pt-8">
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-12 py-4 text-xl font-semibold text-black bg-black/10 backdrop-blur-sm border border-black/20 hover:bg-black/20 transition-all duration-300 tracking-wide"
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
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-12">How it works</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-black">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-black mb-2">Create your n8n workflow</h4>
                    <p className="text-black/70">Build any automation workflow in n8n with your preferred tools and services.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-black">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-black mb-2">Add webhook endpoint</h4>
                    <p className="text-black/70">Configure a webhook trigger in your n8n workflow to receive chat messages.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-black">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-black mb-2">Connect and chat</h4>
                    <p className="text-black/70">Paste your webhook URL into n8n Chat and start conversing with your workflows.</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/5 backdrop-blur-sm rounded-2xl p-8 border border-black/10">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="bg-black/10 rounded-lg p-4 font-mono text-sm">
                    <div className="text-black/60">POST webhook-url</div>
                    <div className="text-black mt-2">{"{ \"message\": \"Hello workflow!\" }"}</div>
                    <div className="text-black/60 mt-4">Response:</div>
                    <div className="text-black">{"{ \"reply\": \"Workflow executed!\" }"}</div>
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
