const GameboardController = (() => {
	const gameboard = ['', '', '', '', '', '', '', '', '']

	// matches index to gameboard index, checks if space is empty, then places player marker
	const placeMarker = (playerMarker, spaceIndex) => {
		gameboard.forEach((space, index) => {
			let match = index === spaceIndex && space === ''

			switch (match) {
				case true:
					// console.log('match')
					gameboard.splice(spaceIndex, 1, playerMarker)
					break
				case false:
					// console.log('no match')
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

		UIController.updateInstructions(`${currentPlayer.playerName} goes first.`)
		playRound()
	}

	const playRound = (marker, selectedSpace) => {
		marker = currentPlayer.playerMarker
		selectedSpace = 6

		GameboardController.placeMarker(marker, selectedSpace)

		// check for winner
		checkForWinner()

		switchPlayer()
	}

	const switchPlayer = () => {
		currentPlayer === playerOne
			? (currentPlayer = playerTwo)
			: (currentPlayer = playerOne)
	}

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
	const startScreen = document.querySelector('.start-screen')
	const startGameButton = document.querySelector('#start-btn')

	const showStartGameDialog = () => {
		startScreen.showModal()
	}

	document.addEventListener('DOMContentLoaded', showStartGameDialog)

	startGameButton.addEventListener('click', () => {
		GameController.startGame()
	})

	const updateInstructions = (message) => {
		let messageArea = document.querySelector('#message')
		return (messageArea.textContent = message)
	}

	return { updateInstructions }
})()

UIController
