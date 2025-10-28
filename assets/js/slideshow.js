// স্লাইডশো লোড করুন
async function loadSlides() {
    const container = document.getElementById('slideshow');
    try {
        const res = await fetch(CONFIG.SLIDES_SHEETDB);
        const slides = await res.json();

        container.innerHTML = '';
        slides.forEach((slide, i) => {
            const div = document.createElement('div');
            div.className = 'slide';
            div.innerHTML = `
                <img src="${slide.image}" alt="স্লাইড ${i+1}">
                <div class="caption">${slide.caption}</div>
            `;
            container.appendChild(div);
        });

        startSlideshow();
    } catch (err) {
        container.innerHTML = '<p>স্লাইড লোড করতে ব্যর্থ।</p>';
    }
}

function startSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let i = 0;
    slides[0].classList.add('active');

    setInterval(() => {
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
    }, 4000);
}

loadSlides();
