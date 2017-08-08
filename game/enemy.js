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
	this.bulletSpeed = this.speed + 3;
	this.KD = 0;

	this.type = 1; 
	// 1 - low
	// 2 - medium
	// 3 - high
}

function Enemy(i_type, i_speed) {
	this.srcX = 0;
	this.srcY = 0;

	this.srcWidth = 180;
	this.srcHeight = 180;

	if(i_type == 3) {
		this.srcWidth = 290;
		this.srcHeight = 290;
	}
	
	var k = 1; // коэффициент размера
	if(i_type == 1) k = 0.5;
	if(i_type == 2)	k = 0.4;
	if(i_type == 3) k = 1.5;

	this.width = this.srcWidth * k;
	this.height = this.srcHeight * k;

	this.drawX = Math.random() * (gameWidth - this.srcWidth);
	this.drawY = 0 - this.height;

	if(i_type == 3) {
		this.drawX = 0;
		this.drawY = -50;
	}
	
	this.speed = i_speed;
	this.bulletSpeed = this.speed + 3;
	this.KD = 0;

	this.type = i_type; 
	/*
	1 - low
	2 - medium
	3 - high 
	*/

	//if(i_type == 3) this.speed = 0.5;	
}

Enemy.prototype.draw = function()
{
	if(this.type == 1) {
		ctxGame.drawImage(imgEnemy, 
			this.srcX, this.srcY, this.srcWidth, this.srcHeight,
			this.drawX,this.drawY, this.width, this.height);
	} else 
		if(this.type == 2) {
			ctxGame.drawImage(imgEnemy2, 
			this.srcX, this.srcY, this.srcWidth, this.srcHeight,
			this.drawX,this.drawY, this.width, this.height);
		} else 
			if(this.type == 3) { 
				ctxGame.drawImage(imgDeathStar, 
				this.srcX, this.srcY, this.srcWidth, this.srcHeight,
				this.drawX,this.drawY, this.width, this.height);
			}
}

Enemy.prototype.update = function()
{
	if(this.type == 3) { 
		this.drawY += this.speed;
		this.drawX += (this.drawX + (this.width * 0.5) < player.axisX)? 0.3: -0.3; // смещение к игроку
		return;
	}


	this.drawY += this.speed; //пролететь вперед
	if(scope > 100) this.drawX += (this.drawX + (this.width * 0.5) < player.axisX)? 0.15: -0.15; // смещение к игроку
	if(this.drawY > gameHeight) this.destroy(); // уничтожение противника за пределами карты

	// стрельнуть по игроку
	if(this.KD <= 0) 
	{
		if (this.drawY > this.height * 0.75) 
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
	var bullet = new Bullet(this.drawX + this.width / 2 - 5, this.drawY + this.height - 25, this.bulletSpeed, this.type);
	bullet.vector = '+';
	bullet.image.src = "game/res/bullet2.png";
	bullets.push(bullet);
}