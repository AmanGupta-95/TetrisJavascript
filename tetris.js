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
		tetromino.pos.y += 1;
		dropCounter = 0;
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
