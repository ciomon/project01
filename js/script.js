var slides = document.querySelector(".slide_wrapper"),
	slide = document.querySelectorAll(".slides"),
	currentIdx = 0,
	slideNumber = slide.length,
	slideWidth = 164,
	slideMargin = 10,
	moveAmt = slideWidth + slideMargin,
	maxSlides = 6,
	responsiveMargin = 10,
	newslide,
	newslideWidth,
	prevBtn = document.querySelector(".controls .prev"),
	nextBtn = document.querySelector(".controls .next");

newslideWidth = slideWidth;

//복사본 생성하기
for (var i = 0; i < maxSlides; i++) {
	var cloneSlide = slide[i].cloneNode(true);
	cloneSlide.classList.add("clone");
	slides.appendChild(cloneSlide);
}
for (var i = slideNumber - 1; i >= 0; i--) {
	var cloneSlide = slide[i].cloneNode(true);
	cloneSlide.classList.add("clone");
	slides.prepend(cloneSlide);
}


//가로배열하기
function slideLayout(sw, sm) {
	newslide = document.querySelectorAll(".slide_wrapper li");
	moveAmt = sw + sm;
	newslide.forEach(function (item, index) {
		item.style.left = moveAmt * index + "px";
		item.style.width = sw + "px";
	});
}
slideLayout(slideWidth, slideMargin);

//중앙 배치하기  transform translateX(???)
function setSlide() {
	var ulMoveAmt = -slideNumber * moveAmt + "px";
	slides.style.transform = "translateX(" + ulMoveAmt + ")";
	slides.classList.add("animated");
}
setSlide();

//좌우 버튼으로 이동하기
nextBtn.addEventListener("click", function () {
	moveSlide(currentIdx + 1);
});
prevBtn.addEventListener("click", function () {
	moveSlide(currentIdx - 1);
});

//moveSlide 함수
function moveSlide(num) {
	slides.style.left = moveAmt * -num + "px";
	currentIdx = num;
	console.log(currentIdx, slideNumber);

	if (currentIdx == slideNumber || currentIdx == -slideNumber) {
		setTimeout(function () {
			slides.classList.remove("animated");
			slides.style.left = "0px";
			currentIdx = 0;
		}, 500);

		setTimeout(function () {
			slides.classList.add("animated");
		}, 600);
	}
}

//자동슬라이드
var timer = undefined;
var slideWrapper = document.querySelector(".slide_wrapper");

function autoSlide() {
	if (timer == undefined) {
		timer = setInterval(function () {
			moveSlide(currentIdx + 1);
		}, 3000);
	}
}
autoSlide();

function stopSlide() {
	clearInterval(timer);
	timer = undefined;
}

slideWrapper.addEventListener("mouseenter", function () {
	stopSlide();
});

slideWrapper.addEventListener("mouseleave", function () {
	autoSlide();
});

//반응형 슬라이드
window.addEventListener("resize", function () {
	var currentWidth = document.querySelector("body").offsetWidth;

	if (currentWidth < 600) {
		var slidesWidth = slides.offsetWidth;
		newslideWidth = (slidesWidth - (responsiveMargin * maxSlides - 1)) / 3;
		responsiveMargin = 20;
	} else {
		newslideWidth = slideWidth;
		responsiveMargin = slideMargin;
	}
	if (currentWidth <= 300) {
		newslideWidth = slides.offsetWidth;
		responsiveMargin = 0;
	}
	slideLayout(newslideWidth, responsiveMargin);
	setSlide();
	console.log(newslideWidth);
});


slide.each(function (i) {
  indicatorHTML += '<a href="#">' + (i + 1) + "</a>";
});
indicator.html(indicatorHTML);

//슬라이드 이동함수
function MoveSlide(num) {
  slides.stop().animate({ left: moveAmt * -num }, 500, function () {
    if (currentIdx == slideNumber || currentIdx == -slideNumber) {
      slides.css("left", 0);
      currentIdx = 0;
    }
  });
  currentIdx = num;
}



//인디케이터
indicator.find("a").click(function () {
  var ci = $(this).index();
  MoveSlide(ci);
});

