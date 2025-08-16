import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Pencil, Box, Zap } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    title: 'Frontend Development',
    icon: Code,
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS']
  },
  {
    title: 'Backend Development',
    icon: Database,
    skills: ['Python', 'Supabase', 'Firebase', 'SQL', 'Node.js']
  },
  {
    title: 'AI & IoT',
    icon: Pencil,
    skills: ['Gemini API', 'IoT', 'Sensor Integration', 'Automation']
  },
  {
    title: 'Platforms & Tools',
    icon: Box,
    skills: ['GitHub', 'Render', 'Android Studio']
  }
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.fromTo('.skill-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A diverse skill set covering various technologies and development domains.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <Card key={index} className="skill-card glass border-primary/20 hover:border-primary transition-colors duration-300">
              <CardHeader className="flex flex-row items-center space-x-4 p-4 pb-2">
                <skill.icon className="w-8 h-8 text-primary" />
                <CardTitle className="text-lg font-semibold tracking-tight">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {skill.skills.join(', ')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;