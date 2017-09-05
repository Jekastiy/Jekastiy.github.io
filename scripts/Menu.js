class Button {
	constructor(_X, _Y, _W, _H) {
		this.W = 80;
		this.H = 55;
		this.X = 0;
		this.Y = 0;

		this.X2 = 0;
		this.Y2 = 0;

		this.X1 = 0;
		this.Y1 = 0;

		this.SIZE_NORMAL = { W: 80, H: 55, X: 5, Y: 5 };
		this.SIZE_ENTER = { W: 78, H: 53, X: 6, Y: 6 };
		this.SIZE_PRESS = { W: 76, H: 51, X: 7, Y: 7 };
	}

	setSizeNormal(s = this.SIZE_NORMAL) {
		this.X = s.X;
		this.Y = s.Y;
		this.H = s.H;
		this.W = s.W;
	}

	setSizeEnter(s = this.SIZE_ENTER) {
		this.X = s.X;
		this.Y = s.Y;
		this.H = s.H;
		this.W = s.W;
	}

	setSize(size) {
		this.W = size.W;
		this.H = size.H;
	}

	setLocation(loc) {
		this.X = loc.X;
		this.Y = loc.Y;
	}

	click() {

	}

	enter() {

	}

	leave() {

	}

	draw() {
		game.ctx.fillRect(this.X, this.Y, this.W, this.H);
	}

	getRight() {
		return this.X + this.W;
	}
	
	getLeft() {
		return this.X;
	}
	
	getTop() {
		return this.Y;
	}
	
	getBottom() {
		return this.Y + this.H;
	}
}

var BUTTONS = [new Button(), new Button()];

BUTTONS[0].setLocation({ X: 5, Y: 5});
BUTTONS[0].setSize({ W: 80, H: 55});
BUTTONS[0].click = function() { if(gold - 100 > 0) { gold -= 100; console.log(`Gold: ${gold}`);}}
BUTTONS[0].enter = function() { this.setSizeEnter(); }
BUTTONS[0].leave = function() { this.setSizeNormal(); }


BUTTONS[1].setLocation({ X: BUTTONS[0].getRight() + 5, Y: 5});
BUTTONS[1].setSize({ W: 80, H: 55});
BUTTONS[1].click = function() { gold += 1; console.log(`Gold: ${gold}`);}
