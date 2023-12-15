import Phaser from 'phaser'

export default class PortentGame extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {
		this.load.setBaseURL('https://labs.phaser.io')

		this.load.image('sky', 'assets/skies/space3.png')
		this.load.image('blueberry', 'assets/particles/blue.png')
		this.load.image('cherry', 'assets/particles/red.png')
		this.load.image('strawberry', 'assets/particles/red.png')
		this.load.image('lemon', 'assets/particles/yellow.png')
		this.load.image('orange', 'assets/particles/red.png')
		this.load.image('apple', 'assets/particles/red.png')
		this.load.image('pear', 'assets/particles/yellow.png')
		this.load.image('peach', 'assets/particles/red.png')
		this.load.image('pineapple', 'assets/particles/green.png')
		this.load.image('melon', 'assets/particles/green.png')
		this.load.image('watermelon', 'assets/particles/green.png')
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

		this.matter.world.setBounds(0, 0, bucketWidth, bucketHeight, 32, true, true, false, true);

		const fruits = [
			{'name':'blueberry', 'value':2, 'width': 50, 'height': 50},
			{'name':'cherry', 'value':4},
			{'name':'strawberry', 'value':8},
			{'name':'lemon', 'value':16},
			{'name':'orange', 'value':24},
			{'name':'apple', 'value':48},
			{'name':'pear', 'value':96},
			{'name':'peach', 'value':192},
			{'name':'pineapple', 'value':384},
			{'name':'melon', 'value':768},
			{'name':'watermelon', 'value':1536, 'width': 256, 'height': 256},
		];

		// const getFruit = () => {
		// 	const fruits = [
		// 		{'name':'blueberry', 'value':2},
		// 		{'name':'cherry', 'value':4},
		// 		{'name':'strawberry', 'value':8},
		// 		{'name':'lemon', 'value':16},
		// 		{'name':'orange', 'value':24},
		// 		{'name':'apple', 'value':48},
		// 		{'name':'pear', 'value':96},
		// 		{'name':'peach', 'value':192},
		// 		{'name':'pineapple', 'value':384},
		// 		{'name':'melon', 'value':768},
		// 		{'name':'watermelon', 'value':1536, 'width': 256, 'height': 256},
		// 	];
		// 	return fruits;
		// }
		
		const createFruit = () => {
			//const fruits = getFruit();
			// Generate a random index
			const randomIndex = Math.floor(Math.random() * fruits.length);
			// Retrieve the random element
			const randomFruit = fruits[randomIndex];
			console.log('randomFruit', randomFruit);
	
			let fruit = this.matter.add.image(Phaser.Math.Between(0, 800), 0, randomFruit.name).setIgnoreGravity(true);
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

		/**
		 * Collision event handler
		 */
		this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
			if(bodyA.label === "fruit" && bodyB.label === "fruit"){
				console.log(event);
				console.log("fruitA", bodyA.gameObject.texture.key);
				console.log("fruitB", bodyB.gameObject.texture.key);
				if(bodyA.gameObject.texture.key === bodyB.gameObject.texture.key) {
					console.log(`MATCH ${bodyA.gameObject.texture.key} and ${bodyB.gameObject.texture.key}`);
					//this.matter.remove(event.world, bodyB);
					
					// Lookup our upgraded fruit based on value. 2x the current fruit.
					const upgradedFruit = fruits.find(item => item.value === (bodyA.gameObject.value*2));

					// Check if the new texture is already loaded
					if (!this.textures.exists(upgradedFruit.name)) {
						// If not, dynamically load the new texture
						this.load.image(upgradedFruit.name);
					}

					// Set the new texture for the game object
					bodyA.gameObject.setTexture(upgradedFruit.name);
				}
			}
		});
		
	}
}
