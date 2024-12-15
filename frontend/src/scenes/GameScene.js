import Phaser from "phaser";
const worldCategory = 0x0001;   // Category 1: World
const playerCategory = 0x0002;   // Category 2: Players
const ropeCategory = 0x0003;     // Category 3: Rope segments

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Load assets
        console.log('Scene: Preloading assets...');
    }

    create() {
        // Create game objects
        this.matter.world.setBounds(0,0,800,580)
        console.log('Scene: Creating objects...');
         // Enable input keys
         this.cursors = this.input.keyboard.createCursorKeys();
        // Ground creation (static and large enough to act as the floor)
        this.createBoundary();
        // this.ground = this.matter.add.rectangle(400, 570, 800, 20, {
        //     isStatic: true, // Ground does not move
        //     render: { fillStyle: 0x00ff00 } // Green color for ground
        // });
        // Add first rectangle (Player 1)
        
        
       
      
        this.player1 = this.matter.add.rectangle(200, 300, 50, 100, {
            isStatic: true, // Player can be affected by gravity and collisions
            restitution: 0.5, // Bounciness
            friction: 0.1, // Friction for movement
            render: { fillStyle: 0xff0000 }, // Red rectangle
            collisionFilter: {
                category: playerCategory, // Belongs to the player category
                mask:  worldCategory  // Collides only with world objects
            }
        });
        // this.player1.setOrigin(0.5, 0.5);
        // Add second rectangle (Player 2)
        this.player2 = this.matter.add.rectangle(600, 300, 50, 100, {
            isStatic: false, // Player can be affected by gravity and collisions
            restitution: 0.5, // Bounciness
            friction: 0.1, // Friction for movement
            mass:40,
            render: { fillStyle: 0x0000ff }, // Blue rectangle
            collisionFilter: {
                category: playerCategory, // Belongs to the player category
                mask: worldCategory    // Collides only with world objects
            }
        });
        // this.player2.setOrigin(0.5, 0.5);
        // c    onsole.log(Phaser.Math);
        console.log(Phaser);
        this.createRope(this.player1,this.player2);
        // Debug positions in the console
        console.log(`Player 1 position: ${this.player1.position.x}, ${this.player1.position.y}`);
        console.log(`Player 2 position: ${this.player2.position.x}, ${this.player2.position.y}`);
    }

    update() {
        console.log('Scene: Updating...');
        // Game loop
        // this.handleMovement();
        const Body = Phaser.Physics.Matter.Matter.Body; // Access Matter.js Body API


        if (this.cursors.left.isDown) {
            Body.applyForce(this.player2, { x: this.player2.position.x, y: this.player2.position.y }, { x: -0.1, y: 0 });
        } else if (this.cursors.right.isDown) {
            Body.applyForce(this.player2, { x: this.player2.position.x, y: this.player2.position.y }, { x: 0.1, y: 0 });
        }
    
        // Optionally, you can add upward force for testing
        // if (this.cursors.up.isDown) {
        //     Body.applyForce(this.player2, { x: this.player2.position.x, y: this.player2.position.y }, { x: 0, y: -0.01 });
        // }

        // if (this.cursors.left.isDown) {
        //     Body.setVelocity(this.player2, { x: -5, y: this.player2.velocity.y });
        // } else if (this.cursors.right.isDown) {
        //     Body.setVelocity(this.player2, { x: 5, y: this.player2.velocity.y });
        // } else {
        //     Body.setVelocity(this.player2, { x: 0, y: this.player2.velocity.y });
        // }
    }

    createBoundary() {
        // Ground Boundary
        
        this.ground = this.matter.add.rectangle(400, 570, 800, 10, { isStatic: true, friction: 0,
            collisionFilter: {
            category: worldCategory, // Belongs to the player category
            mask: playerCategory|ropeCategory  // Collides only with world objects
        } });

        // Left Boundary
        this.leftWall = this.matter.add.rectangle(0, 300, 10, 600, { isStatic: true, friction: 0 ,
            collisionFilter: {
                category: worldCategory, // Belongs to the player category
                mask: playerCategory|ropeCategory    // Collides only with world objects
            }
        });

        // Right Boundary
        this.rightWall = this.matter.add.rectangle(800, 300, 10, 600, { isStatic: true, friction: 0 ,
            collisionFilter: {
                category: worldCategory, // Belongs to the player category
                mask: playerCategory|ropeCategory   // Collides only with world objects
            }
        });
    }


    handleMovement() {
        if (this.cursors.left.isDown) {
            this.player1.setVelocity(-5,0);
        } else if (this.cursors.right.isDown) {
            this.player1.setVelocity(5,0);
        } else {
            this.player1.setVelocity(0,0);
        }

        // if (this.cursors.up.isDown) {
        //     this.player1.setVelocityY(-5);
        // } else if (this.cursors.down.isDown) {
        //     this.player1.setVelocityY(5);
        // } else {
        //     this.player1.setVelocityY(0);
        // }

        // Restrict player1 within the canvas bounds
        this.restrictMovement(this.player1);
    }

    restrictMovement(player) {
        const { width, height } = this.sys.canvas;
        player.x = Phaser.Math.Clamp(player.x, 0, width);
        player.y = Phaser.Math.Clamp(player.y, 0, height);
    }



    createRope(bodyA, bodyB) {
        // Rope settings
        const segmentCount = 40; // Number of rope segments
        const segmentWidth = 10; // Width of each segment
        const segmentHeight = 5; // Height of each segment
        const segmentRadius = 2; // Spacing between segments
        const segmentSpacing = 3; // Spacing between segments
        const stiffness = 0.9; // Stiffness of the rope (controls elasticity)
        const restitution = 0; 
        const density = 0.41; 
        const friction = 0.2; 
    
        const ropeSegments = []; // To store all rope segments
    
        // Create the rope segments
        for (let i = 0; i < segmentCount; i++) {
            const x = Phaser.Math.Linear(bodyA.position.x, bodyB.position.x, i / segmentCount);
            const y = Phaser.Math.Linear(bodyA.position.y, bodyB.position.y, i / segmentCount);
            // const x = bodyA.position.x + (bodyB.positio.x - bodyA.position.x) * (i / segmentCount)
            // const y = bodyA.position.y + (bodyB.position.y - bodyA.position.y) * (i / segmentCount)
            const color = 0x00ff00; // Green color
            
            // const segment = this.matter.add.rectangle(x, y, segmentWidth, segmentHeight,
            //     {
            //     friction: friction,
            //     restitution: restitution,
            //     density: density,
            //     render: { fillStyle: color },
            //     collisionFilter: {
            //         category: ropeCategory, // Belongs to the player category
            //         mask: worldCategory   // Collides only with world objects
            //     }
            // });

            const segment = this.matter.add.circle(x, y, segmentRadius,
                {
                friction: friction,
                restitution: restitution,
                density: density,
                render: { fillStyle: color },
                collisionFilter: {
                    category: ropeCategory, // Belongs to the player category
                    mask: worldCategory   // Collides only with world objects
                }
            });
    
            ropeSegments.push(segment);
            // this.add.rectangle(x, y, segmentWidth, segmentHeight, color).setOrigin(0.5); // Show rectangles for visualization
            // Connect this segment to the previous one
            if (i > 0) {
                const prevSegment = ropeSegments[i - 1];
                this.matter.add.constraint(prevSegment, segment, segmentSpacing, stiffness, {
                    render: { visible: false } // Hide the constraint visualization
                });
            }
        }
    
        // Connect the first segment to bodyA (Player 1)
        this.matter.add.constraint(bodyA, ropeSegments[0], segmentSpacing, stiffness, {
            render: { visible: false }
        });
    
        // Connect the last segment to bodyB (Player 2)
        this.matter.add.constraint(bodyB, ropeSegments[ropeSegments.length - 1], segmentSpacing, stiffness, {
            render: { visible: false }
        });
    }
    
}

