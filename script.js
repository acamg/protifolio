document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // CONFIGURAÇÃO - LINK DO WHATSAPP
    // ============================================
    const WHATSAPP_LINK = 'https://wa.me/5519999643888';
    const WHATSAPP_NUMBER = '+55 19 99964-3888';

    // ============================================
    // 1. NAVEGAÇÃO SUAVE (Smooth Scroll)
    // ============================================
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 2. CONFIGURAR BOTÃO DE CONTATO - WHATSAPP
    // ============================================
    const ctaButton = document.querySelector('.cta');

    if (ctaButton) {
        // Atualizar href para o WhatsApp
        ctaButton.setAttribute('href', WHATSAPP_LINK);
        ctaButton.setAttribute('target', '_blank');
        ctaButton.setAttribute('rel', 'noopener noreferrer');

        // Adicionar ícone do WhatsApp
        ctaButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px; vertical-align: middle;">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
        `;

        // Adicionar evento de clique com analytics/animação
        ctaButton.addEventListener('click', function(e) {
            // Animação de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Mostrar notificação
            showNotification('Abrindo WhatsApp...', 'info');

            console.log('📱 Redirecionando para WhatsApp:', WHATSAPP_NUMBER);
        });
    }

    // ============================================
    // 3. ANIMAÇÃO DE ENTRADA (Scroll Reveal)
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.hero-content, .section-header, .project-card');
    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });

    // ============================================
    // 4. NAVBAR TRANSPARENTE/OPACA AO ROLAR
    // ============================================
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            nav.style.background = 'rgba(15, 20, 30, 0.95)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(15, 20, 30, 0.6)';
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // 5. EFEITO PARALLAX NO HERO
    // ============================================
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // ============================================
    // 6. NOTIFICAÇÕES TOAST
    // ============================================
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ============================================
    // 7. DETECTAR LINKS QUEBRADOS
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const link = card.getAttribute('href');
        if (link === '#' || !link) {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('Projeto em breve! Em desenvolvimento.', 'info');
            });
        }
    });

    // ============================================
    // 8. BARRA DE PROGRESSO DE SCROLL
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (winScroll / height) * 100;
        progressBar.style.width = scrollProgress + '%';
    });

    // ============================================
    // 9. EFEITO DE PARTÍCULAS
    // ============================================
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particles-container');
        document.body.appendChild(particleContainer);

        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';

            particleContainer.appendChild(particle);
        }
    }

    createParticles();

    console.log('🚀 StepPage Portfolio - WhatsApp integrado!');
});