class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        this.amauntDiamondsCaught = 0;
        this.endGame = false;

        this.bubbleArray = [];
        this.createBubbles(this.bubbleArray);
        this.enemies = this.physics.add.group();

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

        this.medusa = this.physics.add.sprite(config.width / 4, 150, 'medusa');
        this.medusa.setVelocityY(-100);
        this.enemies.add(this.medusa);
        this.shark = this.physics.add.sprite(config.width / 2, 20, 'shark');
        this.shark.setVelocityX(-100);
        this.enemies.add(this.shark);
        this.fishes = this.add.image(config.width / 4, config.height * 0.85, 'fishes');

        this.diamonds = this.physics.add.group(); //= [];
        for (var i = 0; i < AMAUNT_DIAMONDS; i++ )
        {
            var diamond = this.physics.add.sprite(100, 100, 'diamonds');
            this.diamonds.add(diamond);
            this.putDiamond(diamond);
            diamond.setInteractive();

        }

        this.explosionGroup = this.physics.add.group();

        //this.createExplosions();

        this.input.on('gameobjectdown', this.destroyDiamondClick, this);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.projectiles = this.add.group();

        this.currentScore = 0;
        var style = {
            font: 'bold 30pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }

        this.scoreText = this.add.text(config.width / 2, 40, this.currentScore, style);
        
        this.totalTime = 15;
        this.timerText = this.add.text(11 * config.width / 12, 40, this.totalTime + '', style);
        
        //this.timerGameOver = this.time.events.loop(Phaser.Timer.SECOND, function () {
        //    if (this.flagFirstMouseDown) {
        //        this.totalTime--;
        //        this.timerText.text = this.totalTime + '';
        //        if (this.totalTime <= 0) {
        //            this.endGame = true;
        //            this.medusa.tweenMedusa.stop();
        //            this.time.events.remove(this.timerGameOver);
        //            this.showFinalMessage('GAME OVER!');
        //        }
        //    }

        //}, this);

        this.physics.add.collider(this.projectiles, this.diamonds, function (projectile, diamond) {
            projectile.destroy();
        });

        this.physics.add.overlap(this.horse, this.enemies, this.hitHorse, null, this);

        this.physics.add.overlap(this.horse, this.diamonds, this.destroyDiamondHorse, null, this);

        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
        
        this.tweenManager = new TweenManager(this);

        this.tweenManager.add({tartegs: this.horse});

    }

    createExplosions() {
        for (var i = 0; i < 10; i++) {
            this.explosion = this.add.image(100, 100, 'explosion');
            this.explosionGroup.add(explosion);
            this.explosion.tweenScale = this.tweenManager.add(this.explosion.scale).to({
                x: [0.4, 0.8, 0.4],
                y: [0.4, 0.8, 0.4]
            }, 630, Phaser.Easing.Exponential.Out, false, 0, 0, false);

            this.explosion.tweenAlpha = this.tweenManager.add(this.explosion).to({
                alpha: [1, 0.6, 0]
            }, 630, Phaser.Easing.Exponential.Out, false, 0, 0, false);
            
            this.explosion.kill();
        }
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
            if (this.shark.x + this.shark.width <= -5) {
                this.shark.x = config.width;
                this.shark.y = Phaser.Math.Between(0, config.height - this.shark.height);
                this.shark.setVelocityX(-50 + Phaser.Math.Between(-150, 0));
            }
            //this.moveXCoordenate(this.shark, -2, true);

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
                this.destroyDiamond(this.diamonds.getChildren()[i]);
            }

            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.shootBubbles();
            }

            for (var i = 0; i < this.projectiles.getChildren().length; i++) {
                var bubbleShoot = this.projectiles.getChildren()[i];
                bubbleShoot.update();
            }

        //}
    }

    shootBubbles() {
        var bubbleShoot = new Bubble(this);
        
    }

    moveHorseManager() {

        this.horse.setVelocityX(0.95 * this.horse.body.velocity.x);
        this.horse.setVelocityY(0.95 * this.horse.body.velocity.y);

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

    hitHorse() {
        
		this.currentScore -= 200;
		this.scoreText.text = this.currentScore;
		if (this.horse.tweenAlpha)
		{
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

    hitEnemy(projectile, enemy) {
        projectile.destroy();
        Console.log(enemy);
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
            //this.time.events.remove(this.timerGameOver);
            this.showFinalMessage('CONGRATULATIONS!');			
        }
    }

    putDiamond (diamond) {
        diamond.setFrame(Phaser.Math.Between(0,3));
        diamond.setScale(0.30 + Math.random());
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
    destroyDiamondHorse(horse, diamond) {
        this.destroyDiamond(diamond);
    }
    destroyDiamondClick(pointer, diamond) {
        this.destroyDiamond(diamond);				
    }
    destroyDiamond(diamond) {
        if (diamond && diamond.visible) {

            diamond.visible = false;
            diamond.disableBody(true, true);
            var explosion = this.explosionGroup.getFirstDead();
            if (explosion) {
                explosion.reset(diamond.x, diamond.y);
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
        var backgroundAlpha = this.add.bitmapData(config.width,config.height);
        backgroundAlpha.ctx.fillStyle = '#000000';
        backgroundAlpha.ctx.fillRect(0, 0, config.width, config.height);
        var bgSprite = this.add.sprite(0,0,backgroundAlpha);
        bgSprite.alpha = 0.5;
		
        var style = {
            font: 'bold 68pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }
		
        this.textFieldFinalMessage = this.add.text(config.width / 2, config.height / 2, message, style);
        
    }    
	
    //onTap() {
    //    this.flagFirstMouseDown = !this.flagFirstMouseDown;
    //    //this.horse.frame = (this.horse.frame + 1) % 2;				
		
    //    if (this.flagFirstMouseDown)
    //        this.medusa.tweenMedusa.start().loop(true);
    //    else this.medusa.tweenMedusa.stop();
    //}
}