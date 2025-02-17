const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let isEasterEggActive = false; 

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
      isEasterEggActive = false; 
    } else if (item.id == "backspace") {
      display.innerText = display.innerText.slice(0, -1);
      if (!isNaN(display.innerText)) isEasterEggActive = false; 
    } else if (display.innerText != "" && item.id == "equal") {
      const expression = display.innerText.trim();
      
      const easterEggs = {
        "2+2": "Слишком сложно...",
        "1+1": "Тупоооой...",
        "007": "Агент Бонд",
        "1000-7": "Дед инсайд(",
      };

      if (easterEggs.hasOwnProperty(expression)) {
        display.innerText = easterEggs[expression];
        isEasterEggActive = true;
      } else {
        display.innerText = eval(expression);
      }
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    } else {
      if (isEasterEggActive && !isNaN(item.id)) return;
      display.innerText += item.id;
    }
  };
});


const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};