const GameboardController = (() => {
	let gameboard = ['', '', '', '', '', '', '', '', '']

	// matches index to gameboard index, checks if space is empty, then places player marker
	const placeMarker = (playerMarker, squareIndex) => {
		gameboard.forEach((square, index) => {
			let match = index === squareIndex && square === ''

			if (match) {
				gameboard.splice(squareIndex, 1, playerMarker)
				DialogController.updateGameboard(squareIndex, playerMarker)
			}

			if (!match) return
		})
	}

	const clearGameboard = () => {
		gameboard.forEach((square, index) => {
			gameboard.splice(index, 1, '')
		})
	}

	return { gameboard, placeMarker, clearGameboard }
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

		DialogController.updateGameInfo(`${currentPlayer.playerName}, your first.`)

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
		if (checkForWinner() === null) {
			switchPlayer()
		} else {
			DialogController.updateGameInfo(checkForWinner())
			DialogController.resetGameboard()
		}
	}

	// switches current player and updates message
	const switchPlayer = () => {
		currentPlayer === playerOne
			? (currentPlayer = playerTwo)
			: (currentPlayer = playerOne)
		DialogController.updateGameInfo(`Your turn ${currentPlayer.playerName}.`)
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
				gameboard[set[0]] === playerOne.playerMarker
					? (winner = playerOne.playerName)
					: (winner = playerTwo.playerName)
			}
		})

		return winner
			? (winner = `Winner is ${winner}!`)
			: gameboard.includes('')
				? null
				: (winner = 'Its a draw')
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

	const updateGameInfo = (message) => {
		let gameInfoArea = document.querySelector('#message')
		return (gameInfoArea.textContent = message)
	}

	let gameboardSquares = document.querySelectorAll('.gameboard-square')

	// updates the gameboard to show placement of player marker
	const updateGameboard = (squareIndex, playerMarker) => {
		gameboardSquares.forEach((square, index) => {
			if (index === squareIndex) {
				square.textContent = playerMarker
			}
		})
	}

	const resetGameboard = () => {
		const gameboardContainer = document.querySelector('.gameboard-container')

		let resetButton = document.createElement('button')
		resetButton.textContent = 'Reset Game'
		resetButton.classList.add('btn')

		gameboardContainer.appendChild(resetButton)

		resetButton.addEventListener('click', () => {
			gameboardSquares.forEach((square) => {
				square.textContent = ''
			})

			GameboardController.clearGameboard()
			gameboardContainer.removeChild(resetButton)
		})
	}

	return { updateGameInfo, updateGameboard, resetGameboard }
})()
