document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper.js
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
        },
    });

    // Service Filter
    const serviceCategory = document.getElementById('service-category');
    const area = document.getElementById('area');
    const filterBtn = document.getElementById('filter-btn');
    const providers = document.getElementById('providers');
    const serviceLinks = document.querySelectorAll('.dropdown-item[data-service]');

    function filterProviders() {
        const selectedService = serviceCategory.value;
        const selectedArea = area.value;

        const providerCards = providers.getElementsByClassName('service-provider');
        Array.from(providerCards).forEach(card => {
            const expertise = card.getAttribute('data-expertise');
            const location = card.getAttribute('data-location');

            if ((selectedService === '' || expertise === selectedService) &&
                (selectedArea === '' || location === selectedArea)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Handle filter button click
    filterBtn.addEventListener('click', filterProviders);

    // Handle dropdown menu filtering
    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const service = link.getAttribute('data-service');
            serviceCategory.value = service;
            filterProviders();
        });
    });
});
