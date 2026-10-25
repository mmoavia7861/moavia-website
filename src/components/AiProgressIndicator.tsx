import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, Brain, Cpu } from 'lucide-react';

interface AiProgressIndicatorProps {
  isLoading: boolean;
  steps?: string[];
  defaultMessage?: string;
  accentColor?: string; // e.g. '#5265D8', '#8B63D8', '#17A99A', '#F17F72'
}

export const AiProgressIndicator: React.FC<AiProgressIndicatorProps> = ({
  isLoading,
  steps = ['Initializing AI Model...', 'Analyzing Context & Parameters...', 'Generating Strategic Output...', 'Finalizing Results...'],
  defaultMessage = 'Processing with Gemini Intelligence...',
  accentColor = '#5265D8',
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(15);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStepIndex(0);
      setProgressPercent(15);
      return;
    }

    // Progress percentage interval
    const progressTimer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 92) return 92;
        return prev + Math.floor(Math.random() * 8 + 4);
      });
    }, 450);

    // Step rotator interval
    const stepTimer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % steps.length);
    }, 1800);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [isLoading, steps.length]);

  if (!isLoading) return null;

  return (
    <div className="w-full my-4 p-4 rounded-2xl bg-white border border-[#E7EAF2] shadow-md animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="p-2 rounded-xl text-white shadow-sm flex items-center justify-center animate-pulse"
            style={{ backgroundColor: accentColor }}
          >
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#18243A]">
                {steps[currentStepIndex] || defaultMessage}
              </span>
              <span className="inline-flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <p className="text-[10px] text-[#65738B]">
              Step {currentStepIndex + 1} of {steps.length} • Active inference streaming
            </p>
          </div>
        </div>

        <span
          className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-slate-50 border border-[#E7EAF2] font-mono"
          style={{ color: accentColor }}
        >
          {progressPercent}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-[#5265D8] via-[#8B63D8] to-[#17A99A]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Micro Status Pills */}
      <div className="flex items-center justify-between text-[10px] text-[#65738B] mt-2 font-medium">
        <span>Model: Active</span>
        <span>Latency: Ultra-Low</span>
        <span>Tokens: Processing</span>
      </div>
    </div>
  );
};
