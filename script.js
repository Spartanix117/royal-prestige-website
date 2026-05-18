// Animación de números en estadísticas
function animarNumeros() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        const targetNumber = parseInt(card.dataset.count);
        const element = card.querySelector('.stat-number');
        let currentNumber = 0;
        const increment = targetNumber / 50;
        
        const interval = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                element.textContent = targetNumber.toLocaleString();
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(currentNumber).toLocaleString();
            }
        }, 30);
    });
}

// Observador para activar animación cuando entra en vista
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stats')) {
            animarNumeros();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Menú hamburguesa
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.style.transform = navLinks.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.style.transform = 'rotate(0)';
        });
    });
}

// Función para desplazarse suavemente a una sección
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Función para abrir modal de productos
function abrirModal(productoId) {
    const modal = document.getElementById('modalProducto');
    
    const productos = {
        producto1: {
            titulo: 'Batería de Cocina Premium',
            descripcion: 'Nuestra batería de cocina está fabricada con acero quirúrgico de la más alta calidad. Cuenta con un revestimiento antiadherente premium que garantiza que tus alimentos no se peguen, facilitando la cocina saludable. Cada pieza ha sido diseñada ergonómicamente para máximo confort y control. El calor se distribuye de manera uniforme en toda la superficie, asegurando una cocción perfecta. Es segura para todos los tipos de estufa, incluyendo inducción, y es extremadamente fácil de limpiar. Viene con una garantía de por vida y respaldo de nuestro equipo de atención al cliente.'
        },
        producto2: {
            titulo: 'Juego de Cuchillos Profesional',
            descripcion: 'Este juego incluye cuchillos profesionales diseñados para chefs y cocineros exigentes. Están forjados en acero inoxidable de la más alta calidad, lo que garantiza durabilidad y un mantenimiento mínimo. Los mangos son ergonómicos y antideslizantes, ofreciendo máximo control incluso con las manos mojadas. Cada cuchillo mantiene su filo durante años con mínimo mantenimiento. Ideal para cortar, desmenuzar y picar con precisión. Viene con una garantía de por vida y un elegante estuche de presentación.'
        },
        producto3: {
            titulo: 'Cristalería Exclusiva',
            descripcion: 'Nuestra colección de cristalería está fabricada con cristal fino de alta densidad, perfecto para ocasiones especiales o uso diario. Cada pieza brilla con elegancia y transmite sofisticación. El cristal es resistente y puede usarse en el lavavajillas sin perder su brillo. El diseño es atemporal, combinando perfectamente en cualquier decoración. Ideal para vino, agua, cócteles y cualquier bebida. Disponible en varios diseños y tamaños para satisfacer todos tus necesidades.'
        },
        producto4: {
            titulo: 'Menaje de Casa Moderno',
            descripcion: 'Nuestra colección de menaje combina diseño moderno con funcionalidad práctica. Cada artículo ha sido seleccionado cuidadosamente para ofrecerte lo mejor en calidad y estética. Desde ollas hasta fuentes para servir, cada pieza es un reflejo de tu buen gusto. Fabricados con materiales premium que duran años. Disponibles en una variedad de colores que se adaptan a cualquier estilo de cocina.'
        },
        producto5: {
            titulo: 'Artículos de Belleza Natural',
            descripcion: 'Nuestros productos de belleza están formulados con ingredientes naturales seleccionados por sus propiedades beneficiosas para la piel. La fórmula es dermatológicamente probada y segura para todos los tipos de piel. No contiene químicos dañinos, parabenos, ni ingredientes agresivos. Los resultados son visibles desde las primeras semanas de uso. Desde cremas hidratantes hasta tratamientos especializados, ofrecemos soluciones completas para el cuidado de tu piel.'
        },
        producto6: {
            titulo: 'Complementos del Hogar Exclusivos',
            descripcion: 'Transforma tu hogar con nuestros complementos decorativos exclusivos. Cada pieza ha sido diseñada pensando en la elegancia y la funcionalidad. Desde objetos decorativos hasta accesorios prácticos, todo contribuye a crear un espacio hermoso y acogedor. Los materiales son resistentes y de alta calidad, asegurando durabilidad. Disponibles en una variedad de estilos para adaptarse a tu decoración personal.'
        }
    };
    
    const producto = productos[productoId];
    if (producto && modal) {
        document.getElementById('modalTitle').textContent = producto.titulo;
        document.getElementById('modalDescription').textContent = producto.descripcion;
        modal.style.display = 'block';
    }
}

// Función para abrir modal de formulario de afiliación
function abrirFormulario(plan) {
    const modal = document.getElementById('modalFormulario');
    const planInput = document.getElementById('planSeleccionado');
    
    if (modal && planInput) {
        const planes = {
            'starter': 'Plan Starter ($500)',
            'premier': 'Plan Premier ($1,500)',
            'elite': 'Plan Elite ($3,000)'
        };
        
        planInput.value = planes[plan] || 'Plan no especificado';
        modal.style.display = 'block';
    }
}

// Función para cerrar modal
function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    const modales = document.querySelectorAll('.modal');
    modales.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Manejar envío de formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
        contactForm.reset();
    });
}

// Manejar envío de formulario de afiliación
const formularioAfiliacion = document.getElementById('formularioAfiliacion');
if (formularioAfiliacion) {
    formularioAfiliacion.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Registro completado! Nos comunicaremos contigo en breve.');
        cerrarModal('modalFormulario');
        formularioAfiliacion.reset();
    });
}

// Efecto de scroll suave para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animación de entrada para elementos cuando se hacen visibles
const animacionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Aplicar animación a todas las tarjetas
document.querySelectorAll('.producto-card, .beneficio-card, .plan-card, .testimonio-card, .info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    animacionObserver.observe(card);
});

// Agregar clase activa al navegador cuando se hace scroll
const navbarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const navLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (navLink) {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-links a').forEach(link => link.style.color = 'white');
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
}, {
    threshold: 0.5
});

// Observar todas las secciones principales
document.querySelectorAll('section[id]').forEach(section => {
    navbarObserver.observe(section);
});

// Modo oscuro (opcional - comentado por defecto)
// function toggleDarkMode() {
//     document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'none' : 'invert(1)';
// }

// Log para verificar que el script se carga correctamente
console.log('✅ Script de Royal Prestige cargado correctamente');