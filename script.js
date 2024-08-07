document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
    const cryptoList = document.getElementById("crypto-list");
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("search-btn");
    const btcPrice = document.getElementById("btc-price");
    const btcChange = document.getElementById("btc-change");
    const ethPrice = document.getElementById("eth-price");
    const ethChange = document.getElementById("eth-change");
    const currencySelect = document.getElementById("currency-select");
    const convertBtn = document.getElementById("convert-btn");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const btcChartCtx = document.getElementById("btcChart").getContext("2d");
    const ethChartCtx = document.getElementById("ethChart").getContext("2d");
    let cryptoData = [];
    let btcChart = null;
    let ethChart = null;

    const fetchCryptoData = async (currency = "usd") => {
        try {
            const response = await fetch(`${apiUrl}&order=market_cap_desc&per_page=10&page=1&sparkline=true&vs_currency=${currency}`);
            const data = await response.json();
            cryptoData = data;
            displayCryptoData(currency);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const displayCryptoData = (currency) => {
        cryptoList.innerHTML = "";
        const formatCurrency = (value) => {
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency.toUpperCase(),
            });
            return formatter.format(value);
        };

        cryptoData.forEach((coin) => {
            const cryptoItem = document.createElement("div");
            cryptoItem.className = "crypto-item";
            cryptoItem.innerHTML = `
                <img src="${coin.image}" alt="${coin.name}">
                <h3>${coin.name}</h3>
                <p>${formatCurrency(coin.current_price)}</p>
                <p class="${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}">${coin.price_change_percentage_24h.toFixed(2)}%</p>
                <p>Market Cap: ${formatCurrency(coin.market_cap)}</p>
                <p>Volume: ${formatCurrency(coin.total_volume)}</p>
                <p>Supply: ${coin.circulating_supply.toFixed(0)} ${coin.symbol.toUpperCase()}</p>
                <button class="add-favorite-btn" data-id="${coin.id}">Add to Favorites</button>
            `;
            cryptoList.appendChild(cryptoItem);
        });

        updateMainCryptoInfo(currency);
        renderCryptoCharts();
    };

    const updateMainCryptoInfo = (currency) => {
        const btc = cryptoData.find((coin) => coin.id === "bitcoin");
        const eth = cryptoData.find((coin) => coin.id === "ethereum");

        const formatCurrency = (value) => {
            const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency.toUpperCase(),
            });
            return formatter.format(value);
        };

        if (btc) {
            btcPrice.textContent = formatCurrency(btc.current_price);
            btcChange.textContent = `24h Change: ${btc.price_change_percentage_24h.toFixed(2)}%`;
        }

        if (eth) {
            ethPrice.textContent = formatCurrency(eth.current_price);
            ethChange.textContent = `24h Change: ${eth.price_change_percentage_24h.toFixed(2)}%`;
        }
    };

    const renderCryptoCharts = () => {
        const btcData = cryptoData.find((coin) => coin.id === "bitcoin").sparkline_in_7d.price;
        const ethData = cryptoData.find((coin) => coin.id === "ethereum").sparkline_in_7d.price;

        const createLineChart = (ctx, data, label) => {
            return new Chart(ctx, {
                type: "line",
                data: {
                    labels: data.map((_, i) => i), // Simplified label creation
                    datasets: [
                        {
                            label,
                            data,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                            fill: true,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: false, // Hide x-axis labels
                        },
                        y: {
                            beginAtZero: false,
                            ticks: {
                                callback: (value) => `$${value.toFixed(2)}`,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: false, // Hide legend
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => `$${context.raw.toFixed(2)}`,
                            },
                        },
                    },
                },
            });
        };

        if (btcChart) btcChart.destroy();
        if (ethChart) ethChart.destroy();

        btcChart = createLineChart(btcChartCtx, btcData, "Bitcoin 7d Trend");
        ethChart = createLineChart(ethChartCtx, ethData, "Ethereum 7d Trend");
    };

    searchBtn.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = cryptoData.filter((coin) => coin.name.toLowerCase().includes(searchTerm));
        if (filteredData.length > 0) {
            displayCryptoData(filteredData);
        }
    });

    convertBtn.addEventListener("click", () => {
        const selectedCurrency = currencySelect.value;
        fetchCryptoData(selectedCurrency);
    });

    sidebarToggle.addEventListener("click", () => {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("active");
        const main = document.querySelector("main");
        if (sidebar.classList.contains("active")) {
            main.style.marginLeft = "250px";
        } else {
            main.style.marginLeft = "0";
        }
    });

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        darkModeToggle.classList.toggle("active");
        const currentMode = document.body.classList.contains("dark-theme") ? "Dark Mode" : "Light Mode";
        darkModeToggle.innerHTML = `<i class="fas fa-${currentMode === "Dark Mode" ? "moon" : "sun"}"></i> ${currentMode}`;
    });

    fetchCryptoData();
});
