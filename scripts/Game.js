/*События*/
class Game {
	constructor(width, height) {
		this.SIZE = { W: width, H: height };
		this.STATE = 1;

		this.ctx = document.getElementById("game").getContext("2d");
		this.ctx.width = this.SIZE.W;
		this.ctx.height = this.SIZE.H;

		this.mode = 'MENU';
		this.currentLevel = new Level();
	}

	update() {
		if(this.MODE = 'MENU') {

		}
	}

	draw() {
		this.ctx.clearRect(0, 0, this.SIZE.W, this.SIZE.H);

		if(this.MODE = 'MENU') {
			for (var btn of BUTTONS) { btn.draw(); } 
			//this.ctx.drawRect(5,5,80,50);
		}
	}

	start() {
		this.STATE = 1;
		Game.gameLoop();
	}

	stop() {
		this.STATE = 0;
	}

	static gameLoop() {
		if(game.STATE == 1) {
			game.update();
			game.draw();	
		}
		requestAnimFrame(Game.gameLoop);	
	}

	init() {
		this.start();
	}

	loadLevel(level = null) {
		if(typeof(level) != 'Level') throw new TypeError("Error: Game.loadLevel()");
	}

	pause() {
		if(this.STATE == 1) this.STATE = 0;
	}

	resume() {
		if(this.STATE == 0) this.STATE = 1;
	}
}