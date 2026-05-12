// ========================================
// Nidal Aziz Hassan - Customs Broker Portfolio
// Port of Tartous - React Application
// ========================================

const { useState, useEffect } = React;

// ========================================
// Navigation Component
// ========================================
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'about', label: 'مقدمة' },
    { id: 'portfolio', label: 'المعرض' },
    { id: 'recommendations', label: 'التوصيات' },
    { id: 'team', label: 'الفريق' },
    { id: 'clauses', label: 'الشروط الجمركية' },
    { id: 'contact', label: 'اتصل بنا' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={() => scrollToSection('home')}>
          <div className="logo-icon"><img src="logo.png" alt="Our Logo" /></div>
          <span className="logo-text">مكتب السيد نضال حسن</span>
        </a>
        
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map(item => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

// ========================================
// Hero Section Component
// ========================================
const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-avatar">
          <div className="hero-avatar-placeholder"><img src="avatar.png" alt="Nidal Hasan" /></div>
        </div>
        <h1 className="hero-title">نضال عزيز حسن</h1>
        <p className="hero-subtitle">مخلص جمركي مجاز في ميناء طرطوس</p>
        <p className="hero-description">
          متخصص في تخليص البضائع والشحن من ميناء طرطوس إلى جميع أنحاء سوريا.
           خبرة واسعة في التعامل مع جميع أنواع البضائع والإجراءات الجمركية.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>
            اتصل بنا الآن
          </button>
          <button className="btn btn-secondary" onClick={() => scrollToSection('about')}>
            اعرف المزيد
          </button>
        </div>
      </div>
    </section>
  );
};

// ========================================
// About/Introduction Section
// ========================================
const About = () => {
  const features = [
    { icon: '⚓', title: 'خبرة بحرية', desc: 'سنوات من الخبرة في مجال التخليص الجمركي في ميناء طرطوس' },
    { icon: '📋', title: 'توثيق كامل', desc: 'إتمام جميع الإجراءات الجمركية بدقة وكفاءة عالية' },
    { icon: '🚢', title: 'خدمات متنوعة', desc: 'تخليص البضائع والحاويات والسيارات الأوروبية المستوردة' },
    { icon: '⚡', title: 'سرعة في الإنجاز', desc: 'خدمات سريعة وفعالة لضمان رضا العملاء' }
  ];

  return (
    <section id="about" className="section section-bg">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">مقدمة</h2>
          <p className="section-subtitle">
            تعرف على خدماتنا المهنية في مجال التخليص الجمركي
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-image">
            <div style={{
              width: '100%',
              height: '400px',
              background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8rem',
              color: 'white',
              opacity: 0.5
            }}>
              ⚓
            </div>
          </div>
          
          <div className="about-text">
            <h3>مكتب التخليص الجمركي</h3>
            <p>
              مرحباً بك في مكتب نضال عزيز حسن للتخليص الجمركي. 
              نحن متخصصون في تقديم خدمات التخليص الجمركي المتكاملة في ميناء طرتوس، 
              سوريا. نساعد التجار والمستوردين في إتمام جميع الإجراءات الجمركية بكفاءة 
              وسرعة، مما يوفر عليك الوقت والجهد.
            </p>
            <p>
              تشمل خدماتنا: تخليص البضائع من السفن، الحاويات، السيارات الأوروبية 
              المستوردة، وجميع أنواع البضائع الأخرى. نضمن لك خدمة احترافية وموثوقة.
            </p>
            
            <div className="about-features">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-text">
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ========================================
// Portfolio Section
// ========================================
const Portfolio = () => {
  const portfolioItems = [
    { 
      title: 'تخليص البضائع العامة', 
      desc: 'إتمام إجراءات تخليص جميع أنواع البضائع العامة من الميناء',
      icon: '📦',
      tag: 'بضائع عامة'
    },
    { 
      title: 'تخليص الحاويات', 
      desc: 'خدمات متكاملة لتخليص الحاويات من الميناء إلى وجهتها',
      icon: '🚢',
      tag: 'حاويات'
    },
    { 
      title: 'استيراد السيارات الأوروبية', 
      desc: 'تخليص السيارات الأوروبية المستوردة بجميع أنواعها',
      icon: '🚗',
      tag: 'سيارات'
    },
    { 
      title: 'البضائع الضخمة', 
      desc: 'تخليص المعدات والآلات الضخمة والمستوقة',
      icon: '🏗️',
      tag: 'معدات'
    },
    { 
      title: 'البضائع المبردة', 
      desc: 'خدمات متخصصة للبضائع المبردة والمواد الغذائية',
      icon: '❄️',
      tag: 'بضائع مبردة'
    },
    { 
      title: 'البضائع الخطرة', 
      desc: 'تخليص البضائع الخطرة وفق المعايير الدولية',
      icon: '⚠️',
      tag: 'بضائع خطرة'
    }
  ];

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">المعرض</h2>
          <p className="section-subtitle">
            تعرف على خدمات التخليص الجمركي التي نقدمها
          </p>
        </div>
        
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-item">
              <div className="portfolio-image">
                <div className="portfolio-image-icon">{item.icon}</div>
              </div>
              <div className="portfolio-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <span className="portfolio-tag">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================================
// Recommendations Section
// ========================================
const Recommendations = () => {
  const recommendations = [
    {
      text: "خدمات ممتازة وسريعة في تخليص البضائع. أنصح بشدة بالتعامل مع مكتب نضال عزيز حسن.",
      name: "أكسم يوسف",
      role: "تاجر",
    },
    {
      text: "احترافية عالية في التعامل مع الإجراءات الجمركية. أنجزوا العمل في وقت قياسي.",
      name: "مؤسسة السليم التجارية ",
      role: "مستوردين",
    },
    {
      text: "تجربة مميزة وخدمة عملاء ممتازة. المكتب موثوق به جداً في مجال التخليص الجمركي.",
      name: "شركة خربوطلي",
      role: " تجارة مواد البناء",
    },
  ];

  return (
    <section id="recommendations" className="section section-bg">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">التوصيات</h2>
          <p className="section-subtitle">
            ماذا يقول عملاؤنا عن خدماتنا
          </p>
        </div>
        
        <div className="recommendations-grid">
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <p className="recommendation-text">{rec.text}</p>
              <div className="recommendation-author">
                <div className="author-avatar">{rec.name.charAt(0)}</div>
                <div className="author-info">
                  <h4>{rec.name}</h4>
                  <p>{rec.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================================
// Team Section
// ========================================
const Team = () => {
  const teamMembers = [
    { name: 'نضال عزيز حسن', role: 'المخلص الجمركي', initial: 'مدير مكتب طرطوس' },
    { name: 'دانيال حافظ عفيفة', role: 'مهندس البرمجيات', initial: 'مكتب طرطوس' },
    { name: 'أسامة فيصل حسن', role: 'مندوب جمركي', initial: 'مكتب طرطوس' },
    { name: 'محمد منذر سليمان', role: 'مسؤول الشحن', initial: 'مكتب طرطوس' },
    { name: 'زياد مصطفى خاروفة', role: 'المخلص الجمركي', initial: 'مرفأ اللاذقية' },
    { name: 'عبدو نصري عرب', role: 'المخلص الجمركي', initial: 'معبر باب الهوا ' }
    
  ];

  return (
    <section id="team" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">الفريق</h2>
          <p className="section-subtitle">
            فريق عملنا المتخصص في مجال التخليص الجمركي
          </p>
        </div>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <div className="team-image">
                <div className="team-placeholder">{member.initial}</div>
              </div>
              <div className="team-content">
                <h4>{member.name}</h4>
                <p className="team-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================================
// Customs Clauses Section
// ========================================
const CustomsClauses = () => {
  const clauses = [
    {
      title: 'المستندات المطلوبة',
      text: 'يجب تقديم جميع المستندات المطلوبة بصورة كاملة ودقيقة، بما في ذلك بوليصة الشحن والفاتورة التجارية والقائمة الجمركية.'
    },
    {
      title: 'الفحوصات الجمركية',
      text: 'تخضع جميع البضائع للفحوصات الجمركية اللازمة. يرجى العلم بأن هذه الفحوصات قد تستغرق بعض الوقت حسب طبيعة البضاعة.'
    },
    {
      title: 'الرسوم الجمركية',
      text: 'تحدد الرسوم الجمركية وفق التعريفة الجمركية المعمول بها. نوفر لك الحساب الدقيق لجميع الرسوم قبل الإفراج عن البضاعة.'
    },
    {
      title: 'البضائع المحظورة',
      text: 'هناك بضائع محظورة أو مقيدة الاستيراد。，التي تخضع للقوانين السورية , وهي قابلة للتعديل والتغير باستمرار'
    },
    {
      title: 'الاستئناف والتظلم',
      text: 'في حالة وجود أي خلافات جمركية، يمكنك تقديم تظلم خلال المدة القانونية المحددة. نحن نساعدك في جميع إجراءات الاستئناف.'
    }
  ];

  return (
    <section id="clauses" className="section section-bg">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">الشروط الجمركية</h2>
          <p className="section-subtitle">
            أهم الشروط والمتطلبات الجمركية التي يجب معرفتها
          </p>
        </div>
        
        <div className="clauses-container">
          {clauses.map((clause, index) => (
            <div key={index} className="clause-item">
              <h4>
                <span className="clause-number">{index + 1}</span>
                {clause.title}
              </h4>
              <p>{clause.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================================
// Contact Section
// ========================================
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    // Initialize EmailJS with your public key
    // TODO: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    if (window.emailjs) {
      window.emailjs.init('YOUR_PUBLIC_KEY');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing again
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    // TODO: Replace these with your actual EmailJS credentials
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_email: 'nidalcco@gmail.com'
    };

    if (window.emailjs) {
      window.emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then((response) => {
          setStatus({
            type: 'success',
            message: 'تم إرسال رسالتك بنجاح! سنتواصل معكم قريباً.'
          });
          setFormData({ name: '', email: '', phone: '', message: '' });
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          setStatus({
            type: 'error',
            message: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل مباشرة عبر البريد الإلكتروني أو الهاتف.'
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setStatus({
        type: 'error',
        message: 'خدمة الإرسال غير متوفرة حالياً. يرجى التواصل مباشرة عبر البريد الإلكتروني أو الهاتف.'
      });
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: '📍', title: 'الموقع', text: 'سوريا - طرطوس - البرانية, مقابل البنك الاسلامي (خلف مديرية الجمارك).' },
    { icon: '📞', title: 'الهاتف', text: '805700 931 963+' },
    { icon: '✉️', title: 'البريد الإلكتروني', text: 'nidalcco@gmail.com' },
    { icon: '⏰', title: 'أوقات العمل', text: 'كل أيام الاسيوع (من الساعة 8 صباحا حتى الساعة 4 ظهرا).' }
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">اتصل بنا</h2>
          <p className="section-subtitle">
            تواصل معنا للحصول على استشارة مجانية
          </p>
        </div>
        
        <div className="contact-container">
          <div className="contact-info">
            <h3>معلومات الاتصال</h3>
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-item">
                <div className="contact-icon">{info.icon}</div>
                <div className="contact-details">
                  <h4>{info.title}</h4>
                  <p>{info.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="contact-form">
            <h3>أرسل رسالة</h3>
            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>الاسم</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="أدخل اسمك"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>البريد الإلكتروني</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="أدخل بريدك الإلكتروني"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>رقم الهاتف</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="أدخل رقم هاتفك"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>الرسالة</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="أدخل رسالتك..."
                  disabled={isLoading}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ========================================
// Footer Component
// ========================================
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <h3>مكتب التخليص الجمركي</h3>
            <p>
              مكتب نضال عزيز حسن للتخليص الجمركي - ميناء طرطوس. نقدم خدمات تخليص
              جمركي احترافية لجميع أنواع البضائع.
            </p>
            <br />
            <p>
              خدماتنا تشمل كلا من : طرطوس - اللاذقية -باب الهوا. نحن ملتزمون
              بتقديم أفضل خدمة لعملائنا في جميع أنحاء سوريا.
            </p>
          </div>
          <div className="footer-links">
            <h4>روابط سريعة</h4>
            <ul>
              <li>
                <a href="#home">الرئيسية</a>
              </li>
              <li>
                <a href="#about">مقدمة</a>
              </li>
              <li>
                <a href="#portfolio">المعرض</a>
              </li>
              <li>
                <a href="#contact">اتصل بنا</a>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>اتصل بنا</h4>
            <p>ميناء طرطوس، سوريا</p>
            <p>805700 931 963+</p>
            <p>nidalcco@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            جميع الحقوق محفوظة © {currentYear} - مكتب نضال عزيز حسن للتخليص
            الجمركي
          </p>
        </div>
      </div>
    </footer>
  );
};

// ========================================
// Main App Component
// ========================================
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Recommendations />
      <Team />
      <CustomsClauses />
      <Contact />
      <Footer />
    </div>
  );
};

// ========================================
// Render the App
// ========================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
