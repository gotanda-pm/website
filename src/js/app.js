"use strict";

var EventBinder = {
  menuOpener: function (menu, opener) {
    var $menu = $(menu);

    $(opener).on("click", function () {
      if ($menu.hasClass("show-menu")) {
        $menu.removeClass("show-menu");
      }
      else {
        $menu.addClass("show-menu");
      }
    });

    var width = $(window).width();
    setInterval(function () {
      var current = $(window).width();
      if (current !== width) {
        width = current;
        if (width > 640) {
          $menu.removeClass("show-menu");
        }
      }
    }, 500);
  },
  goTop: function (selector) {
    $(selector).on("click", function () {
      $(document.body).animate({ scrollTop: 0 }, 300);
    });
  },
  pseudoHover: function (selector) {
    $(document.body)
      .on("touchstart", selector, function() { $(this).addClass("hover");    })
      .on("touchend",   selector, function() { $(this).removeClass("hover"); });
  }
};

$(function () {
  EventBinder.menuOpener(".main-menu", ".open-menu");
  EventBinder.goTop(".btn-gotop");
  EventBinder.pseudoHover("a, input");
});