// DOM Elements
const sidebar = document.querySelector('aside');
const menuButton = document.querySelector('.fa-bars').parentElement;
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.fa-search').parentElement;
const darkModeButton = document.createElement('button');
const mainContent = document.querySelector('main');
let sidebarOpen = true;

// Setup Dark Mode Button
darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
darkModeButton.className = 'p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700';
document.querySelector('header .flex.items-center').insertBefore(
    darkModeButton,
    document.querySelector('header .flex.items-center').lastElementChild
);

// Toggle Sidebar
function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    sidebar.style.transform = sidebarOpen ? 'translateX(0)' : 'translateX(-100%)';
    mainContent.style.marginLeft = sidebarOpen ? '16rem' : '0';
    
    // Add transition classes
    sidebar.style.transition = 'transform 0.3s ease-in-out';
    mainContent.style.transition = 'margin-left 0.3s ease-in-out';
}

// Search Functionality
function handleSearch(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const channel = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || channel.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Video Click Handler
function handleVideoClick(videoCard) {
    // Store current scroll position
    const scrollPos = window.scrollY;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    
    // Get video details
    const thumbnail = videoCard.querySelector('img.thumbnail').src;
    const title = videoCard.querySelector('h3').textContent;
    const channel = videoCard.querySelector('p').textContent;
    
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-4xl w-full mx-4">
            <div class="relative pt-[56.25%]">
                <img src="${thumbnail}" alt="${title}" class="absolute inset-0 w-full h-full object-cover rounded-lg">
            </div>
            <h2 class="text-xl font-bold mt-4 dark:text-white">${title}</h2>
            <p class="text-gray-600 dark:text-gray-300">${channel}</p>
            <button class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Close</button>
        </div>
    `;
    
    // Close modal handler
    modal.querySelector('button').onclick = () => {
        modal.remove();
        window.scrollTo(0, scrollPos);
    };
    
    document.body.appendChild(modal);
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    darkModeButton.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Update colors for dark mode
    if (isDark) {
        document.body.classList.remove('bg-[#f9f9f9]');
        document.body.classList.add('bg-gray-900');
        document.querySelector('header').classList.add('bg-gray-800', 'text-white');
        sidebar.classList.add('bg-gray-800', 'text-white');
        document.querySelectorAll('.video-card').forEach(card => {
            card.classList.add('text-white');
        });
    } else {
        document.body.classList.add('bg-[#f9f9f9]');
        document.body.classList.remove('bg-gray-900');
        document.querySelector('header').classList.remove('bg-gray-800', 'text-white');
        sidebar.classList.remove('bg-gray-800', 'text-white');
        document.querySelectorAll('.video-card').forEach(card => {
            card.classList.remove('text-white');
        });
    }
}

// Event Listeners
menuButton.addEventListener('click', toggleSidebar);
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && handleSearch(e));
darkModeButton.addEventListener('click', toggleDarkMode);

// Add click handlers to video cards
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => handleVideoClick(card));
});

// Responsive sidebar
function handleResize() {
    if (window.innerWidth < 768) {
        sidebar.style.transform = 'translateX(-100%)';
        mainContent.style.marginLeft = '0';
        sidebarOpen = false;
    } else {
        sidebar.style.transform = 'translateX(0)';
        mainContent.style.marginLeft = '16rem';
        sidebarOpen = true;
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Initial check

// Add hover effect to video cards
document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.thumbnail').style.transform = 'scale(1.05)';
        card.querySelector('.thumbnail').style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.thumbnail').style.transform = 'scale(1)';
    });
});