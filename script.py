import matplotlib.pyplot as plt
import numpy as np

# Create the figure and axes
fig, ax = plt.subplots(figsize=(12, 6))

# Set the background color
fig.patch.set_facecolor('#C8A2C8')
ax.set_facecolor('#181818')

# Set the grid and spines
ax.grid(False)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['bottom'].set_visible(False)
ax.spines['left'].set_visible(False)

# Set the x and y ticks
ax.set_xticks([])
ax.set_yticks([])

# Create the data
x = np.linspace(0, 10, 100)
y1 = np.sin(x) + np.random.rand(100) * 0.2
y2 = np.cos(x) + np.random.rand(100) * 0.2

# Plot the data
ax.plot(x, y1, color='#FF5733', linewidth=2)
ax.plot(x, y2, color='#2ECC71', linewidth=2)

# Add labels and title
ax.set_title('Cryptocurrency Prices', color='white')
ax.set_xlabel('Time', color='white')
ax.set_ylabel('Price', color='white')

# Add the legend
ax.legend(['Bitcoin', 'Ethereum'], loc='upper left', frameon=False, facecolor='black')

# Set the font properties
font = {'family': 'Arial', 'size': 10, 'color': 'white'}

# Add the text elements
ax.text(0.05, 0.95, 'MOON\nCAKE', transform=ax.transAxes, fontdict=font)
ax.text(0.15, 0.95, 'Dashboard', transform=ax.transAxes, fontdict=font)
ax.text(0.25, 0.95, 'Bitcoin\nBTC', transform=ax.transAxes, fontdict=font)
ax.text(0.35, 0.95, '$57,626.63\n$5659.67', transform=ax.transAxes, fontdict=font)
ax.text(0.45, 0.95, '1.4%\n5h', transform=ax.transAxes, fontdict=font)
ax.text(0.55, 0.95, '1.9%\n24h', transform=ax.transAxes, fontdict=font)
ax.text(0.65, 0.95, '17.1%\n7days', transform=ax.transAxes, fontdict=font)
ax.text(0.25, 0.85, 'Ethereum\nETH', transform=ax.transAxes, fontdict=font)
ax.text(0.35, 0.85, '$4,285.08\n$129.67', transform=ax.transAxes, fontdict=font)
ax.text(0.25, 0.75, 'Chainlink\nLINK', transform=ax.transAxes, fontdict=font)
ax.text(0.35, 0.75, '$26.12\n$1.81', transform=ax.transAxes, fontdict=font)
ax.text(0.45, 0.75, '-1.4%\n5h', transform=ax.transAxes, fontdict=font)
ax.text(0.55, 0.75, '4.8%\n24h', transform=ax.transAxes, fontdict=font)
ax.text(0.65, 0.75, '12.7%\n7days', transform=ax.transAxes, fontdict=font)
ax.text(0.25, 0.65, 'Chainlink\nLINK', transform=ax.transAxes, fontdict=font)
ax.text(0.35, 0.65, '$123.12\n$6.12', transform=ax.transAxes, fontdict=font)
ax.text(0.45, 0.65, '-1.4%\n5h', transform=ax.transAxes, fontdict=font)
ax.text(0.55, 0.65, '1.9%\n24h', transform=ax.transAxes, fontdict=font)
ax.text(0.65, 0.65, '1.7%\n7days', transform=ax.transAxes, fontdict=font)
ax.text(0.25, 0.55, 'Avalanche\nAVAX', transform=ax.transAxes, fontdict=font)
ax.text(0.35, 0.55, '$124.23\n$12.13', transform=ax.transAxes, fontdict=font)
ax.text(0.45, 0.55, '2.3%\n5h', transform=ax.transAxes, fontdict=font)
ax.text(0.55, 0.55, '1.9%\n24h', transform=ax.transAxes, fontdict=font)
ax.text(0.65, 0.55, '-3.3%\n7days', transform=ax.transAxes, fontdict=font)
ax.text(0.75, 0.95, 'Your balance', transform=ax.transAxes, fontdict=font)
ax.text(0.75, 0.85, '$ 12 000.00\n+17.1%', transform=ax.transAxes, fontdict=font)
ax.text(0.75, 0.75, '$ 12 000.00\nETH -33%', transform=ax.transAxes, fontdict=font)
ax.text(0.75, 0.65, '$4 999.23\nDOT -33%', transform=ax.transAxes, fontdict=font)
ax.text(0.85, 0.85, '$ 9 000.00\nBTC -33%', transform=ax.transAxes, fontdict=font)
ax.text(0.85, 0.75, '$ 2 230.00\nLUNA -12.11%', transform=ax.transAxes, fontdict=font)
ax.text(0.75, 0.55, '↑ $59.67\nWallet profit 3H', transform=ax.transAxes, fontdict=font)
ax.text(0.85, 0.55, '11 coins\nOn your watchlist', transform=ax.transAxes, fontdict=font)
ax.text(0.75, 0.45, '39.56%\nSton Market\nCap DominancE', transform=ax.transAxes, fontdict=font)
ax.text(0.85, 0.45, '74%\nExtreme\nGreed\nFear and greed index', transform=ax.transAxes, fontdict=font)

# Display the plot
plt.show()