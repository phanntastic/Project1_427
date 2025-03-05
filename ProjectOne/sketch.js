let car;
let bg;
let carImage;
let newBg; // New background image
let zoomLevel = 1; // Default zoom level (no zoom)

function preload() {
  carImage = loadImage('assets/911GT3RSOverhead.png'); // Load car image
  bg = loadImage('assets/ParkingLot.jpg'); // Load track background
  newBg = loadImage('assets/racetrack.jpg'); // Load new background image
}

function setup() {
  createCanvas(1200, 800);

 car = {
    x: width * 0.2, // Move the car to the left side (20% from the left)
    y: height / 2, // Keep it vertically centered
    speed: 5,
    angle: PI, // Start facing down
    targetAngle: PI, // Initial target angle
    rotationSpeed: 0.03, // Slow rotation speed
    getSpeed: function() {
      return this.speed;
    },

    driveForward: function() {
      this.x += cos(this.angle) * this.getSpeed();
      this.y += sin(this.angle) * this.getSpeed();
    },

    driveBackward: function() {
      this.x -= cos(this.angle) * this.getSpeed();
      this.y -= sin(this.angle) * this.getSpeed();
    },

    turnLeft: function() {
      this.targetAngle -= this.rotationSpeed;
    },

    turnRight: function() {
      this.targetAngle += this.rotationSpeed;
    },

    displayCar: function() {
      this.angle = lerp(this.angle, this.targetAngle, 0.1); // Smooth rotation

      push();
      translate(this.x, this.y);
      rotate(this.angle + PI);  // Rotate 180 degrees (PI) to flip the car image
      imageMode(CENTER);
      image(carImage, 0, 0, 150, 120);  // Display the car image at the new angle
      pop();
    }
  };

}

function draw() {
  // Check if the car goes off the right side of the canvas
  if (car.x > width) {
    bg = newBg; // Change the background image
    zoomLevel = 1.5; // Set the zoom level to 1.5 for zooming in
    car.x = 0; // Reset the car's position (optional)
  }

  if (bg === newBg) {
    // Apply zoom if we are showing the new background
    push();
    translate(width / 2, height / 2); // Translate to the center of the canvas
    scale(zoomLevel); // Zoom in by the zoom level
    imageMode(CENTER); // Display the image centered
    image(bg, 0, 0, bg.width, bg.height); // Draw the zoomed background
    pop();
  } else {
    // If the background is not zoomed, display it normally
    image(bg, 0, 0, width, height);
  }

  // Continuous movement based on key holding
  if (keyIsDown(UP_ARROW)) {
    car.driveForward();
  } 
  if (keyIsDown(DOWN_ARROW)) {
    car.driveBackward();
  }

  // Allow turning left and right even if the car is stationary
  if (keyIsDown(LEFT_ARROW)) {
    car.turnLeft();
  } 
  if (keyIsDown(RIGHT_ARROW)) {
    car.turnRight();
  }

  car.displayCar();

  // Display control instructions
  displayControls();
}

function displayControls() {
  textAlign(LEFT, TOP); // Align text to the top-left corner
  fill(255); // Set the text color to white
  textSize(18); // Set the text size
  
  text("Controls:", 20, 20); // Title for controls
  text("Left Arrow = Turn Left", 20, 50);  // Control for turning left
  text("Right Arrow = Turn Right", 20, 70); // Control for turning right
  text("Up Arrow = Drive Forward", 20, 90); // Control for driving forward
  text("Down Arrow = Reverse", 20, 110); // Control for reversing
}
    
    //call the relevant method of the car object here.
    //for ex car.driveUp();


   

  //etc. for all the other keycodesa
 