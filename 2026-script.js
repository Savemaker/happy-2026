mainCanvas.height = 800;
mainCanvas.width = 800;

ctx = mainCanvas.getContext("2d")

const BACKGROUND = "#0f0f1a";
const FOREGROUND = "#ffd700";

const FPS = 1000 / 60

const POINT_SIZE = 20

var vertices = [
    {x: -0.65, y: 0.25, z: 0},
    {x: -0.40, y: 0.25, z: 0},
    {x: -0.65, y: 0.00, z: 0},
    {x: -0.40, y: 0.00, z: 0},
    {x: -0.65, y: -0.25, z: 0},
    {x: -0.40, y: -0.25, z: 0},

    {x: -0.30, y: 0.25, z: 0},
    {x: -0.05, y: 0.25, z: 0},
    {x: -0.30, y: -0.25, z: 0},
    {x: -0.05, y: -0.25, z: 0},

    {x: 0.05, y: 0.25, z: 0},
    {x: 0.30, y: 0.25, z: 0},
    {x: 0.05, y: 0.00, z: 0},
    {x: 0.30, y: 0.00, z: 0},
    {x: 0.05, y: -0.25, z: 0},
    {x: 0.30, y: -0.25, z: 0},

    {x: 0.40, y: 0.25, z: 0},
    {x: 0.65, y: 0.25, z: 0},
    {x: 0.40, y: 0.00, z: 0},
    {x: 0.65, y: 0.00, z: 0},
    {x: 0.40, y: -0.25, z: 0},
    {x: 0.65, y: -0.25, z: 0},

    {x: -0.9, y: 0.5, z: 0.25},
    {x: 0.9, y: 0.5, z: 0.25},
    {x: 0.9, y: -0.5, z: 0.25},
    {x: -0.9, y: -0.5, z: 0.25},

    {x: -0.9, y: 0.5, z: -0.25},
    {x: 0.9, y: 0.5, z: -0.25},
    {x: 0.9, y: -0.5, z: -0.25},
    {x: -0.9, y: -0.5, z: -0.25},
]

var edges = [
    [0, 1], [1, 3], [2, 3], [2, 4], [4, 5],

    [6, 7], [7, 9], [9, 8], [8, 6],

    [10, 11], [11, 13], [12, 13], [12, 14], [14, 15],

    [16, 17], [16, 18], [18, 19], [18, 20], [20, 21], [21, 19],

    [22, 23], [23, 24], [24, 25], [22, 25],

    [26, 27], [27, 28], [28, 29], [26, 29],

    [22, 26], [23, 27], [24, 28], [25, 29]

]

function clearScreen() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height)
}

function rotate({x, y, z}, angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return {
        x: cos * x - sin * z,
        y,
        z: sin * x + cos * z,
    }
}

function project({x, y, z}) {
    return {
        x: x / z,
        y: y / z
    }
}

function translate({x, y}) {
    return {
        x: (1 + x) / 2 * mainCanvas.width,
        y: (1 - (1 + y) / 2) * mainCanvas.height
    }
}

function drawPoint({x, y}) {
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - (POINT_SIZE/2), y - (POINT_SIZE/2), POINT_SIZE, POINT_SIZE)
}

function translate_z({x, y, z}) {
    return {
        x: x,
        y: y,
        z: z + dz
    }
}

function drawLine(p1, p2) {
    ctx.strokeStyle = FOREGROUND
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.lineTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
}

let angle = 0
let dz = 2

function processPoint(point) {
    point = rotate(point, angle)
    point = translate_z(point)
    point = project(point)
    point = translate(point)

    return point
}

let time = 0
const SWING_AMOUNT = Math.PI / 7

function frame() {
    clearScreen()

    time += 0.04
    angle = Math.sin(time) * SWING_AMOUNT

    angle += Math.PI * 1/60

    for (const [i, j] of edges) {
        drawLine(processPoint(vertices[i]), processPoint(vertices[j]))
    }

    setTimeout(frame, FPS)
}

setTimeout(frame, FPS)