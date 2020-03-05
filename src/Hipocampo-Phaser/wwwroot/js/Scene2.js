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

        this.medusa = this.physics.add.sprite(config.width / 4, config.height, 'medusa');
        this.enemies.add(this.medusa);
        this.medusa.setBounce(0);
        this.medusa.setImmovable();
        this.medusa.tweenAlpha = this.tweens.add({
            targets: this.medusa,
            alpha: 1,
            ease: 'Power2',
            duration: 500,
            yoyo: true,
            repeat: 3,
            paused: true,
            onComplete: function (tween, targets) {
                targets[0].alpha = 1;
                targets[0].hurt = false;
            },            
            callbackScope: this
        });
        this.shark = this.physics.add.sprite(config.width / 2, 20, 'shark');
        this.enemies.add(this.shark);
        this.shark.setBounce(0);
        this.shark.setImmovable();
        this.shark.tweenAlpha = this.tweens.add({
            targets: this.shark,
            alpha: 1,
            ease: 'Power2',
            duration: 500,
            yoyo: true,
            repeat: 3,
            paused: true,
            onComplete: function (tween, targets) {
                targets[0].alpha = 1;
                targets[0].hurt = false;
            },
            callbackScope: this
        });
        this.fishes = this.add.image(config.width / 4, config.height * 0.85, 'fishes');

        this.horse = this.physics.add.sprite(config.width / 2, config.height / 2, 'horse');
        this.horse.setScale(0.5);
        this.horse.setCollideWorldBounds(true);
        this.horse.hurt = false;
        //this.horse.tweenAlpha = this.add.tween(this.horse).to({
        //    alpha: [1, 0.5, 0, 0.5, 1]
        //}, 630, Phaser.Easing.Exponential.Out, false, 0, 3, false);
        this.horse.tweenAlpha = this.tweens.add({
            targets: this.horse,
            alpha: 1,
            ease: 'Power2',
            duration: 500,
            yoyo: true,
            repeat: 3,
            paused: true,
            onComplete: function (tween, targets) {
                targets[0].alpha = 1;
                targets[0].hurt = false;
            },            
            callbackScope: this
        });
        

        //this.horse.play("horse_anim");

        

        this.diamonds = this.physics.add.group(); //= [];
        for (var i = 0; i < gameSettings.AMAUNT_DIAMONDS; i++ )
        {
            var diamond = this.physics.add.sprite(100, 100, 'diamonds');
            this.putDiamond(diamond);
            diamond.setInteractive();
            this.diamonds.add(diamond);
        }

        //this.input.on('gameobjectdown', this.destroyDiamondClick, this);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.on('pointerdown', this.onTap, this);

        this.projectiles = this.add.group();

        this.currentScore = 0;
        var style = {
            font: 'bold 30pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }

        this.scoreText = this.add.text(config.width / 2, 40, this.currentScore, style);
        
        this.totalTime = gameSettings.timeGame;
        this.timerText = this.add.text(11 * config.width / 12, 40, this.totalTime + '', style);
        
        this.physics.add.collider(this.projectiles, this.diamonds, function (projectile, diamond) {
            projectile.destroy();
        });

        this.physics.add.overlap(this.horse, this.enemies, this.hitHorse, null, this);

        this.physics.add.overlap(this.horse, this.diamonds, this.destroyDiamondHorse, null, this);

        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        this.timerGameOver = this.time.addEvent({
            delay: 1000,
            callback: this.decreaseTime,
            callbackScope: this,
            loop: true,
            paused: true
        });

        this.popSound = this.sound.add("audio_pop");
        this.musicSound = this.sound.add("audio_music_loop");

        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.musicSound.play(musicConfig);
        
    }

    decreaseTime() {
        this.totalTime--;
        this.timerText.text = this.totalTime;
        if (this.totalTime <= 0) {
            this.timerGameOver.paused = true;            
            this.showFinalMessage('GAME OVER!');
        }
    }

    createBubbles(arrayBubble) {
        for (var i = 0; i < gameSettings.AMAUNT_BUBBLES; i++) {
            
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
        this.horse.setVelocityX(0.95 * this.horse.body.velocity.x);
        this.horse.setVelocityY(0.95 * this.horse.body.velocity.y);

        if (this.flagFirstMouseDown && !this.endGame) {

            if (this.shark.x + this.shark.width <= -5) {
                this.shark.x = config.width;
                this.shark.y = Phaser.Math.Between(0, config.height - this.shark.height);
                this.shark.setVelocityX(-50 + Phaser.Math.Between(-150, 0));
            }
        
            if (this.medusa.y - this.medusa.height <= -5) {
                this.medusa.y = config.height;
                this.medusa.x = Phaser.Math.Between(0, config.width - this.medusa.width);
                this.medusa.setVelocityY(-50 + Phaser.Math.Between(-150, 0));
            }

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

            //var i = this.comprobarSolapamientoConArray(this.getBoundsHorse());
            //if (i >= 0) {
            //    this.destroyDiamond(this.diamonds.getChildren()[i]);
            //}

            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.shootBubbles();
            }

            for (var i = 0; i < this.projectiles.getChildren().length; i++) {
                var bubbleShoot = this.projectiles.getChildren()[i];
                bubbleShoot.update();
            }

        }

    }

    shootBubbles() {
        var bubbleShoot = new Bubble(this);
        this.popSound.play();
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

    hitHorse(horse, enemy) {
        
        if (!horse.hurt && !enemy.hurt)
        {
            horse.scene.currentScore -= 200;
            horse.scene.scoreText.text = horse.scene.currentScore;
            horse.play("horse_anim");
            horse.hurt = true;
            var explosion = new Explosion(horse.scene, horse.x, horse.y);            

            if (horse.tweenAlpha) {
                
                horse.alpha = 0.1;
                horse.tweenAlpha.play();

            }
        }      		
				
    }

    hitEnemy(projectile, enemy) {
        projectile.destroy();
        
        if (!enemy.hurt) {
            enemy.hurt = true;
            enemy.scene.currentScore += 200;
            enemy.scene.scoreText.text = enemy.scene.currentScore;
            
            var explosion = new Explosion(this, enemy.x, enemy.y);
            
            if (enemy.tweenAlpha) {

                enemy.alpha = 0.1;
                enemy.tweenAlpha.play();

            }

        }
        
        //console.log(enemy);
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
		
        //this.totalTime+=2; 
        //this.timerText.text = this.totalTime;

        this.amauntDiamondsCaught +=1;
        if (this.amauntDiamondsCaught >= gameSettings.AMAUNT_DIAMONDS) {
            this.endGame = true;
            //this.medusa.tweenMedusa.stop();
            //this.time.events.remove(this.timerGameOver);
            this.timerGameOver.paused = true;
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
            //diamond.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
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
            var explosion = new Explosion(this, diamond.x, diamond.y);

            this.increaseScore();

        }

    }
    showFinalMessage (message) {

        this.enemies.setVelocity(0);

        var backgroundAlpha = this.make.graphics().fillStyle('#000000').fillRect(0, 0, config.width, config.height);
        backgroundAlpha.generateTexture('backgroundAlpha', config.width, config.height);
        backgroundAlpha.destroy();
        var bgImage = this.add.image(0, 0, 'backgroundAlpha');;
        bgImage.alpha = 0.5;
        bgImage.setOrigin(0, 0);
        this.endGame = true;
        var style = {
            font: 'bold 34pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }
		
        this.textFieldFinalMessage = this.add.text(config.width / 2, config.height / 2, message, style);
        this.textFieldFinalMessage.setOrigin(0.5);
        
    }    
	
    getBoundsDiamond(currentDiamond) {
        return new Phaser.Geom.Rectangle(currentDiamond.x, currentDiamond.y, currentDiamond.width, currentDiamond.height);
    }

    isRectanglesOverlapping(rectangulo1, rectangulo2) {

        if (rectangulo1.x > rectangulo2.x + rectangulo2.width
		    || rectangulo2.x > rectangulo1.x + rectangulo1.width
			|| rectangulo1.y > rectangulo2.y + rectangulo2.height
			|| rectangulo2.y > rectangulo1.y + rectangulo1.height) {
            return false;
        }

        return true

    }

    comprobarSolapamientoConArray(rectanguloNuevo) {
        for (var i = 0; i < this.diamonds.getChildren().length; i++) {
            if (this.diamonds.getChildren()[i].visible) {
                var rectangulo = this.getBoundsDiamond(this.diamonds.getChildren()[i]);
                if (this.isRectanglesOverlapping(rectangulo, rectanguloNuevo))
                    return i;
            }
        }

        return -1;
    }

    onTap() {
        this.flagFirstMouseDown = !this.flagFirstMouseDown;
        //this.horse.frame = (this.horse.frame + 1) % 2;				
        if (this.flagFirstMouseDown) {
            this.shark.setVelocityX(-50 + Phaser.Math.Between(-150, 0));
            this.medusa.setVelocityY(-50 + Phaser.Math.Between(-150, 0));
        } else {
            this.shark.setVelocityX(0);
            this.medusa.setVelocityY(0);
        }
        this.timerGameOver.paused = this.endGame || !this.flagFirstMouseDown ;
        //this.shark.active = this.flagFirstMouseDown;
        //this.medusa.active = this.flagFirstMouseDown;
                
    }
}