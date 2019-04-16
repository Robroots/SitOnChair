document.addEventListener('DOMContentLoaded', function() {
console.log('DOM');

    var hamburger = document.querySelector(".hamburger");
    var nav = document.querySelector("nav");
    var galleryButton = document.querySelector(".gallery button");
    var gallery = document.querySelector(".gallery .container");

    window.addEventListener("load", function(){
        if (innerWidth>=640){
            gallery.removeChild(galleryButton);
            gallery.querySelector(".description").appendChild(galleryButton);
        }
        galleryButton.style.display = "block";
    })//Changing place of appearance of gallery button depending mobile/not mobile

    hamburger.addEventListener("click", function(){
        this.classList.toggle("ham-clicked");
        nav.classList.toggle("show");
    })//Menu hamburger disappear and navigation sliding

    mobileMediaQuery(nav, hamburger, galleryButton, gallery);
});


function mobileMediaQuery(nav, hamburger, galleryButton,gallery) {
    var mobile = window.matchMedia("(min-width:640px)");
    mobile.addListener(function(check) {
        if (check.matches) {
        nav.classList.add("show");// 
        hamburger.classList.remove("ham-clicked");
        gallery.removeChild(galleryButton);
        gallery.querySelector(".description").appendChild(galleryButton);
        } else {
            nav.classList.remove("show");
            nav.style.display = "none";
            setTimeout(function(){
                nav.style.display = "block";
            },100);
            gallery.appendChild(galleryButton);
        }
    });
}
