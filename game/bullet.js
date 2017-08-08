// КЛАСС ПУЛИ
function Bullet(X,Y, SpeedBullet, Damage)
{
	this.image = new Image(); // Изображение пули

	this.image.src = "game/res/bullet1.png";
	// координаты и размер пули ресурса
	this.srcX = 0;
	this.srcY = 0;
	this.srcWidth = 10;
	this.srcHeight = 16;

	// ширина и высота картинки
	this.width = this.srcWidth;
	this.height = this.srcHeight;

	// координаты пули, откуда она рисуется
	this.drawX = X; 
	this.drawY = Y; 
	
	this.speed = SpeedBullet;		// скорость пули
	this.damage = 1; 	// урон, причиняемый снарядом
	this.vector = '-';	// направление движения
	this.visible = true;
}

Bullet.prototype.init = function(Source) 
{
	this.image.src = Source;
}

Bullet.prototype.draw = function()
{
	if(this.visible)
		ctxGame.drawImage(this.image, 
		this.srcX, this.srcY, this.srcWidth, this.srcHeight,
		this.drawX,this.drawY, this.width, this.height
		);
}

Bullet.prototype.update = function()
{
	if(this.vector == '-')
	{
		this.drawY -= this.speed;
		if (this.drawY < 0) this.destroy();
	}
	else
	{
		this.drawY += this.speed;
		if (this.drawY > gameHeight) bullets.splice(bullets.indexOf(this), 1);
	}
}

Bullet.prototype.destroy = function()
{
	if(this.vector == '+') // пуля противника
	{
		enemy.bullets.splice(enemy.bullets.indexOf(this), 1);
	}
	else // пуля героя
	{
		player.bullets.splice(player.bullets.indexOf(this), 1);
	}
}