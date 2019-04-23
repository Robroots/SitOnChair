document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM");

  var hamburger = document.querySelector(".hamburger");
  var nav = document.querySelector("nav");
  var galleryButton = document.querySelector(".gallery button");
  var gallery = document.querySelector(".gallery .container");
  var checkbox = document.querySelectorAll(".checkbox");
  var aboutUs = nav.querySelector("li");
  var dropdown = nav.querySelector(".nav-dropdown");
  var sliderPrevBtn = gallery.firstElementChild;
  var sliderNextBtn = gallery.lastElementChild;
  var sliderImages = gallery.querySelectorAll("img");
  var blackChair = sliderImages[0];

  // Product price calculator below

  var form = document.querySelector(".form");
  var typeVal = form.querySelector("#chair-type");
  var colorVal = form.querySelector("#chair-color");
  var fabricVal = form.querySelector("#chair-fabric");
  var transportCheck = form.querySelector(".check-app input");
  
  var summary = document.querySelector(".summary");
  var typeSpan = summary.querySelector(".title");
  var colorSpan = summary.querySelector(".color");
  var fabricSpan = summary.querySelector(".fabric");
  var transportSpan = summary.querySelector(".transport");

  var typeSpanPrice = summary.querySelector(".title.value");
  var colorSpanPrice = summary.querySelector(".color.value");
  var fabricSpanPrice = summary.querySelector(".fabric.value");
  var transportSpanPrice = summary.querySelector(".transport.value");
  var sumSpan = summary.querySelector(".sum");
  
  var typePrice = 0;
  var colorPrice = 0;
  var fabricPrice = 0;
  var transportPrice = 0;

  function setSum(){
    sumSpan.innerText = typePrice + colorPrice + fabricPrice + transportPrice + "zł";
  }
  
  typeVal.onchange = function(){
    typeSpan.innerText = this.options[this.selectedIndex].text;
    typeSpanPrice.innerText = this.value;
    typePrice = parseInt(this.value);
    setSum();
  };

  colorVal.onchange = function(){
    colorSpan.innerText = this.options[this.selectedIndex].text;
    colorSpanPrice.innerText = this.value;
    colorPrice = parseInt(this.value);
    setSum();
  };

  fabricVal.onchange = function(){
    fabricSpan.innerText = this.options[this.selectedIndex].text;
    fabricSpanPrice.innerText = this.value;
    fabricPrice = parseInt(this.value);
    setSum();
  };

  transportCheck.onchange = function(){
    if(this.checked){
      transportSpan.innerText = this.nextElementSibling.innerText;
      transportSpanPrice.innerText = this.dataset.transportPrice;
      transportPrice = parseInt(this.dataset.transportPrice);
    } else {
      transportSpan.innerText = "";
      transportSpanPrice.innerText = "";
      transportPrice = 0;
    }
    setSum();
  };


  //Product price calculator above

  var currentImg = 0; //Gallery img counter
  
  sliderNextBtn.addEventListener("click", function(e){
    sliderNextBtn.classList.toggle("flash");
    sliderImages[currentImg].classList.add("move"); //Sliding backward image effect
    currentImg++;
    if(currentImg === sliderImages.length - 1){ 
      sliderNextBtn.classList.add("pointer-events"); //Making slider button inactive
    } else if(currentImg !== 0){
      sliderPrevBtn.classList.remove("pointer-events"); //Making slider button active
    }
    sliderImages[currentImg].classList.remove("move-back"); //Sliding forward image effect
    setTimeout(function(){
      sliderNextBtn.classList.toggle("flash");
    },200);
  });

  sliderPrevBtn.addEventListener("click", function(e){
    sliderPrevBtn.classList.toggle("flash");
    sliderImages[currentImg].classList.add("move-back");
    currentImg--;
    if(currentImg === 0){
      sliderPrevBtn.classList.add("pointer-events");
    }else if(currentImg !== sliderImages.length -1){
      sliderNextBtn.classList.remove("pointer-events");
    }
    sliderImages[currentImg].classList.remove("move"); 
    setTimeout(function(){
      sliderPrevBtn.classList.toggle("flash");
    },200);
  });

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
    this.classList.toggle("ham-clicked"); //Hamburger clicked visual effect
    nav.classList.toggle("show"); // Navigation sliding
  });

  aboutUs.addEventListener("mouseover", function(){
      dropdown.classList.add("visibility"); //Dropdown menu show
  });

  aboutUs.addEventListener("mouseout", function(){
      dropdown.classList.remove("visibility"); //Dropdown menu hide
  });

  for(var i = 0;i<checkbox.length; i++){
    checkbox[i].addEventListener("click", function() {
      this.classList.toggle("checked"); //Checkbox checked/unchecked
    });  
  }

  desktopEvents(blackChair);
  mobileEvents(nav, hamburger, galleryButton, gallery, dropdown);
});

function mobileEvents(nav, hamburger, galleryButton, gallery, dropdown) {
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

function desktopEvents(blackChair){
  var desktop = window.matchMedia("(min-width: 1024px)");
  desktop.addListener(function(check){
    if(!check.matches && blackChair.classList.contains("move")){
      blackChair.parentElement.classList.add("bg-image");//Restoring black chair if slider moved in desktop mode
    } else {
      blackChair.parentElement.classList.remove("bg-image"); //If changed to desktop again - removing black chair duplicate
    }
  });
}