# Rectly Website

Moderne, mehrsprachige Landingpage für die Rectly iOS Meeting-Aufnahme-App mit interaktivem Emoji-Hintergrund.

## 🎨 Features

- ✨ Interaktiver animierter Emoji-Hintergrund (Meeting/Audio-Theme)
- 🌍 Vollständig zweisprachig (Deutsch/Englisch)
- 📱 Responsive Design für alle Geräte
- 🎨 Modernes UI basierend auf dem Rectly Logo-Farbschema
- 🔒 Umfassende Datenschutzerklärung (Website + App)
- 🚀 Keine externen Dependencies
- ⚡ Schnell und performant

## 📁 Struktur

```
rectly-website/
├── index.html                 # Root mit Auto-Redirect
├── de/                        # Deutsche Version
│   ├── index.html            # Landingpage
│   └── datenschutz.html      # Datenschutz
├── en/                        # English Version
│   ├── index.html            # Landing page
│   └── privacy.html          # Privacy policy
└── assets/
    ├── css/
    │   └── style.css         # Haupt-Stylesheet
    ├── js/
    │   ├── emoji-background.js   # Interaktiver Hintergrund
    │   └── main.js               # Zusätzliche Funktionen
    └── images/
        └── logo.png          # Rectly Logo

```

## 🚀 Installation & Deployment

### Lokale Vorschau

Öffne einfach die `index.html` in einem Browser oder verwende einen lokalen Webserver:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (mit npx)
npx serve

# PHP
php -S localhost:8000
```

Dann öffne: `http://localhost:8000`

### Deployment

Die Website ist rein statisch und kann auf jedem Webhosting-Service deployed werden:

#### Netlify
```bash
# Drag & Drop den gesamten Ordner auf netlify.com
# Oder via CLI:
netlify deploy --dir=. --prod
```

#### Vercel
```bash
vercel --prod
```

#### GitHub Pages
1. Push den Code zu GitHub
2. Gehe zu Repository Settings → Pages
3. Wähle Branch (main/master) und Root-Ordner
4. Speichern

#### Traditionelles Webhosting
Lade alle Dateien via FTP/SFTP auf deinen Webserver hoch.

## 🔧 Anpassungen

### Farbschema ändern
Bearbeite in `assets/css/style.css`:

```css
:root {
  --primary-blue: #1E90FF;    /* Hauptfarbe */
  --dark-blue: #1565C0;        /* Dunklere Variante */
  --light-blue: #64B5F6;       /* Hellere Variante */
}
```

### Emoji-Hintergrund anpassen
In `assets/js/emoji-background.js`:

```javascript
this.emojis = ['🎙️', '📝', '🗣️', '💬', '📊', '⏺️', '🎧', '📱', '✨'];
// Füge weitere Emojis hinzu oder entferne welche
```

### Kontaktdaten aktualisieren
Ersetze in beiden Datenschutzseiten (`de/datenschutz.html`, `en/privacy.html`):
- `[Ihr Name/Firmenname]`
- `[Adresse]`
- Support-E-Mail

### App Store Links hinzufügen
Ersetze in allen `index.html` Dateien:
```html
<a href="#" class="btn btn-primary">
```
Mit deinem echten App Store Link:
```html
<a href="https://apps.apple.com/app/idXXXXXXXXX" class="btn btn-primary">
```

## 🌐 URL-Struktur

Die Website verwendet folgende URL-Struktur:

- `rectly.app/` → Auto-Redirect basierend auf Browser-Sprache
- `rectly.app/de/` oder `rectly.app/de/index.html` → Deutsche Startseite
- `rectly.app/en/` oder `rectly.app/en/index.html` → English Homepage
- `rectly.app/de/datenschutz.html` → Deutscher Datenschutz
- `rectly.app/en/privacy.html` → English Privacy Policy

## 📝 SEO-Optimierung

Die Seiten sind bereits SEO-optimiert mit:
- Meta-Beschreibungen
- Open Graph Tags
- Semantische HTML-Struktur
- Mobile-friendly Design
- Schnelle Ladezeiten

Für weitere Optimierung:
1. Erstelle eine `robots.txt`
2. Erstelle eine `sitemap.xml`
3. Registriere die Site bei Google Search Console
4. Füge strukturierte Daten hinzu (JSON-LD)

## 🎨 Design-Prinzipien

- **Farben:** Basiert auf dem Rectly-Logo (Blau-Töne)
- **Typografie:** System-Fonts für optimale Performance
- **Animationen:** Subtil und performant
- **Responsive:** Mobile-First Ansatz
- **Zugänglich:** Semantisches HTML, guter Kontrast

## 📱 Browser-Kompatibilität

- ✅ Chrome/Edge (neueste Versionen)
- ✅ Firefox (neueste Versionen)
- ✅ Safari 14+
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)

## 🔐 Datenschutz-Hinweise

Die Datenschutzseiten müssen noch personalisiert werden:
1. Füge deine korrekten Kontaktdaten ein
2. Passe Impressum an deine rechtliche Situation an
3. Prüfe lokale Datenschutz-Anforderungen (DSGVO/GDPR)

**Wichtig:** Die Datenschutzerklärung ist ein Template und sollte von einem Rechtsberater geprüft werden!

## 🐛 Fehlerbehebung

**Emojis werden nicht angezeigt:**
- Stelle sicher, dass die Browser-Emoji-Unterstützung aktiviert ist
- Teste auf verschiedenen Geräten

**Sprachumschaltung funktioniert nicht:**
- Überprüfe die Pfade in den Links (`../de/`, `../en/`)
- Stelle sicher, dass alle Dateien korrekt deployed wurden

**Bilder laden nicht:**
- Überprüfe Pfade: `../assets/images/logo.png`
- Stelle sicher, dass das Logo-File vorhanden ist

## 📧 Support

Bei Fragen oder Problemen: support@rectly.app

## 📄 Lizenz

© 2026 Rectly. Alle Rechte vorbehalten.
