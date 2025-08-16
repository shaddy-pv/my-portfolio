import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form inputs animation
      gsap.fromTo('.form-input',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          }
        }
      );

      // Submit button animation
      gsap.fromTo('.submit-btn',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
          }
        }
      );

      // Social icons animation
      gsap.fromTo('.social-icon',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.social-icons',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit button animation
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to collaborate? Let's discuss your next project and bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-input">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="glass border-primary/30 focus:border-primary focus:shadow-glow bg-transparent text-foreground placeholder:text-muted-foreground h-12"
                  required
                />
              </div>
              
              <div className="form-input">
                <Input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="glass border-primary/30 focus:border-primary focus:shadow-glow bg-transparent text-foreground placeholder:text-muted-foreground h-12"
                  required
                />
              </div>
              
              <div className="form-input">
                <Textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="glass border-primary/30 focus:border-primary focus:shadow-glow bg-transparent text-foreground placeholder:text-muted-foreground resize-none"
                  required
                />
              </div>
              
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="submit-btn w-full group"
              >
                <Send className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="glass p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Let's Connect</h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  shadanmd566@gmail.com
                </p>
                <p>
                  Available for freelance projects and full-time opportunities. 
                  Always excited to work on innovative and challenging projects.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-icons flex justify-center space-x-6">
              <a
                href="https://github.com/shaddy-pv"
                className="social-icon glass p-4 rounded-lg text-primary hover:shadow-glow hover:scale-110 transition-all duration-300 group"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/md-shadan-1901592b4/"
                className="social-icon glass p-4 rounded-lg text-primary hover:shadow-glow hover:scale-110 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:shadanmd566@gmail.com"
                className="social-icon glass p-4 rounded-lg text-primary hover:shadow-glow hover:scale-110 transition-all duration-300 group"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;