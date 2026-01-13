/* ============================================
   META-PORTFOLIO: JavaScript Engine
   Author: Naman Mittal
   ============================================ */

// ============================================
// MODAL SYSTEM
// ============================================

/**
 * Opens a tool in a fullscreen modal overlay
 * @param {string} toolName - The identifier of the tool to open
 */
function openTool(toolName) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    
    if (!modalOverlay || !modalBody) {
        console.error('Modal elements not found');
        return;
    }
    
    // Clear previous content
    modalBody.innerHTML = '';
    
    // Generate tool content based on toolName
    let toolHTML = '';
    switch(toolName) {
        case 'calculator':
            toolHTML = generateCalculator();
            break;
        case 'speedtest':
            toolHTML = generateSpeedTest();
            break;
        case 'tictactoe':
            toolHTML = generateTicTacToe();
            break;
        case 'watersort':
            toolHTML = generateWaterSort();
            break;
        case 'pomodoro':
            toolHTML = generatePomodoro();
            break;
        case 'passwordgen':
            toolHTML = generatePasswordGen();
            break;
        case 'snake':
            toolHTML = generateSnake();
            break;
        case 'memory':
            toolHTML = generateMemory();
            break;
        case 'infinitecraft':
            toolHTML = generateInfiniteCraft();
            break;
        case 'clicker':
            toolHTML = generateClicker();
            break;
        case 'spaceelevator':
            toolHTML = generateSpaceElevator();
            break;
        case 'asteroid':
            toolHTML = generateAsteroid();
            break;
        case 'circle':
            toolHTML = generateCircle();
            break;
        case 'billionaire':
            toolHTML = generateBillionaire();
            break;
        case 'flappy':
            toolHTML = generateFlappy();
            break;
        case 'trafficrider':
            toolHTML = generateTrafficRider();
            break;
        case 'jump':
            toolHTML = generateJump();
            break;
        case 'ronaldobirds':
            toolHTML = generateRonaldoBirds();
            break;
        case 'battleship':
            toolHTML = generateBattleship();
            break;
        case 'game2048':
            toolHTML = generate2048();
            break;
        case 'hangman':
            toolHTML = generateHangman();
            break;
        case 'tetris':
            toolHTML = generateTetris();
            break;
        case 'worldclock':
            toolHTML = generateWorldClock();
            break;
        default:
            toolHTML = '<p>Tool not found</p>';
    }
    
    modalBody.innerHTML = toolHTML;
    modalOverlay.classList.add('active');
    
    // Initialize tool-specific functionality
    initializeTool(toolName);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the modal overlay
 */
function closeTool() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clean up any running intervals/timers
        if (window.activeIntervals) {
            window.activeIntervals.forEach(interval => clearInterval(interval));
            window.activeIntervals = [];
        }
        if (window.activeAnimationFrame) {
            cancelAnimationFrame(window.activeAnimationFrame);
            window.activeAnimationFrame = null;
        }
    }
}

// Close modal on overlay click (outside content)
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeTool();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeTool();
        }
    });
});

/**
 * Initialize tool-specific functionality after DOM is ready
 */
function initializeTool(toolName) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        switch(toolName) {
            case 'calculator':
                initCalculator();
                break;
            case 'speedtest':
                initSpeedTest();
                break;
            case 'tictactoe':
                initTicTacToe();
                break;
            case 'watersort':
                initWaterSort();
                break;
            case 'pomodoro':
                initPomodoro();
                break;
            case 'passwordgen':
                initPasswordGen();
                break;
            case 'snake':
                initSnake();
                break;
            case 'memory':
                initMemory();
                break;
            case 'infinitecraft':
                initInfiniteCraft();
                break;
            case 'clicker':
                initClicker();
                break;
            case 'spaceelevator':
                initSpaceElevator();
                break;
            case 'asteroid':
                initAsteroid();
                break;
            case 'circle':
                initCircle();
                break;
            case 'billionaire':
                initBillionaire();
                break;
            case 'flappy':
                initFlappy();
                break;
            case 'trafficrider':
                initTrafficRider();
                break;
        case 'jump':
            initJump();
            break;
        case 'ronaldobirds':
            initRonaldoBirds();
            break;
        case 'battleship':
            initBattleship();
            break;
        case 'game2048':
            init2048();
            break;
        case 'hangman':
            initHangman();
            break;
        case 'tetris':
            initTetris();
            break;
        case 'worldclock':
            initWorldClock();
            break;
        }
    }, 10);
}

// ============================================
// TOOL 1: CALCULATOR
// ============================================

function generateCalculator() {
    return `
        <h2 class="modal-title">Calculator</h2>
        <div class="calculator">
            <input type="text" class="calc-display" id="calcDisplay" value="0" readonly>
            <div class="calc-buttons">
                <button class="calc-btn" onclick="calcInput('clear')">C</button>
                <button class="calc-btn" onclick="calcInput('backspace')">⌫</button>
                <button class="calc-btn operator" onclick="calcInput('%')">%</button>
                <button class="calc-btn operator" onclick="calcInput('/')">/</button>
                
                <button class="calc-btn" onclick="calcInput('7')">7</button>
                <button class="calc-btn" onclick="calcInput('8')">8</button>
                <button class="calc-btn" onclick="calcInput('9')">9</button>
                <button class="calc-btn operator" onclick="calcInput('*')">×</button>
                
                <button class="calc-btn" onclick="calcInput('4')">4</button>
                <button class="calc-btn" onclick="calcInput('5')">5</button>
                <button class="calc-btn" onclick="calcInput('6')">6</button>
                <button class="calc-btn operator" onclick="calcInput('-')">-</button>
                
                <button class="calc-btn" onclick="calcInput('1')">1</button>
                <button class="calc-btn" onclick="calcInput('2')">2</button>
                <button class="calc-btn" onclick="calcInput('3')">3</button>
                <button class="calc-btn operator" onclick="calcInput('+')">+</button>
                
                <button class="calc-btn" onclick="calcInput('0')" style="grid-column: span 2;">0</button>
                <button class="calc-btn" onclick="calcInput('.')">.</button>
                <button class="calc-btn operator" onclick="calcInput('=')">=</button>
            </div>
        </div>
    `;
}

let calcState = {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false
};

function initCalculator() {
    calcState = {
        display: '0',
        previousValue: null,
        operation: null,
        waitingForNewValue: false
    };
    updateCalcDisplay();
}

function calcInput(value) {
    const display = document.getElementById('calcDisplay');
    if (!display) return;
    
    if (value === 'clear') {
        calcState.display = '0';
        calcState.previousValue = null;
        calcState.operation = null;
        calcState.waitingForNewValue = false;
    } else if (value === 'backspace') {
        if (calcState.display.length > 1) {
            calcState.display = calcState.display.slice(0, -1);
        } else {
            calcState.display = '0';
        }
    } else if (value === '=') {
        if (calcState.previousValue !== null && calcState.operation) {
            const current = parseFloat(calcState.display);
            let result;
            
            switch(calcState.operation) {
                case '+':
                    result = calcState.previousValue + current;
                    break;
                case '-':
                    result = calcState.previousValue - current;
                    break;
                case '*':
                    result = calcState.previousValue * current;
                    break;
                case '/':
                    result = calcState.previousValue / current;
                    break;
                case '%':
                    result = calcState.previousValue % current;
                    break;
            }
            
            calcState.display = result.toString();
            calcState.previousValue = null;
            calcState.operation = null;
            calcState.waitingForNewValue = true;
        }
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
        if (calcState.previousValue === null) {
            calcState.previousValue = parseFloat(calcState.display);
        } else if (!calcState.waitingForNewValue) {
            calcInput('=');
            calcState.previousValue = parseFloat(calcState.display);
        }
        calcState.operation = value;
        calcState.waitingForNewValue = true;
    } else {
        if (calcState.waitingForNewValue) {
            calcState.display = value;
            calcState.waitingForNewValue = false;
        } else {
            if (value === '.' && calcState.display.includes('.')) {
                return;
            }
            calcState.display = calcState.display === '0' ? value : calcState.display + value;
        }
    }
    
    updateCalcDisplay();
}

function updateCalcDisplay() {
    const display = document.getElementById('calcDisplay');
    if (display) {
        display.value = calcState.display;
    }
}

// ============================================
// TOOL 2: INTERNET SPEED TEST
// ============================================

function generateSpeedTest() {
    return `
        <h2 class="modal-title">Internet Speed Test</h2>
        <div class="speed-test">
            <div class="speed-display" id="speedDisplay">--</div>
            <div class="speed-unit">Mbps</div>
            <div id="speedLoader" class="loader" style="display: none;"></div>
            <p id="speedStatus" style="color: var(--text-secondary); margin: 1rem 0;">Click the button below to test your connection speed</p>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 1rem 0; font-style: italic;">
                <strong>Simulated Speed Test (Browser Limitation)</strong><br>
                This is a simulated test for demonstration purposes. For accurate results, use dedicated speed test services.
            </p>
            <button class="test-button" onclick="runSpeedTest()">Start Test</button>
        </div>
    `;
}

function initSpeedTest() {
    // Reset display
    const display = document.getElementById('speedDisplay');
    const loader = document.getElementById('speedLoader');
    const status = document.getElementById('speedStatus');
    if (display) display.textContent = '--';
    if (loader) loader.style.display = 'none';
    if (status) status.textContent = 'Click the button below to test your connection speed';
}

async function runSpeedTest() {
    const display = document.getElementById('speedDisplay');
    const loader = document.getElementById('speedLoader');
    const status = document.getElementById('speedStatus');
    
    if (!display || !loader || !status) return;
    
    display.textContent = '--';
    loader.style.display = 'block';
    status.textContent = 'Simulating download speed test...';
    
    try {
        // Simulated speed test - safe and reliable
        // Simulate a realistic download scenario
        const simulatedFileSizeMB = 5; // Simulate downloading 5 MB
        const startTime = Date.now();
        
        // Simulate download time with realistic variation
        // Base time + random variation to simulate network conditions
        const baseTimeMs = 2000; // Base 2 seconds
        const variationMs = Math.random() * 3000; // 0-3 seconds variation
        const simulatedDurationMs = baseTimeMs + variationMs;
        
        // Wait for simulated download
        await new Promise(resolve => setTimeout(resolve, Math.min(simulatedDurationMs, 3000)));
        
        const endTime = Date.now();
        const durationSeconds = (endTime - startTime) / 1000;
        
        // Calculate Mbps: (fileSizeMB * 8 bits) / durationSeconds
        const speedMbps = (simulatedFileSizeMB * 8) / durationSeconds;
        
        // Add some realistic variation to the result (±10%)
        const variation = 1 + (Math.random() * 0.2 - 0.1); // ±10%
        const finalSpeed = speedMbps * variation;
        
        loader.style.display = 'none';
        display.textContent = finalSpeed.toFixed(2);
        status.textContent = `Simulated: ${simulatedFileSizeMB} MB in ${durationSeconds.toFixed(2)}s`;
        
    } catch (error) {
        loader.style.display = 'none';
        display.textContent = 'Error';
        status.textContent = 'Unable to complete speed test simulation.';
        console.error('Speed test error:', error);
    }
}

// ============================================
// TOOL 3: TIC TAC TOE
// ============================================

function generateTicTacToe() {
    return `
        <h2 class="modal-title">Tic Tac Toe</h2>
        <div class="tic-tac-toe">
            <div class="game-status" id="gameStatus">Your turn (X)</div>
            <div class="game-board" id="gameBoard">
                <div class="game-cell" data-index="0"></div>
                <div class="game-cell" data-index="1"></div>
                <div class="game-cell" data-index="2"></div>
                <div class="game-cell" data-index="3"></div>
                <div class="game-cell" data-index="4"></div>
                <div class="game-cell" data-index="5"></div>
                <div class="game-cell" data-index="6"></div>
                <div class="game-cell" data-index="7"></div>
                <div class="game-cell" data-index="8"></div>
            </div>
            <button class="reset-button" onclick="resetTicTacToe()">New Game</button>
        </div>
    `;
}

let tttState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false
};

function initTicTacToe() {
    resetTicTacToe();
    const cells = document.querySelectorAll('.game-cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => makeMove(index));
    });
}

function makeMove(index) {
    if (tttState.gameOver || tttState.board[index] !== '') return;
    
    // Player move
    tttState.board[index] = 'X';
    updateTTTDisplay();
    
    if (checkWinner('X')) {
        document.getElementById('gameStatus').textContent = 'You Win! 🎉';
        tttState.gameOver = true;
        return;
    }
    
    if (isBoardFull()) {
        document.getElementById('gameStatus').textContent = "It's a Draw!";
        tttState.gameOver = true;
        return;
    }
    
    // AI move
    setTimeout(() => {
        const aiMove = getAIMove();
        if (aiMove !== -1) {
            tttState.board[aiMove] = 'O';
            updateTTTDisplay();
            
            if (checkWinner('O')) {
                document.getElementById('gameStatus').textContent = 'AI Wins! 🤖';
                tttState.gameOver = true;
            } else if (isBoardFull()) {
                document.getElementById('gameStatus').textContent = "It's a Draw!";
                tttState.gameOver = true;
            } else {
                document.getElementById('gameStatus').textContent = 'Your turn (X)';
            }
        }
    }, 300);
}

function getAIMove() {
    // Strategy: Try to win, block player, take center, take corner
    const board = tttState.board;
    
    // Try to win
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (checkWinner('O')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    
    // Block player
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            if (checkWinner('X')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    
    // Take center
    if (board[4] === '') return 4;
    
    // Take corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available
    const available = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') available.push(i);
    }
    return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : -1;
}

function checkWinner(player) {
    const board = tttState.board;
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
    
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

function isBoardFull() {
    return tttState.board.every(cell => cell !== '');
}

function updateTTTDisplay() {
    const cells = document.querySelectorAll('.game-cell');
    cells.forEach((cell, index) => {
        cell.textContent = tttState.board[index];
        cell.className = 'game-cell';
        if (tttState.board[index] === 'X') {
            cell.classList.add('x');
        } else if (tttState.board[index] === 'O') {
            cell.classList.add('o');
        }
    });
}

function resetTicTacToe() {
    tttState = {
        board: Array(9).fill(''),
        currentPlayer: 'X',
        gameOver: false
    };
    updateTTTDisplay();
    document.getElementById('gameStatus').textContent = 'Your turn (X)';
}

// ============================================
// TOOL 4: WATER SORT PUZZLE
// ============================================

function generateWaterSort() {
    return `
        <h2 class="modal-title">Water Sort Puzzle</h2>
        <div class="water-sort">
            <div style="text-align: center; margin-bottom: 1rem;">
                <p style="color: var(--neon-blue); font-size: 1.2rem; margin-bottom: 0.5rem;">
                    Level <span id="waterSortLevel">1</span> / 10
                </p>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">
                    Click a tube to select it, then click another to pour water. Goal: Sort colors in each tube.
                </p>
            </div>
            <div class="tubes-container" id="tubesContainer"></div>
            <div style="text-align: center; margin-top: 1rem;">
                <button class="reset-button" onclick="resetWaterSort()" id="resetWaterBtn">Reset Level</button>
                <button class="reset-button" onclick="nextWaterSortLevel()" id="nextWaterBtn" style="display: none; margin-left: 0.5rem;">Next Level</button>
            </div>
        </div>
    `;
}

let waterSortState = {
    tubes: [],
    selectedTube: null,
    colors: ['#00f2ff', '#bd00ff', '#ff00ff', '#00ff00', '#ffff00', '#ff6600', '#ff0080', '#00ffff'],
    currentLevel: 1,
    levels: [],
    winShown: false
};

// Define 10 levels with increasing difficulty - ALL have 6 tubes (2 empty, 4 filled)
// Color mapping: 🔴=#ff00ff, 🔵=#00f2ff, 🟢=#00ff00, 🟡=#ffff00, 🟣=#bd00ff, 🟠=#ff6600
function defineWaterSortLevels() {
    return [
        // LEVEL 1 - Tutorial: 2 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🔵 🔴 🔵
        // Tube 2: 🔵 🔴 🔵 🔴
        // Tube 3: 🔴 🔴 🔴 🔴 (helper)
        // Tube 4: 🔵 🔵 🔵 🔵 (helper)
        [
            ['#ff00ff', '#00f2ff', '#ff00ff', '#00f2ff'], // 🔴 🔵 🔴 🔵
            ['#00f2ff', '#ff00ff', '#00f2ff', '#ff00ff'], // 🔵 🔴 🔵 🔴
            ['#ff00ff', '#ff00ff', '#ff00ff', '#ff00ff'], // 🔴 🔴 🔴 🔴
            ['#00f2ff', '#00f2ff', '#00f2ff', '#00f2ff'], // 🔵 🔵 🔵 🔵
            [],
            []
        ],
        // LEVEL 2 - Easy Mix: 3 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🟢 🔵 🔴
        // Tube 2: 🟢 🔵 🔴 🟢
        // Tube 3: 🔵 🔴 🟢 🔵
        // Tube 4: 🔴 🟢 🔵 🔴
        [
            ['#ff00ff', '#00ff00', '#00f2ff', '#ff00ff'], // 🔴 🟢 🔵 🔴
            ['#00ff00', '#00f2ff', '#ff00ff', '#00ff00'], // 🟢 🔵 🔴 🟢
            ['#00f2ff', '#ff00ff', '#00ff00', '#00f2ff'], // 🔵 🔴 🟢 🔵
            ['#ff00ff', '#00ff00', '#00f2ff', '#ff00ff'], // 🔴 🟢 🔵 🔴
            [],
            []
        ],
        // LEVEL 3 - Easy Balanced: 3 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🔵 🟢 🔵
        // Tube 2: 🟢 🔴 🔵 🟢
        // Tube 3: 🔵 🟢 🔴 🔴
        // Tube 4: 🔴 🔵 🟢 🔵
        [
            ['#ff00ff', '#00f2ff', '#00ff00', '#00f2ff'], // 🔴 🔵 🟢 🔵
            ['#00ff00', '#ff00ff', '#00f2ff', '#00ff00'], // 🟢 🔴 🔵 🟢
            ['#00f2ff', '#00ff00', '#ff00ff', '#ff00ff'], // 🔵 🟢 🔴 🔴
            ['#ff00ff', '#00f2ff', '#00ff00', '#00f2ff'], // 🔴 🔵 🟢 🔵
            [],
            []
        ],
        // LEVEL 4 - Medium Entry: 4 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🔵 🟢 🟡
        // Tube 2: 🟢 🔴 🟡 🔵
        // Tube 3: 🟡 🟢 🔵 🔴
        // Tube 4: 🔵 🟡 🔴 🟢
        [
            ['#ff00ff', '#00f2ff', '#00ff00', '#ffff00'], // 🔴 🔵 🟢 🟡
            ['#00ff00', '#ff00ff', '#ffff00', '#00f2ff'], // 🟢 🔴 🟡 🔵
            ['#ffff00', '#00ff00', '#00f2ff', '#ff00ff'], // 🟡 🟢 🔵 🔴
            ['#00f2ff', '#ffff00', '#ff00ff', '#00ff00'], // 🔵 🟡 🔴 🟢
            [],
            []
        ],
        // LEVEL 5 - Medium Twist: 4 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🟡 🔴 🟢
        // Tube 2: 🟢 🔵 🟡 🔵
        // Tube 3: 🟡 🔴 🟢 🔵
        // Tube 4: 🔵 🟢 🔴 🟡
        [
            ['#ff00ff', '#ffff00', '#ff00ff', '#00ff00'], // 🔴 🟡 🔴 🟢
            ['#00ff00', '#00f2ff', '#ffff00', '#00f2ff'], // 🟢 🔵 🟡 🔵
            ['#ffff00', '#ff00ff', '#00ff00', '#00f2ff'], // 🟡 🔴 🟢 🔵
            ['#00f2ff', '#00ff00', '#ff00ff', '#ffff00'], // 🔵 🟢 🔴 🟡
            [],
            []
        ],
        // LEVEL 6 - Medium Trap: 4 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🔵 🟡 🔴
        // Tube 2: 🟢 🟡 🔵 🟢
        // Tube 3: 🔵 🔴 🟢 🟡
        // Tube 4: 🟡 🟢 🔴 🔵
        [
            ['#ff00ff', '#00f2ff', '#ffff00', '#ff00ff'], // 🔴 🔵 🟡 🔴
            ['#00ff00', '#ffff00', '#00f2ff', '#00ff00'], // 🟢 🟡 🔵 🟢
            ['#00f2ff', '#ff00ff', '#00ff00', '#ffff00'], // 🔵 🔴 🟢 🟡
            ['#ffff00', '#00ff00', '#ff00ff', '#00f2ff'], // 🟡 🟢 🔴 🔵
            [],
            []
        ],
        // LEVEL 7 - Hard Entry: 5 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🔵 🟢 🟡
        // Tube 2: 🟣 🔴 🟡 🔵
        // Tube 3: 🟢 🟣 🔵 🔴
        // Tube 4: 🟡 🟢 🟣 🔴
        [
            ['#ff00ff', '#00f2ff', '#00ff00', '#ffff00'], // 🔴 🔵 🟢 🟡
            ['#bd00ff', '#ff00ff', '#ffff00', '#00f2ff'], // 🟣 🔴 🟡 🔵
            ['#00ff00', '#bd00ff', '#00f2ff', '#ff00ff'], // 🟢 🟣 🔵 🔴
            ['#ffff00', '#00ff00', '#bd00ff', '#ff00ff'], // 🟡 🟢 🟣 🔴
            [],
            []
        ],
        // LEVEL 8 - Hard Mix: 5 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🟣 🔵 🟢
        // Tube 2: 🟡 🔴 🟢 🟣
        // Tube 3: 🔵 🟡 🟣 🔴
        // Tube 4: 🟢 🔵 🔴 🟡
        [
            ['#ff00ff', '#bd00ff', '#00f2ff', '#00ff00'], // 🔴 🟣 🔵 🟢
            ['#ffff00', '#ff00ff', '#00ff00', '#bd00ff'], // 🟡 🔴 🟢 🟣
            ['#00f2ff', '#ffff00', '#bd00ff', '#ff00ff'], // 🔵 🟡 🟣 🔴
            ['#00ff00', '#00f2ff', '#ff00ff', '#ffff00'], // 🟢 🔵 🔴 🟡
            [],
            []
        ],
        // LEVEL 9 - Hard Chaos: 6 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🔵 🟢 🟡
        // Tube 2: 🟣 🟠 🔴 🔵
        // Tube 3: 🟢 🟣 🟡 🟠
        // Tube 4: 🔵 🔴 🟠 🟣
        [
            ['#ff00ff', '#00f2ff', '#00ff00', '#ffff00'], // 🔴 🔵 🟢 🟡
            ['#bd00ff', '#ff6600', '#ff00ff', '#00f2ff'], // 🟣 🟠 🔴 🔵
            ['#00ff00', '#bd00ff', '#ffff00', '#ff6600'], // 🟢 🟣 🟡 🟠
            ['#00f2ff', '#ff00ff', '#ff6600', '#bd00ff'], // 🔵 🔴 🟠 🟣
            [],
            []
        ],
        // LEVEL 10 - Expert: 6 colors, 4 filled tubes, 2 empty
        // Tube 1: 🔴 🟣 🟡 🔵
        // Tube 2: 🟢 🔴 🟠 🟣
        // Tube 3: 🔵 🟡 🟢 🔴
        // Tube 4: 🟠 🔵 🟣 🟢
        [
            ['#ff00ff', '#bd00ff', '#ffff00', '#00f2ff'], // 🔴 🟣 🟡 🔵
            ['#00ff00', '#ff00ff', '#ff6600', '#bd00ff'], // 🟢 🔴 🟠 🟣
            ['#00f2ff', '#ffff00', '#00ff00', '#ff00ff'], // 🔵 🟡 🟢 🔴
            ['#ff6600', '#00f2ff', '#bd00ff', '#00ff00'], // 🟠 🔵 🟣 🟢
            [],
            []
        ]
    ];
}

function initWaterSort() {
    waterSortState.levels = defineWaterSortLevels();
    resetWaterSort();
}

function resetWaterSort() {
    // Load current level
    if (waterSortState.levels.length === 0) {
        waterSortState.levels = defineWaterSortLevels();
    }
    
    const levelIndex = waterSortState.currentLevel - 1;
    if (levelIndex >= 0 && levelIndex < waterSortState.levels.length) {
        // Deep copy the level
        waterSortState.tubes = waterSortState.levels[levelIndex].map(tube => [...tube]);
    } else {
        // Fallback to level 1 (6 tubes)
        waterSortState.tubes = [
            ['#00f2ff', '#00f2ff', '#bd00ff', '#bd00ff'],
            ['#ff00ff', '#ff00ff', '#00ff00', '#00ff00'],
            [],
            [],
            [],
            []
        ];
    }
    
    waterSortState.selectedTube = null;
    waterSortState.winShown = false;
    
    // Hide next level button on reset
    const nextBtn = document.getElementById('nextWaterBtn');
    if (nextBtn) {
        nextBtn.style.display = 'none';
    }
    
    updateWaterSortLevelDisplay();
    renderWaterSort();
    checkWaterSortWin();
}

function nextWaterSortLevel() {
    if (waterSortState.currentLevel < 10) {
        waterSortState.currentLevel++;
        resetWaterSort();
    } else {
        alert('Congratulations! You completed all 10 levels! 🎉');
    }
}

function updateWaterSortLevelDisplay() {
    const levelEl = document.getElementById('waterSortLevel');
    if (levelEl) {
        levelEl.textContent = waterSortState.currentLevel;
    }
}

function renderWaterSort() {
    const container = document.getElementById('tubesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    waterSortState.tubes.forEach((tube, index) => {
        const tubeElement = document.createElement('div');
        tubeElement.className = 'tube';
        if (waterSortState.selectedTube === index) {
            tubeElement.classList.add('selected');
        }
        tubeElement.onclick = () => selectTube(index);
        
        // Render water layers
        const maxHeight = 200;
        const layerHeight = maxHeight / 4;
        
        for (let i = 0; i < 4; i++) {
            const layer = document.createElement('div');
            layer.className = 'water-layer';
            if (i < tube.length) {
                layer.style.backgroundColor = tube[i];
                layer.style.height = `${layerHeight}px`;
                layer.style.bottom = `${i * layerHeight}px`;
            } else {
                layer.style.display = 'none';
            }
            tubeElement.appendChild(layer);
        }
        
        container.appendChild(tubeElement);
    });
    
    // Re-check win condition after render
    checkWaterSortWin();
}

function selectTube(index) {
    if (waterSortState.selectedTube === null) {
        // Select first tube
        if (waterSortState.tubes[index].length > 0) {
            waterSortState.selectedTube = index;
            renderWaterSort();
        }
    } else {
        // Pour from selected to clicked tube
        if (waterSortState.selectedTube === index) {
            // Deselect
            waterSortState.selectedTube = null;
            renderWaterSort();
        } else {
            pourWater(waterSortState.selectedTube, index);
            waterSortState.selectedTube = null;
            renderWaterSort();
        }
    }
}

function pourWater(fromIndex, toIndex) {
    const fromTube = waterSortState.tubes[fromIndex];
    const toTube = waterSortState.tubes[toIndex];
    
    if (fromTube.length === 0) return;
    if (toTube.length >= 4) return;
    
    const topColor = fromTube[fromTube.length - 1];
    let pourCount = 0;
    
    // Count consecutive same colors from top
    for (let i = fromTube.length - 1; i >= 0; i--) {
        if (fromTube[i] === topColor) {
            pourCount++;
        } else {
            break;
        }
    }
    
    // Check if destination can accept
    const availableSpace = 4 - toTube.length;
    if (availableSpace === 0) return;
    
    // Check if destination top matches (or is empty)
    if (toTube.length > 0 && toTube[toTube.length - 1] !== topColor) {
        return;
    }
    
    // Pour as much as possible
    const actualPour = Math.min(pourCount, availableSpace);
    
    for (let i = 0; i < actualPour; i++) {
        toTube.push(fromTube.pop());
    }
    
    // Check win condition after pour
    checkWaterSortWin();
}

function checkWaterSortWin() {
    // Win condition: Each tube contains only one color or is empty
    let allSorted = true;
    
    for (let tube of waterSortState.tubes) {
        if (tube.length === 0) continue; // Empty tube is valid
        
        // Check if all colors in tube are the same
        const firstColor = tube[0];
        for (let color of tube) {
            if (color !== firstColor) {
                allSorted = false;
                break;
            }
        }
        if (!allSorted) break;
    }
    
    if (allSorted) {
        // Show next level button
        const nextBtn = document.getElementById('nextWaterBtn');
        if (nextBtn) {
            nextBtn.style.display = 'inline-block';
        }
        
        // Show win message if not already shown
        if (!waterSortState.winShown) {
            setTimeout(() => {
                if (waterSortState.currentLevel < 10) {
                    alert(`Level ${waterSortState.currentLevel} Complete! 🎉`);
                } else {
                    alert('Congratulations! You completed all 10 levels! 🏆');
                }
            }, 300);
            waterSortState.winShown = true;
        }
    } else {
        // Hide next level button if puzzle is not solved
        const nextBtn = document.getElementById('nextWaterBtn');
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }
        waterSortState.winShown = false;
    }
}

// ============================================
// TOOL 5: POMODORO TIMER
// ============================================

function generatePomodoro() {
    return `
        <h2 class="modal-title">Pomodoro Timer</h2>
        <div class="pomodoro">
            <div class="timer-display" id="timerDisplay">25:00</div>
            <div class="timer-controls">
                <button class="timer-btn" onclick="setPomodoroTime(25)">25 min</button>
                <button class="timer-btn" onclick="setPomodoroTime(15)">15 min</button>
                <button class="timer-btn" onclick="setPomodoroTime(5)">5 min</button>
            </div>
            <div style="margin: 1.5rem 0; text-align: center;">
                <label style="color: var(--text-secondary); display: block; margin-bottom: 0.5rem;">Custom Time (minutes):</label>
                <input type="number" id="customTimeInput" class="length-input" 
                       placeholder="Enter minutes (1-180)" min="1" max="180" 
                       style="max-width: 200px; margin: 0 auto;">
            </div>
            <div class="timer-controls">
                <button class="timer-btn" onclick="startPomodoro()" id="startBtn">Start</button>
                <button class="timer-btn" onclick="pausePomodoro()" id="pauseBtn">Pause</button>
                <button class="timer-btn" onclick="resetPomodoro()">Reset</button>
            </div>
            <svg class="progress-ring" id="progressRing">
                <circle id="progressCircle" cx="100" cy="100" r="90" fill="none" 
                        stroke="var(--neon-blue)" stroke-width="8" 
                        stroke-dasharray="565.48" stroke-dashoffset="0" 
                        transform="rotate(-90 100 100)"/>
            </svg>
        </div>
    `;
}

let pomodoroState = {
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    isRunning: false,
    intervalId: null,
    customTimeSet: false
};

function initPomodoro() {
    resetPomodoro();
    // Clear custom input on init
    const customInput = document.getElementById('customTimeInput');
    if (customInput) {
        customInput.value = '';
        pomodoroState.customTimeSet = false;
    }
}

function setPomodoroTime(minutes) {
    if (pomodoroState.isRunning) return;
    pomodoroState.totalSeconds = minutes * 60;
    pomodoroState.remainingSeconds = minutes * 60;
    pomodoroState.customTimeSet = false;
    // Clear custom input when preset is selected
    const customInput = document.getElementById('customTimeInput');
    if (customInput) customInput.value = '';
    updatePomodoroDisplay();
}

function startPomodoro() {
    if (pomodoroState.isRunning) return;
    
    // Check for custom time input
    const customInput = document.getElementById('customTimeInput');
    if (customInput && customInput.value) {
        const customMinutes = parseInt(customInput.value);
        if (isNaN(customMinutes) || customMinutes < 1 || customMinutes > 180) {
            alert('Please enter a valid time between 1 and 180 minutes');
            return;
        }
        pomodoroState.totalSeconds = customMinutes * 60;
        pomodoroState.remainingSeconds = customMinutes * 60;
        pomodoroState.customTimeSet = true;
        updatePomodoroDisplay();
    }
    
    pomodoroState.isRunning = true;
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    if (startBtn) startBtn.disabled = true;
    if (pauseBtn) pauseBtn.disabled = false;
    
    pomodoroState.intervalId = setInterval(() => {
        pomodoroState.remainingSeconds--;
        updatePomodoroDisplay();
        
        if (pomodoroState.remainingSeconds <= 0) {
            clearInterval(pomodoroState.intervalId);
            pomodoroState.isRunning = false;
            alert('Time\'s up! 🍅');
            if (startBtn) startBtn.disabled = false;
            if (pauseBtn) pauseBtn.disabled = true;
        }
    }, 1000);
    
    if (!window.activeIntervals) window.activeIntervals = [];
    window.activeIntervals.push(pomodoroState.intervalId);
}

function pausePomodoro() {
    if (!pomodoroState.isRunning) return;
    
    clearInterval(pomodoroState.intervalId);
    pomodoroState.isRunning = false;
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
}

function resetPomodoro() {
    clearInterval(pomodoroState.intervalId);
    // Reset to last set time (preset or custom)
    if (!pomodoroState.customTimeSet) {
        pomodoroState.totalSeconds = 25 * 60;
        pomodoroState.remainingSeconds = 25 * 60;
    } else {
        pomodoroState.remainingSeconds = pomodoroState.totalSeconds;
    }
    pomodoroState.isRunning = false;
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    if (startBtn) startBtn.disabled = false;
    if (pauseBtn) pauseBtn.disabled = true;
    updatePomodoroDisplay();
}

function updatePomodoroDisplay() {
    const display = document.getElementById('timerDisplay');
    const circle = document.getElementById('progressCircle');
    
    const minutes = Math.floor(pomodoroState.remainingSeconds / 60);
    const seconds = pomodoroState.remainingSeconds % 60;
    
    if (display) {
        display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    if (circle) {
        const circumference = 2 * Math.PI * 90;
        const progress = (pomodoroState.totalSeconds - pomodoroState.remainingSeconds) / pomodoroState.totalSeconds;
        const offset = circumference * (1 - progress);
        circle.style.strokeDashoffset = offset;
    }
}

// ============================================
// TOOL 6: PASSWORD GENERATOR
// ============================================

function generatePasswordGen() {
    return `
        <h2 class="modal-title">Password Generator</h2>
        <div class="password-gen">
            <input type="text" class="password-display" id="passwordDisplay" readonly value="Click Generate">
            <div style="text-align: center; margin-bottom: 1rem;">
                <button class="gen-button" onclick="copyPassword()">Copy Password</button>
            </div>
            <label style="color: var(--text-secondary);">Length:</label>
            <input type="number" class="length-input" id="passwordLength" value="16" min="4" max="64">
            <div class="gen-options">
                <div class="option-group">
                    <label for="optUppercase">Uppercase (A-Z)</label>
                    <input type="checkbox" id="optUppercase" checked>
                </div>
                <div class="option-group">
                    <label for="optLowercase">Lowercase (a-z)</label>
                    <input type="checkbox" id="optLowercase" checked>
                </div>
                <div class="option-group">
                    <label for="optNumbers">Numbers (0-9)</label>
                    <input type="checkbox" id="optNumbers" checked>
                </div>
                <div class="option-group">
                    <label for="optSymbols">Symbols (!@#$%...)</label>
                    <input type="checkbox" id="optSymbols" checked>
                </div>
            </div>
            <button class="gen-button" onclick="generatePassword()">Generate Password</button>
        </div>
    `;
}

function initPasswordGen() {
    generatePassword();
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value) || 16;
    const uppercase = document.getElementById('optUppercase').checked;
    const lowercase = document.getElementById('optLowercase').checked;
    const numbers = document.getElementById('optNumbers').checked;
    const symbols = document.getElementById('optSymbols').checked;
    
    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
        alert('Please select at least one option');
        return;
    }
    
    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }
    
    document.getElementById('passwordDisplay').value = password;
}

function copyPassword() {
    const display = document.getElementById('passwordDisplay');
    if (!display) return;
    
    display.select();
    display.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        // Modern clipboard API fallback
        if (navigator.clipboard) {
            navigator.clipboard.writeText(display.value);
        }
    } catch (err) {
        console.error('Failed to copy:', err);
    }
    
    // Visual feedback
    const btn = document.querySelector('.gen-button');
    if (btn && btn.textContent.includes('Copy')) {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1000);
    }
}

// ============================================
// TOOL 7: SNAKE GAME
// ============================================

function generateSnake() {
    return `
        <h2 class="modal-title">Classic Snake</h2>
        <div class="snake-game">
            <div class="game-score">Score: <span id="snakeScore">0</span></div>
            <canvas class="game-canvas" id="snakeCanvas" width="400" height="400"></canvas>
            <div class="game-instructions">
                Use arrow keys or WASD to control the snake. Eat the food to grow!
            </div>
            <button class="reset-button" onclick="resetSnake()">Restart Game</button>
        </div>
    `;
}

let snakeState = {
    canvas: null,
    ctx: null,
    snake: [{x: 200, y: 200}],
    direction: {x: 20, y: 0},
    food: {x: 0, y: 0},
    score: 0,
    gameLoop: null,
    gameOver: false,
    lastUpdate: 0,
    updateInterval: 120 // ~5x slower: 120ms between updates (was ~16ms at 60fps)
};

function initSnake() {
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) return;
    
    snakeState.canvas = canvas;
    snakeState.ctx = canvas.getContext('2d');
    resetSnake();
    
    // Keyboard controls
    document.addEventListener('keydown', handleSnakeKey);
    
    startSnakeGame();
}

function resetSnake() {
    snakeState.snake = [{x: 200, y: 200}];
    snakeState.direction = {x: 20, y: 0};
    snakeState.score = 0;
    snakeState.gameOver = false;
    snakeState.lastUpdate = 0;
    generateFood();
    updateSnakeScore();
}

function handleSnakeKey(e) {
    if (snakeState.gameOver) return;
    
    const key = e.key.toLowerCase();
    const dir = snakeState.direction;
    
    if ((key === 'arrowup' || key === 'w') && dir.y === 0) {
        snakeState.direction = {x: 0, y: -20};
    } else if ((key === 'arrowdown' || key === 's') && dir.y === 0) {
        snakeState.direction = {x: 0, y: 20};
    } else if ((key === 'arrowleft' || key === 'a') && dir.x === 0) {
        snakeState.direction = {x: -20, y: 0};
    } else if ((key === 'arrowright' || key === 'd') && dir.x === 0) {
        snakeState.direction = {x: 20, y: 0};
    }
}

function generateFood() {
    const canvas = snakeState.canvas;
    const x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    const y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
    snakeState.food = {x, y};
}

function startSnakeGame() {
    if (snakeState.gameLoop) {
        cancelAnimationFrame(snakeState.gameLoop);
    }
    
    snakeState.lastUpdate = performance.now();
    
    function gameLoop(currentTime) {
        if (snakeState.gameOver) return;
        
        // Throttle updates to slow down the game (5x slower)
        if (currentTime - snakeState.lastUpdate >= snakeState.updateInterval) {
            updateSnake();
            snakeState.lastUpdate = currentTime;
        }
        
        // Always draw for smooth visuals
        drawSnake();
        
        snakeState.gameLoop = requestAnimationFrame(gameLoop);
    }
    
    snakeState.gameLoop = requestAnimationFrame(gameLoop);
    window.activeAnimationFrame = snakeState.gameLoop;
}

function updateSnake() {
    const head = {x: snakeState.snake[0].x + snakeState.direction.x, y: snakeState.snake[0].y + snakeState.direction.y};
    const canvas = snakeState.canvas;
    
    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endSnakeGame();
        return;
    }
    
    // Self collision
    for (let segment of snakeState.snake) {
        if (head.x === segment.x && head.y === segment.y) {
            endSnakeGame();
            return;
        }
    }
    
    snakeState.snake.unshift(head);
    
    // Check food
    if (head.x === snakeState.food.x && head.y === snakeState.food.y) {
        snakeState.score++;
        updateSnakeScore();
        generateFood();
    } else {
        snakeState.snake.pop();
    }
}

function drawSnake() {
    const ctx = snakeState.ctx;
    const canvas = snakeState.canvas;
    
    // Clear canvas
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#00f2ff';
    snakeState.snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#00f2ff';
        } else {
            ctx.fillStyle = '#00aacc';
        }
        ctx.fillRect(segment.x, segment.y, 18, 18);
    });
    
    // Draw food
    ctx.fillStyle = '#bd00ff';
    ctx.fillRect(snakeState.food.x, snakeState.food.y, 18, 18);
}

function updateSnakeScore() {
    const scoreEl = document.getElementById('snakeScore');
    if (scoreEl) {
        scoreEl.textContent = snakeState.score;
    }
}

function endSnakeGame() {
    snakeState.gameOver = true;
    if (snakeState.gameLoop) {
        cancelAnimationFrame(snakeState.gameLoop);
    }
    alert(`Game Over! Final Score: ${snakeState.score}`);
}

// ============================================
// TOOL 8: MEMORY CARD GAME
// ============================================

function generateMemory() {
    return `
        <h2 class="modal-title">Memory Card Game</h2>
        <div class="memory-game">
            <div class="memory-score">Moves: <span id="memoryMoves">0</span> | Matches: <span id="memoryMatches">0</span>/8</div>
            <div class="memory-grid" id="memoryGrid"></div>
            <button class="reset-button" onclick="resetMemory()">New Game</button>
        </div>
    `;
}

let memoryState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    emojis: ['🎮', '🚀', '💻', '🎨', '🌟', '🔥', '⚡', '🎯']
};

function initMemory() {
    resetMemory();
}

function resetMemory() {
    // Create pairs of emojis
    const pairs = [...memoryState.emojis, ...memoryState.emojis];
    
    // Shuffle
    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    
    memoryState.cards = pairs.map((emoji, index) => ({
        id: index,
        emoji: emoji,
        flipped: false,
        matched: false
    }));
    
    memoryState.flippedCards = [];
    memoryState.matchedPairs = 0;
    memoryState.moves = 0;
    
    renderMemory();
}

function renderMemory() {
    const grid = document.getElementById('memoryGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    memoryState.cards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = 'memory-card';
        if (card.flipped || card.matched) {
            cardEl.classList.add('flipped');
        }
        if (card.matched) {
            cardEl.classList.add('matched');
        }
        
        cardEl.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">${card.emoji}</div>
        `;
        
        cardEl.onclick = () => flipCard(card.id);
        grid.appendChild(cardEl);
    });
    
    updateMemoryScore();
}

function flipCard(cardId) {
    const card = memoryState.cards[cardId];
    
    if (card.flipped || card.matched || memoryState.flippedCards.length >= 2) {
        return;
    }
    
    card.flipped = true;
    memoryState.flippedCards.push(cardId);
    renderMemory();
    
    if (memoryState.flippedCards.length === 2) {
        memoryState.moves++;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [id1, id2] = memoryState.flippedCards;
    const card1 = memoryState.cards[id1];
    const card2 = memoryState.cards[id2];
    
    if (card1.emoji === card2.emoji) {
        card1.matched = true;
        card2.matched = true;
        memoryState.matchedPairs++;
        
        if (memoryState.matchedPairs === 8) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${memoryState.moves} moves! 🎉`);
            }, 500);
        }
    } else {
        card1.flipped = false;
        card2.flipped = false;
    }
    
    memoryState.flippedCards = [];
    renderMemory();
}

function updateMemoryScore() {
    const movesEl = document.getElementById('memoryMoves');
    const matchesEl = document.getElementById('memoryMatches');
    if (movesEl) movesEl.textContent = memoryState.moves;
    if (matchesEl) matchesEl.textContent = memoryState.matchedPairs;
}

// ============================================
// TOOL 9: INFINITE CRAFT
// ============================================

function generateInfiniteCraft() {
    return `
        <h2 class="modal-title">Infinite Craft</h2>
        <div style="display: flex; gap: 1rem; height: 600px; max-width: 1200px; margin: 0 auto; padding: 1rem;">
            <!-- Left Panel: Element Inventory -->
            <div style="width: 250px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 5px; padding: 1rem; overflow-y: auto;">
                <h3 style="color: var(--neon-blue); margin-bottom: 1rem; font-size: 1.2rem;">Inventory</h3>
                <div id="craftInventory" style="display: flex; flex-direction: column; gap: 0.5rem;"></div>
            </div>
            
            <!-- Center Panel: Mixing Area -->
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 5px; padding: 2rem;">
                <h3 style="color: var(--neon-purple); margin-bottom: 2rem; font-size: 1.2rem;">Mixing Area</h3>
                <div id="craftMixingArea" style="width: 300px; height: 300px; border: 3px dashed var(--neon-blue); border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--bg-dark); position: relative; transition: all 0.3s ease;">
                    <div id="craftSlotA" style="position: absolute; left: 20%; top: 50%; transform: translateY(-50%); width: 80px; height: 80px; border: 2px solid var(--neon-blue); border-radius: 5px; display: flex; align-items: center; justify-content: center; background: var(--bg-card); font-size: 1.5rem; color: var(--text-secondary);">?</div>
                    <span style="color: var(--neon-purple); font-size: 2rem; margin: 0 1rem;">+</span>
                    <div id="craftSlotB" style="position: absolute; right: 20%; top: 50%; transform: translateY(-50%); width: 80px; height: 80px; border: 2px solid var(--neon-blue); border-radius: 5px; display: flex; align-items: center; justify-content: center; background: var(--bg-card); font-size: 1.5rem; color: var(--text-secondary);">?</div>
                </div>
                <button id="craftCombineBtn" class="reset-button" onclick="combineCraftElements()" style="margin-top: 2rem; display: none;">Combine</button>
            </div>
            
            <!-- Right Panel: Discovered Log -->
            <div style="width: 300px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 5px; padding: 1rem; overflow-y: auto;">
                <h3 style="color: var(--neon-blue); margin-bottom: 1rem; font-size: 1.2rem;">Discovered</h3>
                <div id="craftLog" style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem;"></div>
            </div>
        </div>
    `;
}

let infiniteCraftState = {
    discoveredElements: new Set(['Fire', 'Water', 'Earth', 'Air']),
    elementList: ['Fire', 'Water', 'Earth', 'Air'], // Base elements first, then discovered alphabetically
    combinations: new Map(), // key: "Air|Fire", value: "Energy"
    mixingArea: { elementA: null, elementB: null },
    log: []
};

function initInfiniteCraft() {
    // Reset state on init
    infiniteCraftState.discoveredElements = new Set(['Fire', 'Water', 'Earth', 'Air']);
    infiniteCraftState.elementList = ['Fire', 'Water', 'Earth', 'Air'];
    infiniteCraftState.combinations = new Map();
    infiniteCraftState.mixingArea = { elementA: null, elementB: null };
    infiniteCraftState.log = [];
    
    renderInfiniteCraft();
    setupDragAndDrop();
}

function renderInfiniteCraft() {
    const inventory = document.getElementById('craftInventory');
    const slotA = document.getElementById('craftSlotA');
    const slotB = document.getElementById('craftSlotB');
    const mixingArea = document.getElementById('craftMixingArea');
    const combineBtn = document.getElementById('craftCombineBtn');
    const log = document.getElementById('craftLog');
    
    if (!inventory || !slotA || !slotB || !mixingArea || !combineBtn || !log) return;
    
    // Render inventory - Base elements first, then discovered alphabetically
    inventory.innerHTML = '';
    
    // Base elements
    const baseElements = ['Fire', 'Water', 'Earth', 'Air'];
    baseElements.forEach(elementName => {
        if (infiniteCraftState.discoveredElements.has(elementName)) {
            createInventoryElement(elementName, inventory, true);
        }
    });
    
    // Discovered elements (alphabetical, excluding base)
    const discovered = Array.from(infiniteCraftState.discoveredElements)
        .filter(e => !baseElements.includes(e))
        .sort();
    
    if (discovered.length > 0) {
        const separator = document.createElement('div');
        separator.style.cssText = 'border-top: 1px solid var(--border-color); margin: 0.5rem 0;';
        inventory.appendChild(separator);
        
        discovered.forEach(elementName => {
            createInventoryElement(elementName, inventory, false);
        });
    }
    
    // Render mixing area slots
    slotA.textContent = infiniteCraftState.mixingArea.elementA || '?';
    slotB.textContent = infiniteCraftState.mixingArea.elementB || '?';
    
    // Show/hide combine button
    if (infiniteCraftState.mixingArea.elementA && infiniteCraftState.mixingArea.elementB) {
        combineBtn.style.display = 'block';
        mixingArea.style.borderColor = 'var(--neon-purple)';
        mixingArea.style.boxShadow = '0 0 20px rgba(189, 0, 255, 0.3)';
    } else {
        combineBtn.style.display = 'none';
        mixingArea.style.borderColor = 'var(--neon-blue)';
        mixingArea.style.boxShadow = 'none';
    }
    
    // Render log
    log.innerHTML = '';
    if (infiniteCraftState.log.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.style.cssText = 'color: var(--text-secondary); font-style: italic;';
        emptyMsg.textContent = 'No combinations yet...';
        log.appendChild(emptyMsg);
    } else {
        infiniteCraftState.log.forEach(entry => {
            const logEntry = document.createElement('div');
            logEntry.style.cssText = 'padding: 0.5rem; background: var(--bg-dark); border-radius: 3px; color: var(--text-secondary);';
            logEntry.textContent = `${entry.elementA} + ${entry.elementB} → ${entry.result}`;
            log.appendChild(logEntry);
        });
        // Auto-scroll to bottom
        log.scrollTop = log.scrollHeight;
    }
}

function createInventoryElement(elementName, container, isBase) {
    const element = document.createElement('div');
    element.className = 'craft-element';
    element.draggable = true;
    element.dataset.elementName = elementName;
    element.textContent = elementName;
    element.style.cssText = `
        padding: 0.8rem 1rem;
        background: var(--bg-dark);
        border: 2px solid ${isBase ? 'var(--neon-blue)' : 'var(--neon-purple)'};
        border-radius: 20px;
        cursor: grab;
        transition: all 0.3s ease;
        user-select: none;
        text-align: center;
    `;
    
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);
    element.addEventListener('mouseenter', () => {
        element.style.boxShadow = '0 0 15px var(--neon-blue)';
        element.style.transform = 'scale(1.05)';
    });
    element.addEventListener('mouseleave', () => {
        element.style.boxShadow = 'none';
        element.style.transform = 'scale(1)';
    });
    
    container.appendChild(element);
}

function setupDragAndDrop() {
    const mixingArea = document.getElementById('craftMixingArea');
    if (!mixingArea) return;
    
    mixingArea.addEventListener('dragover', handleDragOver);
    mixingArea.addEventListener('drop', handleDrop);
    mixingArea.addEventListener('dragenter', handleDragEnter);
    mixingArea.addEventListener('dragleave', handleDragLeave);
}

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', e.target.dataset.elementName);
    e.target.style.opacity = '0.5';
    e.target.style.cursor = 'grabbing';
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
    e.target.style.cursor = 'grab';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    const mixingArea = document.getElementById('craftMixingArea');
    if (mixingArea) {
        mixingArea.style.borderColor = 'var(--neon-purple)';
        mixingArea.style.boxShadow = '0 0 25px rgba(189, 0, 255, 0.5)';
    }
}

function handleDragLeave(e) {
    const mixingArea = document.getElementById('craftMixingArea');
    if (mixingArea && !mixingArea.contains(e.relatedTarget)) {
        if (!infiniteCraftState.mixingArea.elementA || !infiniteCraftState.mixingArea.elementB) {
            mixingArea.style.borderColor = 'var(--neon-blue)';
            mixingArea.style.boxShadow = 'none';
        }
    }
}

function handleDrop(e) {
    e.preventDefault();
    const elementName = e.dataTransfer.getData('text/plain');
    
    // Check if mixing area is full
    if (infiniteCraftState.mixingArea.elementA && infiniteCraftState.mixingArea.elementB) {
        // Shake animation on invalid drop
        const mixingArea = document.getElementById('craftMixingArea');
        if (mixingArea) {
            mixingArea.style.animation = 'shake 0.5s';
            setTimeout(() => {
                mixingArea.style.animation = '';
            }, 500);
        }
        return;
    }
    
    // Prevent combining same element with itself
    if (infiniteCraftState.mixingArea.elementA === elementName || infiniteCraftState.mixingArea.elementB === elementName) {
        alert('Try two different elements!');
        return;
    }
    
    // Add to mixing area
    if (!infiniteCraftState.mixingArea.elementA) {
        infiniteCraftState.mixingArea.elementA = elementName;
    } else if (!infiniteCraftState.mixingArea.elementB) {
        infiniteCraftState.mixingArea.elementB = elementName;
    }
    
    const mixingArea = document.getElementById('craftMixingArea');
    if (mixingArea) {
        mixingArea.style.borderColor = 'var(--neon-blue)';
        mixingArea.style.boxShadow = 'none';
    }
    
    renderInfiniteCraft();
}

function combineCraftElements() {
    const elementA = infiniteCraftState.mixingArea.elementA;
    const elementB = infiniteCraftState.mixingArea.elementB;
    
    if (!elementA || !elementB) return;
    
    // Prevent combining same element
    if (elementA === elementB) {
        alert('Try two different elements!');
        return;
    }
    
    // Create sorted key (order doesn't matter)
    const sortedKey = [elementA, elementB].sort().join('|');
    
    // Check if combination already exists
    let result;
    if (infiniteCraftState.combinations.has(sortedKey)) {
        result = infiniteCraftState.combinations.get(sortedKey);
    } else {
        // Generate new element
        result = generateCraftElement(elementA, elementB);
        
        // Check if result name already exists, append suffix if needed
        let finalResult = result;
        let suffix = 2;
        while (infiniteCraftState.discoveredElements.has(finalResult)) {
            finalResult = `${result} ${suffix}`;
            suffix++;
        }
        result = finalResult;
        
        // Store combination
        infiniteCraftState.combinations.set(sortedKey, result);
    }
    
    // Add to discovered elements if new
    if (!infiniteCraftState.discoveredElements.has(result)) {
        infiniteCraftState.discoveredElements.add(result);
        // Add to list and sort (base elements first, then alphabetical)
        const baseElements = ['Fire', 'Water', 'Earth', 'Air'];
        if (!baseElements.includes(result)) {
            infiniteCraftState.elementList.push(result);
            infiniteCraftState.elementList = baseElements.filter(e => infiniteCraftState.discoveredElements.has(e))
                .concat(infiniteCraftState.elementList.filter(e => !baseElements.includes(e)).sort());
        }
    }
    
    // Add to log
    infiniteCraftState.log.push({
        elementA: elementA,
        elementB: elementB,
        result: result
    });
    
    // Clear mixing area
    infiniteCraftState.mixingArea.elementA = null;
    infiniteCraftState.mixingArea.elementB = null;
    
    renderInfiniteCraft();
}

function generateCraftElement(elementA, elementB) {
    // Predefined combinations for common elements
    const predefined = {
        'Air|Fire': 'Energy',
        'Earth|Fire': 'Lava',
        'Earth|Water': 'Mud',
        'Fire|Water': 'Steam',
        'Air|Water': 'Rain',
        'Air|Earth': 'Dust',
        'Energy|Water': 'Electricity',
        'Lava|Water': 'Stone',
        'Mud|Fire': 'Brick',
        'Steam|Earth': 'Geyser',
        'Rain|Earth': 'Plant',
        'Dust|Water': 'Clay'
    };
    
    const key = [elementA, elementB].sort().join('|');
    
    if (predefined[key]) {
        return predefined[key];
    }
    
    // Generate compound name
    // Try combining names intelligently
    const nameA = elementA.toLowerCase();
    const nameB = elementB.toLowerCase();
    
    // Simple compound: elementA + elementB
    const compound = nameA.charAt(0).toUpperCase() + nameA.slice(1) + nameB.charAt(0).toUpperCase() + nameB.slice(1);
    
    // If compound is too long, use first part of each
    if (compound.length > 15) {
        return (nameA.substring(0, 4) + nameB.substring(0, 4)).charAt(0).toUpperCase() + 
               (nameA.substring(0, 4) + nameB.substring(0, 4)).slice(1);
    }
    
    return compound;
}

function resetInfiniteCraft() {
    infiniteCraftState.discoveredElements = new Set(['Fire', 'Water', 'Earth', 'Air']);
    infiniteCraftState.elementList = ['Fire', 'Water', 'Earth', 'Air'];
    infiniteCraftState.combinations = new Map();
    infiniteCraftState.mixingArea = { elementA: null, elementB: null };
    infiniteCraftState.log = [];
    renderInfiniteCraft();
}

// ============================================
// TOOL 10: SIMULATION CLICKER
// ============================================

function generateClicker() {
    return `
        <h2 class="modal-title">Simulation Clicker</h2>
        <div style="text-align: center; max-width: 500px; margin: 0 auto; padding: 2rem;">
            <div style="font-size: 3rem; color: var(--neon-blue); margin: 2rem 0;" id="clickerResources">0</div>
            <div style="color: var(--text-secondary); margin-bottom: 2rem;">
                <div>Per Click: <span id="clickerPerClick">1</span></div>
                <div>Per Second: <span id="clickerPerSecond">0</span></div>
            </div>
            <button class="test-button" onclick="clickResource()" id="clickerBtn" style="font-size: 1.5rem; padding: 1.5rem 3rem;">Click Me!</button>
            <div style="margin-top: 2rem;">
                <h3 style="color: var(--neon-purple); margin-bottom: 1rem;">Upgrades</h3>
                <div id="clickerUpgrades"></div>
            </div>
        </div>
    `;
}

let clickerState = {
    resources: 0,
    perClick: 1,
    perSecond: 0,
    intervalId: null,
    upgrades: [
        { name: 'Auto Clicker', cost: 10, perSecond: 1 },
        { name: 'Double Click', cost: 50, perClick: 1 },
        { name: 'Triple Click', cost: 200, perClick: 2 },
        { name: 'Mega Clicker', cost: 1000, perSecond: 5 }
    ],
    purchased: []
};

function initClicker() {
    clickerState.resources = 0;
    clickerState.perClick = 1;
    clickerState.perSecond = 0;
    clickerState.purchased = [];
    if (clickerState.intervalId) clearInterval(clickerState.intervalId);
    clickerState.intervalId = setInterval(() => {
        clickerState.resources += clickerState.perSecond;
        updateClickerDisplay();
    }, 1000);
    if (!window.activeIntervals) window.activeIntervals = [];
    window.activeIntervals.push(clickerState.intervalId);
    renderClickerUpgrades();
    updateClickerDisplay();
}

function clickResource() {
    clickerState.resources += clickerState.perClick;
    updateClickerDisplay();
}

function renderClickerUpgrades() {
    const container = document.getElementById('clickerUpgrades');
    if (!container) return;
    
    container.innerHTML = '';
    clickerState.upgrades.forEach((upgrade, index) => {
        const isPurchased = clickerState.purchased.includes(index);
        const canAfford = clickerState.resources >= upgrade.cost;
        
        const btn = document.createElement('button');
        btn.className = 'reset-button';
        btn.style.cssText = `width: 100%; margin: 0.5rem 0; opacity: ${isPurchased ? '0.5' : canAfford ? '1' : '0.6'};`;
        btn.disabled = isPurchased || !canAfford;
        btn.textContent = `${upgrade.name} - Cost: ${upgrade.cost}`;
        btn.onclick = () => purchaseUpgrade(index);
        container.appendChild(btn);
    });
}

function purchaseUpgrade(index) {
    const upgrade = clickerState.upgrades[index];
    if (clickerState.resources >= upgrade.cost && !clickerState.purchased.includes(index)) {
        clickerState.resources -= upgrade.cost;
        clickerState.purchased.push(index);
        
        if (upgrade.perClick) clickerState.perClick += upgrade.perClick;
        if (upgrade.perSecond) clickerState.perSecond += upgrade.perSecond;
        
        updateClickerDisplay();
        renderClickerUpgrades();
    }
}

function updateClickerDisplay() {
    const resourcesEl = document.getElementById('clickerResources');
    const perClickEl = document.getElementById('clickerPerClick');
    const perSecondEl = document.getElementById('clickerPerSecond');
    
    if (resourcesEl) resourcesEl.textContent = Math.floor(clickerState.resources);
    if (perClickEl) perClickEl.textContent = clickerState.perClick;
    if (perSecondEl) perSecondEl.textContent = clickerState.perSecond;
    
    renderClickerUpgrades();
}

// ============================================
// TOOL 11: SPACE ELEVATOR
// ============================================

function generateSpaceElevator() {
    return `
        <h2 class="modal-title">Space Elevator</h2>
        <div style="text-align: center; max-width: 500px; margin: 0 auto; padding: 2rem;">
            <div style="font-size: 4rem; color: var(--neon-blue); margin: 2rem 0;" id="elevatorHeight">0</div>
            <div style="color: var(--text-secondary); margin-bottom: 1rem;">km</div>
            <div style="margin: 2rem 0;">
                <button class="test-button" onclick="clickElevator()" style="margin: 0.5rem;">Click to Climb</button>
                <button class="test-button" onclick="autoElevator()" id="autoElevatorBtn" style="margin: 0.5rem;">Auto Climb</button>
            </div>
            <div id="elevatorMilestones" style="margin-top: 2rem; color: var(--text-secondary);"></div>
        </div>
    `;
}

let elevatorState = {
    height: 0,
    perClick: 1,
    autoActive: false,
    intervalId: null,
    milestones: [
        { height: 10, message: 'Reached Stratosphere!' },
        { height: 50, message: 'Entered Mesosphere!' },
        { height: 100, message: 'Reached Thermosphere!' },
        { height: 500, message: 'Entered Exosphere!' },
        { height: 1000, message: 'Low Earth Orbit!' },
        { height: 5000, message: 'Medium Earth Orbit!' },
        { height: 10000, message: 'Geostationary Orbit!' },
        { height: 50000, message: 'Deep Space!' }
    ],
    reached: []
};

function initSpaceElevator() {
    elevatorState.height = 0;
    elevatorState.perClick = 1;
    elevatorState.autoActive = false;
    elevatorState.reached = [];
    if (elevatorState.intervalId) clearInterval(elevatorState.intervalId);
    updateElevatorDisplay();
    renderMilestones();
}

function clickElevator() {
    elevatorState.height += elevatorState.perClick;
    checkMilestones();
    updateElevatorDisplay();
}

function autoElevator() {
    elevatorState.autoActive = !elevatorState.autoActive;
    const btn = document.getElementById('autoElevatorBtn');
    if (btn) btn.textContent = elevatorState.autoActive ? 'Stop Auto' : 'Auto Climb';
    
    if (elevatorState.autoActive) {
        elevatorState.intervalId = setInterval(() => {
            elevatorState.height += elevatorState.perClick;
            checkMilestones();
            updateElevatorDisplay();
        }, 100);
        if (!window.activeIntervals) window.activeIntervals = [];
        window.activeIntervals.push(elevatorState.intervalId);
    } else {
        if (elevatorState.intervalId) clearInterval(elevatorState.intervalId);
    }
}

function checkMilestones() {
    elevatorState.milestones.forEach((milestone, index) => {
        if (elevatorState.height >= milestone.height && !elevatorState.reached.includes(index)) {
            elevatorState.reached.push(index);
            alert(milestone.message);
            renderMilestones();
        }
    });
}

function renderMilestones() {
    const container = document.getElementById('elevatorMilestones');
    if (!container) return;
    
    container.innerHTML = '<h3 style="color: var(--neon-purple);">Milestones:</h3>';
    elevatorState.milestones.forEach((milestone, index) => {
        const reached = elevatorState.reached.includes(index);
        const div = document.createElement('div');
        div.style.cssText = `margin: 0.5rem 0; color: ${reached ? 'var(--neon-blue)' : 'var(--text-secondary)'};`;
        div.textContent = `${milestone.height}km - ${milestone.message} ${reached ? '✓' : ''}`;
        container.appendChild(div);
    });
}

function updateElevatorDisplay() {
    const heightEl = document.getElementById('elevatorHeight');
    if (heightEl) heightEl.textContent = Math.floor(elevatorState.height);
}

// ============================================
// TOOL 12: ASTEROID LAUNCHER
// ============================================

function generateAsteroid() {
    return `
        <h2 class="modal-title">Asteroid Launcher</h2>
        <div style="text-align: center; max-width: 600px; margin: 0 auto; padding: 2rem;">
            <canvas id="asteroidCanvas" width="600" height="400" style="border: 2px solid var(--neon-blue); border-radius: 5px; background: var(--bg-dark); display: block; margin: 1rem auto;"></canvas>
            <div style="margin: 1rem 0;">
                <div style="color: var(--text-secondary); margin: 0.5rem 0;">
                    Angle: <span id="asteroidAngle">45</span>° | Power: <span id="asteroidPower">50</span>%
                </div>
                <div style="margin: 1rem 0;">
                    <input type="range" id="angleSlider" min="0" max="90" value="45" style="width: 200px; margin: 0 1rem;">
                    <input type="range" id="powerSlider" min="10" max="100" value="50" style="width: 200px; margin: 0 1rem;">
                </div>
                <button class="test-button" onclick="launchAsteroid()">Launch!</button>
                <div style="margin-top: 1rem; color: var(--neon-purple);">
                    Distance: <span id="asteroidDistance">0</span> km
                </div>
            </div>
        </div>
    `;
}

let asteroidState = {
    canvas: null,
    ctx: null,
    angle: 45,
    power: 50,
    distance: 0
};

function initAsteroid() {
    const canvas = document.getElementById('asteroidCanvas');
    if (!canvas) return;
    
    asteroidState.canvas = canvas;
    asteroidState.ctx = canvas.getContext('2d');
    
    const angleSlider = document.getElementById('angleSlider');
    const powerSlider = document.getElementById('powerSlider');
    
    if (angleSlider) {
        angleSlider.oninput = (e) => {
            asteroidState.angle = parseInt(e.target.value);
            document.getElementById('asteroidAngle').textContent = asteroidState.angle;
            drawAsteroidScene();
        };
    }
    
    if (powerSlider) {
        powerSlider.oninput = (e) => {
            asteroidState.power = parseInt(e.target.value);
            document.getElementById('asteroidPower').textContent = asteroidState.power;
        };
    }
    
    drawAsteroidScene();
}

function drawAsteroidScene() {
    const ctx = asteroidState.ctx;
    const canvas = asteroidState.canvas;
    
    // Clear
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#333';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    
    // Draw launcher
    ctx.strokeStyle = '#00f2ff';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    const angleRad = (asteroidState.angle * Math.PI) / 180;
    ctx.lineTo(50 + Math.cos(angleRad) * 30, canvas.height - 50 - Math.sin(angleRad) * 30);
    ctx.stroke();
}

function launchAsteroid() {
    // Simple physics: distance = power * sin(2*angle) / gravity
    const angleRad = (asteroidState.angle * Math.PI) / 180;
    const distance = (asteroidState.power / 10) * Math.sin(2 * angleRad) * 10;
    asteroidState.distance = Math.max(0, Math.floor(distance));
    
    document.getElementById('asteroidDistance').textContent = asteroidState.distance;
    
    // Animate launch
    animateAsteroidLaunch();
}

function animateAsteroidLaunch() {
    const ctx = asteroidState.ctx;
    const canvas = asteroidState.canvas;
    const angleRad = (asteroidState.angle * Math.PI) / 180;
    const v0 = asteroidState.power / 2;
    let t = 0;
    
    function animate() {
        drawAsteroidScene();
        
        const x = 50 + v0 * Math.cos(angleRad) * t * 2;
        const y = canvas.height - 50 - (v0 * Math.sin(angleRad) * t * 2 - 0.5 * 9.8 * t * t * 10);
        
        if (y < canvas.height - 50 && x < canvas.width) {
            ctx.fillStyle = '#bd00ff';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
            t += 0.05;
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// ============================================
// TOOL 13: DRAW PERFECT CIRCLE
// ============================================

function generateCircle() {
    return `
        <h2 class="modal-title">Draw a Perfect Circle</h2>
        <div style="text-align: center; max-width: 500px; margin: 0 auto; padding: 2rem;">
            <canvas id="circleCanvas" width="400" height="400" style="border: 2px solid var(--neon-blue); border-radius: 50%; background: var(--bg-dark); display: block; margin: 1rem auto; cursor: crosshair;"></canvas>
            <div style="margin: 1rem 0;">
                <div style="font-size: 2rem; color: var(--neon-blue);" id="circleScore">0%</div>
                <div style="color: var(--text-secondary); margin: 1rem 0;">Draw a circle by clicking and dragging</div>
                <button class="reset-button" onclick="resetCircle()">Clear</button>
            </div>
        </div>
    `;
}

let circleState = {
    canvas: null,
    ctx: null,
    drawing: false,
    points: [],
    center: { x: 200, y: 200 },
    radius: 0
};

function initCircle() {
    const canvas = document.getElementById('circleCanvas');
    if (!canvas) return;
    
    circleState.canvas = canvas;
    circleState.ctx = canvas.getContext('2d');
    circleState.drawing = false;
    circleState.points = [];
    
    canvas.onmousedown = startCircleDraw;
    canvas.onmousemove = drawCircle;
    canvas.onmouseup = endCircleDraw;
    canvas.onmouseleave = endCircleDraw;
    
    resetCircle();
}

function startCircleDraw(e) {
    circleState.drawing = true;
    circleState.points = [];
    const rect = circleState.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    circleState.points.push({ x, y });
    circleState.center = { x, y };
}

function drawCircle(e) {
    if (!circleState.drawing) return;
    
    const rect = circleState.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    circleState.points.push({ x, y });
    
    // Draw path
    const ctx = circleState.ctx;
    ctx.strokeStyle = '#00f2ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(circleState.points[0].x, circleState.points[0].y);
    for (let i = 1; i < circleState.points.length; i++) {
        ctx.lineTo(circleState.points[i].x, circleState.points[i].y);
    }
    ctx.stroke();
}

function endCircleDraw() {
    if (!circleState.drawing) return;
    circleState.drawing = false;
    calculateCircleScore();
}

function calculateCircleScore() {
    if (circleState.points.length < 10) {
        document.getElementById('circleScore').textContent = '0%';
        return;
    }
    
    // Calculate center and average radius
    let sumX = 0, sumY = 0;
    circleState.points.forEach(p => {
        sumX += p.x;
        sumY += p.y;
    });
    const centerX = sumX / circleState.points.length;
    const centerY = sumY / circleState.points.length;
    
    let sumRadius = 0;
    circleState.points.forEach(p => {
        const dist = Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2);
        sumRadius += dist;
    });
    const avgRadius = sumRadius / circleState.points.length;
    
    // Calculate deviation
    let totalDeviation = 0;
    circleState.points.forEach(p => {
        const dist = Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2);
        totalDeviation += Math.abs(dist - avgRadius);
    });
    const avgDeviation = totalDeviation / circleState.points.length;
    
    // Score: 100% - (deviation / radius * 100)
    const score = Math.max(0, Math.min(100, 100 - (avgDeviation / avgRadius * 100)));
    document.getElementById('circleScore').textContent = Math.round(score) + '%';
}

function resetCircle() {
    const ctx = circleState.ctx;
    const canvas = circleState.canvas;
    if (ctx && canvas) {
        ctx.fillStyle = '#0f0f0f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    circleState.points = [];
    document.getElementById('circleScore').textContent = '0%';
}

// ============================================
// TOOL 14: SPEND BILLIONAIRE MONEY
// ============================================
let billionaireState = {
    balance: 638000000000, 
    netWorths: { elon: 638000000000, bezos: 239000000000, gates: 120000000000 },
    inventory: {}, // New inventory to track purchased items
    items: [
        // --- START OF USER'S FULL ITEM LIST (115 ITEMS) ---
        { name: 'Coffee', price: 5, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200' },
        { name: 'Lunch', price: 15, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8b0?w=200' },
        { name: 'Movie Ticket', price: 12, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200' },
        { name: 'Smartphone', price: 1000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' },
        { name: 'Laptop', price: 2000, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200' },
        { name: 'Car', price: 30000, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200' },
        { name: 'House', price: 500000, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200' },
        { name: 'Private Jet', price: 50000000, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200' },
        { name: 'Yacht', price: 100000000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200' },
        { name: 'Island', price: 5000000000, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200' },
        { name: 'Luxury Restaurant', price: 5000000, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' },
        { name: 'Food Truck', price: 50000, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200' },
        { name: 'Bakery', price: 200000, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200' },
        { name: 'Brewery', price: 1000000, image: 'https://images.unsplash.com/photo-1506377247727-4b5e4e4a7d2a?w=200' },
        { name: 'Winery', price: 5000000, image: 'https://images.unsplash.com/photo-1506377247727-4b5e4e4a7d2a?w=200' },
        { name: 'Distillery', price: 3000000, image: 'https://images.unsplash.com/photo-1506377247727-4b5e4e4a7d2a?w=200' },
        { name: 'Chocolate Factory', price: 2000000, image: 'https://images.unsplash.com/photo-1606312619070-d48b4bdc5f3f?w=200' },
        { name: 'Movie Theater', price: 2000000, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200' },
        { name: 'Concert Hall', price: 10000000, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200' },
        { name: 'Stadium', price: 500000000, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200' },
        { name: 'Arena', price: 200000000, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200' },
        { name: 'Theme Park', price: 1000000000, image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200' },
        { name: 'Water Park', price: 500000000, image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=200' },
        { name: 'Amusement Park', price: 2000000000, image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200' },
        { name: 'Casino', price: 500000000, image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=200' },
        { name: 'Nightclub', price: 5000000, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200' },
        { name: 'Bar', price: 500000, image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200' },
        { name: 'Library', price: 5000000, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200' },
        { name: 'Museum', price: 20000000, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200' },
        { name: 'Art Museum', price: 50000000, image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200' },
        { name: 'Science Museum', price: 30000000, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200' },
        { name: 'Planetarium', price: 15000000, image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200' },
        { name: 'Observatory', price: 25000000, image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200' },
        { name: 'University', price: 100000000, image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200' },
        { name: 'School', price: 5000000, image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200' },
        { name: 'Research Lab', price: 20000000, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200' },  
        { name: 'Data Center', price: 200000000, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200' },
        { name: 'Tech Company', price: 10000000000, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200' },
        
        // More Items to reach 100+
        { name: 'Basketball', price: 30, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200' },
        { name: 'Football', price: 25, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200' },
        { name: 'Soccer Ball', price: 20, image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=200' },
        { name: 'Treadmill', price: 1000, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200' },
        { name: 'Dumbbells', price: 200, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200' },
        { name: 'Yoga Mat', price: 40, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200' },
        { name: 'Basketball Court', price: 50000, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200' },
        { name: 'Tennis Court', price: 75000, image: 'https://images.unsplash.com/photo-1622163642999-9584742c8ea8?w=200' },
        { name: 'Swimming Pool', price: 50000, image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=200' },
        { name: 'Gym Equipment', price: 5000, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200' },
        
        { name: 'Pet Dog', price: 500, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200' },
        { name: 'Pet Cat', price: 300, image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=200' },
        { name: 'Horse', price: 10000, image: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=200' },
        { name: 'Exotic Pet', price: 5000, image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=200' },
        { name: 'Zoo', price: 50000000, image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=200' },
        { name: 'Aquarium', price: 10000, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200' },
        { name: 'Private Zoo', price: 100000000, image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=200' },
        { name: 'Wildlife Reserve', price: 50000000, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200' },
        { name: 'Safari Park', price: 25000000, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200' },
        { name: 'Marine Park', price: 30000000, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200' },
        
        { name: 'Restaurant', price: 500000, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' },
        { name: 'Cafe Chain', price: 2000000, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200' },
        { name: 'Fast Food Chain', price: 10000000, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200' },
        { name: 'Guitar', price: 500, image: 'https://images.unsplash.com/photo-1516924962500-2b4b2b8a6d77?w=200' },
        { name: 'Piano', price: 5000, image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=200' },
        { name: 'Drum Set', price: 1000, image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=200' },
        { name: 'Bicycle (Racing)', price: 2000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
        { name: 'Surfboard', price: 600, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200' },
        { name: 'Skis', price: 800, image: 'https://images.unsplash.com/photo-1551524164-6cf77e5c0d54?w=200' },
        { name: 'Golf Clubs', price: 1500, image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=200' },
        { name: 'Tennis Racket', price: 200, image: 'https://images.unsplash.com/photo-1622163642999-9584742c8ea8?w=200' },
        { name: 'Fishing Rod', price: 150, image: 'https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?w=200' },
        { name: 'Camping Gear', price: 500, image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=200' },
        
        // Luxury & Collectibles
        { name: 'Vintage Wine', price: 10000, image: 'https://images.unsplash.com/photo-1506377247727-4b5e4e4a7d2a?w=200' },
        { name: 'Rare Coin', price: 50000, image: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a84?w=200' },
        { name: 'Antique', price: 25000, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200' },
        { name: 'Collectible Car', price: 1000000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200' },
        { name: 'Rare Stamp', price: 100000, image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=200' },
        { name: 'Diamond', price: 500000, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200' },
        { name: 'Gold Bar', price: 60000, image: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a84?w=200' },
        { name: 'Luxury Car Collection', price: 50000000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200' },
        { name: 'Private Art Gallery', price: 100000000, image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200' },
        { name: 'Wine Cellar', price: 20000000, image: 'https://images.unsplash.com/photo-1506377247727-4b5e4e4a7d2a?w=200' },
        
        // Space & Technology
        { name: 'Satellite', price: 500000000, image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200' },
        { name: 'Space Mission', price: 1000000000, image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200' },
        { name: 'Rocket', price: 2000000000, image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200' },
        { name: 'Space Station Module', price: 5000000000, image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200' },
        { name: 'Mars Colony', price: 10000000000, image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200' },
        { name: 'Moon Base', price: 50000000000, image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200' },
        { name: 'AI Supercomputer', price: 100000000, image: 'https://images.unsplash.com/photo-1587825147138-346b228a7b7e?w=200' },
        { name: 'Quantum Computer', price: 50000000, image: 'https://images.unsplash.com/photo-1587825147138-346b228a7b7e?w=200' },
        { name: 'Smartwatch', price: 400, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
        { name: 'Tablet Pro', price: 800, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200' },
        { name: 'Desktop Computer', price: 1500, image: 'https://images.unsplash.com/photo-1587825147138-346b228a7b7e?w=200' },
        { name: 'Monitor', price: 300, image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=200' },
        { name: 'Keyboard', price: 100, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200' },
        { name: 'Mouse', price: 50, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=200' },
        { name: 'Webcam', price: 80, image: 'https://images.unsplash.com/photo-1587825147138-346b228a7b7e?w=200' },
        { name: 'Microphone', price: 150, image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200' },
        { name: 'Speaker System', price: 500, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200' },
        { name: 'Router', price: 200, image: 'https://images.unsplash.com/photo-1609391886648-3f43fe2c686e?w=200' },
        
        // Vehicles (More)
        { name: 'Bicycle', price: 500, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },
        { name: 'Electric Scooter', price: 800, image: 'https://images.unsplash.com/photo-1606318801954-d46d46d3360f?w=200' },
        { name: 'Truck', price: 40000, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200' },
        { name: 'RV', price: 100000, image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200' },
        { name: 'Boat', price: 50000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200' },
        { name: 'Jet Ski', price: 12000, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200' },
        { name: 'ATV', price: 8000, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200' },
        { name: 'Luxury Van', price: 60000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200' },
        { name: 'Convertible', price: 60000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200' },
        { name: 'Electric Car', price: 40000, image: 'https://images.unsplash.com/photo-1560958035-577d0f90c12b?w=200' },
        
        // Real Estate (More)
        { name: 'Studio Apartment', price: 150000, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200' },
        { name: 'Townhouse', price: 350000, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200' },
        { name: 'Condo', price: 250000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200' },
        { name: 'Villa', price: 2000000, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200' },
        { name: 'Beach House', price: 3000000, image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=200' },
        { name: 'Mountain Cabin', price: 400000, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200' },
        { name: 'Farm', price: 1500000, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200' },
        { name: 'Ranch', price: 5000000, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200' },
        { name: 'Hotel', price: 50000000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200' },
        { name: 'Office Building', price: 75000000, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200' },
        { name: 'Ice Cream', price: 4, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1b3?w=200' },
        { name: 'Soda', price: 2, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200' },
        { name: 'Candy Bar', price: 1, image: 'https://images.unsplash.com/photo-1606312619070-d48b4bdc5f3f?w=200' },
        { name: 'Magazine', price: 5, image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200' },
        { name: 'Newspaper', price: 2, image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200' },
        { name: 'Umbrella', price: 15, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200' },
        { name: 'Backpack', price: 40, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200' },
        { name: 'Sunglasses', price: 25, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200' },
        { name: 'Hat', price: 20, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200' },
        { name: 'Wallet', price: 30, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200' },
        
        // Food & Dining
        { name: 'Breakfast', price: 10, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200' },
        { name: 'Dinner', price: 25, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8b0?w=200' },
        { name: 'Fast Food Meal', price: 8, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200' },
        { name: 'Fine Dining', price: 150, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200' },
        { name: 'Coffee Shop', price: 6, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200' },
        { name: 'Sushi', price: 30, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200' },
        { name: 'Steak', price: 40, image: 'https://images.unsplash.com/photo-1546837148-f8e5c3b0a5b8?w=200' },
        { name: 'Pasta', price: 18, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200' },
        { name: 'Salad', price: 12, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200' },
        { name: 'Dessert', price: 8, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200' },
        
        // Clothing & Fashion
        { name: 'Jacket', price: 100, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200' },
        { name: 'Dress', price: 80, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200' },
        { name: 'Suit', price: 500, image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb7080?w=200' },
        { name: 'Designer Bag', price: 2000, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200' },
        { name: 'Jewelry', price: 5000, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200' },
        { name: 'Sunglasses (Designer)', price: 300, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200' },
        { name: 'Shoes', price: 120, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
        { name: 'Boots', price: 150, image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=200' },
        { name: 'Coat', price: 200, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200' },
        { name: 'Accessories Set', price: 50, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200' },
        { name: 'Motorcycle', price: 15000, image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=200' },
        { name: 'Car', price: 30000, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200' },
        { name: 'SUV', price: 45000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200' },
        { name: 'Sports Car', price: 80000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200' },
        { name: 'Luxury Sedan', price: 120000, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=200' },
        { name: 'Tesla Model S', price: 95000, image: 'https://images.unsplash.com/photo-1560958035-577d0f90c12b?w=200' },
        { name: 'Supercar', price: 250000, image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=200' },
        { name: 'Luxury SUV', price: 180000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200' },
        { name: 'Hypercar', price: 500000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200' },
        { name: 'Yacht (Small)', price: 1000000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200' },
        
        // Real Estate ($100,000 - $100,000,000)
        { name: 'Apartment', price: 200000, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200' },
        { name: 'House', price: 500000, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200' },
        { name: 'Mansion', price: 5000000, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200' },
        { name: 'Penthouse', price: 10000000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200' },
        { name: 'Estate', price: 25000000, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200' },
        { name: 'Private Island', price: 50000000, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200' },
        { name: 'Skyscraper Floor', price: 75000000, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200' },
        { name: 'Castle', price: 100000000, image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=200' },
        
        // Luxury Items ($1,000,000 - $100,000,000)
        { name: 'Private Jet', price: 50000000, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200' },
        { name: 'Super Yacht', price: 100000000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200' },
        { name: 'Helicopter', price: 15000000, image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=200' },
        { name: 'Luxury Watch Collection', price: 5000000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
        { name: 'Diamond Ring', price: 2000000, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200' },
        { name: 'Art Collection', price: 50000000, image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200' },
        { name: 'Wine Collection', price: 10000000, image: 'https://images.unsplash.com/photo-1506377247727-4b5e4e4a7d2a?w=200' },
        { name: 'Sports Team', price: 2000000000, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200' },
        { name: 'Formula 1 Team', price: 5000000000, image: 'https://images.unsplash.com/photo-1610992015738-26964b3b0b0b?w=200' },
        { name: 'Space Hotel Room', price: 50000000, image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200' },
        { name: 'Coffee', price: 5, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200' },
        { name: 'Sandwich', price: 8, image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200' },
        { name: 'Pizza Slice', price: 3, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200' },
        { name: 'Burger', price: 6, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
        { name: 'Movie Ticket', price: 12, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200' },
        { name: 'Book', price: 15, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200' },
        { name: 'T-Shirt', price: 20, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200' },
        { name: 'Jeans', price: 50, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200' },
        { name: 'Sneakers', price: 80, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
        { name: 'Watch', price: 100, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
        
        // Electronics ($100 - $10,000)
        { name: 'Headphones', price: 150, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
        { name: 'Tablet', price: 300, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200' },
        { name: 'Gaming Console', price: 500, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200' },
        { name: 'Smartphone', price: 1000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' },
        { name: 'Laptop', price: 2000, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200' },
        { name: '4K TV', price: 1500, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200' },
        { name: 'Camera', price: 2500, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200' },
        { name: 'Gaming PC', price: 3000, image: 'https://images.unsplash.com/photo-1587825147138-346b228a7b7e?w=200' },
        { name: 'MacBook Pro', price: 3500, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200' },
        { name: 'VR Headset', price: 400, image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=200' }
        // --- END OF USER'S FULL ITEM LIST ---
    ]
};

function generateBillionaire() {
    return `
        <h2 class="modal-title">Spend Billionaire Money</h2>
        <div style="max-width: 900px; margin: 0 auto; padding: 2rem;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <select id="billionaireSelect" style="padding: 0.8rem; background: var(--bg-dark); border: 2px solid var(--neon-blue); color: var(--neon-blue); border-radius: 5px; font-size: 1rem; margin-bottom: 1rem;">
                    <option value="elon">Elon Musk - $638B</option>
                    <option value="bezos">Jeff Bezos - $239B</option>
                    <option value="gates">Bill Gates - $120B</option>
                </select>
                <div style="font-size: 2.5rem; color: var(--neon-blue); margin: 1rem 0;" id="billionaireBalance">$638,000,000,000</div>
            </div>
            
            <h3 style="color: var(--neon-red); border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">🛒 Bought Items</h3>
            <div id="billionaireInventory" style="margin-bottom: 2rem; display: flex; flex-wrap: wrap; gap: 10px;">
                </div>

            <h3 style="color: var(--neon-blue); border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">🛍️ Items to Buy</h3>
            <div id="billionaireItems">
                </div>
        </div>
    `;
}

function initBillionaire() {
    // Basic setup code for the billionaire tool
    const select = document.getElementById('billionaireSelect');
    if (select) {
        select.onchange = () => {
            const value = select.value;
            billionaireState.balance = billionaireState.netWorths[value];
            billionaireState.inventory = {}; // Reset inventory for new billionaire
            updateBillionaireDisplay();
        };
    }
    // Set initial balance
    billionaireState.balance = billionaireState.netWorths['elon'];
    renderBillionaireItems();
    updateBillionaireDisplay();
    renderInventory();
}

/**
 * Function to handle the visual effects when money runs out (shake and flash)
 */
function outOfMoneyEffect() {
    const balanceEl = document.getElementById('billionaireBalance');
    const modalContent = document.querySelector('.modal-content');

    if (modalContent) {
        // Vibrate (if supported, primarily mobile)
        if (navigator.vibrate) {
            navigator.vibrate(100); // Vibrate for 100ms
        }
        
        // Apply shake animation to the modal content (requires 'out-of-money-shake' CSS class)
        modalContent.classList.add('out-of-money-shake');
        
        // Remove shake class after animation finishes (500ms)
        setTimeout(() => {
            modalContent.classList.remove('out-of-money-shake');
        }, 500);

        // Neon Red Tint Flash on balance
        if (balanceEl) {
            balanceEl.style.transition = 'none';
            balanceEl.style.color = 'var(--neon-red)';
            
            // Reset color after a millisecond (to create the flash)
            setTimeout(() => {
                balanceEl.style.transition = 'color 0.5s ease-out';
                // Only reset to blue if balance is still > 0
                if (billionaireState.balance > 0) {
                     balanceEl.style.color = 'var(--neon-blue)';
                }
            }, 10);
        }
    }
}

function buyItem(item, quantity = 1) {
    // Ensure quantity is a positive integer
    quantity = Math.max(1, Math.floor(quantity)); 
    const cost = item.price * quantity;
    
    if (billionaireState.balance >= cost) {
        billionaireState.balance -= cost;
        
        // Update inventory
        const itemNameKey = item.name.replace(/\s/g, '_');
        billionaireState.inventory[itemNameKey] = (billionaireState.inventory[itemNameKey] || 0) + quantity;
        
        updateBillionaireDisplay();
        renderInventory();
        
    } else {
        // Warning: Out of money
        outOfMoneyEffect();
        alert('Warning: You are out of money! Cannot afford this purchase.');
    }
}

function updateBillionaireDisplay() {
    const balanceEl = document.getElementById('billionaireBalance');
    if (balanceEl) {
        // Display warning if balance is 0 or less
        if (billionaireState.balance <= 0) {
            balanceEl.textContent = '$0 (OUT OF MONEY)';
            balanceEl.style.color = 'var(--neon-red)';
        } else {
            balanceEl.textContent = '$' + billionaireState.balance.toLocaleString();
            balanceEl.style.color = 'var(--neon-blue)';
        }
    }
    // Re-render items to update disabled state of buttons
    renderBillionaireItems(); 
}

function renderInventory() {
    const inventoryContainer = document.getElementById('billionaireInventory');
    if (!inventoryContainer) return;
    
    inventoryContainer.innerHTML = '';
    const purchasedItems = Object.keys(billionaireState.inventory);

    if (purchasedItems.length === 0) {
        inventoryContainer.innerHTML = '<div style="color: var(--text-secondary);">No items purchased yet.</div>';
        return;
    }

    purchasedItems.forEach(key => {
        const quantity = billionaireState.inventory[key];
        if (quantity > 0) {
            const item = billionaireState.items.find(i => i.name.replace(/\s/g, '_') === key);
            if (!item) return;

            const inventoryDiv = document.createElement('div');
            // Inline style matching the neon red/blue aesthetic
            inventoryDiv.style.cssText = 'padding: 0.5rem 1rem; background: var(--bg-dark); border: 1px solid var(--neon-red); border-radius: 5px; color: white; font-size: 1rem; font-weight: bold;';
            inventoryDiv.innerHTML = `${item.name}: <span style="color: var(--neon-blue);">${quantity.toLocaleString()}</span>`;
            inventoryContainer.appendChild(inventoryDiv);
        }
    });
}

function renderBillionaireItems() {
    const container = document.getElementById('billionaireItems');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Sort items to keep similar pricing together, improving visual scanning
    const sortedItems = [...billionaireState.items].sort((a, b) => b.price - a.price);

    sortedItems.forEach(item => {
        const costPerItem = item.price;
        const itemNameKey = item.name.replace(/\s/g, '_'); // Unique key for quantity input

        const div = document.createElement('div');
        div.className = 'item-card';
        // Base card styling
        div.style.cssText = 'background: var(--bg-card); border-radius: 8px; display: flex; flex-direction: column; text-align: center; overflow: hidden; height: 100%;';
        
        // Item Image (Square)
        const imageHtml = item.image ? 
            `<img src="${item.image}" alt="${item.name}">` :
            `<div style="width: 100%; height: 150px; background: #333; display: flex; align-items: center; justify-content: center; color: white; border-radius: 5px; margin-bottom: 10px;">NO IMAGE</div>`;
        
        // Item Info (Name, Price) - Added a wrapper div for padding
        const infoWrapper = document.createElement('div');
        infoWrapper.style.padding = '1rem';
        infoWrapper.style.flexGrow = '1';

        infoWrapper.innerHTML = `
            <div style="margin-bottom: 10px;">
                <div style="color: var(--neon-red); font-weight: bold; font-size: 1.2rem;">${item.name}</div>
                <div style="color: var(--neon-blue); font-size: 1.5rem; font-weight: light;">$${costPerItem.toLocaleString()}</div>
            </div>
        `;
        
        // Quantity Input
        const quantityInputHtml = `
            <div style="margin-bottom: 10px; display: flex; justify-content: center; align-items: center; padding: 0 1rem;">
                <input type="number" id="qty-${itemNameKey}" value="1" min="1" max="1000000" onfocus="this.select()" style="width: 70px; margin-right: 10px;">
                <label for="qty-${itemNameKey}" style="color: var(--text-secondary); margin-right: 10px;">Qty</label>
            </div>
        `;
        
        // Buy Button
        const btn = document.createElement('button');
        btn.className = 'launch-button buy-button'; // Use launch-button class for base styling
        btn.textContent = 'Buy';
        
        // Determine button disabled state
        const maxQuantity = Math.floor(billionaireState.balance / costPerItem);
        const disabled = maxQuantity < 1;
        
        btn.disabled = disabled;
        
        // Attach Buy functionality
        btn.onclick = () => {
            const quantityInput = document.getElementById(`qty-${itemNameKey}`);
            // Safety check for user input quantity
            let quantity = parseInt(quantityInput.value, 10) || 1;
            quantity = Math.max(1, Math.floor(quantity)); 
            quantityInput.value = quantity; // Reset input field value to the validated quantity
            buyItem(item, quantity);
        };
        
        // Assemble the card
        // Use DOMParser to safely inject HTML strings into element children
        const imageEl = new DOMParser().parseFromString(imageHtml, 'text/html').body.firstChild;
        const quantityEl = new DOMParser().parseFromString(quantityInputHtml, 'text/html').body.firstChild;
        
        div.appendChild(imageEl);
        div.appendChild(infoWrapper);
        div.appendChild(quantityEl);
        
        // Add padding to the button container and append the button
        const buttonContainer = document.createElement('div');
        buttonContainer.style.padding = '0 1rem 1rem 1rem';
        buttonContainer.appendChild(btn);
        div.appendChild(buttonContainer);

        container.appendChild(div);
    });
}

// Ensure you have any other required utility functions (like openTool, closeTool, etc.) here too if they are part of your full script.js file.

// ============================================
// TOOL 15: FLAPPY BIRD
// ============================================

function generateFlappy() {
    return `
        <h2 class="modal-title">Flappy Bird</h2>
        <div style="text-align: center; max-width: 500px; margin: 0 auto; padding: 2rem;">
            <canvas id="flappyCanvas" width="400" height="600" style="border: 2px solid var(--neon-blue); border-radius: 5px; background: var(--bg-dark); display: block; margin: 1rem auto;"></canvas>
            <div style="margin: 1rem 0;">
                <div style="color: var(--neon-purple); font-size: 1.5rem;">Score: <span id="flappyScore">0</span></div>
                <div style="color: var(--text-secondary); margin: 1rem 0;">Click or press SPACE to flap</div>
                <button class="reset-button" onclick="resetFlappy()">Restart</button>
            </div>
        </div>
    `;
}

let flappyState = {
    canvas: null,
    ctx: null,
    bird: { x: 100, y: 300, velocity: 0, size: 20 },
    pipes: [],
    score: 0,
    gameOver: false,
    gameLoop: null,
    lastPipe: 0
};

function initFlappy() {
    const canvas = document.getElementById('flappyCanvas');
    if (!canvas) return;
    
    flappyState.canvas = canvas;
    flappyState.ctx = canvas.getContext('2d');
    
    canvas.onclick = flapBird;
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            flapBird();
        }
    });
    
    resetFlappy();
    startFlappyGame();
}

function resetFlappy() {
    flappyState.bird = { x: 100, y: 300, velocity: 0, size: 20 };
    flappyState.pipes = [];
    flappyState.score = 0;
    flappyState.gameOver = false;
    flappyState.lastPipe = 0;
    updateFlappyScore();
}

function flapBird() {
    if (flappyState.gameOver) {
        resetFlappy();
        startFlappyGame();
        return;
    }
    flappyState.bird.velocity = -8;
}

function startFlappyGame() {
    if (flappyState.gameLoop) cancelAnimationFrame(flappyState.gameLoop);
    
    function gameLoop() {
        if (flappyState.gameOver) return;
        
        updateFlappy();
        drawFlappy();
        
        flappyState.gameLoop = requestAnimationFrame(gameLoop);
    }
    
    flappyState.gameLoop = requestAnimationFrame(gameLoop);
    window.activeAnimationFrame = flappyState.gameLoop;
}

function updateFlappy() {
    // Gravity
    flappyState.bird.velocity += 0.5;
    flappyState.bird.y += flappyState.bird.velocity;
    
    // Generate pipes
    if (Date.now() - flappyState.lastPipe > 2000) {
        const gap = 200;
        const topHeight = Math.random() * (flappyState.canvas.height - gap - 100) + 50;
        flappyState.pipes.push({
            x: flappyState.canvas.width,
            topHeight: topHeight,
            bottomY: topHeight + gap
        });
        flappyState.lastPipe = Date.now();
    }
    
    // Update pipes
    flappyState.pipes.forEach((pipe, index) => {
        pipe.x -= 3;
        if (pipe.x < -50) {
            flappyState.pipes.splice(index, 1);
            flappyState.score++;
            updateFlappyScore();
        }
    });
    
    // Collision
    if (flappyState.bird.y < 0 || flappyState.bird.y > flappyState.canvas.height) {
        endFlappyGame();
        return;
    }
    
    flappyState.pipes.forEach(pipe => {
        if (flappyState.bird.x + flappyState.bird.size > pipe.x &&
            flappyState.bird.x < pipe.x + 50) {
            if (flappyState.bird.y < pipe.topHeight || flappyState.bird.y + flappyState.bird.size > pipe.bottomY) {
                endFlappyGame();
            }
        }
    });
}

function drawFlappy() {
    const ctx = flappyState.ctx;
    const canvas = flappyState.canvas;
    
    // Clear
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw bird
    ctx.fillStyle = '#00f2ff';
    ctx.beginPath();
    ctx.arc(flappyState.bird.x, flappyState.bird.y, flappyState.bird.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw pipes
    ctx.fillStyle = '#bd00ff';
    flappyState.pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, 50, pipe.topHeight);
        ctx.fillRect(pipe.x, pipe.bottomY, 50, canvas.height - pipe.bottomY);
    });
}

function endFlappyGame() {
    flappyState.gameOver = true;
    alert(`Game Over! Score: ${flappyState.score}`);
}

function updateFlappyScore() {
    const scoreEl = document.getElementById('flappyScore');
    if (scoreEl) scoreEl.textContent = flappyState.score;
}

// ============================================
// TOOL: TRAFFIC RIDER (Python launcher/info only)
// ============================================

function generateTrafficRider() {
    return `
        <h2 class="modal-title">Traffic Rider</h2>
        <div style="text-align: center; max-width: 600px; margin: 0 auto; padding: 1.5rem; color: var(--text-primary);">
            <p style="color: var(--text-secondary);">This game is a Python project included in the repository. It cannot run inside the browser. To play locally, open the project folder and run the command below.</p>
            <pre style="background: #111; color: #9be7ff; padding: 1rem; border-radius: 6px;">cd "Traffic Rider" && python3 main.py</pre>
            <p style="color: var(--text-secondary); margin-top: 1rem;">Open the game's README for details and assets:</p>
            <p><a href="Traffic Rider/Readme.md" target="_blank" rel="noopener">Open Traffic Rider README</a></p>
            <div style="margin-top: 1rem;">
                <button class="reset-button" onclick="copyRunCommand('cd Traffic Rider && python3 main.py')">Copy Run Command</button>
            </div>
        </div>
    `;
}

function initTrafficRider() {
    // Attach helper copy button functionality
    window.copyRunCommand = function(cmd) {
        try {
            navigator.clipboard.writeText(cmd);
            alert('Run command copied to clipboard');
        } catch (e) {
            // Fallback
            prompt('Copy this command to run the game:', cmd);
        }
    };
}

// ============================================
// TOOL 16: JUMP GAME (DOODLE JUMP STYLE)
// ============================================

function generateJump() {
    return `
        <h2 class="modal-title">Jump Game</h2>
        <div style="text-align: center; max-width: 500px; margin: 0 auto; padding: 2rem;">
            <canvas id="jumpCanvas" width="400" height="600" style="border: 2px solid var(--neon-blue); border-radius: 5px; background: var(--bg-dark); display: block; margin: 1rem auto;"></canvas>
            <div style="margin: 1rem 0;">
                <div style="color: var(--neon-purple); font-size: 1.5rem;">Height: <span id="jumpHeight">0</span>m</div>
                <div style="color: var(--text-secondary); margin: 1rem 0;">Use arrow keys or A/D to move</div>
                <button class="reset-button" onclick="resetJump()">Restart</button>
            </div>
        </div>
    `;
}

let jumpState = {
    canvas: null,
    ctx: null,
    player: { x: 200, y: 500, width: 30, height: 30, velocityY: 0, velocityX: 0 },
    platforms: [],
    cameraY: 0,
    highestY: 0,
    gameLoop: null,
    keys: {}
};

function initJump() {
    const canvas = document.getElementById('jumpCanvas');
    if (!canvas) return;
    
    jumpState.canvas = canvas;
    jumpState.ctx = canvas.getContext('2d');
    
    document.addEventListener('keydown', (e) => {
        jumpState.keys[e.key.toLowerCase()] = true;
    });
    document.addEventListener('keyup', (e) => {
        jumpState.keys[e.key.toLowerCase()] = false;
    });
    
    resetJump();
    startJumpGame();
}

function resetJump() {
    jumpState.player = { x: 200, y: 500, width: 30, height: 30, velocityY: 0, velocityX: 0 };
    jumpState.platforms = [];
    jumpState.cameraY = 0;
    jumpState.highestY = 0;
    jumpState.keys = {};
    
    // Generate initial platforms
    for (let i = 0; i < 20; i++) {
        jumpState.platforms.push({
            x: Math.random() * (jumpState.canvas.width - 80),
            y: 600 - i * 100,
            width: 80,
            height: 10
        });
    }
}

function startJumpGame() {
    if (jumpState.gameLoop) cancelAnimationFrame(jumpState.gameLoop);
    
    function gameLoop() {
        updateJump();
        drawJump();
        
        jumpState.gameLoop = requestAnimationFrame(gameLoop);
    }
    
    jumpState.gameLoop = requestAnimationFrame(gameLoop);
    window.activeAnimationFrame = jumpState.gameLoop;
}

function updateJump() {
    // Movement
    if (jumpState.keys['a'] || jumpState.keys['arrowleft']) {
        jumpState.player.velocityX = -5;
    } else if (jumpState.keys['d'] || jumpState.keys['arrowright']) {
        jumpState.player.velocityX = 5;
    } else {
        jumpState.player.velocityX *= 0.9;
    }
    
    jumpState.player.x += jumpState.player.velocityX;
    
    // Wrap around screen
    if (jumpState.player.x < 0) jumpState.player.x = jumpState.canvas.width;
    if (jumpState.player.x > jumpState.canvas.width) jumpState.player.x = 0;
    
    // Gravity
    jumpState.player.velocityY += 0.5;
    jumpState.player.y += jumpState.player.velocityY;
    
    // Platform collision
    jumpState.platforms.forEach(platform => {
        if (jumpState.player.x < platform.x + platform.width &&
            jumpState.player.x + jumpState.player.width > platform.x &&
            jumpState.player.y < platform.y + platform.height &&
            jumpState.player.y + jumpState.player.height > platform.y &&
            jumpState.player.velocityY > 0) {
            jumpState.player.y = platform.y - jumpState.player.height;
            jumpState.player.velocityY = -15; // Jump
        }
    });
    
    // Camera follows player upward
    if (jumpState.player.y < jumpState.cameraY + 200) {
        jumpState.cameraY = jumpState.player.y - 200;
    }
    
    // Track highest point
    const currentHeight = Math.max(0, 600 - jumpState.player.y);
    if (currentHeight > jumpState.highestY) {
        jumpState.highestY = currentHeight;
        document.getElementById('jumpHeight').textContent = Math.floor(jumpState.highestY);
    }
    
    // Generate new platforms above
    while (jumpState.platforms.length < 20 || jumpState.platforms[jumpState.platforms.length - 1].y > jumpState.cameraY - 200) {
        jumpState.platforms.push({
            x: Math.random() * (jumpState.canvas.width - 80),
            y: jumpState.platforms.length > 0 ? jumpState.platforms[jumpState.platforms.length - 1].y - 100 : jumpState.cameraY - 200,
            width: 80,
            height: 10
        });
    }
    
    // Remove platforms below camera
    jumpState.platforms = jumpState.platforms.filter(p => p.y < jumpState.cameraY + 800);
    
    // Game over if fall too far
    if (jumpState.player.y > jumpState.cameraY + 800) {
        alert(`Game Over! Height: ${Math.floor(jumpState.highestY)}m`);
        resetJump();
    }
}

function drawJump() {
    const ctx = jumpState.ctx;
    const canvas = jumpState.canvas;
    
    // Clear
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(0, -jumpState.cameraY);
    
    // Draw platforms
    ctx.fillStyle = '#bd00ff';
    jumpState.platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
    
    // Draw player
    ctx.fillStyle = '#00f2ff';
    ctx.fillRect(jumpState.player.x, jumpState.player.y, jumpState.player.width, jumpState.player.height);
    
    ctx.restore();
}

// ============================================
// TOOL 17: RONALDO BIRDS
// ============================================

function generateRonaldoBirds() {
    return `
        <h2 class="modal-title">Ronaldo Birds</h2>
        <div style="text-align: center; max-width: 500px; margin: 0 auto; padding: 2rem;">
            <canvas id="ronaldoCanvas" width="400" height="500" style="border: 2px solid var(--neon-blue); border-radius: 5px; background: var(--bg-dark); display: block; margin: 1rem auto;"></canvas>
            <div style="margin: 1rem 0;">
                <div style="color: var(--neon-purple); font-size: 1.5rem;">Score: <span id="ronaldoScore">0</span></div>
                <div style="color: var(--text-secondary); margin: 1rem 0; font-size: 0.9rem;">Press SPACE or click to flap. Made by Naman Mittal</div>
                <button class="reset-button" onclick="resetRonaldoBirds()">Restart</button>
            </div>
        </div>
    `;
}

let ronaldoState = {
    canvas: null,
    ctx: null,
    bird: { x: 67, y: 300, velocity: 0, rotation: 0, size: 40 },
    pipes: [],
    ground: [],
    score: 0,
    gameOver: false,
    gameStarted: false,
    gameLoop: null,
    lastPipe: 0,
    images: {},
    sounds: {},
    passedPipes: new Set(),
    pipeIdCounter: 0,
    GRAVITY: 0.8,
    SPEED: 8,
    GAME_SPEED: 5,
    PIPE_GAP: 150,
    PIPE_WIDTH: 80
};

function initRonaldoBirds() {
    const canvas = document.getElementById('ronaldoCanvas');
    if (!canvas) return;
    
    ronaldoState.canvas = canvas;
    ronaldoState.ctx = canvas.getContext('2d');
    
    // Load images
    loadRonaldoImages();
    
    // Setup controls
    canvas.onclick = flapRonaldoBird;
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Space') {
            e.preventDefault();
            flapRonaldoBird();
        }
    });
    
    // Load sounds
    loadRonaldoSounds();
    
    resetRonaldoBirds();
    startRonaldoGame();
}

function loadRonaldoImages() {
    const images = ronaldoState.images;
    const basePath = 'flappy/assets/sprites/';
    
    // Load background
    images.background = new Image();
    images.background.src = basePath + 'background-day.png';
    
    // Load Ronaldo face (bird)
    images.bird = new Image();
    images.bird.src = basePath + 'ronaldo_face.png';
    images.bird.onerror = () => {
        // Fallback if image doesn't load
        images.bird = null;
    };
    
    // Load pipes
    images.pipe = new Image();
    images.pipe.src = basePath + 'pipe-green.png';
    
    // Load ground
    images.ground = new Image();
    images.ground.src = basePath + 'base.png';
    
    // Load start message
    images.message = new Image();
    images.message.src = basePath + 'message.png';
}

function loadRonaldoSounds() {
    const sounds = ronaldoState.sounds;
    const basePath = 'flappy/assets/audio/';
    
    // Load wing sound
    sounds.wing = new Audio(basePath + 'wing.wav');
    sounds.wing.volume = 0.3;
    
    // Load hit sound
    sounds.hit = new Audio(basePath + 'hit.wav');
    sounds.hit.volume = 0.3;
    
    // Load suiii sound
    sounds.suiii = new Audio(basePath + 'suiii.wav');
    sounds.suiii.volume = 0.5;
}

function resetRonaldoBirds() {
    ronaldoState.bird = { x: 67, y: 300, velocity: 0, rotation: 0, size: 40 };
    ronaldoState.pipes = [];
    ronaldoState.ground = [];
    ronaldoState.score = 0;
    ronaldoState.gameOver = false;
    ronaldoState.gameStarted = false;
    ronaldoState.lastPipe = 0;
    ronaldoState.passedPipes = new Set();
    ronaldoState.pipeIdCounter = 0;
    
    // Initialize ground
    for (let i = 0; i < 2; i++) {
        ronaldoState.ground.push({
            x: i * 800,
            width: 800,
            height: 100
        });
    }
    
    // Initialize pipes
    for (let i = 0; i < 2; i++) {
        addRonaldoPipe(400 * i + 800);
    }
    
    updateRonaldoScore();
}

function addRonaldoPipe(xpos) {
    const size = Math.random() * 200 + 100; // Random size between 100-300
    ronaldoState.pipeIdCounter++;
    
    const pipeTop = {
        x: xpos,
        y: 0,
        width: ronaldoState.PIPE_WIDTH,
        height: size,
        id: ronaldoState.pipeIdCounter,
        inverted: true
    };
    
    const pipeBottom = {
        x: xpos,
        y: size + ronaldoState.PIPE_GAP,
        width: ronaldoState.PIPE_WIDTH,
        height: 600 - (size + ronaldoState.PIPE_GAP),
        id: ronaldoState.pipeIdCounter,
        inverted: false
    };
    
    ronaldoState.pipes.push(pipeTop, pipeBottom);
}

function flapRonaldoBird() {
    if (ronaldoState.gameOver) {
        resetRonaldoBirds();
        startRonaldoGame();
        return;
    }
    
    if (!ronaldoState.gameStarted) {
        ronaldoState.gameStarted = true;
        if (ronaldoState.sounds.wing) {
            ronaldoState.sounds.wing.play().catch(() => {});
        }
    }
    
    ronaldoState.bird.velocity = -ronaldoState.SPEED;
    if (ronaldoState.sounds.wing) {
        ronaldoState.sounds.wing.play().catch(() => {});
    }
}

function startRonaldoGame() {
    if (ronaldoState.gameLoop) cancelAnimationFrame(ronaldoState.gameLoop);
    
    function gameLoop() {
        updateRonaldoBirds();
        drawRonaldoBirds();
        
        ronaldoState.gameLoop = requestAnimationFrame(gameLoop);
    }
    
    ronaldoState.gameLoop = requestAnimationFrame(gameLoop);
    window.activeAnimationFrame = ronaldoState.gameLoop;
}

function updateRonaldoBirds() {
    if (ronaldoState.gameOver || !ronaldoState.gameStarted) return;
    
    // Apply gravity
    ronaldoState.bird.velocity += ronaldoState.GRAVITY;
    ronaldoState.bird.y += ronaldoState.bird.velocity;
    
    // Update rotation based on velocity
    ronaldoState.bird.rotation = Math.min(Math.max(ronaldoState.bird.velocity * 2, -15), 15);
    
    // Update ground
    ronaldoState.ground.forEach(ground => {
        ground.x -= ronaldoState.GAME_SPEED;
        if (ground.x <= -800) {
            ground.x = 800 - ronaldoState.GAME_SPEED;
        }
    });
    
    // Update pipes
    ronaldoState.pipes.forEach((pipe, index) => {
        pipe.x -= ronaldoState.GAME_SPEED;
        
        // Remove off-screen pipes
        if (pipe.x < -ronaldoState.PIPE_WIDTH) {
            ronaldoState.pipes.splice(index, 1);
            // If this was a top pipe, add a new pair
            if (pipe.inverted && ronaldoState.pipes.length < 4) {
                addRonaldoPipe(400 * 2);
            }
        }
        
        // Check scoring (only check top pipes to avoid double counting)
        if (pipe.inverted && ronaldoState.bird.x > pipe.x + ronaldoState.PIPE_WIDTH && 
            !ronaldoState.passedPipes.has(pipe.id)) {
            ronaldoState.score++;
            ronaldoState.passedPipes.add(pipe.id);
            updateRonaldoScore();
            
            // Play suiii sound
            if (ronaldoState.sounds.suiii) {
                ronaldoState.sounds.suiii.play().catch(() => {});
            }
            
            // Win condition
            if (ronaldoState.score >= 5000) {
                endRonaldoGame(true);
                return;
            }
        }
    });
    
    // Check collisions
    checkRonaldoCollisions();
}

function checkRonaldoCollisions() {
    const bird = ronaldoState.bird;
    const canvas = ronaldoState.canvas;
    
    // Ground collision
    if (bird.y + bird.size / 2 >= canvas.height - 100) {
        endRonaldoGame(false);
        return;
    }
    
    // Ceiling collision
    if (bird.y - bird.size / 2 <= 0) {
        endRonaldoGame(false);
        return;
    }
    
    // Pipe collisions
    ronaldoState.pipes.forEach(pipe => {
        if (bird.x + bird.size / 2 > pipe.x &&
            bird.x - bird.size / 2 < pipe.x + pipe.width &&
            bird.y - bird.size / 2 < pipe.y + pipe.height &&
            bird.y + bird.size / 2 > pipe.y) {
            endRonaldoGame(false);
        }
    });
}

function drawRonaldoBirds() {
    const ctx = ronaldoState.ctx;
    const canvas = ronaldoState.canvas;
    
    // Clear canvas
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    if (ronaldoState.images.background && ronaldoState.images.background.complete) {
        ctx.drawImage(ronaldoState.images.background, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#4ec0ca';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Draw pipes
    if (ronaldoState.images.pipe && ronaldoState.images.pipe.complete) {
        ronaldoState.pipes.forEach(pipe => {
            if (pipe.inverted) {
                ctx.save();
                ctx.translate(pipe.x + pipe.width / 2, pipe.y + pipe.height);
                ctx.scale(1, -1);
                ctx.drawImage(ronaldoState.images.pipe, -pipe.width / 2, 0, pipe.width, pipe.height);
                ctx.restore();
            } else {
                ctx.drawImage(ronaldoState.images.pipe, pipe.x, pipe.y, pipe.width, pipe.height);
            }
        });
    } else {
        // Fallback: draw rectangles
        ctx.fillStyle = '#34c924';
        ronaldoState.pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
        });
    }
    
    // Draw ground
    if (ronaldoState.images.ground && ronaldoState.images.ground.complete) {
        ronaldoState.ground.forEach(ground => {
            ctx.drawImage(ronaldoState.images.ground, ground.x, canvas.height - ground.height, ground.width, ground.height);
        });
    } else {
        ctx.fillStyle = '#deb887';
        ronaldoState.ground.forEach(ground => {
            ctx.fillRect(ground.x, canvas.height - ground.height, ground.width, ground.height);
        });
    }
    
    // Draw start message
    if (!ronaldoState.gameStarted && ronaldoState.images.message && ronaldoState.images.message.complete) {
        ctx.drawImage(ronaldoState.images.message, 120, 150);
    }
    
    // Draw bird (Ronaldo)
    ctx.save();
    ctx.translate(ronaldoState.bird.x, ronaldoState.bird.y);
    ctx.rotate((ronaldoState.bird.rotation * Math.PI) / 180);
    
    if (ronaldoState.images.bird && ronaldoState.images.bird.complete) {
        ctx.drawImage(ronaldoState.images.bird, -ronaldoState.bird.size / 2, -ronaldoState.bird.size / 2, 
                     ronaldoState.bird.size, ronaldoState.bird.size);
    } else {
        // Fallback: draw circle
        ctx.fillStyle = '#ffdf00';
        ctx.beginPath();
        ctx.arc(0, 0, ronaldoState.bird.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
    
    // Draw score
    ctx.fillStyle = '#ffffff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(ronaldoState.score.toString(), canvas.width / 2, 50);
    
    // Draw credit
    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText('Made by Naman Mittal', canvas.width / 2, canvas.height - 50);
    
    // Draw game over message
    if (ronaldoState.gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = ronaldoState.score >= 5000 ? '#0000ff' : '#ff0000';
        ctx.font = 'bold 36px Arial';
        const endText = ronaldoState.score >= 5000 
            ? `CR7 WINS! Score: 5000+` 
            : `GAME OVER! Score: ${ronaldoState.score}`;
        ctx.fillText(endText, canvas.width / 2, canvas.height / 2);
    }
}

function endRonaldoGame(won) {
    ronaldoState.gameOver = true;
    if (ronaldoState.sounds.hit && !won) {
        ronaldoState.sounds.hit.play().catch(() => {});
    }
}

function updateRonaldoScore() {
    const scoreEl = document.getElementById('ronaldoScore');
    if (scoreEl) {
        scoreEl.textContent = ronaldoState.score;
    }
}

// ============================================
// TOOL 18: BATTLESHIP
// ============================================

function generateBattleship() {
    return `
        <h2 class="modal-title">Battleship</h2>
        <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
            <div style="text-align: center; margin-bottom: 1rem;">
                <div style="color: var(--neon-blue); font-size: 1.2rem; margin-bottom: 0.5rem;">
                    Shots: <span id="battleshipShots">0</span> | 
                    Hits: <span id="battleshipHits">0</span>/<span id="battleshipTotalHits">17</span>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                    Click on a cell to fire! Ships: Carrier(5), Battleship(4), Cruiser(3), Submarine(3), Destroyer(2)
                </div>
            </div>
            <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
                <div id="battleshipBoard" style="display: grid; grid-template-columns: repeat(11, 1fr); gap: 2px; background: var(--bg-dark); padding: 10px; border-radius: 5px;"></div>
            </div>
            <div style="text-align: center;">
                <button class="reset-button" onclick="resetBattleship()">New Game</button>
                <button class="reset-button" onclick="showBattleshipShips()" id="battleshipCheatBtn" style="margin-left: 0.5rem;">Show Ships (Cheat)</button>
            </div>
            <div id="battleshipMessage" style="text-align: center; margin-top: 1rem; color: var(--neon-purple); font-size: 1.1rem; min-height: 30px;"></div>
        </div>
    `;
}

let battleshipState = {
    board: [],
    boardSize: 10,
    shipSizes: [5, 4, 3, 3, 2],
    shipNames: ['Carrier', 'Battleship', 'Cruiser', 'Submarine', 'Destroyer'],
    hits: 0,
    totalHitsNeeded: 17,
    shots: 0,
    gameOver: false,
    showShips: false,
    WATER: '~',
    SHIP: 'S',
    HIT: 'X',
    MISS: 'O'
};

function initBattleship() {
    resetBattleship();
}

function resetBattleship() {
    battleshipState.board = [];
    battleshipState.hits = 0;
    battleshipState.shots = 0;
    battleshipState.gameOver = false;
    battleshipState.showShips = false;
    battleshipState.totalHitsNeeded = battleshipState.shipSizes.reduce((a, b) => a + b, 0);
    
    // Initialize empty board
    for (let i = 0; i < battleshipState.boardSize; i++) {
        battleshipState.board[i] = [];
        for (let j = 0; j < battleshipState.boardSize; j++) {
            battleshipState.board[i][j] = battleshipState.WATER;
        }
    }
    
    // Place ships randomly
    placeBattleshipShips();
    
    // Update display
    updateBattleshipDisplay();
    renderBattleshipBoard();
    
    const messageEl = document.getElementById('battleshipMessage');
    if (messageEl) {
        messageEl.textContent = 'Click on a cell to fire!';
    }
}

function placeBattleshipShips() {
    for (let size of battleshipState.shipSizes) {
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < 100) {
            const row = Math.floor(Math.random() * battleshipState.boardSize);
            const col = Math.floor(Math.random() * battleshipState.boardSize);
            const horizontal = Math.random() < 0.5;
            
            if (isValidBattleshipPlacement(row, col, size, horizontal)) {
                placeBattleshipShip(row, col, size, horizontal);
                placed = true;
            }
            attempts++;
        }
    }
}

function isValidBattleshipPlacement(row, col, size, horizontal) {
    if (horizontal) {
        if (col + size > battleshipState.boardSize) return false;
        for (let j = col; j < col + size; j++) {
            if (battleshipState.board[row][j] !== battleshipState.WATER) {
                return false;
            }
        }
    } else {
        if (row + size > battleshipState.boardSize) return false;
        for (let i = row; i < row + size; i++) {
            if (battleshipState.board[i][col] !== battleshipState.WATER) {
                return false;
            }
        }
    }
    return true;
}

function placeBattleshipShip(row, col, size, horizontal) {
    if (horizontal) {
        for (let j = col; j < col + size; j++) {
            battleshipState.board[row][j] = battleshipState.SHIP;
        }
    } else {
        for (let i = row; i < row + size; i++) {
            battleshipState.board[i][col] = battleshipState.SHIP;
        }
    }
}

function renderBattleshipBoard() {
    const boardEl = document.getElementById('battleshipBoard');
    if (!boardEl) return;
    
    boardEl.innerHTML = '';
    
    // Column headers
    const headerRow = document.createElement('div');
    headerRow.style.cssText = 'grid-column: 1; font-weight: bold; color: var(--neon-blue); display: flex; align-items: center; justify-content: center;';
    headerRow.textContent = '';
    boardEl.appendChild(headerRow);
    
    for (let j = 0; j < battleshipState.boardSize; j++) {
        const header = document.createElement('div');
        header.style.cssText = 'font-weight: bold; color: var(--neon-blue); display: flex; align-items: center; justify-content: center; padding: 5px;';
        header.textContent = String.fromCharCode(65 + j);
        boardEl.appendChild(header);
    }
    
    // Board cells
    for (let i = 0; i < battleshipState.boardSize; i++) {
        // Row header
        const rowHeader = document.createElement('div');
        rowHeader.style.cssText = 'font-weight: bold; color: var(--neon-blue); display: flex; align-items: center; justify-content: center; padding: 5px;';
        rowHeader.textContent = i;
        boardEl.appendChild(rowHeader);
        
        // Cells
        for (let j = 0; j < battleshipState.boardSize; j++) {
            const cell = document.createElement('div');
            const cellValue = battleshipState.board[i][j];
            
            cell.style.cssText = `
                width: 35px;
                height: 35px;
                border: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
                font-weight: bold;
                font-size: 1.2rem;
            `;
            
            // Set cell appearance based on state
            if (cellValue === battleshipState.HIT) {
                cell.style.backgroundColor = '#ff0000';
                cell.style.color = '#ffffff';
                cell.textContent = 'X';
                cell.style.cursor = 'not-allowed';
            } else if (cellValue === battleshipState.MISS) {
                cell.style.backgroundColor = '#0066cc';
                cell.style.color = '#ffffff';
                cell.textContent = 'O';
                cell.style.cursor = 'not-allowed';
            } else if (cellValue === battleshipState.SHIP && battleshipState.showShips) {
                cell.style.backgroundColor = '#00ff00';
                cell.style.color = '#000000';
                cell.textContent = 'S';
            } else {
                cell.style.backgroundColor = '#1a1a2e';
                cell.style.color = '#00f2ff';
                cell.textContent = '~';
            }
            
            // Add click handler if not already hit/miss
            if (cellValue !== battleshipState.HIT && cellValue !== battleshipState.MISS) {
                cell.onclick = () => fireBattleshipShot(i, j);
                cell.onmouseenter = () => {
                    if (!battleshipState.gameOver && cellValue !== battleshipState.HIT && cellValue !== battleshipState.MISS) {
                        cell.style.backgroundColor = '#2a2a4e';
                        cell.style.transform = 'scale(1.1)';
                    }
                };
                cell.onmouseleave = () => {
                    if (cellValue === battleshipState.WATER || (cellValue === battleshipState.SHIP && !battleshipState.showShips)) {
                        cell.style.backgroundColor = '#1a1a2e';
                        cell.style.transform = 'scale(1)';
                    }
                };
            }
            
            boardEl.appendChild(cell);
        }
    }
}

function fireBattleshipShot(row, col) {
    if (battleshipState.gameOver) {
        return;
    }
    
    const cellValue = battleshipState.board[row][col];
    
    if (cellValue === battleshipState.HIT || cellValue === battleshipState.MISS) {
        return; // Already fired here
    }
    
    battleshipState.shots++;
    
    if (cellValue === battleshipState.SHIP) {
        battleshipState.board[row][col] = battleshipState.HIT;
        battleshipState.hits++;
        
        const messageEl = document.getElementById('battleshipMessage');
        if (messageEl) {
            messageEl.textContent = '💥 HIT!';
            messageEl.style.color = '#ff0000';
        }
        
        if (battleshipState.hits >= battleshipState.totalHitsNeeded) {
            battleshipState.gameOver = true;
            if (messageEl) {
                messageEl.textContent = '🎉 CONGRATULATIONS! You sunk all ships! You win!';
                messageEl.style.color = '#00ff00';
            }
        }
    } else {
        battleshipState.board[row][col] = battleshipState.MISS;
        const messageEl = document.getElementById('battleshipMessage');
        if (messageEl) {
            messageEl.textContent = '💧 MISS!';
            messageEl.style.color = '#0066cc';
        }
    }
    
    updateBattleshipDisplay();
    renderBattleshipBoard();
}

function showBattleshipShips() {
    battleshipState.showShips = !battleshipState.showShips;
    const btn = document.getElementById('battleshipCheatBtn');
    if (btn) {
        btn.textContent = battleshipState.showShips ? 'Hide Ships' : 'Show Ships (Cheat)';
    }
    renderBattleshipBoard();
}

function updateBattleshipDisplay() {
    const shotsEl = document.getElementById('battleshipShots');
    const hitsEl = document.getElementById('battleshipHits');
    const totalHitsEl = document.getElementById('battleshipTotalHits');
    
    if (shotsEl) shotsEl.textContent = battleshipState.shots;
    if (hitsEl) hitsEl.textContent = battleshipState.hits;
    if (totalHitsEl) totalHitsEl.textContent = battleshipState.totalHitsNeeded;
}

// ============================================
// TOOL 19: 2048 GAME
// ============================================

function generate2048() {
    return `
        <h2 class="modal-title">2048</h2>
        <div style="max-width: 500px; margin: 0 auto; padding: 2rem;">
            <div style="text-align: center; margin-bottom: 1rem;">
                <div style="color: var(--neon-blue); font-size: 1.5rem; margin-bottom: 0.5rem;">
                    Score: <span id="score2048">0</span>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                    Use arrow keys or WASD to move. Combine tiles to reach 2048!
                </div>
            </div>
            <div id="board2048" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: var(--bg-dark); padding: 15px; border-radius: 10px; max-width: 400px; margin: 0 auto;"></div>
            <div style="text-align: center; margin-top: 1rem;">
                <button class="reset-button" onclick="reset2048()">New Game</button>
            </div>
            <div id="message2048" style="text-align: center; margin-top: 1rem; color: var(--neon-purple); font-size: 1.1rem; min-height: 30px;"></div>
        </div>
    `;
}

let game2048State = {
    board: [],
    score: 0,
    won: false,
    gameOver: false
};

function init2048() {
    reset2048();
    document.addEventListener('keydown', handle2048Key);
}

function reset2048() {
    game2048State.board = Array(4).fill(null).map(() => Array(4).fill(0));
    game2048State.score = 0;
    game2048State.won = false;
    game2048State.gameOver = false;
    addRandomTile2048();
    addRandomTile2048();
    render2048();
    update2048Score();
}

function addRandomTile2048() {
    const empty = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (game2048State.board[i][j] === 0) {
                empty.push([i, j]);
            }
        }
    }
    if (empty.length > 0) {
        const [i, j] = empty[Math.floor(Math.random() * empty.length)];
        game2048State.board[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
}

function move2048(direction) {
    let moved = false;
    const oldBoard = game2048State.board.map(row => [...row]);
    
    if (direction === 'left') {
        for (let i = 0; i < 4; i++) {
            const row = game2048State.board[i].filter(x => x !== 0);
            const merged = [];
            for (let j = 0; j < row.length; j++) {
                if (j < row.length - 1 && row[j] === row[j + 1]) {
                    merged.push(row[j] * 2);
                    game2048State.score += row[j] * 2;
                    if (row[j] * 2 === 2048) game2048State.won = true;
                    j++;
                } else {
                    merged.push(row[j]);
                }
            }
            while (merged.length < 4) merged.push(0);
            game2048State.board[i] = merged;
        }
    } else if (direction === 'right') {
        for (let i = 0; i < 4; i++) {
            const row = game2048State.board[i].filter(x => x !== 0);
            const merged = [];
            for (let j = row.length - 1; j >= 0; j--) {
                if (j > 0 && row[j] === row[j - 1]) {
                    merged.unshift(row[j] * 2);
                    game2048State.score += row[j] * 2;
                    if (row[j] * 2 === 2048) game2048State.won = true;
                    j--;
                } else {
                    merged.unshift(row[j]);
                }
            }
            while (merged.length < 4) merged.unshift(0);
            game2048State.board[i] = merged;
        }
    } else if (direction === 'up') {
        for (let j = 0; j < 4; j++) {
            const col = [];
            for (let i = 0; i < 4; i++) {
                if (game2048State.board[i][j] !== 0) col.push(game2048State.board[i][j]);
            }
            const merged = [];
            for (let i = 0; i < col.length; i++) {
                if (i < col.length - 1 && col[i] === col[i + 1]) {
                    merged.push(col[i] * 2);
                    game2048State.score += col[i] * 2;
                    if (col[i] * 2 === 2048) game2048State.won = true;
                    i++;
                } else {
                    merged.push(col[i]);
                }
            }
            while (merged.length < 4) merged.push(0);
            for (let i = 0; i < 4; i++) {
                game2048State.board[i][j] = merged[i];
            }
        }
    } else if (direction === 'down') {
        for (let j = 0; j < 4; j++) {
            const col = [];
            for (let i = 0; i < 4; i++) {
                if (game2048State.board[i][j] !== 0) col.push(game2048State.board[i][j]);
            }
            const merged = [];
            for (let i = col.length - 1; i >= 0; i--) {
                if (i > 0 && col[i] === col[i - 1]) {
                    merged.unshift(col[i] * 2);
                    game2048State.score += col[i] * 2;
                    if (col[i] * 2 === 2048) game2048State.won = true;
                    i--;
                } else {
                    merged.unshift(col[i]);
                }
            }
            while (merged.length < 4) merged.unshift(0);
            for (let i = 0; i < 4; i++) {
                game2048State.board[i][j] = merged[i];
            }
        }
    }
    
    // Check if moved
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (oldBoard[i][j] !== game2048State.board[i][j]) {
                moved = true;
                break;
            }
        }
    }
    
    if (moved) {
        addRandomTile2048();
        if (!canMove2048()) {
            game2048State.gameOver = true;
        }
        render2048();
        update2048Score();
    }
}

function canMove2048() {
    // Check for empty cells
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (game2048State.board[i][j] === 0) return true;
        }
    }
    // Check for possible merges
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const val = game2048State.board[i][j];
            if ((j < 3 && game2048State.board[i][j + 1] === val) ||
                (i < 3 && game2048State.board[i + 1][j] === val)) {
                return true;
            }
        }
    }
    return false;
}

function handle2048Key(e) {
    if (game2048State.gameOver) return;
    
    const key = e.key.toLowerCase();
    if (key === 'arrowup' || key === 'w') {
        e.preventDefault();
        move2048('up');
    } else if (key === 'arrowdown' || key === 's') {
        e.preventDefault();
        move2048('down');
    } else if (key === 'arrowleft' || key === 'a') {
        e.preventDefault();
        move2048('left');
    } else if (key === 'arrowright' || key === 'd') {
        e.preventDefault();
        move2048('right');
    }
}

function render2048() {
    const boardEl = document.getElementById('board2048');
    if (!boardEl) return;
    
    boardEl.innerHTML = '';
    
    const colors = {
        0: '#1a1a2e', 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179',
        16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72',
        256: '#edcc61', 512: '#edc850', 1024: '#edc53f', 2048: '#edc22e'
    };
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            const value = game2048State.board[i][j];
            cell.style.cssText = `
                width: 80px;
                height: 80px;
                background: ${colors[value] || '#3c3a32'};
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: ${value >= 1000 ? '1.5rem' : '2rem'};
                font-weight: bold;
                color: ${value <= 4 ? '#776e65' : '#f9f6f2'};
            `;
            cell.textContent = value === 0 ? '' : value;
            boardEl.appendChild(cell);
        }
    }
    
    const messageEl = document.getElementById('message2048');
    if (messageEl) {
        if (game2048State.won) {
            messageEl.textContent = '🎉 Congratulations! You reached 2048!';
            messageEl.style.color = '#00ff00';
        } else if (game2048State.gameOver) {
            messageEl.textContent = '💀 Game Over! No more moves available.';
            messageEl.style.color = '#ff0000';
        } else {
            messageEl.textContent = '';
        }
    }
}

function update2048Score() {
    const scoreEl = document.getElementById('score2048');
    if (scoreEl) {
        scoreEl.textContent = game2048State.score;
    }
}

// ============================================
// TOOL 20: HANGMAN
// ============================================

function generateHangman() {
    return `
        <h2 class="modal-title">Hangman</h2>
        <div style="max-width: 600px; margin: 0 auto; padding: 2rem;">
            <div style="text-align: center; margin-bottom: 1rem;">
                <select id="hangmanDifficulty" style="padding: 0.5rem; background: var(--bg-dark); border: 2px solid var(--neon-blue); color: var(--neon-blue); border-radius: 5px; margin-bottom: 1rem;">
                    <option value="easy">Easy</option>
                    <option value="medium" selected>Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <div style="color: var(--neon-blue); font-size: 1.2rem; margin-bottom: 0.5rem;">
                    Tries Left: <span id="hangmanTries">10</span>
                </div>
            </div>
            <div style="display: flex; gap: 2rem; justify-content: center; margin-bottom: 1rem;">
                <div id="hangmanArt" style="font-family: monospace; font-size: 0.9rem; color: var(--neon-purple); white-space: pre;"></div>
                <div style="flex: 1;">
                    <div id="hangmanWord" style="font-size: 2rem; letter-spacing: 0.5rem; color: var(--neon-blue); margin-bottom: 1rem; text-align: center; font-weight: bold;"></div>
                    <div id="hangmanWrong" style="color: var(--text-secondary); margin-bottom: 1rem; text-align: center;"></div>
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; max-width: 400px; margin: 0 auto;">
                        ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => 
                            `<button class="hangman-letter" data-letter="${letter}" onclick="guessHangmanLetter('${letter}')" style="padding: 0.5rem; background: var(--bg-card); border: 1px solid var(--border-color); color: var(--neon-blue); border-radius: 3px; cursor: pointer;">${letter}</button>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 1rem;">
                <button class="reset-button" onclick="resetHangman()">New Game</button>
            </div>
            <div id="hangmanMessage" style="text-align: center; margin-top: 1rem; color: var(--neon-purple); font-size: 1.1rem; min-height: 30px;"></div>
        </div>
    `;
}

const HANGMAN_WORDS = {
    easy: ['CAT', 'DOG', 'SUN', 'MOON', 'STAR', 'TREE', 'BOOK', 'BALL', 'FISH', 'BIRD'],
    medium: ['PYTHON', 'COMPUTER', 'KEYBOARD', 'MONITOR', 'INTERNET', 'WEBSITE', 'BROWSER', 'PROGRAM', 'FUNCTION', 'VARIABLE'],
    hard: ['ALGORITHM', 'RECURSION', 'ITERATION', 'ABSTRACTION', 'ENCAPSULATION', 'POLYMORPHISM', 'INHERITANCE', 'OPTIMIZATION', 'DEBUGGING', 'REFACTORING']
};

const HANGMAN_ART_STAGES = [
    '     \n     \n     \n     \n     \n     \n',
    '     \n     \n     \n     \n     \n=====\n',
    '     \n  |  \n  |  \n  |  \n  |  \n=====\n',
    '+---+\n  |  \n  |  \n  |  \n  |  \n=====\n',
    '+---+\n|   |\n  |  \n  |  \n  |  \n=====\n',
    '+---+\n|   |\n|   O\n  |  \n  |  \n=====\n',
    '+---+\n|   |\n|   O\n|   |\n  |  \n=====\n',
    '+---+\n|   |\n|   O\n|  /|\n  |  \n=====\n',
    '+---+\n|   |\n|   O\n|  /|\\\n  |  \n=====\n',
    '+---+\n|   |\n|   O\n|  /|\\\n|  / \n=====\n',
    '+---+\n|   |\n|   O\n|  /|\\\n|  / \\\n=====\n'
];

let hangmanState = {
    secretWord: '',
    displayWord: [],
    guessedLetters: new Set(),
    wrongGuesses: [],
    maxTries: 10,
    triesLeft: 10,
    gameOver: false,
    won: false,
    difficulty: 'medium'
};

function initHangman() {
    resetHangman();
}

function resetHangman() {
    const difficulty = document.getElementById('hangmanDifficulty')?.value || 'medium';
    const words = HANGMAN_WORDS[difficulty];
    hangmanState.secretWord = words[Math.floor(Math.random() * words.length)];
    hangmanState.displayWord = Array(hangmanState.secretWord.length).fill('_');
    hangmanState.guessedLetters = new Set();
    hangmanState.wrongGuesses = [];
    hangmanState.maxTries = 10;
    hangmanState.triesLeft = 10;
    hangmanState.gameOver = false;
    hangmanState.won = false;
    hangmanState.difficulty = difficulty;
    
    // Reset all letter buttons
    document.querySelectorAll('.hangman-letter').forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
    });
    
    renderHangman();
}

function guessHangmanLetter(letter) {
    if (hangmanState.gameOver || hangmanState.guessedLetters.has(letter)) return;
    
    hangmanState.guessedLetters.add(letter);
    const btn = document.querySelector(`[data-letter="${letter}"]`);
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
    }
    
    if (hangmanState.secretWord.includes(letter)) {
        for (let i = 0; i < hangmanState.secretWord.length; i++) {
            if (hangmanState.secretWord[i] === letter) {
                hangmanState.displayWord[i] = letter;
            }
        }
        
        if (!hangmanState.displayWord.includes('_')) {
            hangmanState.won = true;
            hangmanState.gameOver = true;
        }
    } else {
        hangmanState.wrongGuesses.push(letter);
        hangmanState.triesLeft--;
        
        if (hangmanState.triesLeft <= 0) {
            hangmanState.gameOver = true;
        }
    }
    
    renderHangman();
}

function renderHangman() {
    const wordEl = document.getElementById('hangmanWord');
    const artEl = document.getElementById('hangmanArt');
    const wrongEl = document.getElementById('hangmanWrong');
    const triesEl = document.getElementById('hangmanTries');
    const messageEl = document.getElementById('hangmanMessage');
    
    if (wordEl) wordEl.textContent = hangmanState.displayWord.join(' ');
    if (artEl) artEl.textContent = HANGMAN_ART_STAGES[10 - hangmanState.triesLeft];
    if (wrongEl) {
        wrongEl.textContent = hangmanState.wrongGuesses.length > 0 
            ? `Wrong: ${hangmanState.wrongGuesses.join(', ')}` 
            : '';
    }
    if (triesEl) triesEl.textContent = hangmanState.triesLeft;
    
    if (messageEl) {
        if (hangmanState.won) {
            messageEl.textContent = '🎉 Congratulations! You guessed the word!';
            messageEl.style.color = '#00ff00';
        } else if (hangmanState.gameOver) {
            messageEl.textContent = `💀 Game Over! The word was: ${hangmanState.secretWord}`;
            messageEl.style.color = '#ff0000';
        } else {
            messageEl.textContent = '';
        }
    }
}

// ============================================
// TOOL 21: TETRIS
// ============================================

function generateTetris() {
    return `
        <h2 class="modal-title">Tetris</h2>
        <div style="max-width: 600px; margin: 0 auto; padding: 2rem;">
            <div style="text-align: center; margin-bottom: 1rem;">
                <div style="color: var(--neon-blue); font-size: 1.2rem; margin-bottom: 0.5rem;">
                    Score: <span id="tetrisScore">0</span> | 
                    Lines: <span id="tetrisLines">0</span> | 
                    Level: <span id="tetrisLevel">1</span>
                </div>
                <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
                    Use A/D (left/right), S (down), W (rotate)
                </div>
            </div>
            <div style="display: flex; justify-content: center; gap: 2rem;">
                <canvas id="tetrisCanvas" width="200" height="400" style="border: 2px solid var(--neon-blue); border-radius: 5px; background: var(--bg-dark);"></canvas>
            </div>
            <div style="text-align: center; margin-top: 1rem;">
                <button class="reset-button" onclick="resetTetris()">New Game</button>
            </div>
            <div id="tetrisMessage" style="text-align: center; margin-top: 1rem; color: var(--neon-purple); font-size: 1.1rem; min-height: 30px;"></div>
        </div>
    `;
}

const TETRIS_SHAPES = {
    I: [[1,1,1,1]],
    J: [[1,0,0],[1,1,1]],
    L: [[0,0,1],[1,1,1]],
    O: [[1,1],[1,1]],
    S: [[0,1,1],[1,1,0]],
    T: [[0,1,0],[1,1,1]],
    Z: [[1,1,0],[0,1,1]]
};

let tetrisState = {
    canvas: null,
    ctx: null,
    board: [],
    boardWidth: 10,
    boardHeight: 20,
    currentPiece: null,
    currentX: 0,
    currentY: 0,
    currentShape: null,
    score: 0,
    lines: 0,
    level: 1,
    gameOver: false,
    fallTime: 0,
    fallSpeed: 500,
    lastTime: 0
};

function initTetris() {
    const canvas = document.getElementById('tetrisCanvas');
    if (!canvas) return;
    
    tetrisState.canvas = canvas;
    tetrisState.ctx = canvas.getContext('2d');
    
    document.addEventListener('keydown', handleTetrisKey);
    
    resetTetris();
    gameLoopTetris();
}

function resetTetris() {
    tetrisState.board = Array(tetrisState.boardHeight).fill(null).map(() => Array(tetrisState.boardWidth).fill(0));
    tetrisState.score = 0;
    tetrisState.lines = 0;
    tetrisState.level = 1;
    tetrisState.gameOver = false;
    tetrisState.fallSpeed = 500;
    tetrisState.lastTime = performance.now();
    
    spawnTetrisPiece();
    renderTetris();
    updateTetrisDisplay();
}

function spawnTetrisPiece() {
    const shapes = Object.keys(TETRIS_SHAPES);
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    tetrisState.currentPiece = shapeType;
    tetrisState.currentShape = TETRIS_SHAPES[shapeType].map(row => [...row]);
    tetrisState.currentX = Math.floor(tetrisState.boardWidth / 2) - Math.floor(tetrisState.currentShape[0].length / 2);
    tetrisState.currentY = 0;
    
    if (checkTetrisCollision()) {
        tetrisState.gameOver = true;
    }
}

function checkTetrisCollision(dx = 0, dy = 0, shape = null) {
    const shapeToCheck = shape || tetrisState.currentShape;
    const newX = tetrisState.currentX + dx;
    const newY = tetrisState.currentY + dy;
    
    for (let i = 0; i < shapeToCheck.length; i++) {
        for (let j = 0; j < shapeToCheck[i].length; j++) {
            if (shapeToCheck[i][j]) {
                const boardY = newY + i;
                const boardX = newX + j;
                
                if (boardX < 0 || boardX >= tetrisState.boardWidth || boardY >= tetrisState.boardHeight) {
                    return true;
                }
                if (boardY >= 0 && tetrisState.board[boardY][boardX]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function rotateTetrisPiece() {
    if (!tetrisState.currentShape) return;
    
    const rotated = tetrisState.currentShape[0].map((_, i) =>
        tetrisState.currentShape.map(row => row[i]).reverse()
    );
    
    if (!checkTetrisCollision(0, 0, rotated)) {
        tetrisState.currentShape = rotated;
    }
}

function moveTetrisPiece(dx, dy) {
    if (!checkTetrisCollision(dx, dy)) {
        tetrisState.currentX += dx;
        tetrisState.currentY += dy;
        return true;
    }
    return false;
}

function lockTetrisPiece() {
    for (let i = 0; i < tetrisState.currentShape.length; i++) {
        for (let j = 0; j < tetrisState.currentShape[i].length; j++) {
            if (tetrisState.currentShape[i][j]) {
                const boardY = tetrisState.currentY + i;
                const boardX = tetrisState.currentX + j;
                if (boardY >= 0) {
                    tetrisState.board[boardY][boardX] = 1;
                }
            }
        }
    }
    clearTetrisLines();
    spawnTetrisPiece();
}

function clearTetrisLines() {
    let linesCleared = 0;
    for (let i = tetrisState.boardHeight - 1; i >= 0; i--) {
        if (tetrisState.board[i].every(cell => cell === 1)) {
            tetrisState.board.splice(i, 1);
            tetrisState.board.unshift(Array(tetrisState.boardWidth).fill(0));
            linesCleared++;
            i++;
        }
    }
    
    if (linesCleared > 0) {
        tetrisState.lines += linesCleared;
        tetrisState.score += 100 * linesCleared * linesCleared * tetrisState.level;
        tetrisState.level = Math.floor(tetrisState.lines / 10) + 1;
        tetrisState.fallSpeed = Math.max(100, 500 - (tetrisState.level - 1) * 50);
    }
}

function handleTetrisKey(e) {
    if (tetrisState.gameOver) return;
    
    const key = e.key.toLowerCase();
    if (key === 'a' || key === 'arrowleft') {
        e.preventDefault();
        moveTetrisPiece(-1, 0);
        renderTetris();
    } else if (key === 'd' || key === 'arrowright') {
        e.preventDefault();
        moveTetrisPiece(1, 0);
        renderTetris();
    } else if (key === 's' || key === 'arrowdown') {
        e.preventDefault();
        if (!moveTetrisPiece(0, 1)) {
            lockTetrisPiece();
        }
        renderTetris();
    } else if (key === 'w' || key === 'arrowup') {
        e.preventDefault();
        rotateTetrisPiece();
        renderTetris();
    }
}

function gameLoopTetris() {
    if (tetrisState.gameOver) return;
    
    const currentTime = performance.now();
    if (currentTime - tetrisState.lastTime >= tetrisState.fallSpeed) {
        if (!moveTetrisPiece(0, 1)) {
            lockTetrisPiece();
        }
        tetrisState.lastTime = currentTime;
        renderTetris();
        updateTetrisDisplay();
    }
    
    requestAnimationFrame(gameLoopTetris);
}

function renderTetris() {
    const ctx = tetrisState.ctx;
    const canvas = tetrisState.canvas;
    const cellSize = canvas.width / tetrisState.boardWidth;
    
    // Clear canvas
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw board
    for (let i = 0; i < tetrisState.boardHeight; i++) {
        for (let j = 0; j < tetrisState.boardWidth; j++) {
            if (tetrisState.board[i][j]) {
                ctx.fillStyle = '#00f2ff';
                ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
            }
        }
    }
    
    // Draw current piece
    if (tetrisState.currentShape) {
        ctx.fillStyle = '#bd00ff';
        for (let i = 0; i < tetrisState.currentShape.length; i++) {
            for (let j = 0; j < tetrisState.currentShape[i].length; j++) {
                if (tetrisState.currentShape[i][j]) {
                    const x = (tetrisState.currentX + j) * cellSize;
                    const y = (tetrisState.currentY + i) * cellSize;
                    ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
                }
            }
        }
    }
    
    const messageEl = document.getElementById('tetrisMessage');
    if (messageEl && tetrisState.gameOver) {
        messageEl.textContent = '💀 Game Over!';
        messageEl.style.color = '#ff0000';
    }
}

function updateTetrisDisplay() {
    const scoreEl = document.getElementById('tetrisScore');
    const linesEl = document.getElementById('tetrisLines');
    const levelEl = document.getElementById('tetrisLevel');
    
    if (scoreEl) scoreEl.textContent = tetrisState.score;
    if (linesEl) linesEl.textContent = tetrisState.lines;
    if (levelEl) levelEl.textContent = tetrisState.level;
}

// ============================================
// TOOL 22: GLOBAL CLOCK DASHBOARD
// ============================================

function generateWorldClock() {
    return `
        <h2 class="modal-title">Global Clock Dashboard</h2>
        <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
            <div style="text-align: center; margin-bottom: 1rem;">
                <div style="color: var(--neon-blue); font-size: 1.2rem; margin-bottom: 0.5rem;">
                    Your Time: <span id="userTime"></span>
                </div>
                <button class="reset-button" onclick="toggleClockFormat()" style="margin-bottom: 1rem;">Toggle 12/24 Hour</button>
            </div>
            <div id="worldClockContainer" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;"></div>
        </div>
    `;
}

const WORLD_CLOCK_LOCATIONS = [
    { city: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
    { city: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
    { city: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷' },
    { city: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { city: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
    { city: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪' },
    { city: 'Mumbai', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
    { city: 'Beijing', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
    { city: 'Moscow', timezone: 'Europe/Moscow', flag: '🇷🇺' },
    { city: 'São Paulo', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
    { city: 'Los Angeles', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
    { city: 'Berlin', timezone: 'Europe/Berlin', flag: '🇩🇪' }
];

let worldClockState = {
    use24Hour: false,
    updateInterval: null
};

function initWorldClock() {
    updateWorldClock();
    worldClockState.updateInterval = setInterval(updateWorldClock, 1000);
}

function updateWorldClock() {
    const container = document.getElementById('worldClockContainer');
    if (!container) return;
    
    const userTime = new Date();
    const userTimeStr = formatTime(userTime, worldClockState.use24Hour);
    const userTimeEl = document.getElementById('userTime');
    if (userTimeEl) userTimeEl.textContent = userTimeStr;
    
    container.innerHTML = '';
    
    WORLD_CLOCK_LOCATIONS.forEach(location => {
        const time = getTimeInTimezone(location.timezone);
        const timeDiff = getTimeDifference(userTime, time);
        const isDay = time.getHours() >= 6 && time.getHours() < 20;
        
        const card = document.createElement('div');
        card.style.cssText = `
            padding: 1.5rem;
            background: var(--bg-card);
            border: 2px solid ${isDay ? 'var(--neon-blue)' : 'var(--neon-purple)'};
            border-radius: 10px;
            text-align: center;
            transition: all 0.3s;
        `;
        
        card.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">${location.flag}</div>
            <div style="color: var(--neon-blue); font-size: 1.3rem; font-weight: bold; margin-bottom: 0.5rem;">${location.city}</div>
            <div style="color: var(--neon-purple); font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">${formatTime(time, worldClockState.use24Hour)}</div>
            <div style="color: var(--text-secondary); font-size: 0.9rem;">${timeDiff}</div>
        `;
        
        container.appendChild(card);
    });
}

function getTimeInTimezone(timezone) {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', { timeZone: timezone });
    return new Date(timeString);
}

function formatTime(date, use24Hour) {
    if (use24Hour) {
        return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } else {
        return date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
}

function getTimeDifference(userTime, locationTime) {
    const diffMs = locationTime - userTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours === 0 && diffMins === 0) {
        return 'Same time';
    }
    
    const sign = diffHours >= 0 ? '+' : '';
    return `${sign}${diffHours}:${String(Math.abs(diffMins)).padStart(2, '0')}`;
}

function toggleClockFormat() {
    worldClockState.use24Hour = !worldClockState.use24Hour;
    updateWorldClock();
}

