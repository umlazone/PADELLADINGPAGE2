import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// WhatsApp contact function
const handleWhatsAppContact = (message) => {
  const whatsappNumber = "+573001234567"; // Replace with your actual WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
};

/**
 * ONE-FILE HIGH-TICKET LANDING FOR BOLT.NEW (React + Tailwind + Framer Motion)
 * - Colors & fonts from brief
 * - Smooth sections, CTA everywhere, interactive images
 * - Floating interactive padel ball present across the site
 * - Lightweight, data-driven to minimize tokens
 */

export default function SolversAIPadelLanding() {
  return (
    <div className="min-h-screen bg-neutral-900 text-[#F0E5E8] selection:bg-[#b7ff5c] selection:text-black">
      <RootStyles />
      <FloatingBall />
      <FixedWhatsAppButton />
      <Navbar />
      <Hero />
      <Trustbar />
      <ValueGrid />
      <Capabilities />
      <Showreel />
      <Gallery />
      <Process />
      <CTASection />
      <Footer />
      <StickyCTA />
    </div>
  );
}

/* ---------------------------- Theme & Typography --------------------------- */
function RootStyles() {
  return (
    <style>{`
      :root{
        --c-deep:#014086;--c-cyan:#099CE0;--c-ink:#303030;--c-ivory:#F0E5E8;--c-lime:#daf940;--c-blue:#1588cf;--c-title:#b7ff5c;
      }
      @import url('https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap');
      /* Klein is not a free web font; fallback to Inter for bolt.new */
      .font-title{font-family:'Allerta Stencil', system-ui, Arial, sans-serif}
      .font-body{font-family:Klein, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif}
      .btn{ @apply inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-semibold transition-all disabled:opacity-50; }
      .btn-primary{ background:linear-gradient(135deg,var(--c-title),#dfff88); color:#0a0a0a; box-shadow:0 8px 24px rgba(183,255,92,.3) }
      .btn-outline{ border:1px solid rgba(255,255,255,.2); color:var(--c-ivory) }
      .card{ @apply rounded-3xl p-6 bg-neutral-900/60 border border-white/10 backdrop-blur; }
      .xline{ background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent); height:1px }
    `}</style>
  );
}

/* --------------------------------- Navbar --------------------------------- */
function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 200], ["rgba(0,0,0,0)", "rgba(10,10,10,.7)"]);
  const bd = useTransform(scrollY, [0, 200], ["transparent", "rgba(255,255,255,.08)"]);
  return (
    <motion.header style={{ background: bg, borderBottom: `1px solid` }} className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30" >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a className="font-title text-2xl text-[var(--c-title)] tracking-wider" href="#top">SOLVERS AI</a>
          <nav className="hidden gap-6 md:flex text-sm">{["Valor", "Soluciones", "Showreel", "Casos", "Proceso", "Contacto"].map((t,i)=> (
            <a key={i} href={['#value','#capabilities','#showreel','#gallery','#process','#contact'][i]} className="opacity-80 hover:opacity-100">{t}</a>
          ))}</nav>
          <button 
            className="btn btn-primary"
            onClick={() => handleWhatsAppContact("¡Hola! Me interesa agendar una demo de Solvers AI para mi club de pádel. ¿Podríamos coordinar una reunión?")}
          >
            Agendar demo
          </button>
        </div>
      </div>
    </motion.header>
  );
}

/* ---------------------------------- Hero ---------------------------------- */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -80]);
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28">
      <BackgroundImage url="/assets/padel-bg-1.jpg" />
      <motion.div style={{ y }} className="relative mx-auto max-w-7xl px-4 py-28">
        <motion.h1 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="font-title text-[clamp(40px,7vw,84px)] leading-[1.05] text-[var(--c-title)]">
          High‑Ticket Systems for Padel Growth
        </motion.h1>
        <p className="font-body mt-6 max-w-2xl text-lg opacity-90">
          ERP, CRM, Agentic Automation y Web Design — diseñados para clubes, marcas y academias de pádel que quieren escalar con precisión.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button 
            className="btn btn-primary"
            onClick={() => handleWhatsAppContact("¡Hola! Quiero solicitar una demo personalizada de Solvers AI para entender cómo puede transformar mi negocio de pádel.")}
          >
            Quiero una demo
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver showreel
          </button>
        </div>
        <div className="mt-10 text-sm opacity-70">Tiempo de carga optimizado · Animaciones suaves · UX premium</div>
      </motion.div>
    </section>
  );
}

/* --------------------------- Subtle BG Image layer -------------------------- */
function BackgroundImage({ url }: { url: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.08),transparent_55%)]" />
      <div className="absolute inset-0" style={{
        backgroundImage:`url(${url})`, backgroundSize:'cover', backgroundPosition:'center', filter:'contrast(105%) brightness(70%) saturate(110%)'
      }}/>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
    </div>
  );
}

/* -------------------------------- Trustbar -------------------------------- */
function Trustbar(){
  const items = [
    "Analítica en tiempo real","Onboarding en 7 días","Automatizaciones con IA","ROI trazable"
  ];
  return (
    <div className="xline"/>
    && (
      <section className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((t,i)=> (
          <div key={i} className="card text-center text-sm opacity-90">{t}</div>
        ))}
      </section>
    )
  );
}

/* --------------------------------- Value ---------------------------------- */
function ValueGrid(){
  const rows = [
    {k:"Clubes", v:"Gestión de socios, reservas, inventario y caja — todo integrado"},
    {k:"Marcas", v:"B2B/B2C CRM con funnels, campañas y distribuidores"},
    {k:"Academias", v:"Horarios, pagos, niveles, retención y NPS"},
    {k:"Torneos", v:"Inscripciones, brackets, patrocinios y métricas en vivo"},
  ];
  return (
    <section id="value" className="mx-auto max-w-7xl px-4 py-20">
      <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="font-title text-4xl md:text-5xl text-[var(--c-title)]">Valor para el ecosistema pádel</motion.h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {rows.map((r,i)=> (
          <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="card">
            <div className="text-xl font-semibold text-white/90">{r.k}</div>
            <div className="mt-2 text-white/70">{r.v}</div>
            <div className="mt-4 flex gap-3">
              <button 
                className="btn btn-primary"
                onClick={() => handleWhatsAppContact(`¡Hola! Me interesa conocer más sobre las soluciones de Solvers AI para ${r.k}. ¿Podríamos agendar una consulta?`)}
              >
                Agendar
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver soluciones
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Capabilities ------------------------------ */
function Capabilities(){
  const items = [
    {t:"ERP", d:"Inventario, compras, ventas, cashflow y reportes a la medida.", b:"Explorar ERP"},
    {t:"CRM", d:"Funnels, campañas omnicanal y fidelización con scoring.", b:"Explorar CRM"},
    {t:"Agentic Automation", d:"Bots y agentes que reservan, cotizan y ejecutan tareas.", b:"Ver agentes"},
    {t:"Web Design", d:"Sitios ultra‑rápidos con SEO técnico y diseño de alto impacto.", b:"Ver diseño"},
  ];
  return (
    <section id="capabilities" className="relative mx-auto max-w-7xl px-4 py-20">
      <BackgroundImage url="/assets/padel-bg-2.jpg" />
      <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="font-title text-4xl md:text-5xl text-[var(--c-title)]">Soluciones modulares</motion.h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((it,i)=> (
          <motion.div key={i} whileHover={{y:-4}} className="card">
            <div className="text-2xl font-semibold">{it.t}</div>
            <p className="mt-2 opacity-80">{it.d}</p>
            <div className="mt-4 flex gap-3">
              <button 
                className="btn btn-primary"
                onClick={() => handleWhatsAppContact(`¡Hola! Me interesa conocer más sobre ${it.t} de Solvers AI. ¿Podríamos agendar una consulta especializada?`)}
              >
                {it.b}
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver demo
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Showreel -------------------------------- */
function Showreel(){
  // Replace the src with Canva video share links (Embed > Website). Height auto-resizes.
  const videos = useMemo(()=>[
    "https://www.canva.com/design/DAGzV0RUR-w/view?embed", // 1
    "https://www.canva.com/design/DAGzVQt8X6Y/view?embed", // 2
    "https://www.canva.com/design/DAGzVyd3K9A/view?embed", // 3
  ],[]);
  return (
    <section id="showreel" className="mx-auto max-w-7xl px-4 py-20">
      <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="font-title text-4xl md:text-5xl text-[var(--c-title)]">Showreel (Canva)</motion.h2>
      <p className="mt-3 opacity-80">Integración directa desde Canva: alta calidad con mínimo esfuerzo.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {videos.map((src,i)=> (
          <div key={i} className="overflow-hidden rounded-3xl border border-white/10 shadow-lg">
            <iframe title={`canva-${i}`} src={src} loading="lazy" allowFullScreen className="h-[260px] w-full"></iframe>
          </div>
        ))}
      </div>
      {/* Extra Canva templates block */}
      <TemplatesStrip />
    </section>
  );
}

function TemplatesStrip(){
  const links = [
    "https://www.canva.com/design/DAGzV4d9jDg/view?embed",
    "https://www.canva.com/design/DAGzV9Rm5OM/view?embed",
    "https://www.canva.com/design/DAGzVJcsFrQ/view?embed",
  ];
  return (
    <div className="mt-14">
      <div className="text-sm opacity-70">Templates de soporte (editable en Canva):</div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {links.map((src,i)=> (
          <div key={i} className="rounded-2xl border border-white/10 overflow-hidden">
            <iframe title={`template-${i}`} src={src} loading="lazy" allowFullScreen className="h-[200px] w-full"></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Gallery --------------------------------- */
function Gallery(){
  const imgs = [
    "/assets/padel-1.jpg",
    "/assets/padel-2.jpg",
    "/assets/padel-3.jpg",
  ];
  return (
    <section id="gallery" className="relative mx-auto max-w-7xl px-4 py-20">
      <BackgroundImage url="/assets/padel-bg-3.jpg" />
      <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="font-title text-4xl md:text-5xl text-[var(--c-title)]">Casos & Mockups</motion.h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {imgs.map((src,i)=> (
          <TiltCard key={i} src={src} />
        ))}
      </div>
      <div className="mt-8 flex gap-4">
        <button 
          className="btn btn-primary"
          onClick={() => handleWhatsAppContact("¡Hola! Me interesa solicitar una propuesta personalizada de Solvers AI para mi negocio de pádel. ¿Podríamos discutir mis necesidades específicas?")}
        >
          Solicitar propuesta
        </button>
        <button 
          className="btn btn-outline"
          onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Ver proceso
        </button>
      </div>
    </section>
  );
}

function TiltCard({src}:{src:string}){
  const ref = useRef<HTMLDivElement>(null);
  const [r,setR]=useState({rx:0,ry:0});
  return (
    <div ref={ref} onMouseMove={(e)=>{
      const rect = ref.current!.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const rx = (y/rect.height - .5)*8; const ry = (x/rect.width - .5)*-8;
      setR({rx,ry});
    }} onMouseLeave={()=>setR({rx:0,ry:0})} className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
      <motion.img src={src} alt="padel" className="h-full w-full object-cover" style={{ rotateX:r.rx, rotateY:r.ry }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"/>
    </div>
  );
}

/* --------------------------------- Process -------------------------------- */
function Process(){
  const steps = [
    {t:"Diagnóstico", d:"Auditoría de datos, procesos y objetivos de negocio."},
    {t:"Diseño", d:"Arquitectura ERP/CRM, UX y flujos de agentes."},
    {t:"Implementación", d:"Integraciones, automatizaciones y dashboards."},
    {t:"Escala", d:"A/B testing, growth loops y optimización continua."},
  ];
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-20">
      <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="font-title text-4xl md:text-5xl text-[var(--c-title)]">Proceso</motion.h2>
      <ol className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((s,i)=> (
          <li key={i} className="card">
            <div className="text-sm opacity-60">Paso {i+1}</div>
            <div className="mt-1 text-xl font-semibold">{s.t}</div>
            <p className="mt-2 opacity-80">{s.d}</p>
            <button 
              onClick={() => handleWhatsAppContact(`¡Hola! Me interesa conocer más sobre el paso de ${s.t} en el proceso de Solvers AI. ¿Podríamos hablar al respecto?`)}
              className="mt-4 inline-block text-[var(--c-title)] underline underline-offset-4 bg-transparent border-none cursor-pointer hover:text-[var(--c-lime)]"
            >
              Hablemos
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------- CTA Section ------------------------------- */
function CTASection(){
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 py-24">
      <BackgroundImage url="/assets/padel-bg-cta.jpg" />
      <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="font-title text-4xl md:text-5xl text-[var(--c-title)]">Listo para jugar en primera división</motion.h2>
      <p className="mt-3 max-w-2xl opacity-80">Agenda una demo y recibe un plan de implementación con tiempos y ROI estimado.</p>
      <form onSubmit={(e)=>e.preventDefault()} className="mt-8 grid gap-4 md:grid-cols-3">
        <input placeholder="Nombre" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:opacity-50" />
        <input placeholder="Email" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:opacity-50" />
        <input placeholder="Club/Marca" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:opacity-50" />
        <textarea placeholder="Objetivo principal" className="md:col-span-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:opacity-50" rows={4} />
        <div className="md:col-span-3 flex flex-wrap gap-4">
          <button 
            className="btn btn-primary"
            onClick={() => handleWhatsAppContact("¡Hola! Estoy listo para transformar mi club con Solvers AI. Completé el formulario y me gustaría agendar una demo personalizada.")}
            type="button"
          >
            Agendar demo
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' })}
            type="button"
          >
            Ver showreel
          </button>
        </div>
      </form>
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */
function Footer(){
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-title text-xl text-[var(--c-title)]">SOLVERS AI</div>
        <div className="text-xs opacity-70">© {new Date().getFullYear()} Solvers AI · Padel Growth Systems</div>
        <div className="flex gap-3 text-sm opacity-80">
          <a href="#value">Valor</a>
          <a href="#capabilities">Soluciones</a>
          <a href="#contact">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ Sticky CTA Bar ----------------------------- */
function StickyCTA(){
  const { scrollYProgress } = useScroll();
  const w = useTransform(scrollYProgress, [0,1],["0%","100%"]);
  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <motion.div style={{width:w}} className="h-1 bg-[var(--c-title)]"/>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3 backdrop-blur bg-black/40 border-t border-white/10">
        <span className="text-sm opacity-90">¿Listo para optimizar tu club o marca de pádel?</span>
        <button 
          className="btn btn-primary"
          onClick={() => handleWhatsAppContact("¡Hola! Estoy listo para optimizar mi club de pádel con Solvers AI. ¿Podríamos agendar una consulta inmediata?")}
        >
          Agendar ahora
        </button>
      </div>
    </div>
  );
}

/* ------------------------- Fixed WhatsApp Button -------------------------- */
function FixedWhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <motion.button
        className="bg-green-600 text-white hover:bg-green-700 shadow-xl font-semibold border-2 border-green-500 rounded-full w-14 h-14 p-0 flex items-center justify-center"
        onClick={() => handleWhatsAppContact("¡Hola! Me interesa conocer más sobre Solvers AI para mi club de pádel. ¿Podrían proporcionarme información detallada y asistencia inmediata?")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(34, 197, 94, 0.3)",
            "0 0 30px rgba(34, 197, 94, 0.6)",
            "0 0 20px rgba(34, 197, 94, 0.3)"
          ]
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      </motion.button>
    </div>
  );
}

/* --------------------------- Floating Padel Ball --------------------------- */
function FloatingBall(){
  // Cursor-follow with smoothing + gentle bobbing; visible across entire page
  const ref = useRef<HTMLDivElement>(null);
  const [pos,setPos]=useState({x:window.innerWidth*0.8,y:120});
  const target = useRef(pos);
  useEffect(()=>{
    const move=(e:MouseEvent)=>{ target.current={x:e.clientX+18,y:e.clientY+18}; };
    window.addEventListener('mousemove',move);
    let raf:number; const loop=()=>{ setPos(p=>({x:p.x+(target.current.x-p.x)*0.08,y:p.y+(target.current.y-p.y)*0.08})); raf=requestAnimationFrame(loop)}; loop();
    return ()=>{ window.removeEventListener('mousemove',move); cancelAnimationFrame(raf)};
  },[]);
  const { scrollY } = useScroll();
  const bob = useTransform(scrollY, [0, 1000], [0, 12]);
  return (
    <motion.div ref={ref} style={{left:pos.x, top:pos.y, y:bob}} className="pointer-events-none fixed z-[60] h-12 w-12 -translate-x-1/2 -translate-y-1/2">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 rounded-full" style={{background:"radial-gradient(circle at 30% 30%, #fff 0%, #daf940 15%, #9fcf1a 60%, #5a6b00 100%)", boxShadow:"0 10px 24px rgba(183,255,92,.45)"}}/>
        <div className="absolute inset-0 rounded-full border-2 border-white/70" style={{maskImage:"radial-gradient(circle at 30% 30%, transparent 36%, black 36%)"}}/>
      </div>
    </motion.div>
  );
}