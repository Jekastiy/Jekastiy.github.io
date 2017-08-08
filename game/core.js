/*События*/
window.onload = init;
window.onblur = function() {
	Pause();
}


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
var bg_shift;

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

var creatingDeathStar = true;

var effects = [];
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

var draw_effect1 = false;
var draw_effect1_time = 10;


/*Картинки пока что глобально*/
var imgStars = new Image();
imgStars.src = "game/res/stars.png";

var effect1 = new Image();
effect1.src = "game/res/effect1.png";

var effect2 = new Image();
effect2.src = "game/res/effect2.png";

var imgStars1 = new Image();
imgStars.src = "game/res/stars.png";

var imgPlayer = new Image();
imgPlayer.src = "game/res/player1.png";

var imgEnemy = new Image();
imgEnemy.src = "game/res/enemy1.png";

var imgEnemy2 = new Image();
imgEnemy2.src = "game/res/enemy2.png";

var imgDeathStar = new Image();
imgDeathStar.src = "game/res/DeathStar.png"; 

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
	bg_shift = 600;

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
	}

	requestAnimFrame(loop);
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
	bg_shift--;
	if(bg_shift == 0) bg_shift = 600;
	player.update();
	background.update();

	for(var i = 0; i < enemies.length; i++) enemies[i].update();
	for(var i = 0; i < player.bullets.length; i++) player.bullets[i].update();
	for(var i = 0; i < bullets.length; i++) bullets[i].update();
	for(var i = 0; i < kits.length; i++) kits[i].update();

	if(scope - tmp_scope > 20) // проверка на КД пули
	{
		player.gun.reduceKD();       // если нужно, уменьшить КД для игрока
		enemySpeed++;				 // увеличить скорость противника
		tmp_scope = scope;  		 // переменные для кд игрока
	}

	if(scope > 100 && creatingDeathStar == true){
		creatingDeathStar = false;
		stopSpawnEnemies();
		enemies.push(new Enemy(3, 0.4)); 
	}
}

function draw() // отрисовка
{
	clearCtx();
	ctxBg.drawImage(this.imgStars, 0, bg_shift, 600, 600, 0,0,800,600);
	
	for (var i = 0; i < effects.length; i++) {
		var damage_effect = effects[i]; //getDamageEffect();
		if(damage_effect.effect_status) { 
			damage_effect.effect_time--; 
			ctxBg.drawImage(this.effect2, 0, 0, 800, 600, 0, 0, 800, 600); 
			if(damage_effect.effect_time == 0) {
				damage_effect.effect_status = false; 
			}
		} else { 
			effects.splice(i, 1);
			continue; 
		}
	}

	if(draw_effect1) { draw_effect1_time--; ctxBg.drawImage(this.effect1, 0, 0, 800, 600, 0,0,800,600); if(draw_effect1_time == 0) draw_effect1 = false; }
	//background.draw();
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
	if(enemies.length != 0) ctxBg.fillText("Скорость врагов: " + enemies[0].speed, 10, 90);
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
	if(keyChar == ''){

		if(isPlaying) Pause(); else Resume();
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
	if(isPlaying)
	{
		while(count != 0)
		{
			if(scope < 50) {
				enemies.push(new Enemy(1, enemySpeed)); 
			}
			else {
				enemies.push(new Enemy(2, enemySpeed));
			}
			count--;
		}
	}
}

function spawnKits()
{
	player.health++;
	draw_effect1 = true;
	draw_effect1_time = 25;
	//kits.push(new gameObject(getRandomInt(10, gameWidth - 10), 5));
}

function createBullet(X,Y, speed, damage)
{
	var bullet = new Bullet(X, Y, speed, damage);
	player.bullets.push(bullet);
}

/*Интервал спауна врагов*/
function startSpawnEnemies()
{
	//return;
	// stopSpawnEnemies();
	spawnInterval = setInterval(function() { spawnEnemy(spawnAmount) }, spawnTime);
	kitSpawnInterval = setInterval(
		function() { spawnKits() }, 
		15000);
}

function stopSpawnEnemies()
{
	clearInterval(spawnInterval);
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Pause() {
	isPlaying = false;
	document.getElementById('mcanvas').style['opacity'] = "0.8";
}

function Resume() {
	isPlaying = true;
	document.getElementById('mcanvas').style.opacity = "1";
}

function getDamageEffect() {
	var retval = {
		effect_time: 25,
		effect_status: true,
	}
	return retval;
}
