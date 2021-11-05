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

// Worksのhoverアニメーション
$(function () {
  $('botton a').mouseover(function (e) {
    $('.works-img img').addClass("imagebig");
  })
  $('botton a').mouseout(function (e) {
    $('.works-img img').removeClass("imagebig");
  })
});