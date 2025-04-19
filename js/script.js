(function($) {
	
	"use strict";

  /* Basic Login proteccion for roster.html */
  if (window.location.pathname.includes("roster.html")) {
    document.addEventListener("DOMContentLoaded", function () {
      const username = prompt("Enter username:");
      const password = prompt("Enter password:");

      if (username !== "snazzy" || password !== "paws123") {
        alert("Unauthorized access. Redirecting to home.");
        window.location.href = "index.html";
      }
    });
  }

  /* Mobile Menu */
  var MobileMenu = function() {

      var toggleButton = $('.header-menu-toggle'),
          nav = $('.header-nav-wrap');

      toggleButton.on('click', function(event){
          event.preventDefault();

          toggleButton.toggleClass('is-clicked');
          nav.slideToggle();
      });

      if (toggleButton.is(':visible')) nav.addClass('mobile');

      nav.find('a').on("click", function() {
          if (nav.hasClass('mobile')) {
              toggleButton.toggleClass('is-clicked');
              nav.slideToggle(); 
          }
      });

  };

  // init Chocolat light box
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
    });
  }

  $(document).ready(function () {
    MobileMenu();
    initChocolat();

    /* Slider */
    var swiper = new Swiper(".mySwiper", {
      autoHeight: true,
      spaceBetween: 20,
      navigation: {
        nextEl: ".slide-button-next",
        prevEl: ".slide-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    /* Video Modal */
    var $videoSrc;  
    $('.play-btn').click(function() {
        $videoSrc = $(this).data("src");
    });

    $('#myModal').on('shown.bs.modal', function (e) {
      $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0"); 
    });

    $('#myModal').on('hide.bs.modal', function (e) {
      $("#video").attr('src', $videoSrc); 
    });

    // Easy Pie Chart Initialization with blur effect
    function initializeChart() {
      $('.chart').easyPieChart({
        easing: 'easeOutBounce',
        size: 300, 
        lineWidth: 8,
        barColor: '#6565ff',
        trackColor: '#fff',
        scaleColor: '#fff',
        lineCap: 'square',
        animate: {
          duration: 4000,
          enabled: true
        },
        onStep: function(from, to, percent) {
          const maxBlur = 8; 
          const blurValue = maxBlur * (1 - (percent / 100));
          $(this.el).find('img').css('filter', `blur(${blurValue}px)`);
        }
      });
    }

    function handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initializeChart();
          observer.unobserve(entry.target);
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection);
    const servicesWrap = document.getElementsByClassName('services-wrap')[0];
    if (servicesWrap) observer.observe(servicesWrap);

  });

  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hide-preloader");
  });

// 3D effect for roster cards
  document.querySelectorAll('.roster-3d-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardX = e.clientX - cardRect.left;
      const cardY = e.clientY - cardRect.top;
      const centerX = cardRect.width / 2;
      const centerY = cardRect.height / 2;
      const rotateX = (cardY - centerY) / 10;
      const rotateY = (centerX - cardX) / 10;
  
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.boxShadow = `${-rotateY}px ${rotateX}px 30px rgba(0,0,0,0.2)`;
    });
  
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      card.style.boxShadow = '0 15px 25px rgba(0,0,0,0.15)';
    });
  });
  

})(window.jQuery);
