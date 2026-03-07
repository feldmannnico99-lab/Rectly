import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, ChevronDown, ArrowLeft, CircleDollarSign, HelpCircle, Plus, Download } from 'lucide-react'
import LightPillar from './components/LightPillar'
import PhoneSlider from './components/PhoneSlider'
import RotatingText from './components/RotatingText'
import { PricingCard } from './components/ui/animated-glassy-pricing'
import './App.css'

/* ─── Content (DE + EN) ────────────────────────────────── */

const BASE = import.meta.env.BASE_URL  // '/Rectly/' in prod, '/' in dev

const CONTENT = {
  de: {
    dock: { pricing: 'Preise', faq: 'FAQ', appstore: 'App Store' },
    hero: {
      kicker: 'iOS Meeting-App',
      forLine: 'Dein smarter Assistent für',
      rotating: ['Meetings', 'Interviews', 'Vorlesungen', 'Konferenzen', 'Kundengespräche', 'Brainstormings', 'Präsentationen', 'Teamcalls', 'Ideen'],
      sub: 'KI-gestützte Transkription · Automatische Sprechererkennung · Smarte Zusammenfassungen – komplett lokal oder per API.',
      badgeSrc: `${BASE}images/app-store-badge-de.svg`,
      badgeAlt: 'Laden im App Store',
    },
    features: {
      eyebrow: 'Features',
      local: {
        mode: 'Lokaler Modus',
        title: 'Komplett lokal nutzbar',
        body: 'Rectly funktioniert vollständig auf Deinem Gerät – ohne KI, ohne Account und ohne Internetverbindung. Aufnahme, Transkription via Apple Speech Recognition und manuelle Sprecherzuordnung inklusive.',
        pills: ['Offline', 'Kein Account', 'Apple Speech', 'Kostenlos', 'Privat'],
      },
      api: {
        mode: 'API-Modus',
        title: 'KI-Power mit eigenen Keys',
        body: 'Wer mehr möchte, schaltet mit eigenen OpenAI API-Keys leistungsstarke KI-Features frei: automatische Transkription, Sprechererkennung, Zusammenfassungen, Chat und individuelle Prompts.',
        pills: ['OpenAI Whisper', 'GPT-4', 'Auto-Sprecher', 'KI-Chat', 'Eigene Prompts'],
      },
    },
    pricing: {
      eyebrow: 'Preise',
      headline: 'Wähle Deinen Plan',
      plans: [
        {
          planName: 'Free',
          description: 'Alles Wichtige, für immer kostenlos',
          price: '0 €',
          features: ['60 Min. Aufnahme / Woche', 'Lokale Transkription (Apple)', 'PDF-Export', 'Manuelle Sprechererkennung', 'Planer', 'Kommentare & Anhänge', 'Reminder'],
          buttonText: 'Kostenlos starten',
          isPopular: false,
          buttonVariant: 'secondary',
        },
        {
          planName: 'Basis',
          description: 'Für regelmäßige Meetings',
          price: '1,99 €',
          features: ['Alles aus Free', '10 Std. Aufnahme / Monat', 'API-Key-Anbindung möglich (OpenAI)', 'KI-Transkription (eigener Key)', 'Automatische Sprechererkennung (OpenAI)', 'KI-Zusammenfassung & Chat', 'Eigene KI-Prompts', 'Planer bearbeiten und hinzufügen'],
          buttonText: 'Jetzt upgraden',
          isPopular: true,
          buttonVariant: 'primary',
        },
        {
          planName: 'Pro',
          description: 'Maximale Flexibilität',
          price: '3,99 €',
          features: ['Unbegrenzte Aufnahmezeit', 'Alles aus Basis'],
          buttonText: 'Pro testen',
          isPopular: false,
          buttonVariant: 'secondary',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      headline: 'Häufig gestellte Fragen',
      items: [
        { q: 'Wo werden meine API-Schlüssel gespeichert?', a: 'Deine API-Schlüssel werden verschlüsselt im iOS Keychain gespeichert und sind durch biometrische Authentifizierung (Face ID / Touch ID) geschützt. Sie verlassen niemals Dein Gerät.' },
        { q: 'Wo liegen meine Aufnahmen und Daten?', a: 'Alle Daten werden lokal auf Deinem iPhone gespeichert. Nichts wird automatisch in die Cloud synchronisiert. Kein Rectly-Server, kein Account-Zwang.' },
        { q: 'Werden meine Aufnahmen zu externen Servern hochgeladen?', a: 'Lokaler Modus: Nein – alles bleibt auf Deinem Gerät. API-Modus: Die Audiodatei wird temporär an OpenAI zur Transkription gesendet. Rectly selbst speichert keine Aufnahmen.' },
        { q: 'Kann ich die App auch ohne API-Schlüssel nutzen?', a: 'Ja! Im lokalen Modus nutzt Rectly Apples Spracherkennung – kostenlos, offline und ganz ohne API-Schlüssel. Den Modus wählst Du in den Einstellungen.' },
        { q: 'Wie viel kostet die Transkription im API-Modus?', a: 'OpenAI Whisper kostet ca. 0,6 Cent pro Minute Audio. Die anfallenden Kosten werden im Kosten-Dashboard direkt in der App angezeigt, damit Du immer den Überblick behältst.' },
        { q: 'Welche Sprachen werden unterstützt?', a: 'Lokal: Alle von Apples Spracherkennung unterstützten Sprachen. API-Modus: Über 50 Sprachen dank OpenAI Whisper – darunter Deutsch, Englisch, Spanisch, Französisch und viele mehr.' },
        { q: 'Wie funktioniert die Sprechererkennung?', a: 'Im API-Modus erkennt OpenAI automatisch verschiedene Sprecher anhand von Inhalt und Kontext. Du weist ihnen danach Namen zu. Im lokalen Modus kannst Du Sprecher manuell markieren und benennen.' },
        { q: 'Kann ich Sprechernamen nachträglich ändern?', a: 'Ja, Sprechernamen lassen sich nach der Transkription und auch jederzeit später in den Aufnahmedetails anpassen.' },
        { q: 'Welche KI-Funktionen bietet die App?', a: 'Mit eigenem API-Schlüssel stehen Dir automatische Zusammenfassungen, ein KI-Chat zu Deinen Aufnahmen, KI-Assistenten mit eigenen Prompt-Templates und mehrere Entwürfe pro Aufnahme zur Verfügung.' },
        { q: 'Warum sehe ich keine KI-Funktionen?', a: 'KI-Features sind ausschließlich im API-Modus verfügbar. Wechsle in den Einstellungen von "Lokal" auf "API", um sie freizuschalten – ein eigener OpenAI-Schlüssel wird benötigt.' },
        { q: 'Kann ich Transkripte exportieren?', a: 'Ja, als professionell formatierte A4-PDFs – mit Transkript, Sprecher-Labels, Zeitstempeln, Kommentaren und optional KI-Zusammenfassungen.' },
        { q: 'Kann ich das Transkript bearbeiten?', a: 'Ja, direkt in der App – mit Texteditor, Audio-Synchronisation und der Möglichkeit, Sprecher-Tags gezielt einzufügen oder zu verschieben.' },
        { q: 'Welche iOS-Version benötige ich?', a: 'Rectly benötigt mindestens iOS 16.' },
        { q: 'Nutzt die App externe Bibliotheken?', a: 'Nein. Rectly setzt ausschließlich auf Apple-eigene Frameworks – keine externen SDKs, keine Tracking-Bibliotheken, keine versteckten Abhängigkeiten.' },
      ],
    },
    footer: { home: 'Startseite', privacy: 'Datenschutz', privacyApp: 'Datenschutz App', imprint: 'Impressum', support: 'Support', copyright: '© 2026 Rectly. Alle Rechte vorbehalten.' },
    legal: { back: 'Zurück zur Startseite' },
  },

  en: {
    dock: { pricing: 'Pricing', faq: 'FAQ', appstore: 'App Store' },
    hero: {
      kicker: 'iOS Meeting App',
      forLine: 'Your smart assistant for',
      rotating: ['Meetings', 'Interviews', 'Lectures', 'Conferences', 'Client calls', 'Brainstorming', 'Presentations', 'Team calls', 'Ideas'],
      sub: 'AI-powered transcription · Automatic speaker recognition · Smart summaries – fully local or via API.',
      badgeSrc: `${BASE}images/app-store-badge-en.svg`,
      badgeAlt: 'Download on the App Store',
    },
    features: {
      eyebrow: 'Features',
      local: {
        mode: 'Local Mode',
        title: 'Fully local operation',
        body: 'Rectly runs entirely on your device – no AI, no account, no internet connection required. Recording, transcription via Apple Speech Recognition, and manual speaker assignment included.',
        pills: ['Offline', 'No Account', 'Apple Speech', 'Free', 'Private'],
      },
      api: {
        mode: 'API Mode',
        title: 'AI power with your own keys',
        body: 'Want more? Unlock powerful AI features with your own OpenAI API keys: automatic transcription, speaker recognition, summaries, chat, and custom prompts.',
        pills: ['OpenAI Whisper', 'GPT-4', 'Auto-Speaker', 'AI Chat', 'Custom Prompts'],
      },
    },
    pricing: {
      eyebrow: 'Pricing',
      headline: 'Choose your plan',
      plans: [
        {
          planName: 'Free',
          description: 'Everything essential, free forever',
          price: '€0',
          features: ['60 min recording / week', 'Local transcription (Apple)', 'PDF export', 'Manual speaker recognition', 'Planner', 'Comments & attachments', 'Reminders'],
          buttonText: 'Start for free',
          isPopular: false,
          buttonVariant: 'secondary',
        },
        {
          planName: 'Basic',
          description: 'For regular meetings',
          price: '€1.99',
          features: ['Everything in Free', '10 hrs recording / month', 'API key integration (OpenAI)', 'AI transcription (your own key)', 'Automatic speaker recognition (OpenAI)', 'AI summaries & chat', 'Custom AI prompts', 'Edit and add planner entries'],
          buttonText: 'Upgrade now',
          isPopular: true,
          buttonVariant: 'primary',
        },
        {
          planName: 'Pro',
          description: 'Maximum flexibility',
          price: '€3.99',
          features: ['Unlimited recording time', 'Everything in Basic'],
          buttonText: 'Try Pro',
          isPopular: false,
          buttonVariant: 'secondary',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      headline: 'Frequently asked questions',
      items: [
        { q: 'Where are my API keys stored?', a: 'Your API keys are stored encrypted in the iOS Keychain and protected by biometric authentication (Face ID / Touch ID). They never leave your device.' },
        { q: 'Where are my recordings and data stored?', a: 'All data is stored locally on your iPhone. Nothing is automatically synced to the cloud. No Rectly server, no mandatory account.' },
        { q: 'Are my recordings uploaded to external servers?', a: 'Local mode: No – everything stays on your device. API mode: The audio file is temporarily sent to OpenAI for transcription. Rectly itself does not store any recordings.' },
        { q: 'Can I use the app without an API key?', a: 'Yes! In local mode, Rectly uses Apple\'s speech recognition – free, offline, and without any API key. You can select the mode in the settings.' },
        { q: 'How much does transcription cost in API mode?', a: 'OpenAI Whisper costs approximately $0.006 per minute of audio. The incurred costs are displayed in the cost dashboard directly in the app, so you always have an overview.' },
        { q: 'Which languages are supported?', a: 'Local: All languages supported by Apple\'s speech recognition. API mode: Over 50 languages thanks to OpenAI Whisper – including English, German, Spanish, French, and many more.' },
        { q: 'How does speaker recognition work?', a: 'In API mode, OpenAI automatically identifies different speakers based on content and context. You then assign names to them. In local mode, you can manually mark and name speakers.' },
        { q: 'Can I change speaker names afterwards?', a: 'Yes, speaker names can be edited after transcription and at any time later in the recording details.' },
        { q: 'What AI features does the app offer?', a: 'With your own API key, you have access to automatic summaries, an AI chat about your recordings, AI assistants with custom prompt templates, and multiple drafts per recording.' },
        { q: 'Why can\'t I see AI features?', a: 'AI features are exclusively available in API mode. Switch from "Local" to "API" in the settings to unlock them – your own OpenAI key is required.' },
        { q: 'Can I export transcripts?', a: 'Yes, as professionally formatted A4 PDFs – with transcript, speaker labels, timestamps, comments, and optional AI summaries.' },
        { q: 'Can I edit the transcript?', a: 'Yes, directly in the app – with a text editor, audio synchronization, and the ability to insert or move speaker tags precisely.' },
        { q: 'Which iOS version do I need?', a: 'Rectly requires at least iOS 16.' },
        { q: 'Does the app use third-party libraries?', a: 'No. Rectly relies exclusively on Apple\'s own frameworks – no external SDKs, no tracking libraries, no hidden dependencies.' },
      ],
    },
    footer: { home: 'Home', privacy: 'Privacy Policy', privacyApp: 'App Privacy', imprint: 'Legal Notice', support: 'Support', copyright: '© 2026 Rectly. All rights reserved.' },
    legal: { back: 'Back to home' },
  },
}

/* ─── Background ────────────────────────────────────────── */
function BG() {
  return (
    <div className="bg-fixed">
      <LightPillar
        topColor="#0475f5"
        bottomColor="#0040cc"
        intensity={0.85}
        rotationSpeed={0.15}
        interactive={false}
        glowAmount={0.005}
        pillarWidth={8}
        pillarHeight={0.5}
        noiseIntensity={0.4}
        pillarRotation={0}
      />
    </div>
  )
}

/* ─── Flag SVGs ─────────────────────────────────────────── */
function UKFlag() {
  return (
    <svg className="lang-toggle-flag" width="24" height="16" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#012169" />
      {/* White saltire */}
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
      {/* Red saltire (simplified, without full offset) */}
      <path d="M0,0 L60,40" stroke="#C8102E" strokeWidth="4.5" />
      <path d="M60,0 L0,40" stroke="#C8102E" strokeWidth="4.5" />
      {/* White cross */}
      <rect x="24" y="0" width="12" height="40" fill="#fff" />
      <rect x="0" y="14" width="60" height="12" fill="#fff" />
      {/* Red cross */}
      <rect x="26" y="0" width="8" height="40" fill="#C8102E" />
      <rect x="0" y="16" width="60" height="8" fill="#C8102E" />
    </svg>
  )
}

function DEFlag() {
  return (
    <svg className="lang-toggle-flag" width="24" height="16" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#000" />
      <rect y="13.3" width="60" height="13.4" fill="#DD0000" />
      <rect y="26.7" width="60" height="13.3" fill="#FFCE00" />
    </svg>
  )
}

/* ─── Language Toggle ───────────────────────────────────── */
function LangToggle({ lang, onToggle }) {
  const toEN = lang === 'de'
  return (
    <button
      className="lang-toggle"
      onClick={onToggle}
      aria-label={toEN ? 'Switch to English' : 'Zu Deutsch wechseln'}
      title={toEN ? 'Switch to English' : 'Zu Deutsch wechseln'}
    >
      {toEN ? <UKFlag /> : <DEFlag />}
      <span className="lang-toggle-label">{toEN ? 'EN' : 'DE'}</span>
    </button>
  )
}

/* ─── Dock ──────────────────────────────────────────────── */
function Dock({ scrollTo, labels }) {
  const [hovered, setHovered] = useState(null)

  const items = [
    { id: 'preise', label: labels.pricing, icon: <CircleDollarSign size={22} strokeWidth={1.5} />, action: () => scrollTo('preise') },
    { id: 'faq',    label: labels.faq,     icon: <HelpCircle size={22} strokeWidth={1.5} />,      action: () => scrollTo('faq') },
    { id: 'appstore', label: labels.appstore, icon: <Download size={20} />, action: () => window.open('https://apps.apple.com/', '_blank') },
  ]

  const getScale = (i) => {
    if (hovered === null) return 1
    const dist = Math.abs(i - hovered)
    if (dist === 0) return 1.45
    if (dist === 1) return 1.2
    return 1
  }

  return (
    <nav className="dock">
      {items.map((item, i) => (
        <button
          key={item.id}
          className="dock-item"
          style={{
            transform: `scale(${getScale(i)}) translateY(${hovered === i ? '-4px' : '0px'})`,
            transition: 'transform 0.22s cubic-bezier(.34,1.56,.64,1)',
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={item.action}
          aria-label={item.label}
        >
          <span className="dock-tooltip">{item.label}</span>
          <div className="dock-icon">{item.icon}</div>
        </button>
      ))}
    </nav>
  )
}

/* ─── Legal Page ────────────────────────────────────────── */
function LegalPage({ section, onBack, lang }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  const c = CONTENT[lang]

  const ImpressumDE = () => (
    <>
      <h1>Impressum</h1>
      <p>nila-pure GbR<br />Klausenburger Gasse 8<br />51674 Wiehl</p>
      <p><strong>Vertreten durch:</strong><br />Laura Frahm, Nico Feldmann</p>
      <h2>Kontakt</h2>
      <p>E-Mail: <a href="mailto:support@rectly.app">support@rectly.app</a><br />(Diese E-Mail Adresse ist keine Technische Support Adresse - die nila-pure GbR und Rectly.app stellt den Benutzern und Kunden keine verbindliche Support Anlaufstelle zur Verfügung)</p>
      <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <p>Quelle: <a href="https://www.e-recht24.de/impressum-generator.html" target="_blank" rel="noreferrer">https://www.e-recht24.de/impressum-generator.html</a></p>
    </>
  )

  const ImpressumEN = () => (
    <>
      <h1>Legal Notice</h1>
      <p>nila-pure GbR<br />Klausenburger Gasse 8<br />51674 Wiehl<br />Germany</p>
      <p><strong>Represented by:</strong><br />Laura Frahm, Nico Feldmann</p>
      <h2>Contact</h2>
      <p>Email: <a href="mailto:support@rectly.app">support@rectly.app</a><br />(This email address is not a technical support address – nila-pure GbR and Rectly.app does not provide users and customers with a binding support contact.)</p>
      <h2>Consumer Dispute Resolution / Universal Arbitration Board</h2>
      <p>We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
      <p>Source: <a href="https://www.e-recht24.de/impressum-generator.html" target="_blank" rel="noreferrer">https://www.e-recht24.de/impressum-generator.html</a></p>
    </>
  )

  const DatenschutzDE = () => (
    <>
      <h1>Datenschutzerklärung</h1>
      <h2>1. Datenschutz auf einen Blick</h2>
      <h3>Allgemeine Hinweise</h3>
      <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
      <h3>Datenerfassung auf dieser Website</h3>
      <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
      <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.</p>
      <h4>Wie erfassen wir Ihre Daten?</h4>
      <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
      <p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>
      <h4>Wofür nutzen wir Ihre Daten?</h4>
      <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.</p>
      <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
      <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
      <p>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>
      <h2>2. Hosting</h2>
      <h3>Externes Hosting</h3>
      <p>Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.</p>
      <p>Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
      <p>Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.</p>
      <p>Wir setzen folgende(n) Hoster ein:</p>
      <p>GitHub, Inc.<br />88 Colin P Kelly Jr St<br />San Francisco, CA 94107<br />USA</p>
      <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
      <h3>Datenschutz</h3>
      <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
      <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
      <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
      <h3>Hinweis zur verantwortlichen Stelle</h3>
      <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
      <p>nila-pure GbR<br />Klausenburger Gasse 8<br />51674 Wiehl</p>
      <p><strong>Vertreten durch:</strong><br />Laura Frahm, Nico Feldmann</p>
      <p><strong>Kontakt</strong><br />E-Mail: <a href="mailto:support@rectly.app">support@rectly.app</a><br />(Diese E-Mail Adresse ist keine Technische Support Adresse - die nila-pure GbR und Rectly.app stellt den Benutzern und Kunden keine verbindliche Support Anlaufstelle zur Verfügung)</p>
      <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
      <h3>Speicherdauer</h3>
      <p>Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.</p>
      <h3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
      <p>Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.</p>
      <h3>Empfänger von personenbezogenen Daten</h3>
      <p>Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.</p>
      <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
      <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>
      <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
      <p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p>
      <p>WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p>
      <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
      <p>Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>
      <h3>Recht auf Datenübertragbarkeit</h3>
      <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>
      <h3>Auskunft, Berichtigung und Löschung</h3>
      <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.</p>
      <h3>Recht auf Einschränkung der Verarbeitung</h3>
      <p>Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:</p>
      <ul>
        <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
        <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
        <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
        <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
      </ul>
      <p>Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.</p>
      <h3>SSL- bzw. TLS-Verschlüsselung</h3>
      <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
      <p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
      <h2>4. Datenerfassung auf dieser Website</h2>
      <h3>Server-Log-Dateien</h3>
      <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
      <p>Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.</p>
      <h3>Anfrage per E-Mail, Telefon oder Telefax</h3>
      <p>Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
      <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.</p>
      <p>Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.</p>
      <p>Quelle: <a href="https://www.e-recht24.de" target="_blank" rel="noreferrer">https://www.e-recht24.de</a></p>
    </>
  )

  const DatenschutzEN = () => (
    <>
      <h1>Privacy Policy</h1>
      <h2>1. Privacy at a Glance</h2>
      <h3>General Information</h3>
      <p>The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you. For detailed information on data protection, please refer to our privacy policy listed below.</p>
      <h3>Data Collection on This Website</h3>
      <h4>Who is responsible for data collection on this website?</h4>
      <p>Data processing on this website is carried out by the website operator. You can find their contact details in the section "Information on the Responsible Party" in this privacy policy.</p>
      <h4>How do we collect your data?</h4>
      <p>Your data is collected in part by you providing it to us. This may include data you enter in a contact form, for example.</p>
      <p>Other data is collected automatically or with your consent when you visit the website by our IT systems. This is primarily technical data (e.g. internet browser, operating system, or time of page visit). This data is collected automatically as soon as you enter this website.</p>
      <h4>What do we use your data for?</h4>
      <p>Some of the data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior. If contracts can be concluded or initiated via the website, the transmitted data will also be processed for contract offers, orders, or other service requests.</p>
      <h4>What rights do you have regarding your data?</h4>
      <p>You have the right to obtain information about the origin, recipient, and purpose of your stored personal data free of charge at any time. You also have the right to request the correction or deletion of this data. If you have given your consent to data processing, you can revoke this consent at any time. In addition, you have the right to request the restriction of processing of your personal data under certain circumstances. You also have the right to lodge a complaint with the competent supervisory authority.</p>
      <p>You can contact us at any time regarding this and other questions on data protection.</p>
      <h2>2. Hosting</h2>
      <h3>External Hosting</h3>
      <p>This website is hosted externally. The personal data collected on this website is stored on the servers of the host(s). This may primarily include IP addresses, contact requests, meta and communication data, contract data, contact details, names, website access data, and other data generated via a website.</p>
      <p>External hosting is carried out for the purpose of fulfilling our contract with our potential and existing customers (Art. 6(1)(b) GDPR) and in the interest of a secure, fast, and efficient provision of our online offering by a professional provider (Art. 6(1)(f) GDPR). If appropriate consent has been requested, processing is carried out exclusively on the basis of Art. 6(1)(a) GDPR and § 25(1) TDDDG. Consent can be revoked at any time.</p>
      <p>Our host(s) will only process your data to the extent necessary to fulfill their service obligations and will follow our instructions regarding this data.</p>
      <p>We use the following host(s):</p>
      <p>GitHub, Inc.<br />88 Colin P Kelly Jr St<br />San Francisco, CA 94107<br />USA</p>
      <h2>3. General Information and Mandatory Disclosures</h2>
      <h3>Data Protection</h3>
      <p>The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.</p>
      <p>When you use this website, various personal data is collected. Personal data is data with which you can be personally identified. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this is done.</p>
      <p>We would like to point out that data transmission over the internet (e.g. when communicating by email) may be subject to security vulnerabilities. Complete protection of data against access by third parties is not possible.</p>
      <h3>Information on the Responsible Party</h3>
      <p>The responsible party for data processing on this website is:</p>
      <p>nila-pure GbR<br />Klausenburger Gasse 8<br />51674 Wiehl<br />Germany</p>
      <p><strong>Represented by:</strong><br />Laura Frahm, Nico Feldmann</p>
      <p><strong>Contact</strong><br />Email: <a href="mailto:support@rectly.app">support@rectly.app</a><br />(This email address is not a technical support address – nila-pure GbR and Rectly.app does not provide users and customers with a binding support contact.)</p>
      <p>The responsible party is the natural or legal person who alone or jointly with others decides on the purposes and means of processing personal data (e.g. names, email addresses, etc.).</p>
      <h3>Retention Period</h3>
      <p>Unless a more specific retention period has been stated within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you make a legitimate request for deletion or revoke your consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data (e.g. tax or commercial law retention periods); in the latter case, deletion will take place after these reasons cease to apply.</p>
      <h3>General Information on the Legal Bases for Data Processing</h3>
      <p>If you have consented to data processing, we process your personal data on the basis of Art. 6(1)(a) GDPR or Art. 9(2)(a) GDPR if special categories of data are processed. If you have consented to the storage of cookies or to the access of information on your device, data processing is additionally carried out on the basis of § 25(1) TDDDG. Consent can be revoked at any time. If your data is required for the performance of a contract or for the implementation of pre-contractual measures, we process your data on the basis of Art. 6(1)(b) GDPR. Furthermore, if required to fulfill a legal obligation, we process it on the basis of Art. 6(1)(c) GDPR. Data processing may also be carried out on the basis of our legitimate interest pursuant to Art. 6(1)(f) GDPR.</p>
      <h3>Recipients of Personal Data</h3>
      <p>We only disclose personal data to external parties if this is necessary in the context of contract performance, if we are legally obliged to do so, if we have a legitimate interest pursuant to Art. 6(1)(f) GDPR in the disclosure, or if another legal basis permits the data transfer.</p>
      <h3>Revocation of Your Consent to Data Processing</h3>
      <p>Many data processing operations are only possible with your explicit consent. You can revoke consent already given at any time. The lawfulness of data processing carried out before the revocation remains unaffected.</p>
      <h3>Right to Object to Data Collection in Special Cases and to Direct Marketing (Art. 21 GDPR)</h3>
      <p>IF DATA PROCESSING IS CARRIED OUT ON THE BASIS OF ART. 6(1)(E) OR (F) GDPR, YOU HAVE THE RIGHT AT ANY TIME TO OBJECT, ON GROUNDS RELATING TO YOUR PARTICULAR SITUATION, TO THE PROCESSING OF YOUR PERSONAL DATA; THIS ALSO APPLIES TO PROFILING BASED ON THESE PROVISIONS. IF YOU OBJECT, WE WILL NO LONGER PROCESS YOUR AFFECTED PERSONAL DATA UNLESS WE CAN DEMONSTRATE COMPELLING LEGITIMATE GROUNDS FOR THE PROCESSING WHICH OVERRIDE YOUR INTERESTS, RIGHTS AND FREEDOMS, OR THE PROCESSING SERVES TO ASSERT, EXERCISE OR DEFEND LEGAL CLAIMS (OBJECTION PURSUANT TO ART. 21(1) GDPR).</p>
      <p>IF YOUR PERSONAL DATA IS PROCESSED FOR DIRECT MARKETING PURPOSES, YOU HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF PERSONAL DATA CONCERNING YOU FOR SUCH MARKETING; THIS ALSO APPLIES TO PROFILING INSOFAR AS IT IS ASSOCIATED WITH SUCH DIRECT MARKETING (OBJECTION PURSUANT TO ART. 21(2) GDPR).</p>
      <h3>Right to Lodge a Complaint with the Competent Supervisory Authority</h3>
      <p>In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority, in particular in the Member State of their habitual residence, place of work, or place of the alleged violation.</p>
      <h3>Right to Data Portability</h3>
      <p>You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to a third party in a commonly used, machine-readable format. If you request the direct transfer of data to another responsible party, this will only be done insofar as it is technically feasible.</p>
      <h3>Access, Rectification and Deletion</h3>
      <p>Within the framework of the applicable statutory provisions, you have the right to obtain information about your stored personal data, its origin and recipients, and the purpose of data processing free of charge at any time. You may also have the right to rectify or delete this data. You can contact us at any time regarding this and other questions on personal data.</p>
      <h3>Right to Restriction of Processing</h3>
      <p>You have the right to request the restriction of processing of your personal data. You can contact us at any time regarding this. The right to restriction of processing applies in the following cases:</p>
      <ul>
        <li>If you dispute the accuracy of your personal data stored with us, we generally need time to verify this. For the duration of the review, you have the right to request that processing be restricted.</li>
        <li>If the processing of your personal data was/is unlawful, you can request restriction instead of deletion.</li>
        <li>If we no longer need your personal data, but you need it to exercise, defend, or assert legal claims, you have the right to request restriction instead of deletion.</li>
        <li>If you have lodged an objection pursuant to Art. 21(1) GDPR, a balancing of your interests and ours must be carried out. As long as it has not yet been determined whose interests prevail, you have the right to request restriction.</li>
      </ul>
      <p>If you have restricted the processing of your personal data, this data – apart from its storage – may only be processed with your consent or for the purpose of asserting, exercising, or defending legal claims or protecting the rights of another natural or legal person or for reasons of important public interest.</p>
      <h3>SSL and TLS Encryption</h3>
      <p>For security reasons and to protect the transmission of confidential content, this site uses SSL or TLS encryption. You can recognize an encrypted connection by the fact that the address line of the browser changes from "http://" to "https://" and by the lock symbol in your browser line.</p>
      <p>If SSL or TLS encryption is activated, the data you transmit to us cannot be read by third parties.</p>
      <h2>4. Data Collection on This Website</h2>
      <h3>Server Log Files</h3>
      <p>The provider of the pages automatically collects and stores information in server log files, which your browser automatically transmits to us. These are:</p>
      <ul>
        <li>Browser type and browser version</li>
        <li>Operating system used</li>
        <li>Referrer URL</li>
        <li>Hostname of the accessing computer</li>
        <li>Time of the server request</li>
        <li>IP address</li>
      </ul>
      <p>This data is not merged with other data sources.</p>
      <p>The collection of this data is based on Art. 6(1)(f) GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimization of their website – for this purpose, server log files must be recorded.</p>
      <h3>Inquiries by Email, Phone, or Fax</h3>
      <p>If you contact us by email, phone, or fax, your inquiry including all resulting personal data (name, inquiry) will be stored and processed by us for the purpose of handling your request. We do not pass on this data without your consent.</p>
      <p>The processing of this data is based on Art. 6(1)(b) GDPR if your inquiry is related to the performance of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective handling of inquiries (Art. 6(1)(f) GDPR) or on your consent (Art. 6(1)(a) GDPR) if this was requested; consent can be revoked at any time.</p>
      <p>The data you send us will remain with us until you request deletion, revoke your consent to storage, or the purpose for data storage no longer applies. Mandatory statutory retention periods remain unaffected.</p>
      <p>Source: <a href="https://www.e-recht24.de" target="_blank" rel="noreferrer">https://www.e-recht24.de</a></p>
    </>
  )

  return (
    <div className="legal-wrap">
      <button className="legal-back" onClick={onBack}>
        <ArrowLeft size={14} /> {c.legal.back}
      </button>
      <div className="legal-doc">
        {section === 'impressum'
          ? (lang === 'en' ? <ImpressumEN /> : <ImpressumDE />)
          : (lang === 'en' ? <DatenschutzEN /> : <DatenschutzDE />)
        }
      </div>
    </div>
  )
}

/* ─── Datenschutz App Page ──────────────────────────────── */
function DatenschutzAppPage({ onBack, lang }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  const c = CONTENT[lang]

  return (
    <div className="legal-wrap">
      <button className="legal-back" onClick={onBack}>
        <ArrowLeft size={14} /> {c.legal.back}
      </button>
      <div className="legal-doc">
        <h1>Datenschutzerklärung</h1>
        <p><strong>Rectly – Meeting Recorder &amp; Transkriptions-App</strong></p>
        <p>Stand: Februar 2025</p>

        <h2>1. Datenschutz auf einen Blick</h2>
        <p>Der Schutz Ihrer personenbezogenen Daten – insbesondere Ihrer Audioaufnahmen – hat für uns höchste Priorität.<br />
        Rectly wurde nach dem Prinzip <strong>„Privacy by Design"</strong> entwickelt. Es gibt <strong>kein Benutzerkonto</strong>, <strong>keine Registrierung</strong> und <strong>kein Tracking</strong>. Standardmäßig verbleiben alle Daten auf Ihrem Gerät.</p>
        <p>Je nach von Ihnen gewähltem Transkriptionsmodus erfolgt die Verarbeitung <strong>entweder vollständig lokal</strong> oder <strong>über einen optionalen externen KI-Dienst</strong>, den Sie selbst konfigurieren.</p>

        <h2>2. Verantwortliche Stelle</h2>
        <p><strong>nila-pure GbR</strong><br />
        Klausenburger Gasse 8<br />
        51674 Wiehl<br />
        Deutschland</p>
        <p>Vertreten durch: Laura Frahm, Nico Feldmann<br />
        E-Mail: <a href="mailto:support@rectly.app">support@rectly.app</a></p>

        <h2>3. Welche Daten werden verarbeitet?</h2>
        <p>Rectly verarbeitet ausschließlich Daten, die für die Nutzung der App technisch erforderlich sind:</p>
        <ul>
          <li><strong>Audiodaten</strong><br />Audioaufnahmen von Meetings und Gesprächen, die Sie aktiv starten</li>
          <li><strong>Transkriptionsdaten</strong><br />Texte, die aus Ihren Audioaufnahmen erzeugt werden</li>
          <li><strong>Metadaten</strong><br />Datum, Uhrzeit und Dauer von Aufnahmen</li>
          <li><strong>OpenAI-API-Schlüssel</strong> (optional)<br />Nur wenn Sie selbst einen eigenen API-Schlüssel hinterlegen; Speicherung ausschließlich verschlüsselt im iOS-Keychain</li>
        </ul>
        <p>Es werden <strong>keine</strong> Benutzerprofile erstellt und <strong>keine</strong> Nutzungsstatistiken erhoben.</p>

        <h2>4. Verarbeitungsmodi der App</h2>
        <p>Die Art der Datenverarbeitung hängt von Ihrer Auswahl in den App-Einstellungen ab:</p>

        <h3>a) Lokaler Modus („Local")</h3>
        <ul>
          <li>Die Transkription erfolgt <strong>ausschließlich auf Ihrem Gerät</strong> mittels der Apple-eigenen Spracherkennung.</li>
          <li>Es werden <strong>keine Audiodaten oder Transkripte</strong> an Server von nila-pure GbR oder Dritte übertragen.</li>
          <li>Alle Daten verbleiben im geschützten App-Speicher (Sandbox) Ihres iPhones bzw. iPads.</li>
        </ul>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</p>

        <h3>b) API-Modus („API", optional)</h3>
        <ul>
          <li>Die App nutzt externe KI-Schnittstellen (z. B. Whisper/GPT), um Transkriptionen, Zusammenfassungen und Chat-Funktionen zu erzeugen.</li>
          <li>Ihre Audiodaten und Transkriptionstexte werden dabei an Server des jeweiligen Anbieters (z. B. OpenAI, USA) übertragen.</li>
        </ul>
        <p><strong>Wichtiger Hinweis (BYOK – Bring Your Own Key):</strong><br />
        Sie verwenden in Rectly <strong>ausschließlich Ihren eigenen API-Schlüssel</strong>.<br />
        Die Datenverarbeitung durch den externen KI-Anbieter erfolgt <strong>direkt zwischen Ihnen und diesem Anbieter</strong>.<br />
        nila-pure GbR stellt lediglich die technische Schnittstelle bereit und hat <strong>keinen Zugriff</strong> auf Ihre API-Daten.</p>
        <p><strong>Empfehlung:</strong><br />
        Wir empfehlen, im jeweiligen Anbieter-Dashboard die Nutzung von API-Daten zu Trainingszwecken zu deaktivieren.</p>

        <h2>5. App-Berechtigungen</h2>
        <p>Rectly benötigt folgende Zugriffsrechte:</p>
        <ul>
          <li><strong>Mikrofon</strong> – zur Aufnahme von Gesprächen</li>
          <li><strong>Spracherkennung</strong> – für die lokale Transkription</li>
          <li><strong>Face ID / Touch ID</strong> (optional) – zur Absicherung des API-Schlüssels im Keychain</li>
        </ul>
        <p>Aufnahmen erfolgen <strong>ausschließlich nach Ihrer aktiven Aktion</strong> und können jederzeit gestoppt werden.</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</p>

        <h2>6. Speicherung und Löschung</h2>
        <ul>
          <li><strong>Aufnahmen &amp; Transkripte</strong><br />Werden lokal auf Ihrem Gerät gespeichert. Beim Löschen einer Aufnahme oder der App werden diese Daten <strong>unwiderruflich entfernt</strong>.</li>
          <li><strong>API-Schlüssel</strong><br />Wird verschlüsselt im iOS-Keychain gespeichert und verlässt das Gerät nicht.</li>
          <li><strong>Backups</strong><br />Sofern iCloud-Backups aktiviert sind, werden App-Daten verschlüsselt in Ihrer privaten iCloud gesichert.</li>
        </ul>

        <h2>7. In-App-Käufe</h2>
        <p>Abonnements werden vollständig über das Zahlungssystem des App Stores abgewickelt.<br />
        nila-pure GbR erhält <strong>keine Zahlungs- oder Kreditkartendaten</strong>.<br />
        Wir erhalten lediglich eine anonymisierte Transaktions-ID sowie den Abonnementstatus (z. B. Free, Basic, Pro).</p>

        <h2>8. Weitergabe an Dritte</h2>
        <p>Eine Weitergabe von Daten erfolgt <strong>nur</strong>, wenn Sie den optionalen API-Modus aktivieren und selbst einen externen Dienst konfigurieren.<br />
        Rectly enthält <strong>keine</strong> Analyse-, Tracking- oder Werbe-Tools.</p>

        <h2>9. Ihre Rechte</h2>
        <p>Sie haben jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>Da sämtliche Daten lokal gespeichert werden, können Sie diese jederzeit selbst löschen.</p>
        <p>Zudem haben Sie das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde.</p>

        <h2>10. Datensicherheit</h2>
        <p>Wir setzen angemessene technische und organisatorische Maßnahmen ein, insbesondere:</p>
        <ul>
          <li>Speicherung aller Daten im geschützten iOS-App-Speicher</li>
          <li>Verschlüsselte Ablage sensibler Informationen im iOS-Keychain</li>
          <li>Datenübertragung an externe Dienste nur bei aktiver Nutzung durch Sie</li>
        </ul>

        <h2>11. Änderungen dieser Datenschutzerklärung</h2>
        <p>Diese Datenschutzerklärung kann angepasst werden, wenn sich rechtliche Anforderungen oder die Funktionen der App ändern.<br />
        Die jeweils aktuelle Version ist in der App und unter <a href="https://rectly.app" target="_blank" rel="noreferrer">https://rectly.app</a> abrufbar.</p>
      </div>
    </div>
  )
}

/* ─── Support Page ──────────────────────────────────────── */
function SupportPage({ onBack, lang }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  const c = CONTENT[lang]

  const isDe = lang === 'de'

  return (
    <div className="legal-wrap">
      <button className="legal-back" onClick={onBack}>
        <ArrowLeft size={14} /> {c.legal.back}
      </button>
      <div className="legal-doc">
        <h1>{isDe ? 'Support' : 'Support'}</h1>
        <p>
          {isDe
            ? 'Bei Fragen, Problemen oder Feedback zur Rectly App stehen wir Dir gerne zur Verfügung.'
            : 'If you have any questions, issues, or feedback about the Rectly app, we\'re happy to help.'}
        </p>

        <h2>{isDe ? 'Kontakt' : 'Contact'}</h2>
        <p>
          {isDe
            ? 'Schreib uns einfach eine E-Mail – wir melden uns so schnell wie möglich bei Dir:'
            : 'Simply send us an email – we\'ll get back to you as soon as possible:'}
        </p>
        <p>
          <a href="mailto:support@rectly.app">support@rectly.app</a>
        </p>

        <h2>{isDe ? 'Häufige Themen' : 'Common Topics'}</h2>
        <ul>
          {isDe ? (
            <>
              <li>Fragen zur App-Nutzung oder den Features</li>
              <li>Technische Probleme oder Bugs</li>
              <li>Fragen zu Abonnements und In-App-Käufen</li>
              <li>Allgemeines Feedback und Verbesserungsvorschläge</li>
            </>
          ) : (
            <>
              <li>Questions about app usage or features</li>
              <li>Technical issues or bugs</li>
              <li>Questions about subscriptions and in-app purchases</li>
              <li>General feedback and suggestions</li>
            </>
          )}
        </ul>

        <h2>{isDe ? 'Reaktionszeit' : 'Response Time'}</h2>
        <p>
          {isDe
            ? 'Wir bemühen uns, alle Anfragen innerhalb von 1–2 Werktagen zu beantworten.'
            : 'We aim to respond to all inquiries within 1–2 business days.'}
        </p>
      </div>
    </div>
  )
}

/* ─── FAQ Row ───────────────────────────────────────────── */
function FAQRow({ item, index, open, onToggle }) {
  return (
    <motion.div
      className={`faq-row${open ? ' faq-row--open' : ''}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.35), ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="faq-trigger" onClick={onToggle} aria-expanded={open}>
        <span className="faq-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="faq-q">{item.q}</span>
        <motion.span
          className="faq-icon"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Plus size={16} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="faq-answer">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── App ───────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('home')
  const [openFAQ, setOpenFAQ] = useState(null)
  const [lang, setLang] = useState(() => localStorage.getItem('rectly-lang') || 'de')

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'de' ? 'en' : 'de'
      localStorage.setItem('rectly-lang', next)
      setOpenFAQ(null)
      return next
    })
  }

  const c = CONTENT[lang]

  // Hash-based routing
  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash
      if (h === '#datenschutz') setPage('datenschutz')
      else if (h === '#impressum') setPage('impressum')
      else if (h === '#datenschutz-app') setPage('datenschutz-app')
      else if (h === '#support') setPage('support')
      else setPage('home')
    }
    window.addEventListener('hashchange', handleHash)
    handleHash()
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const goHome = () => { window.location.hash = ''; setPage('home') }
  const goTo   = (s) => { window.location.hash = s;  setPage(s) }
  const toggleFAQ = (i) => setOpenFAQ(p => p === i ? null : i)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /* Legal view */
  if (page !== 'home') {
    return (
      <div className="landing-root">
        <BG />
        <LangToggle lang={lang} onToggle={toggleLang} />
        <div className="content-layer">
          <Dock scrollTo={scrollTo} labels={c.dock} />
          {page === 'datenschutz-app'
            ? <DatenschutzAppPage onBack={goHome} lang={lang} />
            : page === 'support'
            ? <SupportPage onBack={goHome} lang={lang} />
            : <LegalPage section={page} onBack={goHome} lang={lang} />
          }
          <footer className="footer">
            <div className="footer-links">
              <button onClick={goHome}>{c.footer.home}</button>
              <button onClick={() => goTo('datenschutz')}>{c.footer.privacy}</button>
              <button onClick={() => goTo('datenschutz-app')}>{c.footer.privacyApp}</button>
              <button onClick={() => goTo('impressum')}>{c.footer.imprint}</button>
              <button onClick={() => goTo('support')}>{c.footer.support}</button>
            </div>
            <p className="footer-copy">{c.footer.copyright}</p>
          </footer>
        </div>
      </div>
    )
  }

  return (
    <div className="landing-root">
      {/* Layer 0 — LightPillar fixed background */}
      <BG />

      {/* Language toggle — fixed top right */}
      <LangToggle lang={lang} onToggle={toggleLang} />

      {/* Layer 1 — All page content */}
      <div className="content-layer">

        {/* Mac-style glass dock — fixed bottom center */}
        <Dock scrollTo={scrollTo} labels={c.dock} />

        {/* ── Hero ── */}
        <section className="hero-section" id="home">
          <div className="hero-inner">
            <div className="hero-kicker">
              <div className="hero-kicker-dot" />
              {c.hero.kicker}
            </div>

            <h1 className="hero-h1">Rectly</h1>

            <div className="hero-for-line">
              <span>{c.hero.forLine}</span>
              <RotatingText
                texts={c.hero.rotating}
                mainClassName="rotating-text-pill"
                staggerFrom="last"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="rotating-text-split"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </div>

            <div className="hero-sub">
              <div className="hero-feature-box">
                {c.hero.sub}
              </div>
            </div>

            <div className="hero-actions">
              <a href="#" className="hero-appstore">
                <img src={c.hero.badgeSrc} alt={c.hero.badgeAlt} />
              </a>
            </div>
          </div>

          {/* iPhone gallery slider */}
          <PhoneSlider lang={lang} />
        </section>

        <hr className="section-sep" />

        {/* ── Features ── */}
        <section id="features">
          <div className="section">
            <div className="section-eyebrow">{c.features.eyebrow}</div>

            <div className="features-grid">
              <div className="card card-accent feature-card">
                <div className="feat-mode">
                  <div className="feat-mode-dot" style={{ background: 'rgb(34,197,94)' }} />
                  {c.features.local.mode}
                </div>
                <div className="feat-icon-wrap local-icon">
                  <img src="/images/rectly-local-mode-icon.png" alt="" />
                </div>
                <h3 className="feat-title">{c.features.local.title}</h3>
                <p className="feat-body">{c.features.local.body}</p>
                <div className="feat-pills">
                  {c.features.local.pills.map(t => (
                    <span key={t} className="feat-pill">{t}</span>
                  ))}
                </div>
              </div>

              <div className="card card-accent feature-card">
                <div className="feat-mode">
                  <div className="feat-mode-dot" style={{ background: 'rgb(4,117,245)' }} />
                  {c.features.api.mode}
                </div>
                <div className="feat-icon-wrap ai-icon">
                  <img src="/images/rectly-api-mode-icon.png" alt="" />
                </div>
                <h3 className="feat-title">{c.features.api.title}</h3>
                <p className="feat-body">{c.features.api.body}</p>
                <div className="feat-pills">
                  {c.features.api.pills.map(t => (
                    <span key={t} className="feat-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="section-sep" />

        {/* ── Pricing ── */}
        <section id="preise">
          <div className="section">
            <div className="section-eyebrow">{c.pricing.eyebrow}</div>
            <h2 className="section-h2">{c.pricing.headline}</h2>

            <div className="pricing-cards-row">
              {c.pricing.plans.map((plan) => (
                <PricingCard key={plan.planName} {...plan} />
              ))}
            </div>
          </div>
        </section>

        <hr className="section-sep" />

        {/* ── FAQ ── */}
        <section id="faq">
          <div className="section">
            <div className="section-eyebrow">{c.faq.eyebrow}</div>
            <h2 className="section-h2">{c.faq.headline}</h2>

            <div className="faq-shell">
              {c.faq.items.map((item, i) => (
                <FAQRow
                  key={`${lang}-${i}`}
                  item={item}
                  index={i}
                  open={openFAQ === i}
                  onToggle={() => toggleFAQ(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-links">
            <a href="#faq">FAQ</a>
            <button onClick={() => goTo('datenschutz')}>{c.footer.privacy}</button>
            <button onClick={() => goTo('datenschutz-app')}>{c.footer.privacyApp}</button>
            <button onClick={() => goTo('impressum')}>{c.footer.imprint}</button>
            <button onClick={() => goTo('support')}>{c.footer.support}</button>
          </div>
          <p className="footer-copy">{c.footer.copyright}</p>
        </footer>

      </div>
    </div>
  )
}
