import diccionario from './diccionario.json' assert { type: 'json' };

document.body.addEventListener('click', getWord);
document.addEventListener('DOMContentLoaded', getWord);

const buttons = document.querySelectorAll('button.settings');
const timerInput = document.querySelector('input#timer');
const secondsInput = document.querySelector('input#seconds');
let timerInterval;

timerInput.addEventListener('change', e => {
    if (timerInterval) clearInterval(timerInterval);
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
    if (e?.target.classList?.contains('settings')) return;

    let dictionary = diccionario.mejores;
    if (document.querySelector('input#unsafe').checked) {
        dictionary = [...diccionario.mejores, ...diccionario.inseguro];
    }
    const newWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    document.querySelector('h1#word').innerHTML = newWord;
}
