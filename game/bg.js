function Bg()
{
	this.srcX = 0;
	this.srcY = 0;

	this.srcWidth = 800;
	this.srcHeight = 600;

	this.width = 800;
	this.height = 600;

	this.drawX = 0;
	this.drawY = 0;

	this.speed = 1;

	this.tmp = 1;

}

Bg.prototype.draw = function()
{
	/*ctxBg.drawImage(imgStars, 
		this.srcX, 
		this.srcY, 
		this.srcWidth, 
		this.srcHeight,
		this.drawX,
		this.drawY, 
		this.width, 
		this.height);
	ctxBg.drawImage(imgStars, 
		this.srcX, 
		this.srcY, 
		this.srcWidth, 
		this.srcHeight,
		this.drawX,
		this.drawY, 
		this.width, 
		this.height);*/
	
 	//ctxBg.font = "bold 20px Arial";
	//ctxBg.fillStyle = "#F00";
	//ctxBg.fillText("Всего врагов: " + enemies.length, 10, 30);
	//ctxBg.fillText("Здоровье: " + player.health, 10, 50);
}

Bg.prototype.update = function()
{
	//if (this.drawY > gameHeight) {this.drawY = 0; this.tmp = 0;}
	if (this.drawY > 0) {this.drawY = -300; this.tmp = 0;}

	this.drawY += this.speed;
	this.tmp += this.speed;
}