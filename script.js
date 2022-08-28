const container = document.querySelector('.grid-wrap');
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "COLOR";
const DEFAULT_COLOR = '#333'

// create board on load
window.onload = ()=> {
    createBoard(DEFAULT_SIZE);
}

function createBoard(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size*size; ++i) {
        const grid_box = document.createElement('div');
        grid_box.classList.add('box');
        grid_box.addEventListener('mouseover', changeColor);
        grid_box.addEventListener('mousedown', changeColor);
        grid_box.addEventListener('mouseout', changeColor);
        container.appendChild(grid_box);
    }
}


let currSize = DEFAULT_SIZE;

// updates "# x #" for UI
const slider = document.getElementById('slider');
const sliderRange = document.getElementById('range');
sliderRange.innerHTML = `${slider.value} x ${slider.value}`;
slider.oninput = function() {
    sliderRange.innerHTML = `${this.value} x ${this.value}`;
}

// updates grid size
const submit = document.getElementById('grid-change');
submit.onclick = () => {
    if (currSize != slider.value) {
        currSize = slider.value;
        clearBoard();
        createBoard(currSize);
    }
}

// clear board
function clearBoard() {
    container.innerHTML = "";
}

// track mouse btn down and up
let mouseDn = 0;
document.body.onmousedown = () => mouseDn = 1;
document.body.onmouseup = () => mouseDn = 0;

let currColor = DEFAULT_COLOR;
let currMode = DEFAULT_MODE;
function changeColor(e) {
    // gives hover effect
    if (e.type === 'mouseover' && !mouseDn) {
        e.target.style.boxShadow = '1px 2px 4px grey'; 
        e.target.style.transition = '0.05s';
        return;
    } else if (e.type === 'mouseout') {
        e.target.style.boxShadow = 'none';
        e.target.style.transition = '0.3s';
        return;
    }

    // updates color mode
    if (currMode === 'COLOR') {
        e.target.style.backgroundColor = currColor;
    }
    else if (currMode === 'ERASER') {
        e.target.style.backgroundColor = '#FFF';
    }
    else if (currMode === 'RAINBOW') {
        const randR = Math.floor(Math.random() * 256);
        const randG = Math.floor(Math.random() * 256);
        const randB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randR}, ${randG}, ${randB})`;
    }
}