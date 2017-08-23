class Effect {
	constructor(X, Y, W, H) {
		this.X = X;
		this.Y = Y;
		this.W = W;
		this.H = H;
		this.imgs = [];
		this.index = 0;
		this.duration = 80;
		this.curr_duration = 0;
		this.visible = true;
	}

	getDrawImage() {
		return this.imgs[this.index];
	}

	loadImages(paths) {
		this.imgs = imgFireArr;

		/*paths = ['game/res/fire1.png', 'game/res/fire2.png', 'game/res/fire3.png', 'game/res/fire4.png'];
		let tmp = paths.lenght;
		for(let i = 0; i < tmp; i++){
			this.imgs[i] = new Image();
			this.imgs[i].src = paths[i];
		}*/
	}

	update() {
		if(this.visible) {
			this.Y+=2;
			if(this.curr_duration > 0 && this.curr_duration <= 20) this.index = 0;
			if(this.curr_duration > 20 && this.curr_duration <= 40) this.index = 1;
			if(this.curr_duration > 40 && this.curr_duration <= 60) this.index = 2;
			if(this.curr_duration > 60 && this.curr_duration <= 70) this.index = 3;
			this.curr_duration += 2;
			if(this.curr_duration === this.duration) this.visible = false; 
		}
	}

	draw() {
		if(this.visible) {
			ctxGame.drawImage(this.imgs[this.index], 0, 0, 200, 200, this.X, this.Y, this.W, this.H);
		}
	}
}