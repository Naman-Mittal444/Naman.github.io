// ==================== CONFIGURATION ====================
const CONFIG = {
    COINS: ['BTC', 'ETH', 'XRP', 'SOL', 'DOGE', 'ADA', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'ATOM', 'LTC', 'BCH', 'SHIB', 'ARB'],
    EXCHANGES: ['binance', 'coinbase', 'kraken', 'bybit', 'okx', 'kucoin'],
    
    EXCHANGE_COLORS: {
        binance: 'text-yellow-400',
        coinbase: 'text-blue-400',
        kraken: 'text-purple-400',
        bybit: 'text-orange-400',
        okx: 'text-cyan-400',
        kucoin: 'text-green-400'
    },

    BASE_PRICES: {
        BTC: 67500, ETH: 3450, XRP: 0.52, SOL: 145, DOGE: 0.125,
        ADA: 0.45, AVAX: 35.5, DOT: 7.2, MATIC: 0.58, LINK: 14.5,
        UNI: 7.8, ATOM: 8.5, LTC: 85, BCH: 380, SHIB: 0.000024, ARB: 1.15
    },

    WITHDRAWAL_FEES: {
        binance: { BTC: 0.0005, ETH: 0.005, XRP: 0.25, SOL: 0.01, DOGE: 5, ADA: 1, AVAX: 0.01, DOT: 0.1, MATIC: 0.1, LINK: 0.3, UNI: 0.5, ATOM: 0.01, LTC: 0.001, BCH: 0.0001, SHIB: 500000, ARB: 0.1 },
        coinbase: { BTC: 0.0006, ETH: 0.008, XRP: 0.5, SOL: 0.02, DOGE: 8, ADA: 2, AVAX: 0.02, DOT: 0.2, MATIC: 5, LINK: 0.5, UNI: 1, ATOM: 0.02, LTC: 0.002, BCH: 0.0002, SHIB: 800000, ARB: 0.2 },
        kraken: { BTC: 0.0004, ETH: 0.004, XRP: 0.02, SOL: 0.01, DOGE: 4, ADA: 0.6, AVAX: 0.01, DOT: 0.05, MATIC: 10, LINK: 0.2, UNI: 0.3, ATOM: 0.005, LTC: 0.001, BCH: 0.0001, SHIB: 400000, ARB: 0.08 },
        bybit: { BTC: 0.0005, ETH: 0.005, XRP: 0.25, SOL: 0.01, DOGE: 5, ADA: 1, AVAX: 0.01, DOT: 0.1, MATIC: 0.1, LINK: 0.3, UNI: 0.5, ATOM: 0.01, LTC: 0.001, BCH: 0.0001, SHIB: 500000, ARB: 0.1 },
        okx: { BTC: 0.0004, ETH: 0.004, XRP: 0.2, SOL: 0.008, DOGE: 4, ADA: 0.8, AVAX: 0.008, DOT: 0.08, MATIC: 0.08, LINK: 0.25, UNI: 0.4, ATOM: 0.008, LTC: 0.001, BCH: 0.0001, SHIB: 400000, ARB: 0.08 },
        kucoin: { BTC: 0.0005, ETH: 0.005, XRP: 0.25, SOL: 0.01, DOGE: 5, ADA: 1, AVAX: 0.01, DOT: 0.1, MATIC: 0.1, LINK: 0.3, UNI: 0.5, ATOM: 0.01, LTC: 0.001, BCH: 0.0001, SHIB: 500000, ARB: 0.1 }
    },

    DEFAULT_TRADING_FEES: {
        binance: 0.001, coinbase: 0.005, kraken: 0.0026,
        bybit: 0.001, okx: 0.001, kucoin: 0.001
    },

    EXCHANGE_LATENCY: {
        binance: 45, coinbase: 62, kraken: 78,
        bybit: 55, okx: 48, kucoin: 52
    },

    NETWORK_FEES: {
        ERC20: { name: 'Ethereum', fee: 15.50, gwei: 45 },
        BEP20: { name: 'BSC', fee: 0.15, gwei: 5 },
        TRC20: { name: 'Tron', fee: 1.00, gwei: 0 },
        SOL: { name: 'Solana', fee: 0.02, gwei: 0 },
        AVAX: { name: 'Avalanche', fee: 0.50, gwei: 0 },
        MATIC: { name: 'Polygon', fee: 0.05, gwei: 0 },
        ARB: { name: 'Arbitrum', fee: 0.30, gwei: 0 }
    }
};

// ==================== STATE ====================
const state = {
    prices: {},
    priceHistory: {},
    previousPrices: {},
    opportunities: [],
    alertHistory: [],
    autoRefreshInterval: null,
    isAutoRefreshEnabled: true,
    pinnedCoins: new Set(),
    watchlist: new Set(),
    sortColumn: 'netProfit',
    sortDirection: 'desc',
    paperTradeBalance: 100000,
    paperTradePnL: 0,
    tradesExecuted: 0,
    opportunityFrequency: {},
    expertMode: true,
    spreadHistory: [],
    totalScanned: 0,
    sessionStartTime: Date.now(),
    totalOpportunitiesFound: 0,
    lastAlertTime: 0,
    tradingFees: { ...CONFIG.DEFAULT_TRADING_FEES },
    isModalOpen: false,
    currentTab: 'dashboard',
    dataFreshness: {}
};

// Charts
let spreadChart = null;
let riskChart = null;
let freqChart = null;
let profitChart = null;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadSettings();
    initializeCharts();
    initializePriceHistory();
    setupEventListeners();
    fetchAllPrices();
    startAutoRefresh();
    updateClock();
    setInterval(updateClock, 1000);
    setInterval(updateDataFreshness, 1000);
    
    console.log('🚀 Crypto Arbitrage Pro initialized');
}

function initializePriceHistory() {
    CONFIG.COINS.forEach(coin => {
        state.priceHistory[coin] = [];
        state.opportunityFrequency[coin] = 0;
    });
}

function loadSettings() {
    try {
        const saved = localStorage.getItem('arbitrageProSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            
            if (settings.tradeAmount) {
                document.getElementById('tradeAmount').value = settings.tradeAmount;
            }
            if (settings.minProfit !== undefined) {
                document.getElementById('minProfit').value = settings.minProfit;
            }
            if (settings.slippage) {
                document.getElementById('slippagePercent').value = settings.slippage;
            }
            if (settings.pinnedCoins) {
                state.pinnedCoins = new Set(settings.pinnedCoins);
            }
            if (settings.watchlist) {
                state.watchlist = new Set(settings.watchlist);
            }
            if (settings.tradingFees) {
                state.tradingFees = settings.tradingFees;
            }
            if (settings.paperTradeBalance) {
                state.paperTradeBalance = settings.paperTradeBalance;
                state.paperTradePnL = settings.paperTradePnL || 0;
                state.tradesExecuted = settings.tradesExecuted || 0;
            }
        }
    } catch (e) {
        console.warn('Failed to load settings:', e);
    }
}

function saveSettings() {
    const settings = {
        tradeAmount: document.getElementById('tradeAmount')?.value,
        minProfit: document.getElementById('minProfit')?.value,
        slippage: document.getElementById('slippagePercent')?.value,
        pinnedCoins: Array.from(state.pinnedCoins),
        watchlist: Array.from(state.watchlist),
        tradingFees: state.tradingFees,
        paperTradeBalance: state.paperTradeBalance,
        paperTradePnL: state.paperTradePnL,
        tradesExecuted: state.tradesExecuted
    };
    
    try {
        localStorage.setItem('arbitrageProSettings', JSON.stringify(settings));
        showToast('Settings saved!', 'success');
    } catch (e) {
        showToast('Failed to save settings', 'error');
    }
}

function setupEventListeners() {
    // Search input
    document.getElementById('coinSearch')?.addEventListener('input', debounce(updatePricesTable, 300));
    
    // Trade parameters
    ['tradeAmount', 'minProfit', 'slippagePercent'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', calculateArbitrage);
    });
    
    // Filters
    document.getElementById('showProfitableOnly')?.addEventListener('change', renderArbitrageTable);
    
    // Refresh rate
    document.getElementById('refreshRate')?.addEventListener('change', () => {
        if (state.isAutoRefreshEnabled) startAutoRefresh();
    });
    
    // Exchange toggles
    document.querySelectorAll('.exchange-toggle').forEach(toggle => {
        toggle.addEventListener('change', fetchAllPrices);
    });
    
    // Mode toggles
    ['realisticMode', 'useBidAsk', 'includeLatency', 'dynamicGas'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', calculateArbitrage);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Close modal on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isModalOpen) {
            closeModal();
        }
    });
}

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + R = Refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        fetchAllPrices();
    }
    
    // Ctrl/Cmd + P = Pause/Play
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        toggleAutoRefresh();
    }
    
    // 1-6 for tabs
    if (e.key >= '1' && e.key <= '6' && !e.ctrlKey && !e.metaKey) {
        const tabs = ['dashboard', 'opportunities', 'analytics', 'simulation', 'settings', 'alerts'];
        const index = parseInt(e.key) - 1;
        if (tabs[index]) {
            switchTab(tabs[index]);
        }
    }
}

// ==================== API FETCHING ====================
async function fetchExchangePrices(exchange) {
    const startTime = performance.now();
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, Math.random() * 300 + 100));
    
    const result = {};
    const useBidAsk = document.getElementById('useBidAsk')?.checked;
    
    for (const coin of CONFIG.COINS) {
        // Store previous price for change detection
        const prevPrice = state.prices[exchange]?.[coin]?.mid;
        
        // Simulate realistic price variations between exchanges
        const baseVariation = (Math.random() - 0.5) * 0.015;
        const exchangeOffset = {
            binance: 0,
            coinbase: 0.002,
            kraken: -0.001,
            bybit: 0.0005,
            okx: -0.0005,
            kucoin: 0.001
        }[exchange] || 0;
        
        const midPrice = CONFIG.BASE_PRICES[coin] * (1 + baseVariation + exchangeOffset);
        const spread = midPrice * (0.0005 + Math.random() * 0.002);
        
        result[coin] = {
            mid: midPrice,
            bid: midPrice - spread / 2,
            ask: midPrice + spread / 2,
            volume: Math.random() * 1000000,
            change24h: (Math.random() - 0.5) * 10,
            prevPrice: prevPrice,
            timestamp: Date.now()
        };
    }
    
    const latency = performance.now() - startTime;
    updateExchangeStatus(exchange, latency);
    state.dataFreshness[exchange] = Date.now();
    
    return { exchange, prices: result, latency };
}

async function fetchAllPrices() {
    const statusEl = document.getElementById('status');
    statusEl.textContent = 'Fetching from all exchanges...';
    statusEl.className = 'text-yellow-400 text-sm';

    const startTime = performance.now();
    
    try {
        const enabledExchanges = getEnabledExchanges();

        // SIMULTANEOUS FETCHING - Like Python asyncio.gather()
        const results = await Promise.all(
            enabledExchanges.map(ex => fetchExchangePrices(ex))
        );

        const totalLatency = performance.now() - startTime;
        document.getElementById('fetchLatency').textContent = `${totalLatency.toFixed(0)}ms`;

        // Store previous prices for comparison
        state.previousPrices = JSON.parse(JSON.stringify(state.prices));

        // Store new prices
        results.forEach(({ exchange, prices: exchangePrices }) => {
            state.prices[exchange] = exchangePrices;
        });

        // Update price history for sparklines
        CONFIG.COINS.forEach(coin => {
            const avgPrice = Object.values(state.prices).reduce((sum, ex) => sum + (ex[coin]?.mid || 0), 0) / Object.keys(state.prices).length;
            if (!state.priceHistory[coin]) state.priceHistory[coin] = [];
            state.priceHistory[coin].push(avgPrice);
            if (state.priceHistory[coin].length > 30) state.priceHistory[coin].shift();
        });

        // Update UI
        updatePricesTable();
        calculateArbitrage();
        updateAnalytics();

        statusEl.textContent = `Live - ${enabledExchanges.length} exchanges synced`;
        statusEl.className = 'text-green-400 text-sm';
        document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();

    } catch (error) {
        statusEl.textContent = `Error: ${error.message}`;
        statusEl.className = 'text-red-400 text-sm';
        console.error('Fetch error:', error);
    }
}

function getEnabledExchanges() {
    return CONFIG.EXCHANGES.filter(ex => {
        const toggle = document.querySelector(`.exchange-toggle[data-exchange="${ex}"]`);
        return toggle ? toggle.checked : true;
    });
}

function updateExchangeStatus(exchange, latency) {
    const statusEl = document.getElementById(`status-${exchange}`);
    if (statusEl) {
        const latencySpan = statusEl.querySelector('span:last-child');
        const statusDot = statusEl.querySelector('.pulse-dot');
        
        if (latencySpan) {
            latencySpan.textContent = `${latency.toFixed(0)}ms`;
            latencySpan.className = latency < 100 ? 'text-xs text-green-400' : 
                                     latency < 200 ? 'text-xs text-yellow-400' : 'text-xs text-red-400';
        }
        
        if (statusDot) {
            statusDot.className = `w-2 h-2 rounded-full pulse-dot ${latency < 200 ? 'bg-green-500' : 'bg-yellow-500'}`;
        }
    }
}

function updateDataFreshness() {
    const now = Date.now();
    CONFIG.EXCHANGES.forEach(exchange => {
        const lastUpdate = state.dataFreshness[exchange];
        const statusEl = document.getElementById(`status-${exchange}`);
        const dot = statusEl?.querySelector('.pulse-dot');
        
        if (dot && lastUpdate) {
            const age = now - lastUpdate;
            if (age > 30000) {
                dot.className = 'w-2 h-2 rounded-full bg-red-500';
            } else if (age > 10000) {
                dot.className = 'w-2 h-2 rounded-full bg-yellow-500 pulse-dot';
            } else {
                dot.className = 'w-2 h-2 rounded-full bg-green-500 pulse-dot';
            }
        }
    });
}

// ==================== PRICE TABLE ====================
function updatePricesTable() {
    const tbody = document.getElementById('pricesTable');
    const searchTerm = (document.getElementById('coinSearch')?.value || '').toLowerCase();
    
    let sortedCoins = [...CONFIG.COINS].filter(coin => coin.toLowerCase().includes(searchTerm));
    
    // Sort: pinned first, then watchlist, then alphabetically
    sortedCoins.sort((a, b) => {
        if (state.pinnedCoins.has(a) && !state.pinnedCoins.has(b)) return -1;
        if (!state.pinnedCoins.has(a) && state.pinnedCoins.has(b)) return 1;
        if (state.watchlist.has(a) && !state.watchlist.has(b)) return -1;
        if (!state.watchlist.has(a) && state.watchlist.has(b)) return 1;
        return 0;
    });

    const enabledExchanges = getEnabledExchanges();
    let html = '';

    sortedCoins.forEach(coin => {
        const exchangePrices = enabledExchanges.map(ex => ({
            exchange: ex,
            price: state.prices[ex]?.[coin]?.mid || 0,
            bid: state.prices[ex]?.[coin]?.bid || 0,
            ask: state.prices[ex]?.[coin]?.ask || 0,
            prevPrice: state.previousPrices[ex]?.[coin]?.mid || 0
        })).filter(p => p.price > 0);

        if (exchangePrices.length === 0) return;

        const maxPrice = Math.max(...exchangePrices.map(p => p.price));
        const minPrice = Math.min(...exchangePrices.map(p => p.price));
        const spread = ((maxPrice - minPrice) / minPrice * 100).toFixed(3);
        
        const history = state.priceHistory[coin] || [];
        const volatility = history.length > 5 ? calculateVolatility(history) : 0;

        const isPinned = state.pinnedCoins.has(coin);
        const isWatched = state.watchlist.has(coin);
        const sparklineData = generateSparklineSVG(state.priceHistory[coin] || []);

        html += `
            <tr class="border-b border-gray-800 hover:bg-gray-800/50 transition ${isPinned ? 'pinned' : ''}" 
                onclick="togglePin('${coin}')" data-coin="${coin}">
                <td class="py-2 px-3 font-semibold">
                    <div class="flex items-center gap-2">
                        <span class="watchlist-star ${isWatched ? 'active' : ''}" 
                              onclick="event.stopPropagation(); toggleWatchlist('${coin}')">
                            <i class="fas fa-star text-xs"></i>
                        </span>
                        ${isPinned ? '<i class="fas fa-thumbtack text-yellow-400 text-xs"></i>' : ''}
                        <span>${coin}</span>
                    </div>
                </td>
                <td class="py-2 px-3">${sparklineData}</td>
                ${enabledExchanges.map(ex => {
                    const p = state.prices[ex]?.[coin];
                    if (!p) return '<td class="py-2 px-3 text-gray-500">--</td>';
                    
                    const isMax = p.mid === maxPrice && parseFloat(spread) > 0.1;
                    const isMin = p.mid === minPrice && parseFloat(spread) > 0.1;
                    const priceChange = p.prevPrice ? ((p.mid - p.prevPrice) / p.prevPrice * 100) : 0;
                    const changeClass = priceChange > 0 ? 'text-green-400' : priceChange < 0 ? 'text-red-400' : '';
                    
                    return `<td class="py-2 px-3 ${isMax ? 'text-green-400 font-semibold' : isMin ? 'text-red-400' : ''}">
                        <div class="flex flex-col">
                            <span>${formatPrice(p.mid)}</span>
                            <span class="text-xs text-gray-500">${formatPrice(p.bid)}/${formatPrice(p.ask)}</span>
                            ${priceChange !== 0 ? `<span class="text-xs ${changeClass}">${priceChange > 0 ? '+' : ''}${priceChange.toFixed(2)}%</span>` : ''}
                        </div>
                    </td>`;
                }).join('')}
                <td class="py-2 px-3">
                    <span class="${parseFloat(spread) > 0.5 ? 'text-green-400 font-bold' : parseFloat(spread) > 0.3 ? 'text-yellow-400 font-semibold' : 'text-gray-400'}">
                        ${spread}%
                    </span>
                </td>
                <td class="py-2 px-3">
                    <div class="flex items-center gap-2">
                        <div class="w-16 h-2 bg-gray-700 rounded overflow-hidden">
                            <div class="h-full ${volatility > 3 ? 'bg-red-500' : volatility > 1.5 ? 'bg-yellow-500' : 'bg-green-500'}" 
                                 style="width: ${Math.min(volatility * 20, 100)}%"></div>
                        </div>
                        <span class="text-xs text-gray-400">${volatility.toFixed(1)}%</span>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html || '<tr><td colspan="10" class="text-center py-8 text-gray-500">No coins match filter</td></tr>';
}

function generateSparklineSVG(data) {
    if (data.length < 2) return '<span class="text-gray-500">--</span>';
    
    const width = 60;
    const height = 20;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');
    
    const trend = data[data.length - 1] > data[0] ? '#10b981' : '#ef4444';
    
    return `<svg width="${width}" height="${height}" class="sparkline">
        <polyline points="${points}" fill="none" stroke="${trend}" stroke-width="1.5"/>
    </svg>`;
}

function calculateVolatility(data) {
    if (data.length < 2) return 0;
    const returns = [];
    for (let i = 1; i < data.length; i++) {
        returns.push((data[i] - data[i-1]) / data[i-1] * 100);
    }
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    return Math.sqrt(variance);
}

// ==================== ARBITRAGE CALCULATION ====================
function calculateArbitrage() {
    const tradeAmount = parseFloat(document.getElementById('tradeAmount')?.value) || 10000;
    const minProfitFilter = parseFloat(document.getElementById('minProfit')?.value) || -100;
    const slippagePercent = parseFloat(document.getElementById('slippagePercent')?.value) || 0;
    const realisticMode = document.getElementById('realisticMode')?.checked;
    const useBidAsk = document.getElementById('useBidAsk')?.checked;
    const includeLatency = document.getElementById('includeLatency')?.checked;
    const dynamicGas = document.getElementById('dynamicGas')?.checked;

    const enabledExchanges = getEnabledExchanges();

    state.opportunities = [];
    state.totalScanned = 0;

    for (const coin of CONFIG.COINS) {
        for (let i = 0; i < enabledExchanges.length; i++) {
            for (let j = 0; j < enabledExchanges.length; j++) {
                if (i === j) continue;

                const buyExchange = enabledExchanges[i];
                const sellExchange = enabledExchanges[j];
                
                const buyData = state.prices[buyExchange]?.[coin];
                const sellData = state.prices[sellExchange]?.[coin];
                
                if (!buyData || !sellData) continue;

                state.totalScanned++;

                // Use ask for buying, bid for selling (realistic)
                const buyPrice = useBidAsk ? buyData.ask : buyData.mid;
                const sellPrice = useBidAsk ? sellData.bid : sellData.mid;

                // Calculate coin amount after slippage
                const slippageCost = tradeAmount * (slippagePercent / 100);
                const effectiveTradeAmount = tradeAmount - slippageCost;
                const coinAmount = effectiveTradeAmount / buyPrice;

                // Calculate revenue
                const grossRevenue = coinAmount * sellPrice;
                const grossProfit = grossRevenue - tradeAmount;

                // Calculate all fees
                const buyTradingFee = tradeAmount * (state.tradingFees[buyExchange] || 0.001);
                const sellTradingFee = grossRevenue * (state.tradingFees[sellExchange] || 0.001);
                
                let withdrawalFee = (CONFIG.WITHDRAWAL_FEES[buyExchange]?.[coin] || 0) * sellPrice;
                
                // Dynamic gas fees
                if (dynamicGas && ['ETH', 'UNI', 'LINK'].includes(coin)) {
                    withdrawalFee += CONFIG.NETWORK_FEES.ERC20.fee * (0.8 + Math.random() * 0.4);
                }
                
                // Latency risk
                const latencyRisk = includeLatency ? tradeAmount * 0.001 * (Math.random() + 0.5) : 0;
                
                const totalFees = buyTradingFee + sellTradingFee + withdrawalFee + slippageCost + latencyRisk;
                const netProfit = grossProfit - totalFees;
                const roi = (netProfit / tradeAmount) * 100;

                // Calculate metrics
                const confidence = calculateConfidence(coin, buyExchange, sellExchange, roi, grossProfit);
                const riskLevel = calculateRiskLevel(roi, confidence, withdrawalFee, tradeAmount);
                const successProbability = calculateSuccessProbability(roi, confidence, riskLevel);

                if (roi >= minProfitFilter) {
                    const opportunity = {
                        id: `${coin}-${buyExchange}-${sellExchange}-${Date.now()}`,
                        coin,
                        buyExchange,
                        sellExchange,
                        buyPrice,
                        sellPrice,
                        grossProfit,
                        totalFees,
                        netProfit,
                        roi,
                        confidence,
                        riskLevel,
                        successProbability,
                        isProfitable: netProfit > 0,
                        feeBreakdown: { buyTradingFee, sellTradingFee, withdrawalFee, slippageCost, latencyRisk },
                        timestamp: Date.now(),
                        expiresAt: Date.now() + 30000 // 30 second window
                    };
                    
                    state.opportunities.push(opportunity);

                    if (netProfit > 0) {
                        state.opportunityFrequency[coin] = (state.opportunityFrequency[coin] || 0) + 1;
                        state.totalOpportunitiesFound++;
                    }
                }
            }
        }
    }

    // Sort opportunities
    state.opportunities.sort((a, b) => {
        const aVal = a[state.sortColumn] || 0;
        const bVal = b[state.sortColumn] || 0;
        return state.sortDirection === 'desc' ? bVal - aVal : aVal - bVal;
    });

    updateStats();
    renderArbitrageTable();
    checkAlerts();
}

function calculateConfidence(coin, buyEx, sellEx, roi, grossProfit) {
    let score = 50;
    
    // ROI sanity check
    if (roi > 2) score -= 20;
    else if (roi > 1) score -= 10;
    else if (roi > 0.5) score += 10;
    else if (roi > 0) score += 20;
    
    // Exchange reliability
    if (['binance', 'coinbase'].includes(buyEx)) score += 10;
    if (['binance', 'coinbase'].includes(sellEx)) score += 10;
    
    // Volume/liquidity (simulated)
    score += Math.random() * 10;
    
    // Spread consistency
    const history = state.priceHistory[coin] || [];
    if (history.length > 10) {
        const volatility = calculateVolatility(history);
        if (volatility < 1) score += 10;
        else if (volatility > 3) score -= 10;
    }
    
    return Math.max(0, Math.min(100, score));
}

function calculateRiskLevel(roi, confidence, withdrawalFee, tradeAmount) {
    if (confidence < 30 || roi > 3) return 'high';
    if (confidence < 60 || withdrawalFee > tradeAmount * 0.01) return 'medium';
    return 'low';
}

function calculateSuccessProbability(roi, confidence, riskLevel) {
    let prob = confidence;
    
    if (riskLevel === 'high') prob *= 0.5;
    else if (riskLevel === 'medium') prob *= 0.75;
    
    if (roi > 1) prob *= 0.8;
    if (roi > 2) prob *= 0.6;
    
    return Math.max(5, Math.min(95, prob));
}

function updateStats() {
    const profitable = state.opportunities.filter(o => o.isProfitable);
    const highRisk = state.opportunities.filter(o => o.riskLevel === 'high');
    
    document.getElementById('statActivePairs').textContent = state.opportunities.length;
    document.getElementById('statProfitable').textContent = profitable.length;
    document.getElementById('statHighRisk').textContent = highRisk.length;
    
    if (profitable.length > 0) {
        const best = profitable[0];
        document.getElementById('statBestProfit').textContent = formatPrice(best.netProfit);
        document.getElementById('statBestROI').textContent = best.roi.toFixed(2) + '%';
        document.getElementById('statConfidence').textContent = Math.round(best.confidence) + '%';
    } else {
        document.getElementById('statBestProfit').textContent = '$0';
        document.getElementById('statBestROI').textContent = '0%';
        document.getElementById('statConfidence').textContent = '--';
    }

    document.getElementById('totalScanned').textContent = state.totalScanned;
    
    // Update performance stats
    const sessionMinutes = (Date.now() - state.sessionStartTime) / 60000;
    const oppsPerHour = sessionMinutes > 0 ? (state.totalOpportunitiesFound / sessionMinutes * 60).toFixed(0) : 0;
    document.getElementById('oppsPerHour').textContent = oppsPerHour;
    
    const avgProfit = profitable.length > 0 
        ? profitable.reduce((sum, o) => sum + o.netProfit, 0) / profitable.length 
        : 0;
    document.getElementById('avgProfit').textContent = formatPrice(avgProfit);
    
    const successRate = state.opportunities.length > 0 
        ? ((profitable.length / state.opportunities.length) * 100).toFixed(1) + '%'
        : '0%';
    document.getElementById('successRate').textContent = successRate;
}

function renderArbitrageTable() {
    const tbody = document.getElementById('arbitrageTable');
    const showProfitableOnly = document.getElementById('showProfitableOnly')?.checked;
    
    let filtered = showProfitableOnly 
        ? state.opportunities.filter(o => o.isProfitable) 
        : state.opportunities;
    
    document.getElementById('oppCount').textContent = filtered.length;

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="text-center py-8 text-gray-500">No opportunities found matching criteria</td></tr>';
        return;
    }

    const now = Date.now();
    let html = '';
    
    filtered.slice(0, 100).forEach((opp, index) => {
        const profitClass = opp.isProfitable ? 'text-green-400' : 'text-red-400';
        const riskBadge = {
            low: '<span class="badge badge-success">LOW</span>',
            medium: '<span class="badge badge-warning">MED</span>',
            high: '<span class="badge badge-danger">HIGH</span>'
        }[opp.riskLevel];

        const confidenceColor = opp.confidence >= 70 ? 'text-green-400' : 
                                opp.confidence >= 40 ? 'text-yellow-400' : 'text-red-400';
        
        const isNew = (now - opp.timestamp) < 5000;
        const isExpiring = opp.expiresAt - now < 10000;
        
        const rowClass = isNew ? 'opportunity-flash' : isExpiring ? 'opacity-60' : '';
        const bestClass = opp.isProfitable && index === 0 ? 'glow-green' : '';

        html += `
            <tr class="border-b border-gray-800 hover:bg-gray-800/50 transition ${rowClass} ${bestClass}" 
                id="opp-${index}" data-opp-id="${opp.id}">
                <td class="py-2 px-3 font-semibold">
                    <div class="flex items-center gap-2">
                        ${isNew ? '<span class="badge badge-info text-xs">NEW</span>' : ''}
                        ${opp.coin}
                    </div>
                </td>
                <td class="py-2 px-3">
                    <div class="flex items-center gap-1 text-xs">
                        <span class="${CONFIG.EXCHANGE_COLORS[opp.buyExchange]}">${capitalize(opp.buyExchange)}</span>
                        <i class="fas fa-arrow-right text-gray-500"></i>
                        <span class="${CONFIG.EXCHANGE_COLORS[opp.sellExchange]}">${capitalize(opp.sellExchange)}</span>
                    </div>
                </td>
                <td class="py-2 px-3 text-sm">${formatPrice(opp.buyPrice)}</td>
                <td class="py-2 px-3 text-sm">${formatPrice(opp.sellPrice)}</td>
                <td class="py-2 px-3 text-sm">${formatPrice(opp.grossProfit)}</td>
                <td class="py-2 px-3 text-sm text-orange-400">-${formatPrice(opp.totalFees)}</td>
                <td class="py-2 px-3 font-bold ${profitClass}">${formatPrice(opp.netProfit)}</td>
                <td class="py-2 px-3 font-bold ${profitClass}">${opp.roi.toFixed(3)}%</td>
                <td class="py-2 px-3">
                    <div class="flex items-center gap-2">
                        <div class="w-12 h-2 bg-gray-700 rounded overflow-hidden">
                            <div class="h-full confidence-meter" style="width: ${opp.confidence}%"></div>
                        </div>
                        <span class="${confidenceColor} text-xs">${Math.round(opp.confidence)}%</span>
                    </div>
                </td>
                <td class="py-2 px-3">${riskBadge}</td>
                <td class="py-2 px-3">
                    <div class="flex gap-1">
                        <button onclick="showOpportunityDetail(${index})" class="p-1 text-blue-400 hover:text-blue-300 transition" title="Details">
                            <i class="fas fa-info-circle"></i>
                        </button>
                        <button onclick="executePaperTrade(${index})" class="p-1 text-green-400 hover:text-green-300 transition" title="Paper Trade">
                            <i class="fas fa-play"></i>
                        </button>
                        <button onclick="shareOpportunity(${index})" class="p-1 text-purple-400 hover:text-purple-300 transition" title="Share">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// ==================== ALERTS ====================
function checkAlerts() {
    const now = Date.now();
    
    // Rate limit alerts (max once per 10 seconds)
    if (now - state.lastAlertTime < 10000) return;
    
    const profitThreshold = parseFloat(document.getElementById('alertProfitThreshold')?.value) || 50;
    const roiThreshold = parseFloat(document.getElementById('alertROIThreshold')?.value) || 0.5;
    const soundEnabled = document.getElementById('alertSound')?.checked;
    const bannerEnabled = document.getElementById('alertBanner')?.checked;
    const browserEnabled = document.getElementById('alertBrowser')?.checked;

    const highProfitOpps = state.opportunities.filter(o => 
        o.netProfit >= profitThreshold || o.roi >= roiThreshold
    );

    if (highProfitOpps.length > 0) {
        const best = highProfitOpps[0];
        state.lastAlertTime = now;
        
        if (soundEnabled) playAlertSound();
        
        if (bannerEnabled) {
            showAlertBanner(
                `${best.coin}: ${formatPrice(best.netProfit)} profit (${best.roi.toFixed(2)}% ROI)`,
                `Buy on ${capitalize(best.buyExchange)}, Sell on ${capitalize(best.sellExchange)}`
            );
        }

        if (browserEnabled && Notification.permission === 'granted') {
            new Notification('🚀 High ROI Opportunity!', {
                body: `${best.coin}: ${formatPrice(best.netProfit)} profit`,
                icon: '💰',
                tag: 'arbitrage-alert'
            });
        }

        addAlertToHistory(best);
        sendWebhookAlert(best);
    }
}

function playAlertSound() {
    const audio = document.getElementById('alertSound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

function showAlertBanner(title, message) {
    const banner = document.getElementById('alertBanner');
    document.getElementById('alertTitle').textContent = title;
    document.getElementById('alertMessage').textContent = message;
    banner.classList.remove('hidden');
    
    setTimeout(() => banner.classList.add('hidden'), 10000);
}

function dismissAlert() {
    document.getElementById('alertBanner').classList.add('hidden');
}

function addAlertToHistory(opp) {
    state.alertHistory.unshift({
        ...opp,
        time: new Date().toLocaleTimeString()
    });
    
    if (state.alertHistory.length > 50) state.alertHistory.pop();
    
    const container = document.getElementById('alertHistory');
    if (!container) return;
    
    container.innerHTML = state.alertHistory.map(alert => `
        <div class="p-2 bg-gray-800 rounded flex items-center justify-between fade-in">
            <div>
                <span class="font-semibold">${alert.coin}</span>
                <span class="text-gray-400 text-xs ml-2">${alert.buyExchange} → ${alert.sellExchange}</span>
            </div>
            <div class="text-right">
                <span class="text-green-400 font-semibold">${formatPrice(alert.netProfit)}</span>
                <span class="text-gray-400 text-xs block">${alert.time}</span>
            </div>
        </div>
    `).join('');
}

async function sendWebhookAlert(opp) {
    const discordUrl = document.getElementById('discordWebhook')?.value;
    const telegramToken = document.getElementById('telegramToken')?.value;
    const telegramChatId = document.getElementById('telegramChatId')?.value;

    if (!discordUrl && !telegramToken) return;

    const message = `🚀 **Arbitrage Alert**\n` +
        `Coin: ${opp.coin}\n` +
        `Route: ${capitalize(opp.buyExchange)} → ${capitalize(opp.sellExchange)}\n` +
        `Net Profit: ${formatPrice(opp.netProfit)}\n` +
        `ROI: ${opp.roi.toFixed(3)}%\n` +
        `Confidence: ${Math.round(opp.confidence)}%`;

    if (discordUrl) {
        try {
            await fetch(discordUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: message })
            });
        } catch (e) { console.log('Discord webhook failed'); }
    }

    if (telegramToken && telegramChatId) {
        try {
            await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: telegramChatId, text: message, parse_mode: 'Markdown' })
            });
        } catch (e) { console.log('Telegram webhook failed'); }
    }
}

function testWebhook() {
    sendWebhookAlert({
        coin: 'TEST',
        buyExchange: 'binance',
        sellExchange: 'coinbase',
        netProfit: 123.45,
        roi: 1.23,
        confidence: 85
    });
    showToast('Test webhook sent!', 'info');
}

function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            showToast(permission === 'granted' ? 'Notifications enabled!' : 'Notifications denied', 
                      permission === 'granted' ? 'success' : 'warning');
        });
    }
}

// ==================== MODAL ====================
function showOpportunityDetail(index) {
    const opp = state.opportunities[index];
    if (!opp) return;

    state.isModalOpen = true;
    const modal = document.getElementById('opportunityModal');
    const content = document.getElementById('modalContent');

    const timeRemaining = Math.max(0, Math.floor((opp.expiresAt - Date.now()) / 1000));

    content.innerHTML = `
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="p-4 bg-gray-800 rounded-lg">
                <h4 class="text-lg font-bold mb-2">${opp.coin}</h4>
                <div class="flex items-center gap-2">
                    <span class="${CONFIG.EXCHANGE_COLORS[opp.buyExchange]} font-semibold">${capitalize(opp.buyExchange)}</span>
                    <i class="fas fa-arrow-right text-gray-500"></i>
                    <span class="${CONFIG.EXCHANGE_COLORS[opp.sellExchange]} font-semibold">${capitalize(opp.sellExchange)}</span>
                </div>
                <p class="text-xs text-gray-400 mt-2">
                    <i class="fas fa-clock"></i> Window: ${timeRemaining}s remaining
                </p>
            </div>
            <div class="p-4 bg-gray-800 rounded-lg">
                <p class="text-gray-400 text-sm">Net Profit</p>
                <p class="text-2xl font-bold ${opp.isProfitable ? 'text-green-400' : 'text-red-400'}">${formatPrice(opp.netProfit)}</p>
                <p class="text-sm text-gray-400">${opp.roi.toFixed(3)}% ROI</p>
                <p class="text-xs text-gray-500 mt-1">Success Probability: ${opp.successProbability.toFixed(0)}%</p>
            </div>
        </div>

        <h4 class="font-bold mb-2">📊 Fee Breakdown</h4>
        <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
            <div class="p-2 bg-gray-800 rounded flex justify-between">
                <span>Buy Trading Fee:</span>
                <span class="text-orange-400">-${formatPrice(opp.feeBreakdown.buyTradingFee)}</span>
            </div>
            <div class="p-2 bg-gray-800 rounded flex justify-between">
                <span>Sell Trading Fee:</span>
                <span class="text-orange-400">-${formatPrice(opp.feeBreakdown.sellTradingFee)}</span>
            </div>
            <div class="p-2 bg-gray-800 rounded flex justify-between">
                <span>Withdrawal Fee:</span>
                <span class="text-orange-400">-${formatPrice(opp.feeBreakdown.withdrawalFee)}</span>
            </div>
            <div class="p-2 bg-gray-800 rounded flex justify-between">
                <span>Slippage Cost:</span>
                <span class="text-orange-400">-${formatPrice(opp.feeBreakdown.slippageCost)}</span>
            </div>
            <div class="p-2 bg-gray-800 rounded flex justify-between col-span-2">
                <span>Latency Risk:</span>
                <span class="text-orange-400">-${formatPrice(opp.feeBreakdown.latencyRisk)}</span>
            </div>
        </div>

        <h4 class="font-bold mb-2">🎯 Risk Assessment</h4>
        <div class="p-4 bg-gray-800 rounded-lg mb-4">
            <div class="flex items-center justify-between mb-2">
                <span>Confidence Score</span>
                <span class="${opp.confidence > 60 ? 'text-green-400' : 'text-yellow-400'}">${Math.round(opp.confidence)}%</span>
            </div>
            <div class="w-full h-3 bg-gray-700 rounded overflow-hidden">
                <div class="h-full confidence-meter" style="width: ${opp.confidence}%"></div>
            </div>
            <p class="text-xs text-gray-400 mt-2">
                ${opp.confidence > 70 ? '✅ High confidence - Good opportunity' : 
                  opp.confidence > 40 ? '⚠️ Medium confidence - Proceed with caution' : 
                  '❌ Low confidence - High risk of failure'}
            </p>
            
            <div class="mt-3 p-2 ${opp.riskLevel === 'low' ? 'bg-green-900/30' : opp.riskLevel === 'medium' ? 'bg-yellow-900/30' : 'bg-red-900/30'} rounded">
                <p class="text-sm font-semibold">Risk Level: ${opp.riskLevel.toUpperCase()}</p>
                <p class="text-xs text-gray-400">
                    ${opp.riskLevel === 'low' ? 'Reasonable spread, reliable exchanges, manageable fees' :
                      opp.riskLevel === 'medium' ? 'Moderate spread, some execution risk' :
                      'High spread variance, significant execution risk'}
                </p>
            </div>
        </div>

        <div class="flex gap-2">
            <button onclick="executePaperTrade(${index}); closeModal();" class="flex-1 btn btn-success">
                <i class="fas fa-play"></i> Paper Trade
            </button>
            <button onclick="shareOpportunity(${index})" class="flex-1 btn btn-ghost">
                <i class="fas fa-share"></i> Share
            </button>
            <button onclick="closeModal()" class="flex-1 btn btn-ghost">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeModal(event) {
    if (event && event.target !== event.currentTarget) return;
    
    const modal = document.getElementById('opportunityModal');
    modal.classList.add('hidden');
    state.isModalOpen = false;
}

// ==================== PAPER TRADING ====================
function executePaperTrade(index) {
    const opp = state.opportunities[index];
    if (!opp) return;

    const tradeAmount = parseFloat(document.getElementById('tradeAmount')?.value) || 10000;
    
    if (state.paperTradeBalance < tradeAmount) {
        showToast('Insufficient virtual balance!', 'error');
        return;
    }

    state.paperTradeBalance += opp.netProfit;
    state.paperTradePnL += opp.netProfit;
    state.tradesExecuted++;

    updatePaperTradingUI();
    addPaperTradeLog(opp, tradeAmount);
    saveSettings();

    showToast(`Trade executed: ${formatPrice(opp.netProfit)}`, opp.netProfit >= 0 ? 'success' : 'error');
}

function updatePaperTradingUI() {
    const balanceEl = document.getElementById('virtualBalance');
    const pnlEl = document.getElementById('totalPnL');
    const tradesEl = document.getElementById('tradesExecuted');
    
    if (balanceEl) balanceEl.textContent = formatPrice(state.paperTradeBalance);
    if (pnlEl) {
        pnlEl.textContent = formatPrice(state.paperTradePnL);
        pnlEl.className = state.paperTradePnL >= 0 ? 'font-bold text-green-400' : 'font-bold text-red-400';
    }
    if (tradesEl) tradesEl.textContent = state.tradesExecuted;
}

function addPaperTradeLog(opp, tradeAmount) {
    const log = document.getElementById('paperTradeLog');
    if (!log) return;
    
    // Remove placeholder if present
    const placeholder = log.querySelector('.text-gray-500');
    if (placeholder) placeholder.remove();
    
    const entry = document.createElement('div');
    entry.className = `p-2 rounded ${opp.netProfit >= 0 ? 'bg-green-900/30' : 'bg-red-900/30'} text-sm fade-in`;
    entry.innerHTML = `
        <div class="flex justify-between">
            <span>${opp.coin}: ${capitalize(opp.buyExchange)} → ${capitalize(opp.sellExchange)}</span>
            <span class="${opp.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}">${formatPrice(opp.netProfit)}</span>
        </div>
        <div class="text-gray-500 text-xs">${new Date().toLocaleTimeString()} | Amount: ${formatPrice(tradeAmount)}</div>
    `;
    log.insertBefore(entry, log.firstChild);
}

function resetPaperTrading() {
    if (!confirm('Reset paper trading balance to $100,000?')) return;
    
    state.paperTradeBalance = 100000;
    state.paperTradePnL = 0;
    state.tradesExecuted = 0;
    
    updatePaperTradingUI();
    
    const log = document.getElementById('paperTradeLog');
    if (log) log.innerHTML = '<p class="text-gray-500 text-center py-4">No trades yet. Click "Execute" on an opportunity.</p>';
    
    saveSettings();
    showToast('Paper trading reset!', 'success');
}

// ==================== CALCULATORS ====================
function calculateWhatIf() {
    const amount = parseFloat(document.getElementById('whatIfAmount')?.value) || 10000;
    const spread = parseFloat(document.getElementById('whatIfSpread')?.value) || 0.5;
    const slippage = parseFloat(document.getElementById('whatIfSlippage')?.value) || 0.1;
    const delay = parseFloat(document.getElementById('whatIfDelay')?.value) || 15;

    const grossProfit = amount * (spread / 100);
    const tradeFee = amount * 0.002;
    const withdrawFee = 30;
    const slippageCost = amount * (slippage / 100);
    const latencyRisk = amount * 0.0005 * (delay / 10);
    const netProfit = grossProfit - tradeFee - withdrawFee - slippageCost - latencyRisk;

    document.getElementById('wifGross').textContent = formatPrice(grossProfit);
    document.getElementById('wifTradeFee').textContent = formatPrice(tradeFee);
    document.getElementById('wifWithdrawFee').textContent = formatPrice(withdrawFee);
    document.getElementById('wifSlippage').textContent = formatPrice(slippageCost);
    document.getElementById('wifLatency').textContent = formatPrice(latencyRisk);
    
    const netEl = document.getElementById('wifNet');
    netEl.textContent = formatPrice(netProfit);
    netEl.className = netProfit >= 0 ? 'font-bold text-green-400' : 'font-bold text-red-400';
}

function runMonteCarlo() {
    const amount = parseFloat(document.getElementById('tradeAmount')?.value) || 10000;
    const results = [];

    for (let i = 0; i < 1000; i++) {
        const spread = (Math.random() - 0.3) * 1.5;
        const slippage = Math.random() * 0.3;
        const fees = amount * 0.003;
        const profit = amount * (spread / 100) - amount * (slippage / 100) - fees;
        results.push(profit);
    }

    results.sort((a, b) => a - b);
    
    const best = results[results.length - 1];
    const worst = results[0];
    const avg = results.reduce((a, b) => a + b, 0) / results.length;
    const p5 = results[Math.floor(results.length * 0.05)];
    const p95 = results[Math.floor(results.length * 0.95)];

    document.getElementById('mcBest').textContent = formatPrice(best);
    document.getElementById('mcWorst').textContent = formatPrice(worst);
    document.getElementById('mcAvg').textContent = formatPrice(avg);
    document.getElementById('mcConfidence').textContent = `${formatPrice(p5)} to ${formatPrice(p95)}`;

    showToast('Monte Carlo simulation complete!', 'success');
}

function applyPreset(preset) {
    const presets = {
        conservative: { minProfit: 1, slippage: 0.05, showProfitableOnly: true },
        balanced: { minProfit: 0.5, slippage: 0.1, showProfitableOnly: false },
        aggressive: { minProfit: -5, slippage: 0.2, showProfitableOnly: false }
    };

    const p = presets[preset];
    document.getElementById('minProfit').value = p.minProfit;
    document.getElementById('slippagePercent').value = p.slippage;
    document.getElementById('showProfitableOnly').checked = p.showProfitableOnly;
    
    calculateArbitrage();
    showToast(`${capitalize(preset)} preset applied!`, 'success');
}

// ==================== ANALYTICS ====================
function updateAnalytics() {
    updateSpreadChart();
    updateHeatmap();
    updateTopCoins();
    updateRiskChart();
    calculateTriangularArbitrage();
    updateFrequencyChart();
    updateMultiHopTable();
}

function initializeCharts() {
    // Spread Chart
    const spreadCtx = document.getElementById('spreadChart')?.getContext('2d');
    if (spreadCtx) {
        spreadChart = new Chart(spreadCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Avg Spread %',
                    data: [],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { 
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        ticks: { color: '#9ca3af' }
                    }
                }
            }
        });
    }

    // Risk Chart
    const riskCtx = document.getElementById('riskChart')?.getContext('2d');
    if (riskCtx) {
        riskChart = new Chart(riskCtx, {
            type: 'doughnut',
            data: {
                labels: ['Low Risk', 'Medium Risk', 'High Risk'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af' } } }
            }
        });
    }

    // Frequency Chart
    const freqCtx = document.getElementById('freqCanvas')?.getContext('2d');
    if (freqCtx) {
        freqChart = new Chart(freqCtx, {
            type: 'bar',
            data: {
                labels: CONFIG.COINS.slice(0, 8),
                datasets: [{
                    label: 'Opportunities',
                    data: CONFIG.COINS.slice(0, 8).map(() => 0),
                    backgroundColor: '#f59e0b'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
                    y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#9ca3af' } }
                }
            }
        });
    }
}

function updateSpreadChart() {
    if (!spreadChart) return;

    const avgSpread = state.opportunities.length > 0 
        ? state.opportunities.reduce((sum, o) => sum + Math.abs(o.roi), 0) / state.opportunities.length 
        : 0;
    
    state.spreadHistory.push(avgSpread);
    if (state.spreadHistory.length > 30) state.spreadHistory.shift();

    spreadChart.data.labels = state.spreadHistory.map((_, i) => i);
    spreadChart.data.datasets[0].data = state.spreadHistory;
    spreadChart.update('none');
}

function updateHeatmap() {
    const container = document.getElementById('profitHeatmap');
    if (!container) return;

    const enabledExchanges = getEnabledExchanges();

    let html = '<div class="text-xs font-semibold p-1">Coin</div>';
    enabledExchanges.forEach(ex => {
        html += `<div class="text-xs text-center ${CONFIG.EXCHANGE_COLORS[ex]} p-1 font-semibold">${capitalize(ex).slice(0,3)}</div>`;
    });

    CONFIG.COINS.slice(0, 8).forEach(coin => {
        html += `<div class="text-xs p-1 text-right font-semibold">${coin}</div>`;
        enabledExchanges.forEach(ex => {
            const coinOpps = state.opportunities.filter(o => o.coin === coin && (o.buyExchange === ex || o.sellExchange === ex));
            const avgProfit = coinOpps.length > 0 ? coinOpps.reduce((s, o) => s + o.netProfit, 0) / coinOpps.length : 0;
            const color = avgProfit > 10 ? 'bg-green-500' : avgProfit > 0 ? 'bg-green-700' : avgProfit > -10 ? 'bg-red-700' : 'bg-red-500';
            html += `<div class="heatmap-cell ${color} p-1 text-xs text-center rounded cursor-pointer" 
                         title="${coin} on ${capitalize(ex)}: ${formatPrice(avgProfit)}">${avgProfit.toFixed(0)}</div>`;
        });
    });

    container.style.gridTemplateColumns = `60px repeat(${enabledExchanges.length}, 1fr)`;
    container.innerHTML = html;
}

function updateTopCoins() {
    const container = document.getElementById('topCoins');
    if (!container) return;

    const coinProfits = {};
    state.opportunities.forEach(o => {
        if (!coinProfits[o.coin]) coinProfits[o.coin] = { total: 0, count: 0, profitable: 0 };
        coinProfits[o.coin].total += o.netProfit;
        coinProfits[o.coin].count++;
        if (o.isProfitable) coinProfits[o.coin].profitable++;
    });

    const sorted = Object.entries(coinProfits)
        .sort((a, b) => b[1].total - a[1].total)
        .slice(0, 5);

    container.innerHTML = sorted.map(([coin, data], i) => `
        <div class="flex items-center justify-between p-2 bg-gray-800 rounded hover:bg-gray-700 transition cursor-pointer"
             onclick="document.getElementById('coinSearch').value='${coin}'; updatePricesTable();">
            <div class="flex items-center gap-2">
                <span class="w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full 
                            ${i === 0 ? 'bg-yellow-500 text-black' : 'bg-gray-700'}">${i + 1}</span>
                <span class="font-semibold">${coin}</span>
            </div>
            <div class="text-right">
                <span class="${data.total >= 0 ? 'text-green-400' : 'text-red-400'} font-semibold">${formatPrice(data.total)}</span>
                <span class="text-gray-500 text-xs block">${data.profitable}/${data.count} profitable</span>
            </div>
        </div>
    `).join('') || '<p class="text-gray-500 text-center">No data yet</p>';
}

function updateRiskChart() {
    if (!riskChart) return;

    const low = state.opportunities.filter(o => o.riskLevel === 'low').length;
    const med = state.opportunities.filter(o => o.riskLevel === 'medium').length;
    const high = state.opportunities.filter(o => o.riskLevel === 'high').length;

    riskChart.data.datasets[0].data = [low, med, high];
    riskChart.update('none');
}

function updateFrequencyChart() {
    if (!freqChart) return;

    freqChart.data.datasets[0].data = CONFIG.COINS.slice(0, 8).map(coin => state.opportunityFrequency[coin] || 0);
    freqChart.update('none');
}

function calculateTriangularArbitrage() {
    const triangularOpps = [];
    const pairs = [
        ['BTC', 'ETH', 'XRP'],
        ['BTC', 'SOL', 'ETH'],
        ['ETH', 'LINK', 'BTC'],
        ['BTC', 'DOT', 'ADA'],
        ['ETH', 'AVAX', 'MATIC']
    ];

    CONFIG.EXCHANGES.forEach(exchange => {
        pairs.forEach(path => {
            const [a, b, c] = path;
            const priceAB = state.prices[exchange]?.[b]?.mid / state.prices[exchange]?.[a]?.mid;
            const priceBC = state.prices[exchange]?.[c]?.mid / state.prices[exchange]?.[b]?.mid;
            const priceCA = state.prices[exchange]?.[a]?.mid / state.prices[exchange]?.[c]?.mid;
            
            if (priceAB && priceBC && priceCA) {
                const product = priceAB * priceBC * priceCA;
                const profit = (product - 1) * 100;
                
                triangularOpps.push({
                    exchange,
                    path: `${a}→${b}→${c}→${a}`,
                    profit,
                    score: Math.min(100, Math.max(0, 50 + profit * 10))
                });
            }
        });
    });

    triangularOpps.sort((a, b) => b.profit - a.profit);

    const tbody = document.getElementById('triangularTable');
    if (!tbody) return;
    
    if (triangularOpps.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500">No triangular opportunities</td></tr>';
        return;
    }

    tbody.innerHTML = triangularOpps.slice(0, 10).map(opp => `
        <tr class="border-b border-gray-800 hover:bg-gray-800/50 transition">
            <td class="py-2 px-2 ${CONFIG.EXCHANGE_COLORS[opp.exchange]}">${capitalize(opp.exchange)}</td>
            <td class="py-2 px-2 text-xs font-mono">${opp.path}</td>
            <td class="py-2 px-2 ${opp.profit > 0 ? 'text-green-400' : 'text-red-400'}">${opp.profit.toFixed(3)}%</td>
            <td class="py-2 px-2">
                <div class="w-full h-2 bg-gray-700 rounded overflow-hidden">
                    <div class="h-full ${opp.score > 60 ? 'bg-green-500' : 'bg-yellow-500'}" style="width: ${opp.score}%"></div>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateMultiHopTable() {
    const tbody = document.getElementById('multiHopTable');
    if (!tbody) return;

    // Generate some simulated multi-hop routes
    const routes = [];
    const coins = ['BTC', 'ETH', 'SOL'];
    const exchanges = getEnabledExchanges();
    
    if (exchanges.length >= 3) {
        coins.forEach(coin => {
            const route = `${exchanges[0]}→${exchanges[1]}→${exchanges[2]}`;
            const profit = (Math.random() - 0.5) * 100;
            const time = Math.floor(15 + Math.random() * 30);
            
            routes.push({ coin, route, hops: 3, profit, time });
        });
    }

    routes.sort((a, b) => b.profit - a.profit);

    if (routes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500">Need 3+ exchanges enabled</td></tr>';
        return;
    }

    tbody.innerHTML = routes.map(r => `
        <tr class="border-b border-gray-800">
            <td class="py-2 px-2 text-xs">${r.coin}: ${r.route}</td>
            <td class="py-2 px-2">${r.hops}</td>
            <td class="py-2 px-2 ${r.profit > 0 ? 'text-green-400' : 'text-red-400'}">${formatPrice(r.profit)}</td>
            <td class="py-2 px-2 text-gray-400">${r.time}min</td>
        </tr>
    `).join('');
}

// ==================== UI HELPERS ====================
function switchTab(tabId) {
    state.currentTab = tabId;
    
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-active'));
    
    const tabContent = document.getElementById(`tab-${tabId}`);
    const tabBtn = document.querySelector(`[data-tab="${tabId}"]`);
    
    if (tabContent) tabContent.classList.remove('hidden');
    if (tabBtn) tabBtn.classList.add('tab-active');
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
    
    const icon = document.getElementById('themeIcon');
    const isLight = document.body.classList.contains('light-theme');
    icon.className = isLight ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-yellow-400';
    
    // Update toggle in settings
    const toggle = document.getElementById('darkThemeToggle');
    if (toggle) toggle.checked = !isLight;
}

function toggleMode() {
    state.expertMode = !state.expertMode;
    document.getElementById('modeText').textContent = state.expertMode ? 'Expert' : 'Beginner';
    document.body.classList.toggle('beginner-mode', !state.expertMode);
    
    showToast(`${state.expertMode ? 'Expert' : 'Beginner'} mode enabled`, 'info');
}

function togglePin(coin) {
    if (state.pinnedCoins.has(coin)) {
        state.pinnedCoins.delete(coin);
    } else {
        state.pinnedCoins.add(coin);
    }
    updatePricesTable();
    saveSettings();
}

function toggleWatchlist(coin) {
    if (state.watchlist.has(coin)) {
        state.watchlist.delete(coin);
    } else {
        state.watchlist.add(coin);
    }
    updatePricesTable();
    saveSettings();
}

function toggleAutoRefresh() {
    state.isAutoRefreshEnabled = !state.isAutoRefreshEnabled;
    const btn = document.getElementById('toggleAutoBtn');
    
    if (state.isAutoRefreshEnabled) {
        startAutoRefresh();
        btn.innerHTML = '<i class="fas fa-pause"></i>';
        btn.className = 'bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg transition';
    } else {
        stopAutoRefresh();
        btn.innerHTML = '<i class="fas fa-play"></i>';
        btn.className = 'bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-lg transition';
    }
    
    showToast(state.isAutoRefreshEnabled ? 'Auto-refresh enabled' : 'Auto-refresh paused', 'info');
}

function startAutoRefresh() {
    const rate = parseInt(document.getElementById('refreshRate')?.value) || 5000;
    stopAutoRefresh();
    state.autoRefreshInterval = setInterval(fetchAllPrices, rate);
}

function stopAutoRefresh() {
    if (state.autoRefreshInterval) {
        clearInterval(state.autoRefreshInterval);
        state.autoRefreshInterval = null;
    }
}

function sortOpps(column) {
    if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === 'desc' ? 'asc' : 'desc';
    } else {
        state.sortColumn = column;
        state.sortDirection = 'desc';
    }
    calculateArbitrage();
}

function scrollToBest() {
    const el = document.getElementById('opp-0');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 500);
    }
}

function shareOpportunity(index) {
    const opp = state.opportunities[index];
    if (!opp) return;

    const text = `🚀 Crypto Arbitrage Opportunity!\n` +
        `${opp.coin}: ${capitalize(opp.buyExchange)} → ${capitalize(opp.sellExchange)}\n` +
        `Net Profit: ${formatPrice(opp.netProfit)} (${opp.roi.toFixed(2)}% ROI)\n` +
        `Confidence: ${Math.round(opp.confidence)}%`;

    if (navigator.share) {
        navigator.share({ title: 'Arbitrage Opportunity', text });
    } else {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        });
    }
}

function toggleCompactView() {
    document.body.classList.toggle('compact-mode');
    showToast(document.body.classList.contains('compact-mode') ? 'Compact view enabled' : 'Normal view enabled', 'info');
}

function showRealisticMode() {
    const isRealistic = document.getElementById('realisticMode')?.checked;
    showToast(isRealistic ? 'Realistic mode: All costs included' : 'Theoretical mode: Basic fees only', 'info');
}

function updateClock() {
    const el = document.getElementById('lastUpdate');
    if (el && el.textContent !== '--:--:--') {
        // Keep the last update time, updated by fetchAllPrices
    }
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== UTILITY FUNCTIONS ====================
function formatPrice(price) {
    if (price === null || price === undefined || isNaN(price)) return '$--';
    
    const absPrice = Math.abs(price);
    if (absPrice < 0.0001) return '$' + price.toFixed(8);
    if (absPrice < 0.01) return '$' + price.toFixed(6);
    if (absPrice < 1) return '$' + price.toFixed(4);
    if (absPrice < 100) return '$' + price.toFixed(2);
    return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== EXPORT DATA ====================
function exportOpportunities() {
    const data = state.opportunities.map(o => ({
        coin: o.coin,
        buyExchange: o.buyExchange,
        sellExchange: o.sellExchange,
        buyPrice: o.buyPrice,
        sellPrice: o.sellPrice,
        netProfit: o.netProfit,
        roi: o.roi,
        confidence: o.confidence,
        riskLevel: o.riskLevel,
        timestamp: new Date(o.timestamp).toISOString()
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arbitrage-opportunities-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Opportunities exported!', 'success');
}

// Make functions globally accessible
window.switchTab = switchTab;
window.toggleTheme = toggleTheme;
window.toggleMode = toggleMode;
window.togglePin = togglePin;
window.toggleWatchlist = toggleWatchlist;
window.toggleAutoRefresh = toggleAutoRefresh;
window.toggleCompactView = toggleCompactView;
window.showRealisticMode = showRealisticMode;
window.fetchAllPrices = fetchAllPrices;
window.showOpportunityDetail = showOpportunityDetail;
window.closeModal = closeModal;
window.executePaperTrade = executePaperTrade;
window.resetPaperTrading = resetPaperTrading;
window.shareOpportunity = shareOpportunity;
window.scrollToBest = scrollToBest;
window.sortOpps = sortOpps;
window.calculateWhatIf = calculateWhatIf;
window.runMonteCarlo = runMonteCarlo;
window.applyPreset = applyPreset;
window.saveSettings = saveSettings;
window.dismissAlert = dismissAlert;
window.testWebhook = testWebhook;
window.requestNotificationPermission = requestNotificationPermission;
window.exportOpportunities = exportOpportunities;
window.showToast = showToast;
