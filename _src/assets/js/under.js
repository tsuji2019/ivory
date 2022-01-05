document.addEventListener("DOMContentLoaded", () => {});

// underのタイトルアニメーション
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