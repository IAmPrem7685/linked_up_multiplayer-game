// Import Phaser from npm
import * as Phaser from '../node_modules/phaser/dist/phaser.js';

// Game configuration
const config = {
    type: Phaser.AUTO,             // Phaser will choose the best renderer
    width: 800,                     // Width of the game
    height: 600,                    // Height of the game
    // scene: {
    //     preload: function () {
    //         this.load.image('sky', 'assets/sky.png');  // Load assets
    //     },
    //     create: function () {
    //         this.add.image(400, 300, 'sky');  // Create scene with assets
    //     }
    // }
};

const game = new Phaser.Game(config);  // Create a new Phaser game
