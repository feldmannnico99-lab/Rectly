# Rectly Website v2 - Streak-Style

Kompakte, minimalistische Landingpage für die Rectly iOS Meeting-Aufnahme-App im Stil von Streak - mit interaktivem Emoji-Hintergrund und dunklem Theme.

## 🎨 Features

- ✨ Interaktiver animierter Emoji-Hintergrund (Meeting/Audio-Theme)
- 🌍 Vollständig zweisprachig (Deutsch/Englisch)
- 📱 Responsive Design für alle Geräte
- 🌙 Dunkles Theme (Streak-inspiriert)
- 🎯 Minimales Scroll-Volumen - One-Page-Design
- 🍎 App Store Badge integriert
- 🚀 Keine externen Dependencies
- ⚡ Schnell und performant

## 📐 Design-Philosophie

**Inspiriert von Streak:**
- Dunkler Hintergrund für moderne Optik
- Logo prominent im Hero-Bereich (nicht im Header)
- Minimaler Content - alles auf einen Blick
- Feature-Pills statt lange Beschreibungen
- iPhone Mockup-Platzhalter für App-Screenshots
- Settings-Icon oben rechts

## 📁 Struktur

```
rectly-v2/
├── index.html                 # Root mit Auto-Redirect
├── de/                        # Deutsche Version
│   ├── index.html            # Landingpage
│   └── datenschutz.html      # Datenschutz
├── en/                        # English Version
│   ├── index.html            # Landing page
│   └── privacy.html          # Privacy policy
└── assets/
    ├── css/
    │   └── style.css         # Streak-Style CSS
    ├── js/
    │   ├── emoji-background.js   # Dunkel angepasst
    │   └── main.js
    └── images/
        └── logo.png          # Rectly Logo
```

## 🚀 Installation & Deployment

### Lokale Vorschau

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Dann öffne: `http://localhost:8000`

### Deployment

Die Website ist rein statisch und kann auf jedem Webhosting-Service deployed werden:

- **Netlify:** Drag & Drop oder `netlify deploy --prod`
- **Vercel:** `vercel --prod`
- **GitHub Pages:** Push zu GitHub und aktiviere Pages
- **Traditionell:** Upload via FTP/SFTP

## 🔧 Anpassungen

### App Store Link einfügen

In `de/index.html` und `en/index.html`, suche:
```html
<a href="#" class="app-store-badge">
```

Ersetze `#` mit deinem App Store Link:
```html
<a href="https://apps.apple.com/app/idXXXXXXXXX" class="app-store-badge">
```

### App-Screenshots einfügen

Ersetze die Platzhalter in den `.phone-screen` divs:

```html
<div class="phone-screen">
  <img src="../assets/images/screenshot-1.png" alt="App Screenshot" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

### Farbschema ändern

In `assets/css/style.css`:

```css
:root {
  --primary-blue: #1E90FF;    /* Akzentfarbe */
  --dark-bg: #2B3A47;         /* Haupt-Hintergrund */
  --darker-bg: #1F2937;       /* Dunklerer Hintergrund */
}
```

### Emojis anpassen

In `assets/js/emoji-background.js`:

```javascript
this.emojis = ['🎙️', '📝', '🗣️', '💬', '📊', '⏺️', '🎧', '📱', '✨'];
```

### Mehr/weniger Phone Mockups

Füge in der `<div class="app-preview">` Section weitere `<div class="phone-mockup">` Blöcke hinzu oder entferne welche.

### Feature Pills anpassen

In der `<div class="feature-pills">` Section kannst du Pills hinzufügen/entfernen:

```html
<div class="pill">
  <span class="pill-icon">🆕</span>
  <span>Neues Feature</span>
</div>
```

## 📝 Wichtige To-Dos vor Launch

- [ ] App Store Link einfügen
- [ ] App-Screenshots hinzufügen (3 Mockups)
- [ ] Datenschutz personalisieren (`[Ihr Name/Firmenname]`)
- [ ] Kontakt-E-Mail verifizieren
- [ ] Auf verschiedenen Geräten testen
- [ ] Domain konfigurieren
- [ ] SSL-Zertifikat aktivieren

## 🎯 Unterschiede zur v1

| Feature | v1 (Standard) | v2 (Streak-Style) |
|---------|--------------|-------------------|
| Theme | Hell/Blau | Dunkel |
| Logo Position | Header | Hero-Zentrum |
| Scroll-Volumen | 3-4 Screens | 1-1.5 Screens |
| Features | Detaillierte Cards | Kompakte Pills |
| Layout | Multi-Section | One-Page |
| Navigation | Sticky Header | Minimal |
| App Preview | Keine | 3 Phone Mockups |

## 🌐 URL-Struktur

- `rectly.app/` → Auto-Redirect basierend auf Browser-Sprache
- `rectly.app/de/` → Deutsche Startseite
- `rectly.app/en/` → English Homepage
- `rectly.app/de/datenschutz.html` → Datenschutz
- `rectly.app/en/privacy.html` → Privacy Policy

## 📱 Phone Mockup Specs

- Breite: 280px
- Aspect Ratio: 9:19.5 (iPhone)
- Border Radius: 40px
- Padding: 12px
- Notch: Simuliert mit ::before

## 🎨 Color Palette

- Primary Blue: `#1E90FF`
- Dark Background: `#2B3A47`
- Darker Background: `#1F2937`
- Text Light: `#E5E7EB`
- Text Muted: `#9CA3AF`
- White: `#FFFFFF`

## 📧 Support

Bei Fragen: support@rectly.app

## 📄 Lizenz

© 2026 Rectly. Alle Rechte vorbehalten.
