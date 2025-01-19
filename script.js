// Creating table

const width = 50;
const height = 25;
const table = document.createElement('table');
let tr, td;

for (let y = 0; y < height; y++) {
	tr = document.createElement('tr');
	for (let x = 0; x < width; x++) {
		td = document.createElement('td');
		tr.append(td);
	}
	table.append(tr);
}
document.body.append(table);

// Adding cursor to the table

const cursor = '<span>*</span>';
let cursorX = Math.floor(width / 2);
let cursorY = Math.floor(height / 2);

table.childNodes[cursorY].childNodes[cursorX].innerHTML = cursor;

// Cursor movements

const step = 1;
let isUpPressed = 0;
let isLeftPressed = 0;
let isDownPressed = 0;
let isRightPressed = 0;
let isAnyMoveKeyPressed = 0;
let prevCursorX = cursorX;
let prevCursorY = cursorY;

addEventListener('keydown', function(event) {
  let key = event.key; 
  if (key == 'w' || key == 'W' || key == 'ArrowUp') {
    isUpPressed = 1;
  }
  if (key == 'a' || key == 'A' || key == 'ArrowLeft') {
    isLeftPressed = 1;
  }  
  if (key == 's' || key == 'S' || key == 'ArrowDown') {
    isDownPressed = 1;
  }
  if (key == 'd' || key == 'D' || key == 'ArrowRight') {
    isRightPressed = 1;
  }
});

addEventListener('keyup', (event) => {
  let key = event.key;
  if (key == 'w' || key == 'W' || key == 'ArrowUp') {
    isUpPressed = 0;
  }
  if (key == 'a' || key == 'A' || key == 'ArrowLeft') {
    isLeftPressed = 0;
  }
  if (key == 's' || key == 'S' || key == 'ArrowDown') {
    isDownPressed = 0;
  }
  if (key == 'd' || key == 'D' || key == 'ArrowRight') {
    isRightPressed = 0;
  }
});

function checkKeys() {  // Check if any moves key pressed
  if (isRightPressed) {
  	if (cursorX < width -1) { // Check table right border
    	cursorX += step;
    }
    isAnyMoveKeyPressed = 1;
  }
  if (isLeftPressed) {
  	if (cursorX > 0) { // Check table left border
    	cursorX -= step;
    }
    isAnyMoveKeyPressed = 1;
  }
  if (isUpPressed) {
  	if (cursorY > 0) { // Check table upper border
    	cursorY -= step;
    }
    isAnyMoveKeyPressed = 1;
  }
  if (isDownPressed) {
  	if (cursorY < height - 1) { // Check table bottom border
    	cursorY += step;
    }
    isAnyMoveKeyPressed = 1;
  }
}

// Update cursor position

setInterval(function() {
  isAnyMoveKeyPressed = 0;
  checkKeys();
  if (isAnyMoveKeyPressed) {
    // Erase old cursor
    table.childNodes[prevCursorY].childNodes[prevCursorX].innerHTML = '';  
    // Draw new cursor    
    table.childNodes[cursorY].childNodes[cursorX].innerHTML = cursor;
    prevCursorX = cursorX;
    prevCursorY = cursorY;
  }
}, 60);