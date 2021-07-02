window.onload = function () {
  init();
};

let gridEl;

let init = () => {
  gridEl = document.getElementById('grid');
  SetUpGrid(16);
}

let SetUpGrid = function(size) {
  let area = size * size;
  for (let i = 0; i < area; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    gridEl.appendChild(square);

    gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridEl.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  }
}