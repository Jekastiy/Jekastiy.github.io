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
	this.active = true;
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
	this.active = false;
	if(this.vector == '+') // пуля противника
	{
		enemy.bullets = enemy.bullets.filter((number) => {return (number.active)? true: false});
	}
	else // пуля героя
	{
		player.bullets = player.bullets.filter((number) => {return (number.active)? true: false});
	}
}

var laserBullets = [];

var imgRocket = new Image();
imgRocket.src = "game/res/rocket.png";

// Класс одиночного лазера
class LaserBullet {
			constructor(loc, damage, speed) {
				this.damage = damage;
				this.SIZE = { W: 20, H: 26}
				this.LOCATION = loc;
				this.speed = speed;
				this.active = true;
				this.visible = true;
			}

			draw() {
				if(ctx == null) { 
					console.log(`Error: Bullet.Draw() \n${bullet}\n${ctx}`); 
					return; 
				}

				if(this.visible) {
					ctxGame.drawImage(imgBullet, 
						0, 0, 8, 15,
						this.LOCATION.X, this.LOCATION.Y, this.SIZE.W, this.SIZE.H
					);
					//ctx.drawImage(new Image(), 0, 0, 20, 20, 0, 0, 20, 20);
				}
			}

			static draw(bullet = null, ctx = null) {
				if(bullet == null || ctx == null) { 
					console.log(`Error: Bullet.Draw() \n${bullet}\n${ctx}`); 
					return; 
				}

				if(bullet.visible) {
					ctxGame.drawImage(imgRocket, 
						0, 0, 60, 120,
						bullet.LOCATION.X, bullet.LOCATION.Y, bullet.SIZE.W, bullet.SIZE.H
					);
					//ctx.drawImage(new Image(), 0, 0, 20, 20, 0, 0, 20, 20);
				}	
			}

			update() {
				if(this.active) {
					this.LOCATION.Y -= this.speed;

				}

				if(enemies.length != 0) {
					let abs = enemies[0].drawX + enemies[0].width * 0.5;
				
					if( abs > this.LOCATION.X) this.LOCATION.X += 2; else this.LOCATION.X -= 2; 
				}

				for (var j = 0; j < enemies.length; j++) 
				{
					if(this.LOCATION.Y < enemies[j].drawY && 
					   this.LOCATION.X > enemies[j].drawX - 5 &&  
					   this.LOCATION.X < enemies[j].drawX + enemies[j].width - 5)
					{
						this.active = false;
						this.destroy();
						enemies[j].destroy();
						scope++;
						break;
					}
				}
			}

			static isOverlaped(size, loc) {
				if(this.LOCATION.Y < loc.Y || this.LOCATION.Y > loc.Y + size.H) return false;  
				if(this.LOCATION.X < loc.X || this.LOCATION.X > loc.X + size.W) return false;
				return true;
			}

			destroy() {
				this.active = false;
				this.visible = false;
				this.speed = 0;
				this.LOCATION = {X: -1, Y: -1};
				this.damage = 0;
			}
}
