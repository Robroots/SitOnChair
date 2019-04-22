document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM");

  var hamburger = document.querySelector(".hamburger");
  var nav = document.querySelector("nav");
  var galleryButton = document.querySelector(".gallery button");
  var gallery = document.querySelector(".gallery .container");
  var checkbox = document.querySelector(".checkbox");
  var aboutUs = nav.querySelector("li");
  var dropdown = nav.querySelector(".nav-dropdown");
  var sliderPrevBtn = gallery.firstElementChild;
  var sliderNextBtn = gallery.lastElementChild;
  var sliderImages = gallery.querySelectorAll("img");
  var blackChair = sliderImages[0];

  var currentImg = 0;


  sliderNextBtn.addEventListener("click", function(e){
    sliderNextBtn.classList.toggle("flash");
    sliderImages[currentImg].classList.add("move");
    // sliderImages[currentImg].classList.remove("visibility");
    currentImg++;
    if(currentImg === sliderImages.length - 1){
      sliderNextBtn.classList.add("pointer-events");
    } else if(currentImg !== 0){
      sliderPrevBtn.classList.remove("pointer-events");
    }
    sliderImages[currentImg].classList.remove("move-back");
    // sliderImages[currentImg].classList.add("visibility");
    setTimeout(function(){
      sliderNextBtn.classList.toggle("flash");
    },200)
  })

  sliderPrevBtn.addEventListener("click", function(e){
    sliderPrevBtn.classList.toggle("flash");
    sliderImages[currentImg].classList.add("move-back");
    // sliderImages[currentImg].classList.remove("visibility");
    currentImg--;
    if(currentImg === 0){
      sliderPrevBtn.classList.add("pointer-events");
    }else if(currentImg !== sliderImages.length -1){
      sliderNextBtn.classList.remove("pointer-events");
    }
    sliderImages[currentImg].classList.remove("move");
    // sliderImages[currentImg].classList.add("visibility");
    setTimeout(function(){
      sliderPrevBtn.classList.toggle("flash");
    },200)
  })

  window.addEventListener("load", function() {
    if (innerWidth >= 640) {
      gallery.removeChild(galleryButton);
      gallery.querySelector(".description").appendChild(galleryButton);
        //Changing place of appearance of gallery button depending mobile/not mobile

      nav.classList.toggle("show"); 
        //Determining initial visibility of nav depending on mobile/not mobile
    }
    galleryButton.style.display = "block";
  });

  hamburger.addEventListener("click", function() {
    this.classList.toggle("ham-clicked");
    nav.classList.toggle("show");
  }); //Menu hamburger disappear and navigation sliding

  aboutUs.addEventListener("mouseover", function(){
      dropdown.classList.add("visibility");
  })

  aboutUs.addEventListener("mouseout", function(){
      dropdown.classList.remove("visibility")
  })

  checkbox.addEventListener("click", function() {
    this.classList.toggle("checked");
  }); //Checkbox checked/unchecked

  desktopEvents(blackChair, sliderPrevBtn);
  mobileMediaQuery(nav, hamburger, galleryButton, gallery, dropdown);
});

function mobileMediaQuery(nav, hamburger, galleryButton, gallery, dropdown) {
  var mobile = window.matchMedia("(min-width:640px)");
  mobile.addListener(function(check) {
    if (check.matches) {
      nav.classList.add("show");
      hamburger.classList.remove("ham-clicked");
      gallery.removeChild(galleryButton);
      gallery.querySelector(".description").appendChild(galleryButton);
      dropdown.classList.remove("visibility");
    } else {
      nav.classList.remove("show");
      nav.style.display = "none";
      setTimeout(function() {
        nav.style.display = "block";
      }, 100);
      gallery.appendChild(galleryButton);
      dropdown.classList.remove("visibility");
    }
  });
}

function desktopEvents(blackChair,sliderPrevBtn){
  var desktop = window.matchMedia("(min-width: 1024px)");
  desktop.addListener(function(check){
    if(!check.matches && blackChair.classList.contains("move")){
      blackChair.parentElement.classList.add("bg-image");
    } else {
      blackChair.parentElement.classList.remove("bg-image");
    }
  })
}
