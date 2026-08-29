# AVS StreamKit 🟢

**Streaming liviano para kiosqueros Argenville. Funciona con 2GB RAM.**

---

## Deploy en Railway (5 minutos)

### Paso 1 — Subí el código a GitHub
```bash
git init
git add .
git commit -m "AVS StreamKit v1.0"
git remote add origin https://github.com/TU_USUARIO/avs-streamkit.git
git push -u origin main
```

### Paso 2 — Conectá Railway
1. Entrá a [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Seleccioná `avs-streamkit`
4. Railway detecta Node.js y hace el deploy solo

### Paso 3 — Abrí el panel
Railway te da una URL pública tipo:
```
https://avs-streamkit-production.up.railway.app
```
Esa URL es tu panel de streaming. Compartísela a tus kiosqueros.

---

## Cómo usar (para el kiosquero)

1. Abrí la URL en **Chrome o Edge** (necesario para acceder a la cámara)
2. Activá la **cámara** con el toggle
3. Elegí el destino: TikTok / YouTube / Facebook / Instagram
4. Pegá tu **Stream Key** (cada red te la da en su panel de "En vivo")
5. Configurá el **overlay** con tu nombre y producto
6. Click en **Iniciar stream** 🎉

---

## Arquitectura

```
Kiosquero (browser)
    │
    ├── Cámara/Micrófono (WebRTC API del browser)
    ├── Canvas overlay (logo AVS + producto)
    │
    └── RTMP → Servidor Railway (node-media-server)
                    │
                    ├── TikTok Live
                    ├── YouTube Live
                    ├── Facebook Live
                    └── Instagram Live
```

---

## Requisitos mínimos del kiosquero

| Componente | Mínimo |
|---|---|
| RAM | 2 GB |
| Navegador | Chrome 90+ / Edge 90+ |
| Internet | 2 Mbps upload |
| Cámara | Integrada o USB |

---

## Variables de entorno (Railway)

| Variable | Valor | Descripción |
|---|---|---|
| `PORT` | Auto (Railway lo setea) | Puerto HTTP |
| `NODE_ENV` | `production` | Modo producción |

---

## Próximas versiones

- [ ] Login con cuenta AVS — cada kiosquero ve su nombre automático
- [ ] Catálogo de productos desde el kiosco AVS
- [ ] Historial de streams
- [ ] Estadísticas de audiencia reales

---

**AVS StreamKit** — Argenville Virtual Store  
Proyecto social: democratizar el streaming para emprendedores LATAM 🌎
