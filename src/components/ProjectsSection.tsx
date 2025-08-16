import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import projectImage1 from '@/assets/project_1_a.jpg'; // Assuming a placeholder image exists
import projectImage2 from '@/assets/project_1_b.jpg'; // Correcting to an existing file
import projectImage3 from '@/assets/project_1_c.jpg'; // Correcting to an existing file
import projectImage4 from '@/assets/project_1_d.jpg'; // Correcting to an existing file
import projectImage5 from '@/assets/project_1_e.jpg'; // Assuming this file exists
import projectImage6 from '@/assets/Project_2_a.png'; // Assuming this file exists
import projectImage7 from '@/assets/Project_2_b.png'; // Assuming this file exists
import projectImage8 from '@/assets/Project_2_c.png'; // Correcting extension to .png
import projectImage9 from '@/assets/Project_2_d.png'; // Assuming this file exists
import comingSoonImage from '@/assets/placeholder.svg'; // Using a correct placeholder image

gsap.registerPlugin(ScrollTrigger);

// Define a type for the project data to resolve the red line error
interface Project {
  id: number;
  title: string;
  description: string;
  images: string[] | null;
  tech: string[];
  featured: boolean;
  liveDemoUrl?: string;
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
  },
  {
    id: 3,
    title: 'Coming Soon',
    description: 'Exciting new project in development. Stay tuned for updates!',
    images: null,
    tech: ['TBA'],
    featured: false,
  },
  {
    id: 4,
    title: 'Coming Soon',
    description: 'Exciting new project in development. Stay tuned for updates!',
    images: null,
    tech: ['TBA'],
    featured: false,
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
    description: 'Revolutionary new application in the works. Can\'t wait to share!',
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
      // Cards animation
      gsap.fromTo('.project-card',
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        },
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
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (hoveredCardId !== null) {
      const tl = gsap.timeline({ repeat: -1 });
      const card = document.querySelector(`.project-card[data-id="${hoveredCardId}"] .image-track`);
      
      const project = projects.find(p => p.id === hoveredCardId);
      const imageCount = project?.images?.length || 1;
      // The offset is based on the number of images to ensure a perfect loop
      const xOffset = `-${(100 / imageCount) * (imageCount - 1)}%`; 

      if (card) {
        tl.to(card, {
          x: xOffset,
          duration: 2.5, 
          ease: "none",
        });
      }

      return () => {
        tl.kill();
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
                        className={`w-${100 / project.images.length}/full h-full object-cover flex-shrink-0`}
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
                  <Button variant="neon" size="sm" className="flex-1">
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer"></a>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button variant="glass" size="sm">
                    <Github className="w-4 h-4" />
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