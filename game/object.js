function gameObject(X, Y)
{
	this.img = new Image();
	//this.img.src = "game/res/gameObject.png";

	this.srcX = 0;
	this.srcY = 0;

	this.srcWidth = 235;
	this.srcHeight = 203;

	this.drawX = X;
	this.drawY = Y;

	this.width = 55;
	this.height = 50;

	this.active = true;	

	this.speed = 5;
}


gameObject.prototype.draw = function()
{
	ctxGame.drawImage(imgKit, 
		this.srcX, this.srcY, this.srcWidth, this.srcHeight,
		this.drawX,this.drawY, this.width, this.height);
}

gameObject.prototype.update = function()
{
	this.drawY += this.speed;

	if(this.drawY > gameHeight)
	{
		this.destroy();
	}

	if ((this.drawY + this.height > player.drawY) &&
       ((this.drawX + this.width > player.drawX) || 
	    (this.drawX < player.drawX + player.width)) && 
       this.active)
	{
		player.health++;
		this.active = false;
		this.destroy();
	}
}

gameObject.prototype.destroy = function()
{
	kits.splice(kits.indexOf(this), 1);
}


