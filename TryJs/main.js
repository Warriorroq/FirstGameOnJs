const canvas = document.querySelector('canvas');
const canvasContent = canvas.getContext('2d');

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        canvasContent.beginPath()
        canvasContent.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        canvasContent.fillStyle = this.color
        canvasContent.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    update() {
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.draw()
    }

    draw() {
        canvasContent.beginPath()
        canvasContent.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        canvasContent.fillStyle = this.color
        canvasContent.fill()
    }
}

class Enemy{
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radi
us
        this.color = color
        this.velocity = velocity
    }

    update() {
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.draw()
    }

    draw() {
        canvasContent.beginPath()
        canvasContent.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        canvasContent.fillStyle = this.color
        canvasContent.fill()
    }
}

function setUpCanvas() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function logEverything() {
    console.log(canvas)
    console.log(canvasContent)
    console.log(player)

}

function start()
{
    setUpCanvas()
    logEverything()

    player.draw()
}

var player = new Player(innerWidth / 2, innerHeight / 2, 20, 'blue')

const projectile = new Projectile(innerWidth / 2, innerHeight / 2, 10, 'black', { x: 2, y: 2 })
const projectiles = []

function update() {
    requestAnimationFrame(update)
    canvasContent.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach((projectile) =>{
        projectile.update()
    })
}

addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
    const velocity = {
        x: Math.cos(angle), 
        y: Math.sin(angle)
    }
    projectiles.push(new Projectile(innerWidth / 2, innerHeight / 2, 10, 'black', velocity))
    console.log(projectiles[projectiles.length - 1].velocity)
})

start()
update()