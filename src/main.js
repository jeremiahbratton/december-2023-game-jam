import Phaser from 'phaser'

import PortentGame from './PortentGameScene'

/**
 * PhaserJS 3 config that uses matter physics
 */
const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1024,
	height: 768,
	physics: {
		default: 'matter',
		matter: {
			gravity: { y: 0.5 },
			debug: true,
		},
	},
	scene: [PortentGame],
}

export default new Phaser.Game(config)
