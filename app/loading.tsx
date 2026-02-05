export default function Loading() {
  return (
    <main className="mx-auto max-w-[2560px] px-4 lg:px-16 min-h-screen flex flex-col items-center justify-center gap-8">
      {/* Logo Animation Container */}
      <div className="relative flex items-center justify-center logo-container">
        {/* Left Bracket < */}
        <div className="logo-bracket-left flex flex-col items-center mr-2">
          <div className="w-4 h-12 bg-gradient-to-b from-[#5b9be8] to-[#3b82f6] rounded-sm rotate-[35deg] translate-y-2" />
          <div className="w-4 h-12 bg-gradient-to-b from-[#3b82f6] to-[#5b9be8] rounded-sm -rotate-[35deg] -translate-y-2" />
        </div>

        {/* Center Letters SM -->*/}
        <div className="flex flex-col items-center mx-2">
          <span className="logo-letter-s text-5xl font-bold text-[#4a5568] leading-none">
            S
          </span>
          <span className="logo-letter-m text-5xl font-bold text-[#4a5568] leading-none">
            M
          </span>
        </div>

        {/* Right Bracket > */}
        <div className="logo-bracket-right flex flex-col items-center ml-2">
          <div className="w-4 h-12 bg-gradient-to-b from-[#5b9be8] to-[#3b82f6] rounded-sm -rotate-[35deg] translate-y-2" />
          <div className="w-4 h-12 bg-gradient-to-b from-[#3b82f6] to-[#5b9be8] rounded-sm rotate-[35deg] -translate-y-2" />
        </div>

        {/* Glow ring */}
        <div className="absolute inset-0 logo-glow-ring rounded-full" />
      </div>

      {/* Loading text with dots */}
      <div className="loading-text text-light-secondary dot dot-1">
        LOADING<span className="dot dot-1">.</span>
        <span className="dot dot-2">.</span>
        <span className="dot dot-3">.</span>
      </div>
    </main>
  );
}
