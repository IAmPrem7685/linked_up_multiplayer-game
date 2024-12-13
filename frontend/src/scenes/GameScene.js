export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Load assets
    }

    create() {
        // Create game objects
        this.add.text(400, 300, 'Hello Phaser!', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    }

    update() {
        // Game loop
    }
}

