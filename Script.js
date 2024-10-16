
// Function to play the sound based on the key pressed or button clicked
function drumkit(e) { //is even we passed were button should be pressed and it sotore inside the event e morover it using that event we should select the attribute e data key also
  const keyCode = e.target.getAttribute('data-key');// that will identiyf the which key should be pressed ,oreover we fetched the html attribute data key that we stored in html to idnetify the whic data key it is
  const audio = document.getElementById(keyCode);// here we should idenfiy the code audio id that we set in to the audio to idetify the music using butoon dtakey

  audio.play();// this method is oftent to use the play the document audio

}
const buttons = document.querySelectorAll('button');//it represent all the butttons using nodelist that has same type as name button but using all it possible to select all the buttons with same type
buttons.forEach((button) => {//here we pass the For Each and provide arraiw funciion so it will go trough every button 
  button.addEventListener('click', drumkit);//here we pass the tow arguments one is click even and sceond is drumkit so it will reflect function drumkit
 
});
