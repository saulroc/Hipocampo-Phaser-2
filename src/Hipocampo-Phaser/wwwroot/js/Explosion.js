class Explosion extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, 'explosion');
        this.scene = scene;
        scene.add.existing(this);
        this.alpha = 0.5;
        this.play('explosion_anim');
    }
    
}