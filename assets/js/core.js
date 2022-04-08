// =================================================
// ============ CORE VARIABLES

const VERSION = "1.0";
const GITHUB = "<a target=\"_blank\" href=\"https://github.com/n-deleforge/mastermind\">GitHub</a>";
const FOOTER = "V. " + VERSION + " | © 2022 | " + GITHUB + " | <a id=\"switchLanguage\"></a>";
const FOOTER_INGAME = "V. " + VERSION + " | © 2022 | " + GITHUB;
const COOKIE_LANG = "GAMZ-language";

const FRENCH = {
    'footer': FOOTER,
    'footerInGame': FOOTER_INGAME,
    'mastermind': "Mastermind",
    'mastermindEasy' : "Mastermind (facile)",
    'title': "Mastermind",
    'classicMode': "Mode normal",
    'easyMode': "Mode facile",
    'check': "Vérifier",
    'reload': "Recommencer",
    'switchLanguage' : "English",
    'titleScreen': `<p>Le Mastermind est un jeu où il faut deviner un code de 5 couleurs défini aléatoirement. Les couleurs peuvent apparaître plusieurs fois. Pour choisir une couleur, il suffit de cliquer une ou plusieurs sur les boules. Les couleurs sont, dans l'ordre, rouge, bleu, jaune, vert et violet.</p>
                          <p>En mode classique, vous avez 10 essai afin de trouver la bonne combinaison alors qu'en mode facile, le nombre d'essai est illimité.</p>`,
    'win_part1': "<p>Bien joué, vous assez réussi à trouver la bonne combinaison en ",
    'win_part2': " essai(s).</p>",
    'lose': "Dommage, vous n'avez pas trouvé la bonne combinaison en 10 essais."
};

const ENGLISH = {
    'footer': FOOTER,
    'footerInGame': FOOTER_INGAME,
    'mastermind': "Mastermind",
    'mastermindEasy' : "Mastermind (easy)",
    'title': "Mastermind",
    'classicMode': "Normal mode",
    'easyMode': "Easy mode",
    'check': "Check",
    'reload': "Restart",
    'switchLanguage' : "French",
    'titleScreen': `<p>The Mastermind is a game where you have to guess a randomly defined 5 color code. The colors can appear multiple times. To choose a color, simply click one or more on the balls. The colors are, in order, red, blue, yellow, green and purple.</p>
                          <p>In classic mode, you have 10 tries in order to find the right combination while in easy mode, the number of tries is unlimited.</p>`,
    'win_part1': "<p>Well done, you managed to find the right combination in ",
    'win_part2': " try/tries.</p>",
    'lose': "Too bad, you didn't find the right combination in 10 tries."
};

// =================================================
// ============ CORE INITIALISATION

// Setup cookie language
if (!getCookie(COOKIE_LANG)) {
    setCookie(COOKIE_LANG , "EN");
}

// Setup content according language
const CONTENT = (getCookie(COOKIE_LANG) == "FR") ? FRENCH : ENGLISH;
Object.keys(CONTENT).forEach(key => {
    if (get("#" + key)) {
        get("#" + key).innerHTML = CONTENT[key];
    }
});

// Able to switch language between French and English
if (get("#switchLanguage")) {
    get("#switchLanguage").addEventListener("click", () => {
        (getCookie(COOKIE_LANG) == "FR") ? setCookie(COOKIE_LANG, "EN") : setCookie(COOKIE_LANG, "FR");
        location.reload();
    });
}