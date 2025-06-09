document.addEventListener('DOMContentLoaded', function() {

  const productSlider = new Swiper('.products-scroll-container', {
    
    slidesPerView: 4, 
    spaceBetween: 24, 
    slidesPerGroup: 4,
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
        slidesPerGroup: 1,
      },
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

  const logoLink = document.querySelector('.nav-left-logo'); 
    if (logoLink) {
        logoLink.addEventListener('click', () => {
            console.log('Kliknięto w logo!');
            updatePageMeta('FORMA\'SINT. - Strona Główna', 'Sklep z odzieżą sportową i sprzętem górskim. Znajdź swoje ulubione produkty!');
        });
    }

  const menuHomeLink = document.querySelector('.nav-link[href="#home"]');
  console.log('menuHomeLink element:', menuHomeLink);
  const featuredProductsLink = document.querySelector('a[href="#featured-products"]');
  const productListingLink = document.querySelector('a[href="#product-listing"]');

  const metaDescriptionTag = document.querySelector('meta[name="description"]');

  function updatePageMeta(title, description) {
    document.title = title;
    if (metaDescriptionTag) { 
      metaDescriptionTag.setAttribute('content', description);
    }
  }

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

        if (window.innerWidth < 768) {
          if (index === 4) {
            productsGridContainer.appendChild(productsGridBanner);
          }
        } else {
          if (index === 5) {
            productsGridContainer.appendChild(productsGridBanner);
          }
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

  if (menuHomeLink) {
      menuHomeLink.addEventListener('click', () => {
      console.log('Kliknięto w link HOME!');
      updatePageMeta('FORMA\'SINT. - Strona Główna', 'Sklep z odzieżą sportową i sprzętem górskim. Znajdź swoje ulubione produkty!');
      });
    }

    if (featuredProductsLink) {
      featuredProductsLink.addEventListener('click', () => {
      updatePageMeta('FORMA\'SINT. - Produkty Polecane', 'Odkryj nasze najpopularniejsze produkty i bestsellery.');
      });
    }

    if (productListingLink) {
      productListingLink.addEventListener('click', () => {
        updatePageMeta('FORMA\'SINT. - Lista Produktów', 'Przeglądaj wszystkie produkty dostępne w naszym sklepie.');
      });
    }

  
    updatePageMeta('FORMA\'SINT. - Strona Główna', 'Sklep z odzieżą sportową i sprzętem górskim. Znajdź swoje ulubione produkty!');

 
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileMenuCloseButton = document.querySelector('.mobile-menu-close-button');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      mobileMenuOverlay.classList.add('active');
    });
  }

  if (mobileMenuCloseButton) {
    mobileMenuCloseButton.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('active');
    });
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (event) => {
      if (event.target === mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('active');
      }
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('active');
      
      if (link.getAttribute('href') === '#home') {
        updatePageMeta('FORMA\'SINT. - Strona Główna', 'Sklep z odzieżą sportową i sprzętem górskim. Znajdź swoje ulubione produkty!');
      } else if (link.getAttribute('href') === '#featured-products') {
        updatePageMeta('FORMA\'SINT. - Produkty Polecane', 'Odkryj nasze najpopularniejsze produkty i bestsellery.');
      } else if (link.getAttribute('href') === '#product-listing') {
        updatePageMeta('FORMA\'SINT. - Lista Produktów', 'Przeglądaj wszystkie produkty dostępne w naszym sklepie.');
      }
    });
  });

  function updateMetaOnScroll() {
    const sections = ['home', 'featured-products', 'product-listing'];
    const scrollPosition = window.scrollY + 100; 

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          if (section === 'home') {
            updatePageMeta('FORMA\'SINT. - Strona Główna', 'Sklep z odzieżą sportową i sprzętem górskim. Znajdź swoje ulubione produkty!');
          } else if (section === 'featured-products') {
            updatePageMeta('FORMA\'SINT. - Produkty Polecane', 'Odkryj nasze najpopularniejsze produkty i bestsellery.');
          } else if (section === 'product-listing') {
            updatePageMeta('FORMA\'SINT. - Lista Produktów', 'Przeglądaj wszystkie produkty dostępne w naszym sklepie.');
          }
          break;
        }
      }
    }
  }

  window.addEventListener('scroll', updateMetaOnScroll);
  updateMetaOnScroll();

});

