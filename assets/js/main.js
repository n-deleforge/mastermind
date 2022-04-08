// =================================================
// ============ SETTINGS

const NUMBERS_RANGE = 5;
const MAX_ERRORS = 10;
const BALLS = get(".ball");
const COLORS = ["lightcoral", "lightskyblue", "khaki", "lightgreen", "mediumpurple"];
const BALL_COLOR = getVariableCSS("ball-initial");

let _errors = 0,
    _combo = "",
    _lastCombos = [],
    _mode = "classic";

// =================================================
// ============ MAIN

/**
 * Initialize the game and events
 **/

get("#classicMode").addEventListener("click", () => { createGame("classic") });
get("#easyMode").addEventListener("click", () => { createGame("easy") });
get("#reload").addEventListener("click", () => { document.location.reload(); });


/**
 * Generate the mastermind and display the board
 * @param {string} difficulty classic or easy
 **/

function createGame(difficulty) {
    // Generate the mastermind
    for (let i = 0; i < NUMBERS_RANGE; i++) {
        _combo += rand(0, NUMBERS_RANGE);;
    }

    // Add listeners on every balls
    BALLS.forEach(ball => {
        ball.addEventListener("click", () => {
            const color = COLORS.indexOf(ball.style.backgroundColor);

            // no color | last color of the COLORS array
            if (color === -1 || color === COLORS.length - 1) {
                ball.style.backgroundColor = COLORS[0];
                ball.setAttribute("colored", true)
            }
            else {
                ball.style.backgroundColor = COLORS[color + 1];
            }

            checkButton();
        });
    });

    // By default, the game is in classic mode
    if (difficulty === "easy") {
        _mode = "easy";
        get("#mastermind").innerHTML = CONTENT.mastermindEasy;
    }

    // Display the board
    get("#titleScreen").style.display = "none";
    get("#board").style.display = "flex";
    get("#footer").innerHTML = FOOTER_INGAME;

    // Display game button with listener
    get("#classicMode").style.display = "none";
    get("#easyMode").style.display = "none";
    get("#check").style.display = "block";
    get("#check").addEventListener("click", checkMove);
    checkButton();
}

/**
 * Check every turn that a color is choosen
 **/

function checkButton() {
    let check = 0;

    BALLS.forEach(ball => {
        if (ball.getAttribute("colored") == "true") {
            check++;
        }
    });

    if (check === NUMBERS_RANGE) {
        get("#check").disabled = false;
    }
    else {
        get("#check").disabled = true;
    }
}

/**
 * Check every turn the state of the game
 **/

function checkMove() {
    let currentCombo = "";

    // Get the current combo
    BALLS.forEach(ball => {
        const color = COLORS.indexOf(ball.style.backgroundColor);
        currentCombo += color;
    });

    // Current combo is correct
    if (currentCombo === _combo) {
        endGame("win");
    }

    // Current combo is not correct
    else {
        _errors++;

        // Game over - only in classic mode
        if (_mode === "classic" && _errors === MAX_ERRORS) {
            endGame("lose");
        }

        // There are some errors but some tries remaining
        else {
            // Register the combo
            _lastCombos.push(currentCombo);
            displayHistory();

            // Reset the balls
            BALLS.forEach(ball => {
                ball.style.backgroundColor = BALL_COLOR;
                ball.setAttribute("colored", false);
            });

            checkButton();
        }
    }
}

/**
 * Display the game over screen
 * @param {string} mode win or lose
 **/

function endGame(mode) {
    if (mode === "win") {
        // Hide the board
        get("#board").style.display = "none";
        get("#check").style.display = "none";
        get("#reload").style.display = "block";

        // Show the endgame display
        get("#gameOver").style.display = "flex";
        get("#gameOver").innerHTML = CONTENT.win_part1 + _errors + CONTENT.win_part2;
    }

    if (mode === "lose") {
        // Hide the board
        get("#board").style.display = "none";
        get("#check").style.display = "none";
        get("#reload").style.display = "block";

        // Show the endgame
        get("#gameOver").style.display = "flex";
        get("#gameOver").innerHTML = CONTENT.lose;

        // Create the container of the solution
        const answer = document.createElement("div");
        answer.classList.add("mastermind");
        answer.id = "answer";
        get("#gameOver").appendChild(answer);

        // Write the solution
        for (let i = 0; i < NUMBERS_RANGE; i++) {
            const ball = document.createElement("div");
            ball.classList.add("ball");
            ball.style.backgroundColor = COLORS[_combo[i]];
            get("#gameOver").lastChild.appendChild(ball);
        }
    }
}

/**
 * Display last used combos
 **/

function displayHistory() {
    // Erase history
    get("#history").innerHTML = "";

    _lastCombos.forEach((combo, index) => {
        // Add a new "line"
        const history = document.createElement("div");
        history.classList.add("mastermind");
        get("#history").appendChild(history);

        // Add the "number" of the game
        const number = document.createElement("p");
        number.innerHTML = index + 1;
        get("#history").lastChild.appendChild(number);

        let correct = 0, notCorrect = 0;

        // All balls in the "line"
        for (let i = 0; i < NUMBERS_RANGE; i++) {
            const ball = document.createElement("div");
            ball.classList.add("ball");
            ball.setAttribute("color", -1);
            ball.style.backgroundColor = COLORS[combo[i]];
            get("#history").lastChild.appendChild(ball);

            // Check results
            if (combo[i] === _combo[i]) {
                correct++;
            } else {
                notCorrect++;
            }
        }

        // Display results
        const results = document.createElement("p");
        results.classList.add("history")
        results.innerHTML = correct + " ✔️  " + notCorrect + " ❌ ";
        get("#history").lastChild.appendChild(results);
    });

    // Force scrolling at the bottom
    get("#history").scrollTo(0, get("#history").scrollHeight);
}