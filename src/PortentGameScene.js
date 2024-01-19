import Phaser from 'phaser'

export default class PortentGame extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {
		//this.load.setBaseURL('https://labs.phaser.io')

		this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png')
		//this.load.image('cherry', 'assets/particles/red.png')

		this.load.image('blueberry', 'img/blueberry.png')
		this.load.image('cherry', 'img/cherry.png')
		this.load.image('strawberry', 'img/strawberry.png')
		this.load.image('lemon', 'img/lemon.png')
		this.load.image('orange', 'img/orange.png')
		this.load.image('apple', 'https://labs.phaser.io/assets/particles/red.png')
		this.load.image('pear', 'https://labs.phaser.io/assets/particles/yellow.png')
		this.load.image('peach', 'https://labs.phaser.io/assets/particles/red.png')
		this.load.image('pineapple', 'https://labs.phaser.io/assets/particles/green.png')
		this.load.image('melon', 'https://labs.phaser.io/assets/particles/green.png')
		this.load.image('watermelon', 'https://labs.phaser.io/assets/particles/green.png')
	}

	/**
	 * Create a game where we drop balls of a random size into a bucket.
	 * 
	 * When balls collide with each other, if they are the same size, they merge.
	 */
	create() {
		/**
		 * Set world bounds for game.
		 */
		const bucketWidth = 512;
		const bucketHeight = 768;
		let activefruits = [];

		/**
		 * Set stage background image
		 */
		this.add.image(0, 0, 'sky').setOrigin(0, 0);

		this.matter.world.setBounds(0, 0, bucketWidth, bucketHeight, 32, true, true, false, true);

		const fruits = [
			{'name':'blueberry', 'value':2, 'width': 50, 'height': 50},
			{'name':'cherry', 'value':4, 'width': 60, 'height': 60},
			{'name':'strawberry', 'value':8, 'width': 71, 'height': 71},
			{'name':'lemon', 'value':16, 'width': 86, 'height': 86},
			{'name':'orange', 'value':32, 'width': 103, 'height': 103},
			{'name':'apple', 'value':64, 'width': 123, 'height': 123},
			{'name':'pear', 'value':128, 'width': 148, 'height': 148},
			{'name':'pineapple', 'value':256, 'width': 178, 'height': 178},
			{'name':'melon', 'value':512, 'width': 213, 'height': 213},
			{'name':'watermelon', 'value':1024, 'width': 256, 'height': 256},
			
			//{'name':'watermelon', 'value':1536, 'width': 256, 'height': 256},
			//{'name':'peach', 'value':192, 'width': 256, 'height': 256},
		];

		const createFruit = () => {
			//const fruits = getFruit();
			// Generate a random index
			const randomIndex = Math.floor(Math.random() * fruits.length);
			// Retrieve the random element
			const randomFruit = fruits[randomIndex];
			
			let fruit = this.matter.add.image(randomFruit.width, randomFruit.height, randomFruit.name).setIgnoreGravity(true);
			fruit.setCircle();
			// @ts-ignore
			fruit.variety = randomFruit.name;
			// @ts-ignore
			fruit.value = randomFruit.value;
			fruit.body.label = "fruit";
	
			return fruit;
		}

		/**
		 * Create a ball at the top center of the screen
		 */
		let currentFruit;
		//activefruits.push(currentFruit);
		
		/**
		 * When user clicks set X coordinate of ball to the X coordinate of the mouse
		 */
		this.input.on('pointerdown', function (pointer) {
			console.log('Bucket clicked');
			let newFruit = createFruit();
			currentFruit = newFruit;
			activefruits.push(newFruit);

			currentFruit.x = pointer.x;
			currentFruit.setIgnoreGravity(false);
			console.log(activefruits);
		});

		const matterWorld = this.matter.world; // Capture the matter.world in a variable

		/**
		 * Collision event handler
		 */
		this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
			if (bodyA.label === "fruit" && bodyB.label === "fruit") {
				if(bodyA.gameObject.texture.key === bodyB.gameObject.texture.key) {
					console.log(`MATCH ${bodyA.gameObject.texture.key} and ${bodyB.gameObject.texture.key}`);
					
					// Lookup our upgraded fruit based on value. 2x the current fruit.
					console.log('bodyA value:', [bodyA.gameObject.texture.key, bodyA.gameObject.value]);
					console.log('finding fruit with value of', (bodyA.gameObject.value*2));

					// If two watermelons collide, delete/remove both
					if (bodyA.gameObject.texture.key === 'watermelon') {
						 // Destroy both game objects
						bodyA.gameObject.destroy();
						bodyB.gameObject.destroy();
						// Remove the bodies from the physics world
						// matterWorld.remove(bodyA);
						// matterWorld.remove(bodyB);
					} else {
						const upgradedFruit = fruits.find(item => item.value === (bodyA.gameObject.value*2));
						
						if (upgradedFruit) {
							// Set the new texture for the game object
							bodyA.gameObject.setTexture(upgradedFruit.name);
							bodyA.gameObject.value = upgradedFruit.value;
							bodyA.gameObject.setDisplaySize(upgradedFruit.width, upgradedFruit.height);
							bodyA.gameObject.setCircle();
						}

						// Destroy bodyB
						
						bodyB.gameObject.destroy();
						matterWorld.remove(bodyB, true);
					}
					
				}
			}
		});
		
	}
}
