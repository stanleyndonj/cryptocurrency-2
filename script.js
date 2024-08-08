// Sidebar toggle functionality
document.getElementById('sidebar-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
    document.body.classList.toggle('sidebar-collapsed');
});

// Currency conversion functionality
const currencySelect = document.getElementById('currency-select');
const convertBtn = document.getElementById('convert-btn');

convertBtn.addEventListener('click', async () => {
    const selectedCurrency = currencySelect.value;
    await fetchCryptoData(selectedCurrency);
});

// Fetching data from API
async function fetchCryptoData(currency) {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    updateCryptoList(data);
}

// Update crypto list with fetched data
function updateCryptoList(cryptoData) {
    const cryptoList = document.getElementById('crypto-list');
    cryptoList.innerHTML = '';
    cryptoData.forEach(crypto => {
        const cryptoCard = document.createElement('div');
        cryptoCard.classList.add('crypto-card');
        cryptoCard.innerHTML = `
            <h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
            <p>Price: $${crypto.current_price}</p>
            <p>24h Change: <span class="${crypto.price_change_percentage_24h > 0 ? 'positive' : 'negative'}">${crypto.price_change_percentage_24h.toFixed(2)}%</span></p>
        `;
        cryptoList.appendChild(cryptoCard);
    });
}

// Initial fetch
fetchCryptoData('usd');

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Add to favorites functionality
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-favorites')) {
        const cryptoItem = event.target.closest('.crypto-item');
        const favoritesList = document.getElementById('favorites-list');
        const favoriteItem = cryptoItem.cloneNode(true);
        favoritesList.appendChild(favoriteItem);
    }
});

// Toggle favorites section
document.getElementById('favorites-toggle').addEventListener('click', () => {
    document.getElementById('favorites-section').classList.toggle('active');
});
