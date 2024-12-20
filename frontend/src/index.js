import Phaser from 'phaser';
import skyImage from '../assets/sky.jpg';

// if (window.game) {
//     window.game.destroy(true);
// }
// window.game = new Phaser.Game(config);

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload,
        create,
        update
    }
    
};
if (window.game) {
    window.game.destroy(true);
}

// Create a new Phaser game instance
window.game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', skyImage);
}

function create() {
    this.add.image(400, 300, 'sky');
}

function update() { }

