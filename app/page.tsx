'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const [activeRole, setActiveRole] = useState<string>('syndic')
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr')
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [activeFeature, setActiveFeature] = useState<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  
  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Suivi du scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-rotation des features sur mobile
  useEffect(() => {
    if (!isMobile) return
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6)
    }, 4000)
    return () => clearInterval(interval)
  }, [isMobile])

  const handleLoginRedirect = () => router.push('/login')

  // Images réelles Unsplash - Optimisées pour la performance
  const images = {
    building1: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&auto=format&q=80",
    building2: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&auto=format&q=80",
    apartment1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&auto=format&q=80",
    payment: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop&auto=format&q=80",
    communication: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=800&fit=crop&auto=format&q=80",
    maintenance: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=800&fit=crop&auto=format&q=80",
    dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format&q=80",
    technology: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&auto=format&q=80",
    professional: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop&auto=format&q=80",
    management2: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop&auto=format&q=80",
    aerial: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop&auto=format&q=80",
  }

  // Traductions complètes
  const t = language === 'fr' ? {
    // Navigation
    title: "SyndicPro", tagline: "Gestion immobilière intelligente",
    login: "Connexion", menu: "Menu",
    
    // Hero
    heroTitle: "Gérez votre immeuble", heroSubtitle: "en toute simplicité",
    heroDescription: "La plateforme tout-en-un pour syndics, résidents et administrateurs. Automatisez la gestion, simplifiez la communication et optimisez vos processus immobiliers.",
    getStarted: "Commencer gratuitement", watchVideo: "Voir la vidéo",
    stats: [
      { value: "100+", label: "Immeubles gérés" },
      { value: "5000+", label: "Résidents satisfaits" },
      { value: "98%", label: "Paiements à temps" },
      { value: "24/7", label: "Support disponible" }
    ],
    
    // Features
    featuresTitle: "Tout ce dont vous avez besoin",
    featuresSubtitle: "Une suite complète d'outils pour une gestion immobilière optimale",
    features: [
      { 
        title: "Gestion des Propriétés", 
        desc: "Centralisez toutes les informations de vos immeubles, appartements et garages en un seul endroit sécurisé.",
        details: ["Inventaire complet", "Documents numérisés", "Historique de maintenance", "Plans interactifs"],
        icon: '🏢', color: 'blue'
      },
      { 
        title: "Paiements Automatisés", 
        desc: "Suivez et gérez les paiements avec des options cash, virement bancaire et prélèvement automatique.",
        details: ["Rappels automatiques", "Reçus électroniques", "Rapports financiers", "Comptabilité intégrée"],
        icon: '💰', color: 'green'
      },
      { 
        title: "Communication Unifiée", 
        desc: "Messagerie intégrée, notifications push et système d'annonces pour une communication fluide avec tous les résidents.",
        details: ["Chat en temps réel", "Annonces groupées", "Notifications push", "Historique complet"],
        icon: '💬', color: 'purple'
      },
      { 
        title: "Gestion des Réclamations", 
        desc: "Système de tickets intelligent pour traiter efficacement toutes les réclamations et demandes des résidents.",
        details: ["Priorisation automatique", "Suivi en temps réel", "Historique complet", "Photos et documents"],
        icon: '📋', color: 'orange'
      },
      { 
        title: "Tableaux de Bord Intelligents", 
        desc: "Analyses en temps réel et rapports détaillés pour une prise de décision éclairée et stratégique.",
        details: ["Statistiques financières", "Taux d'occupation", "Indicateurs de performance", "Export Excel/PDF"],
        icon: '📊', color: 'teal'
      },
      { 
        title: "Support Multi-Device", 
        desc: "Accessible sur mobile, tablette et ordinateur avec synchronisation en temps réel de toutes vos données.",
        details: ["Application mobile native", "Responsive design", "Mode hors ligne", "Synchronisation cloud"],
        icon: '📱', color: 'pink'
      }
    ],
    
    // Roles
    rolesTitle: "Adapté à chaque acteur", rolesSubtitle: "Des interfaces personnalisées selon votre rôle",
    roles: [
      { 
        id: 'syndic', title: "Syndic", icon: '👔', color: 'blue',
        features: [
          "Gestion complète des propriétés et résidents",
          "Suivi financier en temps réel avec rapports",
          "Communication directe avec les résidents",
          "Traitement des réclamations et maintenance",
          "Génération de rapports automatiques"
        ]
      },
      { 
        id: 'utilisateur', title: "Résident", icon: '👤', color: 'green',
        features: [
          "Accès sécurisé à vos informations personnelles",
          "Paiements simplifiés et sécurisés",
          "Soumission facile de réclamations",
          "Communication directe avec le syndic",
          "Documents et annonces en ligne"
        ]
      },
      { 
        id: 'admin', title: "Administrateur", icon: '⚙️', color: 'purple',
        features: [
          "Supervision complète du système",
          "Gestion centralisée des comptes",
          "Audit et conformité en temps réel",
          "Statistiques globales et analyses",
          "Configuration système avancée"
        ]
      }
    ],
    
    // Steps
    howTitle: "Simple et efficace", howSubtitle: "Commencez en quelques minutes",
    steps: [
      { step: 1, title: "Inscription", desc: "Créez votre compte en 2 minutes chrono", icon: '📝', color: 'blue' },
      { step: 2, title: "Configuration", desc: "Ajoutez votre immeuble et vos résidents", icon: '⚙️', color: 'purple' },
      { step: 3, title: "Lancement", desc: "Commencez à gérer efficacement dès maintenant", icon: '🚀', color: 'green' }
    ],
    
    // Testimonials
    testimonialsTitle: "Ils nous font confiance",
    testimonialsSubtitle: "Découvrez ce que nos clients disent de nous",
    testimonials: [
      {
        name: "Marie Dubois", role: "Syndic professionnel",
        text: "SyndicPro a complètement transformé notre façon de travailler. Tout est centralisé, automatisé et nos résidents sont plus satisfaits que jamais. Un gain de temps considérable !",
        building: "Résidence Les Chênes - 45 appartements", rating: 5
      },
      {
        name: "Ahmed Benali", role: "Président de copropriété",
        text: "La transparence et la simplicité de SyndicPro ont considérablement amélioré nos relations avec les résidents. Les paiements sont suivis en temps réel et la communication est fluide.",
        building: "Tour Méditerranée - 120 appartements", rating: 5
      },
      {
        name: "Sophie Martin", role: "Résidente",
        text: "Enfin une application qui simplifie vraiment la vie en copropriété ! Je peux payer mes charges, signaler un problème et contacter le syndic en quelques clics. C'est parfait !",
        building: "Les Jardins Fleuris - Résidente depuis 3 ans", rating: 5
      }
    ],
    
    // Pricing
    pricingTitle: "Des tarifs adaptés à vos besoins",
    pricingSubtitle: "Choisissez l'offre qui correspond le mieux à votre situation",
    plans: [
      { 
        name: "Starter", price: "Gratuit", desc: "Pour les petites copropriétés",
        features: ["Jusqu'à 10 logements", "Gestion de base", "Support email", "1 administrateur"],
        cta: "Choisir ce plan", popular: false
      },
      { 
        name: "Professionnel", price: "49€", desc: "Pour les syndics professionnels",
        features: ["Jusqu'à 100 logements", "Toutes les fonctionnalités", "Support prioritaire 24/7", "Administrateurs illimités", "Rapports avancés", "API complète"],
        cta: "Choisir ce plan", popular: true
      },
      { 
        name: "Entreprise", price: "Sur mesure", desc: "Pour les grands groupes",
        features: ["Logements illimités", "Fonctionnalités sur mesure", "Support dédié", "Formation incluse", "SLA garanti", "Intégration personnalisée"],
        cta: "Nous contacter", popular: false
      }
    ],
    
    // CTA
    ctaTitle: "Prêt à transformer votre gestion immobilière ?",
    ctaSubtitle: "Rejoignez plus de 500 syndics professionnels qui nous font déjà confiance",
    ctaStart: "Essai gratuit 30 jours", ctaDemo: "Démo personnalisée",
    
    // Footer
    product: "Produit", company: "Société", support: "Support",
    newsletter: "Newsletter", newsletterDesc: "Recevez nos dernières actualités",
    subscribe: "S'abonner", email: "Votre email",
    rights: "Tous droits réservés"
  } : {
    // Arabic translations
    title: "سنديك برو", tagline: "إدارة عقارية ذكية",
    login: "تسجيل الدخول", menu: "القائمة",
    
    heroTitle: "أدر عقارك", heroSubtitle: "بكل سهولة",
    heroDescription: "المنصة الشاملة للمدراء والمقيمين والمسؤولين. أتمتة الإدارة، تبسيط التواصل وتحسين عملياتك العقارية.",
    getStarted: "ابدأ مجاناً", watchVideo: "شاهد الفيديو",
    stats: [
      { value: "100+", label: "عقار مُدار" },
      { value: "5000+", label: "مقيم راض" },
      { value: "98%", label: "مدفوعات في الوقت" },
      { value: "24/7", label: "دعم متاح" }
    ],
    
    featuresTitle: "كل ما تحتاجه",
    featuresSubtitle: "مجموعة كاملة من الأدوات للإدارة العقارية المثالية",
    features: [
      { 
        title: "إدارة العقارات", 
        desc: "ركز كل معلومات عقاراتك، شققك وكراجاتك في مكان واحد آمن.",
        details: ["جرد كامل", "مستندات رقمية", "سجل الصيانة", "مخططات تفاعلية"],
        icon: '🏢', color: 'blue'
      },
      { 
        title: "مدفوعات آلية", 
        desc: "تابع وادفع المدفوعات بخيارات كاش، تحويل مصرفي وخصم مباشر.",
        details: ["تذكير آلي", "إيصالات إلكترونية", "تقارير مالية", "محاسبة مدمجة"],
        icon: '💰', color: 'green'
      },
      { 
        title: "تواصل موحد", 
        desc: "مراسلة مدمجة، إشعارات فورية ونظام إعلانات للتواصل السلس مع جميع المقيمين.",
        details: ["دردشة فورية", "إعلانات جماعية", "إشعارات فورية", "سجل كامل"],
        icon: '💬', color: 'purple'
      },
      { 
        title: "إدارة الشكاوى", 
        desc: "نظام تذاكر ذكي لمعالجة جميع شكاوى وطلبات المقيمين بكفاءة.",
        details: ["أولوية آلية", "متابعة فورية", "سجل كامل", "صور ومستندات"],
        icon: '📋', color: 'orange'
      },
      { 
        title: "لوحات تحكم ذكية", 
        desc: "تحليلات فورية وتقارير مفصلة لاتخاذ قرارات مستنيرة واستراتيجية.",
        details: ["إحصائيات مالية", "معدل الإشغال", "مؤشرات الأداء", "تصدير Excel/PDF"],
        icon: '📊', color: 'teal'
      },
      { 
        title: "دعم متعدد الأجهزة", 
        desc: "متاح على الهاتف، اللوحة والكمبيوتر مع مزامنة فورية لجميع بياناتك.",
        details: ["تطبيق جوال أصلي", "تصميم متجاوب", "وضع بدون إنترنت", "مزامنة سحابية"],
        icon: '📱', color: 'pink'
      }
    ],
    
    rolesTitle: "مخصص لكل دور", rolesSubtitle: "واجهات مخصصة حسب دورك",
    roles: [
      { 
        id: 'syndic', title: "المدير", icon: '👔', color: 'blue',
        features: [
          "إدارة شاملة للعقارات والمقيمين",
          "متابعة مالية فورية مع تقارير",
          "تواصل مباشر مع المقيمين",
          "معالجة الشكاوى والصيانة",
          "توليد التقارير الآلية"
        ]
      },
      { 
        id: 'utilisateur', title: "المقيم", icon: '👤', color: 'green',
        features: [
          "وصول آمن لمعلوماتك الشخصية",
          "مدفوعات مبسطة وآمنة",
          "تقديم سهل للشكاوى",
          "تواصل مباشر مع المدير",
          "مستندات وإعلانات إلكترونية"
        ]
      },
      { 
        id: 'admin', title: "المسؤول", icon: '⚙️', color: 'purple',
        features: [
          "إشراف كامل على النظام",
          "إدارة مركزية للحسابات",
          "تدقيق وامتثال فوري",
          "إحصائيات شاملة وتحليلات",
          "إعدادات نظام متقدمة"
        ]
      }
    ],
    
    howTitle: "بسيط وفعال", howSubtitle: "ابدأ خلال دقائق",
    steps: [
      { step: 1, title: "التسجيل", desc: "أنشئ حسابك خلال دقيقتين فقط", icon: '📝', color: 'blue' },
      { step: 2, title: "الإعداد", desc: "أضف عقارك ومقيميك", icon: '⚙️', color: 'purple' },
      { step: 3, title: "البدء", desc: "ابدأ الإدارة بكفاءة الآن", icon: '🚀', color: 'green' }
    ],
    
    testimonialsTitle: "يثقون بنا",
    testimonialsSubtitle: "اكتشف ما يقوله عملاؤنا عنا",
    testimonials: [
      {
        name: "ماري دوبوا", role: "مدير محترف",
        text: "حول سنديك برو طريقة عملنا بالكامل. كل شيء مركزي، آلي ومقيمونا أكثر رضا من أي وقت مضى. توفير وقت كبير!",
        building: "سكن البلوط - 45 شقة", rating: 5
      },
      {
        name: "أحمد بن علي", role: "رئيس جمعية",
        text: "الشفافية والبساطة في سنديك برو حسنت علاقاتنا مع المقيمين بشكل كبير. المدفوعات متابعة في الوقت الفعلي والتواصل سلس.",
        building: "برج المتوسط - 120 شقة", rating: 5
      },
      {
        name: "صوفي مارتين", role: "مقيمة",
        text: "أخيراً تطبيق يبسط حقاً الحياة في الملكية المشتركة! يمكنني دفع رسومي، الإبلاغ عن مشكلة والتواصل مع المدير بنقرات قليلة. مثالي!",
        building: "الحدائق المزهرة - مقيمة منذ 3 سنوات", rating: 5
      }
    ],
    
    pricingTitle: "أسعار مناسبة لاحتياجاتك",
    pricingSubtitle: "اختر العرض الذي يناسب وضعك بشكل أفضل",
    plans: [
      { 
        name: "المبتدئ", price: "مجاني", desc: "للملكيات الصغيرة",
        features: ["حتى 10 وحدات سكنية", "إدارة أساسية", "دعم بريد إلكتروني", "مسؤول واحد"],
        cta: "اختر هذه الخطة", popular: false
      },
      { 
        name: "احترافي", price: "49€", desc: "للمدراء المحترفين",
        features: ["حتى 100 وحدة سكنية", "جميع الميزات", "دعم ذو أولوية 24/7", "مسؤولون غير محدودين", "تقارير متقدمة", "API كامل"],
        cta: "اختر هذه الخطة", popular: true
      },
      { 
        name: "مؤسسة", price: "حسب الطلب", desc: "للمجموعات الكبيرة",
        features: ["وحدات سكنية غير محدودة", "ميزات مخصصة", "دعم مخصص", "تدريب مشمول", "SLA مضمون", "تكامل مخصص"],
        cta: "اتصل بنا", popular: false
      }
    ],
    
    ctaTitle: "هل أنت مستعد لتحويل إدارتك العقارية؟",
    ctaSubtitle: "انضم لأكثر من 500 مدير محترف يثقون بنا بالفعل",
    ctaStart: "تجربة مجانية 30 يوم", ctaDemo: "عرض مخصص",
    
    product: "المنتج", company: "الشركة", support: "الدعم",
    newsletter: "النشرة الإخبارية", newsletterDesc: "احصل على آخر أخبارنا",
    subscribe: "اشترك", email: "بريدك الإلكتروني",
    rights: "جميع الحقوق محفوظة"
  }

  const isRTL = language === 'ar'

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gradient-to-b from-slate-50 to-white text-gray-900'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode ? 'rgb(51, 65, 85)' : 'rgb(203, 213, 225)'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * 0.3}px)` }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" style={{ transform: `translateY(${-scrollY * 0.2}px)` }} />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrollY > 50 
          ? darkMode ? 'bg-gray-950/95 shadow-2xl' : 'bg-white/95 shadow-xl' 
          : darkMode ? 'bg-gray-950/80' : 'bg-white/80'
      } border-b ${darkMode ? 'border-gray-800' : 'border-slate-200/60'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">{t.title}</h1>
                <p className={`text-[10px] md:text-xs ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{t.tagline}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <button
                onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                {language === 'fr' ? '🇲🇦 العربية' : '🇫🇷 Français'}
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              
              <button
                onClick={handleLoginRedirect}
                className="ml-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 active:scale-95 transition-all shadow-lg"
              >
                {t.login}
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')} className={`p-2 rounded-lg text-xs ${darkMode ? 'bg-gray-800' : 'bg-slate-100'}`}>
                {language === 'fr' ? 'ع' : 'Fr'}
              </button>
              <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-slate-100'}`}>
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-slate-100'}`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className={`lg:hidden py-4 border-t ${darkMode ? 'border-gray-800' : 'border-slate-200'}`}>
              <button onClick={handleLoginRedirect} className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl">
                {t.login}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm" style={{
                background: darkMode ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)' : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`
              }}>
                <span className="text-xl">🏢</span>
                <span className={darkMode ? 'text-blue-300' : 'text-blue-600'}>
                  {isRTL ? 'الحل الشامل للإدارة العقارية' : 'Solution complète de gestion immobilière'}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block mb-2">{t.heroTitle}</span>
                <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {t.heroSubtitle}
                </span>
              </h1>
              
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                {t.heroDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleLoginRedirect}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-base md:text-lg font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>{t.getStarted}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                
                <button className={`px-8 py-4 rounded-2xl text-base md:text-lg font-semibold border-2 hover:scale-105 active:scale-95 transition-all ${darkMode ? 'border-gray-700 hover:bg-gray-800/50' : 'border-slate-300 hover:bg-slate-100 bg-white/50'} backdrop-blur-sm shadow-xl`}>
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t.watchVideo}</span>
                  </span>
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {t.stats.map((stat, index) => (
                  <div key={index} className={`text-center p-4 md:p-6 rounded-2xl backdrop-blur-xl hover:scale-105 transition-all ${darkMode ? 'bg-gray-800/40 border border-gray-700/50' : 'bg-white/60 border border-slate-200/50 shadow-lg'}`}>
                    <div className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</div>
                    <div className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative mx-auto max-w-2xl">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/20 hover:scale-[1.02] transition-transform duration-500">
                  <div className="aspect-[4/3] relative">
                    <Image src={images.building1} alt="Modern residential building" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
                  </div>
                  
                  <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-xl ${darkMode ? 'bg-gray-900/80 border border-gray-700/50' : 'bg-white/90 border border-white/50'} shadow-2xl`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Performance globale</span>
                      <span className="flex items-center text-green-500 text-sm font-semibold">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        +12.5%
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div><div className="text-2xl font-bold text-blue-500">98%</div><div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Paiements</div></div>
                      <div><div className="text-2xl font-bold text-purple-500">24h</div><div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Réponse</div></div>
                      <div><div className="text-2xl font-bold text-teal-500">4.9★</div><div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>Satisfaction</div></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl transform rotate-12 animate-pulse" style={{animationDuration:'3s'}} />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-teal-500 to-green-500 rounded-3xl shadow-2xl transform -rotate-12 animate-pulse" style={{animationDuration:'4s'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.featuresTitle}</h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{t.featuresSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t.features.map((feature, index) => (
              <div key={index} className={`group rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50' : 'bg-white border border-slate-200/60 shadow-lg hover:shadow-2xl'} backdrop-blur-sm`}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={Object.values(images)[index + 1]} alt={feature.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.color === 'blue' ? 'from-blue-900/60' : feature.color === 'green' ? 'from-green-900/60' : feature.color === 'purple' ? 'from-purple-900/60' : feature.color === 'orange' ? 'from-orange-900/60' : feature.color === 'teal' ? 'from-teal-900/60' : 'from-pink-900/60'} to-transparent`} />
                  <div className="absolute top-4 left-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl ${darkMode ? 'bg-gray-900/60 border border-gray-700/50' : 'bg-white/60 border border-white/50'} shadow-xl`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold">{feature.title}</h3>
                  <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>{feature.desc}</p>
                  <ul className="space-y-2 pt-2">
                    {feature.details.map((detail, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm">
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.color === 'blue' ? 'text-blue-500' : feature.color === 'green' ? 'text-green-500' : feature.color === 'purple' ? 'text-purple-500' : feature.color === 'orange' ? 'text-orange-500' : feature.color === 'teal' ? 'text-teal-500' : 'text-pink-500'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className={darkMode ? 'text-gray-400' : 'text-slate-600'}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.rolesTitle}</h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{t.rolesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {t.roles.map((role, index) => (
              <div
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`group rounded-3xl overflow-hidden cursor-pointer hover:scale-102 transition-all duration-500 ${activeRole === role.id ? `ring-4 ring-offset-4 scale-105 ${role.color === 'blue' ? 'ring-blue-500' : role.color === 'green' ? 'ring-green-500' : 'ring-purple-500'} ${darkMode ? 'ring-offset-gray-950' : 'ring-offset-white'}` : ''} ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50' : 'bg-white border border-slate-200/60 shadow-xl hover:shadow-2xl'} backdrop-blur-sm`}
              >
                <div className="relative h-40 overflow-hidden">
                  <Image src={index === 0 ? images.professional : index === 1 ? images.apartment1 : images.management2} alt={role.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${role.color === 'blue' ? 'from-blue-900/80' : role.color === 'green' ? 'from-green-900/80' : 'from-purple-900/80'} to-transparent`} />
                  <div className="absolute bottom-4 left-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl ${darkMode ? 'bg-gray-900/60 border border-gray-700/50' : 'bg-white/80 border border-white/50'} shadow-2xl group-hover:scale-110 transition-transform`}>
                      <span className="text-3xl">{role.icon}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold flex items-center justify-between">
                    <span>{role.title}</span>
                    {activeRole === role.id && <span className={`text-sm px-3 py-1 rounded-full ${role.color === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : role.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'}`}>Sélectionné</span>}
                  </h3>
                  
                  <ul className="space-y-3">
                    {role.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${role.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' : role.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
                          <svg className={`w-4 h-4 ${role.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : role.color === 'green' ? 'text-green-600 dark:text-green-400' : 'text-purple-600 dark:text-purple-400'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all ${activeRole === role.id ? role.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg' : role.color === 'green' ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg' : darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                    {activeRole === role.id ? '✓ Sélectionné' : 'Sélectionner'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 md:py-24 ${darkMode ? 'bg-gray-900/30' : 'bg-slate-50/50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.howTitle}</h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{t.howSubtitle}</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
              {!isMobile && <div className={`absolute top-14 h-1 ${darkMode ? 'bg-gray-700' : 'bg-slate-300'} hidden md:block`} style={{width:'calc(66.666% + 50px)',left:'calc(16.666% + 30px)'}} />}
              
              {t.steps.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className={`relative rounded-3xl p-8 h-full hover:-translate-y-2 transition-all duration-300 ${darkMode ? 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700/50' : 'bg-white border border-slate-200/60 shadow-lg hover:shadow-2xl'} backdrop-blur-sm`}>
                    <div className="relative z-10 mb-6">
                      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold shadow-xl ${item.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : item.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white' : 'bg-gradient-to-br from-green-500 to-green-600 text-white'}`}>
                        {item.step}
                      </div>
                      <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-900 border-2 border-gray-700' : 'bg-white border-2 border-slate-200'} shadow-lg`}>
                        <span className="text-xl">{item.icon}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-center">{item.title}</h3>
                    <p className={`text-center leading-relaxed ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.testimonialsTitle}</h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{t.testimonialsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {t.testimonials.map((testimonial, index) => (
              <div key={index} className={`group rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50' : 'bg-white border border-slate-200/60 shadow-xl hover:shadow-2xl'} backdrop-blur-sm`}>
                <div className="p-8 space-y-6">
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className={`text-center text-lg italic leading-relaxed ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>"{testimonial.text}"</p>
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{testimonial.name}</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{testimonial.role}</div>
                      <div className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>{testimonial.building}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`py-16 md:py-24 ${darkMode ? 'bg-gray-900/30' : 'bg-slate-50/50'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.pricingTitle}</h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{t.pricingSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {t.plans.map((plan, index) => (
              <div key={index} className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${plan.popular ? 'scale-105 md:scale-110 shadow-2xl ring-4 ring-blue-500/50' : 'hover:scale-105 shadow-xl hover:shadow-2xl'} ${darkMode ? 'bg-gray-800/80 border border-gray-700/50' : 'bg-white border border-slate-200/60'} backdrop-blur-sm`}>
                {plan.popular && <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">⭐ POPULAIRE</div>}
                
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>{plan.desc}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{plan.price}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <svg className="w-6 h-6 flex-shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button onClick={handleLoginRedirect} className={`w-full py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <Image src={images.aerial} alt="Aerial view" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-purple-900/90 to-blue-900/95" />
            </div>
            
            <div className="relative z-10 text-center py-16 md:py-24 px-6 md:px-12 space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">{t.ctaTitle}</h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{t.ctaSubtitle}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button onClick={handleLoginRedirect} className="group px-10 py-5 bg-white text-blue-600 text-lg font-bold rounded-2xl hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all shadow-2xl">
                  <span className="flex items-center justify-center space-x-2">
                    <span>{t.ctaStart}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
                <button className="px-10 py-5 border-2 border-white text-white text-lg font-bold rounded-2xl hover:bg-white/10 hover:scale-105 active:scale-95 transition-all backdrop-blur-sm">{t.ctaDemo}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 md:py-16 ${darkMode ? 'bg-gray-900' : 'bg-slate-900'} text-white`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-xl">SyndicPro</div>
                  <div className="text-gray-400 text-sm">{t.tagline}</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">La solution complète pour une gestion immobilière moderne, efficace et transparente.</p>
            </div>
            
            {[
              {title:t.product,links:['Fonctionnalités','Tarifs','Démo']},
              {title:t.company,links:['À propos','Contact','Carrières']},
              {title:t.support,links:["Centre d'aide",'Documentation','API']}
            ].map((col,i) => (
              <div key={i}>
                <h3 className="font-semibold text-lg mb-4">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map(link => <li key={link}><a href="#" className="text-gray-400 hover:text-white transition text-sm">{link}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-md mx-auto text-center space-y-4">
              <h3 className="font-semibold text-lg">{t.newsletter}</h3>
              <p className="text-gray-400 text-sm">{t.newsletterDesc}</p>
              <div className="flex gap-2">
                <input type="email" placeholder={t.email} className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg">{t.subscribe}</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SyndicPro. {t.rights}</div>
              <div className="flex items-center space-x-4">
                <button onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')} className="text-gray-400 hover:text-white transition text-sm">
                  {language === 'fr' ? '🇲🇦 العربية' : '🇫🇷 Français'}
                </button>
                <button onClick={() => setDarkMode(!darkMode)} className="text-gray-400 hover:text-white transition">
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx global>{`
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:10px}
        ::-webkit-scrollbar-track{background:${darkMode ? '#1f2937' : '#f1f5f9'}}
        ::-webkit-scrollbar-thumb{background:${darkMode ? '#4b5563' : '#cbd5e1'};border-radius:5px}
        ::-webkit-scrollbar-thumb:hover{background:${darkMode ? '#6b7280' : '#94a3b8'}}
      `}</style>
    </div>
  )
}