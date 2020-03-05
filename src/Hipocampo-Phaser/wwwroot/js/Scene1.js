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

        this.load.spritesheet('explosion', '../images/explosion.png', {
            frameWidth: 160,
            frameHeight: 180
        });
        this.load.image('shark', '../images/shark.png');
        this.load.image('fishes', '../images/fishes.png');
        this.load.image('medusa', '../images/mollusk.png');

        this.load.image('bubble1', '../images/booble1.png');
        this.load.image('bubble2', '../images/booble2.png');
        this.load.spritesheet('bubbleShoot', '../images/boobleShoot.png', {
            frameWidth: 39,
            frameHeight: 32
        });

        this.load.audio('audio_pop', '../sounds/sfxPop.mp3');
        this.load.audio('audio_music_loop', '../sounds/musicLoop.mp3');
    }

    create() {
        this.add.text(20, 20, "Loading game...");

        this.anims.create({
            key: "horse_anim",
            frames: this.anims.generateFrameNumbers("horse"),
            frameRate: 2,
            repeat: 3
        });

        this.anims.create({
            key: "explosion_anim",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 2,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "bubbleShoot_anim",
            frames: this.anims.generateFrameNumbers("bubbleShoot"),
            frameRate: 5,
            repeat: -1
        });

        this.scene.start("playGame");
    }
}