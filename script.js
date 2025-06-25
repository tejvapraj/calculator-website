let display = document.getElementById('display');

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    const expression = display.value;
    const result = eval(expression);
    display.value = formatNumber(result);
    addToHistory(expression + ' = ' + result);
  } catch {
    display.value = 'Error';
  }
}

// Append to history list
function addToHistory(entry) {
  const historyList = document.getElementById('history-list');
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li); // add newest on top
}

function formatNumber(num) {
  return Number(num).toLocaleString("en");
}

function moveCursorToEnd(input) {
  const length = input.value.length;
  input.setSelectionRange(length, length);
}


// Keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;
  const validKeys = "0123456789+-*/.";

  if (validKeys.includes(key)) {
    display.focus();  // Ensure input is active
    display.value += key;
    moveCursorToEnd(display);  // Move cursor to end, remove selection
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
    moveCursorToEnd(display);
  } else if (key === "Escape") {
    display.value = "";
  }
});

