$(function () {
  /**
   * 1. 변수 선언
   **/
  var visualWrap = $("#brandVisual"),
    slide = visualWrap.find(".visual_slide>li"),
    slideCount = slide.length,
    stopTimer

  var visualWrap = $(".visual-nav")
    slideCount = slide.length,
    stopTimer
    leftBtn = visualWrap.find(".visual-prev>.btnImg"),
    rightBtn = visualWrap.find(".visual-next>.btnImg"),
    pager = visualWrap.find(".buttonList > li"),
    current = 0;

  /* **
  2. 슬라이드 위치 설정
  * */
  var slidePos = slide.each(function (i) {
    $(this).css("left", i * 100 + "%");
  });

  timer();

  /**
   * autoplay 함수
   **/
  function timer() {
    stopTimer = setInterval(function () {
      var prev = slide.eq(current); //0
      move(prev, 0, "-100%");
      var prevPager = pager.eq(current);
      prevPager.removeClass("on");
      current++; //1
      if (current == slideCount) {
        current = 0;
      }
      var next = slide.eq(current); //1
      move(next, "100%", "0%");
      var nextPager = pager.eq(current);
      nextPager.addClass("on");
    }, 5000);
  }

  /**
   * 슬라이드 애니메이트
   * * */
  function move(tg, start, end) {
    tg.css("left", start).stop().animate({ left: end }, 300);
  }

  /**
   * 좌우 버튼 UI
   */
   rightBtn.click(function () {
    var prev = slide.eq(current);
    move(prev, 0, "-100%");
    var prevPager = pager.eq(current);
    prevPager.removeClass("on");

    current++; //1
    if (current == slideCount) {
      current = 0;
    }
    var next = slide.eq(current);
    move(next, "100%", "0%");
    var nextPager = pager.eq(current);
    nextPager.addClass("on");
    cnt(current);
  });

  leftBtn.click(function () {
    var prev = slide.eq(current); //0
    move(prev, 0, "100%"); //slide.eq(0),0,100%
    var prevPager = pager.eq(current);
    prevPager.removeClass("on");

    current--; //1
    if (current < 0) {
      current = slideCount - 1;
    }
    var next = slide.eq(current); //2
    move(next, "-100%", "0%");
    var nextPager = pager.eq(current);
    nextPager.addClass("on");
    cnt(current);

  });
}); //jQuery
