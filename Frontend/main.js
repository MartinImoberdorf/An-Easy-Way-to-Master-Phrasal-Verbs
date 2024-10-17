// Function to fetch total questions and get a random question
let previousId = null;
async function getRandomQuestion() {
    try {
        // Clear the status message
        document.getElementById('status').innerHTML = '';

        // Fetch the total number of questions
        const totalResponse = await fetch('http://localhost:4000/total');
        const totalData = await totalResponse.json();
        const totalQuestions = totalData.total;

        // Generate a random ID (different from the previous one)
        let randomId;
        do {
            randomId = Math.floor(Math.random() * totalQuestions) + 1;
        } while (randomId === previousId);
        previousId = randomId;

        // Fetch the question by random ID
        const questionResponse = await fetch(`http://localhost:4000/questions/${randomId}`);
        const questionData = await questionResponse.json();

        // Update the DOM with the question and options
        document.getElementById('question').innerHTML = `Como se dice: <strong class="text-gray-400">${questionData.Question}</strong>`;
        document.getElementById('correctAnswer').value = questionData.Correct; // Store correct answer
        document.getElementById('options').innerHTML = `
            <button class="option-button" onclick="selectOption('${questionData.Opcion1}', this)">${questionData.Opcion1}</button>
            <button class="option-button" onclick="selectOption('${questionData.Opcion2}', this)">${questionData.Opcion2}</button>
            <button class="option-button" onclick="selectOption('${questionData.Opcion3}', this)">${questionData.Opcion3}</button>
            <button class="option-button" onclick="selectOption('${questionData.Opcion4}', this)">${questionData.Opcion4}</button>
        `;
        document.getElementById('submit').classList.remove('hidden');
        document.getElementById('next').classList.add('hidden');

        // Reset selected values and styles
        selectedValue = '';
        if (selectedButton) {
            selectedButton.classList.remove('bg-sky-400', 'text-white'); // Reset previous selected button styles
            selectedButton = null; // Clear the reference
        }

    } catch (error) {
        console.error('Error fetching the question:', error);
        document.getElementById('question').innerText = 'Error loading the question.';
    }
}

// Function to select an option
let selectedValue = '';
let selectedButton = null; // Store reference to the selected button
function selectOption(value, button) {
    selectedValue = value;

    // Reset styles for all buttons
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('bg-sky-400', 'text-white');
    });

    // Highlight the selected button
    button.classList.add('bg-sky-400', 'text-white'); // Change to sky-400
    selectedButton = button; // Store the reference to the selected button
}

// Function to handle answer submission
function submitAnswer() {
    if (!selectedValue) return;

    const correctAnswer = document.getElementById('correctAnswer').value;

    // Reset styles and mark the correct and selected buttons
    document.querySelectorAll('.option-button').forEach(button => {
        if (button.innerText === correctAnswer) {
            button.classList.add('bg-green-500', 'text-white'); // Correct answer
        } else if (button.innerText === selectedValue) {
            button.classList.add('bg-red-500', 'text-white'); // Incorrect answer
        }
    });

    // Change the selected button color based on correctness
    if (selectedValue === correctAnswer) {
        selectedButton.classList.remove('bg-sky-400'); // Remove sky-400 if it's correct
        selectedButton.classList.add('bg-green-500', 'text-white'); // Change to green
    } else {
        selectedButton.classList.add('bg-red-500', 'text-white'); // Change to red if it's incorrect
    }

    // Show whether the selected answer is correct
    if (selectedValue === correctAnswer) {
        document.getElementById('status').innerHTML = `<h1 class="text-green-500 text-xl font-bold">Correct!</h1>`;
    } else {
        document.getElementById('status').innerHTML = `<h1 class="text-red-500 text-xl font-bold">Incorrect!</h1>`;
    }

    // Show the 'Next' button
    document.getElementById('submit').classList.add('hidden');
    document.getElementById('next').classList.remove('hidden');
}

window.onload = getRandomQuestion;
