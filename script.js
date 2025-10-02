// --------------------------------------------------
// 1. وظيفة توليد الخلفية المتحركة (الدوائر)
// --------------------------------------------------
function generateBackgroundParticles(container, count = 40) {
    if (!container) return;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const circle = document.createElement("div");
        circle.classList.add("circle");
        
        const size = Math.random() * 8 + 4;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 10;

        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.top = `100%`; 
        circle.style.setProperty('--animation-duration', `${duration}s`);
        circle.style.animationDelay = `-${delay}s`; 

        fragment.appendChild(circle);
    }
    container.appendChild(fragment);
}

// --------------------------------------------------
// 2. وظيفة التحكم في قائمة الموبايل
// --------------------------------------------------
function setupMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle && navMenu) {
        // فتح وإغلاق القائمة
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show"); 
            menuToggle.classList.toggle("is-active"); 
        });

        // إغلاق القائمة عند النقر على أي رابط (لتحسين تجربة الموبايل)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove("show");
                menuToggle.classList.remove("is-active");
            });
        });
    }
}

// --------------------------------------------------
// 3. وظيفة التحكم في التلاشي عند التمرير (الفقاعات)
// --------------------------------------------------
function setupScrollFadeEffect() {
    const particlesContainer = document.getElementById("particles");
    const heroSection = document.getElementById("hero");

    if (!particlesContainer || !heroSection) return;

    function updateParticlesOpacity() {
        const rect = heroSection.getBoundingClientRect();
        const sectionHeight = heroSection.offsetHeight;
        
        // يبدأ التلاشي عندما يصبح 60% من القسم مرئياً في الأعلى (40% من الأسفل)
        const fadeStart = sectionHeight * 0.6;
        
        let opacity = 1;

        if (rect.top <= 0) {
            // التمرير تحت الهيرو سيكشن
            const scrollPercent = Math.min(1, Math.abs(rect.top) / sectionHeight);
            opacity = 1 - scrollPercent; // تتناقص الشفافية من 1 إلى 0
        } 
        
        // تطبيق العتامة
        particlesContainer.style.opacity = Math.max(0, opacity).toFixed(2);
    }
    
    // ربط الدالة بحدث التمرير
    window.addEventListener('scroll', updateParticlesOpacity);
    updateParticlesOpacity(); // للتنفيذ الأولي
}

// --------------------------------------------------
// 4. وظيفة إظهار العناصر عند التمرير (Reveal Effect)
// --------------------------------------------------
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور
            }
        });
    }, {
        threshold: 0.1, // 10% من العنصر مرئي
        rootMargin: '0px 0px -50px 0px' // يبدأ الظهور قبل الوصول إلى نهاية الشاشة بقليل
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// --------------------------------------------------
// 5. وظيفة إعداد الأكورديون (FAQ)
// --------------------------------------------------
function setupAccordion() {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            
            // إغلاق أي عنصر مفتوح آخر
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-content').style.maxHeight = 0;
                }
            });

            // تبديل حالة العنصر الحالي
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // تعيين الارتفاع الفعلي
            }
        });
    });
}

// --------------------------------------------------
// 6. تشغيل جميع الوظائف عند تحميل الصفحة
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    generateBackgroundParticles(document.getElementById("particles"), 50);
    setupMobileMenu();
    setupScrollFadeEffect();
    setupScrollReveal();
    setupAccordion();
});