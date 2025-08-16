import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating particles
      gsap.to('.particle', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.5
      });

      // Footer fade in
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative py-12 px-4 border-t border-primary/20">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60" />
        <div className="particle absolute top-1/2 right-1/3 w-1 h-1 bg-secondary rounded-full opacity-40" />
        <div className="particle absolute bottom-1/3 left-1/2 w-3 h-3 bg-accent rounded-full opacity-30" />
        <div className="particle absolute top-3/4 right-1/4 w-2 h-2 bg-primary rounded-full opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text mb-2">Shadan</h3>
            <p className="text-muted-foreground">
              Software Developer crafting digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block mx-auto text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="block mx-auto text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' })}
                className="block mx-auto text-muted-foreground hover:text-primary transition-colors"
              >
                Achievements
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block mx-auto text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-foreground">Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a
                href="https://github.com/shaddy-pv"
                className="glass p-3 rounded-lg text-primary hover:shadow-glow hover:scale-110 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/md-shadan-1901592b4/"
                className="glass p-3 rounded-lg text-primary hover:shadow-glow hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:shadanmd566@gmail.com"
                className="glass p-3 rounded-lg text-primary hover:shadow-glow hover:scale-110 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              shadanmd566@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm flex items-center">
            Made by me using React, GSAP & Tailwind
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="glass px-4 py-2 rounded-lg text-primary hover:shadow-glow transition-all duration-300 text-sm"
            >
              Back to Top ↑
            </button>
            <p className="text-muted-foreground text-sm">
              © 2024 Shadan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;