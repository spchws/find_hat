// Please copy and paste your GitHub Repo on line 2 (optional)
// <GitHub Repo>

// JavaScript Assessment Rubric: https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)
// step 1 : Provide a random position on the field and outside of a defined 'off-limit' position.

// step 2 : Define a random starting position

// step 3 :  Set the hat location

// step 4 : JS Assessment: Find your hat //

// step 5 : Set the starting position

// step 6 : Set the hat location

// step 7 : Update current location on map

// step 8 : Set the number of holes to add between 1 and 3



const prompt = require('prompt-sync')({sigint: true});

// This lets us clear the screen
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.start = {
      x: 0,
      y: 0
    };
    this.hatPos = {
      x: 0,
      y: 0
    };
    this.locationX = 0;
    this.locationY = 0;
  }
  
  // Provide a random position on the field 
  // outside of a defined 'off-limit' position
  setPos(offLimit = {x:0, y:0}) {
    const pos = {
      x: 0,
      y: 0
    }
    do {
      pos.x = Math.floor(Math.random() * this.field[0].length);
      pos.y = Math.floor(Math.random() * this.field.length);
     } while (pos.x === offLimit.x && pos.y === offLimit.y);
    return pos;
  }
  
  // Define a random starting position
  setStart() {
    this.start = this.setPos();
    this.locationX = this.start.x;
    this.locationY = this.start.y;
    this.field[this.start.y][this.start.x] = pathCharacter;
  }
  
  // Set the hat location
  setHat() {
    this.hatPos = this.setPos(this.start)
    this.field[this.hatPos.y][this.hatPos.x] = hat;
  }
  
  runGame(hard = false) {
    // Set the starting position
    this.setStart();
    
    // Set the hat location
    this.setHat();
    
    let playing = true;
    while (playing) {
      this.print();
      this.getInput();
    
      if (!this.isInBounds()) {
        console.log('Out of bounds instruction.');
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log('Sorry, you fell down a hole.');
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log('Congrats, you found your hat!');
        playing = false;
        break;
      }
      
      // Update current location on map
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }
  
  print() {
    clear();
    this.field.forEach(element => console.log(element.join('')));
  }
  
  getInput() {
    const input = prompt('Enter the way by character -> Up = U, Down = D, Left = L, Right = R : ').toUpperCase();
    switch (input) {
      case 'U':
        this.locationY -= 1;
        break;
      case 'D':
        this.locationY += 1;
        break;
      case 'L':
        this.locationX -= 1;
        break;
      case 'R':
        this.locationX += 1;
        break;
      default:
        console.log('Enter U, D, L or R.');
        this.getInput();
        break;
    }
  }
  
  isInBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }
  
  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }
  
  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }
  
  addHoles() {
    // Set the number of holes to add between 1 and 3
    const numHoles = Math.floor(Math.random() * 3) + 1;
    for(let i = 1; i <= numHoles; i++) {
      let holePos = {
        x: 0,
        y: 0
      };
      do {
        holePos = this.setPos(this.hatPos);
      } while (holePos.x === this.locationX && holePos.y === this.locationY);
      this.field[holePos.y][holePos.x] = hole;
    }
  }
  
  static generateField(fieldH, fieldW, percentage = 0.1) {
    const field = new Array(fieldH).fill(0).map(element => new Array(fieldW));
    for(let y = 0; y < fieldH; y++) {
      for(let x = 0; x < fieldW; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole
      }
    }
    return field;
  }
}

const myField = new Field(Field.generateField(10,10,0.2),true);
myField.runGame(true);