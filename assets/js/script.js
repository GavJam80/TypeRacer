document.addEventListener('DOMContentLoaded', function() {
    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    const retryButton = document.getElementById('retry-btn');
    const timeDisplay = document.getElementById('time');
    const levelDisplay = document.getElementById('level');
    const userInput = document.getElementById('user-input');
    const wpmDisplay = document.getElementById('wpm');

    let startTime;
    let endTime;
    let testStarted = false;
    let sampleText = '';

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

    function startTest() {
        const difficulty = difficultySelect.value;
        sampleText = getRandomText(difficulty);
        sampleTextDiv.textContent = sampleText;
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
        startTime = new Date();
        testStarted = true;
        console.log('Test started');
    }

    function stopTest() {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        const wordsTyped = userInput.value.trim().split(/\s+/).length;
        const wpm = (wordsTyped / timeTaken) * 60;
        wpmDisplay.textContent = `WPM: ${wpm.toFixed(2)}`;
        timeDisplay.textContent = timeTaken.toFixed(2); // Display the time taken
        userInput.disabled = true;
        testStarted = false;
        console.log('Test stopped');
    }

    function highlightText() {
        const userInputText = userInput.value;
        const sampleWords = sampleText.split(' ');
        const userWords = userInputText.split(' ');

        let highlightedText = '';

        for (let i = 0; i < sampleWords.length; i++) {
            if (i < userWords.length) {
                if (sampleWords[i] === userWords[i]) {
                    highlightedText += `<span style="color: blue;">${sampleWords[i]}</span> `;
                } else {
                    highlightedText += `<span style="color: red;">${sampleWords[i]}</span> `;
                }
            } else {
                highlightedText += `${sampleWords[i]} `;
            }
        }

        sampleTextDiv.innerHTML = highlightedText.trim();
    }

    userInput.addEventListener('input', () => {
        if (!testStarted) {
            startTest();
        }
        highlightText();
    });

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action of the Enter key
            if (testStarted) {
                stopTest();
            }
        }
    });

    retryButton.addEventListener('click', () => {
        testStarted = false;
        startTest();
    });

    difficultySelect.addEventListener('change', () => {
        const difficulty = difficultySelect.value;
        sampleText = getRandomText(difficulty);
        sampleTextDiv.textContent = sampleText;
        userInput.value = '';
        userInput.disabled = false;
        userInput.focus();
    });
});