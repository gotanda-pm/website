"use strict";

var EventBinder = {
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
  EventBinder.goTop(".btn-gotop");
  EventBinder.pseudoHover("a, input");
});
