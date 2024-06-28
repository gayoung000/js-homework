# 네이버 로그인 페이지 구현

---

썸네일 이미지를 클릭하면 메인 이미지와 배경이 바뀔 수 있도록 코드 로직을 작성해주세요.


---
## 요구사항
1. 이벤트 처리 방식을 사용하여 클릭 이벤트를 걸어주세요.
    1. 이벤트 위임
    2. 반복문
2. 이미지와 색상의 데이터는 `data.js` 에서 불러와주세요.
3. 각 li 항목들을 클릭하면 배경 색상과 메인 비주얼 이미지를 변경해주세요.
    1.  colorB의 기본값은 #000 으로 한다.
4. 비주얼이 변경되면 상단에 비주얼에 맞는 이름으로 변경해주세요.
5. 함수를 분리시켜주세요.
    1. `setBgColor` 함수
    2. `setImage` 함수
    3. `setNameText` 함수
6. 가독성이 좋은 코드로 리팩토링 해주세요.


<br>

## 1. 리팩토링 전 코드
- 우선 재사용성을 고려하지 않고 현재 과제에만 쓸 수 있는 4가지 함수를 만들었다. 
  - `setImage`
  - `setNameText`
  - `setBgColor`
  - `setAudio`

- 오디오의 경우, 
  1. main.js 안에 파일 경로 객체를 담은 audioSources 배열을 만듦.
  2. audio.js 파일 안 setAudio 함수를 이용해 매개변수로 선택한 인덱스에 해당하는 src(dataName)를 넣어줌.
  3. new 생성자로 새로운 오디오 요소 객체를 생성하는데, 그 전에 기존 오디오 재생을 멈춘다.

  <br>

## 2. 리팩토링 후 최종 코드
  재사용성을 고려해서 함수를 렌더링을 위한 함수와 실제 이벤트 핸들링을 위한 함수로 분리함. 이벤트 핸들링 함수 내부에서 렌더링 함수 실행.
  - 렌더링 함수 : `setImage`, `setNameText`, `setBgColor`, `setAudio`
  - 이벤트 핸들링 함수 : `handlenNavClick`
  
  <br>

  ### 🔆 전역 변수
  ##### DOM 요소 객체 접근
  ```javaScript
  const nav = document.querySelector('nav');
  const mainImg = document.querySelector('.visual img');
  const h1 = document.querySelector('h1');
  const body = document.body;
  const ul = document.querySelector('ul');
  ```
  

  ##### 오디오 파일 경로 
  ```javaScript
  const audioSources = [
  { src : './assets/audio/ember.m4a' },
  { src : './assets/audio/wade.m4a' },
  { src : './assets/audio/clod.m4a' },
  { src : './assets/audio/gale.m4a' }
  ];
  ```
 
  ##### 전역 audio 객체를 빈값으로 설정
  ```javaScript
  let currentAudio = null;
  ```

  <br>
  
  ### 🔆 유틸 함수   
  ### 🔆 렌더 함수  
  ```javaScript
    // ========= 이미지 set 함수 ======== //

  function setImage(node, mainImgData){
    if (isString(node)) node = document.querySelector(node);
    
    // node의 이미지 변경
    const {src, alt} = mainImgData;
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

  function setBgColor(node, backgroundColor){
    if (isString(node)) node = document.querySelector(node);

    // node의 색상 변경
    const {colorA, colorB='#000'} = backgroundColor;
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
  ```
  
  <br>
  
  ### 🔆 이벤트 핸들링 함수 
  ```javaScript
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

    // 해당 li에만 is-active 속성 넣기 (그 전에 다 remove하고 해당 li에만 add)
    const children = ul.children;
    for (let li of children) {
      li.classList.remove("is-active");
    }
    li.classList.add("is-active");
    
    // 렌더링 함수에서 필요할 변수 설정
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
  ```

  <br>

  ## 느낀 점 및 질문
  - 이 파일에서만 사용할 수 있는 함수에서  -> 함수와 안에 쓰인 데이터 값?(변수)들을 분리해서 재사용가능하게 바꾸는게 어려웠다. 
  - 우선 class AudioPlaye 를 똑같은 일반 함수로 접근하다가 버튼 클릭 시마다 해당 src를 넣은 오디오 객체를 새롭게 생성해주는 코드로 짰는데 이 접근이 맞는지 모르겠습니다..!
  - class와 constructor 개념을 모르겠습니다. 
