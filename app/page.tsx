'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  Zap, 
  Shield, 
  Star, 
  ArrowRight, 
  Menu, 
  X, 
  TrendingUp, 
  Sparkles,
  Play,
  Pause
} from "lucide-react";

// WhatsApp contact function
const handleWhatsAppContact = (message: string) => {
  const whatsappNumber = "+573001234567"; // Replace with your actual WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
};

const SolversAIPadelLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);


  const Magnetic = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current!.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
      <motion.div
        ref={ref}
        className={`magnetic ${className}`}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    );
  };

  const TiltCard = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 8;
      const rotateY = (centerX - x) / 8;

      setRotateX(rotateX);
      setRotateY(rotateY);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    return (
      <motion.div
        className={`interactive-hover cursor-pointer ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    );
  };

  const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
      if (!hasStarted) return;
      
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [hasStarted, end, duration]);

    return { count, start: () => setHasStarted(true) };
  };

  const KPICounter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const { count, start } = useCountUp(end);

    useEffect(() => {
      if (isInView) start();
    }, [isInView, start]);

    return (
      <motion.div
        ref={ref}
        className="card text-center group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-4xl font-title mb-2">
          {count}{suffix}
        </div>
        <div className="text-sm font-body opacity-80">{label}</div>
      </motion.div>
    );
  };

  const VideoBackground = ({ src, poster, className = "" }: { src: string; poster: string; className?: string }) => {
    const [hasError, setHasError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {!hasError ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover animate-court-glow"
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              onError={() => setHasError(true)}
              preload="metadata"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
            <button 
              onClick={togglePlay}
              className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-all"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </>
        ) : (
          <img src={poster} alt="Background" className="w-full h-full object-cover animate-court-glow" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>
    );
  };

  const MarqueeBanner = ({ text }: { text: string }) => {
    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-[var(--c-deep)] to-[var(--c-cyan)] py-4">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="font-title text-2xl text-[var(--c-lime)] mx-8 tracking-wider">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    );
  };

  const LightingEffect = ({ children, mousePosition }: { children: React.ReactNode; mousePosition: { x: number; y: number } }) => {
    return (
      <div 
        className="relative"
        style={{
          '--mouse-x': `${(mousePosition.x / window.innerWidth) * 100}%`,
          '--mouse-y': `${(mousePosition.y / window.innerHeight) * 100}%`,
        } as React.CSSProperties}
      >
        <div className="absolute inset-0 court-lighting opacity-60" />
        {children}
      </div>
    );
  };

  const ProcessCard = ({ step, title, description, index }: { step: string; title: string; description: string; index: number }) => {
    return (
      <motion.div
        className="card group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        onClick={() => handleWhatsAppContact(`¡Hola! Me interesa conocer más sobre el paso de ${title} en el proceso de Solvers AI. ¿Podríamos hablar al respecto?`)}
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[var(--c-lime)] to-[var(--c-blue)] text-[var(--c-ink)] font-title text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
          {step}
        </div>
        <h3 className="font-title text-xl mb-3 text-center">{title}</h3>
        <p className="font-body text-sm opacity-80 text-center mb-4">{description}</p>
        <div className="text-center">
          <button className="font-title text-[var(--c-lime)] hover:text-[var(--c-blue)] transition-colors text-sm tracking-wide">
            HABLEMOS →
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--c-ink)] font-body overflow-x-hidden" style={{ backgroundColor: 'var(--c-ink)' }}>

      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <motion.button
          className="bg-green-600 text-white hover:bg-green-700 shadow-2xl font-semibold border-2 border-green-500 rounded-full w-16 h-16 p-0 flex items-center justify-center group"
          onClick={() => handleWhatsAppContact("¡Hola! Me interesa conocer más sobre Solvers AI para mi club de pádel. ¿Podrían proporcionarme información detallada y asistencia inmediata?")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(34, 197, 94, 0.3)",
              "0 0 40px rgba(34, 197, 94, 0.6)",
              "0 0 20px rgba(34, 197, 94, 0.3)"
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </motion.button>
      </div>

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 w-full bg-[var(--c-deep)]/90 backdrop-blur-md border-b border-white/10 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="font-title text-2xl tracking-wider"
              whileHover={{ scale: 1.05 }}
            >
              SOLVERS AI
            </motion.div>
            
            <div className="hidden md:flex space-x-8 text-sm font-body">
              {["Valor", "Soluciones", "Showreel", "Casos", "Proceso", "Contacto"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-[var(--c-lime)] transition-colors opacity-80 hover:opacity-100"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <Magnetic>
              <button 
                className="btn btn-primary"
                onClick={() => handleWhatsAppContact("¡Hola! Me interesa agendar una demo de Solvers AI para mi club de pádel. ¿Podríamos coordinar una reunión?")}
              >
                Agendar demo
              </button>
            </Magnetic>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 border-t border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col space-y-4 pt-4">
                {["Valor", "Soluciones", "Sistema de Dos Manos", "Casos", "Proceso", "Contacto"].map((item) => (
                  <a
                    key={item}
                    href={`#${item === "Sistema de Dos Manos" ? "sistema-dos-manos" : item.toLowerCase()}`}
                    className="font-body text-white/80 hover:text-[var(--c-lime)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section with Lighting Effect */}
      <LightingEffect mousePosition={mousePosition}>
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0">
            <img 
              src="/assets/PADEL IMAGE1 copy.jpg" 
              alt="Padel Court" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-deep)]/60 via-[var(--c-ink)]/40 to-[var(--c-ink)]/80" />
          </div>

          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(183,255,92,0.15), transparent 40%)`
            }}
          />

          <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
            <motion.h1
              className="font-title text-5xl md:text-8xl mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              HIGH-TICKET SYSTEMS
              <br />
              <span className="text-[var(--c-blue)]">FOR PADEL GROWTH</span>
            </motion.h1>
            
            <motion.p
              className="font-body text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              ERP, CRM, Agentic Automation y Web Design — diseñados para clubes, marcas y academias de pádel que quieren escalar con precisión.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Magnetic>
                <button 
                  className="btn btn-primary text-lg px-10 py-4"
                  onClick={() => handleWhatsAppContact("¡Hola! Quiero solicitar una demo personalizada de Solvers AI para entender cómo puede transformar mi negocio de pádel.")}
                >
                  <Sparkles className="mr-2" />
                  QUIERO UNA DEMO
                </button>
              </Magnetic>
              <button 
                className="btn btn-outline text-lg px-10 py-4"
                onClick={() => document.getElementById('sistema-dos-manos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2" />
                VER SISTEMA
              </button>
            </motion.div>

            <motion.div
              className="mt-12 font-body text-sm opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              Tiempo de carga optimizado · Animaciones suaves · UX premium
            </motion.div>
          </div>
        </section>
      </LightingEffect>

      {/* Moving Banner */}
      <MarqueeBanner text="SOLVERS AI • ORDER NOW • TRANSFORMA TU CLUB" />

      {/* Trust Bar */}
      <section className="py-16 bg-gradient-to-r from-[var(--c-deep)]/20 to-[var(--c-cyan)]/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {["Analítica en tiempo real", "Onboarding en 7 días", "Automatizaciones con IA", "ROI trazable"].map((badge, index) => (
              <motion.div
                key={index}
                className="text-center p-6 card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-[var(--c-lime)] text-3xl mb-3 group-hover:scale-110 transition-transform">✓</div>
                <div className="font-body text-sm font-medium">{badge}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            className="font-title text-5xl text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            RESULTADOS QUE HABLAN
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <KPICounter end={150} label="Implementaciones pádel" suffix="+" />
            <KPICounter end={8} label="Semanas a ROI mediano" />
            <KPICounter end={12} label="Países activos" />
          </div>
        </div>
      </section>

      <MarqueeBanner text="VALOR • ECOSISTEMA • PADEL • SOLVERS AI" />

      {/* Valor Ecosistema */}
      <section id="valor" className="py-20 relative">
        <div className="absolute inset-0">
          <img 
            src="/assets/PADEL IMAGE2.jpg" 
            alt="Padel Court" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-deep)]/80 to-[var(--c-ink)]/90" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.h2
            className="font-title text-5xl text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            VALOR PARA EL ECOSISTEMA
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: "Clubes", desc: "Gestión de socios, reservas, inventario y caja — todo integrado" },
              { title: "Marcas", desc: "B2B/B2C CRM con funnels, campañas y distribuidores" },
              { title: "Academias", desc: "Horarios, pagos, niveles, retención y NPS" },
              { title: "Torneos", desc: "Inscripciones, brackets, patrocinios y métricas en vivo" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="card group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
              >
                <h3 className="font-title text-2xl mb-4 group-hover:text-[var(--c-blue)] transition-colors">{item.title}</h3>
                <p className="font-body opacity-80 mb-8 text-lg leading-relaxed">{item.desc}</p>
                <div className="flex gap-4">
                  <Magnetic>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleWhatsAppContact(`¡Hola! Me interesa conocer más sobre las soluciones de Solvers AI para ${item.title}. ¿Podríamos agendar una consulta?`)}
                    >
                      AGENDAR
                    </button>
                  </Magnetic>
                  <button 
                    className="btn btn-outline"
                    onClick={() => document.getElementById('soluciones')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    VER SOLUCIONES
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeBanner text="SOLUCIONES • MODULARES • ALTA CALIDAD • SOLVERS AI" />

      {/* Soluciones Modulares */}
      <section id="soluciones" className="py-20 relative">
        <div className="absolute inset-0">
          <img 
            src="/assets/PADEL IMAGE1 copy.jpg" 
            alt="Padel Equipment" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-cyan)]/60 to-[var(--c-ink)]/90" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.h2
            className="font-title text-5xl text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            SOLUCIONES MODULARES
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: "ERP", desc: "Inventario, compras, ventas, cashflow y reportes a la medida.", cta: "EXPLORAR ERP" },
              { title: "CRM", desc: "Funnels, campañas omnicanal y fidelización con scoring.", cta: "EXPLORAR CRM" },
              { title: "AGENTIC AUTOMATION", desc: "Bots y agentes que reservan, cotizan y ejecutan tareas.", cta: "VER AGENTES" },
              { title: "WEB DESIGN", desc: "Sitios ultra-rápidos con SEO técnico y diseño de alto impacto.", cta: "VER DISEÑO" }
            ].map((solution, index) => (
              <motion.div
                key={index}
                className="card group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8, rotateY: 5 }}
              >
                <h3 className="font-title text-2xl mb-4 group-hover:text-[var(--c-blue)] transition-colors">{solution.title}</h3>
                <p className="font-body opacity-80 mb-8 text-lg leading-relaxed">{solution.desc}</p>
                <div className="flex gap-4">
                  <Magnetic>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleWhatsAppContact(`¡Hola! Me interesa conocer más sobre ${solution.title} de Solvers AI. ¿Podríamos agendar una consulta especializada?`)}
                    >
                      {solution.cta}
                    </button>
                  </Magnetic>
                  <button 
                    className="btn btn-outline"
                    onClick={() => document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    VER DEMO
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 relative">
        <VideoBackground src="/video/padel-demo.mp4" poster="/assets/PADEL IMAGE2.jpg" />
        <div className="relative z-10 text-center py-20">
          <motion.h3
            className="font-title text-4xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            EXPERIENCIA INMERSIVA
          </motion.h3>
          <motion.p
            className="font-body text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Tecnología de vanguardia aplicada al mundo del pádel
          </motion.p>
        </div>
      </section>

      <MarqueeBanner text="SHOWREEL • CANVA • INTEGRACIÓN • SOLVERS AI" />

      {/* Showreel */}
      <section id="showreel" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="font-title text-5xl text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            SHOWREEL
          </motion.h2>
          <motion.p
            className="font-body text-center mb-12 opacity-80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Integración directa desde Canva: alta calidad con mínimo esfuerzo.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              "https://www.canva.com/design/DAGzV0RUR-w/view?embed",
              "https://www.canva.com/design/DAGzVQt8X6Y/view?embed",
              "https://www.canva.com/design/DAGzVyd3K9A/view?embed"
            ].map((url, index) => (
              <motion.div
                key={index}
                className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <iframe
                  src={url}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title={`Showreel ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>
          
          <motion.h3
            className="font-title text-3xl text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            TEMPLATES DE SOPORTE
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "https://www.canva.com/design/DAGzV4d9jDg/view?embed",
              "https://www.canva.com/design/DAGzV9Rm5OM/view?embed",
              "https://www.canva.com/design/DAGzVJcsFrQ/view?embed"
            ].map((url, index) => (
              <motion.div
                key={index}
                className="aspect-video rounded-2xl overflow-hidden border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <iframe
                  src={url}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title={`Template ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeBanner text="CASOS • MOCKUPS • ALTA CALIDAD • SOLVERS AI" />

      {/* Gallery Section with Lighting Effect */}
      <LightingEffect mousePosition={mousePosition}>
        <section id="casos" className="py-20 relative">
          <div className="absolute inset-0">
            <img 
              src="/assets/PADEL IMAGE2.jpg" 
              alt="Padel Court Detail" 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-cyan)]/40 to-[var(--c-ink)]/80" />
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <motion.h2
              className="font-title text-5xl text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              CASOS & MOCKUPS
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                "/assets/PADEL IMAGE1 copy.jpg",
                "/assets/PADEL IMAGE2.jpg",
                "/assets/PADEL IMAGE1 copy.jpg"
              ].map((src, index) => (
                <TiltCard 
                  key={index} 
                  className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                  onClick={() => handleWhatsAppContact(`¡Hola! Me interesa conocer más detalles sobre el caso ${index + 1} de Solvers AI. ¿Podríamos discutir cómo aplicarlo a mi negocio?`)}
                >
                  <motion.img
                    src={src}
                    alt={`Caso ${index + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 font-title text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    CASO {index + 1}
                  </div>
                </TiltCard>
              ))}
            </div>
            
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Magnetic>
                  <button 
                    className="btn btn-primary text-lg px-10 py-4"
                    onClick={() => handleWhatsAppContact("¡Hola! Me interesa solicitar una propuesta personalizada de Solvers AI para mi negocio de pádel. ¿Podríamos discutir mis necesidades específicas?")}
                  >
                    <TrendingUp className="mr-2" />
                    SOLICITAR PROPUESTA
                  </button>
                </Magnetic>
                <button 
                  className="btn btn-outline text-lg px-10 py-4"
                  onClick={() => document.getElementById('proceso')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ArrowRight className="mr-2" />
                  VER PROCESO
                </button>
              </div>
            </div>
          </div>
        </section>
      </LightingEffect>

      <MarqueeBanner text="PROCESO • METODOLOGÍA • EXCELENCIA • SOLVERS AI" />

      {/* Process Section */}
      <section id="proceso" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="font-title text-5xl text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            PROCESO
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessCard 
              step="01" 
              title="Diagnóstico" 
              description="Auditoría de datos, procesos y objetivos de negocio." 
              index={0} 
            />
            <ProcessCard 
              step="02" 
              title="Diseño" 
              description="Arquitectura ERP/CRM, UX y flujos de agentes." 
              index={1} 
            />
            <ProcessCard 
              step="03" 
              title="Implementación" 
              description="Integraciones, automatizaciones y dashboards." 
              index={2} 
            />
            <ProcessCard 
              step="04" 
              title="Escala" 
              description="A/B testing, growth loops y optimización continua." 
              index={3} 
            />
          </div>
        </div>
      </section>

      <MarqueeBanner text="CONTACTO • DEMO • TRANSFORMACIÓN • SOLVERS AI" />

      {/* CTA Final */}
      <section id="contacto" className="py-20 relative">
        <div className="absolute inset-0">
          <img 
            src="/assets/PADEL IMAGE1 copy.jpg" 
            alt="Success" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-deep)]/70 to-[var(--c-ink)]/90" />
        </div>
        
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(183,255,92,0.1), transparent 50%)`
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="font-title text-5xl md:text-6xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            LISTO PARA JUGAR EN
            <br />
            <span className="text-[var(--c-blue)]">PRIMERA DIVISIÓN</span>
          </motion.h2>
          
          <motion.p
            className="font-body text-xl mb-12 opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Agenda una demo y recibe un plan de implementación con tiempos y ROI estimado.
          </motion.p>
          
          <motion.form
            className="max-w-2xl mx-auto space-y-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--c-lime)] focus:bg-white/15 transition-all font-body backdrop-blur-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--c-lime)] focus:bg-white/15 transition-all font-body backdrop-blur-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Club/Marca"
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--c-lime)] focus:bg-white/15 transition-all font-body backdrop-blur-sm"
            />
            <textarea
              placeholder="Objetivo principal"
              rows={4}
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--c-lime)] focus:bg-white/15 transition-all font-body backdrop-blur-sm resize-none"
            />
          </motion.form>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Magnetic>
              <button 
                className="btn btn-primary text-lg px-12 py-4"
                onClick={() => handleWhatsAppContact("¡Hola! Estoy listo para transformar mi club con Solvers AI. Completé el formulario y me gustaría agendar una demo personalizada.")}
              >
                <Calendar className="mr-2" />
                AGENDAR DEMO
              </button>
            </Magnetic>
            <button 
              className="btn btn-outline text-lg px-12 py-4"
              onClick={() => document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2" />
              VER SHOWREEL
            </button>
          </motion.div>

          <motion.p
            className="font-body text-sm opacity-70 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Garantía del servicio • Sin riesgo • Cancelación en 1 clic
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[var(--c-ink)]/90 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.div 
              className="font-title text-3xl mb-6 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              SOLVERS AI
            </motion.div>
            
            <div className="flex space-x-8 text-sm font-body">
              {["Valor", "Soluciones", "Showreel", "Casos", "Proceso", "Contacto"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-[var(--c-lime)] transition-colors opacity-80 hover:opacity-100"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="text-center font-body text-sm opacity-70 mb-8">
            © {new Date().getFullYear()} Solvers AI · Padel Growth Systems
          </div>
          
          {/* Social Footer */}
          <div className="flex justify-center space-x-8">
            {[
              { name: "WhatsApp", color: "#25D366" },
              { name: "Instagram", color: "#E4405F" },
              { name: "LinkedIn", color: "#0077B5" }
            ].map((social) => (
              <motion.button
                key={social.name}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-[var(--c-lime)] transition-colors"
                whileHover={{ scale: 1.2, backgroundColor: social.color }}
                onClick={() => handleWhatsAppContact(`¡Hola! Me interesa seguir a Solvers AI en ${social.name} para estar al día con las últimas novedades.`)}
              >
                <span className="text-lg">📱</span>
              </motion.button>
            ))}
          </div>
        </div>
      </footer>

      {/* Sticky Progress CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <motion.div
          className="h-2 bg-[var(--c-lime)] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <div className="bg-[var(--c-deep)]/95 backdrop-blur-md border-t border-white/10 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="font-body text-sm opacity-90">¿Listo para optimizar tu club o marca de pádel?</span>
            <Magnetic>
              <button 
                className="btn btn-primary"
                onClick={() => handleWhatsAppContact("¡Hola! Estoy listo para optimizar mi club de pádel con Solvers AI. ¿Podríamos agendar una consulta inmediata?")}
              >
                AGENDAR AHORA
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolversAIPadelLanding;