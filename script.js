const data = {
    "bitcoin": {
      "price": 57626.63,
      "change": 1.4,
      "change24h": 1.9,
      "change7d": 17.1
    },
    "ethereum": {
      "price": 4285.08,
      "change": -1.7,
      "change24h": 1.9,
      "change7d": 17.1
    },
    "chainlink": {
      "price": 26.12,
      "change": -1.4,
      "change24h": 4.8,
      "change7d": 12.7
    },
    "chainlink2": {
      "price": 123.12,
      "change": -1.4,
      "change24h": 1.9,
      "change7d": 1.7
    },
    "avalanche": {
      "price": 124.23,
      "change": 2.3,
      "change24h": 1.9,
      "change7d": -3.3
    }
  };
  
  const coinNames = Object.keys(data);
  
  const coinElements = coinNames.map(coinName => {
    const coinData = data[coinName];
    const coinElement = document.createElement('div');
    coinElement.classList.add('coin');
    coinElement.innerHTML = `
      <div class="coin-name">${coinName}</div>
      <div class="coin-price">${coinData.price}</div>
      <div class="coin-change">${coinData.change}%</div>
      <div class="coin-change24h">${coinData.change24h}%</div>
      <div class="coin-change7d">${coinData.change7d}%</div>
    `;
    return coinElement;
  });
  
  const coinContainer = document.getElementById('coin-container');
  coinElements.forEach(coinElement => coinContainer.appendChild(coinElement));
  
  // Add styling to the elements
  const style = document.createElement('style');
  style.innerHTML = `
    .coin {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin-bottom: 10px;
      background-color: #222;
      color: #fff;
      border-radius: 5px;
    }
  
    .coin-name {
      font-weight: bold;
    }
  
    .coin-price {
      font-size: 18px;
    }
  
    .coin-change {
      color: ${coinData.change > 0 ? 'green' : 'red'};
    }
  
    .coin-change24h,
    .coin-change7d {
      color: #fff;
      font-size: 12px;
    }
  `;
  document.head.appendChild(style);