const container = document.querySelector('.grid-wrap');
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "COLOR";
const DEFAULT_COLOR = '#333'
const clrSelect = document.getElementById('color-picker');
let activeMode = DEFAULT_MODE;

// create board on load
window.onload = ()=> {
    createBoard(DEFAULT_SIZE, DEFAULT_MODE);
}

function createBoard(size, mode) {
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
        createBoard(currSize, activeMode);
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

// track settings
const normalMd = document.getElementById('normal');
const rainbowMd = document.getElementById('rainbow');
const eraseMd = document.getElementById('erase');
const clearBd = document.getElementById('clear');

normalMd.addEventListener('click', ()=> {
    activeMode = "COLOR";
    trackMode();
    normalMd.style.backgroundColor = 'black';
    normalMd.style.color = 'white';
});
rainbowMd.addEventListener('click', ()=> {
    activeMode = "RAINBOW";
    trackMode();
    rainbowMd.style.backgroundColor = 'black';
    rainbowMd.style.color = 'white';
});
eraseMd.addEventListener('click', ()=> {
    activeMode = 'ERASE';
    trackMode();
    eraseMd.style.backgroundColor = 'black';
    eraseMd.style.color = 'white';
});

clearBd.addEventListener('click', ()=> {
    clearBoard();
    createBoard(currSize, activeMode);
})
clearBd.addEventListener('mouseover', ()=> {
    clearBd.style.background = 'lightgrey';
})
clearBd.addEventListener('mouseout', ()=> {
    clearBd.style.background = 'white';
})

let currMode = DEFAULT_MODE;
function changeColor(e) {
    // gives hover effect
    if (e.type === 'mouseover' && !mouseDn) {
        e.target.style.boxShadow = '1px 2px 4px black'; 
        e.target.style.transition = '0.05s';
        return;
    } else if (e.type === 'mouseout') {
        e.target.style.boxShadow = 'none';
        e.target.style.transition = '0.3s';
        return;
    }

    // updates color mode
    if (activeMode === 'COLOR') {
        e.target.style.backgroundColor = clrSelect.value;
    }
    else if (activeMode === 'ERASE') {
        e.target.style.backgroundColor = '#FFF';
    }
    else if (activeMode === 'RAINBOW') {
        const randR = Math.floor(Math.random() * 256);
        const randG = Math.floor(Math.random() * 256);
        const randB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randR}, ${randG}, ${randB})`;
    }
}

function trackMode() {
    normalMd.style.backgroundColor = 'white';
    normalMd.style.color = 'black';

    rainbowMd.style.backgroundColor = 'white';
    rainbowMd.style.color = 'black';

    eraseMd.style.backgroundColor = 'white';
    eraseMd.style.color = 'black';
}