const GameboardController = (() => {
	const gameboard = ['', '', '', '', '', '', '', '', '']

	// matches index to gameboard index, checks if space is empty, then places player marker
	const placeMarker = (playerMarker, squareIndex) => {
		gameboard.forEach((square, index) => {
			let match = index === squareIndex && square === ''

			switch (match) {
				case true:
					gameboard.splice(squareIndex, 1, playerMarker)
					UIController.updateGameboard(squareIndex, playerMarker)
					return
				case false:
					return
			}
		})
	}

	return { gameboard, placeMarker }
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

		playerOne = createPlayer(playerOneName, 'X')
		playerTwo = createPlayer(playerTwoName, 'O')
		currentPlayer = randomPlayer(playerOne, playerTwo)

		UIController.updateMessage(`${currentPlayer.playerName}, your first.`)

		const gameboardSquares = document.querySelectorAll('.gameboard-square')

		gameboardSquares.forEach((square, index) => {
			square.addEventListener('click', () => {
				playRound(index)
			})
		})
	}

	const playRound = (clickedSquare) => {
		let marker = currentPlayer.playerMarker
		let selectedSquare = clickedSquare

		GameboardController.placeMarker(marker, selectedSquare)

		// check for winner
		checkForWinner()

		switchPlayer()
	}

	// switches current player and updates message
	const switchPlayer = () => {
		currentPlayer === playerOne
			? (currentPlayer = playerTwo)
			: (currentPlayer = playerOne)
		UIController.updateMessage(`Your turn ${currentPlayer.playerName}.`)
	}

	// checks for winner by comparing player markers to the patterns of the winning sets
	const checkForWinner = () => {
		let gameboard = GameboardController.gameboard
		let winner
		const winningSets = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]

		winningSets.forEach((set) => {
			if (
				gameboard[set[0]] &&
				gameboard[set[0]] === gameboard[set[1]] &&
				gameboard[set[0]] === gameboard[set[2]]
			) {
				winner = gameboard[set[0]]
			}
		})

		return winner ? winner : gameboard.includes('') ? null : `It's a draw!`
	}

	return { startGame }
})()

const UIController = (() => {
	// const startScreen = document.querySelector('.start-screen')
	// const startGameButton = document.querySelector('#start-btn')
	//
	// const showStartGameDialog = () => {
	// 	startScreen.showModal()
	// }
	//
	// document.addEventListener('DOMContentLoaded', showStartGameDialog)
	//
	// startGameButton.addEventListener('click', () => {
	// 	GameController.startGame()
	// })

	// updates message to show current game status
	const updateMessage = (message) => {
		let messageArea = document.querySelector('#message')
		return (messageArea.textContent = message)
	}

	// updates the gameboard to show placement of player marker
	const updateGameboard = (squareIndex, playerMarker) => {
		let gameboardSquares = document.querySelectorAll('.gameboard-square')
		console.log(`${squareIndex} : ${playerMarker}`)

		gameboardSquares.forEach((square, index) => {
			if (index === squareIndex) {
				square.textContent = playerMarker
			}
		})
	}

	return { updateMessage, updateGameboard }
})()

// UIController
GameController.startGame()
