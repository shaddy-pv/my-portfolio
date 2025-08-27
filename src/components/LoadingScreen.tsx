import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate progress bar
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
      }
    })
    .to(".preloader", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 bg-background">
      {/* Main Content - Perfectly Centered */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 max-w-md w-full">
        {/* Animated Logo/Name */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold gradient-text glow-text animate-pulse">
            SHADAN
          </h1>
          <p className="text-muted-foreground mt-4 text-base sm:text-lg">Software Developer</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full max-w-xs mx-auto">
          <div className="glass rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-300 ease-out glow-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-primary font-mono text-sm">{progress}%</p>
        </div>
      </div>
      
      {/* Floating Orbs - Positioned relative to viewport, not content */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute top-32 right-20 w-1 h-1 bg-secondary rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-32 w-3 h-3 bg-accent rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default LoadingScreen;