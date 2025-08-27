import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(headlineRef.current, 
      { 
        opacity: 0, 
        y: 50, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        duration: 1.2,
        ease: "power3.out"
      }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Floating background elements
    gsap.to(".glow-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleDownloadResume = () => {
    const resumeUrl = '/Shadan-Resume.pdf'; // resume file name 
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.setAttribute('download', 'Shadan-Resume.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="glow-orb absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-glow rounded-full opacity-30" />
        <div className="glow-orb absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-secondary rounded-full opacity-40" />
        <div className="glow-orb absolute bottom-1/3 left-1/2 w-40 h-40 bg-gradient-primary rounded-full opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Hi, I'm{' '}
          <span className="gradient-text glow-text">Shadan</span>
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground font-light">
            Software Developer
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting digital experiences with cutting-edge technologies. 
          Specializing in React, Node.js, and modern web development.
        </p>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Hire Me button ko contact section par scroll karne ke liye */}
          <Button variant="hero" size="xl" className="group" onClick={scrollToContact}>
            Hire Me
            <div className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </div>
          </Button>
          {/* Download Resume button */}
          <Button variant="glass" size="xl" onClick={handleDownloadResume}>
            Download Resume
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        onClick={scrollToNext}
      >
        <ChevronDown className="w-8 h-8 text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;