const $ = id => document.getElementById(id);

const timerEl = $('timer');
const wpmEl = $('wpm');
const accuracyEl = $('accuracy');
const quoteDisplayEl = $('quote-display');
const quoteInputEl = $('quote-input');
const startBtn = $('start-btn');
const resultEl = $('result');
const finalScoreEl = $('final-score');
const restartBtn = $('restart-btn');

const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."

];

let timer;
let timeLeft = 60;
let isPlaying = false;
let currentQuote = '';
let startTime;
let correctCharacters = 0;
let totalCharacters = 0;

function getRandomQuote()
{
    return quotes[Math.floor(Math.random() * quotes.length)]
}

function renderQuote() {
    currentQuote = getRandomQuote();
    quoteDisplayEl.innerHTML = '';
    currentQuote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerHTML = character;
        quoteDisplayEl.appendChild(characterSpan);
    } )
}


function startGame () {
    isPlaying = true;
    timeLeft = 60;
    correctCharacters = 0;
    totalCharacters = 0;
    renderQuote();
    quoteInputEl.value = '';
    quoteInputEl.disabled = false;
    quoteInputEl.focus();

    startBtn.style.display = 'none';
    resultEl.style.display = 'none';

    startTime = new Date();
    timer = setInterval(updateTimer, 1000);

    updateStats();

}


function updateTimer()
{
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0)
    {
        endGame();
    }

}

function updateStats()
{
    const timeElapsed = (new Date() - startTime) / 1000 / 60; // in minutes

    const wordsTyped = correctCharacters / 5;
    const wpm = Math.round(wordsTyped / timeElapsed);
    wpmEl.textContent = isNaN(wpm) ? 0 : wpm;

    const accuracy = totalCharacters > 0 ? Math.round((correctCharacters / totalCharacters) * 100) : 100;
    accuracyEl.textContent = `${accuracy}%`;


}


function endGame()
{
    isPlaying = false;
    clearInterval(timer);
    quoteInputEl.disabled = true;

    const timeElapsed = 1;
    const wordsTyped = correctCharacters / 5;
    const wpm = Math.round(wordsTyped / timeElapsed);
    const accuracy = totalCharacters > 0 ? Math.round((correctCharacters / totalCharacters) * 100) : 100;
    finalScoreEl.textContent = `${wpm} WPM with ${accuracy} accuracy`;

    resultEl.style.display = 'block';
    startBtn.style.display = 'inline-block';

}

function handleInput()
{
    if (!isPlaying) return;

    const arrayQuote = quoteDisplayEl.querySelectorAll('span');
    const arrayValue = quoteInputEl.value.split('');


    let correct = true;
     totalCharacters = arrayValue.length;
    correctCharacters = 0;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if (character == null)
        {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('current');
            correct = false;
        }
        else if (character === characterSpan.innerText)
        {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.remove('current');
            correctCharacters++;


        }
        else
        {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('current');
            correct = false;
        }


        // Highlight current character
         if (index === arrayValue.length)
         {
            characterSpan.classList.add('current');
         }
         else
         {
            characterSpan.classList.remove('current');
         }

    });


    // Check if quote is completed
    if (correct && arrayValue.length === arrayQuote.length)
    {
        renderQuote();
        quoteInputEl.value = '';
        updateStats();
    }
    else
    {
        updateStats();
    }

}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
quoteInputEl.addEventListener('input', handleInput);

renderQuote();
