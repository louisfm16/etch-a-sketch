window.onload = function () {
  init();
};

// Elements
let gridEl;
let gColorEl;
let bgColorEl;
let gEraseEl;
let gSizeEl;
let gOutlineEl;
let gClearEl;

let gColor = '#ffffff';
let bgColor = '#3e6775';
let gSize = 16;
let isErasing = false;
let isDrawing = false;
let isOutline = true;

let init = () => {
  gridEl = document.getElementById('grid');
  gColorEl = document.getElementById('gColor');
  bgColorEl = document.getElementById('bgColor');
  gEraseEl = document.getElementById('gErase');
  gSizeEl = document.getElementById('gSize');
  gOutlineEl = document.getElementById('gOutline');
  gClearEl = document.getElementById('gClear');

  SetUpGrid(gSize);
  SetUpListeners();
}

let SetUpGrid = function(size) {
  let area = size * size;
  for (let i = 0; i < area; i++) {
    // Create square and append it as a child to the grid
    let square = document.createElement('div');
    square.classList.add('square');
    gridEl.appendChild(square);

    // I know, this is bad, but its using divs instead of canvas
    // so its allready bad
    square.addEventListener('mouseup', PaintSquare, false);
    square.addEventListener('mousemove', PaintSquare, false);
  }

  // Change the Flex grid size
  gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridEl.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

let SetUpListeners = function () {
  gColorEl.addEventListener('input', WatchColorPicker, false);
  bgColorEl.addEventListener('input', WatchBGColorPicker, false);
  gEraseEl.addEventListener('click', ToggleErase, false);
  gSizeEl.addEventListener('input', WatchGridSize, false);
  gOutlineEl.addEventListener('click', ToggleOutline, false);
  gClearEl.addEventListener('click', ClearGrid, false);
  
  // Fix this, Make it more robust
  gridEl.addEventListener('mousedown', () => isDrawing = true, false);
  gridEl.addEventListener('mouseup', () => isDrawing = false, false);
}

let WatchColorPicker = function(e) {
  gColor = e.target.value;
  // Going back to siblings due to the eydropper being hidden
  // Update the label for color
  gColorEl.previousElementSibling.previousElementSibling.innerText = `Color: ${gColor}`;
}

let WatchBGColorPicker = function (e) {
  bgColor = e.target.value;
  // Going back to siblings due to the eydropper being hidden
  // Update the label for color
  bgColorEl.previousElementSibling.previousElementSibling.innerText = `BG Color: ${bgColor}`;
  gridEl.style.backgroundColor = bgColor;
}

// Test 'input' performance, if bad use 'change'
let WatchGridSize = function (e) {
  gSize = e.target.value;
  // Update the label for Size slider
  gSizeEl.previousElementSibling.innerText = `Grid Size: ${gSize}x${gSize}`;

  ClearGrid();
}

let ToggleErase = function () {
  isErasing = !isErasing;

  gEraseEl.innerText = isErasing ? 'No Erase' : 'Erase';
}

let ClearGrid = function () {
  gridEl.innerHTML = '';
  SetUpGrid(gSize);
}

let PaintSquare = function() {
  if(isDrawing) {
    this.style.backgroundColor = isErasing ? 'transparent' : gColor;
  }
}

let ToggleOutline = function() {
  isOutline = !isOutline;

  let squares = document.querySelectorAll('.square');
  
  isOutline ?
    squares.forEach(square => {
      square.classList.remove('no-outline');
    }) :
    squares.forEach(square => {
      square.classList.add('no-outline');
    });
}