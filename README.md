# 🌿 NaturezaViva — Exemplo de Despregamento Continuo

> **Proxecto didáctico** para demostrar o fluxo de **Despregamento Continuo (CD)** con **GitHub + Netlify**  
> Tecnoloxías: HTML5 · CSS3 · JavaScript Vanilla

---

## 📋 Índice

1. [Que é o Despregamento Continuo?](#que-é-o-despregamento-continuo)
2. [Estrutura do Proxecto](#estrutura-do-proxecto)
3. [Paso 1 — Subir o Proxecto a GitHub](#paso-1--subir-o-proxecto-a-github)
4. [Paso 2 — Conectar con Netlify](#paso-2--conectar-con-netlify)
5. [Paso 3 — Verificar o Despregamento](#paso-3--verificar-o-despregamento)
6. [Paso 4 — Facer un Cambio e Ver o CD en Acción](#paso-4--facer-un-cambio-e-ver-o-cd-en-acción)
7. [Configuración de Netlify (netlify.toml)](#configuración-de-netlify-netlifytoml)
8. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Que é o Despregamento Continuo?

O **Despregamento Continuo (CD — Continuous Deployment)** é unha práctica de desenvolvemento onde cada cambio que se fai no código e se sube ao repositorio (push) **desprégase automaticamente** na plataforma de produción sen intervención manual.

```
Desenvolve en local → git commit → git push → ✅ Publicado automaticamente
```

### Fluxo completo:

```
┌─────────────┐    push    ┌──────────────┐   webhook   ┌─────────────┐
│  VS Code     │ ────────► │   GitHub     │ ──────────► │   Netlify   │
│  (local)     │           │ (repositorio)│             │ (produción) │
└─────────────┘            └──────────────┘             └─────────────┘
                                                                │
                                                         Build + Deploy
                                                                │
                                                    https://teu-sitio.netlify.app
```

---

## Estrutura do Proxecto

```
exemplo_despregamento_baio_2026/
│
├── index.html          ← Páxina principal
├── netlify.toml        ← Configuración de Netlify
├── README.md           ← Esta guía
│
├── css/
│   └── style.css       ← Estilos da páxina
│
└── js/
    └── main.js         ← Lóxica JavaScript
```

---

## Paso 1 — Subir o Proxecto a GitHub

### 1.1 Crear un repositorio en GitHub

1. Accede a [github.com](https://github.com) e fai clic en **"New repository"**
2. Nome: `exemplo_despregamento_baio_2026`
3. Visibilidade: **Public** (necesario para Netlify gratuíto)
4. **Non** marques "Add README" (xa o temos)
5. Fai clic en **"Create repository"**

### 1.2 Inicializar Git en local e subir o código

Abre o terminal no cartafol do proxecto e executa:

```bash
# 1. Inicializar o repositorio Git
git init

# 2. Engadir todos os ficheiros
git add .

# 3. Facer o primeiro commit
git commit -m "feat: proxecto inicial - NaturezaViva"

# 4. Vincular co repositorio de GitHub (substitúe o URL polo teu)
git remote add origin https://github.com/tonikampos/exemplo_despregamento_baio_2026.git

# 5. Subir o código á rama principal
git push -u origin main
```

> ⚠️ **Nota:** Se pide credenciais, configura un **Personal Access Token** en GitHub:  
> Settings → Developer settings → Personal access tokens → Tokens (classic)

---

## Paso 2 — Conectar con Netlify

### 2.1 Crear conta en Netlify

1. Vai a [netlify.com](https://netlify.com)
2. Fai clic en **"Sign up"** → Escolla **"GitHub"** para iniciar sesión
3. Autoriza a Netlify a acceder ao teu GitHub

### 2.2 Crear un novo sitio

1. No panel de Netlify, fai clic en **"Add new site"** → **"Import an existing project"**
2. Escolla **"GitHub"** como provedor de Git
3. Busca e selecciona o repositorio `exemplo_despregamento_baio_2026`

### 2.3 Configurar o despregamento

Na pantalla de configuración verás:

| Campo | Valor |
|-------|-------|
| **Branch to deploy** | `main` |
| **Base directory** | *(deixar baleiro)* |
| **Build command** | *(deixar baleiro — é un sitio estático)* |
| **Publish directory** | `.` ou *(deixar baleiro)* |

4. Fai clic en **"Deploy site"**

### 2.4 O sitio está publicado! 🎉

Netlify asignarache un URL aleatorio como:
```
https://amazing-rosalind-a1b2c3.netlify.app
```

Podes cambialo en **Site settings → Domain management → Custom domains**.

---

## Paso 3 — Verificar o Despregamento

1. No panel de Netlify vai a **"Deploys"**
2. Verás o historial de todos os despregamentos con:
   - ✅ Estado (Published / Failed)
   - 📅 Data e hora
   - 💬 Mensaxe do commit
   - ⏱ Tempo de build

---

## Paso 4 — Facer un Cambio e Ver o CD en Acción

Este é o núcleo do exemplo. Vamos a demostrar o CD:

### 4.1 Modifica algo no código

Por exemplo, en `index.html` cambia o título do hero:

```html
<!-- Antes -->
<h1 class="hero-title">Descobre a <span class="highlight">Natureza</span></h1>

<!-- Despois -->
<h1 class="hero-title">Explora a <span class="highlight">Natureza</span> ✨</h1>
```

Ou engade unha nova curiosidade en `js/main.js`:

```javascript
"🌊 O océano Pacífico é máis grande que toda a superficie terrestre combinada."
```

### 4.2 Commit e Push

```bash
git add .
git commit -m "fix: actualización do título do hero"
git push
```

### 4.3 Observa o despregamento automático

1. Ve ao panel de Netlify → **"Deploys"**
2. Verás un novo despregamento en progreso (amarelo ⚡)
3. En poucos segundos estará publicado (verde ✅)
4. Refresca o teu sitio web — **o cambio xa está en produción!**

---

## Configuración de Netlify (netlify.toml)

O ficheiro `netlify.toml` permite configurar Netlify desde o propio repositorio:

```toml
# netlify.toml — Configuración do sitio en Netlify

[build]
  publish = "."        # Cartafol a publicar

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/old-page"
  to = "/index.html"
  status = 301
```

---

## Preguntas Frecuentes

**❓ Netlify soporta PHP?**  
Non. Netlify só soporta sitios estáticos (HTML/CSS/JS). Para PHP usa Render, Railway ou un VPS.

**❓ Cantos sitios podo ter gratuitamente?**  
Netlify Free permite sitios ilimitados con 100GB de ancho de banda ao mes.

**❓ Podo usar un dominio propio?**  
Si. En Site settings → Domain management podes engadir o teu dominio e Netlify xestiona o SSL automaticamente.

**❓ Que pasa se o build falla?**  
Netlify mantén a versión anterior en produción. Podes ver o erro en Deploys → (despregamento fallido) → View log.

**❓ Podo despregar só desde certas ramas?**  
Si. En Site settings → Build & deploy → Branch deploys podes configurar que ramas activan despregamentos.

---

## 🔗 Recursos

- [Documentación de Netlify](https://docs.netlify.com)
- [GitHub Docs — Getting started](https://docs.github.com/en/get-started)
- [Netlify TOML Reference](https://docs.netlify.com/configure-builds/file-based-configuration/)

---

*Proxecto creado con fins didácticos — IES Urbano Lugrís 2025/2026*
