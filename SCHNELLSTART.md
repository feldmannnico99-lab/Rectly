# 🚀 Rectly Website v2 - Schnellstart

## Sofort loslegen

1. **Entpacke den Ordner** auf deinen Computer

2. **Teste lokal** - Öffne `index.html` in deinem Browser

3. **Wichtigste Anpassungen:**

   ```
   ✅ App Store Link einfügen (2 Stellen)
      → In de/index.html: Zeile ~44
      → In en/index.html: Zeile ~44
      Ersetze href="#" mit deinem App Store Link
   
   ✅ App-Screenshots einfügen
      → Ersetze die 3 Platzhalter-Mockups
      → Empfohlene Größe: 1170 x 2532 px (iPhone Screenshots)
   
   ✅ Datenschutz personalisieren
      → de/datenschutz.html
      → en/privacy.html
      → Ersetze [Ihr Name/Firmenname] und Kontaktdaten
   ```

4. **Optional:**
   - Farben anpassen in `assets/css/style.css`
   - Emojis ändern in `assets/js/emoji-background.js`
   - Feature Pills hinzufügen/entfernen
   - Mehr/weniger Phone Mockups

5. **Deploy:**
   - Upload auf Webserver (FTP/SFTP)
   - Oder: Netlify, Vercel, GitHub Pages

## 🎯 Key Design-Entscheidungen

**Warum dieses Design?**
- ✨ Minimaler Scroll = bessere Conversion
- 🌙 Dunkles Theme = moderne Optik
- 🎨 Logo prominent = instant recognition
- 📱 Phone Mockups = zeigt die App
- 💊 Feature Pills = schnelle Übersicht

## 📱 App Screenshots hinzufügen

**Schritt 1:** Erstelle Screenshots in deiner App (iPhone)
- Nimm 3 repräsentative Screenshots
- Beste Screens: Aufnahme, Transkription, Features

**Schritt 2:** Füge sie ein:
```html
<!-- Ersetze -->
<div class="phone-screen">
  App Preview Platzhalter
</div>

<!-- Mit -->
<div class="phone-screen">
  <img src="../assets/images/screenshot-1.png" 
       alt="App Screenshot" 
       style="width:100%; height:100%; object-fit:cover;">
</div>
```

**Schritt 3:** Kopiere die Bilder nach `assets/images/`

## 🍎 App Store Link

Ersetze in **beiden** HTML-Dateien (de + en):

```html
<!-- VORHER -->
<a href="#" class="app-store-badge">

<!-- NACHHER -->
<a href="https://apps.apple.com/app/idXXXXXXXXX" class="app-store-badge">
```

Deinen App Store Link findest du in App Store Connect.

## ✅ Launch-Checkliste

- [ ] App Store Link eingefügt (DE + EN)
- [ ] 3 App-Screenshots hinzugefügt
- [ ] Datenschutz personalisiert
- [ ] Kontakt-E-Mail korrekt
- [ ] Auf Handy getestet
- [ ] Domain konfiguriert
- [ ] SSL aktiviert
- [ ] Google Search Console

## 💡 Pro-Tipps

1. **Screenshots:** Nutze ein Tool wie Figma oder Sketch für perfekte Mockups
2. **Performance:** Komprimiere Bilder (z.B. mit TinyPNG)
3. **SEO:** Sitemap bei Google Search Console einreichen
4. **Analytics:** Google Analytics oder Plausible hinzufügen (optional)

## 🎨 Quick-Anpassungen

**Andere Akzentfarbe?**
```css
/* assets/css/style.css, Zeile 2 */
--primary-blue: #FF6B6B;  /* Deine Farbe */
```

**Andere Feature Pills?**
```html
<!-- de/index.html, ab Zeile ~50 -->
<div class="pill">
  <span class="pill-icon">🆕</span>
  <span>Neues Feature</span>
</div>
```

**Settings-Icon ausblenden?**
```css
/* assets/css/style.css, füge hinzu: */
.settings-icon { display: none; }
```

## 📧 Hilfe benötigt?

→ support@rectly.app

Viel Erfolg mit deiner Rectly Website! 🎉
