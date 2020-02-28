class Bubble extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        var x = scene.horse.x;
        var y = scene.horse.y;

        super(scene, x, y, "bubble1");

        scene.projectiles.add(this);

        scene.physics.world.enableBody(this);
        this.body.velocity.y = -10
        if (scene.horse.flipX){
            this.body.velocity.x = -250
        } else {
            this.body.velocity.x = 250
        }
        
    }
}