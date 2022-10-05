var slideWrapper = $('.slide_wrapper'),
slides = slideWrapper.find('.slides'),
    slide = slides.find('li'),
    currentIdx = 0,
    slideCount = slide.length,
    slideWidth = slide.width(),
    slideGap = 30,
    moveAmt, // slideWidth+slideGap 움직일 너비
    prevBtn = slideWrapper.find('.prev'),
    nextBtn = slideWrapper.find('.next'),
    indicator = $('.pager'),
    newSlideWidth, 
    indicatorHTML = '',
    responsiveGap=20,
    maxSlides=3,
    newSlides; //clone 된 요소를 담을 변수

    newSlideWidth=slideWidth;

    // indicator 추가
slide.each(function(i){
    indicatorHTML+='<a href="#">'+(i+1)+'</a>'
    // indicatorHTML+='<a href="#">'+(i+1)+'</a>' -> 1 2 3 4 5 다 나옴 / += : 값이 하나씩 더해진다.
    // indicatorHTML='<a href="#">'+(i+1)+'</a>' -> 5만 나옴 / = : 재할당한다.
})
indicator.html(indicatorHTML)

    // 복사본 생성
    // append : 원본 뒤 추가 / clone : 복사 / prepend : 원본 앞에 추가
slides.append(slide.clone().addClass("clone"));
slides.prepend(slide.clone().addClass("clone"));
    // 가로 배치
function slideLayout(sw,sm){
    newSlides=$('.slide_wrapper li')
    moveAmt=sw+sm
    newSlides.each(function(idx){
        $(this).css('left',moveAmt*idx+'px')
    })
}
slideLayout(slideWidth,slideGap);

    // 슬라이드 이동함수
function MoveSlide(num){
    slides.stop().animate({left:moveAmt*-num},100,function(){
        if(currentIdx==slideCount || currentIdx == -slideCount){
            slides.css('left',0)
            currentIdx=0
        }
    })
    currentIdx=num
}

    // 좌우버튼
nextBtn.click(function(){
        MoveSlide(currentIdx+1)
})
prevBtn.click(function(){
        MoveSlide(currentIdx-1)
})

    // 중앙배치
function setslidePos(){
    var ulMoveAmt= - moveAmt*slideCount + 'px';
    slides.css('transform',"translateX("+ ulMoveAmt+")")
}
setslidePos()

    //인디케이터
indicator.find('a').click(function(){
    var ci=$(this).index()
    MoveSlide(ci)
})
    // 자동슬라이드
var timer=undefined
function autoSlide(){
    if(timer==undefined){
        timer=setInterval(function(){
            MoveSlide(currentIdx+1)
        },2000)
    }
}
autoSlide()
function stopSlide(){
    clearInterval(timer)
    timer=undefined
}
slideWrapper.mouseenter(function(){
    stopSlide()
})
slideWrapper.mouseleave(function(){
    autoSlide()
})

//반응형슬라이드
$(window).resize(function(){
  var winwidth=$(this).width();
  if(winwidth<700){
    console.log(slide.width(),newSlideWidth)
    slideGap=20;
    newSlideWidth=(slides.width()-responsiveGap*(maxSlides-1))/ maxSlides;
  }else{
    newSlideWidth=slideWidth;
    responsiveGap=slideGap;
  }
  if(winwidth<=500){
    newSlideWidth=slides.width();
    responsiveGap=0;
  }
  slideLayout(newSlideWidth,responsiveGap);
  setSlidePos();
})