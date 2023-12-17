import diccionario from './diccionario.json' assert { type: 'json' };

const buttons = document.querySelectorAll('button.settings');
const timerInput = document.querySelector('input#timer');
const secondsInput = document.querySelector('input#seconds');
let timerInterval;

document.body.addEventListener('click', e => {
    if (timerInterval) return;
    getWord(e);
});
document.addEventListener('DOMContentLoaded', getWord);

timerInput.addEventListener('change', e => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (e.target.checked) {
        timerInterval = setInterval(getWord, secondsInput.valueAsNumber * 1000);
    }
    const [addButton, subtractButton] = Array.from(buttons);
    addButton.classList.toggle('hidden');
    subtractButton.classList.toggle('hidden');
    secondsInput.classList.toggle('hidden');
});

buttons.forEach(button =>
    button.addEventListener('click', e => {
        if (e.target.classList.contains('add'))
            secondsInput.valueAsNumber >= 60 ? 60 : secondsInput.value++;
        else secondsInput.valueAsNumber <= 5 ? 5 : secondsInput.value--;
        clearInterval(timerInterval);
        timerInterval = setInterval(getWord, secondsInput.valueAsNumber * 1000);
    })
);

function getWord(e) {
    if (e?.target.classList?.contains('settings')) return; // clicked on settings
    if (e && timerInterval) return; // clicked when enabled timer mode

    let dictionary = diccionario.mejores;
    if (document.querySelector('input#unsafe').checked) {
        dictionary = [...diccionario.mejores, ...diccionario.inseguro];
    }
    const newWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    document.querySelector('h1#word').innerHTML = newWord;
}
