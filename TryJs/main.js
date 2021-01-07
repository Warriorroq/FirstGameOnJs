const canvas = document.querySelector('canvas');
const canvasContent = canvas.getContext('2d');
const update = 80
const updateTime = 1/update

function graficsUpdate() {
    requestAnimationFrame(graficsUpdate)

}

function logicUpdate() {
    setInterval(() => {
        
    }, 1000 * updateTime)
}


addEventListener('click', (event) => {
    
})


graficsUpdate()
logicUpdate()