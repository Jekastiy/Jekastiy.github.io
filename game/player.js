function Player()
{
	this.img = new Image();
	this.img.src = "game/res/player1.png";

	this.imgs = [new Image(), new Image(), new Image()];
	this.imgs[0].src = "game/res/player_-3.png";
	this.imgs[1].src = "game/res/player_0.png";
	this.imgs[2].src = "game/res/player_+3.png";

	this.srcX = 0;
	this.srcY = 0;

	this.srcWidth = 198;
	this.srcHeight = 186;

	this.width = this.srcWidth / 2;
	this.height = this.srcHeight / 2;

	this.drawX = (gameWidth / 2) - (this.width / 2);
	this.drawY = gameHeight - this.height;	

	this.axisX = this.drawX * (this.width * 0.5);
	this.axisY = this.drawY * (this.height * 0.5);

	this.speed = 5;
	this.health = 10;

	this.isUp = false;
	this.isDown = false;
	this.isLeft = false;
	this.isRight = false;

	this.isFire = false;

	this.bullets = []; // пули игрока
	this.reloading = new BulletReloading(40); // Перезарядка игрока

	this.acceleration = 0; // боковое ускорение
}


Player.prototype.draw = function()
{
	if(this.acceleration <= -0.5) this.img = this.imgs[0]; else
	if((this.acceleration > - 0.5) && (this.acceleration < 0.5)) this.img = this.imgs[1]; else
	if(this.acceleration >= 0.5) this.img = this.imgs[2];

	ctxGame.drawImage(this.img, 
		this.srcX, this.srcY, this.srcWidth, this.srcHeight,
		this.drawX,this.drawY, this.width, this.height
		);
	//ctxGame.fillStyle = "green";
	//ctxGame.fillRect(this.drawX, this.drawY, this.width, this.height);
	//drawCenter(this.axisX, this.axisY, this.width, this.height);
}

Player.prototype.update = function()
{
	this.chooseDir();

	/*
	for(var i = 0; i < kits.length; i++) {
		if((this.drawX < kits[i].drawX + kits[i].width) || 
			(this.drawX + this.width > kits[i].drawX) || 
			(this.drawY < kits[i].drawY + kits[i].height) || 
			(this.drawY + this.height > kits[i].drawY)) 
		{
			this.health++;
			draw_effect1 = true;
			draw_effect1_time = 25;
			kits[i].active = false;
		}
	}
	*/

	for(var i = 0; i < enemies.length; i++)
	{
		if (this.drawX - 5 + this.width > enemies[i].drawX  -5 && // по вертикали наезжаем
			this.drawX - 5 < enemies[i].drawX + enemies[i].width -5 &&

			this.drawY - 5 + this.height > enemies[i].drawY  -5 && // по горизонтали наезжаем
			this.drawY - 5 < enemies[i].drawY + enemies[i].height -5) 
			{
				if(enemies[i].type == 3) {	
					var to_x = ((this.drawX < (enemies[i].drawX + enemies[i].width * 0.75)) || (this.drawX + this.width > (enemies[i].drawX + enemies[i].width * 0.25)));
					var to_y = (this.drawY < enemies[i].drawY + enemies[i].height * 0.75);
					if(to_x && to_y) { 
						this.health--;
						if (this.health <= 0) document.location.href = "./game_over.html";
					}
				} else { 
					enemies[i].destroy();
					this.health--;
					if (this.health <= 0) {
						document.location.href = "./game_over.html";
					}
				}
			}
	}

	for(var i = 0; i < this.bullets.length; i++)
	{
		for (var j = 0; j < enemies.length; j++) 
		{
			if(this.bullets[i].drawY < enemies[j].drawY && 
			   this.bullets[i].drawX > enemies[j].drawX - 5 &&  
			   this.bullets[i].drawX < enemies[j].drawX + enemies[j].width - 5)
			{
				this.bullets[i].destroy();
				enemies[j].destroy();
				scope++;
				break;
			}
		}
	}

	for (var i = 0; i < bullets.length; i++) 
	{
		if((bullets[i].drawY > this.drawY) &&
			(bullets[i].drawX > this.drawX) && 
			(bullets[i].drawX < this.drawX + this.width))
		{
			bullets.splice(bullets.indexOf(bullets[i]), 1);
			this.health--;
			effects.push(getDamageEffect());

			if (this.health <= 0) 
					{
						document.location.href = "./game_over.html";
					}	
		}
	}

	// kd --
	this.reloading.reduce();

	if(this.acceleration < 0) 
		this.acceleration += 0.1; 
	else
	if(this.acceleration > 0) 
		this.acceleration -= 0.1; 
}


Player.prototype.chooseDir = function()
{
	if (this.isLeft && (this.drawX > 0)) {	
		this.drawX -= this.speed;
		if(this.acceleration > -1) this.acceleration -= 0.2; 
	}

	if (this.isRight && (this.drawX < gameWidth-this.width)) {
		this.drawX += this.speed;
		if(this.acceleration < 1) this.acceleration += 0.2; 
	}
	
	if (this.isUp && (this.drawY > 0)) 		
		this.drawY -= this.speed;

	if (this.isDown &&(this.drawY < gameHeight-this.height))	
		this.drawY += this.speed;

	if (this.isFire)
	{
		if(this.reloading.isReady()) 
			{ 
				createBullet(player.drawX, player.drawY + 15, 5, 5);
				createBullet(player.drawX + player.width - 10, player.drawY + 15, 5, 5);	
			}
	}

	this.axisX = this.drawX + (this.width * 0.5);
}

Player.prototype.resetHealth = function()
{
	this.health = 10;
}


// класс кулдауна
function BulletReloading(kd)
{
	this.reload_value = kd;
	this.tmp_reload_value = 0;
	this.KD = kd;
}

BulletReloading.prototype.isReady = function()
{
	if(this.reload_value <= 0) {
		this.reload_value = this.KD;
		return true;
	} else
		return false;
}

BulletReloading.prototype.reduce = function()
{
	this.reload_value--;
}

BulletReloading.prototype.reduceKD = function()
{
	this.KD--;
}

