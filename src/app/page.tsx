import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      {/* Header */}
      <header className="relative z-10 p-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black tracking-wide">n8n Chat</h1>
          <button className="w-8 h-8 flex flex-col justify-center items-center space-y-1">
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
          </button>
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
      </main>
    </div>
  )
}
