const canvas = document.querySelector('canvas');
const canvasContent = canvas.getContext('2d');

class Player
{
    constructor(x, y, radius, color)
    {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    update()
    {
        this.x += canvas.innerWidth / 2
        this.y += canvas.innerHeight / 2
        this.draw()
    }

    draw()
    {
        canvasContent.beginPath()
        canvasContent.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        canvasContent.fillStyle = this.color
        canvasContent.fill()
    }
}

class Projectile
{
    constructor(x, y, radius, color, velocity)
    {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    update()
    {
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.draw()
    }

    draw()
    {
        canvasContent.beginPath()
        canvasContent.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        canvasContent.fillStyle = this.color
        canvasContent.fill()
    }
}

class Enemy extends Projectile {
    
}

function setUpCanvas()
{
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function logEverything()
{
    console.log(canvas)
    console.log(canvasContent)
    console.log(player)

    if (projectiles.length > 0)
        console.log(projectiles[projectiles.length - 1].velocity)
}

function start()
{
    setUpCanvas()
}

var player = new Player(innerWidth / 2, innerHeight / 2, 20, 'blue')
const projectiles = []
const enemies = []
var score = 0

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 6) + 6
        let x
        let y
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = canvas.height * Math.random()
        }
        else {
            x = canvas.width * Math.random()
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, 'green', velocity))

    },1000)
}

function update() {
    requestAnimationFrame(update)
    canvasContent.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()

    projectiles.forEach((projectile) =>{
        projectile.update()
    })

    enemies.forEach((enemy, enemyIndex) => {
        enemy.update()
        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if (dist <= projectile.radius + enemy.radius)
            {
                enemies.splice(enemyIndex, 1)
                projectiles.splice(projectileIndex, 1)
                score += 1
                console.log(score)
            }
        })
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (dist <= player.radius + enemy.radius) {
            enemies.splice(enemyIndex, 1)
            alert(score)
            window.close()
        }
    })

    //logEverything()
}

addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2)
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(new Projectile(innerWidth / 2, innerHeight / 2, 10, 'black', velocity))
})

start()
update()
spawnEnemies()