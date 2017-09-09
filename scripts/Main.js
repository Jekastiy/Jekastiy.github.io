var game = undefined;
var requestAnimFrame = window.requestAnimationFrame ||
					   window.webkitRequestAnimationFrame ||
					   window.mozRequestAnimationFrame ||
					   window.oRequestAnimationFrame ||
					   window.msRequestAnimationFrame;
var BTN_FOCUS = null;

function mouseClick(e) {
	/*for(item of BUTTONS) {
		if(e.clientX > item.X && e.clientX < item.X + item.W && e.clientY > item.Y && e.clientY < item.Y + item.H) {
			item.click();
			break;
		}
	}*/
}

function mouseMove(e) {
	/*for(item of BUTTONS) {
		if(e.clientX > item.X && e.clientX < item.X + item.W && e.clientY > item.Y && e.clientY < item.Y + item.H) {
			if(item != BTN_FOCUS) { 
				item.enter();
				BTN_FOCUS = item; 
			} 

			return;
		}
	}

	if(BTN_FOCUS != null) { 
		BTN_FOCUS.leave();
		BTN_FOCUS = null;
	}*/
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("click", mouseClick, false);

window.onload = () => { 
	if(game == undefined) { 
		game = new Game(window.innerWidth, window.innerHeight);
		game.init();

	}
}

window.onblur = () => { game.pause(); }