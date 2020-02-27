class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
        this.background.setOrigin(0, 0);

        this.boobleArray = [];
       // createBoobles(this.boobleArray);

        this.horse = this.add.sprite(config.width / 2, config.height / 2, 'horse');
        this.horse.frame = 0;
        ////this.horse.anchor.setTo(0.5, 0.5);
        //this.horse.scale.setTo(0.5);
        this.horse.hurt = false;
        this.horse.tweenAlpha = this.add.tween(this.horse).to({
            alpha: [1, 0.5, 0, 0.5, 1]
        }, 630, Phaser.Easing.Exponential.Out, false, 0, 3, false);

        this.medusa = this.add.image(config.width / 4, 150, 'medusa');
        this.shark = this.add.image(config.width / 2, 20, 'shark');
        this.fishes = this.add.image(config.width / 4, config.height * 0.85, 'fishes');

        //this.add.text(20, 20, "Loading game...", { font: "25px Arial", fill: "yellow" });
        //this.scene.start("playGame");
    }

    createBoobles(arrayBooble) {
        for (var i = 0; i < AMAUNT_BOOBLES; i++) {
            var xBooble = Phaser.Math.Between(1, config.width - 50);
            var yBooble = Phaser.Math.Between(config.height / 2, config.height * 1.25);

            var booble = this.add.sprite(xBooble, yBooble, 'booble' + Phaser.Math.Between(1, 2));
            booble.vel = 0.2 + game.rnd.frac() * 2;
            booble.alpha = 0.9;
            booble.scale.setTo(0.2 + game.rnd.frac());
            this.arrayBooble.push(booble);
        }
    }

    update() {

        this.background.tilePositionX -= 0.5;

        //if (this.flagFirstMouseDown && !this.endGame) {

        //    //this.shark.x--;
        //    //if (this.shark.x + this.shark.width <= -5) {
        //    //    this.shark.x = config.width;
        //    //    this.shark.y = Phaser.Math.Between(0, config.height - this.shark.height);
        //    //}
        //    this.moveXCoordenate(this.shark, -2, true);

        //    //this.fishes.x += 0.3;
        //    //if (this.fishes.x >= config.width + 5) {
        //    //    this.fishes.x = -1 * (this.fishes.width + 5);
        //    //}
        //    this.moveXCoordenate(this.fishes, 0.3, false);

        //    this.boobleArray.forEach(function (booble) {
        //        booble.y -= booble.vel;
        //        if (booble.y + booble.height + 5 < 0) {
        //            booble.y = config.height + 5;
        //            booble.x = Phaser.Math.Between(1, game.width - booble.width);
        //        }
        //    });

        //    if (this.countSmile >= 0) {
        //        this.countSmile++;
        //        if (this.countSmile >= 50) {
        //            this.countSmile = -1;
        //            this.horse.frame = 0;
        //        }
        //    }

        //    var pointerX = game.input.x;
        //    var pointerY = game.input.y;

        //    var distX = pointerX - this.horse.x;
        //    var distY = pointerY - this.horse.y;

        //    if (distX > 0) {
        //        this.horse.scale.setTo(0.5, 0.5);
        //    } else {
        //        this.horse.scale.setTo(-0.5, 0.5);
        //    }

        //    this.horse.x += distX * 0.02;
        //    this.horse.y += distY * 0.02;
        //    //this.moverDiamantes();

        //    if (!this.horse.hurt) {
        //        this.hitEvalue();
        //    }                

        //    var i = this.comprobarSolapamientoConArray(this.getBoundsHorse());
        //    if (i >= 0) {
        //        this.destroyDiamond(i);
        //    }

        //}
    }

    moveXCoordenate(object, xMove, randomY) {
        var resetPosition = false;
        object.x += xMove;
        if (object.x + object.width <= -5 && xMove < 0) {
            object.x = config.width;
            resetPosition = true;
        }
        if (object.x - object.width >= config.width + 5 && xMove > 0) {
            object.x = -5 - object.width;
            resetPosition = true;
        }

        if (randomY && resetPosition)
            object.y = Phaser.Math.Between(0, config.height - object.height);
    }

    hitEvalue() {
        if (this.isRectanglesOverlapping(this.getBoundsDiamond(this.medusa), this.getBoundsHorse())
			|| this.isRectanglesOverlapping(this.getBoundsDiamond(this.shark), this.getBoundsHorse())) {

			this.currentScore -= 200;
			this.scoreText.text = this.currentScore;
			this.horse.hurt = true;
			this.horse.tweenAlpha.start();
			this.horse.tweenAlpha.onComplete.add(function (currentTartget, currentTween) {
				currentTartget.hurt = false;
			}, this);

			var explosion = this.explosionGroup.getFirstDead();
			if (explosion) {
				explosion.reset(this.horse.x, this.horse.y);
				explosion.tweenScale.start();
				explosion.tweenAlpha.start();

				explosion.tweenAlpha.onComplete.add(function (currentTartget, currentTween) {
				    currentTartget.kill();
				}, this);
			}

		}
    }

    getBoundsHorse () {
        var x0 = this.horse.x - Math.abs(this.horse.width / 4);
        var width = Math.abs(this.horse.width / 2);
        var y0 = this.horse.y - this.horse.height / 2;
        var height = this.horse.height;
        return new Phaser.Rectangle(x0, y0, width, height);
    }

    increaseScore() {
		
        this.countSmile = 0;
        this.horse.frame = 1;
		
        this.currentScore += 100;
        this.scoreText.text = this.currentScore;
		
        this.totalTime+=2; 
		
        this.amauntDiamondsCaught +=1;
        if (this.amauntDiamondsCaught >= AMAUNT_DIAMONDS) {
            this.endGame = true;
            this.medusa.tweenMedusa.stop();
            game.time.events.remove(this.timerGameOver);
            this.showFinalMessage('CONGRATULATIONS!');			
        }
    }

    putDiamond (diamond) {
        diamond.frame = Phaser.Math.Between(0,3);
        diamond.scale.setTo( 0.30 + game.rnd.frac());
        diamond.anchor.setTo(0.5);
        diamond.x = Phaser.Math.Between(50, game.width - 50);
        diamond.y = Phaser.Math.Between(50, game.height - 50);
					
        while(this.comprobarSolapamientoConArray(this.getBoundsDiamond(diamond)) >= 0
			|| this.isRectanglesOverlapping(this.getBoundsDiamond(diamond), this.getBoundsHorse())) {
            diamond.x = Phaser.Math.Between(50, game.width - 50);
            diamond.y = Phaser.Math.Between(50, game.height - 50);
        }
        diamond.visible = true;
    }
    destroyDiamond(index) {
        if (this.diamonds[index].visible) {
			
            this.diamonds[index].visible = false;
			
            var explosion = this.explosionGroup.getFirstDead();
            if (explosion) {
                explosion.reset(this.diamonds[index].x, this.diamonds[index].y);
                explosion.tweenScale.start();
                explosion.tweenAlpha.start();	
				
                explosion.tweenAlpha.onComplete.add(function (currentTartget, currentTween) {
                    currentTartget.kill();
                }, this);
            }

            this.increaseScore();			
			
        }
		
		
    }
    showFinalMessage (message) {
        var backgroundAlpha = game.add.bitmapData(game.width,game.height);
        backgroundAlpha.ctx.fillStyle = '#000000';
        backgroundAlpha.ctx.fillRect(0,0,game.width,game.height);
        var bgSprite = game.add.sprite(0,0,backgroundAlpha);
        bgSprite.alpha = 0.5;
		
        var style = {
            font: 'bold 68pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }
		
        this.textFieldFinalMessage = game.add.text(game.width/2,game.height/2,message,style);
        this.textFieldFinalMessage.anchor.setTo(0.5);
    }
	
    getBoundsDiamond(currentDiamond) {
        return new Phaser.Rectangle(currentDiamond.left, currentDiamond.top, currentDiamond.width, currentDiamond.height);
    }
	
    isRectanglesOverlapping (rectangulo1, rectangulo2) {
		
        if (rectangulo1.x > rectangulo2.x+rectangulo2.width
		    || rectangulo2.x > rectangulo1.x+rectangulo1.width
			|| rectangulo1.y > rectangulo2.y+rectangulo2.height
			|| rectangulo2.y > rectangulo1.y+rectangulo1.height) {
            return false;
        }
			
        return true
		
    }
	
    comprobarSolapamientoConArray(rectanguloNuevo) {
        for(var i = 0; i < this.diamonds.length; i++) {
            if (this.diamonds[i].visible) {
                var rectangulo = this.getBoundsDiamond(this.diamonds[i]);
                if (this.isRectanglesOverlapping(rectangulo, rectanguloNuevo)) return i;	
            }			
        }
		
        return -1;
    }
	
    moverDiamantes () {
        for (i=0; i < this.diamonds.length; i++) {
            var diamond = this.diamonds[i];
            diamond.x += Phaser.Math.Between(-1, 1);
            diamond.y += Phaser.Math.Between(-1, 1);
        }
    }
    onTap() {
        this.flagFirstMouseDown = !this.flagFirstMouseDown;
        //this.horse.frame = (this.horse.frame + 1) % 2;				
		
        if (this.flagFirstMouseDown)
            this.medusa.tweenMedusa.start().loop(true);
        else this.medusa.tweenMedusa.stop();
    }
}