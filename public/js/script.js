  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function(){
      var links = document.querySelector('.nav-links');
      var cta = document.querySelector('.nav-cta');
      var open = links.style.display === 'flex';
      if(!open){
        links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:72px;left:0;right:0;background:#14181B;padding:20px 32px;gap:18px;border-bottom:1px solid #3C4548;';
        cta.style.cssText = 'display:inline-block;position:absolute;top:130px;right:32px;';
      } else {
        links.style.display = 'none';
        cta.style.display = 'none';
      }
    });
  }

  function initializeCarousel() {
    var gallery = document.querySelector('.project-gallery');
    if (!gallery) return;

    var slides = Array.from(gallery.querySelectorAll('.carousel-slide'));
    var dots = Array.from(gallery.querySelectorAll('.carousel-dot'));
    if (!slides.length) return;

    var currentIndex = 0;
    var autoPlay;

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) {
        slide.classList.toggle('active', slideIndex === currentIndex);
      });
      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle('active', dotIndex === currentIndex);
      });
    }

    function startAutoPlay() {
      clearInterval(autoPlay);
      autoPlay = setInterval(function () {
        showSlide(currentIndex + 1);
      }, 3000);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        showSlide(parseInt(dot.getAttribute('data-slide'), 10));
        startAutoPlay();
      });
    });

    gallery.addEventListener('mouseenter', function () {
      clearInterval(autoPlay);
    });

    gallery.addEventListener('mouseleave', function () {
      startAutoPlay();
    });

    showSlide(0);
    startAutoPlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      window.setTimeout(initializeCarousel, 100);
    });
  } else {
    window.setTimeout(initializeCarousel, 100);
  }
