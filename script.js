document.addEventListener('DOMContentLoaded', function() {

  const productSlider = new Swiper('.products-scroll-container', {
    
    slidesPerView: 4, 
    spaceBetween: 24, 
    slidesPerGroup: 4,
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 3,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 24,
        slidesPerGroup: 4,
      },
    },

  });

});