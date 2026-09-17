# ItzVitik — Portfolio

Statický web rozdělený do více souborů (dřív jeden velký `index.html`).

## Struktura

```
index.html                  # markup
css/styles.css              # vlastní styly (custom kurzor, karty, timeline, …)
js/tailwind.config.js       # konfigurace Tailwind CDN (barvy, fonty)
js/skinview3d.bundle.js     # knihovna pro 3D Minecraft skin (lokálně, bez CDN)
js/main.js                  # veškerá logika webu (typewriter, filtry, router, demo chat, …)
assets/img/                 # obrázky (bannery projektů, favicon, skin)
```

## Spuštění

Web je čistě statický – stačí soubory nahrát na hosting (GitHub Pages, Netlify, …)
nebo lokálně spustit jednoduchý server:

```bash
python3 -m http.server 8000
# a otevřít http://localhost:8000
```

> Poznámka: `file://` otevření funguje také, ale pro jistotu (relativní cesty, cache)
> je lepší lokální server.

## Co bylo změněno oproti původní verzi

- base64 obrázky vytažené z HTML do `assets/img/` (HTML kleslo z ~836 kB na ~72 kB)
- bannery projektů nahrazené originály v plné kvalitě (1080×608, JPEG q92)
- karty **Logicly Web** a **Logicly Discord Bot** mají teď stejný banner jako
  jejich detailní stránka
- CSS a JS oddělené do vlastních souborů, těžké skripty načítané s `defer`
