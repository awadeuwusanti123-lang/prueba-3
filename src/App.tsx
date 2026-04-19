/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smile, 
  Sparkles, 
  Calendar, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Shield,
  Clock,
  Menu,
  X,
  AlertCircle
} from 'lucide-react';

const WHATSAPP_NUMBER = "573165362934";

const SERVICES = [
  {
    title: "Blanqueamiento Dental",
    description: "Sonrisa radiante con tecnología LED de avanzada para resultados inmediatos y duraderos.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop",
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    title: "Limpieza Profesional",
    description: "Eliminación profunda de placa y sarro para mantener una salud bucal óptima y aliento fresco.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop",
    icon: <CheckCircle2 className="w-5 h-5" />
  },
  {
    title: "Ortodoncia Invisible",
    description: "Alinea tus dientes con comodidad y discreción usando la tecnología más moderna en alineadores.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffce47267a5?q=80&w=800&auto=format&fit=crop",
    icon: <Shield className="w-5 h-5" />
  },
  {
    title: "Diseño de Sonrisa",
    description: "Personalización estética total para lograr la sonrisa que siempre soñaste con carillas de alta calidad.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    icon: <Smile className="w-5 h-5" />
  }
];

const TESTIMONIALS = [
  {
    name: "Ana Martínez",
    role: "Paciente de Ortodoncia",
    content: "La atención en Azura es impecable. El diseño de la clínica te relaja desde que entras y los resultados superaron mis expectativas.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Carlos Ruiz",
    role: "Diseño de Sonrisa",
    content: "Buscaba algo natural y discreto. En Azura entendieron perfectamente lo que quería. Profesionales de primer nivel.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  }
];

const GALLERY = [
  "https://images.unsplash.com/photo-1629909613654-28a3a7c4d459?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605635882570-80a56667a421?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608544976766-3d7122a2bd3c?q=80&w=600&auto=format&fit=crop"
];

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICES[0].title);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationType, setValidationType] = useState<'error' | 'success' | null>(null);

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationMessage('');
    setValidationType(null);

    // Validación del Nombre
    if (name.trim().length < 3 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim())) {
      setValidationType('error');
      setValidationMessage('Por favor ingresa un nombre válido sin números o caracteres especiales.');
      return;
    }

    // Validación del Teléfono (Formato de Colombia: 10 dígitos, empieza por 3)
    if (!/^3\d{9}$/.test(phone.trim())) {
      setValidationType('error');
      setValidationMessage('Por favor revisa el teléfono. Debe ser un celular válido en Colombia (10 dígitos iniciando por 3).');
      return;
    }

    // Validación del Servicio
    if (!selectedService || selectedService === 'Consulta General' && !SERVICES.some(s => s.title === 'Consulta General')) {
       // Consulta General valid already statically exists as an option, but catching any empty edge-cases
    }

    // Validación de la Fecha
    if (!selectedDate) {
      setValidationType('error');
      setValidationMessage('Por favor selecciona la fecha para tu cita.');
      return;
    }
    
    // Validar que la fecha no sea en el pasado
    const today = new Date();
    today.setHours(0,0,0,0);
    const [year, month, day] = selectedDate.split('-').map(Number);
    const chosenDate = new Date(year, month - 1, day);
    
    if (chosenDate < today) {
      setValidationType('error');
      setValidationMessage('La fecha seleccionada ya pasó. Por favor elige una fecha futura válida para tu cita.');
      return;
    }

    // Validación del Horario
    if (!selectedTime) {
      setValidationType('error');
      setValidationMessage('No olvides seleccionar tu horario preferido.');
      return;
    }

    // Si todo está correcto
    setValidationType('success');
    setValidationMessage('Perfecto 😊🦷 tus datos están completos. Ahora puedes continuar para confirmar tu cita por WhatsApp.');

    const dateText = selectedDate;
    const timeText = selectedTime;
    const nameText = name.trim();
    const phoneText = phone.trim();
    
    // Formatear la fecha de AAAA-MM-DD a DD/MM/AAAA para mayor naturalidad
    let formattedDate = dateText;
    if (dateText) {
      const [year, month, day] = dateText.split('-');
      formattedDate = `${day}/${month}/${year}`;
    }
    
    // Formato de mensaje conversacional para WhatsApp usando emojis muy estables y legibles
    const message = `¡Hola! 😃🦷 Me gustaría agendar una cita en Azure Dental Studio (Valledupar).

Aquí dejo mis datos para la reserva:

🔹 *Nombre:* ${nameText}
🔹 *Teléfono:* ${phoneText}
🔹 *Servicio:* ${selectedService}
🔹 *Fecha:* ${formattedDate}
🔹 *Horario preferido:* ${timeText}

Quedo atento/a a la confirmación. ¡Muchas gracias! ✨`;

    const encodedMessage = encodeURIComponent(message);
    
    // Pequeño timeout antes de abrir whatsapp para que el usuario pueda leer el mensaje de éxito
    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`, '_blank');
      // Opcional: reiniciar formulario después
      // setName(''); setPhone(''); setSelectedDate(''); setSelectedTime(''); setValidationType(null);
    }, 1500);
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-8 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
              <Smile size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">AZURA</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#services" className="hover:text-sky-600 transition-colors">Servicios</a>
            <a href="#about" className="hover:text-sky-600 transition-colors">Nosotros</a>
            <a href="#facilities" className="hover:text-sky-600 transition-colors">Instalaciones</a>
            <a href="#testimonials" className="hover:text-sky-600 transition-colors">Testimonios</a>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#booking" 
              className="hidden sm:inline-flex apple-btn text-white text-sm font-medium px-5 py-2.5 rounded-full"
            >
              Reservar Ahora
            </a>
            <button 
              className="md:hidden p-2 text-slate-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>


        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-6 right-6 glass rounded-2xl p-6 shadow-xl flex flex-col gap-4"
            >
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 border-b border-brand-dark/5">Servicios</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 border-b border-brand-dark/5">Nosotros</a>
              <a href="#facilities" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 border-b border-brand-dark/5">Instalaciones</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 border-b border-brand-dark/5">Testimonios</a>
              <a 
                href="#booking" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-brand-blue text-white text-center font-medium p-4 rounded-xl mt-2"
              >
                Reservar Ahora
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase w-fit">
              <Sparkles size={14} />
              Premium Dental Care
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Tu sonrisa merece <span className="text-sky-500 underline decoration-sky-500/20">perfección clínica.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-slate-500 max-w-lg leading-relaxed">
              En Azura, combinamos la precisión tecnológica con un ambiente diseñado para tu tranquilidad. Experimenta el nivel premium en cuidado dental.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#booking" 
                className="apple-btn text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-sky-500/10"
              >
                Agendar Cita <ArrowRight size={20} />
              </a>
              <a 
                href="#services" 
                className="bg-white border border-slate-200 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-slate-50 transition-all text-slate-800"
              >
                Ver Servicios
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-8 pt-8 border-t border-slate-200">
              <div>
                <p className="text-3xl font-bold text-slate-900">15k+</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Sonrisas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">99%</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Satisfacción</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">24/7</p>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Atención</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1920&auto=format&fit=crop" 
                alt="Perfect Smile" 
                className="w-full h-full object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Glass element over image */}
            <div className="absolute -bottom-6 -left-6 z-20 glass p-8 rounded-3xl shadow-xl max-w-[260px]">
              <div className="flex gap-1 text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-sm font-medium text-slate-800">"El mejor diseño de sonrisa que he tenido. Absolutamente profesional."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-500/20" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Atención Directa</p>
              </div>
            </div>
            {/* Background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-sky-500/10 blur-[100px] -z-10" />
          </motion.div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-white/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.p {...fadeInUp} className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4">Especialidades</motion.p>
          <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Cuidado Dental sin Compromisos</motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {SERVICES.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group flex flex-col glass glass-card rounded-[2rem] overflow-hidden"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 glass p-3 rounded-2xl text-sky-600">
                  {service.icon}
                </div>
              </div>
              <div className="p-8 flex flex-col grow gap-3">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-2">{service.description}</p>
                <div className="mt-auto pt-2">
                  <a 
                    href="#booking"
                    onClick={() => setSelectedService(service.title)}
                    className="flex w-full items-center justify-center gap-2 py-3 px-4 bg-white/60 hover:bg-sky-500 text-sky-600 hover:text-white rounded-xl font-semibold text-sm shadow-sm border border-white/50 transition-all duration-300 group/btn"
                  >
                    Agendar Cita <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 px-6 bg-white/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <p className="text-sky-600 font-bold tracking-widest uppercase text-sm">Sobre Nosotros</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Filosofía Azura: Odontología Humanizada</h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              En Azura, entendemos que tu sonrisa es tu mejor carta de presentación. Nuestra filosofía se basa en tratar personas, no solo dientes. Combinamos tecnología de vanguardia con un trato cálido y personalizado para transformar cada visita en una experiencia de bienestar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-white/50 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-sky-600 shrink-0">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Seguridad Total</h4>
                  <p className="text-sm text-slate-400">Excelencia en bioseguridad.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-white/50 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-sky-600 shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Atención Premium</h4>
                  <p className="text-sm text-slate-400">Sin esperas, con dedicación.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/40"
          >
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=1200&q=80" 
              alt="Azura Medical Team" 
              className="w-full h-full object-cover aspect-video"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Facilities Gallery */}
      <section id="facilities" className="py-24 px-6 bg-white/30 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <p className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4">Instalaciones</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Tecnología y Confort en un Solo Lugar</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4">Nuestros espacios están diseñados para brindarte la máxima tranquilidad mientras recibes tratamientos con tecnología de última generación.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-3xl overflow-hidden shadow-xl border border-white/40 glass ${i % 2 === 0 ? 'mt-8' : 'mb-8'}`}
            >
              <img src={img} alt={`Instalación Azura ${i + 1}`} className="w-full h-full object-cover aspect-[3/4] hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3 flex flex-col gap-6">
            <p className="text-sky-500 font-bold tracking-widest uppercase text-sm">Testimonios</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Sonrisas que hablan por nosotros</h2>
            <div className="flex -space-x-3 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800">
                  <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="Paciente Azura" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-sky-500 flex items-center justify-center font-bold text-xs uppercase">
                4.9
              </div>
            </div>
            <p className="text-white/40 text-sm">Calificación promedio basada en opiniones certificadas.</p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] flex flex-col gap-6"
              >
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic text-white/80 leading-relaxed font-light">"{t.content}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass rounded-[3.5rem] p-10 md:p-20 shadow-2xl relative overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/5 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Agenda tu Visita</h2>
                <p className="text-slate-500 max-w-md mx-auto">Selecciona tu tratamiento y la fecha tentativa. Nuestro equipo confirmará tu cita vía WhatsApp de inmediato.</p>
              </div>

              <form onSubmit={handleWhatsAppBooking} className="flex flex-col gap-6 max-w-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }} className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Nombre completo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Tu nombre completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-5 rounded-2xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                    />
                  </motion.div>

                  <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.15 }} className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Celular</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Tu número de contacto"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-5 rounded-2xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all text-slate-700 placeholder:text-slate-400"
                    />
                  </motion.div>
                </div>

                <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }} className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">¿En qué servicio estás interesado?</label>
                  <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-5 rounded-2xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all appearance-none cursor-pointer text-slate-700"
                  >
                    {SERVICES.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                    <option value="Consulta General">Consulta General</option>
                  </select>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.3 }} className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Fecha sugerida</label>
                    <input 
                      type="date" 
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-5 rounded-2xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all cursor-pointer text-slate-700"
                    />
                  </motion.div>

                  <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.35 }} className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-2">Horario preferido</label>
                    <select 
                      required
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-5 rounded-2xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all appearance-none cursor-pointer text-slate-700"
                    >
                      <option value="" disabled>Seleccionar turno</option>
                      <option value="Mañana (8:00 AM - 12:00 PM)">Mañana (8:00 AM - 12:00 PM)</option>
                      <option value="Tarde (2:00 PM - 6:00 PM)">Tarde (2:00 PM - 6:00 PM)</option>
                    </select>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {validationType && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className={`flex items-start gap-3 p-4 rounded-xl text-sm font-medium border ${
                        validationType === 'error' 
                        ? 'bg-rose-50 text-rose-600 border-rose-200' 
                        : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      }`}
                    >
                      {validationType === 'error' ? (
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                      )}
                      <span>{validationMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button 
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full apple-btn text-white p-6 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-sky-500/10 transition-all"
                >
                  <Phone size={20} className="fill-white" />
                  Reservar por WhatsApp
                </motion.button>

                <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.4 }} className="flex items-center gap-4 py-4 border-t border-slate-200/50 mt-4">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&w=100&q=80" className="w-12 h-12 rounded-full object-cover border-2 border-white" alt="Doctor" />
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Atención Directa</p>
                    <p className="text-sm text-slate-700 font-bold">Dr. Julian Moreno</p>
                  </div>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <footer className="bg-slate-900 py-16 px-6 text-white border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                <Smile size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight">AZURA</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Dedicados a transformar vidas a través de la excelencia odontológica y el trato humano excepcional.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-sky-500">Contacto</h4>
            <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer">
              <Phone size={18} className="text-sky-500" />
              <span>+57 316 536 2934</span>
            </div>
            <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer">
              <MapPin size={18} className="text-sky-500" />
              <span>Calle 100 #15-32, Bogotá, Colombia</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-sky-500">Horario</h4>
            <div className="flex items-center gap-3 text-white/60">
              <Clock size={18} className="text-sky-500" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white/80 uppercase tracking-widest">© 2024 AZURA DENTAL.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-white/20">
          <p>© 2024 Azura Dental Clinic. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
