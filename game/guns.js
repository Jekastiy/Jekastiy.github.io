function getGun(argument) {
	switch(argument)
	{
		case 1: return static_GUNS[0]; break;
		case 2: return static_GUNS[1]; break;
		case 3: return static_GUNS[2]; break;
		default: return null;
	}
}

var static_GUNS = [
	{
		type: 1, 	// тип оружия
		KD: 50,		// его кулдаун
		reload_value: 0,
		fire() {
			createBullet(player.drawX + (player.width * 0.5), player.drawY + 15, 5, 5);
		},
		isReady() {
			if(this.reload_value <= 0) {
				this.reload_value = this.KD;
				return true;
			} else
				return false;
		},
		reduce(){
			this.reload_value--;
		},
		reduceKD(){
			if(this.KD - 10 < 5) return; 
				this.KD -= 10;
		}
	}, {
		type: 2, 	// спаренное оружие, стреляет поочередно с разных крыльев
		KD: 20,		// его кулдаун
		reload_value: 0,
		queuee: true,
		fire() {
			if(this.queuee)
				createBullet(player.drawX, player.drawY + 15, 5, 5); // здесь поочередное создание пуль игрока
			else 
				createBullet(player.drawX + (player.width - 5), player.drawY + 15, 5, 5); // здесь поочередное создание пуль игрока
			this.queuee = !this.queuee;
		},
		isReady() {
			if(this.reload_value <= 0) {
				this.reload_value = this.KD;
				return true;
			} else
				return false;
		},
		reduce(){
			this.reload_value--;
		},
		reduceKD(){
			if(this.KD - 10 < 5) return; 
				this.KD -= 10;
		}
	}, {
		type: 3, 	// ракетница
		KD: 10,		// его кулдаун
		fire() {
			// здесь создание пуль игрока
		}
	}
];

class Gun {
	constructor(id, kd, damage) {
	  this.id = id;
	  this.damage = damage;
	  this.KD = kd;
	  this.reload_value = 0;
	  this.level = 0;
	  this.speed = 5;
	}

	fire() {
		return "You damage enemy: " + this.damage + "p from gun №" + this.id;
	}

	isReady() {
		if(this.reload_value <= 0) {
			this.reload_value = this.KD;
			return true;
		} else
			return false;
	}

	reduce() {
		this.reload_value--;
	}

	reduceKD() {
		this.levelUp();
	}

	levelUp() {
		if(this.level < 5) {
			this.level++;
			this.damage += 1;
			this.speed += 0.5;
			let tmp = [50, 40, 35, 25, 20, 15];
			this.KD = tmp[this.level];
		}
	}
}

class MonoLaser extends Gun {
	constructor() {
		super(0, 50, 1);
	}

	fire() {
		createBullet(player.drawX + (player.width * 0.5), player.drawY + 15, this.speed, 5);
		//laserBullets.push(new LaserBullet({X: player.drawX + (player.width * 0.5) - 5, Y: player.drawY + 15}, 2, this.speed));
	}
}

class DoubleLaser extends Gun {
	constructor(){
		super(1, 40, 1);
		this.side = true;
	}

	init() {
		let tmp = [40, 30, 25, 20, 15, 10];
		this.KD = tmp[this.level];
	}

	fire() {
		if(this.side) {
			createBullet(player.drawX, player.drawY, this.speed, 5);
		} else {
			createBullet(player.drawX + player.width - 5, player.drawY, this.speed, 5);
		}
		this.swapSide();
	}

	levelUp() {
		if(this.level < 5) {
			this.level++;
			this.damage += 1;
			this.speed += 0.5;
			let tmp = [40, 30, 25, 20, 15, 10];
			this.KD = tmp[this.level];
		}
	}

	swapSide() {
		this.side = !this.side;
	}
}