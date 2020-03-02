class Bubble extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        var x = scene.horse.x;
        var y = scene.horse.y;

        super(scene, x, y, 'bubbleShoot');
        this.scene = scene;
        scene.add.existing(this);

        scene.projectiles.add(this);

        scene.physics.world.enableBody(this);
        this.body.velocity.y = -50;
        if (scene.horse.flipX){
            this.body.velocity.x = -225;
        } else {
            this.body.velocity.x = 225;
        }        
        this.play('bubbleShoot_anim');
    }

    update() {
        this.body.velocity.x = this.body.velocity.x * 0.99;
        if (this.y < this.height || this.x < this.width || this.x > (config.width - this.width)) {
            this.destroy();
        }
    }
}