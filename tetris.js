// initialized the canvas
const canvas = document.querySelector('.my-canvas');
// canvas dimension
canvas.width = 260;
canvas.height = 400;

//canvas context
const ctx = canvas.getContext('2d');

//used for storing the current, next tetromino and its position
let tetromino = {
	currentTetro: null,
	nextTetro: null,
	pos: { x: 0, y: 0 },
};

//used for storing player details
let player = {
	score: 0,
	highScore: 0,
	level: 1,
};

//game board of size 20x13 for holding the tetrominos position
const gameBoard = new Array(20).fill(0).map(() => new Array(13).fill(0));

/**
 * Initialize the game
 */
const init = () => {
	//scaling the canvas elements
	ctx.scale(20, 20);

	//running the game
	run();
};

/*************DRAWING THE BOARD AND TETROMINOS*************/

/**
 * drawing the game board and tetrominos
 */
const draw = () => {
	ctx.beginPath();
	ctx.fillStyle = '#E0ECFF';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawBoard();
	drawTetromino();
};

/**
 * drawing the game board
 */
const drawBoard = () => {
	gameBoard.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				ctx.beginPath();
				ctx.fillStyle = 'green';
				ctx.fillRect(x, y, 1, 1);
			}
		});
	});
};

/**
 * drawing the tetromino
 */
const drawTetromino = () => {
	tetromino.currentTetro.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				ctx.beginPath();
				ctx.fillStyle = 'green';
				ctx.fillRect(x + tetromino.pos.x, y + tetromino.pos.y, 1, 1);
			}
		});
	});
};

/*************Tetromino Structure & Functions*************/

/**
 * Provide the shape of tetromino according to the given type
 *
 * @param {String} type Letter of the shape
 * @returns {Number[][]} 2D array Representing the shape of tetromino
 */
const getTetromino = (type) => {
	if (type === 'T') {
		return [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0],
		];
	} else if (type === 'O') {
		return [
			[2, 2],
			[2, 2],
		];
	} else if (type === 'L') {
		return [
			[0, 3, 0],
			[0, 3, 0],
			[0, 3, 3],
		];
	} else if (type === 'J') {
		return [
			[0, 4, 0],
			[0, 4, 0],
			[4, 4, 0],
		];
	} else if (type === 'S') {
		return [
			[0, 5, 5],
			[5, 5, 0],
			[0, 0, 0],
		];
	} else if (type === 'Z') {
		return [
			[6, 6, 0],
			[0, 6, 6],
			[0, 0, 0],
		];
	} else if (type === 'I') {
		return [
			[0, 7, 0, 0],
			[0, 7, 0, 0],
			[0, 7, 0, 0],
			[0, 7, 0, 0],
		];
	}
};

/**
 * Moving the tetromino vertically
 */
const tetrominoDrop = () => {
	//increasing the y value
	tetromino.pos.y++;
	//resetting the drop count
	dropCounter = 0;
};

/**
 * Moving the tetromino horizontally
 * @param {Number} direction (+) Move right or (-) Move left
 */
const tetrominoMoveHorizontal = (direction) => {
	//changing the x value according to direction
	tetromino.pos.x += direction;
};

/**
 * Rotate the tetromino matrix
 * @param {Number[][]} tetromino The tetromino matrix
 * @param {Number} direction (+) Rotate Clockwise (-) Rotate Anti-clockwise
 */
const rotate = (tetromino, direction) => {
	//transposing the matrix
	for (let y = 0; y < tetromino.length; y++) {
		for (let x = 0; x < y; x++) {
			[tetromino[x][y], tetromino[y][x]] = [tetromino[y][x], tetromino[x][y]];
		}
	}

	//reversing each row in the matrix clockwise
	if (direction > 0) tetromino.forEach((row) => row.reverse());
	//reversing the matrix anti clockwise
	else tetromino.reverse();
};

/**
 *	Calling the rotate on current tetromino and check collision while rotating
 *  * @param {Number} direction (+) Rotate Clockwise (-) Rotate Anti-clockwise
 */
const tetrominoRotate = (direction) => {
	rotate(tetromino.currentTetro, direction);
};

/*************Game Run*************/

//used to check when to drop the tetromino
let dropCounter = 0;
//used for how much time it take for tetromino to drop
//1 sec = 1000 ms
let timeForDrop = 1000;
//used to store the previous time
let prevTime = 0;

/**
 * creating animation by moving the tetromino inside the board
 * @param {number} time The current time in millisecond
 */
const run = (time = 0) => {
	//finding the difference between current and previous time
	const deltaTime = time - prevTime;

	//adding it to the drop counter
	dropCounter += deltaTime;

	//performing the drop if dropCounter is greater than time for drop
	if (dropCounter > timeForDrop) {
		tetrominoDrop();
	}

	//storing the current time
	prevTime = time;

	draw();
	requestAnimationFrame(run);
};

///////////////////////////////////////////
/*testing methods*/
tetromino.currentTetro = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0],
];

tetromino.pos.x = 5;

init();
