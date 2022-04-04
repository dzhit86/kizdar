$(document).ready(function() {
  const cityCurrent = $(".select-block__current");
  const citySearch = $("#citySearch");
  const cityList = $("#cityList");
  const menuWrap = $(".select-block__wrap");

  cityCurrent.on("click", function(e){
    e.preventDefault();
    $(this).parent().toggleClass("_active");
    if (!$(this).parent().hasClass("_active")) {
      citySearch.val("");
      cityList.find("a").show();
    }
  });

  // let userAgent = navigator.userAgent.toLowerCase(); 
  // if (userAgent.indexOf('safari')!=-1) { 
  //   if(userAgent.indexOf('chrome')  > -1) {
  //     //browser is chrome
  //     $(".form-review__select").css("text-align", "-webkit-center");
  //   } else if((userAgent.indexOf('opera') > -1)||(userAgent.indexOf('opr')  > -1)){
  //     //browser is opera 
  //     $(".form-review__select").css("text-align", "-moz-center;");
  //   } else {
  //   //browser is safari, add css
  //     $(".form-review__select").css("text-indent", "6px");
  //   }
  // }

  if ($.browser.webkit) {
    $(".form-review__select").css("text-align", "-webkit-center");
  } else if ($.browser.msie) {
    $(".form-review__select").css("text-align", "center");
  } else if ($.browser.mozilla) {
    $(".form-review__select").css("text-align", "-moz-center");
  } else {
    $(".form-review__select").css("text-indent", "6px");
  }

  (function(){
    citySearch.on("keyup", function() {
      let value = $(this).val().toLowerCase();
      cityList.find("a").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  })();

  (function(){
    $(".profile-phone__trigger").on("click", function(e) {
      e.preventDefault();
      console.log($(this).text())
      $(this).siblings(".profile-phone__short").css("display","none");
      $(this).css("display","none");
      $(this).siblings(".profile-phone__full").css("display","block");

    })
  })();

  (function(){
    const reReplyForm = $(`
      <div class="comment-re">
        <form class="comment-re__form" name="" action="" method="POST">
          <textarea class="comment-re__textarea" name="" required></textarea>
          <button class="comment-re__send btn btn_primary">Отправить</button>
        </form>
      </div>
    `);

    $(".comment__item").on("click", ".comment__reply", function(e){
      e.preventDefault();
      $(document).find(".comment-re").remove();
      $(".comment__reply_cancel").replaceWith(`<a class="comment__reply" href="#">Ответить</a>`);

      $(this).after(reReplyForm);
      $(this).replaceWith(`<a class="comment__reply_cancel" href="#">Отмена</a>`);
    });

    $(".comment__item").on("click",".comment__reply_cancel", function(e){
      e.preventDefault();
      $(document).find(".comment-re").remove();
      $(this).replaceWith(`<a class="comment__reply" href="#">Ответить</a>`);
    });
  })();


  (function(){

    const topMenu = $(".header__nav");
    const btnBurger = $(".header__burger");
  
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
      if (!topMenu.is(e.target)
          && topMenu.has(e.target).length === 0
          && !btnBurger.is(e.target)
          && btnBurger.has(e.target).length === 0) {
              closeMenu();
      }
  });

  })();


  $(document).mouseup(function (e) {
    if (!menuWrap.is(e.target)
      && menuWrap.has(e.target).length === 0
      && !cityCurrent.is(e.target)
      && cityCurrent.has(e.target).length === 0) {
        menuWrap.parent().removeClass("_active");
        citySearch.val("");
        cityList.find("a").show();
    }
  });

  $(".profile-card__bookmark .btn").on("click", bookmark);

  function bookmark(a) {
    a.preventDefault();
    title=document.title;
    url=document.location;
      try { 
       window.sidebar.addPanel(title, url, "");
      } catch (e) {
        if (window.opera && window.print || typeof(window.sidebar)=="object") {  // Opera || Mozilla
          a.rel="sidebar";
          a.title=title;
          a.url=url;
          a.href=url;
          return true;
        } else if(document.all) {  //  Internet Explorer
            window.external.AddFavorite(url, title);
            return true;
        }  else {
           alert('Нажмите Ctrl+D (Cmd+D на MacOS), чтобы добавить страницу в Избранное');
        }
     }
  }
});



//photoswipe js
var $pswp = $('.pswp')[0];
var image = [];

//swiper js
var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        init: function () {
            var that = this;
            var el = this.slides[this.activeIndex].querySelector('.section__servicesItemImg');
            var observer = lozad(el, {
                loaded: function (el) {
                    var src = $(el).parent().parent().children('.section__servicesItemImg-link').children('.section__servicesItemImg').attr('src');
                    var dataSrc = $(el).parent().parent().children('.section__servicesItemImg-link').children('.section__servicesItemImg').attr('data-srcset');
                    $(el).parent().parent().children('.section__servicesItemImg-link').children('.section__servicesItemImg').attr("srcset", dataSrc);
                    $(el).parent().parent().children('.section__servicesItemImg-bg').css('background-image', 'url(' + src + ')');
                    $(el).parent().parent().children('.swiper-lazy-preloader').hide();
                }
            });
            observer.observe();

            $('.section__servicesItemImg-link').click(function (e) {
                e.preventDefault();
                if (!$(that.slides)[0].parentNode.classList.contains('active-gallery')) {
                    $(that.slides)[0].parentNode.classList.add('active-gallery');
                    var $pic = $($(that.slides)[0].parentNode.parentNode),
                        getItems = function () {
                            var items = [];
                            $pic.find('p').each(function () {
                                var $href = $(this).data('href'),
                                    $size = $(this).data('size').split('x'),
                                    $width = $size[0],
                                    $height = $size[1];

                                var item = {
                                    src: $href,
                                    w: $width,
                                    h: $height
                                }
                                items.push(item);
                            });
                            return items;
                        }

                    var items = getItems();
                    items.pop();
                    items.shift();

                    $.each(items, function (index, value) {
                        image[index] = new Image();
                        image[index].setAttribute('data-src', value['src']);
                    });

                    $pic.on('click', 'p', function (event) {
                        event.preventDefault();
                        var $index = that.realIndex;
                        var options = {
                            index: $index,
                            bgOpacity: 0.7,
                            showHideOpacity: true
                        }

                        var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                        lightBox.init();
                        lightBox.preload = 1;
                        lightBox.listen('beforeChange', function () {
                            that.slideTo(this.getCurrentIndex() + 1, 300, true);
                        });
                    });
                }
            });
        },
        slideChange: function () {
            var el = this.slides[this.activeIndex].querySelector('.section__servicesItemImg');
            var observer = lozad(el, {
                loaded: function (el) {
                    var src = $(el).parent().parent().children('.section__servicesItemImg-link').children('.section__servicesItemImg').attr('src');
                    var dataSrc = $(el).parent().parent().children('.section__servicesItemImg-link').children('.section__servicesItemImg').attr('data-srcset');
                    $(el).parent().parent().children('.section__servicesItemImg-link').children('.section__servicesItemImg').attr("srcset", dataSrc);
                    $(el).parent().parent().children('.section__servicesItemImg-bg').css('background-image', 'url(' + src + ')');
                    $(el).parent().parent().children('.swiper-lazy-preloader').hide();
                }
            });
            observer.observe();
        }
    },
});
