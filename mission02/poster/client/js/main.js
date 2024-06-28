

/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

// DOM 요소 객체 접근
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



// =============================================== //
//                    유틸 함수                      //
// =============================================== //

function isString(data){
  return Object.prototype.toString.call(data).slice(8,-1).toLowerCase()  === 'string';
}



// =============================================== //
//                    렌더링 함수                     //
// =============================================== //

// ========= 이미지 set 함수 ======== //

function setImage(node, {src, alt}){
  if (isString(node)) node = document.querySelector(node);
  
  // node의 이미지 변경
  node.src = src;
  node.alt = alt; 
}


// ========= 상단 텍스트 set 함수 ======== //

function setNameText(node, name){
  if (isString(node)) node = document.querySelector(node);

  // node의 내용 변경
  node.textContent = name;
}


// ========= 배경 색상 set 함수 ======== //

function setBgColor(node, colorA, colorB='#000'){
  if (isString(node)) node = document.querySelector(node);

  // node의 색상 변경
  node.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
}


// ========= 오디오 set 함수 ======== //

function setAudio(src) {
  if (!src) return;

  // 기존 오디오 재생 중이면 멈춤.
  if (currentAudio) {
    currentAudio.pause();
  }

  // 새로운 오디오 재생
  currentAudio = new AudioPlayer(src);
  currentAudio.play();
}



// =============================================== //
//                  이벤트 헨들링 함수                  //
// =============================================== //
function handleNavClick (e){

  // target 
  const target = e.target

  // target의 li 수집
  const li = target.closest('li');

  // li 없는 ul 클릭 시 이벤트 종료
  if(!li) return;

  // li에 해당하는 index 값 가져오기
  const index = li.dataset.index;

  // 위의 index에 해당하는 data의 name 속성 가져오기
  const dataName = data[index-1].name; 

  // is-active 속성 넣고 빼기 
  const children = ul.children;
  for (let targetLi of children) {
    targetLi.classList.remove("is-active");
  }
  li.classList.add("is-active");
  
  // 렌더링 함수에서 필요할 변수
  const mainImgData = {
    src : `./assets/${dataName}.jpeg`,
    alt :  data[index-1].alt
  }

  const backgroundColor = {
    colorA : data[index-1].color[0],
    colorB : data[index-1].color[1] 
  }

  const dataSrc = audioSources[index-1].src;

  // 렌더링 함수 호출하기
  setImage(mainImg, mainImgData);
  setNameText(h1, dataName);
  setBgColor(body, backgroundColor);
  setAudio(dataSrc);
}

nav.addEventListener('click', handleNavClick)











