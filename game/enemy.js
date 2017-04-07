function Enemy(speed)
{
	this.srcX = 0;
	this.srcY = 0;

	this.srcWidth = 180;
	this.srcHeight = 180;

	this.width = this.srcWidth / 2;
	this.height = this.srcHeight / 2;

	this.drawX = Math.random() * (gameWidth - this.srcWidth);
	this.drawY = 0 - this.height;
	
	this.speed = speed;
	this.KD = 50;
}


Enemy.prototype.draw = function()
{
	ctxGame.drawImage(imgEnemy, 
		this.srcX, this.srcY, this.srcWidth, this.srcHeight,
		this.drawX,this.drawY, this.width, this.height
		);
}

Enemy.prototype.update = function()
{
	this.drawY += this.speed;
	if (this.drawY > gameHeight)
	{
	 	this.destroy();
	}

	if(this.KD <= 0) 
	{
		if (this.drawY > this.height) 
		{
			this.fire();
			this.KD = 50;
		}
	} 
	else 
	{
		this.KD--;
	}

}

Enemy.prototype.destroy = function()
{
	enemies.splice(enemies.indexOf(this), 1);
}

Enemy.prototype.fire = function()
{
	var bullet = new Bullet(this.drawX + this.width / 2 - 5, this.drawY + this.height - 25, this.speed * 2, 1);
	bullet.vector = '+';
	bullet.image.src = "game/res/bullet2.png";
	bullets.push(bullet);
}