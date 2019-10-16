var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for (var i = 1; i < 6; i++) {
  var imageName = "./images/pic" + i + ".jpg";
  var newImage = document.createElement('img');
  newImage.setAttribute('src', imageName);
  thumbBar.appendChild(newImage);
  newImage.onclick = setThumb;
}

/* Setting the thumbnail */
function setThumb() {
  var src = this.getAttribute("src");
  displayedImage.setAttribute("src", src);
}

/* Wiring up the Darken/Lighten button */
btn.setAttribute("class", "dark");
btn.onclick = darkenLighten;

function darkenLighten() {
  var className = this.getAttribute("class");
  console.log(className);
  if (className == "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else if (className == "light") {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
}
