/* ================================================
   NATUREZA VIVA - JavaScript Principal
   Exemplo de Despregamento Continuo - Netlify
   ================================================ */

// ---- DATOS ----

const curiosidades = [
    "🌳 Unha árbore adulta pode absorber ata 22 kg de CO₂ ao ano.",
    "🐋 A balea azul é o animal máis grande que existiu nunca na Terra, con ata 33 metros de lonxitude.",
    "🌊 O 97% da auga do planeta é salgada. Só o 3% é doce e a maioría está conxelada.",
    "🦠 Nun gramo de terra saudable viven máis de 1.000 millóns de bacterias.",
    "🌿 As plantas producen o 98% do osíxeno que respiramos na Terra.",
    "🐜 As formigas son responsables de transportar sementes e airar o solo, sendo esenciais para os ecosistemas.",
    "🌍 A Amazonia produce o 20% do osíxeno de todo o planeta.",
    "🦅 As aguias pescadoras poden mergullarse a 40 km/h para atrapar peixes.",
    "🌺 Existen máis de 400.000 especies de plantas con flores coñecidas no mundo.",
    "🐝 Sen as abellas, o 70% dos cultivos alimentarios desaparecerían.",
    "🧊 O Ártico perde aproximadamente 13.000 km² de xeo marino cada ano pola suba de temperaturas.",
    "🌙 Os corais medran só entre 0.3 e 10 cm ao ano, polo que un arrecife pode ter miles de anos.",
    "🦁 Os leóns son os únicos felinos que viven en grupos sociais chamados manadas.",
    "🌵 Un cactus saguaro pode almacenar ata 760 litros de auga durante a época de chuvia.",
    "🦋 A bolboreta monarca migra ata 4.500 km cada ano entre Canadá e México."
];

const versionsData = [
    { version: "1.0.0", data: "2026-04-30", nota: "Lanzamento inicial" },
    { version: "1.1.0", data: "2026-05-07", nota: "Engadida galería de ecosistemas" },
    { version: "1.2.0", data: "2026-05-14", nota: "Xerador de curiosidades" }
];

// ---- UTILIDADES ----

/**
 * Anima un número desde 0 ata o valor obxectivo
 * @param {HTMLElement} elemento - Elemento DOM onde se mostra o número
 * @param {number} obxectivo - Valor final
 * @param {number} duracion - Duración en ms
 */
function animarContador(elemento, obxectivo, duracion = 2000) {
    const inicio = performance.now();
    const esPorcentaxe = obxectivo <= 100;

    function actualizar(tempo) {
        const transcurrido = tempo - inicio;
        const progreso = Math.min(transcurrido / duracion, 1);
        // Función ease-out
        const ease = 1 - Math.pow(1 - progreso, 3);
        const valorActual = Math.floor(ease * obxectivo);
        elemento.textContent = formatarNumero(valorActual) + (esPorcentaxe ? "%" : "");
        if (progreso < 1) {
            requestAnimationFrame(actualizar);
        } else {
            elemento.textContent = formatarNumero(obxectivo) + (esPorcentaxe ? "%" : "");
        }
    }

    requestAnimationFrame(actualizar);
}

/**
 * Formata un número con separadores de milleiros
 */
function formatarNumero(n) {
    return n.toLocaleString("gl-ES");
}

// ---- MENÚ HAMBURGUESA ----

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// Pechar menú ao facer clic nun enlace
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// ---- CONTADORES ANIMADOS (Intersection Observer) ----

const contadores = document.querySelectorAll(".stat-number");
let contadoresAnimados = false;

const observadorStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !contadoresAnimados) {
            contadoresAnimados = true;
            contadores.forEach(el => {
                const obxectivo = parseInt(el.dataset.target, 10);
                animarContador(el, obxectivo, 2200);
            });
        }
    });
}, { threshold: 0.3 });

const seccionStats = document.querySelector(".stats");
if (seccionStats) {
    observadorStats.observe(seccionStats);
}

// ---- MODAL DE ECOSISTEMAS ----

const modalOverlay = document.getElementById("modal-overlay");
const modalClose = document.getElementById("modal-close");
const modalText = document.getElementById("modal-text");
const modalIcon = document.getElementById("modal-icon");

document.querySelectorAll(".eco-card").forEach(card => {
    card.addEventListener("click", () => {
        const info = card.dataset.info;
        const titulo = card.querySelector("h3").textContent;
        modalIcon.textContent = titulo.split(" ")[0]; // Emoji
        modalText.textContent = info;
        modalOverlay.classList.add("active");
    });
});

function cerrarModal() {
    modalOverlay.classList.remove("active");
}

modalClose.addEventListener("click", cerrarModal);
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) cerrarModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
});

// ---- XERADOR DE CURIOSIDADES ----

const factText = document.getElementById("fact-text");
const btnFact = document.getElementById("btn-fact");
let ultimaCuriosidade = -1;

function mostrarCuriosidadeAleatoria() {
    let indice;
    do {
        indice = Math.floor(Math.random() * curiosidades.length);
    } while (indice === ultimaCuriosidade);

    ultimaCuriosidade = indice;
    factText.style.opacity = "0";
    factText.style.transform = "translateY(8px)";

    setTimeout(() => {
        factText.textContent = curiosidades[indice];
        factText.style.opacity = "1";
        factText.style.transform = "translateY(0)";
    }, 250);
}

// Estilos de transición inline para o fade
factText.style.transition = "opacity 0.25s ease, transform 0.25s ease";

btnFact.addEventListener("click", mostrarCuriosidadeAleatoria);

// ---- FORMULARIO DE CONTACTO ----

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaxe = document.getElementById("mensaxe").value.trim();

    // Validación básica
    if (!nome || !email || !mensaxe) {
        mostrarMensaxeFormulario("Por favor, completa todos os campos.", "error");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensaxeFormulario("O enderezo de email non é válido.", "error");
        return;
    }

    // Simulación de envío
    const btnSubmit = contactForm.querySelector(".btn-primary");
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Enviando...";

    setTimeout(() => {
        mostrarMensaxeFormulario(`Grazas, ${nome}! A túa mensaxe foi recibida correctamente. ✉️`, "success");
        contactForm.reset();
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Enviar Mensaxe";
    }, 1200);
});

function mostrarMensaxeFormulario(texto, tipo) {
    formMessage.textContent = texto;
    formMessage.className = "form-message " + tipo;
    setTimeout(() => {
        formMessage.className = "form-message";
    }, 5000);
}

// ---- VERSIÓN NO FOOTER ----

const footerVersion = document.getElementById("footer-version");
if (footerVersion && versionsData.length > 0) {
    const ultima = versionsData[versionsData.length - 1];
    footerVersion.textContent = `v${ultima.version} — ${ultima.nota} (${ultima.data})`;
}

// ---- NAVBAR SCROLL EFECTO ----

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(26, 71, 42, 0.98)";
        navbar.style.boxShadow = "0 2px 30px rgba(0,0,0,0.3)";
    } else {
        navbar.style.background = "rgba(26, 71, 42, 0.92)";
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.2)";
    }
});
