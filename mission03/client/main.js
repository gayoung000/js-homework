// Initialize Swiper 

// 모든 슬라이드 요소를 가져오기

new Swiper(".mySwiper", {
  // 모바일 버전
  slidesPerView: 'auto',
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // 아래가 안먹음
  breakpoints: {
        
    480: {
      slidesPerView: 'auto',  //브라우저가 480보다 클 때
      spaceBetween: 30,
    },

    768: {
      slidesPerView: 'auto',  //브라우저가 768보다 클 때
      spaceBetween: 30,
    },
  },
});


// swiper-slide 요소에 클릭 이벤트 추가
const slides = document.querySelectorAll('.swiper-slide');
slides.forEach(slide => {
  slide.addEventListener('click', () => {
    slide.classList.toggle('flipped');
  });
});


const refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click', () => {
  location.reload();
});



/*document.addEventListener("DOMContentLoaded", function() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });

  // swiper-slide 요소에 클릭 이벤트 추가
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      slide.classList.toggle('flipped');
    });
  });
});
*/





