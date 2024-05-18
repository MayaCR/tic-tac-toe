const GameboardController = (() => {
	const gameboard = ['', '', '', '', '', '', '', '', '']

	return { gameboard }
})()

// returns player object
const createPlayer = (playerName, playerMarker) => {
	return { playerName, playerMarker }
}

// creates an array that returns randomly selected player
const randomPlayer = (...array) => {
	return array[Math.floor(Math.random() * array.length)]
}

const GameController = (() => {
	let playerOne
	let playerTwo
	let currentPlayer

	const startGame = () => {
		let playerOneName = document.querySelector('#player-one').value
		let playerTwoName = document.querySelector('#player-two').value

		playerOneName === ''
			? (playerOneName = 'Player One')
			: (playerOneName = document.querySelector('#player-one').value)
		playerTwoName === ''
			? (playerTwoName = 'Player Two')
			: (playerTwoName = document.querySelector('#player-two').value)

		playerOne = createPlayer(playerOneName, 'X')
		playerTwo = createPlayer(playerTwoName, 'O')
		currentPlayer = randomPlayer(playerOne, playerTwo)

		DialogController.updatGameInfo(`${currentPlayer.playerName}, your first.`)

		const gameboardSquares = document.querySelectorAll('.gameboard-square')

		gameboardSquares.forEach((square, index) => {
			square.addEventListener('click', () => {
				playRound(index)
			})
		})
	}

	const playRound = (clickedSquare) => {
		console.log(clickedSquare)
	}

	return { startGame, playRound }
})()

const DialogController = (() => {
	const dialog = document.querySelector('#dialog')
	const dialogStart = document.querySelector('#start-btn')

	const showDialog = () => {
		dialog.showModal()

		dialogStart.addEventListener('click', () => {
			GameController.startGame()
		})
	}

	document.addEventListener('DOMContentLoaded', showDialog)

	const updatGameInfo = (message) => {
		let gameInfoArea = document.querySelector('#message')
		return (gameInfoArea.textContent = message)
	}

	return { updatGameInfo }
})()
