// Why interesting?
// This code creates a dynamic and visually appealing animation using the p5.js library. 
// The animation consists of a quadrilateral shape that continuously changes its position and color over time, creating an engaging visual effect.
//  The use of modulo and division operations to calculate the vertices of the quadrilateral adds complexity and unpredictability to the shape's movement, making it interesting to watch. 


i=5,s=900,t=1200;             // Initialize variables： Counter i, canvas size s and t
function setup(){             // Setup function to create canvas and set no stroke for shapes
    createCanvas(t,s);        // Create a canvas of width t and height s
    noStroke()                // Draw shapes without stroke
}
function draw(){              // Main draw function that creeates the animation
    clear()                   // Clear the background on each frame
    fill(i++%256,249);        // Set fill color with changing gray value and constant alpha
                              // The changing gray value is determined by the counter i, which increments each frame
    quad(                     // Draw a quadrilateral with vertices based on the counter i and canvas size s and t
                              // Four vertices are defined for the quadrilateral
                              // The coordinates of the vertices are calculated using modulo and division operations to create a dynamic shape that changes over time
        // The first vertex
        i%t,                  // x-coordinate of first vertex
        i/3%s,                // y-coordinate of first vertex
        // The second vertex
        i/4%t,                // x-coordinate of second vertex
        i%s,                  // y-coordinate of second vertex
        // The third vertex
        i/5%t,                // x-coordinate of third vertex
        i/4%s,                // y-coordinate of third vertex
        // The fourth vertex
        i/3%t,                // x-coordinate of fourth vertex
        i/2%s                 // y-coordinate of fourth vertex
    )
}