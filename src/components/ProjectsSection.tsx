import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

import projectImage1 from '@/assets/project_1_a.jpg';
import projectImage2 from '@/assets/project_1_b.jpg';
import projectImage3 from '@/assets/project_1_c.jpg';
import projectImage4 from '@/assets/project_1_d.jpg';
import projectImage5 from '@/assets/project_1_e.jpg';
import projectImage6 from '@/assets/Project_2_a.png';
import projectImage7 from '@/assets/Project_2_b.png';
import projectImage8 from '@/assets/Project_2_c.png';
import projectImage9 from '@/assets/Project_2_d.png';
import projectImage10 from '@/assets/Project_3_a.png';
import projectImage11 from '@/assets/Project_3_b.png';
import projectImage12 from '@/assets/Project_3_c.png';
import projectImage13 from '@/assets/Project_3_d.png';
import projectImage14 from '@/assets/Project_4_a.png';
import projectImage15 from '@/assets/Project_4_b.png';
import projectImage16 from '@/assets/Project_4_c.png';
import projectImage17 from '@/assets/Project_4_d.png';
import projectImage18 from '@/assets/Project_4_e.png';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[] | null;
  tech: string[];
  featured: boolean;
  liveDemoUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'EcoBin Application',
    description: 'EcoBin is a Real-time smart bin tracking for efficient waste management.',
    images: [projectImage1, projectImage2, projectImage3, projectImage4, projectImage5],
    tech: ['Java', 'Firebase', 'Android Studio', 'Map API'],
    featured: true,
    liveDemoUrl: 'https://i.diawi.com/jkdJ39',
  },
  {
    id: 2,
    title: 'E-commerce website',
    description: 'A fully fledged e-commerce website and it is used by most of the sellers.',
    images: [projectImage6, projectImage7, projectImage8, projectImage9],
    tech: ['Next.js', 'React.js', 'WebSocket', 'Redux'],
    featured: true,
    // No liveDemoUrl or githubUrl → Buttons disabled
  },
  {
    id: 3,
    title: 'Legal-Ease-India',
    description: 'A comprehensive legal assistance platform designed to help users understand laws easily.',
    images: [projectImage14, projectImage15, projectImage16, projectImage17, projectImage18],
    tech: ['Next.js', 'React.js', 'WebSocket', 'Redux'],
    featured: true,
    liveDemoUrl: 'https://legal-ease-india.vercel.app/',
    githubUrl: 'https://github.com/shaddy-pv/Legal-ease-India',
  },
  {
    id: 4,
    title: 'AquaPure',
    description: 'It is a freelance website which was made by me and my team.',
    images: [projectImage10, projectImage11, projectImage12, projectImage13],
    tech: ['Next.js', 'React.js', 'WebSocket', 'Redux'],
    featured: true,
    liveDemoUrl: 'https://aqua-pure-nu.vercel.app/',
    githubUrl: 'https://github.com/shaddy-pv/AquaPure',
  },
  {
    id: 5,
    title: 'Coming Soon',
    description: 'Another innovative project coming your way. More details soon!',
    images: null,
    tech: ['TBA'],
    featured: false,
  },
  {
    id: 6,
    title: 'Coming Soon',
    description: "Revolutionary new application in the works. Can't wait to share!",
    images: null,
    tech: ['TBA'],
    featured: false,
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (hoveredCardId !== null) {
      const tl = gsap.timeline({ repeat: -1 });
      const card = document.querySelector(`.project-card[data-id="${hoveredCardId}"] .image-track`);

      const project = projects.find((p) => p.id === hoveredCardId);
      const imageCount = project?.images?.length || 1;
      const xOffset = `-${(100 / imageCount) * (imageCount - 1)}%`;

      if (card) {
         gsap.set(card, { x: 0 });
        tl.to(card, {
          x: xOffset,
          duration: 2.5,
          ease: 'none',
        });
      }

      return () => {
        tl.kill();
        if (card) gsap.set(card, { x: 0 });
      };
    }
  }, [hoveredCardId]);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my latest work, featuring innovative solutions and cutting-edge technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              data-id={project.id}
              onMouseEnter={() => setHoveredCardId(project.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="project-card glass rounded-xl overflow-hidden group hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                {project.images && project.images.length > 0 ? (
                  <div className="image-track w-[200%] h-full flex">
                    {project.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${project.title} - ${index}`}
                        className="w-${100 / project.images.length}/full h-full object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-secondary flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl">🚀</span>
                      </div>
                      <p className="text-foreground font-semibold">Coming Soon</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="neon"
                    size="sm"
                    className="flex-1"
                    disabled={!project.liveDemoUrl}
                    asChild
                  >
                    <a
                      href={project.liveDemoUrl || '#'}
                      target={project.liveDemoUrl ? '_blank' : undefined}
                      rel={project.liveDemoUrl ? 'noopener noreferrer' : undefined}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>

                  <Button
                    variant="glass"
                    size="sm"
                    disabled={!project.githubUrl}
                    asChild
                  >
                    <a
                      href={project.githubUrl || '#'}
                      target={project.githubUrl ? '_blank' : undefined}
                      rel={project.githubUrl ? 'noopener noreferrer' : undefined}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
