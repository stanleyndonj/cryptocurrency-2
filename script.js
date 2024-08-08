document.addEventListener('DOMContentLoaded', function () {
    // DOM elements
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const favoritesToggle = document.getElementById('favorites-toggle');
    const favoritesSection = document.getElementById('favorites-section');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const cryptoList = document.getElementById('crypto-list');
    const favoritesList = document.getElementById('favorites-list');
    const searchInput = document.getElementById('search');
    const currencySelect = document.getElementById('currency-select');
    const paginationControls = document.getElementById('pagination-controls');

    // Variables
    let cryptoData = [];
    let favorites = [];
    let currentPage = 1;
    let itemsPerPage = 10;

    // Fetch cryptocurrency data from API
    function fetchCryptoData() {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                cryptoData = data;
                displayCryptoList();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Display cryptocurrency list with pagination
    function displayCryptoList() {
        cryptoList.innerHTML = '';
        paginationControls.innerHTML = '';

        // Calculate start and end indices for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const currentItems = cryptoData.slice(startIndex, endIndex);

        currentItems.forEach(crypto => {
            const cryptoItem = document.createElement('div');
            cryptoItem.className = 'crypto-item';
            cryptoItem.innerHTML = `
                <h2><img src="${crypto.image}" alt="${crypto.name}" style="width: 20px; height: 20px; margin-right: 10px;"> ${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
                <p>Price: ${currencySelect.value.toUpperCase()} ${crypto.current_price}</p>
                <p>24h Change: <span class="${crypto.price_change_percentage_24h > 0 ? 'positive' : 'negative'}">${crypto.price_change_percentage_24h.toFixed(2)}%</span></p>
                <button class="add-to-favorites" data-id="${crypto.id}">Add to Favorites</button>
            `;
            cryptoList.appendChild(cryptoItem);
        });

        // Pagination buttons
        const totalPages = Math.ceil(cryptoData.length / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const paginationBtn = document.createElement('button');
            paginationBtn.className = 'pagination-btn';
            paginationBtn.textContent = i;
            paginationBtn.addEventListener('click', () => {
                currentPage = i;
                displayCryptoList();
            });
            paginationControls.appendChild(paginationBtn);
        }
    }

    // Handle add to favorites
    cryptoList.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-to-favorites')) {
            const cryptoId = e.target.dataset.id;
            const crypto = cryptoData.find(c => c.id === cryptoId);
            if (crypto && !favorites.some(f => f.id === cryptoId)) {
                favorites.push(crypto);
                updateFavoritesList();
            }
        }
    });

    // Update favorites list
    function updateFavoritesList() {
        favoritesList.innerHTML = '';
        favorites.forEach(favorite => {
            const favoriteItem = document.createElement('div');
            favoriteItem.className = 'crypto-item';
            favoriteItem.innerHTML = `
                <h2><img src="${favorite.image}" alt="${favorite.name}" style="width: 20px; height: 20px; margin-right: 10px;"> ${favorite.name} (${favorite.symbol.toUpperCase()})</h2>
                <p>Price: ${currencySelect.value.toUpperCase()} ${favorite.current_price}</p>
                <p>24h Change: <span class="${favorite.price_change_percentage_24h > 0 ? 'positive' : 'negative'}">${favorite.price_change_percentage_24h.toFixed(2)}%</span></p>
            `;
            favoritesList.appendChild(favoriteItem);
        });
    }

    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        body.classList.toggle('sidebar-collapsed');
    });

    // Toggle favorites section visibility
    favoritesToggle.addEventListener('click', () => {
        favoritesSection.classList.toggle('active');
    });

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        cryptoData = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(query));
        displayCryptoList();
    });

    // Currency conversion
    document.getElementById('convert-btn').addEventListener('click', () => {
        const currency = currencySelect.value;
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`)
            .then(response => response.json())
            .then(data => {
                const conversionRate = data.bitcoin[currency];
                cryptoData = cryptoData.map(crypto => {
                    return { ...crypto, current_price: crypto.current_price * conversionRate };
                });
                displayCryptoList();
            });
    });

    // Initial data fetch
    fetchCryptoData();
});
