document.addEventListener('DOMContentLoaded', function() {
    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const startButton = document.getElementById('start-btn');
    const stopButton = document.getElementById('stop-btn');
    const retryButton = document.getElementById('retry-btn');
    const timeDisplay = document.getElementById('time');
    const levelDisplay = document.getElementById('level');
    const userInput = document.getElementById('user-input');
    const wpmDisplay = document.getElementById('wpm');

    let startTime;
    let endTime;

    const texts = {
        easy: [
            "The cat sat on the mat.",
            "A quick brown fox jumps over the lazy dog.",
            "She sells seashells by the seashore."
        ],
        medium: [
            "To be or not to be, that is the question.",
            "All that glitters is not gold.",
            "A journey of a thousand miles begins with a single step."
        ],
        hard: [
            "It was the best of times, it was the worst of times.",
            "In the beginning God created the heavens and the earth.",
            "The quick brown fox jumps over the lazy dog while the cat watches."
        ]
    };

    function getRandomText(difficulty) {
        const textsArray = texts[difficulty];
        const randomIndex = Math.floor(Math.random() * textsArray.length);
        return textsArray[randomIndex];
    }

    function countCorrectWords(sampleText, userText) {
        const sampleWords = sampleText.split(' ');
        const userWords = userText.split(' ');
        let correctWords = 0;

        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWords++;
            }
        }

        return correctWords;
    }

    function startTest() {
        startTime = new Date();
        startButton.disabled = true;
        stopButton.disabled = false;
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
    }

    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000 / 60; // time in minutes
        const sampleText = sampleTextDiv.textContent;
        const userText = userInput.value;
        const correctWords = countCorrectWords(sampleText, userText);
        const wpm = Math.round(correctWords / timeTaken);

        timeDisplay.textContent = (timeTaken * 60).toFixed(2); // time in seconds
        wpmDisplay.textContent = wpm;
        levelDisplay.textContent = difficultySelect.value.charAt(0).toUpperCase() + difficultySelect.value.slice(1);

        startButton.disabled = false;
        stopButton.disabled = true;
        userInput.disabled = true;
    }

    function retryTest() {
        sampleTextDiv.textContent = getRandomText(difficultySelect.value);
        timeDisplay.textContent = "0.00";
        wpmDisplay.textContent = "0";
        startButton.disabled = false;
        stopButton.disabled = true;
        userInput.disabled = true;
    }

    difficultySelect.addEventListener('change', function() {
        const selectedDifficulty = difficultySelect.value;
        const randomText = getRandomText(selectedDifficulty);
        sampleTextDiv.textContent = randomText;
        levelDisplay.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    });

    startButton.addEventListener('click', startTest);
    stopButton.addEventListener('click', stopTest);
    retryButton.addEventListener('click', retryTest);

    // Initialize with a random text from the default difficulty (easy)
    sampleTextDiv.textContent = getRandomText('easy');
});