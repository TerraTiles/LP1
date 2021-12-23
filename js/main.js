/* ===================================================================
 * Count - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
  "use strict";

  var $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
  var doc = document.documentElement;
  doc.setAttribute("data-useragent", navigator.userAgent);

  // svg fallback
  if (!Modernizr.svg) {
    $(".home-logo img").attr("src", "images/logo.png");
  }

  /* Preloader
   * -------------------------------------------------- */
  var ssPreloader = function () {
    $("html").addClass("ss-preload");

    $WIN.on("load", function () {
      // will first fade out the loading animation
      $("#loader").fadeOut("slow", function () {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");
      });

      // for hero content animations
      $("html").removeClass("ss-preload");
      $("html").addClass("ss-loaded");
    });
  };

  /* info toggle
   * ------------------------------------------------------ */
  var ssInfoToggle = function () {
    //open/close lateral navigation
    $(".info-toggle").on("click", function (event) {
      event.preventDefault();
      $("body").toggleClass("info-is-visible");
    });
  };

  /* slick slider
   * ------------------------------------------------------ */
  var ssSlickSlider = function () {
    $(".home-slider").slick({
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true,
      speed: 3000,
    });
  };

  /* placeholder plugin settings
   * ------------------------------------------------------ */
  var ssPlaceholder = function () {
    $("input, textarea, select").placeholder();
  };

  /* final countdown
   * ------------------------------------------------------ */
  var ssFinalCountdown = function () {
    var finalDate = "2020/04/07";

    $(".home-content__clock")
      .countdown(finalDate)
      .on("update.countdown finish.countdown", function (event) {
        var str =
          '<div class="top"><div class="time days">' +
          "%D <span>day%!D</span>" +
          "</div></div>" +
          '<div class="time hours">' +
          "%H <span>H</span></div>" +
          '<div class="time minutes">' +
          "%M <span>M</span></div>" +
          '<div class="time seconds">' +
          "%S <span>S</span></div>";

        $(this).html(event.strftime(str));
      });
  };

  /* AjaxChimp
   * ------------------------------------------------------ */
  var mail = function () {
    $("#mc-form").on("submit", () => {
      const checkboxChecked = $("#squaredThree").is(":checked");
      const email = $("#mc-form").serializeArray()[0].value;

      if (!checkboxChecked) {
        $("#mc-email-label").text("Please accept the terms and conditions.");
        return false;
      }

      $("#mc-email-label").text("Submitting...");

      fetch("https://terratilesbeh0ocje-email.functions.fnc.fr-par.scw.cloud", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      })
        .then((response) => response.json())
        .then((body) => {
          switch (body.code) {
            case 0:
              $("#mc-email-label").text("We have sent you an email.");
              break;
            case -1:
              $("#mc-email-label").text("Please enter a valid email.");
              break;
            case -2:
              $("#mc-email-label").text("Unknown server error occured.");
              break;
            default:
              $("#mc-email-label").text("Unknown server error occured.");
              break;
          }
        })
        .catch((error) => {
          console.error(error);
          $("#mc-email-label").text("An unknown error occured.");
        });

      return false;
    });
  };

  /* initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssInfoToggle();
    ssSlickSlider();
    ssPlaceholder();
    ssFinalCountdown();
    mail();
  })();
})(jQuery);
