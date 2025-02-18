document.addEventListener('DOMContentLoaded', function () {
	const display = document.querySelector('#display')
	const buttons = document.querySelectorAll('.buttons button')
	const openModalButtons = document.querySelectorAll('[data-modal-target]')
	const closeModalButtons = document.querySelectorAll('[data-close-button]')
	const overlay = document.getElementById('overlay')

	openModalButtons.forEach(button => {
		button.addEventListener('click', () => {
			const modal = document.querySelector(button.dataset.modalTarget)
			openModal(modal)
		})
	})

	overlay.addEventListener('click', () => {
		document.querySelectorAll('.modal.active').forEach(closeModal)
	})

	closeModalButtons.forEach(button => {
		button.addEventListener('click', () => closeModal(button.closest('.modal')))
	})

	function openModal(modal) {
		if (modal == null) return
		modal.classList.add('active')
		overlay.classList.add('active')
	}

	function closeModal(modal) {
		if (modal == null) return
		modal.classList.remove('active')
		overlay.classList.remove('active')
	}

	let isEasterEggActive = false

	const easterEggs = {
		'2+2': 'Слишком сложно...',
		'1+1': 'Тупоооой...',
		'007': 'Агент Бонд',
		'1000-7': 'Дед инсайд(',
		'0+0': 'Незнаю(',
		'0-0': 'Незнаю(',
	}

	function factorial(n) {
		if (n === 0 || n === 1) return 1
		return n * factorial(n - 1)
	}

	function safeEval(expression) {
		try {
			expression = expression
				.replace(/(\d+)!/g, (_, num) => factorial(parseInt(num)))
				.replace(/\^/g, '**')
				.replace(/√(\d+)/g, (_, num) => `Math.sqrt(${num})`)
				.replace(/sin\(([^)]+)\)/g, (_, num) => `Math.sin(${num} * Math.PI / 180)`)
				.replace(/cos\(([^)]+)\)/g, (_, num) => `Math.cos(${num} * Math.PI / 180)`)
				.replace(/tan\(([^)]+)\)/g, (_, num) => `Math.tan(${num} * Math.PI / 180)`)
				.replace(/log\(([^)]+)\)/g, (_, num) => `Math.log10(${num})`)
				.replace(/ln\(([^)]+)\)/g, (_, num) => `Math.log(${num})`)
				.replace(/π/g, 'Math.PI')
				.replace(/e/g, 'Math.E')
                expression = expression.replace(/abs\(([^)]+)\)/g, (_, num) => `Math.abs(${num})`)
			return eval(expression)
		} catch {
			return 'Ошибка!'
		}
	}

	const operators = ['+', '-', '*', '/', '^']

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			let id = button.id
			let lastChar = display.innerText.slice(-1)

			if (id === 'clear') {
				display.innerText = ''
				isEasterEggActive = false
				return
			}

			if (id === 'backspace') {
				display.innerText = display.innerText.slice(0, -1)
				isEasterEggActive = false
				return
			}

			if (id === 'equal') {
				const expression = display.innerText.trim()

				if (easterEggs.hasOwnProperty(expression)) {
					display.innerText = easterEggs[expression]
					isEasterEggActive = true
				} else {
					display.innerText = safeEval(expression)
				}
				return
			}

			if (isEasterEggActive) return

			if (operators.includes(id) && operators.includes(lastChar)) {
				return
			}

			const specialCases = {
				'square': '^2',
				'cube': '^3',
				'pow': '^',
				'sqrt': '√(',
				'fact': '!',
				'sin': 'sin(',
				'cos': 'cos(',
				'tan': 'tan(',
				'log': 'log(',
				'ln': 'ln(',
				'pi': 'π',
				'e': 'e',
                'abs': 'abs('
			}

			display.innerText += specialCases[id] || button.innerText
		})
	})
})
