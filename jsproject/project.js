// deopsit money
// determine number of line to bet on
// collect bet amount
// spin the slot machine
// check if user won 
// give user their winning 
// play again?

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};

let balance = 0;

const startGame = () => {
    const depositInput = document.getElementById('deposit').value;
    balance = parseFloat(depositInput);
    
    if (isNaN(balance) || balance <= 0) {
        document.getElementById('result').textContent = "Invalid deposit amount!";
        return;
    }
    
    document.getElementById('betting-controls').style.display = 'block';
    document.getElementById('result').textContent = `Balance: $${balance}`;
};

const spin = () => {
    const linesInput = document.getElementById('lines').value;
    const betInput = document.getElementById('bet').value;

    const lines = parseInt(linesInput);
    const bet = parseFloat(betInput);

    if (isNaN(lines) || lines < 1 || lines > 3) {
        document.getElementById('result').textContent = "Invalid number of lines!";
        return;
    }

    if (isNaN(bet) || bet <= 0 || bet > balance / lines) {
        document.getElementById('result').textContent = "Invalid bet amount!";
        return;
    }

    balance -= bet * lines;
    const reels = generateReels();
    const rows = transposeReels(reels);
    displayReels(rows);

    const winnings = calculateWinnings(rows, bet, lines);
    balance += winnings;

    document.getElementById('result').textContent = `You won $${winnings}!`;
    document.getElementById('balance-display').textContent = `Balance: $${balance}`;

    if (balance <= 0) {
        document.getElementById('result').textContent = "You are out of money!";
    }
};

const generateReels = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < 3; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < 3; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            reels[i].push(reelSymbols.splice(randomIndex, 1)[0]);
        }
    }
    return reels;
};

const transposeReels = (reels) => {
    return reels[0].map((_, i) => reels.map(row => row[i]));
};

const displayReels = (rows) => {
    const reelsDiv = document.getElementById('reels');
    reelsDiv.innerHTML = rows.map(row => row.join(' | ')).join('<br>');
};

const calculateWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let i = 0; i < lines; i++) {
        if (new Set(rows[i]).size === 1) {
            winnings += bet * SYMBOL_VALUES[rows[i][0]];
        }
    }
    return winnings;
};

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('spin').addEventListener('click', spin);
