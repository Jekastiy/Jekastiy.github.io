function Player()
{
	this.img = new Image();

	this.imgs = [new Image(), new Image(), new Image()];
	this.imgs[0].src = "game/res/player_-3.png";
	this.imgs[1].src = "game/res/player_0.png";
	this.imgs[2].src = "game/res/player_+3.png";

	// Source image
	this.srcX = 0;
	this.srcY = 0;
	this.srcWidth = 198;
	this.srcHeight = 186;

	// Game object
	this.width = this.srcWidth * 0.5;
	this.height = this.srcHeight * 0.5;
	this.drawX = (gameWidth * 0.5) - (this.width * 0.5);
	this.drawY = gameHeight - this.height;	
	
	// Central AXIS
	this.axisX = this.drawX * (this.width * 0.5);
	this.axisY = this.drawY * (this.height * 0.5);

	// Game params
	this.speed = 5;
	this.health = 10;

	// Gun
	this.gun = new MonoLaser(); // взять на вооружение одноствольный лазер

	this.isUp = false;
	this.isDown = false;
	this.isLeft = false;
	this.isRight = false;
	this.isFire = false;

	this.bullets = []; // пули игрока

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

Player.prototype.isOverlapsed = function(loc_size) {
	if((this.drawY > loc_size.Y + loc_size.H) && (this.drawY + this.height < loc_size.Y)) {
		if((this.drawX > loc_size.X + loc_size.W) && (this.drawX + this.width < loc_size.X)) 
			return false; 
		else 
			return true;
	} else 
		return false;
}

Player.prototype.update = function()
{
	this.chooseDir();

	// Столкновения с противниками
	for(var i = 0; i < enemies.length; i++)
	{	
		if(this.isOverlapsed({ X: enemies[i].drawX, Y: enemies[i].drawY, W: enemies[i].width, H: enemies[i].height }))
		{	
			if(enemies[i].type == 3)
			this.health--;
			effects.push(getDamageEffect());

			if (this.health <= 0) { 
				Pause();
				document.location.href = "./game_over.html";
			} 
		}
	}
	
	// Столкновение с пулями
	for (var i = 0; i < bullets.length; i++) 
	{
		if(bullets[i].vector == "+")
		if(bullets[i].drawY > this.drawY) 
			if(bullets[i].drawX > this.drawX && bullets[i].drawX < this.drawX + this.width)
			{
				this.health-= bullets[i].damage;
				bullets.splice(bullets.indexOf(bullets[i]), 1);
				effects.push(getDamageEffect());

				if (this.health <= 0) { Pause(); document.location.href = "./game_over.html"; }
			}
	}

		//var R_X = this.drawX - 5 > enemies[i].drawX + enemies[i].width + 5;
		//var L_X = this.drawX + this.width - 5 < enemies[i].drawX + 5;
		//var B_Y = this.drawY + 5 > enemies[i].drawY + enemies[i].height - 5;
		//var T_Y = this.drawY + this.height -5 < enemies[i].drawY + 5;

		//if(R_X && L_X && B_Y && T_Y) {
		//	console.log(this);
		//	console.log(enemies[i]);
		//	Pause();
		//}

	for(var i = 0; i < this.bullets.length; i++)
	{
		for (var j = 0; j < enemies.length; j++) 
		{
			if(this.bullets[i].drawY < enemies[j].drawY && 
			   this.bullets[i].drawX > enemies[j].drawX - 5 &&  
			   this.bullets[i].drawX < enemies[j].drawX + enemies[j].width - 5)
			{
				this.bullets[i].visible = false;
				this.bullets[i].destroy();
				if(enemies[j].type != 3) enemies[j].destroy();
				scope++;
				break;
			}
		}
	}

	// kd --
	this.gun.reduce();

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

	if (this.isFire && this.gun.isReady()) this.gun.fire(); // огонь по противнику

	this.axisX = this.drawX + (this.width * 0.5);
}

Player.prototype.resetHealth = function()
{
	this.health = 10;
}