function Player()
{
	this.img = new Image();
	this.img.src = "game/res/player1.png";

	this.srcX = 0;
	this.srcY = 0;

	this.srcWidth = 198;
	this.srcHeight = 186;

	this.width = this.srcWidth / 2;
	this.height = this.srcHeight / 2;

	this.drawX = (gameWidth / 2) - (this.width / 2);
	this.drawY = gameHeight - this.height;	

	this.speed = 5;
	this.health = 10;

	this.isUp = false;
	this.isDown = false;
	this.isLeft = false;
	this.isRight = false;

	this.isFire = false;
	this.KD = 0;

	this.valueKD = 40;

	this.bullets = []; // пули игрока
}


Player.prototype.draw = function()
{
	ctxGame.drawImage(this.img, 
		this.srcX, this.srcY, this.srcWidth, this.srcHeight,
		this.drawX,this.drawY, this.width, this.height
		);
}

Player.prototype.update = function()
{
	this.chooseDir();

	for(var i = 0; i < enemies.length; i++)
	{
		if (this.drawX - 5 + this.width > enemies[i].drawX  -5 && // по вертикали наезжаем
			this.drawX - 5 < enemies[i].drawX + enemies[i].width -5 &&

			this.drawY - 5 + this.height > enemies[i].drawY  -5 && // по горизонтали наезжаем
			this.drawY - 5 < enemies[i].drawY + enemies[i].height -5) 
			{
				enemies[i].destroy();

				this.health--;
				if (this.health <= 0) 
					{
						document.getElementById("game").style.display = "none";
						document.getElementById("bg").style.display = "none";

						game_over = document.getElementById("game_over");
						go_ctx = game_over.getContext("2d");
	
						go_ctx.width = gameWidth;
						go_ctx.height = gameHeight;
	
						go_ctx.font = "bold 20px Arial";
						go_ctx.fillStyle = "#F00";
						go_ctx.fillText("Начать заново", 50, 150);
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

			if (this.health <= 0) 
					{
						document.getElementById("game").style.display = "none";
						document.getElementById("bg").style.display = "none";

						game_over = document.getElementById("game_over");
						go_ctx = game_over.getContext("2d");
	
						go_ctx.width = gameWidth;
						go_ctx.height = gameHeight;
	
						go_ctx.font = "bold 20px Arial";
						go_ctx.fillStyle = "#F00";
						go_ctx.fillText("Начать заново", 50, 150);
					}	
		}
	}

	this.KD--;
}


Player.prototype.chooseDir = function()
{
	if (this.isLeft && (this.drawX > 0)) 	
		this.drawX -= this.speed;

	if (this.isRight && (this.drawX < gameWidth-this.width))
		this.drawX += this.speed;
	
	if (this.isUp && (this.drawY > 0)) 		
		this.drawY -= this.speed;

	if (this.isDown &&(this.drawY < gameHeight-this.height))	
		this.drawY += this.speed;

	if (this.isFire)
	{
		if(this.KD <= 0) 
			{ 
				createBullet(player.drawX, player.drawY, 5, 5);
				createBullet(player.drawX + player.width, player.drawY, 5, 5);
				this.KD = this.valueKD;	
			}
	}
}

Player.prototype.resetHealth = function()
{
	this.health = 10;
}

