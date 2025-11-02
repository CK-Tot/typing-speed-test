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

    const wordsTyped = correctCharacters / 5;
    const wpm = Math.round(wordsTyped);
    const accuracy = totalCharacters > 0 ? Math.round((correctCharacters / totalCharacters) * 100) : 100;

    finalScoreEl.textContent = `${wpm} WPM with ${accuracy}% accuracy`;
    resultEl.style.display = 'block';
    startBtn.style.display = 'inline-block';
}
```

### 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| HTML5 | Structure and layout of the app |
| CSS3 | Styling and visual feedback (correct/incorrect highlights) |
| JavaScript (ES6) | Game logic, DOM manipulation, and interactivity |

### 📁 Project Structure

```
typing-speed-test/
│
├── index.html         # Main structure of the app
├── style.css          # Styling for layout and highlights
├── script.js          # Game logic and interactivity
└── README.md          # Documentation (this file)
```

### 🕹️ How to Play

1.  Open `index.html` in your browser.
2.  Click the **Start** button to begin the 60-second challenge.
3.  Type the displayed quote accurately and quickly.
4.  Check your WPM and accuracy when time runs out.
5.  Click **Restart** to try again!

### 🧠 Concepts Demonstrated

* DOM manipulation (`getElementById`, `querySelectorAll`)
* Event handling (`click`, `input`)
* Timers using `setInterval` and `clearInterval`
* Dynamic UI rendering and state management
* Accuracy and performance calculations in real time

### 🌟 Future Improvements

* 💾 Save highest scores with Local Storage
* 🌓 Add dark/light mode toggle
* 🧮 Customizable test durations (30s, 60s, 120s)
* 🏆 Online leaderboard
* 🎧 Typing sound effects for feedback

---

### 👨‍💻 Author

**C.K.**
Front-End Developer & Creator of the Typing Speed Test App
📫 Built with HTML, CSS, and JavaScript — combining learning, logic, and speed.

### 📜 License

This project is open source and available under the MIT License.

⭐ If you like this project, don’t forget to star the repo!