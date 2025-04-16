(function ($) {
  ("use strict");
  var windowOn = $(window);

  /*======================================
          Preloader activation
          ========================================*/

  //  function submitForm() {
  //    //   document.getElementById("ContactUs").submit();
  //    document.getElementById("contact-us__form").reset();
  // //    document.getElementById("email").reset();
  // //    document.getElementById("phone").reset();
  // //    document.getElementById("comp-name").reset();
  // //    document.getElementById("comp-activity").reset();
  // //    document.getElementById("textarea").reset();
  //  }

  function handleQuantityButtons() {
    // Handle the minus button click
    $(".quantity__group .minus").click(function () {
      var input = $(this).closest(".quantity__group").find("input.qty");
      var currentValue = parseInt(input.val());
      if (currentValue > 1) {
        input.val(currentValue - 1).change();
      }
    });

    // Handle the plus button click
    $(".quantity__group .plus").click(function () {
      var input = $(this).closest(".quantity__group").find("input.qty");
      var currentValue = parseInt(input.val());
      input.val(currentValue + 1).change();
    });
  }

  handleQuantityButtons();

  $(document.body).on("updated_cart_totals", function () {
    handleQuantityButtons();
  });

  function resourcesHubMasonry() {
    var $grid = $(".resources-hub__masonry");
    $grid.masonry({
      itemSelector: ".col-item",
      columnWidth: ".col-lg-4",
      horizontalOrder: false,
      isAnimated: true,
      // percentPosition: true,
    });

    $grid.masonry("reloadItems");
    $grid.masonry("layout");

    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function () {
      $grid.masonry("layout");
    });
  }

  resourcesHubMasonry();

  $(window).on("load", function (event) {
    $("#preloader").delay(1000).fadeOut(500);

    $(".odometer").waypoint(
      function (direction) {
        if (direction === "down") {
          let countNumber = $(this.element).attr("data-count");
          $(this.element).html(countNumber);
        }
      },
      {
        offset: "80%",
      }
    );
  });

  $(".preloader-close").on("click", function () {
    $("#preloader").delay(0).fadeOut(500);

    $(".odometer").waypoint(
      function (direction) {
        if (direction === "down") {
          let countNumber = $(this.element).attr("data-count");
          $(this.element).html(countNumber);
        }
      },
      {
        offset: "80%",
      }
    );
  });

  /*======================================
     Data Css js
     ========================================*/
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url( " + $(this).attr("data-background") + "  )"
    );
  });

  $("[data-width]").each(function () {
    $(this).css("width", $(this).attr("data-width"));
  });

  $("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"));
  });

  /*======================================
      Mobile Menu Js
      ========================================*/
  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "991",
    meanExpand: ['<i class="fa-regular fa-angle-right"></i>'],
  });

  /*======================================
      Sidebar Toggle
      ========================================*/
  $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
    $(".offcanvas__area").removeClass("info-open");
    $(".offcanvas__overlay").removeClass("overlay-open");
  });
  // Scroll to bottom then close navbar
  $(window).scroll(function () {
    if ($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
      $(".offcanvas__area").removeClass("info-open");
      $(".offcanvas__overlay").removeClass("overlay-open");
    }
  });
  $(".sidebar__toggle").on("click", function () {
    $(".offcanvas__area").addClass("info-open");
    $(".offcanvas__overlay").addClass("overlay-open");
  });

  /*======================================
      Body overlay Js
      ========================================*/
  $(".body-overlay").on("click", function () {
    $(".offcanvas__area").removeClass("opened");
    $(".body-overlay").removeClass("opened");
  });

  /*======================================
      Sticky Header Js
      ========================================*/

  $(window).scroll(function () {
    if ($(this).scrollTop() > 250) {
      $("#header-sticky").addClass("rs-sticky");
    } else {
      $("#header-sticky").removeClass("rs-sticky");
    }
  });

  /*** pricing table */
  const pricingMonthlyBtn = $("#monthly-btn"),
    pricingYearlyBtn = $("#yearly-btn"),
    pricingValues = $(".pricing-card-price h2");

  if (pricingMonthlyBtn[0] && pricingYearlyBtn[0] && pricingValues.length > 0) {
    pricingMonthlyBtn[0].addEventListener("click", function () {
      updatePricingValues("monthly");
      pricingYearlyBtn[0].classList.remove("active");
      pricingMonthlyBtn[0].classList.add("active");
    });

    pricingYearlyBtn[0].addEventListener("click", function () {
      updatePricingValues("yearly");
      pricingMonthlyBtn[0].classList.remove("active");
      pricingYearlyBtn[0].classList.add("active");
    });
  }

  function updatePricingValues(option) {
    pricingValues.each(function () {
      const pricingValue = $(this);
      const yearlyValue = pricingValue.attr("data-yearly");
      const monthlyValue = pricingValue.attr("data-monthly");

      const newValue = option === "monthly" ? monthlyValue : yearlyValue;
      pricingValue.html(newValue);
    });
  }

  /*======================================
      MagnificPopup image view
      ========================================*/
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /*======================================
      MagnificPopup video view
      ========================================*/
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  /*======================================
      Wow Js
      ========================================*/
  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  /*======================================
      Button scroll up js
      ========================================*/

  /*======================================
      One Page Scroll Js
      ========================================*/
  /*** Scroll Nav */
  var link = $("#mobile-menu ul li a, .mean-nav ul li a");

  link.on("click", function (e) {
    var target = $($(this).attr("href"));
    $("html, body").animate(
      {
        scrollTop: target.offset().top - 76,
      },
      600
    );
    $(this).parent().addClass("active");
    e.preventDefault();
  });

  $(window).on("scroll", function () {
    scrNav();
  });

  function scrNav() {
    var sTop = $(window).scrollTop();
    $("section").each(function () {
      var id = $(this).attr("id"),
        offset = $(this).offset().top - 1,
        height = $(this).height();
      if (sTop >= offset && sTop < offset + height) {
        link.parent().removeClass("active");
        $(".main-menu")
          .find('[href="#' + id + '"]')
          .parent()
          .addClass("active");
      }
    });
  }
  scrNav();

  /*======================================
      Smoth animatio Js
      ========================================*/
  $(document).on("click", ".smoth-animation", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top - 50,
      },
      300
    );
  });

  /*======================================
    Parallax Swiper
    ========================================*/
  var parallaxSlider;
  var parallaxSliderOptions = {
    speed: 1500,
    autoplay: {
      delay: 5000,
    },
    parallax: true,
    loop: true,

    pagination: {
      el: ".rs-slider-dot",
      clickable: true,
    },

    navigation: {
      nextEl: ".slider__button-prev",
      prevEl: ".slider__button-next",
    },
    on: {
      init: function () {
        var swiper = this;
        for (var i = 0; i < swiper.slides.length; i++) {
          $(swiper.slides[i])
            .find(".slider__thumb-bg")
            .attr({
              "data-swiper-parallax": 0.75 * swiper.width,
            });
        }
      },
      resize: function () {
        this.update();
      },
    },
  };
  parallaxSlider = new Swiper(
    ".slider-prlx .parallax-slider",
    parallaxSliderOptions
  );

  /*brand__active***/
  var brand = new Swiper(".brand__active", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    clickable: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      1200: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  /*feedback__active***/
  var feedback = new Swiper(".feedback__active", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      1400: {
        slidesPerView: 4,
      },
      1199: {
        slidesPerView: 3,
      },
      675: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  // here

  // Localization

  // scripts.js

  // Configuration
  const DEFAULT_LOCALE = "en";
  const SUPPORTED_LOCALES = ["en", "ar"];
  const LOCALE_STORAGE_KEY = "userLocale"; // Key for localStorage/sessionStorage
  const STORAGE_TYPE = "localStorage"; // Change to "sessionStorage" if needed

  const FULLY_QUALIFIED_LOCALE_DEFAULTS = {
    en: "en-US",
    ar: "ar-EG",
  };

  // State
  let locale;
  let translations = {};

  // When the page content is ready...
  document.addEventListener("DOMContentLoaded", () => {
    const initialLocale =
      getStoredLocale() || supportedOrDefault(browserLocales(true));
    setLocale(initialLocale);
    bindLocaleSwitcher(initialLocale);
  });

  // Load translations for the given locale and translate
  // the page to this locale
  async function setLocale(newLocale) {
    if (newLocale === locale) return;

    try {
      const newTranslations = await fetchTranslationsFor(newLocale);
      locale = newLocale;
      translations = newTranslations;
      document.documentElement.lang = newLocale;
      document.documentElement.dir = dir(newLocale);
      translatePage();
      storeLocale(newLocale); // Store the locale
    } catch (error) {
      console.error("Failed to set locale:", error);
      // Handle error gracefully (e.g., fallback to default locale)
      await setLocale(DEFAULT_LOCALE);
    }
  }

  // Retrieves translations JSON object for the given
  // locale over the network
  async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`assets/lang/${newLocale}.json`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch translations for ${newLocale}: ${response.status}`
      );
    }
    return await response.json();
  }

  // Replace the inner text of all elements with the
  // data-i18n-key attribute to translations corresponding
  // to their data-i18n-key
  function translatePage() {
    document.querySelectorAll("[data-i18n-key]").forEach(translateElement);
  }

  // Replace the inner text of the given HTML element
  // with the translation in the active locale,
  // corresponding to the element's data-i18n-key
  function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const options = JSON.parse(element.getAttribute("data-i18n-opt")) || {};
    element.innerText = translate(key, options);
  }

  function translate(key, interpolations = {}) {
    const message = translations[key];
    if (key.endsWith("-plural")) {
      return interpolate(
        pluralFormFor(message, interpolations.count),
        interpolations
      );
    }
    return interpolate(message, interpolations);
  }

  // Convert a message like "Hello, {name}" to "Hello, Chad"
  // where the given interpolations object is {name: "Chad"}
  function interpolate(message, interpolations) {
    return Object.keys(interpolations).reduce((interpolated, key) => {
      const value = formatDate(formatNumber(interpolations[key]));
      return interpolated.replace(new RegExp(`{\\s*${key}\\s*}`, "g"), value);
    }, message);
  }

  /*
  Given a value object like
  {
    "number" : 300000,
    "style": "currency",
    "currency": "EUR"
  } and that the current locale is en, returns "€300,000.00"
*/
  function formatNumber(value) {
    if (typeof value === "object" && value.number) {
      const { number, ...options } = value;
      return new Intl.NumberFormat(
        FULLY_QUALIFIED_LOCALE_DEFAULTS[locale],
        options
      ).format(number);
    }
    return value;
  }

  /*
  Given a value object like
  {
    "date": "2021-12-05 15:29:00",
    "dateStyle": "long",
    "timeStyle": "short"
  } and that the current locale is en,
  returns "December 5, 2021 at 3:29 PM"
*/
  function formatDate(value) {
    if (typeof value === "object" && value.date) {
      const { date, ...options } = value;
      const parsedDate = typeof date === "string" ? Date.parse(date) : date;
      return new Intl.DateTimeFormat(
        FULLY_QUALIFIED_LOCALE_DEFAULTS[locale],
        options
      ).format(parsedDate);
    }
    return value;
  }

  /*
  Given a forms object like
  {
    "zero": "No articles",
    "one": "One article",
    "other": "{count} articles"
  } and a count of 1, returns "One article"
*/
  function pluralFormFor(forms, count) {
    const matchingForm = new Intl.PluralRules(locale).select(count);
    return forms[matchingForm];
  }

  function isSupported(locale) {
    return SUPPORTED_LOCALES.includes(locale);
  }

  // Retrieve the first locale we support from the given
  // array, or return our default locale
  function supportedOrDefault(locales) {
    return locales.find(isSupported) || DEFAULT_LOCALE;
  }

  function dir(locale) {
    return locale === "ar" ? "rtl" : "ltr";
  }

  function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelector("[data-i18n-switcher]");
    if (switcher) {
      switcher.value = initialValue;
      switcher.onchange = (e) => setLocale(e.target.value);
    }
  }

  /**
   * Retrieve user-preferred locales from browser
   *
   * @param {boolean} languageCodeOnly - when true, returns
   * ["en", "fr"] instead of ["en-US", "fr-FR"]
   * @returns array | undefined
   */
  function browserLocales(languageCodeOnly = false) {
    return navigator.languages.map((locale) =>
      languageCodeOnly ? locale.split("-")[0] : locale
    );
  }

  // Storage Functions
  function storeLocale(locale) {
    if (STORAGE_TYPE === "localStorage") {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } else if (STORAGE_TYPE === "sessionStorage") {
      sessionStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }

  function getStoredLocale() {
    if (STORAGE_TYPE === "localStorage") {
      return localStorage.getItem(LOCALE_STORAGE_KEY);
    } else if (STORAGE_TYPE === "sessionStorage") {
      return sessionStorage.getItem(LOCALE_STORAGE_KEY);
    }
    return null;
  }

  // here

  /*feedback__active-2***/
  var feedbacktwo = new Swiper(".feedback__active-2", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      prevEl: ".feedback-2__slider-button-prev",
      nextEl: ".feedback-2__slider-button-next",
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  /*======================================
        feedback__active-3 js
        ========================================*/
  var feedbackThree = new Swiper(".feedback__active-3", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".rs-swiper-dot",
      clickable: true,
    },
  });

  $(".grid").isotope({
    itemSelector: ".grid-item",
    percentPosition: true,
    masonry: {
      columnWidth: 1,
    },
  });

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
      prevEl: ".blog__slider-button-prev",
      nextEl: ".blog__slider-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1201: {
        slidesPerView: 3,
      },
      716: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  var swiper = new Swiper(".service-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
      prevEl: ".service__slider-button-prev",
      nextEl: ".service__slider-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1201: {
        slidesPerView: 3,
      },
      590: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  var swiper = new Swiper(".project-slide", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      prevEl: ".project__slider-button-prev",
      nextEl: ".project__slider-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var projectSlide2 = new Swiper(".project-slide-2", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      prevEl: ".project__slider-button-prev-2",
      nextEl: ".project__slider-button-next-2",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var swiper = new Swiper(".rr-brand-active", {
    slidesPerView: "auto",
    spaceBetween: 40,
    loop: true,
    freemode: true,
    centeredSlides: true,
    speed: 4000,
    allowTouchMove: false,
    autoplay: {
      delay: 1,
      disableOnInteraction: true,
    },
  });

  // Project Style3
  if ($(".slider_hover__item li").length) {
    $(".slider_hover__item li").each(function () {
      let self = $(this);

      self.on("mouseenter", function () {
        console.log($(this));
        $(".slider_hover__item li").removeClass("active");
        $(this).addClass("active");
      });
    });
  }

  var swiper = new Swiper(".card-slide", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
      prevEl: ".team__slider-button-prev",
      nextEl: ".team__slider-button-next",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  $(".col-custom").on("click", function () {
    $("#features-item-thumb").removeClass().addClass($(this).attr("rel"));
    $(this).addClass("active").siblings().removeClass("active");
  });

  var testimonials = new Swiper(".testimonial__content", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: true,
    speed: 600,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".testimonial-next",
      prevEl: ".testimonial-prev",
    },
  });

  const instagramwiper = new Swiper(".rr-instagram-2-active", {
    // Optional parameters
    loop: true,
    slidesPerView: 5,
    autoplay: true,
    spaceBetween: 0,
    breakpoints: {
      1400: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },

      a11y: false,
    },
    navigation: {
      prevEl: ".slider-prev",
      nextEl: ".slider-next",
    },
  });

  // Popup Search Box
  $(function () {
    $("#popup-search-box").removeClass("toggled");

    $(".dl-search-icon").on("click", function (e) {
      e.stopPropagation();
      $("#popup-search-box").toggleClass("toggled");
      $("#popup-search").focus();
    });

    $("#popup-search-box input").on("click", function (e) {
      e.stopPropagation();
    });

    $("#popup-search-box, body").on("click", function () {
      $("#popup-search-box").removeClass("toggled");
    });
  });

  var bannerSlider;
  var bannerSliderOptions = {
    speed: 2000,
    autoplay: {
      delay: 5000,
    },
    parallax: true,
    loop: true,
  };
  bannerSlider = new Swiper(".banner_parallax-slider", bannerSliderOptions);

  // $('.lan-select select, .nice-select-select select').niceSelect();
  $(
    ".take-appointment-3__form-input-select select, .take-appointment__form-input-select select, .doctor-details__form-input-select select, .appointment-2__form-input-select select, .pricing-appointment__form-select select, .ticket-booking-wrapper__from-item-select select "
  ).niceSelect();
  $("#datepicker").datepicker({
    dateFormat: "mm/dd/yy",
  });

  $("#getting-started").countdown("2025/01/01", function (event) {
    $(this).html(
      event.strftime(
        " <div><span>%D</span></div>  <div><span>%H</span></div> <div><span>%M</span></div> <div><span>%S</span></div>"
      )
    );
  });

  /*** lastNobullet */
  function lastNobullet() {
    var lastElement = false;
    $(".footer__copyright-menu ul li, .last_item_not_horizental_bar .col-lg-4")
      .each(function () {
        if (lastElement && lastElement.offset().top != $(this).offset().top) {
          $(lastElement).addClass("no_bullet");
        } else {
          $(lastElement).removeClass("no_bullet");
        }
        lastElement = $(this);
      })
      .last()
      .addClass("no_bullet");
  }
  lastNobullet();

  $(window).resize(function () {
    lastNobullet();
  });

  //   $('#contact-us__form').submit(function(event) {
  //       event.preventDefault();
  //       var form = $(this);
  //       $('.loading-form').show();

  //       setTimeout(function() {
  //           $.ajax({
  //           type: form.attr('method'),
  //           url: form.attr('action'),
  //           data: form.serialize()
  //           }).done(function(data) {
  //               $('.loading-form').hide();
  //               $('.contact-us__form').append('<p class="success-message mt-3 mb-0">Your message has been sent successfully.</p>');
  //           }).fail(function(data) {
  //               $('.loading-form').hide();
  //               $('.contact-us__form').append('<p class="error-message mt-3 mb-0">Something went wrong. Please try again later.</p>');

  //           });
  //       }, 1000);
  //     });

  $("#showlogin").on("click", function () {
    $("#checkout-login").slideToggle(400);
  });
  $("#showcoupon").on("click", function () {
    $("#checkout_coupon").slideToggle(400);
  });

  // Custom Cursor
  $("body").append('<div class="mt-cursor"></div>');
  var cursor = $(".mt-cursor"),
    linksCursor = $("a, .swiper-nav, button, .cursor-effect"),
    crossCursor = $(".cross-cursor");

  $(window).on("mousemove", function (e) {
    cursor.css({
      transform:
        "translate(" + (e.clientX - 15) + "px," + (e.clientY - 15) + "px)",
      visibility: "inherit",
    });
  });

  // Page Scroll Percentage
  function scrollTopPercentage() {
    const scrollPercentage = () => {
      const scrollTopPos = document.documentElement.scrollTop;
      const calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
      const scrollElementWrap = $("#scroll-percentage");

      scrollElementWrap.css(
        "background",
        `conic-gradient( var(--rr-theme-primary) ${scrollValue}%, var(--rr-common-white) ${scrollValue}%)`
      );

      // ScrollProgress
      if (scrollTopPos > 100) {
        scrollElementWrap.addClass("active");
      } else {
        scrollElementWrap.removeClass("active");
      }

      if (scrollValue < 96) {
        $("#scroll-percentage-value").text(`${scrollValue}%`);
      } else {
        $("#scroll-percentage-value").html(
          '<i class="fa-solid fa-arrow-up-long"></i>'
        );
      }
    };
    window.onscroll = scrollPercentage;
    window.onload = scrollPercentage;

    // Back to Top
    function scrollToTop() {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    $("#scroll-percentage").on("click", scrollToTop);
  }

  scrollTopPercentage();
})(jQuery);

/*** pricing table */
const pricingMonthlyBtn = $("#monthly-btn"),
  pricingYearlyBtn = $("#yearly-btn"),
  pricingValues = $(".pricing-card-price h2");

if (pricingMonthlyBtn[0] && pricingYearlyBtn[0] && pricingValues.length > 0) {
  pricingMonthlyBtn[0].addEventListener("click", function () {
    updatePricingValues("monthly");
    pricingYearlyBtn[0].classList.remove("active");
    pricingMonthlyBtn[0].classList.add("active");
  });

  pricingYearlyBtn[0].addEventListener("click", function () {
    updatePricingValues("yearly");
    pricingMonthlyBtn[0].classList.remove("active");
    pricingYearlyBtn[0].classList.add("active");
  });
}

function updatePricingValues(option) {
  pricingValues.each(function () {
    const pricingValue = $(this);
    const yearlyValue = pricingValue.attr("data-yearly");
    const monthlyValue = pricingValue.attr("data-monthly");

    const newValue = option === "monthly" ? monthlyValue : yearlyValue;
    pricingValue.html(newValue);
  });
}

gsap.registerPlugin(ScrollTrigger);

// 1) Sélection des éléments
const sections = document.querySelectorAll(".story-section");
const progressBar = document.querySelector(".progress-bar-fill");
const steps = document.querySelectorAll(".progress-step");

// 2) Position de départ : opacity:0, hors champ pour chaque textBlock et imageBlock
sections.forEach((section) => {
  const textBlock = section.querySelector(".text-block");
  const imageBlock = section.querySelector(".image-block");
  gsap.set(textBlock, { opacity: 0, y: 30 });
  gsap.set(imageBlock, { opacity: 0, x: 30 });
});

// 3) Fonction de mise à jour de la progress bar + steps
function updateProgress(index, progress) {
  // Calcul : on peut moduler selon le nombre de sections
  const progressWidth = (index + progress) * (100 / (sections.length - 1));
  progressBar.style.width = `${progressWidth}%`;

  steps.forEach((step, i) => {
    if (i <= index) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

// 4) Animation de chaque section
sections.forEach((section, index) => {
  const textBlock = section.querySelector(".text-block");
  const imageBlock = section.querySelector(".image-block");

  // Pour la première section, on la joue immédiatement
  if (index === 0) {
    gsap
      .timeline()
      .to(section, {
        // Optionnel si on veut animer le conteneur
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        textBlock,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        imageBlock,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Les suivantes, via ScrollTrigger
  } else {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play reverse play reverse",
          // ou "play none none none" si tu ne veux pas de reverse
        },
      })
      .fromTo(
        section,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      )
      .fromTo(
        textBlock,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .fromTo(
        imageBlock,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
  }
});

// 5) Gestion du scroll global (pour la progress bar)
window.addEventListener("scroll", () => {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (window.scrollY / docHeight) * 100;
  const progressWidth = Math.min(100, Math.max(0, scrollPercentage));
  progressBar.style.width = `${progressWidth}%`;

  const currentSection = Math.floor(scrollPercentage / (100 / sections.length));
  steps.forEach((step, i) => {
    if (i <= currentSection) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  // Sauvegarder la position pendant le défilement
  saveScrollPosition();
});

// 6) Boutons "suivant" (pour défiler aux sections suivantes)
document.querySelectorAll(".next-section-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index < sections.length - 1) {
      sections[index + 1].scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 7) Gestion des thèmes / background
function applyTheme(sectionIndex) {
  const body = document.body;
  if (sectionIndex === 0) {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme", "sunset-theme");
  } else if (sectionIndex === 1) {
    body.classList.add("sunset-theme");
    body.classList.remove("light-theme", "dark-theme");
  } else if (sectionIndex === 2) {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme", "sunset-theme");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  applyTheme(0);
});

sections.forEach((section, index) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => applyTheme(index),
    onEnterBack: () => applyTheme(index),
  });
});

// 8) Progress steps (click) => navigation + thème
steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    sections[index].scrollIntoView({ behavior: "smooth" });
    applyTheme(index);
    steps.forEach((s, i) => {
      if (i <= index) s.classList.add("active");
      else s.classList.remove("active");
    });
  });
});

// 9) Modal (zoom image)
const modalOverlay = document.querySelector(".modal-overlay");
const modalImage = document.querySelector(".modal-image");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".image-placeholder").forEach((img) => {
  img.addEventListener("click", () => {
    modalImage.src = img.src;
    modalOverlay.style.display = "flex";
    gsap
      .timeline()
      .to(modalOverlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        modalImage,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.1"
      )
      .to(
        modalClose,
        {
          opacity: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.3"
      );
  });
});

function closeModal() {
  gsap
    .timeline()
    .to(modalClose, {
      opacity: 0,
      rotation: -180,
      duration: 0.3,
      ease: "power2.in",
    })
    .to(
      modalImage,
      {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.2"
    )
    .to(
      modalOverlay,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          modalOverlay.style.display = "none";
        },
      },
      "-=0.2"
    );
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// 10) Sauvegarde / restauration de la position de scroll
function saveScrollPosition() {
  localStorage.setItem("scrollPosition", window.scrollY);
  const currentSection = Math.floor(
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
      sections.length
  );
  localStorage.setItem("currentSection", currentSection);
}

function restoreScrollPosition() {
  const savedPosition = localStorage.getItem("scrollPosition");
  const savedSection = localStorage.getItem("currentSection");
  if (savedPosition !== null) {
    window.scrollTo(0, parseInt(savedPosition));
    if (savedSection !== null) {
      applyTheme(parseInt(savedSection));
    }
  }
}

// Sauvegarder la position avant rechargement
window.addEventListener("beforeunload", saveScrollPosition);

// Restaurer la position après chargement
document.addEventListener("DOMContentLoaded", function () {
  restoreScrollPosition();

  // Mise à jour initiale de la barre de progression
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = (window.scrollY / docHeight) * 100;
  const progressWidth = Math.min(100, Math.max(0, scrollPercentage));
  progressBar.style.width = `${progressWidth}%`;

  // Mise à jour des boutons actifs
  const currentSection = Math.floor(scrollPercentage / (100 / sections.length));
  steps.forEach((step, i) => {
    if (i <= currentSection) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
});

gsap.registerPlugin(ScrollTrigger);

// Banner Big Image
gsap.to("#bannerBigimg", {
  duration: 2,
  // y: 1200,
  yPercent: 150,
  ease: "power2.inOut",
  yoyo: true,
  repeat: 1,
  repeatRefresh: true,
});

// Banner Big Text
gsap.to("#headingBig", {
  duration: 1.5,
  scale: 2,
  delay: 0.8,
  transformOrigin: "top left",
  ease: "power2.inOut",
  yoyo: true,
  repeat: 1,
  repeatRefresh: true,
});

// Banner Design Text
gsap.to("#headingSmall", {
  delay: 1.2,
  opacity: 0,
});
gsap.to("#headingSmall", {
  delay: 2,
  left: "-100vw",
});
gsap.to("#headingSmall", {
  delay: 3.6,
  duration: 1.8,
  left: 0,
  opacity: 1,
});

// Banner Small Text
gsap.to("#headingText", {
  delay: 1.2,
  opacity: 0,
});
gsap.to("#headingText", {
  delay: 2,
  left: "-100vw",
});
gsap.to("#headingText", {
  delay: 3.6,
  duration: 1.8,
  left: 0,
  opacity: 1,
});

// Company Section - Title
gsap.set(".company-section .title, #compDescription", {
  opacity: 0,
  y: -200,
});
gsap.to(".company-section .title, #compDescription", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".company-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Company section - Image
gsap.set(".compy-box", {
  opacity: 0,
  scale: 0,
});
gsap.to(".compy-box", {
  duration: 1.6,
  delay: 0.1,
  opacity: 1,
  scale: 1,
  transformOrigin: "top right",
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".company-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Designers section - Title
gsap.set(".designer-section .title, #designDescription", {
  y: -200,
  opacity: 0,
});
gsap.to(".designer-section .title, #designDescription", {
  duration: 1.6,
  y: 0,
  opacity: 1,
  ease: "power2.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".designer-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Designer section - white border
gsap.set(".box-border", {
  opacity: 0,
  scale: 0.6,
  rotate: 15,
});
gsap.to(".box-border", {
  duration: 1.5,
  opacity: 1,
  scale: 1,
  rotate: 0,
  ease: "power.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".designer-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Designer section - Image - left
gsap.set(".team1, .team3", {
  opacity: 0,
  rotate: 45,
  scale: 0.5,
});
gsap.to(".team1, .team3", {
  duration: 1.6,
  delay: 0.2,
  opacity: 1,
  rotate: 0,
  scale: 1,
  ease: "power2.inOut",
  transformOrigin: "top",
  yoyo: true,
  scrollTrigger: {
    trigger: ".designer-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});
// right
gsap.set(".team2", {
  opacity: 0,
  rotate: -45,
  scale: 0.5,
});
gsap.to(".team2", {
  duration: 1.6,
  delay: 0.2,
  opacity: 1,
  rotate: 0,
  scale: 1,
  ease: "power2.inOut",
  transformOrigin: "top",
  yoyo: true,
  scrollTrigger: {
    trigger: ".designer-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Projects section - Title
gsap.set(".projects-section .title", {
  y: -200,
  opacity: 0,
});
gsap.to(".projects-section .title", {
  duration: 1.6,
  y: 0,
  opacity: 1,
  ease: "power2.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".projects-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Projects section - Left
gsap.set(".pbox-left", {
  opacity: 0,
  x: -800,
});
gsap.to(".pbox-left", {
  duration: 1.6,
  x: 0,
  opacity: 1,
  scale: 1,
  ease: "power2.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".projects-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Projecr section - Right
gsap.set(".pbox-right", {
  x: 500,
});
gsap.to(".pbox-right", {
  duration: 1.6,
  x: 0,
  ease: "power2.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".projects-section",
    start: "top center",
    end: "center",
    marker: false,
  },
});

// Project section - content section
gsap.set(".project-content", {
  x: -200,
  y: -200,
  opacity: 0,
});
gsap.to(".project-content", {
  duration: 1.6,
  x: 0,
  y: 0,
  opacity: 1,
  delay: 0.2,
  ease: "power2.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".projects-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Testimonial section - Title
gsap.set(".testimonial-section .title", {
  y: -200,
  opacity: 0,
});
gsap.to(".testimonial-section .title", {
  duration: 1.6,
  y: 0,
  opacity: 1,
  ease: "power2.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".testimonial-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Testimonial section - Left Content
gsap.set(".left-row", {
  opacity: 0,
  xPercent: -100,
});
gsap.to(".left-row", {
  duration: 1.6,
  opacity: 1,
  xPercent: 0,
  ease: "power2.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".testimonial-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Testimonial section - Right Content
gsap.set(".right-row", {
  opacity: 0,
  xPercent: 100,
});
gsap.to(".right-row", {
  duration: 1.6,
  opacity: 1,
  xPercent: 0,
  ease: "power2.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".testimonial-section",
    start: "top center",
    end: "center",
    markers: false,
  },
});

// Contact section - Box & Border
gsap.set(".contact-box, .contact-border", {
  opacity: 0,
  scale: 0,
});
gsap.to(".contact-box, .contact-border", {
  duration: 1.6,
  opacity: 1,
  scale: 1,
  transformOrigin: "top right",
  ease: "power2.inOut",
  yoyo: true,
  scrollTrigger: {
    trigger: ".contact-us",
    start: "top center",
    end: "bottom",
    markers: false,
  },
});
