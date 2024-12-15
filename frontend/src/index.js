import Phaser from 'phaser';
// import skyImage from '../assets/sky.jpg';
import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 580,
    parent: 'game-container',
    scene: [GameScene],
    physics: {
        default: 'matter',
        matter: {
            debug: true, // Enable debugging visuals
            gravity: { y: 1 } // Set gravity
        }
    },
    
};
if (window.game) {
    window.game.destroy(true);
}

// Create a new Phaser game instance
window.game = new Phaser.Game(config);

// function preload() {
//     this.load.image('sky', skyImage);
// }

// function create() {
//     this.add.image(400, 300, 'sky');
// }

// function update() { }

