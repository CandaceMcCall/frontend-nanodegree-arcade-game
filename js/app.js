/*
 * Enemies our player must avoid
 *
 */
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Next four properties are the locations on the original
    // image.  This makes it easier for collision detection
    // rather than using the full image.  sourceX and sourceY
    // are positions on original image.   sourceWidth and
    // sourceHeight are the width and height of a rectangle
    // around image. Taking from Y locations 75 to 155, height
    // of 80 (155 - 75).
    //
    this.sourceX = 0;
    this.sourceY = 75;
    this.sourceWidth = 101;
    this.sourceHeight = 80;
    // Actually width, height of image. Helpful in collision
    // detection
    this.width = this.sourceWidth;
    this.height = this.sourceHeight;
    this.x = 0;
    this.y = 0;
    this.velocity_x = 20;
    this.velocity_y = 0;
}

/*
 * Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.velocity_x * dt;
    this.y = this.y + this.velocity_y * dt;
    // Since not an easy way to remove bug from array,
    // let enemy appear on left side of canvas when it leaves
    // right side
    if (this.x > ctx.canvas.width) this.x = -this.width;
}

/*
 * Draw the enemy on the screen, required method for game
 * Modified this from the original so we can have more
 * flexiblity with image.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.sourceX,
	this.sourceY, this.sourceWidth, this.sourceHeight,
	this.x, this.y, this.width, this.height);
}
/*
 *
 * Get current center of enemy X position
 * Used in collision detection
 *
 */
Enemy.prototype.centerX = function() {
    return (this.x + this.width/2);
}
/*
 *
 * Get current center of enemy Y position
 * Used in collision detection
 *
 */
Enemy.prototype.centerY = function() {
    return (this.y + this.height/2);
}
/*
 * Now write your own player class
 * This class requires an update(), render() and
 * a handleInput() method.
 */
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
    // Next four properties are the locations on the original
    // image.  This makes it easier for collision detection
    // rather than using the full image.  sourceX and sourceY
    // are positions on original image.   sourceWidth and
    // sourceHeight are the width and height of a rectangle
    // around image. Taking from Y locations 50 to 150, height
    // of 100 (150 - 50).
    //
    this.sourceX = 10;
    this.sourceY = 50;
    this.sourceWidth = 80;
    this.sourceHeight = 100;
    // Actually width, height of image. Helpful in collision
    // detection
    this.width = this.sourceWidth;
    this.height = this.sourceHeight;
    this.x = 0;
    this.y = 0;
}
/*
 * Update the player's position, required method for game
 */
Player.prototype.update = function() {
    //	Check that player stays on the canvas.
    //	Don't allow player past right
    if (this.x > ctx.canvas.width - this.width) {
	    this.x = ctx.canvas.width - this.width
		- this.sourceX;
    }
    // Don't allow player past left
    if (this.x < 0) this.x = 1 + this.sourceX;
    // Check to see if player wins! Makes it
    // to blue tile.
    if (this.y < (canvasOffset + tileHeight)) {
	playerWins = true;
	gameOver = true;
    }
    // Check that player stays above
    if (this.y > ctx.canvas.height - this.height - canvasOffset) {
	this.y = ctx.canvas.height - this.height - canvasOffset;
    }
}
/*
 * Draw the player on the screen, required method for game
 * Modified this from the original so we can have more
 * flexiblity with image.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.sourceX,
	this.sourceY, this.sourceWidth, this.sourceHeight,
	this.x, this.y, this.width, this.height);
}
/*
 * Get current center of player X position
 * Used in collision detection
 *
 */
Player.prototype.centerX = function() {
    return (this.x + this.width/2);
}
/*
 *
 * Get current center of player Y position
 * Used in collision detection
 *
 */
Player.prototype.centerY = function() {
    return (this.y + this.height/2);
}
/*
 * Handle Key Input
 */
Player.prototype.handleInput = function(key) {
    switch (key) {
	case "left":
	    if (gameOver == false) {
		this.x = this.x - 101;
	    }
	    break;
	case "right":
	    if (gameOver == false) {
		this.x = this.x + 101;
	    }
	    break;
	case "up":
	    if (gameOver == false) {
		this.y = this.y - 83;
	    }
	    break;
	case "down":
	    if (gameOver == false) {
		this.y = this.y + 83;
	    }
	    break;
	case "space":
	    if (gameRunning == false) {
		createEnemies();
		gameRunning = true;
	    }
	    if (gameOver == true) {
		newGame();
		createEnemies();
	    }
	    break;
    }
}

/*
 * Function to populate enemies array
 */
function createEnemies() {
    //
    // Create 10 enemies at varying velocities and
    // positions
    //
    for (i = 1; i < 11; i++) {
	var newEnemy = new Enemy();
	newEnemy.x = getRandomInt(0,ctx.canvas.width - 
	    newEnemy.width);
	// Center enemy on stone tile.
	newEnemy.y = canvasOffset + getRandomInt(1,4)*tileHeight
	    + 5;
	newEnemy.velocity_x = getRandomInt(20,50);
	allEnemies.push(newEnemy);
    }
}

/*
 * Returns a random integer between min (included) and max (excluded)
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


/* Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 */

var gameRunning = false;
var tileHeight = 83;
var canvasOffset = 44;
var gameOver = false;
var playerWins = false;
var allEnemies = [];
var player = new Player();
var score = 0;
newGame();

/*
 * Starts New Game
 *
 */
function newGame() {
    gameOver = false;
    playerWins = false;
    score = 0;
//
//  Remove all enemies from game if any
//
    while (allEnemies.length > 0) {
	allEnemies.pop();
    }
//
//  Position player centered at bottom in the grass
//
    player.x = Math.round(505/2) - Math.round(player.width/2);
    console.log("original pos ",player.x);
    player.y = 606 - player.height - canvasOffset;
}
/*
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
	32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',	
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
