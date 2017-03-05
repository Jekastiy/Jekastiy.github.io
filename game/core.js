/*События*/
window.onload = init;

/*Глобальные переменные*/
var gameWidth = 800; // размеры поля
var gameHeight = 600;

var bg;  // канвас фона
var ctxBg; // контекст канваса

var game;  // канвас игры и игровых обьектов
var ctxGame; // контекст канваса

var player; // прототип игрока

var background; // прототип фона

var isPlaying; // идет ли игра

var scope; // количество сбитых самолетов империи
var tmp_scope;

// Для создания врагов
var enemies = []; // враги
var bullets = []; // bullets of enemis
var kits = [];

var enemySpeed = 3;
var spawnInterval;
var spawnTime = 500;
var spawnAmount = 1;

var kitSpawnInterval;

var tmp_flag = false;
/// для мыши	
{
	var mouseX;
	var mouseY;

	function mouseMove(e)
	{
		mouseX = e.pageX - game.offsetLeft;
		mouseY = e.pageY - game.offsetTop;
		//document.getElementById("gameName").innerHTML = "X: " + mouseX + " Y: "+mouseY;
	}

	function mouseClick(e)
	{
		//player.drawX = e.pageX - 200;//- player.width/2;
		//player.drawY = e.pageY - game.offsetTop;//- player.height/2;


	}

}


var requestAnimFrame = window.requestAnimationFrame ||
					   window.webkitRequestAnimationFrame ||
					   window.mozRequestAnimationFrame ||
					   window.oRequestAnimationFrame ||
					   window.msRequestAnimationFrame;


/*Картинки пока что глобально*/
var imgStars = new Image();
imgStars.src = "game/res/stars.png";

var imgStars1 = new Image();
imgStars.src = "game/res/stars.png";

var imgPlayer = new Image();
imgPlayer.src = "game/res/player1.png";

var imgEnemy = new Image();
imgEnemy.src = "game/res/enemy1.png";

var imgBullet = new Image();
imgBullet.src = "game/res/bullet1.png";

var imgKit = new Image();
imgKit.src = "game/res/gameObject.png";

/*Функции*/
function init() // инициализация
{ 
	player = new Player();
	background = new Bg();
	scope = 0;
	tmp_scope = 0;

	bg = document.getElementById("bg");
	ctxBg = bg.getContext("2d");

	game = document.getElementById("game");
	ctxGame = game.getContext("2d");
	
	bg.width = gameWidth;
	bg.height = gameHeight;

	game.width = gameWidth;
	game.height = gameHeight;

	startLoop();

	document.addEventListener("mousemove", mouseMove, false);
	document.addEventListener("click", mouseClick, false);

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
}

function loop()
{
	if (isPlaying)
	{
		update();
		draw();
		requestAnimFrame(loop);
	}
}

function startLoop()
{ 
	isPlaying = true; 
	startSpawnEnemies();
	loop(); 
}

function stopLoop() 
{ 
	isPlaying = false; 
}

function update() 
{ 
	//console.log("loop"); 
	player.update();
	background.update();

	for(var i = 0; i < enemies.length; i++) enemies[i].update();
	for(var i = 0; i < player.bullets.length; i++) player.bullets[i].update();
	for(var i = 0; i < bullets.length; i++) bullets[i].update();
	for(var i = 0; i < kits.length; i++) kits[i].update();

	if(scope - tmp_scope > 50)
	{
		enemySpeed++;
		if(player.valueKD > 5) player.valueKD -= 5;
		tmp_scope = scope;
	}
}

function draw() // отрисовка
{
	clearCtx();

	background.draw();
	player.draw();
	
	for(var i = 0; i < enemies.length; i++) enemies[i].draw();
	for(var i = 0; i < player.bullets.length; i++) player.bullets[i].draw();
    for(var i = 0; i < bullets.length; i++) bullets[i].draw();
    for(var i = 0; i < kits.length; i++) kits[i].draw();

    ctxBg.font = "bold 20px Arial";
	ctxBg.fillStyle = "#F00";
	ctxBg.fillText("Здоровье: " + player.health, 10, 30);
	ctxBg.fillText("Счет: " + scope, 10, 50);
	ctxBg.fillText("Враги: " + enemies.length, 10, 70);
}

function clearCtx()
{
	ctxGame.clearRect(0, 0, gameWidth, gameHeight);
	ctxBg.clearRect(0, 0, gameWidth, gameHeight);
}

/*реагирование на мышь*/
function checkKeyDown(e)
{
	var keyID = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyID);

	if (keyChar == "W") 
	{
		player.isUp = true;
		e.preventDefault();
	}
	if (keyChar == "A") 
	{
		player.isLeft = true;
		e.preventDefault();
	}
	if (keyChar == "S") 
	{
		player.isDown = true;
		e.preventDefault();
	}
	if (keyChar == "D") 
	{
		player.isRight = true;
		e.preventDefault();
	}
	if (keyChar == " ")
	{
		player.isFire = true;
		e.preventDefault();
	}
}

function checkKeyUp(e)
{
	var keyID = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyID);

	if (keyChar == "W") 
	{
		player.isUp = false;
		e.preventDefault();
	}
	if (keyChar == "A") 
	{
		player.isLeft = false;
		e.preventDefault();
	}
	if (keyChar == "S") 
	{
		player.isDown = false;
		e.preventDefault();
	}
	if (keyChar == "D") 
	{
		player.isRight = false;
		e.preventDefault();
	}
	if (keyChar == " ")
	{
		player.isFire = false;	
		e.preventDefault();
	}
}

/*Функция спауна врагов*/
function spawnEnemy(count)
{
	while(count != 0)
	{
		enemies.push(new Enemy(enemySpeed));
		count--;
	}
}

function spawnKits()
{
	var kit = new gameObject(gameWidth / 2, 5);
	kits.push(kit);
}

function createBullet(X,Y, speed, damage)
{
	var bullet = new Bullet(X, Y, speed, damage);
	player.bullets.push(bullet);
}

/*Интервал спауна врагов*/
function startSpawnEnemies()
{
	// stopSpawnEnemies();
	spawnInterval = setInterval(
		function() { spawnEnemy(spawnAmount) }
		,spawnTime
		);
	kitSpawnInterval = setInterval(
		function() { spawnKits() }, 
		10000);
}

function stopSpawnEnemies()
{
	clearInterval(spawnInterval);
}