document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const dirToggleBtn = document.getElementById('dir-toggle');
    const htmlEl = document.documentElement;

    // Theme Toggle Logic
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newTheme);
    });

    // Direction (RTL/LTR) Toggle Logic
    dirToggleBtn.addEventListener('click', () => {
        const currentDir = htmlEl.getAttribute('dir');
        
        if (currentDir === 'ltr') {
            htmlEl.setAttribute('dir', 'rtl');
            dirToggleBtn.textContent = 'RTL';
        } else {
            htmlEl.setAttribute('dir', 'ltr');
            dirToggleBtn.textContent = 'LTR';
        }
    });

    // Hamburger Menu Logic
    const hamburgerBtn = document.getElementById('hamburger');
    const headerEl = document.querySelector('.header');
    if (hamburgerBtn && headerEl) {
        hamburgerBtn.addEventListener('click', () => {
            headerEl.classList.toggle('nav-open');
        });
    }

    // Sourcing Map Initialization (home-2.html)
    const mapContainer = document.getElementById('sourcing-map');
    if (mapContainer && typeof L !== 'undefined') {
        // Initialize map centered roughly between South America and SE Asia
        const map = L.map('sourcing-map', {
            center: [10, 10], // Broad view
            zoom: 2,
            scrollWheelZoom: false // Keep it friendly for scrolling down the page
        });

        // Add sleek minimal tiles (OpenStreetMap with CSS filters applied in style.css)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Define our sourcing locations
        const locations = [
            { name: "Ecuador", coords: [-1.8312, -78.1834], desc: "Rare Anthuriums & Orchids" },
            { name: "Colombia", coords: [4.5709, -74.2973], desc: "Elusive Philodendron Species" },
            { name: "Thailand", coords: [15.8700, 100.9925], desc: "Variegated Monstera & Alocasia" },
            { name: "Indonesia", coords: [-0.7893, 113.9213], desc: "Wild Scindapsus & Hoya" }
        ];

        // Add markers
        locations.forEach(loc => {
            const marker = L.marker(loc.coords).addTo(map);
            marker.bindPopup(`<b>${loc.name}</b><br>${loc.desc}`);
        });
    }

    // Greenhouse Location Map Initialization (contact.html)
    const greenhouseMapContainer = document.getElementById('greenhouse-map');
    if (greenhouseMapContainer && typeof L !== 'undefined') {
        // Initialize map centered on Greenwich, CT
        const greenhouseMap = L.map('greenhouse-map', {
            center: [41.0262, -73.6283], // Greenwich, CT
            zoom: 14,
            scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(greenhouseMap);

        const marker = L.marker([41.0262, -73.6283]).addTo(greenhouseMap);
        marker.bindPopup(`<b>Rare Flora Boutique</b><br>123 Botanical Way<br>Greenwich, CT 06830`).openPopup();
    }
    // Nav Bar Active State Logic
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
            const dropdown = link.closest('.dropdown');
            if (dropdown) {
                const dropbtn = dropdown.querySelector('.dropbtn');
                if (dropbtn) dropbtn.classList.add('active');
            }
        }
    });
});
