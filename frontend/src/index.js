// import Phaser from 'phaser';
// import GameScene from './scenes/GameScene';
// import './styles/main.css';
import Phaser from 'phaser';
import skyImage from '../assets/sky.jpg';


// const config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     scene: [GameScene],
// };
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload,
        create,
        update
    }
};

// // const game = new Phaser.Game(config);
// console.log("HIIIIIIHIHIIHIHI");
// // fetch('http://0.0.0.0:3000/api/test')
// //     .then((res) => res.json())
// //     .then((data) => console.log(data));
// fetch('http://localhost:3000/api/test')
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return res.json();
//   })
//   .then((data) => console.log(data))
//   .catch((error) => console.error('Error fetching data:', error.message));
const game = new Phaser.Game(config);

function preload() {
    this.load.image('sky',skyImage);
}

function create() {
    this.add.image(400, 300, 'sky');
}

function update() {}
