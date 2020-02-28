class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);

        this.bubbleArray = [];
        this.createBubbles(this.bubbleArray);

        this.horse = this.physics.add.sprite(config.width / 2, config.height / 2, 'horse');
        //this.horse.setFrame(0);
        ////this.horse.anchor.setTo(0.5, 0.5);
        this.horse.setScale(0.5);
        this.horse.setCollideWorldBounds(true);
        this.horse.hurt = false;
        //this.horse.tweenAlpha = this.add.tween(this.horse).to({
        //    alpha: [1, 0.5, 0, 0.5, 1]
        //}, 630, Phaser.Easing.Exponential.Out, false, 0, 3, false);

        

        //this.horse.play("horse_anim");

        this.medusa = this.add.image(config.width / 4, 150, 'medusa');
        this.shark = this.add.image(config.width / 2, 20, 'shark');
        this.fishes = this.add.image(config.width / 4, config.height * 0.85, 'fishes');

        this.diamonds = this.physics.add.group(); //= [];
        for (var i = 0; i < AMAUNT_DIAMONDS; i++ )
        {
            var diamond = this.physics.add.sprite(100, 100, 'diamonds');
            this.diamonds.add(diamond);
            this.putDiamond(diamond);
            diamond.setInteractive();

        }

        this.input.on('gameobjectdown', this.destroyDiamond, this);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        //this.add.text(20, 20, "Loading game...", { font: "25px Arial", fill: "yellow" });
        //this.scene.start("playGame");
    }

    createBubbles(arrayBubble) {
        for (var i = 0; i < AMAUNT_BUBBLES; i++) {
            
            var bubble = this.add.image(0, 0, 'bubble' + Phaser.Math.Between(1, 2));
            arrayBubble.push(bubble);
            bubble.setRandomPosition(Phaser.Math.Between(1, config.width - 50), Phaser.Math.Between(config.height / 2, config.height * 1.25));
            bubble.setScale(0.2 + Math.random());
            bubble.velocity = -1 * (0.2 + Math.random() * 2);
            bubble.alpha = 0.9;
        }
    }

    update() {

        //this.background.tilePositionX -= 0.5;

        //if (this.flagFirstMouseDown && !this.endGame) {

        //    //this.shark.x--;
        //    //if (this.shark.x + this.shark.width <= -5) {
        //    //    this.shark.x = config.width;
        //    //    this.shark.y = Phaser.Math.Between(0, config.height - this.shark.height);
        //    //}
            this.moveXCoordenate(this.shark, -2, true);

        //    //this.fishes.x += 0.3;
        //    //if (this.fishes.x >= config.width + 5) {
        //    //    this.fishes.x = -1 * (this.fishes.width + 5);
        //    //}
            this.moveXCoordenate(this.fishes, 0.3, false);

            this.moveBubbles();

            var pointerX = game.input.x;
            var pointerY = game.input.y;

            var distX = pointerX - this.horse.x;
            var distY = pointerY - this.horse.y;

            this.moveHorseManager();

            //if (distX > 0 && this.horse.flipX) {
            //    this.horse.setScale(0.5, 0.5);
            //} else {
            //    this.horse.setScale(-0.5, 0.5);
            //}
            //this.horse.setFlipX(distX < 0);

            //this.horse.setPosition(this.horse.x + distX * 0.02, this.horse.y + distY * 0.02);
            //this.horse.y += distY * 0.02;
        //    //this.moverDiamantes();

        //    if (!this.horse.hurt) {
        //        this.hitEvalue();
        //    }                

            var i = this.comprobarSolapamientoConArray(this.getBoundsHorse());
            if (i >= 0) {
                this.destroyDiamond(i);
            }

        //}
    }

    moveHorseManager() {

        if (this.cursorKeys.left.isDown) {
            this.horse.setVelocityX(-gameSettings.playerSpeed);
            this.horse.setFlipX(true);
        } else if (this.cursorKeys.right.isDown) {
            this.horse.setVelocityX(gameSettings.playerSpeed);
            this.horse.setFlipX(false);
        };

        if (this.cursorKeys.up.isDown) {
            this.horse.setVelocityY(-gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.horse.setVelocityY(gameSettings.playerSpeed);
        }
    }

    moveBubbles() {
            this.bubbleArray.forEach(function (bubble) {
                bubble.y += bubble.velocity;
                if (bubble.y + bubble.height + 5 < 0) {
                    bubble.y = config.height + 5;
                    bubble.x = Phaser.Math.Between(1, game.width - bubble.width);
                }
            });
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
        return new Phaser.Geom.Rectangle(x0, y0, width, height);
    }

    increaseScore() {
		
        this.countSmile = 0;
        this.horse.play("horse_anim");
		
        this.currentScore += 100;
        this.scoreText.text = this.currentScore;
		
        this.totalTime+=2; 
		
        this.amauntDiamondsCaught +=1;
        if (this.amauntDiamondsCaught >= AMAUNT_DIAMONDS) {
            this.endGame = true;
            //this.medusa.tweenMedusa.stop();
            game.time.events.remove(this.timerGameOver);
            this.showFinalMessage('CONGRATULATIONS!');			
        }
    }

    putDiamond (diamond) {
        diamond.setFrame(Phaser.Math.Between(0,3));
        diamond.setScale(0.30 + Math.random());
        //diamond.anchor.setTo(0.5);        
        //diamond.x = Phaser.Math.Between(50, config.width - diamond.width);
        //diamond.y = Phaser.Math.Between(50, config.height - diamond.height);
        diamond.setRandomPosition(0, 0, game.config.width, game.config.height);
        var intentosDeColocacion = 50;
        while((this.comprobarSolapamientoConArray(this.getBoundsDiamond(diamond)) >= 0
			|| this.isRectanglesOverlapping(this.getBoundsDiamond(diamond), this.getBoundsDiamond(this.horse)))
            && intentosDeColocacion > 0) {
            diamond.setRandomPosition(0, 0, game.config.width, game.config.height);
            intentosDeColocacion--;
        }
        if (intentosDeColocacion > 0) {
            diamond.visible = true;
            diamond.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
            diamond.setCollideWorldBounds(true);
            diamond.setBounce(1);
        } else
            diamond.visible = false;
    }
    destroyDiamond(pointer, diamond) {
        if (diamond && diamond.visible) {
			
            diamond.visible = false;
			
            //var explosion = this.explosionGroup.getFirstDead();
            //if (explosion) {
            //    explosion.reset(diamond.x, diamond.y);
            //    explosion.tweenScale.start();
            //    explosion.tweenAlpha.start();	
				
            //    explosion.tweenAlpha.onComplete.add(function (currentTartget, currentTween) {
            //        currentTartget.kill();
            //    }, this);
            //}

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
        return new Phaser.Geom.Rectangle(currentDiamond.x, currentDiamond.y, currentDiamond.width, currentDiamond.height);
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
    //onTap() {
    //    this.flagFirstMouseDown = !this.flagFirstMouseDown;
    //    //this.horse.frame = (this.horse.frame + 1) % 2;				
		
    //    if (this.flagFirstMouseDown)
    //        this.medusa.tweenMedusa.start().loop(true);
    //    else this.medusa.tweenMedusa.stop();
    //}
}