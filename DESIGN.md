# DESIGN.md — amapola

Documento de sistema de diseño. Describe **lo que el sitio ya es**, no lo
que podría ser. Si vas a agregar una página o un componente, esto manda:
la coherencia importa más que la idea nueva.

Todos los ratios de contraste de este documento están **medidos sobre el
render**, no estimados: se calculan componiendo el color con su alfa
sobre `--bg` y aplicando la fórmula de WCAG 2.1.

---

## 1 · Tema visual y atmósfera

Un monitor de fósforo encendido en un cuarto oscuro. No es "tema oscuro":
es una pantalla que emite luz sobre un fondo casi negro, con la suciedad
que eso implica —grano de VHS, polvo, líneas de barrido, viñeta.

Tres reglas de humor:

- **Minimalismo tipográfico, maximalismo de textura.** La maqueta es
  austera y con mucho aire; la superficie está sucia.
- **La interfaz se anuncia como máquina.** Rótulos entre corchetes
  (`[ CATÁLOGO ]`), prompts (`>`), estados en VERSALITAS, contadores con
  ceros a la izquierda (`Nº 01`, `04 ENTRADAS`).
- **Lo que se afirma es cierto.** Nada de suscriptores inventados, vistas
  falsas ni reseñas de relleno. Si un dato no existe todavía, se marca
  como pendiente y se deja ver que lo está (`ARCHIVO — PRONTO`).

## 2 · Paleta y funciones

Todo vive en `:root` de `styles.css`.

| Token | Valor | Para qué | Contraste |
|---|---|---|---|
| `--bg` | `#020403` | Fondo de página | — |
| `--bg-2` | `#060807` | Terminales, superficies elevadas | — |
| `--bg-card` | `#080b09` | Interior de tarjeta | — |
| `--text` | `#ecf0ea` | Titulares y texto principal | **17.84:1** |
| `--text-mute` | `rgba(236,240,234,0.62)` | Cuerpo, metadatos | **6.87:1** |
| `--text-dim` | `rgba(236,240,234,0.50)` | Texto secundario, rótulos | **4.73:1** |
| `--green-2` | `#6a8c79` | Acento, éxito | **5.52:1** |
| `--line` | `rgba(180,200,180,0.10)` | Separadores **decorativos** | 1.15:1 |
| `--line-2` | `rgba(180,200,180,0.22)` | Marcos **decorativos** | 1.50:1 |
| `--line-control` | `rgba(180,200,180,0.48)` | Contorno de **control** | **3.22:1** |
| `--line-control-hover` | `rgba(180,200,180,0.72)` | Control en hover / foco | **6.19:1** |

**La distinción entre `--line-2` y `--line-control` no es cosmética.**
WCAG 1.4.11 pide 3.0:1 para el contorno que permite *identificar un
control*. Botones, campos y enlaces-botón llevan `--line-control`. Los
marcos de tarjetas, tiles y terminales son decoración y se quedan abajo a
propósito: subirlos endurecería la maqueta sin ganar accesibilidad, porque
el contenido que enmarcan ya tiene su propio contraste.

**Un estado activo sube el contraste, nunca lo baja.** Suena obvio y es el
error más fácil de cometer: si subes el borde de reposo de un control y no
tocas su `:hover`, acabas con un botón que se *apaga* al pasar el cursor.
Por eso existe `--line-control-hover` y por eso hover y foco siempre van
por encima de `--line-control`, no por debajo.

`--text-dim` es el piso del texto legible: **4.73:1**, apenas por encima
del 4.5 de AA. No lo bajes. Si necesitas algo más apagado que eso, lo que
necesitas es un elemento decorativo, no texto.

## 3 · Tipografía

Cuatro familias, cada una con un trabajo:

| Token | Fuente | Trabajo |
|---|---|---|
| `--t-display` | HN33 Thin Ext | Titulares. **Siempre en minúsculas.** |
| `--t-pixel` | WHTPNY PX | Metadatos, etiquetas de máquina |
| `--t-body` | Inter | Texto corrido, párrafos |
| `--t-mono` | monoespaciada del sistema | Rótulos de interfaz, botones, estados |

`HN33-ThinExt.woff2` y `WHTPNYPX.woff2` se **precargan** en las once
páginas: el titular está arriba del pliegue y sin preload parpadea.

**Jerarquía**

| Rol | Familia | Tamaño | Notas |
|---|---|---|---|
| Título de página | display | `clamp(56px, 9vw, 140px)` | `text-wrap: balance` |
| Título de tarjeta | display | `clamp(28px, 3.2vw, 42px)` | `text-wrap: balance` |
| Título de terminal | display | `clamp(32px, 9vw, 48px)` | `text-wrap: balance` |
| Cuerpo | body | 13–14px | |
| Metadato | pixel | 11–13px | |
| Rótulo de interfaz | mono | 9–11px, tracking 0.18–0.32em | VERSALITAS |

**El tamaño chico con tracking ancho es deliberado.** Una guía moderna te
va a decir que 10px con 0.32em no se lee; aquí es el idioma de la marca, y
son rótulos cortos en mayúsculas, no párrafos. No lo "arregles" sin
hablarlo. Lo que sí es negociable, si algún día molesta, es el nav a
9.5px en móvil: eso es navegación de verdad, no adorno.

Ojo con la diferencia: **el tamaño es una decisión de marca; el contraste
no.** Un rótulo de 9px es aceptable aquí. Un rótulo de 9px a 3:1 no.

## 4 · Componentes

Todos comparten la misma receta: borde de 1px, fondo casi negro,
resplandor en el texto, y un cambio de estado que **sube el contraste** en
vez de bajarlo.

| Componente | Reposo | Hover / foco |
|---|---|---|
| `.card` | borde `--line`, imagen desaturada | borde `--line-2`, imagen recupera color, halo que sigue al cursor |
| `.gallery-tile` | igual, cuadrada | sube 4px, halo verde |
| `.platform-link` | borde `--line-control` | sube, fondo verdoso |
| `.stub`, `.card-links a` | borde `--line-control` | fondo apenas, resplandor más fuerte |
| `.enter-btn` | borde `--line-control` | tracking se abre, halo crece |
| `.terminal` | barra de título: nombre a la izquierda, estado a la derecha | — |
| `.skip-link` | fuera de pantalla | entra al recibir foco |

**Foco:** hay una regla global `:focus-visible` con
`outline: 2px solid rgba(200,235,210,0.9)` y `outline-offset: 3px`. El
campo del boletín suprime su propio contorno a propósito (el borde lo
dibuja la caja), así que el foco lo marca `.news-form:focus-within` sobre
el grupo entero. **Nunca `outline: none` sin un reemplazo visible.**

**El resplandor** son tres escalones —`--glow-strong`, `--medium`,
`--soft`— y se elige por tamaño de texto, no por importancia: un rótulo de
10px con `--glow-strong` se convierte en una mancha.

## 5 · Maqueta y espaciado

- Ancho máximo `--maxw: 1360px`, centrado.
- Margen lateral `--pad-x: clamp(20px, 4vw, 56px)`, **siempre** vía el
  token; nunca un número suelto.
- Separación de rejilla `--gap: clamp(14px, 1.4vw, 20px)`.
- Rejillas con `repeat(auto-fit, minmax(260–280px, 1fr))`: se acomodan
  solas, sin media queries por columna.
- Alturas de pantalla completa en **`dvh`, no `vh`**: con `vh` la barra
  del navegador móvil hace saltar la maqueta al aparecer y desaparecer.
- Áreas seguras: las once páginas declaran `viewport-fit=cover`, así que
  `.topbar` y `.foot` reservan `env(safe-area-inset-*)`. **La media query
  de 640px vuelve a declarar el padding de la barra**, así que ahí la
  reserva va repetida — si tocas una, toca la otra, o el notch se come la
  barra justo en el único ancho donde hay notch.

## 6 · Profundidad y elevación

No hay escala de sombras de material design. Hay **cuatro capas fijas de
textura** sobre toda la página, y son la profundidad:

| Capa | z-index | Mezcla |
|---|---|---|
| `.tex-vhs` | 146 | `multiply`, 0.55 |
| `.tex-dust` | 148 | `screen`, 0.45 |
| `.tex-crt` | 149 | `overlay`, 0.20, mosaico de 240px |
| `.crt-vignette` | 150 | oscurece las orillas |

Un detalle que cuesta caro olvidar: **`mix-blend-mode` se aísla dentro de
un contexto de apilamiento.** Las capas de textura tienen que ser hijas
directas de `<body>`. Metidas en un contenedor con `position: fixed` y
`z-index` dejan de mezclarse con la página y se apoyan encima como una
lámina gris.

## 7 · Sí y no

**Sí**

- Usa los tokens. Un color suelto en un componente nuevo es un error —y
  es justo por ahí por donde se coló el texto de consentimiento a 2.8:1.
- Títulos en minúsculas, rótulos de interfaz en VERSALITAS.
- `…` en vez de `...`, comillas curvas, `&nbsp;` entre cifra y unidad.
- Un `<h1>` por página, sin saltos de nivel; todo el contenido dentro de
  `<main id="contenido">`; el `.skip-link` como primer enfocable.
- Toda imagen con `width`, `height` y `alt`; `loading="lazy"` salvo
  arriba del pliegue, donde va `fetchpriority="high"`.
- Anima `transform` y `opacity`. Si necesitas mover algo, muévelo con
  `translate`, no con `padding` ni `width`.
- Respeta `prefers-reduced-motion`: el bloque global apaga duraciones
  **y fija `animation-iteration-count: 1`**, porque si no los bucles
  infinitos siguen girando a 0.001ms y queman CPU.
- Si un efecto depende de JS, que su ausencia no esconda contenido:
  `.js-reveal` arranca invisible, y por eso cada página con reveals
  lleva un `<noscript>` que los muestra.

**No**

- Nada de emojis en la interfaz.
- Nada de números inventados. Un contador arranca en 0 y sube con uso
  real.
- Nada de botones que no hacen nada. Si no hay backend, el botón dice a
  dónde lleva de verdad.
- Nada de `transition: all`, `user-scalable=no`, `<div>` con `onclick`.
- Nada de texto explicando cómo está hecho el sitio. El copy le habla a
  quien visita, no a quien programa.
- No apiles las capas de blend dentro de un contenedor (ver §6).

## 8 · Comportamiento responsivo

| Corte | Qué cambia |
|---|---|
| `max-width: 760px` | Rejilla de releases a una columna; se apaga `.tex-vhs` y baja el CRT |
| `max-width: 640px` | La barra superior envuelve, el nav pasa a una fila propia y encoge a 9.5px; el boletín reacomoda su rejilla |

Móvil de referencia: **390px**. Ninguna página debe desbordar
horizontalmente ahí; `html, body` llevan `overflow-x: hidden` como red,
pero eso tapa el síntoma — si desborda, arregla la causa.

## 9 · Guía rápida para agentes

Al pedir una página o componente nuevo:

> Sigue `DESIGN.md`. Fondo `--bg` casi negro con las cuatro capas de
> textura. Titulares en `--t-display` minúsculas con `--glow-strong`;
> metadatos en `--t-pixel`; rótulos de interfaz en `--t-mono` VERSALITAS
> con tracking ancho. Bordes: `--line-control` en controles, `--line-2`
> en marcos decorativos. Ancho `--maxw`, márgenes `--pad-x`, rejilla
> `auto-fit minmax(260px, 1fr)`. Alturas de pantalla en `dvh`. Anima
> sólo `transform` y `opacity`. Toda imagen con `width`, `height` y
> `alt`. Nada de emojis, nada de números inventados, nada de botones que
> no hacen nada.

**Antes de dar por terminado**, verifica con el navegador —no a ojo—:
un `<h1>` por página sin saltos de nivel; el salto al contenido como
primer tabulador; contraste de texto ≥4.5:1 y de contorno de control
≥3.0:1, medido sobre el render; foco visible en todo lo enfocable; sin
desborde horizontal a 390px; consola limpia y sin 404.
