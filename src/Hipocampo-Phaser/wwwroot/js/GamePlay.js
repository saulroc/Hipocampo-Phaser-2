var gameSettings = {
    playerSpeed: 200,
    AMAUNT_DIAMONDS: 30,
    timeGame: 30,
    AMAUNT_BUBBLES: 10
}

var config = {
    width: 1136,
    height: 647,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    /*scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },*/
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

GamePlayManager = {
	init: function() {
		
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		
		this.flagFirstMouseDown = false;
		//this.amauntDiamondsCaught = 0;
		//this.endGame = false;
		
		//this.countSmile = -1;
	},
	preload: function() {
		
		//game.load.image('background','../images/background.png');
		//game.load.spritesheet('horse', '../images/horse.png', 84, 156, 2);
		//game.load.spritesheet('diamonds', '../images/diamonds.png', 81, 84, 4);
		
		//game.load.image('explosion', '../images/explosion.png');
		//game.load.image('shark', '../images/shark.png');
		//game.load.image('fishes', '../images/fishes.png');
		//game.load.image('medusa', '../images/mollusk.png');
		
		//game.load.image('booble1', '../images/booble1.png');
		//game.load.image('booble2', '../images/booble2.png');
		
	},
	create: function() {
		
		//game.add.sprite(0, 0, 'background');
		
		//this.boobleArray = [];
		//for (var i = 0; i<AMAUNT_BOOBLES; i++) {
		//	var xBooble = game.rnd.integerInRange(1, game.width - 50);
		//	var yBooble = game.rnd.integerInRange(game.height / 2, game.height * 1.25);
			
		//	var booble = game.add.sprite(xBooble,yBooble, 'booble' + game.rnd.integerInRange(1,2));
		//	booble.vel = 0.2 + game.rnd.frac() * 2;
		//	booble.alpha = 0.9;
		//	booble.scale.setTo(0.2 + game.rnd.frac());
		//	this.boobleArray.push(booble);
		//}
		
		
		//this.medusa = game.add.sprite(500, 150, 'medusa');
		//this.shark = game.add.sprite(500, 20, 'shark');
		//this.fishes = game.add.sprite(120, 500, 'fishes');
				
		//this.horse = game.add.sprite(0, 0, 'horse');
		//this.horse.frame = 0;
		//this.horse.x = game.width/2;
		//this.horse.y = game.height/2;
		//this.horse.anchor.setTo(0.5, 0.5);
		//this.horse.scale.setTo(0.5);
		//this.horse.hurt = false;
		//this.horse.tweenAlpha = game.add.tween(this.horse).to({
		//		alpha:[1, 0.5, 0, 0.5, 1]
		//		}, 630, Phaser.Easing.Exponential.Out, false, 0, 3, false);
				
		//game.input.onDown.add(this.onTap, this);
		

		//this.medusa.tweenMedusa = game.add.tween(this.medusa.position).to({
		//	y:-0.031
		//	}, 5800, Phaser.Easing.Bounce.InOut, false, 0, 1000, true);
		
		//this.diamonds = [];
		//for (var i = 0; i < AMAUNT_DIAMONDS; i++ )
		//{
		//	var diamond = game.add.sprite(100, 100, 'diamonds');
			
		//	this.putDiamond(diamond);
			
		//	this.diamonds.push(diamond);
		//}
		
		//this.explosionGroup = game.add.group();
		
		//for (var i = 0; i<10; i++) {
		//	this.explosion = this.explosionGroup.create(100, 100, 'explosion');
		//	this.explosion.tweenScale = game.add.tween(this.explosion.scale).to({
		//		x:[0.4, 0.8, 0.4], 
		//		y:[0.4, 0.8, 0.4]
		//		}, 630, Phaser.Easing.Exponential.Out, false, 0, 0, false);
			
		//	this.explosion.tweenAlpha = game.add.tween(this.explosion).to({
		//		alpha:[1, 0.6, 0]
		//		}, 630, Phaser.Easing.Exponential.Out, false, 0, 0, false);
		//	this.explosion.anchor.setTo(0.5);
		//	this.explosion.kill();
		//}
		
		//this.currentScore = 0;
		//var style = {
		//	font: 'bold 30pt Arial',
		//	fill: '#FFFFFF',
		//	align: 'center'
		//}
		
		//this.scoreText = game.add.text(game.width/2,40,this.currentScore, style);
		//this.scoreText.anchor.setTo(0.5);
		
		//this.totalTime = 15;
		//this.timerText = game.add.text(1000,40,this.totalTime + '', style);
		//this.timerText.anchor.setTo(0.5);
		
		//this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND, function() {
		//	if (this.flagFirstMouseDown) {
		//		this.totalTime--;
		//		this.timerText.text = this.totalTime + '';
		//		if(this.totalTime <= 0) {
		//			this.endGame = true;
		//			this.medusa.tweenMedusa.stop();
		//			game.time.events.remove(this.timerGameOver);
		//			this.showFinalMessage('GAME OVER!');					
		//		}
		//	}
				
		//}, this);
		
		
		
	},	
	update: function() {
		//this.horse.angle += 1;
		
		//if (this.flagFirstMouseDown && !this.endGame) {
			
		//	this.shark.x--;
		//	if (this.shark.x + this.shark.width <= -5) {
		//		this.shark.x = game.width;
		//		this.shark.y = game.rnd.integerInRange(0, game.height-this.shark.height);
		//	}
		
		//	this.fishes.x += 0.3;
		//	if (this.fishes.x >= game.width + 5) {
		//		this.fishes.x = -1 * (this.fishes.width + 5);
		//	}
			
		//	this.boobleArray.forEach(function (booble) {
		//		booble.y -= booble.vel;
		//		if (booble.y + booble.height + 5 < 0 ) {
		//			booble.y = game.height + 5;
		//			booble.x = game.rnd.integerInRange(1, game.width - booble.width);
		//		}
		//	});
			
		//	if (this.countSmile >= 0) {
		//		this.countSmile++;
		//		if (this.countSmile>= 50){
		//			this.countSmile = -1;
		//			this.horse.frame = 0;
		//		} 					
		//	}
			
		//	var pointerX = game.input.x;
		//	var pointerY = game.input.y;
			
		//	var distX = pointerX - this.horse.x;
		//	var distY = pointerY - this.horse.y;
			
		//	if(distX > 0) {
		//		this.horse.scale.setTo(0.5,0.5);
		//	} else {
		//		this.horse.scale.setTo(-0.5,0.5);
		//	}
			
		//	this.horse.x += distX * 0.02;
		//	this.horse.y += distY * 0.02;
		//	//this.moverDiamantes();
			
		//	if (!this.horse.hurt && (this.isRectanglesOverlapping(this.getBoundsDiamond(this.medusa), this.getBoundsHorse())
		//		|| this.isRectanglesOverlapping(this.getBoundsDiamond(this.shark), this.getBoundsHorse()))) {
				
		//		this.currentScore -= 200;
		//		this.scoreText.text = this.currentScore;
		//		this.horse.hurt = true;
		//		this.horse.tweenAlpha.start();						
		//		this.horse.tweenAlpha.onComplete.add(function (currentTartget, currentTween) {
		//			currentTartget.hurt = false;
		//		}, this);
					
		//		var explosion = this.explosionGroup.getFirstDead();
		//		if (explosion) {
		//			explosion.reset(this.horse.x, this.horse.y);
		//			explosion.tweenScale.start();
		//			explosion.tweenAlpha.start();	
					
		//			explosion.tweenAlpha.onComplete.add(function (currentTartget, currentTween) {
		//				currentTartget.kill();
		//			}, this);
		//		}
				
		//	}
			
		//	var i = this.comprobarSolapamientoConArray(this.getBoundsHorse());
		//	if (i >= 0) {
		//		this.destroyDiamond(i);
		//	}
			
		//}
		
	},
	//getBoundsHorse: function() {
	//	var x0 = this.horse.x - Math.abs(this.horse.width/4);
	//	var width = Math.abs(this.horse.width/2);
	//	var y0 = this.horse.y - this.horse.height/2;
	//	var height = this.horse.height;
	//	return new Phaser.Rectangle(x0, y0, width, height);
	//},
	//increaseScore: function() {
		
	//	this.countSmile = 0;
	//	this.horse.frame = 1;
		
	//	this.currentScore += 100;
	//	this.scoreText.text = this.currentScore;
		
	//	this.totalTime+=2; 
		
	//	this.amauntDiamondsCaught +=1;
	//	if (this.amauntDiamondsCaught >= AMAUNT_DIAMONDS) {
	//		this.endGame = true;
	//		this.medusa.tweenMedusa.stop();
	//		game.time.events.remove(this.timerGameOver);
	//		this.showFinalMessage('CONGRATULATIONS!');			
	//	}
	//},
	//putDiamond: function (diamond) {
	//	diamond.frame = game.rnd.integerInRange(0,3);
	//	diamond.scale.setTo( 0.30 + game.rnd.frac());
	//	diamond.anchor.setTo(0.5);
	//	diamond.x = game.rnd.integerInRange(50,game.width-50);
	//	diamond.y = game.rnd.integerInRange(50,game.height-50);
					
	//	while(this.comprobarSolapamientoConArray(this.getBoundsDiamond(diamond)) >= 0
	//		|| this.isRectanglesOverlapping(this.getBoundsDiamond(diamond), this.getBoundsHorse())) {
	//		diamond.x = game.rnd.integerInRange(50,game.width-50);
	//		diamond.y = game.rnd.integerInRange(50,game.height-50);
	//	}
	//	diamond.visible = true;
	//},
	//destroyDiamond(index) {
	//	if (this.diamonds[index].visible) {
			
	//		this.diamonds[index].visible = false;
			
	//		var explosion = this.explosionGroup.getFirstDead();
	//		if (explosion) {
	//			explosion.reset(this.diamonds[index].x, this.diamonds[index].y);
	//			explosion.tweenScale.start();
	//			explosion.tweenAlpha.start();	
				
	//			explosion.tweenAlpha.onComplete.add(function (currentTartget, currentTween) {
	//				currentTartget.kill();
	//			}, this);
	//		}

	//		this.increaseScore();			
			
	//	}
		
		
	//},
	//showFinalMessage: function (message) {
	//	var backgroundAlpha = game.add.bitmapData(game.width,game.height);
	//	backgroundAlpha.ctx.fillStyle = '#000000';
	//	backgroundAlpha.ctx.fillRect(0,0,game.width,game.height);
	//	var bgSprite = game.add.sprite(0,0,backgroundAlpha);
	//	bgSprite.alpha = 0.5;
		
	//	var style = {
	//		font: 'bold 68pt Arial',
	//		fill: '#FFFFFF',
	//		align: 'center'
	//	}
		
	//	this.textFieldFinalMessage = game.add.text(game.width/2,game.height/2,message,style);
	//	this.textFieldFinalMessage.anchor.setTo(0.5);
	//},
	
	//getBoundsDiamond: function(currentDiamond) {
	//		return new Phaser.Rectangle(currentDiamond.left, currentDiamond.top, currentDiamond.width, currentDiamond.height);
	//},
	
	//isRectanglesOverlapping: function (rectangulo1, rectangulo2) {
		
	//	if (rectangulo1.x > rectangulo2.x+rectangulo2.width
	//	    || rectangulo2.x > rectangulo1.x+rectangulo1.width
	//		|| rectangulo1.y > rectangulo2.y+rectangulo2.height
	//		|| rectangulo2.y > rectangulo1.y+rectangulo1.height) {
	//			return false;
	//		}
			
	//		return true
		
	//},
	
	//comprobarSolapamientoConArray: function(rectanguloNuevo) {
	//	for(var i = 0; i < this.diamonds.length; i++) {
	//		if (this.diamonds[i].visible) {
	//			var rectangulo = this.getBoundsDiamond(this.diamonds[i]);
	//			if (this.isRectanglesOverlapping(rectangulo, rectanguloNuevo)) return i;	
	//		}			
	//	}
		
	//	return -1;
	//},
	
	//moverDiamantes: function () {
	//	for (i=0; i < this.diamonds.length; i++) {
	//		var diamond = this.diamonds[i];
	//		diamond.x += game.rnd.integerInRange(-1,1);
	//		diamond.y += game.rnd.integerInRange(-1,1);
	//	}
	//},
	//onTap: function() {
	//	this.flagFirstMouseDown = !this.flagFirstMouseDown;
	//	//this.horse.frame = (this.horse.frame + 1) % 2;				
		
	//	if (this.flagFirstMouseDown)
	//		this.medusa.tweenMedusa.start().loop(true);
	//	else this.medusa.tweenMedusa.stop();
	//}
}

var game = new Phaser.Game(config, Phaser.CANVAS, 'hipocampo-game');
//game.state.add('gameplay', GamePlayManager );
//game.state.start('gameplay');