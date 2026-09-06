import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

const DRIVE_FILE_ID = '1yGnEYXK9YhZ-AFlkO4H-paZ1gmb2Rmlr';
const DOCUMENT_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`;
const DOCUMENT_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '')
  .trim()
  .replace(/\/(rest\/v1|auth\/v1)\/?$/i, '')
  .replace(/\/+$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'work-images';
const LOCAL_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

const fallbackWorks = [
  { id: 'fallback-1', date: '12 آب 2025', title: 'تخليص شحنة مواد بناء', text: 'متابعة ملف شحنة تجارية من ميناء طرطوس وتسليمها إلى وجهتها بأمان.', meta: 'طرطوس · بضائع عامة', media_url: '', media_type: 'image', tone: 'blue' },
  { id: 'fallback-2', date: '05 آب 2025', title: 'إنجاز معاملة حاوية', text: 'تدقيق المستندات وتنسيق إجراءات الكشف والإفراج عن الحاوية.', meta: 'ميناء طرطوس · حاويات', media_url: '', media_type: 'image', tone: 'gold' },
  { id: 'fallback-3', date: '28 تموز 2025', title: 'تجهيز ملف استيراد', text: 'مراجعة أولية لملف استيراد وتجهيز قائمة المتطلبات قبل وصول الشحنة.', meta: 'استشارات · استيراد', media_url: '', media_type: 'image', tone: 'navy' },
];

const services = [
  { icon: '▣', title: 'تخليص الحاويات', text: 'متابعة المعاملة من وصول السفينة حتى تسليم الحاوية، مع تنسيق دقيق مع الجهات المعنية.' },
  { icon: '◈', title: 'البضائع العامة', text: 'حلول واضحة للبضائع التجارية والمعدات والمواد الغذائية وفق الأنظمة النافذة.' },
  { icon: '↗', title: 'الاستيراد والتصدير', text: 'تجهيز الملفات ومراجعة المستندات لتقليل التأخير والمفاجآت في رحلة الشحن.' },
  { icon: '✓', title: 'استشارة جمركية', text: 'قراءة أولية للوثائق وتوضيح المتطلبات والرسوم والخطوات قبل البدء بالإجراءات.' },
];

const updates = [
  { type: 'تنبيه مهم', date: 'يُحدّث دورياً', title: 'مراجعة التعرفة والرسوم قبل وصول الشحنة', text: 'تتغير التعليمات والرسوم بحسب نوع البضاعة وقرارات الجهات المختصة. نراجع معكم الملف قبل المباشرة.' },
  { type: 'إرشاد للمستوردين', date: 'دليل عملي', title: 'اكتمال المستندات يختصر وقت المعاملة', text: 'جهّز بوليصة الشحن والفاتورة التجارية وقائمة التعبئة وأي موافقات مطلوبة قبل وصول الشحنة.' },
  { type: 'من المكتب', date: 'تحديث الخدمة', title: 'متابعة معاملات طرطوس واللاذقية', text: 'ننسّق مع شبكة مندوبي المكتب لتقديم متابعة أقرب للشحنات في المرافئ والمعابر التي نخدمها.' },
];

const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const normalizeWorkEntry = (entry) => ({
  ...entry,
  media_url: entry.media_url || entry.image_url || '',
  media_type: entry.media_type || (entry.video_url ? 'video' : 'image'),
});
const supabaseRequest = async (path, options = {}, token = SUPABASE_ANON_KEY) => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  if (!response.ok) throw new Error(await response.text());
  return response.status === 204 ? null : response.json();
};
const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <header className={`navbar ${scrolled ? 'scrolled' : ''}`}><div className="nav-container"><a className="brand" href="#home" onClick={() => setMenuOpen(false)}><img src="/logo.png" alt="شعار مكتب نضال حسن" /><span><strong>نضال حسن</strong><small>تخليص جمركي · طرطوس</small></span></a><button className="menu-toggle" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button><nav className={`nav-menu ${menuOpen ? 'active' : ''}`}><a href="#services" onClick={() => setMenuOpen(false)}>خدماتنا</a><a href="#work-log" onClick={() => setMenuOpen(false)}>سجل الأعمال</a><a href="#updates" onClick={() => setMenuOpen(false)}>التحديثات</a><a href="#documents" onClick={() => setMenuOpen(false)}>الوثائق</a><a href="#contact" onClick={() => setMenuOpen(false)}>اتصل بنا</a><a className="nav-cta" href="tel:+963931805700">تواصل سريع <span>↗</span></a></nav></div></header>;
}

function Hero() {
  return <section id="home" className="hero"><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="hero-grid" /><div className="hero-noise" /><div className="container hero-layout"><div className="hero-copy reveal"><div className="eyebrow"><span className="live-dot" /> مكتب موثوق في مرفأ طرطوس</div><h1>نُنجز معاملتك<br /><em>بوضوح وثقة.</em></h1><p>حلول تخليص جمركي عملية للتجار والمستوردين، من أول مستند حتى خروج الشحنة إلى وجهتها.</p><div className="hero-actions"><button className="btn btn-primary magnetic" onClick={() => scrollToSection('contact')}>اطلب استشارة مجانية <span>←</span></button><button className="text-link" onClick={() => scrollToSection('services')}>اكتشف خدماتنا <span>↓</span></button></div><div className="hero-proof"><span><b>15+</b> عاماً من الخبرة</span><i /><span><b>4</b> مجالات خدمة</span><i /><span><b>24h</b> متابعة سريعة</span></div></div><div className="hero-visual reveal delay-one"><div className="visual-frame"><div className="visual-glow" /><img src="/avatar.png" alt="المخلص الجمركي نضال حسن" /><div className="visual-caption"><span className="caption-icon">✓</span><span><b>خبرة محلية</b><small>في مرفأ طرطوس</small></span></div></div><div className="floating-card card-top"><span>↗</span><b>ملفك بأيدٍ أمينة</b><small>متابعة دقيقة لكل خطوة</small></div><div className="floating-card card-bottom"><span>◷</span><b>استجابة سريعة</b><small>نتابع معك أولاً بأول</small></div></div></div><div className="scroll-hint">مرّر لاكتشاف المزيد <span>↓</span></div></section>;
}

function SectionHeading({ eyebrow, title, text, light = false }) { return <div className={`section-heading ${light ? 'light' : ''}`}><span className="section-eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>; }

function Services() {
  return <section id="services" className="section services-section"><div className="container"><SectionHeading eyebrow="ما نقدمه" title={<>شريكك في <em>رحلة الشحنة</em></>} text="نعرف تفاصيل العمل في المرفأ، ونحوّل الإجراءات المعقدة إلى خطوات مفهومة يمكن متابعتها." /><div className="service-grid">{services.map((service, index) => <article className="service-card reveal" key={service.title}><div className="service-number">0{index + 1}</div><div className="service-icon">{service.icon}</div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact">اطلب الخدمة <span>←</span></a></article>)}</div></div></section>;
}

function WorkCard({ entry }) {
  const isVideo = entry.media_type === 'video';
  return <article className="work-card reveal visible"><div className={`work-image ${entry.tone || 'blue'} ${entry.media_url ? 'has-photo' : ''}`} style={!isVideo && entry.media_url ? { backgroundImage: `url(${entry.media_url})` } : {}}>{isVideo && entry.media_url ? <video src={entry.media_url} controls preload="metadata" /> : !entry.media_url && <span className="work-symbol">▦</span>}<span className="work-date">{entry.date}</span><span className="work-watermark">NH</span></div><div className="work-body"><span className="work-meta">{entry.meta} · {isVideo ? 'فيديو' : 'صورة'}</span><h3>{entry.title}</h3><p>{entry.text}</p></div></article>;
}

function WorkArchive({ works, onClose }) {
  return <div className="admin-overlay archive-overlay" role="dialog" aria-modal="true"><div className="archive-panel"><div className="archive-header"><div><span className="section-eyebrow">أرشيف الأعمال</span><h2>كل ما أنجزناه</h2><p>آخر الأعمال والصور والفيديوهات المنشورة من المكتب.</p></div><button className="admin-close" onClick={onClose}>×</button></div><div className="archive-grid">{works.map((entry) => <WorkCard entry={entry} key={entry.id} />)}</div></div></div>;
}

function WorkLog({ works, onAdmin, onShowAll }) {
  const latestWorks = works.slice(0, 4);
  return <section id="work-log" className="section work-section"><div className="container"><div className="split-heading"><SectionHeading eyebrow="من أرض الواقع" title={<>كل شحنة لها <em>حكاية نجاح</em></>} text="نعرض أحدث أربعة أعمال فقط في الصفحة الرئيسية، ويمكنك فتح الأرشيف لمشاهدة كل ما نُشر يومياً." /><div className="work-actions"><button className="outline-btn" onClick={onShowAll}>عرض الكل <span>↗</span></button><button className="outline-btn" onClick={onAdmin}>إضافة عمل <span>＋</span></button></div></div><div className="work-grid">{latestWorks.map((entry) => <WorkCard entry={entry} key={entry.id} />)}</div></div></section>;
}

function Updates() {
  return <section id="updates" className="section updates-section"><div className="container"><SectionHeading eyebrow="المعرفة أولاً" title={<>مستجدات تساعدك على <em>الاستعداد</em></>} text="نلخص لك أهم ما ينبغي الانتباه إليه في ملفات الاستيراد والتصدير. المعلومات إرشادية وتُراجع مع الجهات الرسمية قبل كل معاملة." /><div className="updates-layout"><div className="updates-feature"><span className="feature-label">نصيحة المكتب</span><h3>قبل أن تصل شحنتك، دعنا نراجع ملفها.</h3><p>التدقيق المبكر للمستندات يساعد على اكتشاف النواقص وتقدير الخطوات المطلوبة بوضوح أكبر.</p><button className="btn btn-primary" onClick={() => scrollToSection('contact')}>تحدث مع خبير <span>←</span></button></div><div className="updates-list">{updates.map((update, index) => <article className="update-item" key={update.title}><div className="update-index">0{index + 1}</div><div><div className="update-top"><span>{update.type}</span><small>{update.date}</small></div><h3>{update.title}</h3><p>{update.text}</p></div></article>)}</div></div></div></section>;
}

function Documents() {
  return <section id="documents" className="section documents-section"><div className="container document-layout"><div><SectionHeading eyebrow="مركز الوثائق" title={<>المعلومة الصحيحة<br /><em>تختصر الوقت</em></>} text="حمّل ملف البنود الجمركية من Google Drive واحتفظ به كمرجع أولي عند تجهيز شحنتك. راجع النسخة الأحدث من الجهات الرسمية قبل الاعتماد." /><div className="document-note"><span>i</span><p>يمكن تحديث الملف من Drive دون إعادة نشر الموقع؛ يكفي استبدال الرابط في إعدادات الموقع.</p></div></div><div className="document-card"><div className="pdf-icon">PDF</div><div><span className="document-tag">مرجع قابل للعرض والتنزيل</span><h3>ملف البنود الجمركية</h3><p>مستضاف على Google Drive · النسخة الحالية</p><div className="document-actions"><a className="btn btn-primary" href={DOCUMENT_DOWNLOAD_URL} target="_blank" rel="noreferrer">تنزيل الملف <span>↓</span></a><a className="document-view" href={DOCUMENT_URL} target="_blank" rel="noreferrer">عرض في المتصفح ↗</a></div></div></div></div></section>;
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' }); const [status, setStatus] = useState({ type: '', message: '' });
  const getMessage = () => `الاسم: ${formData.name}\nالبريد: ${formData.email}\nالهاتف: ${formData.phone || 'غير مذكور'}\n\nالرسالة:\n${formData.message}`;
  const handleSubmit = (event) => { event.preventDefault(); const subject = encodeURIComponent(`استفسار من ${formData.name}`); const body = encodeURIComponent(getMessage()); window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=nidalcco@gmail.com&su=${subject}&body=${body}`, '_blank', 'noopener,noreferrer'); setStatus({ type: 'success', message: 'فتحنا نافذة Gmail برسالتك جاهزة. اضغط إرسال من Gmail.' }); };
  const openWhatsApp = () => { const body = encodeURIComponent(getMessage()); window.open(`https://wa.me/963931805700?text=${body}`, '_blank', 'noopener,noreferrer'); };
  return <section id="contact" className="section contact-section"><div className="container"><div className="contact-shell"><div className="contact-intro"><SectionHeading light eyebrow="نحن قريبون منك" title={<>لنتحدث عن<br /><em>شُحنتك القادمة</em></>} text="أرسل تفاصيل أولية عن شحنتك، وسنعود إليك لتوضيح المتطلبات والخطوات المناسبة." /><div className="contact-details"><a href="tel:+963931805700"><span>⌕</span><div><small>الهاتف والواتساب</small><b dir="ltr">+963 931 805 700</b></div></a><a href="mailto:nidalcco@gmail.com"><span>@</span><div><small>البريد الإلكتروني</small><b>nidalcco@gmail.com</b></div></a><div><span>⌖</span><div><small>العنوان</small><b>طرطوس · البرانية · خلف مديرية الجمارك</b></div></div></div></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-heading"><span>01 / ابدأ من هنا</span><h3>أرسل تفاصيلك</h3></div>{status.message && <div className={`form-status ${status.type}`}>{status.message}</div>}<div className="form-row"><label>الاسم الكامل<input name="name" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="مثال: أحمد محمد" /></label><label>البريد الإلكتروني<input type="email" name="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="name@example.com" dir="ltr" /></label></div><label>رقم الهاتف<input type="tel" name="phone" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} placeholder="+963 ..." dir="ltr" /></label><label>كيف يمكننا مساعدتك؟<textarea name="message" required value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} placeholder="اكتب نوع البضاعة، المرفأ، وأي تفاصيل متوفرة..." /></label><div className="contact-actions"><button className="btn btn-primary form-submit" type="submit">فتح Gmail <span>←</span></button><button className="whatsapp-btn" type="button" onClick={openWhatsApp}>إرسال عبر واتساب <span>↗</span></button></div><small className="form-note">Gmail وواتساب مجانيان ولا يحتاجان إلى مفاتيح API.</small></form></div></div></section>;
}

function AdminPanel({ onClose, onWorksChanged }) {
  const [session, setSession] = useState(null); const [login, setLogin] = useState({ email: 'nidalcco@gmail.com', password: '' }); const [entry, setEntry] = useState({ title: '', text: '', meta: '', date: '', media_url: '', media_type: 'image' }); const [message, setMessage] = useState('');
  const loginAdmin = async (event) => {
    event.preventDefault();
    if (!hasSupabase) {
      if (login.password !== LOCAL_ADMIN_PASSWORD) { setMessage('كلمة المرور المحلية غير صحيحة.'); return; }
      setSession({ local: true }); setMessage('تم الدخول بالوضع المحلي المجاني.'); return;
    }
    try {
      if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(SUPABASE_URL)) {
        throw new Error('رابط Supabase غير صحيح. استخدم Project URL فقط مثل https://اسم-المشروع.supabase.co من Project Settings → API.');
      }
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: login.email.trim().toLowerCase(), password: login.password }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.error_code === 'email_not_confirmed') throw new Error('الحساب غير مؤكّد. افتح رسالة Supabase في البريد واضغط رابط التأكيد، أو فعّل Auto Confirm User من Authentication → Providers → Email.');
        if (result.error_code === 'invalid_credentials') throw new Error('بيانات الدخول غير صحيحة لهذا المشروع. تأكد من البريد وكلمة المرور ومن أن VITE_SUPABASE_URL يعود إلى المشروع الصحيح.');
        throw new Error(result.msg || result.message || 'تعذر تسجيل الدخول إلى Supabase.');
      }
      setSession(result); setMessage('تم تسجيل الدخول بنجاح.');
    } catch (error) { setMessage(error.message); }
  };
  const addWork = async (event) => { event.preventDefault(); if (!session) return; if (session.local) { const saved = JSON.parse(localStorage.getItem('nidal-work-entries') || '[]'); localStorage.setItem('nidal-work-entries', JSON.stringify([{ ...entry, id: `local-${Date.now()}`, tone: 'blue' }, ...saved])); setEntry({ title: '', text: '', meta: '', date: '', media_url: '', media_type: 'image' }); setMessage('تم حفظ العمل على هذا الجهاز.'); onWorksChanged(); return; } try { await supabaseRequest('work_entries', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ ...entry, tone: 'blue', created_by: session.user.id }) }, session.access_token); setEntry({ title: '', text: '', meta: '', date: '', media_url: '', media_type: 'image' }); setMessage('تم نشر العمل للزوار.'); onWorksChanged(); } catch (error) { setMessage(`تعذر الحفظ: ${error.message}`); } };
  const uploadMedia = async (event) => { const file = event.target.files?.[0]; if (!file) return; const mediaType = file.type.startsWith('video/') ? 'video' : 'image'; if (session?.local) { const reader = new FileReader(); reader.onload = () => setEntry((current) => ({ ...current, media_url: reader.result, media_type: mediaType })); reader.readAsDataURL(file); setMessage('تم تجهيز الوسائط للحفظ على هذا الجهاز.'); return; } if (!session) return; try { const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`; const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${safeName}`, { method: 'POST', headers: { Authorization: `Bearer ${session.access_token}`, apikey: SUPABASE_ANON_KEY, 'Content-Type': file.type }, body: file }); if (!response.ok) throw new Error(await response.text()); setEntry((current) => ({ ...current, media_url: `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${safeName}`, media_type: mediaType })); setMessage('تم رفع الوسائط، اضغط نشر العمل لإضافتها.'); } catch (error) { setMessage(`تعذر رفع الوسائط: ${error.message}`); } };
  return <div className="admin-overlay" role="dialog" aria-modal="true"><div className="admin-panel"><button className="admin-close" onClick={onClose}>×</button>{!session ? <form onSubmit={loginAdmin}><span className="section-eyebrow">لوحة الإدارة المجانية</span><h2>دخول فريق المكتب</h2><p>استخدم حساب Supabase الذي أنشأته بالبريد <b>nidalcco@gmail.com</b>.</p><label>البريد الإلكتروني<input type="email" required value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} /></label><label>كلمة المرور<input type="password" required value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} /></label><button className="btn btn-primary" type="submit">تسجيل الدخول</button></form> : <form onSubmit={addWork}><span className="section-eyebrow">لوحة الإدارة / عمل جديد</span><h2>أضف إلى سجل الأعمال</h2><label>عنوان العمل<input required value={entry.title} onChange={(event) => setEntry({ ...entry, title: event.target.value })} /></label><label>وصف مختصر<textarea required value={entry.text} onChange={(event) => setEntry({ ...entry, text: event.target.value })} /></label><div className="form-row"><label>التصنيف<input required value={entry.meta} onChange={(event) => setEntry({ ...entry, meta: event.target.value })} placeholder="طرطوس · حاويات" /></label><label>التاريخ<input required value={entry.date} onChange={(event) => setEntry({ ...entry, date: event.target.value })} placeholder="07 أيلول 2026" /></label></div><label>صورة أو فيديو <input type="file" accept="image/*,video/*" onChange={uploadMedia} /></label>{entry.media_url && (entry.media_type === 'video' ? <video className="admin-preview" src={entry.media_url} controls /> : <img className="admin-preview" src={entry.media_url} alt="معاينة العمل" />)}<button className="btn btn-primary" type="submit">نشر العمل <span>↗</span></button></form>}{message && <div className="form-status success">{message}</div>}</div></div>;
}

function Footer({ onAdmin }) { return <footer className="footer"><div className="container footer-top"><a className="brand footer-brand" href="#home"><img src="/logo.png" alt="" /><span><strong>نضال حسن</strong><small>تخليص جمركي · طرطوس</small></span></a><p>وضوح في الإجراءات. ثقة في الإنجاز.<br />نخدم الشحنات التي تحرك أعمالكم.</p><div className="footer-links"><a href="#services">خدماتنا</a><a href="#updates">التحديثات</a><a href="#documents">الوثائق</a><button onClick={onAdmin}>إدارة المحتوى</button></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} مكتب نضال حسن للتخليص الجمركي</span><span>طرطوس · سوريا</span></div></footer>; }

function App() {
  const [works, setWorks] = useState(fallbackWorks); const [adminOpen, setAdminOpen] = useState(false); const [archiveOpen, setArchiveOpen] = useState(false);
  const loadWorks = async () => {
    const localWorks = JSON.parse(localStorage.getItem('nidal-work-entries') || '[]').map(normalizeWorkEntry);
    if (localWorks.length) setWorks(localWorks);
    if (!hasSupabase) return;
    try {
      const data = await supabaseRequest('work_entries?select=*&order=created_at.desc');
      if (data?.length) setWorks(data.map(normalizeWorkEntry));
    } catch (error) {
      console.error('Could not load work entries', error);
    }
  };
  useEffect(() => { loadWorks(); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 }); document.querySelectorAll('.reveal').forEach((element) => observer.observe(element)); const onPointer = (event) => document.documentElement.style.setProperty('--mx', `${event.clientX}px`); window.addEventListener('pointermove', onPointer); return () => { observer.disconnect(); window.removeEventListener('pointermove', onPointer); }; }, []);
  return <div className="app"><div className="cursor-glow" /><Navbar /><main><Hero /><Services /><WorkLog works={works} onAdmin={() => setAdminOpen(true)} onShowAll={() => setArchiveOpen(true)} /><Updates /><Documents /><Contact /></main><Footer onAdmin={() => setAdminOpen(true)} />{adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} onWorksChanged={loadWorks} />}{archiveOpen && <WorkArchive works={works} onClose={() => setArchiveOpen(false)} />}</div>;
}

createRoot(document.getElementById('root')).render(<App />);
