// import slider from "./modules/slider";

document.addEventListener("DOMContentLoaded", () => {
  // slider();
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
  /* ここに背景色を順に記述する*/
  var secColor = new Array('#f4551f', '#45b7b7', '#a74faf', '#f4551f');
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