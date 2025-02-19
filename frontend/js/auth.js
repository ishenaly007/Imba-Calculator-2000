document.addEventListener('DOMContentLoaded', function () {
	// Проверяем авторизацию при загрузке страницы
	const token = localStorage.getItem('token')
	if (token) {
		document.getElementById('auth-status').innerText = 'Вы авторизованы'
		document.getElementById('logout-btn').style.display = 'block'
	}

	// Регистрация пользователя
	const registerForm = document.getElementById('registration-form')
	if (registerForm) {
		registerForm.addEventListener('submit', async function (event) {
			event.preventDefault()

			const username = document.getElementById('username').value
			const password = document.getElementById('password').value
			const confirmPassword = document.getElementById('confirm-password').value

			if (password !== confirmPassword) {
				alert('Пароли не совпадают!')
				return
			}

			const userData = {
				id: null,
				email: username + '@example.com',
				password: password,
				username: username,
				birthDate: new Date().toISOString(),
				lovePersonName: 'N/A',
				hatePersonName: 'N/A'
			}

			try {
				const response = await fetch('http://localhost:8083/api/test/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(userData)
				})

				if (response.ok) {
					alert('Регистрация успешна! Теперь войдите в аккаунт.')
					window.location.reload()
				} else {
					alert('Ошибка регистрации')
				}
			} catch (error) {
				console.error('Ошибка:', error)
				alert('Ошибка соединения с сервером')
			}
		})
	}

	// Авторизация пользователя
	const loginForm = document.getElementById('login-form')
	if (loginForm) {
		loginForm.addEventListener('submit', async function (event) {
			event.preventDefault()

			const username = document.getElementById('login-username').value
			const password = document.getElementById('login-password').value

			const loginData = { username, password }

			try {
				const response = await fetch('http://localhost:8083/api/test/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(loginData)
				})

				const result = await response.json()

				if (response.ok) {
					alert('Авторизация успешна!')
					localStorage.setItem('token', result.token)
					window.location.reload()
				} else {
					alert('Ошибка авторизации')
				}
			} catch (error) {
				console.error('Ошибка:', error)
				alert('Ошибка соединения с сервером')
			}
		})
	}

	// Выход из аккаунта
	const logoutBtn = document.getElementById('logout-btn')
	if (logoutBtn) {
		logoutBtn.addEventListener('click', function () {
			localStorage.removeItem('token')
			alert('Вы вышли из аккаунта')
			window.location.reload()
		})
	}
})
