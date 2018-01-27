function Enemy(speed)
{
	this.srcX = 0;
	this.srcY = 0;

	this.srcWidth = 180;
	this.srcHeight = 180;

	this.width = this.srcWidth / 2;
	this.height = this.srcHeight / 2;

	this.drawX = Math.random() * (gameWidth - this.width);
	this.drawY = 0 - this.height;
	
	this.speed = speed;
	this.bulletSpeed = this.speed + 3;
	this.KD = 0;

	this.type = 1; 
	// 1 - low
	// 2 - medium
	// 3 - high

	this.maxHealth = 5;
	this.healthProc = 100;
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

	this.drawX = Math.random() * (gameWidth - this.width);
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

	this.maxHealth = 2; 	// максимальное здоровье
	this.currHealth = 2;	// текущее здоровье
	//this.healthProc = 100;	// в процентах

	if(i_type == 1) {
		this.maxHealth = 2; 	// максимальное здоровье
		this.currHealth = 2;	// текущее здоровье
	} else {
		this.maxHealth = 3; 	// максимальное здоровье
		this.currHealth = 3;	// текущее здоровье
	}
}

Enemy.prototype.draw = function()
{
	if(this.type == 1) {
		ctxGame.drawImage(imgEnemy, 
			this.srcX, this.srcY, this.srcWidth, this.srcHeight,
			this.drawX,this.drawY, this.width, this.height);

			ctxGame.fillStyle = "red";
			ctxGame.fillRect(this.drawX, this.drawY, this.width, 5);
			ctxGame.fillStyle = "green";
			ctxGame.fillRect(this.drawX, this.drawY, (this.currHealth / this.maxHealth) * 100 * (this.width / 100), 5);

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

class Asteroid extends Enemy {
	constructor(i_type, i_speed) {
		super(i_type, i_speed);
		this.rotation = 0;
		this.imageX = 0;
		this.imageY = 0;
		this.rotationAcceleration = 0.05;
		this.width = 40;
		this.height = 55;
		this.type = "Asteroid";
	}

	draw() {
		ctxGame.drawImage(imgAsteroid, 
			this.imageX, this.imageY, 90, 115,
			this.drawX,this.drawY, this.width, this.height
		);
	}

	update() {
		this.drawY += this.speed;
		this.rotation += this.rotationAcceleration; 
		if(this.rotation >= 30) this.rotation = 0;
		if(Math.round(this.rotation) <= 15) {
			this.imageX = Math.round(this.rotation) * 90;
			this.imageY = 0;
		} else
		if(Math.round(this.rotation) >= 16) {
			this.imageX = (Math.round(this.rotation) - 15) * 90;
			this.imageY = 115;
		}
		if(this.drawY > gameHeight) this.destroy();
	}
}