$(".gnb>li").each(function () {
  $(this)
    .mouseenter(function () {
      var liL = $(this).find("ul li").length;
      // alert(liL);
      var liH = $(this).find("ul li").outerHeight();
      $(this)
        .find("ul")
        .stop()
        .animate({ height: liH * liL });
    })
    .mouseleave(function () {
      $(".gnb li ul").stop().animate({ height: 0 });
    });
});
