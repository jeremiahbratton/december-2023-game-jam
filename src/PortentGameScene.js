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
		
		const createFruit = () => {
			const fruits = [
				{'name':'blueberry', 'value':2},
				{'name':'cherry', 'value':4},
				{'name':'strawberry', 'value':6},
				{'name':'lemon', 'value':8},
				{'name':'orange', 'value':10},
				{'name':'apple', 'value':12},
				{'name':'pear', 'value':14},
				{'name':'peach', 'value':16},
				{'name':'pineapple', 'value':18},
				{'name':'melon', 'value':20},
				{'name':'watermelon', 'value':22},
			]
			// Generate a random index
			const randomIndex = Math.floor(Math.random() * fruits.length);
			// Retrieve the random element
			const randomFruit = fruits[randomIndex];
			console.log('randomFruit', randomFruit);
	
			let fruit = this.matter.add.image(Phaser.Math.Between(0, 800), 0, randomFruit.name).setIgnoreGravity(true);
			fruit.variety = randomFruit.name;
			fruit.value = randomFruit.value;
	
			return fruit;
		}

		/**
		 * Create a ball at the top center of the screen
		 */
		const currentFruit = createFruit();
		//activefruits.push(currentFruit);
		
		/**
		 * When user clicks set X coordinate of ball to the X coordinate of the mouse
		 */
		this.input.on('pointerdown', function (pointer) {
			console.log('Bucket clicked');
			currentFruit.x = pointer.x;
			currentFruit.setIgnoreGravity(false);
			activefruits.push(createFruit());
			console.log(activefruits);
		});
		
	}
}
