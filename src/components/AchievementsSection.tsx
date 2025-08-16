import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import completionImage1 from '@/assets/completion_1.jpg';
import completionImage2 from '@/assets/completion_2.jpg';
import completionImage3 from '@/assets/completion_3.jpg';
import completionImage4 from '@/assets/completion_4.jpg';
import completionImage5 from '@/assets/completion_5.png';
import winningImage1 from '@/assets/winning_01.png';
import winningImage2 from '@/assets/winning-01.jpg';
import winningImage3 from '@/assets/winning-01.jpg';

gsap.registerPlugin(ScrollTrigger);

const completions = [
  { id: 1, image: completionImage1, title: 'Certificate of Industrial training' },
  { id: 2, image: completionImage2, title: 'Network management and web dev' },
  { id: 3, image: completionImage3, title: 'NetCamp summer internship' },
  { id: 4, image: completionImage4, title: 'Android with core java' },
  { id: 5, image: completionImage5, title: 'Deloitte Technology job simulation' },
];

const winnings = [
  { id: 1, image: winningImage1, title: 'IIt Bombay Hackathon securing rank under top 10' },
  { id: 2, image: winningImage2, title: 'Updated soon' },
  { id: 3, image: winningImage3, title: 'Updated soon' },
  { id: 4, image: winningImage2, title: 'Updated soon' },
];

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const completionScrollRef = useRef<HTMLDivElement>(null);
  const winningScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite horizontal scroll for completions (right to left)
      gsap.to('.completion-track', {
        x: '-100%',
        duration: 20,
        ease: 'none',
        repeat: -1,
      });

      // Infinite horizontal scroll for winnings (right to left)
      gsap.to('.winning-track', {
        x: '-100%',
        duration: 25,
        ease: 'none',
        repeat: -1,
      });

      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderAchievementItems = (items: typeof completions, className: string) => {
    // Duplicate items for seamless loop
    const duplicatedItems = [...items, ...items, ...items];

    return duplicatedItems.map((item, index) => (
      <div
        key={`${item.id}-${index}`}
        className="flex-shrink-0 w-80 mx-4 glass rounded-xl overflow-hidden group hover:shadow-glow transition-all duration-300"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold text-foreground text-center">
            {item.title}
          </h4>
        </div>
      </div>
    ));
  };

  return (
    <section id="achievements" ref={sectionRef} className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Achievements</span> & Recognition
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of certifications, awards, and recognition earned throughout my career.
          </p>
        </div>

        {/* Completions Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary">Completions & Certifications</h3>
          </div>
          <div ref={completionScrollRef} className="relative overflow-hidden">
            <div className="completion-track flex">
              {renderAchievementItems(completions, 'completion')}
            </div>
          </div>
        </div>

        {/* Winnings Section */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary">Awards & Winnings</h3>
          </div>
          <div ref={winningScrollRef} className="relative overflow-hidden">
            <div className="winning-track flex">
              {renderAchievementItems(winnings, 'winning')}
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-32 h-32 bg-gradient-primary rounded-full opacity-10 animate-float" />
          <div className="absolute bottom-1/4 right-0 w-24 h-24 bg-gradient-secondary rounded-full opacity-15 animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;