---
version: 1.0
name: amapola
description: >
  Sistema de diseño del colectivo musical amapola (San Luis Río Colorado, Sonora).
  Interfaz de terminal CRT sobre negro casi absoluto: fósforo verde-frío que brilla,
  capas fijas de VHS / polvo / scanlines sobre toda la página, y una jerarquía
  tipográfica de tres voces — display extra-ancho en minúsculas para los títulos,
  pixel-font para metadata, monoespaciada en versalitas muy espaciadas para etiquetas.
  Es lo-fi deliberado, archivístico y brutalista: bordes de 1px, radios casi nulos,
  cero color de marca fuera del fósforo. Todo en español.
---

# DESIGN.md — amapola

> Este archivo define **cómo se ve y se siente** el sitio.
> Cualquier página, componente o rediseño nuevo debe salir de aquí sin leer `styles.css`.
> Los tokens reales viven en `:root` dentro de [styles.css](styles.css) — si cambian ahí, actualiza esto.

---

## 1. Color

Paleta monocroma fría. **No hay color de acento de marca.** El único "color" es el glow de fósforo
y la aberración cromática del logo. Nunca introduzcas azules de UI, morados, ni gradientes de moda.

```yaml
colors:
  bg:         "#020403"   # fondo base — negro con un punto de verde
  bg-2:       "#060807"   # fondo de superficies (terminal, barras)
  bg-card:    "#080b09"   # fondo de tarjeta
  html-root:  "#000000"   # detrás de todo

  text:       "#ecf0ea"   # texto principal — blanco hueso frío
  text-mute:  "rgba(236,240,234,0.62)"  # metadata, nav, cuerpo secundario
  text-dim:   "rgba(236,240,234,0.38)"  # sellos, notas al pie, placeholders

  line:       "rgba(180,200,180,0.10)"  # borde por defecto
  line-2:     "rgba(180,200,180,0.22)"  # borde de énfasis / hover / contenedores

  green-2:    "#6a8c79"   # prompt de terminal (>) y estado OK del formulario

  chroma-r:   "rgba(255,30,60,0.45)"    # aberración cromática, canal rojo
  chroma-c:   "rgba(40,220,255,0.42)"   # aberración cromática, canal cian

  cursor-glow: "rgba(180,230,200,0.10)" # halo radial que sigue al cursor
```

### Aberración cromática

Separación RGB de 1px. Se usa en dos lugares y **solo en esos dos**:

- **Logo** (`.logo--chromatic`), permanente, vía `drop-shadow`:
  `drop-shadow(-1px 0 0 var(--chroma-r)) drop-shadow(1px 0 0 var(--chroma-c))`
- **Títulos en hover** (`.card:hover .card-title`, `.gallery-tile:hover .gallery-tile-title`), vía `text-shadow`:
  `-1px 0 0 rgba(255,30,60,0.45), 1px 0 0 rgba(40,220,255,0.4), var(--glow-medium)`

Nunca la apliques a texto de cuerpo ni a etiquetas — pierde legibilidad y deja de leerse como un efecto.

### Glow de fósforo

El brillo **no es decoración opcional**: es lo que hace que el texto se lea como un CRT.
Aplícalo con `text-shadow`, escalado por jerarquía.

```yaml
glow:
  strong: "0 0 1px rgba(236,240,234,0.9), 0 0 14px rgba(200,230,210,0.6), 0 0 36px rgba(140,200,165,0.38), 0 0 72px rgba(80,160,110,0.2)"
  medium: "0 0 1px rgba(236,240,234,0.75), 0 0 10px rgba(200,230,210,0.48), 0 0 26px rgba(140,200,165,0.26)"
  soft:   "0 0 1px rgba(236,240,234,0.6), 0 0 7px rgba(200,230,210,0.32), 0 0 14px rgba(140,200,165,0.18)"
```

| Nivel | Se usa en |
|---|---|
| `strong` | `.page-title`, `.terminal-title`, `.release-hero-title` — el título grande de la página |
| `medium` | `.card-title`, `.gallery-tile-title`, `.platform-link`, `h2` de prosa, hover de botones |
| `soft` | metadata pixel, etiquetas mono, hover de nav, sellos |

---

## 2. Tipografía

Cuatro familias, cada una con **un trabajo específico**. No las intercambies.

```yaml
typography:
  display:                              # títulos — SIEMPRE en minúsculas
    fontFamily: '"HN33 Thin Ext", "Helvetica Neue", Helvetica, system-ui, sans-serif'
    fontWeight: 400
    textTransform: lowercase
    lineHeight: 0.95–1
    letterSpacing: 0.01em
    file: /assets/fonts/HN33-ThinExt.woff2

  pixel:                                # metadata, fechas, formatos, contadores
    fontFamily: '"WHTPNY PX", ui-monospace, monospace'
    fontSize: 12–14px
    letterSpacing: 0.04–0.12em
    file: /assets/fonts/WHTPNYPX.woff2

  mono:                                 # etiquetas, nav, botones — SIEMPRE en MAYÚSCULAS
    fontFamily: 'ui-monospace, "Courier New", monospace'
    fontSize: 9–11px
    letterSpacing: 0.24–0.34em
    textTransform: uppercase

  body:                                 # párrafos largos, legales, CTAs de plataforma
    fontFamily: 'Inter, system-ui, sans-serif'
    fontWeight: 400 / 600 / 900
    fontSize: 14px
    lineHeight: 1.75
```

### Escala

| Rol | Familia | Tamaño |
|---|---|---|
| Título de página | display | `clamp(56px, 9vw, 140px)` / `line-height: 0.95` |
| Título de terminal | display | `clamp(44px, 7vw, 96px)` / `line-height: 1` |
| Título de release | display | `clamp(34px, 6vh, 74px)` |
| Título de tarjeta | display | `clamp(28px, 3.2vw, 42px)` |
| Título de tile | display | `clamp(22px, 2.2vw, 30px)` |
| `h2` de prosa | display | `clamp(24px, 3vw, 34px)` |
| Etiqueta de sección `[ X ]` | mono 700 | `11px` / `ls .32em` |
| Nav | mono | `10.5px` / `ls .34em` |
| Metadata de tarjeta | pixel | `13px` / `ls .06em` |
| Links de plataforma (chips) | mono | `9.5px` / `ls .24em` |
| Pie / esquinas del hero | mono | `10px` / `ls .32em` |
| Texto de terminal | mono | `11.5px` / `lh 1.7` / `ls .06em` |

**Regla dura:** los títulos van en minúsculas (`puntero digital`, `suscríbete al vacío`).
Las etiquetas van en MAYÚSCULAS con tracking amplio (`MÚSICA`, `SIN SPAM`, `EST. 2018`).
Nunca Title Case.

---

## 3. Layout

```yaml
layout:
  maxWidth: 1360px          # --maxw
  paddingX: clamp(20px, 4vw, 56px)   # --pad-x
  gap: clamp(14px, 1.4vw, 20px)      # --gap
  radius-card: 2px          # tarjetas de release
  radius-frame: 4px         # tiles de galería, portada de release
  border: 1px solid var(--line)
  proseWidth: 720px
  platformsWidth: 520px
```

Rejillas:

| Bloque | Rejilla |
|---|---|
| `.releases` | `repeat(auto-fit, minmax(280px, 1fr))` → 1 columna bajo 760px |
| `.gallery`, `.stubs` | `repeat(auto-fit, minmax(260px, 1fr))` |
| `.topbar` | `auto 1fr auto` → flex envolvente bajo 640px |
| `.section-head` | `auto 1fr auto` (etiqueta · regla punteada · meta) |

Los radios son **casi cero a propósito**. Nunca uses `border-radius` mayor a 4px,
ni sombras suaves tipo "card flotante" de UI genérica. La profundidad viene de
sombras internas duras y del glow, no de blur.

---

## 4. La pila de texturas

Cuatro capas `position: fixed` sobre **toda** la página. Van en cada HTML, justo después de `<body>`.
Es la firma visual del sitio — sin ellas no es amapola.

```html
<div class="tex-vhs"></div>
<div class="tex-dust"></div>
<div class="tex-crt"></div>
<div class="crt-vignette"></div>
```

| Capa | z-index | Blend | Opacidad | Nota |
|---|---|---|---|---|
| `.tex-vhs` | 146 | `multiply` | 0.55 | oculta bajo 760px (peso) |
| `.tex-dust` | 148 | `screen` | 0.45 | grano |
| `.tex-crt` | 149 | `overlay` | 0.20 → 0.14 en móvil | tile de 240px |
| `.crt-vignette` | 150 | — | — | radial, oscurece bordes |

Además, `.scanlines` / `::before` en contenedores locales: líneas horizontales
`rgba(255,255,255,0.025)` cada 3px al 0.55 de opacidad.

**Todas son `pointer-events: none`.** Nunca deben bloquear clics.

---

## 5. Tratamiento de imagen

Nada entra a color pleno. Todo pasa por un filtro de desaturación y bajada de brillo.

```yaml
hero:        "grayscale(1) contrast(1.15) brightness(0.42)"
card:        "grayscale(0.55) saturate(0.5) brightness(0.7) contrast(1.12)"
card-hover:  "grayscale(0.35) saturate(0.7) brightness(0.78) contrast(1.1)"
tile:        "grayscale(0.45) saturate(0.6) brightness(0.82) contrast(1.08)"
tile-hover:  "grayscale(0.2) saturate(0.85) brightness(0.9)"
release-cover: "grayscale(0.35) saturate(0.7) brightness(0.88) contrast(1.05)"
```

Toda portada lleva encima un degradado al negro en el borde inferior
(`linear-gradient(180deg, transparent 0%, transparent 50-55%, rgba(6,8,7,0.85) 100%)`)
para que el texto siempre tenga base.

Formato: **WebP**, siempre. Fuentes: **WOFF2** con `font-display: swap`.

---

## 6. Movimiento

Lento y mecánico, nunca "bouncy". Sin easings elásticos, sin spring.

```yaml
motion:
  color/border:     160–240ms ease      # hover de nav, links, bordes
  text-shadow:      220ms ease          # aberración cromática al entrar en hover
  filter/transform: 600–700ms ease      # zoom y desaturación de portadas
  splash:           700ms ease          # fade del gate de entrada
  site-reveal:      700ms ease 200ms    # entrada del sitio tras el splash
  boot-flicker:     900ms steps(1,end)  # encendido de CRT al salir del splash
  scroll-reveal:    640ms ease          # entrada de bloques al hacer scroll
  reveal-stagger:   70ms × (i % 6)      # escalonado vía --reveal-i
  cursor-glow:      320ms ease          # fade del halo que sigue al cursor
  waveform:         1.4s ease-in-out infinite   # barras del toggle de sonido
  vhs-line:         9s linear infinite  # línea de barrido — PAUSADA hasta hover
```

Patrones establecidos:
- **Encendido:** al pulsar `ENTRAR`, `.site` corre `bootFlicker` — saltos duros de `brightness`/`contrast` con `steps(1, end)`. Nunca lo suavices con easing: el parpadeo escalonado *es* el efecto.
- **Scroll reveal:** los bloques marcados `.js-reveal` entran con `opacity 0→1` + `translateY(22px→0)`. `site.js` los observa con `IntersectionObserver` (`threshold: .12`, `rootMargin: 0 0 -40px 0`) y asigna `--reveal-i` en ciclos de 6 para escalonarlos.
- **Halo de cursor:** `.card`, `.gallery-tile-frame`, `.platform-link` y `.stub` llevan un `radial-gradient` de 320px en `var(--mx) var(--my)`; `site.js` actualiza esas variables en `mousemove`. Solo se activa bajo `(hover: hover)`.
- **Hover de tarjeta:** borde a `--line-2`, imagen a `scale(1.02)`, línea VHS corriendo, título con aberración cromática.
- **Hover de tile:** `translateY(-4px)` + borde encendido + glow externo.
- **Hover de botón:** el `letter-spacing` se abre (`.32em → .4em`) y el glow sube un nivel.
- **Waveform apagado:** `animation-play-state: paused` + `opacity: .45` (no `display:none`).

`prefers-reduced-motion: reduce` mata **todas** las animaciones y transiciones globalmente,
y además `site.js` lo comprueba en JS: con motion reducido los `.js-reveal` se marcan
`is-visible` de inmediato y el halo de cursor no se registra. **Toda interacción nueva
en JS debe hacer la misma comprobación** — el CSS solo no basta cuando el efecto lo mueve el script.

---

## 6b. Capa de sonido

SFX cortos de interfaz, **apagados por defecto**, persistidos en `localStorage` bajo `amapola-sound`.
Se alternan con `.sound-toggle` (el estado vive en `aria-pressed`, que es también lo que anima el waveform).

| Archivo | Se dispara en |
|---|---|
| `/assets/audio/boot.wav` | pulsar `ENTRAR` (junto con el boot flicker) |
| `/assets/audio/hover.wav` | `mouseenter` en `.card`, `.gallery-tile`, `.platform-link`, `.stub`, `.card-links a`, `.topnav a` |
| `/assets/audio/click.wav` | click en `.enter-btn`, `.platform-link`, `.card-links a`, `.stub`, `.soon-cta a` |
| `/assets/audio/send.wav` | envío del formulario del boletín |

Reglas: volumen fijo `0.5`; cada disparo clona el nodo cacheado para permitir solapamiento;
todo va envuelto en `try/catch` y `.play().catch()` porque el navegador puede bloquear el autoplay.
**Nunca reproduzcas sonido sin que el usuario lo haya activado**, y nunca lo enciendas por defecto.

---

## 7. Voz y microcopy

Español de México. Tono: archivo, transmisión, no-comercial.

- Etiquetas de sección entre corchetes con espacios: `[ CATÁLOGO ]`, `[ TRANSMISIÓN ]`, `[ MÚSICA ]`
- Separadores: `//` entre bloques del pie, `·` entre datos, `/` entre campos de metadata
- Numeración: `Nº 01`, `Nº 02` — con la ordinal volada
- Prefijo de descripción: `↳ ÁLBUM DE LARGA DURACIÓN`
- Firma de lugar y tiempo: `EST. 2018`, `SAN LUIS RIO COLORADO, SONORA`, `SLRC, MX`
- Estados como transmisión: `TRANSMITIR _`, `TRANSMISIÓN RECIBIDA.`, `SIN SPAM`, `PRIVADO · SIN ALGORITMOS`
- Placeholders con guion bajo de cursor: `TRANSMITIR _`
- `PRONTO` para lo que no existe todavía (nunca "Coming soon")

Evita: signos de exclamación, lenguaje de marketing, "descubre", "explora",
emojis, y cualquier cosa que suene a plantilla de startup.

---

## 8. Componentes canónicos

| Componente | Clase | Descripción |
|---|---|---|
| Gate de entrada | `.splash` | Logo cromático + `E N T R A R` + consentimiento. Se apaga con `body[data-splash="off"]` |
| Barra superior | `.topbar` | Sticky, logo · nav centrada · toggle de sonido. Degradado a transparente |
| Hero | `.hero` | Imagen a b/n + tinte + scanlines + logo + esquinas con metadata |
| Divisor de sección | `.section-head` | `[ ETIQUETA ]` · regla punteada de 8px · meta a la derecha |
| Tarjeta de release | `.card` | Portada 4:3 + índice + bandera + glitch, cuerpo con metadata pixel y chips de plataforma |
| Tile de galería | `.gallery-tile` | Portada 1:1 con marco y sombras internas, título debajo |
| Terminal | `.terminal` | Caja con barra de título, usada para boletín y para páginas `PRONTO` |
| Link de plataforma | `.platform-link` | Botón ancho en Inter 900 mayúsculas con flecha, para páginas de release |
| Stub | `.stub` | Fila etiqueta + estado, para navegación secundaria |
| Prosa | `.prose` | Páginas legales, 720px, Inter 14px/1.75 |

---

## 9. Reglas duras

1. **Nunca** introduzcas un color de acento. La paleta es monocroma + fósforo.
2. **Nunca** uses `border-radius > 4px`.
3. Títulos en minúsculas, etiquetas en MAYÚSCULAS con tracking amplio. Nunca Title Case.
4. La pila de texturas va en **todas** las páginas.
5. Toda imagen pasa por filtro de desaturación. Nada a color pleno.
6. Todo texto sobre fondo oscuro que sea jerárquico lleva `text-shadow` de glow.
7. Todo en español. Sin emojis. Sin lenguaje de marketing.
8. Sin dependencias de framework: HTML estático + un `styles.css` + un `site.js` (vanilla, IIFE, `defer`). Sin build step, sin npm.
9. Toda animación nueva debe respetar `prefers-reduced-motion` — en CSS **y** en JS si la mueve el script.
10. El sonido va apagado por defecto y persiste la elección del usuario.
11. Fuentes locales WOFF2; imágenes WebP; audio WAV corto.
