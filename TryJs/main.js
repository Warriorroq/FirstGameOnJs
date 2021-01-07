const canvas = document.querySelector('canvas');
const canvasContent = canvas.getContext('2d');

class Dot {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 0
        this.color = 'black'
    }

    update() {
        this.x += canvas.innerWidth / 2
        this.y += canvas.innerHeight / 2
        this.draw()
    }

    draw() {
        canvasContent.beginPath()
        canvasContent.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        canvasContent.fillStyle = this.color
        canvasContent.fill()
    }
}

class Line {
    constructor(pos1, pos2, countOfDots) {
        this.pos1 = pos1
        this.pos2 = pos2
        this.countOfDots = Math.abs(countOfDots)
        this.dots = []
        console.log(this)
        this.createDots()
    }

    createDots() {
        var directon = {
            x: this.pos1.x - this.pos2.x,
            y: this.pos1.y - this.pos2.y
        }
        var direction2 = {
            x: directon.x /= this.countOfDots,
            y: directon.y /= this.countOfDots
        }
        for (var i = 0; i < this.countOfDots; i++) {
            this.dots.push(new Dot(this.pos1.x + directon.x, this.pos1.y + directon.y))
            directon.x -= direction2.x
            directon.y -= direction2.y
        }
    }
    draw() {
        for (var i = 0; i < this.dots.length - 1; i++) {
            canvasContent.beginPath();
            canvasContent.moveTo(this.dots[i].x, this.dots[i].y);
            canvasContent.lineTo(this.dots[i + 1].x, this.dots[i + 1].y);
            canvasContent.stroke();
        }

        if (this.dots.length > this.countOfDots) {
            this.dots.splice(0, 1)
        }
    }
}

var line;
function setUpCanvas() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function start() {
    setUpCanvas()
    line = new Line({ x: 0, y: 500 }, { x: 150, y: 500 }, prompt('How many dots you want to have'))
}

function update() {
    requestAnimationFrame(update)
    canvasContent.clearRect(0, 0, canvas.width, canvas.height)
    line.draw()
    line.dots.push(new Dot(mousePos.x, mousePos.y))
}

addEventListener('click', (event) => {
    line.dots.push(new Dot(event.x, event.y))
})

window.onmousemove = logMouseMove;
var mousePos 

function logMouseMove(event) {
    var e = event || window.event;
    mousePos = { x: e.clientX, y: e.clientY };
}

start()
update()