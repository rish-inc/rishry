var RISHRY = {};
RISHRY.COMMON = {};

// ==============================================================================================================
// COMMON
// ==============================================================================================================
RISHRY.COMMON = {
  init: function(){
    // this.DEVICECHECK.init();
    // this.SMOOTHSCROLL.init();
    this.NAVI.init();
    this.FAQ.init();
    // this.SMOOTHSCROLL.init();
  },

  scroll: function(){
    // this.WINDOWSCROLL.scroll();
    // this.PAGETOP.scroll(RISHRY.COMMON.VARIABLES.windowScroll);
  }
}

RISHRY.COMMON.NAVI = {
  init: function(){
    $('.js-naviBtn').on('click', function(){
      $(this).toggleClass('is-open');
      $('.js-naviBody').slideToggle(400);
      return false;
    });
  }
}

RISHRY.COMMON.FAQ = {
  init: function(){
    $('.c-faq__ttl').on('click', function(){
      $(this).toggleClass('is-open');
      $(this).next('.c-faq__body').slideToggle(400);
      return false;
    })
  }
}

// RISHRY.COMMON.VARIABLES = {
//   windowScroll: 0,
//   isSP: true
// }

// RISHRY.COMMON.DEVICECHECK = {
//   init: function(){
//     var _self = this;
//     var width = '(max-width: 1024px)';
//     var mq = window.matchMedia(width);
//     mq.addListener(check);
//     check(mq);
//     function check(mq) {
//       if (mq.matches) {
//         RISHRY.COMMON.VARIABLES.isSP = true;
//       } else {
//         RISHRY.COMMON.VARIABLES.isSP = false;
//       }
//     }
//   }
// }

// RISHRY.COMMON.WINDOWSCROLL = {
//   scroll: function(){
//     RISHRY.COMMON.VARIABLES.windowScroll = $(window).scrollTop();
//   }
// }

// RISHRY.COMMON.PAGETOP = {
//   scroll: function(s){
//     if(s > 200){
//       $('.l-footer__pagetop').addClass('is-show');
//     }else{
//       $('.l-footer__pagetop').removeClass('is-show');
//     }
//   }
// }

// RISHRY.COMMON.SMOOTHSCROLL = {
//   init: function(){
//     $('.js-scroll').on('click', function(){
//       var href = $(this).attr('href');
//       var target = $(href == '#' || href == '' ? 'html' : href);
//       $('html, body').animate({scrollTop: target.offset().top}, 500, 'swing');
//       return false;
//     });
//   }
// }


// ==============================================================================================================
// LIST
// ==============================================================================================================
RISHRY.LIST = {
  init: function(){
    this.FILTER.init();
  }
}

RISHRY.LIST.FILTER = {
  init: function(){
    $('.js-filterBtn').on('click', function(){
      $('.js-filterBody').addClass('is-show');
      return false;
    });

    $(document).on('click', function(e){
      if(!e.target.closest('.filter__inner') && $('.js-filterBody').hasClass('is-show')){
        $('.js-filterBody').removeClass('is-show');
      }
    });

    $('#js-search').on('click', function(){
      // $(this).parents('form').submit();
      var v = 'q=';
      $(this).parents('.js-filterBody').find('input:checked').each(function(index, el) {
        if(v == 'q='){
          v += $(this).val();
        }else{
          v += '+' + $(this).val();
        }
      });
      location.href = '/search/?' + v;
      return false;
    });
  }
}


// ==============================================================================================================
// DETAIL
// ==============================================================================================================
RISHRY.DETAIL = {
  init: function(){
    this.SLIDER.init();
  }
}

RISHRY.DETAIL.SLIDER = {
  init: function(){
    $('.js-slider').slick();

    $('.detail-mv__thumb').on('click', function(){
      var num = $('.detail-mv__thumb').index(this);
      $('.js-slider').slick('slickGoTo', num);
    });
  }
}


// ==============================================================================================================
// TOP
// ==============================================================================================================
// RISHRY.TOP = {
//   init: function(){
//     this.NEWS.init();
//   }
// }

// RISHRY.TOP.NEWS = {
//   init: function(){
//     $.ajax({
//       url: "/assets/html/news.html",
//       cache: false,
//       success: function(html){
//         $('.p-top-news__list').html(html);
//       }
//     });
//   }
// }


// ==============================================================================================================
// INIT
// ==============================================================================================================
$(function(){
  RISHRY.COMMON.init();
  if($('.list').length){ RISHRY.LIST.init();}
  if($('.detail').length){ RISHRY.DETAIL.init();}

  // $(window).on('scroll', function(){
  //   RISHRY.COMMON.scroll();
  // });
});
