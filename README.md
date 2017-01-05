For this project, I wanted to use particles to create an interactive sound visualizer that would respond to sounds made by the user and to music.

I first tried to create the particles using the p5.particles.js library, but I found that the particle definitions did not allow me as much control over particle properties as I wanted. For example, the location of the particle fountain/source had to be defined in the setup() function, so I couldn’t make the particle fountain follow the mouse.

Luckily, I found an example script by Hunter Loftis (http://www.playfuljs.com/particle-effects-are-easy/) that created particles that followed the mouse. His code was originally written in HTML, so I translated most of it into javascript (with the exception of some lines that had to do with HTML canvas properties). 

To add music that the particles could respond to, I reused the code from my HW4/5 Sound Visualizer to preload music and create a drop-down list of songs.

I wanted to have my particle sound visualizer fill the entire window, so I tied the canvas size to windowWidth and windowHeight at the moment the program is launched. I used the p5.sound.js library and had my code activate the user’s microphone, and tied the level of microphone sound to the stroke width of the particles, so that they would get bigger in response to louder sounds and disappear entirely when the room was silent. 