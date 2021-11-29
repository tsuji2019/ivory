// import slider from "./modules/slider";
import mousestalker from "./modules/mousestalker";
import parallax from "./modules/parallax";

document.addEventListener("DOMContentLoaded", () => {
  // slider();
  mousestalker();
  parallax();
});

// h1のテキストアニメーション
$(document).ready(function () {
  const CLASSNAME = "-visible";
  const TIMEOUT = 300;
  const $target = $(".main-title");

  setInterval(() => {
    $target.addClass(CLASSNAME);
  }, TIMEOUT * 2);
});

// Worksのタイトルアニメーション
function BgFadeAnime() {

  $('.bgLRextendTrigger').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('bgLRextend');
    }
    // else {
    //   $(this).removeClass('bgLRextend');
    // }
  });

  $('.bgappearTrigger').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('bgappear');
    }
    // else {
    //   $(this).removeClass('bgappear'); // 画面外に出たらbgappearというクラス名を外す
    // }
  });
}

$(window).scroll(function () {
  BgFadeAnime();
});

$(window).on('load', function () {
  BgFadeAnime();
});

// セクションごとに背景色変更
$(function () {
  var secArr = new Array();
  var current = -1;
  var secColor = new Array('#eb5e0b', '#eb5e0b', '#f0ecdf', '#f0ecdf');
  $('.block').each(function (i) {
    secArr[i] = $(this).offset().top;
  });

  function chengeBG(secNum) {
    if (secNum != current) {
      current = secNum;
      $('.block-bg').css({
        backgroundColor: secColor[current]
      });
      $('.title-en').css({
        color: secColor[current]
      });
    }
  }
  $(window).on('load scroll resize', function () {
    for (var i = secArr.length - 1; i >= 0; i--) {
      if ($(window).scrollTop() > secArr[i]) {
        chengeBG(i);
        break;
      }
    }
  });

  // Worksのhoverアニメーション
  $('botton a.works01').mouseover(function (e) {
    $('.works-img img.works01').addClass("imagebig");
  })
  $('botton a.works01').mouseout(function (e) {
    $('.works-img img.works01').removeClass("imagebig");
  })
  $('botton a.works02').mouseover(function (e) {
    $('.works-img img.works02').addClass("imagebig");
  })
  $('botton a.works02').mouseout(function (e) {
    $('.works-img img.works02').removeClass("imagebig");
  })
});

// About/profile 背景画像パララックス
$(function () {
  var target1 = $("#parallax-01");
  var targetPosOT1 = target1.offset().top;
  var targetFactor = 0.05;
  var windowH = $(window).height();
  var scrollYStart1 = targetPosOT1 - windowH;
  $(window).on('scroll', function () {
    var scrollY = $(this).scrollTop();
    if (scrollY > scrollYStart1) {
      target1.css('background-position-y', (scrollY - targetPosOT1) * targetFactor + 'rem');
    }
  });
});