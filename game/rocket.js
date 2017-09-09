class Rocket extends Bullet {
	constructor(_X,_Y, _Speed) {
		super(_X, _Y, 1, 1);
		this.image = imgRocket;
		this.srcWidth = 60;
		this.srcHeight = 120;
		this.width = 20;
		this.height = 40;
		this.speed = _Speed;	
		this.target = null;

		this.getTarget = function(){
			let max = 0;

			enemies.forEach((item)=>{ 
				if((item.drawX < player.drawX + player.width || item.drawX + item.width > player.drawX) && (item.drawY + item.height > max)) {
					max = item.drawY + item.height;
					this.target = item;
				}
			});
		}

		this.getTarget();

		// delete
		delete this.vector;
	}

	draw()
	{
		if(this.visible)
			ctxGame.drawImage(this.image, 
			this.srcX, this.srcY, this.srcWidth, this.srcHeight,
			this.drawX,this.drawY, this.width, this.height
			);
	}

	update()
	{
		this.drawY -= this.speed;

		if(this.target != null) { 
			if(this.drawX > this.target.drawX + this.target.width * 0.5) this.drawX-=2; else this.drawX+=2;
		} else {

		}

		if (this.drawY < 0) this.destroy();
	}

	destroy()
	{
		this.active = false;
		player.bullets = player.bullets.filter((number) => {return (number.active)? true: false});
	}

	getTarget(){
		let max = 0;

		enemies.forEach((item)=>{ 
			if((item.drawX < player.drawX + player.width || item.drawX + item.width > player.drawX) && (item.drawY + item.height > max)) {
				max = item.drawY + item.height;
				this.target = item;
			}
		});
	}
}