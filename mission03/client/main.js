// Initialize Swiper 

// 렌덤 숫자 만들기
// const random = (Math.floor(Math.random() * 6)) +1 ;



const usedNumbers = new Set();

function getRandomNumber() {
  let number;
  do {
    number = (Math.floor(Math.random() * 6)) + 1;
  } while (usedNumbers.has(number));
    usedNumbers.add(number);
    return number;
}



// swiper-slide 요소에 클릭 이벤트 추가
const slides = document.querySelectorAll('.swiper-slide');

slides.forEach(slide => {
  const img = slide.querySelector('img');
  // img.src = `./assets/back${random}.png`;
  img.src = `./assets/back${getRandomNumber()}.png`;
  slide.addEventListener('click', () => {
    slide.classList.toggle('flipped');
  });
});




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
  // breakpoints: {
  //   480: {
  //     slidesPerView: 'auto',  //브라우저가 480보다 클 때
  //     spaceBetween: 30,
  //   },

  //   768: {
  //     slidesPerView: 'auto',  //브라우저가 768보다 클 때
  //     spaceBetween: 30,
  //   },
  // },
});



const refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click', () => {
  location.reload();
});


