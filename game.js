const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);
let player, cursors, otherHousewife, dramaText;

function preload() {
    // We'll use colored rectangles as "placeholders" until you have sprites
    // This allows you to test the logic immediately!
}

function create() {
    // 1. Create the Player (You)
    player = this.add.rectangle(400, 300, 32, 48, 0xff69b4); // Pink player
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    // 2. Create another Housewife (The Rival)
    otherHousewife = this.add.rectangle(600, 200, 32, 48, 0x00ffff); // Blue rival
    this.physics.add.existing(otherHousewife, true); // 'true' makes it static/immovable

    // 3. Setup Controls
    cursors = this.input.keyboard.createCursorKeys();

    // 4. UI: Drama Feed
    dramaText = this.add.text(16, 16, 'Find someone to confront...', { fontSize: '18px', fill: '#fff' });

    // 5. Collision Logic
    this.physics.add.collider(player, otherHousewife, startDrama, null, this);
}

function update() {
    player.body.setVelocity(0);

    if (cursors.left.isDown) player.body.setVelocityX(-160);
    else if (cursors.right.isDown) player.body.setVelocityX(160);

    if (cursors.up.isDown) player.body.setVelocityY(-160);
    else if (cursors.down.isDown) player.body.setVelocityY(160);
}

function startDrama() {
    dramaText.setText('DRAMA: "You stole my house!"');
    // Here we can add a screen shake or a sound effect later
}
