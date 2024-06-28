

/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

const nav = document.querySelector('nav');
const mainImg = document.querySelector('.visual img');
const h1 = document.querySelector('h1');
const body = document.body;
const ul = document.querySelector('ul');


// 오디오 파일 경로
const audioSources = [
  { src : './assets/audio/ember.m4a' },
  { src : './assets/audio/wade.m4a' },
  { src : './assets/audio/clod.m4a' },
  { src : './assets/audio/gale.m4a' }
];

// 전역 Audio 객체
let currentAudio = null;

// ************ 이미지 set 함수 ************ //

function setImage(e){

  // target의 li 수집
  const targetLi = e.target.closest('li');

  // li 없는 ul 클릭 시 이벤트 종료
  if(!targetLi) return;

  // targetLi에 해당하는 index 값 가져오기
  const targetIndex = targetLi.dataset.index;

  // 위의 index에 해당하는 data의 name 속성 가져오기
  const targetDataName = data[targetIndex-1].name; // .toLowerCase() 안해도 됨.

  // is-active 속성 넣고 빼기 
  const children = ul.children;
  for (let targetLi of children) {
    targetLi.classList.remove("is-active");
  }
  targetLi.classList.add("is-active");


  // mainImg의 이미지 소스와 대체 텍스트 변경
  mainImg.src = `./assets/${targetDataName}.jpeg`;
  mainImg.alt = data[targetIndex-1].alt;  
}



// ************ 상단 텍스트 set 함수 ************ //

function setNameText(e){
 const targetLi = e.target.closest('li');
 if(!targetLi) return;

 const targetIndex = targetLi.dataset.index;
 const targetDataName = data[targetIndex-1].name; 

 h1.textContent = targetDataName;
}



// ************ 배경 색상 set 함수 ************ //

function setBgColor(e){
  const targetLi = e.target.closest('li');
  if(!targetLi) return;
 
  const targetIndex = targetLi.dataset.index;
  const colorA = data[targetIndex-1].color[0];
  const colorB = data[targetIndex-1].color[1] || '#000';

  body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
}





// ************ 오디오 set 함수 ************ //

function setAudio(e) {
  const targetLi = e.target.closest('li');
  if (!targetLi) return;

  const targetIndex = targetLi.dataset.index;
  const targetDataSrc = audioSources[targetIndex-1].src;
  
  if (!targetDataSrc) return;

  // 기존 오디오 재생 중이면 멈춤.
  if (currentAudio) {
    currentAudio.pause();
  }

  // 새로운 오디오 재생
  currentAudio = new AudioPlayer(targetDataSrc);
  currentAudio.play();
}




nav.addEventListener('click', setImage)
nav.addEventListener('click', setNameText)
nav.addEventListener('click', setBgColor)
nav.addEventListener('click', setAudio);











