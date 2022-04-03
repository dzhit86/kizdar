"use strict";

$(document).ready(function () {
  var cityCurrent = $(".select-block__current");
  var citySearch = $("#citySearch");
  var cityList = $("#cityList");
  var menuWrap = $(".select-block__wrap");
  cityCurrent.on("click", function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("_active");

    if (!$(this).parent().hasClass("_active")) {
      citySearch.val("");
      cityList.find("a").show();
    }
  });

  (function () {
    citySearch.on("keyup", function () {
      var value = $(this).val().toLowerCase();
      cityList.find("a").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  })();

  (function () {
    $(".profile-phone__trigger").on("click", function (e) {
      e.preventDefault();
      console.log($(this).text());
      $(this).siblings(".profile-phone__short").css("display", "none");
      $(this).css("display", "none");
      $(this).siblings(".profile-phone__full").css("display", "block");
    });
  })();

  (function () {
    var reReplyForm = $("\n      <div class=\"comment-re\">\n        <form class=\"comment-re__form\" name=\"\" action=\"\" method=\"POST\">\n          <textarea class=\"comment-re__textarea\" name=\"\" required></textarea>\n          <button class=\"comment-re__send btn btn_primary\">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button>\n        </form>\n      </div>\n    ");
    $(".comment__item").on("click", ".comment__reply", function (e) {
      e.preventDefault();
      $(document).find(".comment-re").remove();
      $(".comment__reply_cancel").replaceWith("<a class=\"comment__reply\" href=\"#\">\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C</a>");
      $(this).after(reReplyForm);
      $(this).replaceWith("<a class=\"comment__reply_cancel\" href=\"#\">\u041E\u0442\u043C\u0435\u043D\u0430</a>");
    });
    $(".comment__item").on("click", ".comment__reply_cancel", function (e) {
      e.preventDefault();
      $(document).find(".comment-re").remove();
      $(this).replaceWith("<a class=\"comment__reply\" href=\"#\">\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C</a>");
    });
  })();

  (function () {
    var topMenu = $(".header__nav");
    var btnBurger = $(".header__burger");
    btnBurger.on("click", mobileMenu);

    function mobileMenu(event) {
      event.preventDefault();
      btnBurger.add(topMenu).toggleClass("_active");
    }

    function closeMenu() {
      btnBurger.add(topMenu).removeClass("_active");
    }

    $(window).resize(function () {
      if ($(this).outerWidth() >= 991) {
        closeMenu();
      }
    });
    $(document).mouseup(function (e) {
      if (!topMenu.is(e.target) && topMenu.has(e.target).length === 0 && !btnBurger.is(e.target) && btnBurger.has(e.target).length === 0) {
        closeMenu();
      }
    });
  })();

  $(document).mouseup(function (e) {
    if (!menuWrap.is(e.target) && menuWrap.has(e.target).length === 0 && !cityCurrent.is(e.target) && cityCurrent.has(e.target).length === 0) {
      menuWrap.parent().removeClass("_active");
      citySearch.val("");
      cityList.find("a").show();
    }
  });
}); //swiper js

var swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  lazy: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination'
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});