const providersData = [
    { name: "Rahim Miah", service: "Plumber", verified: true, photo: "provider1.jpg", phone: "+880123456789" },
    { name: "Motaleb Talukder", service: "Electrician", verified: true, photo: "provider2.jpg", phone: "+880987654321" },
    { name: "Razzak Mia", service: "AC Mechanic", verified: false, photo: "provider3.jpg", phone: "+880111222333" },
    { name: "Johora Begum", service: "Cleaner", verified: true, photo: "provider4.jpg", phone: "+880444555666" },
    { name: "Rafiq Ali", service: "Mason", verified: false, photo: "provider5.jpg", phone: "+880777888999" },
    { name: "Mamunur Rahman", service: "Furniture Repair", verified: true, photo: "provider6.jpg", phone: "+880222333444" },
    { name: "Md. Shah Khandaker", service: "Internet Service Provider", verified: true, photo: "provider7.jpg", phone: "+880555666777" },
    { name: "Poli Akter", service: "Dish Services", verified: false, photo: "provider8.jpg", phone: "+880888999000" }
];

function displayProviders(service = '', area = '') {
    const providersContainer = document.getElementById('providers');
    providersContainer.innerHTML = '';
    const filteredProviders = providersData.filter(p => 
        (!service || p.service === service) && (!area || true)
    );
    filteredProviders.forEach(provider => {
        const card = document.createElement('div');
        card.className = 'p-4 border rounded shadow text-center';
        card.innerHTML = `
            <img src="${provider.photo}" alt="${provider.name}" class="w-24 h-24 mx-auto rounded-full object-cover">
            <h3 class="font-bold">${provider.name}</h3>
            <p>${provider.service}</p>
            <p>${provider.verified ? '✅ Verified' : '❌ Not Verified'}</p>
            <a href="tel:${provider.phone}" class="inline-block bg-green-600 text-white px-4 py-2 rounded mt-2">Call</a>
            <a href="https://wa.me/${provider.phone}" class="inline-block bg-green-600 text-white px-4 py-2 rounded mt-2">WhatsApp</a>
        `;
        providersContainer.appendChild(card);
    });
}

document.getElementById('service-filter').addEventListener('change', (e) => {
    displayProviders(e.target.value, document.getElementById('area-filter').value);
});

document.getElementById('area-filter').addEventListener('change', (e) => {
    displayProviders(document.getElementById('service-filter').value, e.target.value);
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
});

document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}, 5000);

// Hamburger menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('main-menu');
    menu.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    displayProviders();
});
