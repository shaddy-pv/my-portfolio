import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Globe, Smartphone, Zap, Cpu } from 'lucide-react';
import profileImage from '@/assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Globe, name: 'React', color: 'text-primary' },
  { icon: Code, name: 'TypeScript', color: 'text-secondary' },
  { icon: Database, name: 'Node.js', color: 'text-accent' },
  { icon: Smartphone, name: 'Mobile Dev', color: 'text-primary' },
  { icon: Zap, name: 'GSAP', color: 'text-secondary' },
  { icon: Cpu, name: 'Next.js', color: 'text-accent' },
  { icon: Globe, name: 'Tailwind CSS', color: 'text-primary' },
  { icon: Code, name: 'Java', color: 'text-secondary' },
  { icon: Database, name: 'C++', color: 'text-accent' },
  { icon: Smartphone, name: 'Python', color: 'text-primary' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section animation
      gsap.fromTo(sectionRef.current,
        { opacity: 0, filter: 'blur(10px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          }
        }
      );

      // Skills stagger animation
      gsap.fromTo('.skill-icon',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-primary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-glow-pulse"></div>
              <div className="relative glass rounded-full p-2">
                <img
                  src={profileImage}
                  alt="Shadan - Software Developer"
                  className="w-80 h-80 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                 I’m a results-driven B.Tech Computer Science student (3rd year) passionate
                 about designing innovative, scalable solutions that solve real-world problems.
                 My goal is to bridge the gap between software and hardware through impactful
                 projects that merge AI, IoT, and full-stack development.
                </p>
                <p>
                  I specialize in problem-solving, system architecture, and end-to-end product
                  development, delivering solutions from concept to deployment. I thrive on
                  challenges that require critical thinking, automation, and cutting-edge technology.
                </p>
                <p>
                 Beyond coding, I’m an avid explorer and cyclist, always curious about new 
                 perspectives and experiences that fuel creativity.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef}>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Skills & Technologies</h3>
              <div className="grid grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="skill-icon glass p-4 rounded-lg text-center group hover:shadow-glow transition-all duration-300 hover:scale-105"
                  >
                    <skill.icon className={`w-8 h-8 mx-auto mb-2 ${skill.color} group-hover:scale-110 transition-transform`} />
                    <p className="text-sm font-medium text-foreground">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;