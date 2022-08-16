window.onload = init;
window.onblur = function() {
	Pause();
}

/*Глобальные переменные*/
var gameWidth = 800;
var gameHeight = 600;

var bg;  // канвас фона
var ctxBg; // контекст канваса

var game;  // канвас игры и игровых обьектов
var ctxGame; // контекст канваса

var player; // прототип игрока

var background; // прототип фона

var isPlaying; // идет ли игра

var score;
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
		//console.log(e);
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

var imgFire = new Image();
imgFire.src = "game/res/fire1.png";

var imgRocket = new Image();
imgRocket.src = "game/res/rocket.png";

var imgAsteroid = new Image();
imgAsteroid.src = "game/res/asteroids.png";

var imgFireArr = [new Image(), new Image(), new Image(), new Image()];
imgFireArr[0].src = "game/res/fire1.png";
imgFireArr[1].src = "game/res/fire2.png";
imgFireArr[2].src = "game/res/fire3.png";
imgFireArr[3].src = "game/res/fire4.png";


var effectFire = null;

/*Функции*/
function init() // инициализация
{
	score = new Score()
	player = new Player()
	background = new Background()
	
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
	bg_shift--;
	if(bg_shift == 0) bg_shift = 600;
	player.update();
	background.update();

	for(var i = 0; i < enemies.length; i++) enemies[i].update();
	for(var i = 0; i < player.bullets.length; i++) player.bullets[i].update();
	for(var i = 0; i < bullets.length; i++) bullets[i].update();
	for(var i = 0; i < kits.length; i++) kits[i].update();
	laserBullets.forEach((item) => { item.update(); });

	if(scope - tmp_scope > 30) // проверка на КД пули
	{
		player.gun.reduceKD();       // если нужно, уменьшить КД для игрока
		enemySpeed++;				 // увеличить скорость противника
		tmp_scope = scope;  		 // переменные для кд игрока
	}

	if(scope == 100) {
		scope++;
		score.add()
		let tmp_speed = player.gun.speed;
		let tmp_lvl = player.gun.level;
		player.gun = new DoubleLaser();
		player.gun.speed = tmp_speed;
		player.gun.level = tmp_lvl;
		player.gun.init();
	}
	if(scope == 200) {
		scope++;
		score.add()
		let tmp_speed = player.gun.speed;
		let tmp_lvl = player.gun.level;
		player.gun = new RocketGun();
		player.gun.speed = tmp_speed;
		player.gun.level = tmp_lvl;
		player.gun.init();
	}


	if(effectFire != null)
		if (!effectFire.visible) effectFire = null; else effectFire.update();
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
    //for(var i = 0; i < kits.length; i++) kits[i].draw();
    laserBullets.forEach((item) => { LaserBullet.draw(item, ctxGame); });
	//effects.forEach((item)=>{item.draw();});
	if (effectFire != null) effectFire.draw();

	showParameters(player.health, score.getValue())
}

let showParameters = (health, score) => {
	ctxBg.font = "bold 20px Courier New";
	ctxBg.fillStyle = "#F00";
	ctxBg.fillText("Здоровье: " + health, 10, 30);
	ctxBg.fillText("Счет: " + score, 10, 50);
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

let spawnEnemy = (count) => {
	if (isPlaying) {
		while (count > 0) {
			let easy = new Enemy(1, enemySpeed)
			let normal = new Enemy(2, enemySpeed)
			let hard = new Asteroid(1, enemySpeed * 1.5)

			if (scope < 50) {
				enemies.push(easy)
			}
			else {
				enemies.push(normal)

				if (scope > 150) {
					enemies.push(hard)
				}
			}

			count--;
		}
	}
}

function spawnKits()
{
	if (isPlaying && player.health < 15) {
		player.health++;
		draw_effect1 = true;
		draw_effect1_time = 25; 
	}
}

function createBullet(X,Y, speed, damage)
{
	var bullet = new Bullet(X, Y, speed, damage);
	player.bullets.push(bullet);
}

/*Интервал спауна врагов*/
function startSpawnEnemies()
{
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
