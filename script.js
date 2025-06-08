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


  const productsGridContainer = document.querySelector('.products-grid-container');
  const pageSizeSelect = document.getElementById('pageSizeSelect');
  const productsGridBanner = document.querySelector('.products-grid-banner');

  const popup = document.querySelector('.popup');
  const popupProductId = document.getElementById('popupProductId');
  const popupProductImage = document.getElementById('popupProductImage');
  const popupCloseButton = document.querySelector('.popup-close-button');

  async function fetchAndRenderProducts(pageSize, pageNumber = 1) {
    try {
      console.log(`Pobieram produkty: pageSize=${pageSize}, pageNumber=${pageNumber}`);
      const response = await fetch(`https://brandstestowy.smallhost.pl/api/random?pageSize=${pageSize}&pageNumber=${pageNumber}`);
      
      if (!response.ok) {
        throw new Error(`Błąd HTTP! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Pobrane dane z API:', data);

      const existingProductCards = productsGridContainer.querySelectorAll('.product-card-image-wrapper');
      existingProductCards.forEach(card => card.remove());

      data.data.forEach((product, index) => {
        console.log('Przetwarzany produkt:', product);
        const productCard = document.createElement('div');
        productCard.classList.add('product-card-image-wrapper');

        productCard.innerHTML = `
          
          <div class="product-card-image-wrapper">
            <div class="product-id-label">ID: ${product.id}</div>
            <img class="product-card-image" src="${product.image}" alt="${product.text}" />
          </div>
          
        `;

        if (index === 5) {
          productsGridContainer.appendChild(productsGridBanner);
        }

        productsGridContainer.appendChild(productCard);

        productCard.addEventListener('click', () => {
        popupProductId.textContent = product.id;
        popupProductImage.src = product.image;
        popupProductImage.alt = product.text;
        popup.classList.add('active'); 
      });
      });

    } catch (error) {
      console.error('Błąd podczas pobierania produktów:', error);
    }
  }


  if (pageSizeSelect) {
    fetchAndRenderProducts(pageSizeSelect.value);

    pageSizeSelect.addEventListener('change', (event) => {
      fetchAndRenderProducts(event.target.value);
    });
  }


  if (popupCloseButton) {
      popupCloseButton.addEventListener('click', () => {
        popup.classList.remove('active'); 
      });
    }

    if (popup) {
      popup.addEventListener('click', (event) => {
        if (event.target === popup) {
          popup.classList.remove('active');
        }
      });
    }
});

