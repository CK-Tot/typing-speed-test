# ⌨️ Typing Speed Test App

A fast, fun, and interactive web app built with **Vanilla JavaScript** to test your typing speed and accuracy in real time.
The app displays random quotes for you to type within 60 seconds and calculates **Words Per Minute (WPM)** and **accuracy** dynamically.

---

## 🚀 Features

- ⏱ **60-second countdown timer**
- 🧠 **Random programming quotes** for varied practice
- 🎯 **Real-time WPM and accuracy tracking**
- 🟩 **Instant visual feedback** — correct = green, incorrect = red
- 🏁 **Final score screen** showing WPM and accuracy
- 🔁 **Restart option** to play again instantly

---

## 🖼️ Preview

Type the displayed quote in the input box as fast and accurately as possible.
When the timer hits zero, your **WPM** and **accuracy** are shown instantly!

---

## 🧩 How It Works

### 1. 🎲 Generate a Random Quote

Each round begins with a random quote.
Every character is wrapped in a `<span>` element so that typing feedback (green/red highlight) can be shown.

```js
function renderQuote() {
    currentQuote = getRandomQuote();
    quoteDisplayEl.innerHTML = '';
    currentQuote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerHTML = character;
        quoteDisplayEl.appendChild(characterSpan);
    });
}
```

### 2. ▶️ Start the Game

When the user clicks the Start button:

* A random quote is displayed
* The timer begins counting down from 60 seconds
* The input box becomes active for typing

```js
function startGame() {
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
```

### 3. 📊 Real-Time Stats

Your typing speed (WPM) and accuracy are updated dynamically while you type.

```js
function updateStats() {
    const timeElapsed = (new Date() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = correctCharacters / 5;
    const wpm = Math.round(wordsTyped / timeElapsed);
    const accuracy = totalCharacters > 0 ? Math.round((correctCharacters / totalCharacters) * 100) : 100;

    wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
    accuracyEl.textContent = `${accuracy}%`;
}
```

**🧮 Formulas Used:**

* **WPM** = (Correct Characters ÷ 5) ÷ Time (minutes)
* **Accuracy** = (Correct ÷ Total) × 100

### 4. 🏁 End of the Game

When the timer reaches zero:

* Typing is disabled
* The timer stops
* Final WPM and accuracy scores are displayed

```js
function endGame() {
    isPlaying = false;
    clearInterval(timer);
    quoteInputEl.disabled = true;

    const wordsTyped = correctCharacters /