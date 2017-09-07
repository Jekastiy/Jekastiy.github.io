class Button {
	constructor(_X, _Y, _W, _H) {
		this.W = _W;
		this.H = _H;
		this.X = _X;
		this.Y = _Y;

		this.X2 = 0;
		this.Y2 = 0;

		this.X1 = 0;
		this.Y1 = 0;

		this.SIZE_NORMAL = { W: this.W, H: this.H, X: this.X, Y: this.Y };
		this.SIZE_ENTER = { W: this.W - 2, H: this.H - 2, X: this.X + 2, Y: this.Y + 2 };
		this.SIZE_PRESS = { W: this.W - 3, H: this.H - 3, X: this.X + 3, Y: this.Y + 3 };
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