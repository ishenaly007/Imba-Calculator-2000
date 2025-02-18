document.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector("#display");
  const buttons = document.querySelectorAll(".buttons button");
  const themeToggleBtn = document.querySelector(".theme-toggler");
  const calculator = document.querySelector(".calculator");

  let isEasterEggActive = false;

  const easterEggs = {
      "2+2": "Слишком сложно...",
      "1+1": "Тупоооой...",
      "007": "Агент Бонд",
      "1000-7": "Дед инсайд("
  };

  function factorial(n) {
      return n <= 1 ? 1 : n * factorial(n - 1);
  }

  function safeEval(expression) {
      try {
          if (expression.includes("!")) {
              return expression.replace(/(\d+)!/g, (_, num) => factorial(parseInt(num)));
          }
          return eval(expression.replace("^", "**"));
      } catch {
          return "Ошибка!";
      }
  }

  buttons.forEach((item) => {
      item.onclick = () => {
          if (item.id === "clear") {
              display.innerText = "";
              isEasterEggActive = false;
          } else if (item.id === "backspace") {
              display.innerText = display.innerText.slice(0, -1);
              if (!isNaN(display.innerText)) isEasterEggActive = false;
          } else if (display.innerText !== "" && item.id === "equal") {
              const expression = display.innerText.trim();

              if (easterEggs.hasOwnProperty(expression)) {
                  display.innerText = easterEggs[expression];
                  isEasterEggActive = true;
              } else {
                  display.innerText = safeEval(expression);
              }
          } else if (display.innerText === "" && item.id === "equal") {
              display.innerText = "Empty!";
              setTimeout(() => (display.innerText = ""), 2000);
          } else {
              if (isEasterEggActive) return;
              display.innerText += item.id === "sqrt" ? "Math.sqrt(" : item.id;
          }
      };
  });

  let isDark = true;
  themeToggleBtn.onclick = () => {
      calculator.classList.toggle("dark");
      themeToggleBtn.classList.toggle("active");
      isDark = !isDark;
  };

  // ------------------- АВТОРИЗАЦИЯ -------------------
  const modal = document.getElementById("auth-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModal = document.querySelector(".close");

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");

  const authStatus = document.getElementById("auth-status");

  let users = JSON.parse(localStorage.getItem("users")) || {}; // Загружаем сохраненных пользователей

  openModalBtn.onclick = () => modal.style.display = "flex";
  closeModal.onclick = () => modal.style.display = "none";

  switchToRegister.onclick = () => {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      document.getElementById("modal-title").innerText = "Регистрация";
  };

  switchToLogin.onclick = () => {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      document.getElementById("modal-title").innerText = "Вход";
  };

  document.getElementById("register-btn").onclick = () => {
      const username = document.getElementById("register-username").value.trim();
      const password = document.getElementById("register-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (!username || !password) {
          authStatus.innerText = "Заполните все поля!";
          return;
      }

      if (password !== confirmPassword) {
          authStatus.innerText = "Пароли не совпадают!";
          return;
      }

      if (users[username]) {
          authStatus.innerText = "Этот логин уже используется!";
          return;
      }

      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users)); // Сохраняем пользователей

      authStatus.innerText = "Успешная регистрация!";
      setTimeout(() => {
          switchToLogin.click();
          authStatus.innerText = "";
      }, 1000);
  };

  document.getElementById("login-btn").onclick = () => {
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value;

      if (users[username] && users[username] === password) {
          authStatus.innerText = `Добро пожаловать, ${username}!`;
          setTimeout(() => {
              modal.style.display = "none";
              openModalBtn.innerText = `Привет, ${username}`;
              localStorage.setItem("currentUser", username); // Сохраняем текущего пользователя
          }, 1000);
      } else {
          authStatus.innerText = "Неверный логин или пароль!";
      }
  };

  // Проверка, если пользователь уже вошел
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
      openModalBtn.innerText = `Привет, ${currentUser}`;
  }
});
