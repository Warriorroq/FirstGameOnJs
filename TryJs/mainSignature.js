const canvas = document.querySelector('canvas');
const canvasContent = canvas.getContext('2d');

class Dot {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 0
        this.color = 'black'
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
        this.dots = []
        this.countOfDots = countOfDots
        this.createDots(pos1, pos2)
    }

    createDots(pos1, pos2) {
        var directon = {
            x: pos1.x - pos2.x,
            y: pos1.y - pos2.y
        }
        var direction2 = {
            x: directon.x /= this.countOfDots,
            y: directon.y /= this.countOfDots
        }
        for (var i = 0; i < this.countOfDots; i++) {
            this.dots.push(new Dot(pos1.x + directon.x, pos1.y + directon.y))
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
    }

    push(dot) {
        if (this.dots[this.dots.length - 1].x != dot.x && this.dots[this.dots.length - 1].y != dot.y) {
            this.dots.push(dot)
            this.countOfDots += 1
        }
    }
}

var line;
var draw = false
var file

const reader = new FileReader()

var mousePos = {
    x: 0,
    y: 0
}

window.onmousemove = mouseMove;

function setUpCanvas() {
    canvas.width = innerWidth * 0.9
    canvas.height = innerHeight * 0.7
}

function start() {
    setUpCanvas()
    if (draw == true)
        line = new Line({ x: 0, y: 0 }, { x: 0, y: 0 }, 2)
}

function mouseMove(event) {
    var e = event || window.event;
    mousePos = { x: e.clientX, y: e.clientY };
}

function update() {
    requestAnimationFrame(update)
    setUpCanvas()
    canvasContent.clearRect(0, 0, canvas.width, canvas.height)
    if(line != null)
        line.draw()
}

function updateLogic() {
    setInterval(() => {
        if ((mousePos.x != null || mousePos != null) && draw == true) {
            if (line == null)
                line = new Line({ x: mousePos.x, y: mousePos.y }, { x: mousePos.x, y: mousePos.y }, 2)

            var dot = new Dot(mousePos.x - 60, mousePos.y - 60)
            line.push(dot)
        }
    }, 1)
}
canvas.onclick = function () {
    draw = !draw
}
canvas.onmouseleave = function () {
    draw = false
}


document.getElementById('inputfile').addEventListener('change', function () {
        var fr = new FileReader();
        fr.onload = function () {
            file = fr.result
        }

        fr.readAsText(this.files[0]);
    }) 


function save(){
    const a = document.createElement('a');
    const text = JSON.stringify(line);
    const file = new Blob([text], { type: 'text/plain' });

    a.href = URL.createObjectURL(file);
    a.download = 'my-new-file.json';
    a.click();

    URL.revokeObjectURL(a.href);

}
function load() {
    var json = JSON.parse(file);
    line = new Line(0, 0, JSON.parse(file).countOfDots)
    line.dots = JSON.parse(file).dots
}
function reload() {
    line = new Line(0, 0, 2)
}

start()
update()
updateLogic()