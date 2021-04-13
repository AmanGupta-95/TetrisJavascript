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

    draw();
};

/*************DRAWING THE BOARD AND TETROMINOS***************/

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






///////////////////////////////////////////
/*testing methods*/
tetromino.currentTetro = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0],
];

init();