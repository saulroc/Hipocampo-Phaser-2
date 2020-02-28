class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image('background', '../images/background.png');

        this.load.spritesheet('horse', '../images/horse.png', {
            frameWidth: 84, 
            frameHeight: 156
        });
        this.load.spritesheet('diamonds', '../images/diamonds.png', {
            frameWidth: 81,
            frameHeight: 84
        });

        this.load.image('explosion', '../images/explosion.png');
        this.load.image('shark', '../images/shark.png');
        this.load.image('fishes', '../images/fishes.png');
        this.load.image('medusa', '../images/mollusk.png');

        this.load.image('bubble1', '../images/booble1.png');
        this.load.image('bubble2', '../images/booble2.png');
    }

    create() {
        this.add.text(20, 20, "Loading game...");

        this.anims.create({
            key: "horse_anim",
            frames: this.anims.generateFrameNumbers("horse"),
            frameRate: 2,
            repeat: 3
        });

        this.scene.start("playGame");
    }
}