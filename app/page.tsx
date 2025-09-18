"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"

export default function SolversAILanding() {
  const [language, setLanguage] = useState<"es" | "en">("es")
  const [timeLeft, setTimeLeft] = useState({
    days: 20,
    hours: 12,
    minutes: 30,
    seconds: 45,
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const ballRef = useRef<HTMLDivElement>(null)
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 })
  const [ballVelocity, setBallVelocity] = useState({ x: 2, y: 1.5 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const animateBall = () => {
      setBallPosition((prev) => {
        let newX = prev.x + ballVelocity.x
        let newY = prev.y + ballVelocity.y

        if (newX <= 0 || newX >= 100) {
          setBallVelocity((vel) => ({ ...vel, x: -vel.x }))
          newX = Math.max(0, Math.min(100, newX))
        }
        if (newY <= 0 || newY >= 100) {
          setBallVelocity((vel) => ({ ...vel, y: -vel.y }))
          newY = Math.max(0, Math.min(100, newY))
        }

        return { x: newX, y: newY }
      })
    }

    const interval = setInterval(animateBall, 50)
    return () => clearInterval(interval)
  }, [ballVelocity])

  const handleBallClick = () => {
    setBallVelocity({
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 4,
    })
  }

  // WhatsApp contact function
  const handleWhatsAppContact = (message: string) => {
    const whatsappNumber = "+573008505700" // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const content = {
    es: {
      nav: {
        features: "Características",
        pricing: "Precios",
        testimonials: "Testimonios",
        demo: "Demo",
        login: "Iniciar Sesión",
        trial: "Prueba Gratuita",
      },
      hero: {
        badge: "Oferta de Lanzamiento",
        title: "Revoluciona tu Club de Pádel",
        subtitle: "con Inteligencia Artificial",
        description:
          "Sistema integral de automatización que gestiona reservas, torneos, CRM y más. Aumenta tus ingresos hasta un 40% mientras reduces el trabajo manual.",
        cta1: "Comenzar Prueba Gratuita",
        cta2: "Contáctanos",
        guarantee: "✓ Garantía del servicio ✓ Diferentes medios de pago ✓ Cancelación 1-clic",
      },
      countdown: {
        title: "Oferta Especial de Lanzamiento",
        subtitle: "Precio especial por tiempo limitado",
        days: "Días",
        hours: "Horas",
        minutes: "Min",
        seconds: "Seg",
        spots: "Oferta por tiempo limitado",
      },
      features: {
        title: "Sistema de Dos Manos",
        subtitle: "Automatización completa con IA",
        leftHand: {
          title: "Mano Izquierda: Dashboard Inteligente",
          description:
            "Interfaz de control con agente IA que interpreta datos y los convierte en insights accionables.",
        },
        rightHand: {
          title: "Mano Derecha: Agente Multicanal",
          description:
            "IA que atiende clientes, gestiona reservas y actualiza bases de datos en WhatsApp, web y redes sociales.",
        },
        modules: [
          {
            icon: BarChart3,
            title: "Métricas y Alertas",
            description: "Gráficas dinámicas de ocupación, ingresos y reportes financieros en tiempo real.",
          },
          {
            icon: Users,
            title: "CRM y Difusiones",
            description: "Gestión automática de clientes con campañas segmentadas y exportación de datos.",
          },
          {
            icon: Calendar,
            title: "Gestión de Torneos",
            description: "Creación automática de cruces, eliminatorias y cronogramas de partidos.",
          },
          {
            icon: Clock,
            title: "Gestión de Academia",
            description: "Recordatorios automáticos, bloqueo de canchas y liquidación de profesores.",
          },
          {
            icon: Zap,
            title: "Flyers Promocionales",
            description: "Generación instantánea de piezas gráficas con IA para eventos y promociones.",
          },
        ],
      },
      pricing: {
        title: "Precios Transparentes",
        subtitle: "Elige el plan perfecto para tu club",
        free: {
          title: "Servicios Estándar",
          price: "",
          period: "",
          description: "Perfecto para comenzar",
          features: ["Reservas/mes", "CRM básico", "Soporte por email", "Dashboard básico"],
          cta: "Solicitar Cotización",
          popular: false,
        },
        pro: {
          title: "Servicio Profesional",
          price: "",
          originalPrice: "",
          period: "",
          description: "Para clubes en crecimiento",
          features: [
            "Reservas ilimitadas",
            "Gestión de torneos",
            "Agente IA multicanal",
            "Métricas avanzadas",
            "Soporte prioritario",
            "Integración WhatsApp",
          ],
          cta: "Agendar",
          popular: true,
        },
        enterprise: {
          title: "Servicios Personalizados",
          price: "Personalizado",
          period: "",
          description: "Para cadenas de clubes",
          features: [
            "Servicios a la medida",
            "Estudio de la necesidad",
            "Todo lo de Profesional",
            "Múltiples ubicaciones",
            "API personalizada",
            "Soporte dedicado",
            "Implementación asistida",
          ],
          cta: "Contactar Ventas",
          popular: false,
        },
      },
      testimonials: {
        title: "Lo que dicen nuestros clientes",
        subtitle: "Más de 50 industrias ya confían en Solvers AI, no te quedes por fuera",
        items: [
          {
            name: "Carlos Mendoza",
            role: "Director, Club Pádel Elite",
            content:
              "Aumentamos nuestros ingresos un 35% en solo 3 meses. La automatización nos permitió enfocarnos en la experiencia del cliente.",
            rating: 5,
          },
          {
            name: "Ana García",
            role: "Gerente, Pádel Center Madrid",
            content:
              "El agente IA responde el 90% de las consultas automáticamente. Nuestros clientes están encantados con la rapidez.",
            rating: 5,
          },
          {
            name: "Miguel Torres",
            role: "Propietario, Academia Pádel Pro",
            content:
              "La gestión de torneos que antes nos tomaba días, ahora se hace en minutos. Increíble ahorro de tiempo.",
            rating: 5,
          },
        ],
      },
      cta: {
        title: "¿Listo para revolucionar tu club?",
        subtitle:
          "Únete a más de 150 clubes alrededor del mundo aumentaron sus ingresos integrando la Inteligencia Artificial",
        button: "Comenzar Ahora",
        guarantee: "Garantía del servicio - Sin riesgo - Cancelación en 1 clic",
      },
    },
    en: {
      nav: {
        features: "Features",
        pricing: "Pricing",
        testimonials: "Testimonials",
        demo: "Demo",
        login: "Sign In",
        trial: "Free Trial",
      },
      hero: {
        badge: "Launch Offer",
        title: "Revolutionize your Paddle Club",
        subtitle: "with Artificial Intelligence",
        description:
          "Comprehensive automation system that manages bookings, tournaments, CRM and more. Increase your revenue up to 40% while reducing manual work.",
        cta1: "Start Free Trial",
        cta2: "Contact Us",
        guarantee: "✓ Service guarantee ✓ Multiple payment methods ✓ 1-click cancellation",
      },
      countdown: {
        title: "Special Launch Offer",
        subtitle: "Limited time special pricing",
        days: "Days",
        hours: "Hours",
        minutes: "Min",
        seconds: "Sec",
        spots: "Limited-time offer",
      },
      features: {
        title: "Two-Handed System",
        subtitle: "Complete AI automation",
        leftHand: {
          title: "Left Hand: Smart Dashboard",
          description: "Control interface with AI agent that interprets data and converts it into actionable insights.",
        },
        rightHand: {
          title: "Right Hand: Multichannel Agent",
          description:
            "AI that serves customers, manages bookings and updates databases on WhatsApp, web and social media.",
        },
        modules: [
          {
            icon: BarChart3,
            title: "Metrics & Alerts",
            description: "Dynamic charts of occupancy, revenue and real-time financial reports.",
          },
          {
            icon: Users,
            title: "CRM & Broadcasting",
            description: "Automatic customer management with segmented campaigns and data export.",
          },
          {
            icon: Calendar,
            title: "Tournament Management",
            description: "Automatic creation of brackets, eliminations and match schedules.",
          },
          {
            icon: Clock,
            title: "Academy Management",
            description: "Automatic reminders, court blocking and teacher payroll.",
          },
          {
            icon: Zap,
            title: "Promotional Flyers",
            description: "Instant AI-generated graphics for events and promotions.",
          },
        ],
      },
      pricing: {
        title: "Transparent Pricing",
        subtitle: "Choose the perfect plan for your club",
        free: {
          title: "Standard Services",
          price: "",
          period: "",
          description: "Perfect to get started",
          features: ["bookings/monthly", "Basic CRM", "Email support", "Basic dashboard"],
          cta: "Request Quote",
          popular: false,
        },
        pro: {
          title: "Professional",
          price: "",
          originalPrice: "",
          period: "",
          description: "For growing clubs",
          features: [
            "Unlimited bookings",
            "Tournament management",
            "Multichannel AI agent",
            "Advanced metrics",
            "Priority support",
            "WhatsApp integration",
          ],
          cta: "Schedule Consultation",
          popular: true,
        },
        enterprise: {
          title: "Custom Services",
          price: "Custom",
          period: "",
          description: "For club chains",
          features: [
            "Everything in Professional",
            "Multiple locations",
            "Custom API",
            "Dedicated support",
            "Assisted implementation",
          ],
          cta: "Contact Sales",
          popular: false,
        },
      },
      testimonials: {
        title: "What our customers say",
        subtitle: "Over 150 clubs already trust AI-powered solutions — avoid getting sidelined",
        items: [
          {
            name: "Carlos Mendoza",
            role: "Director, Elite Paddle Club",
            content:
              "We increased our revenue by 35% in just 3 months. Automation allowed us to focus on customer experience.",
            rating: 5,
          },
          {
            name: "Ana García",
            role: "Manager, Paddle Center Madrid",
            content: "The AI agent automatically answers 90% of inquiries. Our customers are delighted with the speed.",
            rating: 5,
          },
          {
            name: "Miguel Torres",
            role: "Owner, Pro Paddle Academy",
            content: "Tournament management that used to take us days is now done in minutes. Incredible time savings.",
            rating: 5,
          },
        ],
      },
      cta: {
        title: "Ready to revolutionize your club?",
        subtitle: "Join over 50 industries that have already increased their revenue with Solvers AI",
        button: "Contact Us",
        guarantee: "Service guarantee - No risk - 1-click cancellation",
      },
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-grid-pattern opacity-20"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 animate-gradient"></div>

      <div className="fixed top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float"></div>
      <div
        className="fixed top-40 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-lg animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="fixed bottom-20 left-1/4 w-40 h-40 bg-accent/5 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "4s" }}
      ></div>

      <nav className="fixed top-0 w-full z-[1000] bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <img
                  src="/solvers-logo.png"
                  alt="Solvers AI Logo"
                  className="w-10 h-10 object-contain rounded-full"
                  style={{ aspectRatio: "1/1" }}
                />
                <span className="font-montserrat font-black text-xl text-white">Solvers AI</span>
              </div>

              <div className="hidden md:flex space-x-6">
                <a
                  href="#features"
                  className="font-open-sans text-gray-300 hover:text-white hover:bg-blue-600/20 hover:border hover:border-blue-500 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t.nav.features}
                </a>
                <a
                  href="#pricing"
                  className="font-open-sans text-gray-300 hover:text-white hover:bg-blue-600/20 hover:border hover:border-blue-500 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t.nav.pricing}
                </a>
                <a
                  href="#testimonials"
                  className="font-open-sans text-gray-300 hover:text-white hover:bg-blue-600/20 hover:border hover:border-blue-500 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t.nav.testimonials}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={language === "es" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("es")}
                  className={`text-xs ${language === "es" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"}`}
                >
                  ES
                </Button>
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage("en")}
                  className={`text-xs ${language === "en" ? "bg-blue-600 text-white border-blue-600" : "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"}`}
                >
                  EN
                </Button>
              </div>

              <div className="hidden md:flex space-x-2">
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-3">
                <a
                  href="#features"
                  className="font-open-sans text-gray-300 hover:text-white transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                    setMobileMenuOpen(false)
                  }}
                >
                  {t.nav.features}
                </a>
                <a
                  href="#pricing"
                  className="font-open-sans text-gray-300 hover:text-white transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
                    setMobileMenuOpen(false)
                  }}
                >
                  {t.nav.pricing}
                </a>
                <a
                  href="#testimonials"
                  className="font-open-sans text-gray-300 hover:text-white transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })
                    setMobileMenuOpen(false)
                  }}
                >
                  {t.nav.testimonials}
                </a>
                <div className="flex space-x-2 pt-2">
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="relative py-20 lg:py-32 overflow-hidden pt-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/95 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/80 to-gray-900/40"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={ballRef}
            className="absolute w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 animate-pulse-glow"
            style={{
              left: `${ballPosition.x}%`,
              top: `${ballPosition.y}%`,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 20px rgba(234, 179, 8, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
              background: "radial-gradient(circle at 30% 30%, #fbbf24, #f59e0b, #d97706)",
            }}
            onClick={handleBallClick}
          >
            <div className="absolute inset-0 rounded-full">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-yellow-800/30 transform -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-yellow-800/30 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-slide-in-up">
            <Badge className="mb-6 bg-blue-600 text-white border-blue-600 font-open-sans animate-pulse-glow">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.hero.badge}
            </Badge>

            <h1 className="font-montserrat font-black text-4xl md:text-6xl lg:text-7xl text-balance mb-6">
              {t.hero.title}
              <br />
              <span className="text-blue-400">{t.hero.subtitle}</span>
            </h1>

            <p className="font-open-sans text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-balance">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 font-open-sans font-semibold shadow-lg border-2 border-blue-500"
                onClick={() => {
                  const message = language === "es" 
                    ? "¡Hola! Me interesa conocer más sobre Solvers AI para mi club de pádel. Me gustaría agendar una consulta y recibir más información sobre sus servicios."
                    : "Hello! I'm interested in learning more about Solvers AI for my paddle club. I would like to schedule a consultation and receive more information about your services."
                  handleWhatsAppContact(message)
                }}
              >
                <MessageSquare className="mr-2 w-5 h-5" />
                {t.hero.cta2}
              </Button>
            </div>

            <p className="font-open-sans text-sm text-gray-400">{t.hero.guarantee}</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-gray-900 to-black border-y border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-2">{t.countdown.title}</h3>
            <p className="font-open-sans text-gray-300 mb-6">{t.countdown.subtitle}</p>

            <div className="flex justify-center items-center space-x-4 md:space-x-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <div className="font-montserrat font-black text-xl md:text-3xl">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="font-open-sans text-xs md:text-sm text-gray-400 mt-2">{t.countdown.days}</div>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <div className="font-montserrat font-black text-xl md:text-3xl">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="font-open-sans text-xs md:text-sm text-gray-400 mt-2">{t.countdown.hours}</div>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <div className="font-montserrat font-black text-xl md:text-3xl">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="font-open-sans text-xs md:text-sm text-gray-400 mt-2">{t.countdown.minutes}</div>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <div className="font-montserrat font-black text-xl md:text-3xl">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="font-open-sans text-xs md:text-sm text-gray-400 mt-2">{t.countdown.seconds}</div>
              </div>
            </div>

            <p className="font-open-sans text-sm text-gray-400 mt-4">{t.countdown.spots}</p>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-black text-3xl md:text-5xl mb-4 text-white">{t.features.title}</h2>
            <p className="font-open-sans text-lg text-gray-300">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 bg-gray-900/70 backdrop-blur-sm border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl flex items-center text-white">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center mr-4">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                  {t.features.leftHand.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-300">{t.features.leftHand.description}</p>
                <div className="mt-4">
                  <img
                    src="/dashboard-analytics-charts-dark-theme-paddle-tenni.jpg"
                    alt="Dashboard Analytics"
                    className="w-full h-32 object-cover rounded-lg opacity-80"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gray-900/70 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl flex items-center text-white">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg flex items-center justify-center mr-4">
                    <MessageSquare className="w-6 h-6 text-cyan-400" />
                  </div>
                  {t.features.rightHand.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-open-sans text-gray-300">{t.features.rightHand.description}</p>
                <div className="mt-4">
                  <img
                    src="/ai-chatbot-whatsapp-interface-multichannel-communi.jpg"
                    alt="AI Multichannel Agent"
                    className="w-full h-32 object-cover rounded-lg opacity-80"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.modules.map((module, index) => (
              <Card
                key={index}
                className="p-6 bg-gray-900/50 backdrop-blur-sm border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-900/70 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300">
                    <module.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <CardTitle className="font-montserrat font-bold text-lg text-white">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-open-sans text-gray-300">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-black text-3xl md:text-5xl mb-4 text-white">{t.pricing.title}</h2>
            <p className="font-open-sans text-lg text-gray-300">{t.pricing.subtitle}</p>
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20 max-w-md mx-auto">
              <Badge className="bg-blue-600 text-white border-blue-600 mb-2">
                🔥 {language === "es" ? "Precios de Lanzamiento" : "Launch Pricing"}
              </Badge>
              <p className="font-open-sans text-sm text-gray-300">
                {language === "es"
                  ? "¡Todo a mitad de precio por tiempo limitado!"
                  : "Everything at half price for limited time!"}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="relative p-8 bg-black border-gray-700">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl text-white">{t.pricing.free.title}</CardTitle>
                <CardDescription className="font-open-sans text-gray-300">{t.pricing.free.description}</CardDescription>
                <div className="flex items-baseline space-x-2">
                  <span className="font-montserrat font-black text-3xl text-white">{t.pricing.free.price}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {t.pricing.free.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center font-open-sans text-gray-300">
                      <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full font-open-sans font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg border border-blue-500"
                  onClick={() => {
                    const message = language === "es" 
                      ? "¡Hola! Me interesa solicitar una cotización para los servicios estándar de Solvers AI. Por favor, envíenme más información y precios."
                      : "Hello! I'm interested in requesting a quote for Solvers AI standard services. Please send me more information and pricing."
                    handleWhatsAppContact(message)
                  }}
                >
                  {t.pricing.free.cta}
                </Button>
              </CardContent>
            </Card>

            <Card className="relative p-8 bg-black border-blue-500 shadow-lg scale-105">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white border-blue-600">
                {language === "es" ? "Más Popular" : "Most Popular"}
              </Badge>

              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl text-white">{t.pricing.pro.title}</CardTitle>
                <CardDescription className="font-open-sans text-gray-300">{t.pricing.pro.description}</CardDescription>
                <div className="flex items-baseline space-x-2">
                  <span className="font-montserrat font-black text-3xl text-white">{t.pricing.pro.price}</span>
                  {t.pricing.pro.originalPrice && (
                    <span className="font-open-sans text-gray-400 line-through">{t.pricing.pro.originalPrice}</span>
                  )}
                  <span className="font-open-sans text-gray-400">{t.pricing.pro.period}</span>
                </div>
                <Badge className="bg-red-600 text-white border-red-600 mt-2">
                  {language === "es" ? "50% OFF - Precio Lanzamiento" : "50% OFF - Launch Price"}
                </Badge>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {t.pricing.pro.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center font-open-sans text-gray-300">
                      <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full font-open-sans font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg border border-blue-500"
                  onClick={() => {
                    const message = language === "es" 
                      ? "¡Hola! Me interesa el servicio profesional de Solvers AI. Me gustaría agendar una consulta para conocer más detalles sobre esta solución para mi club."
                      : "Hello! I'm interested in Solvers AI professional service. I would like to schedule a consultation to learn more details about this solution for my club."
                    handleWhatsAppContact(message)
                  }}
                >
                  {t.pricing.pro.cta}
                </Button>
              </CardContent>
            </Card>

            <Card className="relative p-8 bg-black border-gray-700">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl text-white">
                  {t.pricing.enterprise.title}
                </CardTitle>
                <CardDescription className="font-open-sans text-gray-300">
                  {t.pricing.enterprise.description}
                </CardDescription>
                <div className="flex items-baseline space-x-2">
                  <span className="font-montserrat font-black text-3xl text-white">{t.pricing.enterprise.price}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {t.pricing.enterprise.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center font-open-sans text-gray-300">
                      <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full font-open-sans font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg border border-blue-500"
                  onClick={() => {
                    const message = language === "es" 
                      ? "¡Hola! Me interesa conocer más sobre los servicios personalizados de Solvers AI. Necesito una solución a medida para mi cadena de clubes."
                      : "Hello! I'm interested in learning more about Solvers AI custom services. I need a tailored solution for my club chain."
                    handleWhatsAppContact(message)
                  }}
                >
                  {t.pricing.enterprise.cta}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-300 font-open-sans">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-blue-400" />
                {language === "es" ? "Garantía 30 días" : "30-day guarantee"}
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-400" />
                {language === "es" ? "Sin tarjeta de crédito" : "No credit card"}
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                {language === "es" ? "Cancelación 1-clic" : "1-click cancellation"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-black text-3xl md:text-5xl mb-4 text-white">{t.testimonials.title}</h2>
            <p className="font-open-sans text-lg text-gray-300">{t.testimonials.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-gray-900 border-gray-700">
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="font-open-sans text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-montserrat font-bold text-white">{testimonial.name}</p>
                    <p className="font-open-sans text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/paddle-tennis-tournament-celebration-success-dark.jpg"
            alt="Success background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-gray-900/80 to-black/90"></div>
        </div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-montserrat font-black text-3xl md:text-5xl mb-4">{t.cta.title}</h2>
          <p className="font-open-sans text-lg mb-8 opacity-90">{t.cta.subtitle}</p>

          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 font-open-sans font-semibold mb-4 shadow-xl border-2 border-blue-500"
            onClick={() => {
              const message = language === "es" 
                ? "¡Hola! Estoy listo para revolucionar mi club con Solvers AI. Me gustaría comenzar ahora y conocer todos los detalles del proceso."
                : "Hello! I'm ready to revolutionize my club with Solvers AI. I would like to start now and learn all the details of the process."
              handleWhatsAppContact(message)
            }}
          >
            <TrendingUp className="mr-2 w-5 h-5" />
            {t.cta.button}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <p className="font-open-sans text-sm opacity-80">{t.cta.guarantee}</p>
        </div>
      </section>

      <div className="fixed bottom-4 right-4 z-50">
        <Button
          className="bg-green-600 text-white hover:bg-green-700 shadow-xl font-open-sans font-semibold border-2 border-green-500 rounded-full w-14 h-14 p-0"
          onClick={() => {
            const message =
              language === "es"
                ? "¡Hola! Me interesa conocer más sobre Solvers AI para mi club de pádel. ¿Podrían proporcionarme información detallada y asistencia inmediata?"
                : "Hello! I'm interested in learning more about Solvers AI for my paddle club. Could you provide me with detailed information and immediate assistance?"
            handleWhatsAppContact(message)
          }}
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
