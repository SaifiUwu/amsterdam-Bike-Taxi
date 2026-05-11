// Shared JS

document.addEventListener('DOMContentLoaded', () => {
  // Global Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.className = 'fixed top-0 left-0 h-1 bg-accent-gold z-[1000] shadow-[0_0_10px_rgba(212,175,55,0.8)] pointer-events-none transition-all duration-150 rounded-r-full';
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Prevent divide by zero if page can't scroll
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }
  });

  // IntersectionObserver for fade-in-up
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-section').forEach(section => observer.observe(section));

  // Typewriter effect
  const heroSubtitle = document.querySelector('.typewriter');
  if (heroSubtitle) {
    const texts = ["Private Bike Taxi & Rickshaw Tours", "Eco-Friendly Canal Rides from €12", "Night Rides · History Tours · Group Bookings"];
    let i = 0, j = 0, current = '', isDeleting = false;
    
    function type() {
      const fullText = texts[i % texts.length];
      current = isDeleting ? fullText.substring(0, j--) : fullText.substring(0, j++);
      heroSubtitle.textContent = current;
      if (!isDeleting && j === fullText.length) { isDeleting = true; setTimeout(type, 2000); }
      else if (isDeleting && j === 0) { isDeleting = false; i++; setTimeout(type, 500); }
      else setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
  }

  // Counters - Animate on scroll
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const start = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          
          counter.innerText = Math.ceil(target * easeProgress);
          
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target; // Ensure exact final number
          }
        };
        requestAnimationFrame(updateCount);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.1 });

  counters.forEach(counter => {
    counter.innerText = '0'; // Reset before observation
    counterObserver.observe(counter);
  });
  
  // Navbar scroll
  const nav = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('header-scrolled');
    } else {
      nav.classList.remove('header-scrolled');
    }
  });

  // Tour Booking Price Calculator
  const formTourSelect = document.getElementById('formTourSelect');
  const formGuestSelect = document.getElementById('formGuestSelect');
  const formDate = document.getElementById('formDate');
  const calculatedPriceDisplay = document.getElementById('calculatedPriceDisplay');

  if (formTourSelect && formGuestSelect && calculatedPriceDisplay) {
    const calculatePrice = () => {
      const option = formTourSelect.options[formTourSelect.selectedIndex];
      const basePrice = option ? parseFloat(option.dataset.price || 0) : 0;
      const guests = parseInt(formGuestSelect.value || 1);
      
      let total = basePrice * guests;
      // Example: add 10% on weekends? Or just base * guests.
      // let selectedDate = new Date(formDate.value);
      // if (!isNaN(selectedDate) && (selectedDate.getDay() === 0 || selectedDate.getDay() === 6)) {
      //   total *= 1.1; // Weekend surcharge
      // }
      
      calculatedPriceDisplay.textContent = '€' + total.toFixed(2);
    };

    formTourSelect.addEventListener('change', calculatePrice);
    formGuestSelect.addEventListener('change', calculatePrice);
    if(formDate) formDate.addEventListener('change', calculatePrice);
    calculatePrice(); // init
  }



  // FAQ Accordion
  const faqBtns = document.querySelectorAll('.faq-btn');
  faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.icon');
      
      const isOpen = content.classList.contains('h-0');
      
      // Close all others
      document.querySelectorAll('.faq-content').forEach(c => {
        c.classList.add('h-0');
        c.classList.remove('h-auto');
      });
      document.querySelectorAll('.faq-btn .icon').forEach(i => {
        i.textContent = '+';
        i.classList.remove('rotate-45');
      });

      // Open clicked if it was closed
      if (isOpen) {
        content.classList.remove('h-0');
        content.classList.add('h-auto');
        icon.textContent = '+'; // visual plus
        icon.classList.add('rotate-45'); // rotate to act as cross
      }
    });
  });

  // Global Promotional Popup
  if (!sessionStorage.getItem('popupDismissed')) {
    setTimeout(() => {
      const popupOverlay = document.createElement('div');
      popupOverlay.className = 'fixed inset-0 bg-black/80 z-[9999] flex justify-center items-center opacity-0 transition-opacity duration-500 backdrop-blur-sm px-4';
      
      const popupContent = document.createElement('div');
      popupContent.className = 'bg-bg-secondary border border-border p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full text-center relative transform scale-95 transition-transform duration-500 card-premium';
      
      popupContent.innerHTML = `
        <button class="absolute top-4 right-4 text-text-muted hover:text-accent-gold transition-colors text-3xl focus:outline-none" id="closePopup">&times;</button>
        <span class="text-accent-gold text-5xl mb-4 block">🚲</span>
        <h2 class="text-3xl font-extrabold mb-4 text-text-primary">Special Web Discount!</h2>
        <p class="text-text-secondary mb-8 text-lg">Book a tour today and get <strong class="text-accent-gold">10% OFF</strong> your total ride. Mention code <strong class="text-text-primary bg-bg-primary px-2 py-1 border border-border rounded">AMSTERDAM10</strong> to your driver.</p>
        <a href="services.html#book" class="bg-accent-gold hover:bg-accent-hover text-black px-8 py-4 rounded font-bold uppercase tracking-widest text-sm transition-colors inline-block w-full btn-premium">Book Now & Save</a>
      `;

      popupOverlay.appendChild(popupContent);
      document.body.appendChild(popupOverlay);

      // Trigger animation
      requestAnimationFrame(() => {
        popupOverlay.style.opacity = '1';
        popupContent.classList.remove('scale-95');
        popupContent.classList.add('scale-100');
      });

      const closePopup = () => {
        popupOverlay.style.opacity = '0';
        popupContent.classList.remove('scale-100');
        popupContent.classList.add('scale-95');
        setTimeout(() => popupOverlay.remove(), 500);
        sessionStorage.setItem('popupDismissed', 'true');
      };

      document.getElementById('closePopup').addEventListener('click', closePopup);
      popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) closePopup();
      });

    }, 3000); // Show after 3 seconds
  }

  // Carousel Logic
  const carouselTrack = document.getElementById('carousel-track');
  const carouselPrev = document.getElementById('carousel-prev');
  const carouselNext = document.getElementById('carousel-next');
  const carouselDots = document.querySelectorAll('#carousel-dots button');

  if (carouselTrack && carouselPrev && carouselNext && carouselDots.length) {
    let currentSlide = 0;
    const slideCount = carouselDots.length;
    let carouselInterval;

    const updateCarousel = () => {
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      carouselDots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('bg-accent-gold');
          dot.classList.remove('bg-white/50');
        } else {
          dot.classList.remove('bg-accent-gold');
          dot.classList.add('bg-white/50');
        }
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slideCount;
      updateCarousel();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateCarousel();
    };
    
    const resetInterval = () => {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(nextSlide, 5000);
    };

    carouselNext.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
    
    carouselPrev.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });

    carouselDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
        resetInterval();
      });
    });

    // Auto-advance
    carouselInterval = setInterval(nextSlide, 5000);
  }

  // Gallery Filter Logic
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-accent-gold', 'text-black');
        b.classList.add('bg-transparent', 'text-text-primary');
      });
      // Add active to clicked
      btn.classList.add('active', 'bg-accent-gold', 'text-black');
      btn.classList.remove('bg-transparent', 'text-text-primary');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else {
          const category = item.getAttribute('data-category');
          if (category && category.includes(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });

  // Lightbox Logic
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightbox.classList.remove('hidden');
          lightbox.classList.add('flex');
          // small delay for transition
          setTimeout(() => {
            lightbox.classList.remove('opacity-0');
            lightboxImg.classList.remove('scale-95');
            lightboxImg.classList.add('scale-100');
          }, 10);
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightboxFn = () => {
      lightbox.classList.add('opacity-0');
      lightboxImg.classList.remove('scale-100');
      lightboxImg.classList.add('scale-95');
      setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
      }, 300);
      document.body.style.overflow = 'auto';
    };

    lightboxClose.addEventListener('click', closeLightboxFn);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightboxFn();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightboxFn();
      }
    });
  }

  // Hamburger Menu Logic
  const openMenuBtn = document.getElementById('open-menu');
  const closeMenuBtn = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  if (openMenuBtn && closeMenuBtn && mobileMenu) {
    openMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
      document.body.style.overflow = ''; // Restore scrolling
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
      }
    });
  }

});
