

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

// ************ 이미지 set 함수 ************ //

function setImage(e){

  // target의 li 수집
  const target = e.target.closest('li');

  // li 없는 ul 클릭 시 이벤트 종료
  if(!target) return;

  // target(li)에 해당하는 index 값(1부터 시작) 가져오기 
  const targetIndex = target.dataset.index;

  // 위의 index에 해당하는 data의 name 속성 가져오기
  const targetDataName = data[targetIndex-1].name; // .toLowerCase() 안해도 됨.

  // mainImg의 이미지 소스와 대체 텍스트 변경
  mainImg.src = `./assets/${targetDataName}.jpeg`;
  mainImg.alt = data[targetIndex-1].alt;  
}



// ************ 상단 텍스트 set 함수 ************ //

function setNameText(e){
 const target = e.target.closest('li');

 if(!target) return;

 const targetIndex = target.dataset.index;
 const targetDataName = data[targetIndex-1].name; 

 h1.textContent = targetDataName;
}



// ************ 배경 색상 set 함수 ************ //

function setBgColor(e){
  const target = e.target.closest('li');
 
  if(!target) return;
 
  const targetIndex = target.dataset.index;
  
  const colorA = data[targetIndex-1].color[0];
  const colorB = data[targetIndex-1].color[1] || '#000';

  body.style.background = `linear-gradient(to bottom, ${colorA},${colorB})`;
}


nav.addEventListener('click', setImage)
nav.addEventListener('click', setNameText)
nav.addEventListener('click', setBgColor)











