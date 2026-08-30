# amapola

Sitio del colectivo musical AMAPOLA — San Luis Río Colorado, Sonora. EST. 2018.

## Estructura

```
├── index.html          # Home
├── styles.css          # Sistema de diseño completo (tokens, glow CRT, texturas)
├── vercel.json         # Config de deploy (clean URLs + cache de assets)
└── assets/
    ├── logo.webp                 # Logo amapola
    ├── hero.webp                 # Imagen del hero
    ├── puntero-digital.webp      # Portadas de releases
    ├── whereubeen.webp
    ├── 9018.webp
    ├── svvtchbld.webp
    ├── vhs.webp / dust.webp / crt.webp    # Capas de textura
    └── fonts/
        ├── HN33-ThinExt.woff2    # Títulos (Helvetica Neue 33 Thin Extended)
        ├── WHTPNYPX.woff2        # Metadata pixel
        ├── WHTPNY.woff2
        └── WHTPNY-LCD.woff2
```

## Desarrollo local

Es HTML estático — no hay build step. Para verlo localmente:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Deploy

Conectado a Vercel. Cada `git push` a `main` dispara un deploy automático.

## Pendientes

- [ ] Links de streaming para Puntero Digital
- [ ] Subpáginas de artistas: MBAE, KZA, NAVA.EXE, EDEL, QWERTY, $MONKI, $NIÑO
- [ ] Páginas individuales de release (`/release/*`)
- [ ] Galería 43 (`/visuals`)
- [ ] Archivo y Tienda
- [ ] Página de privacidad (`/privacy`)
- [ ] Reemplazar hero por video (`hero.mp4`)
