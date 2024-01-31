$(function () {
	// JQUERY VALIDATION
	if ($(".js-validate").length) {
		$(".js-validate").each(function () {
			$(this).validate({
				rules: {
					phone: {
						required: true,
						number: true,
					},
					name: {
						required: true,
					},
					email: {
						required: true,
						email: true,
					},
				},
				messages: {
					phone: {
						required: "Будь ласка, заповніть це поле",
					},
					name: {
						required: "Будь ласка, заповніть це поле",
					},
					email: {
						required: "Будь ласка, заповніть це поле",
						email: "Неправильна електронна адреса",
					},
				},
			});
		});
	}

	$('input[type="tel"]').on("input", function (e) {
		// Убираем все нецифровые символы, кроме "+"
		this.value = this.value.replace(/[^0-9+]/g, "");
	});

	// ANIMATION ODER BUTTON
	const player = document.getElementById("player");

	$(".js-order").click(function () {
		$(".order-sidebar__animation").addClass("active");
		player.play();

		// Добавление обработчика события "animationend" для определения завершения анимации
		player.addEventListener("complete", function () {
			$(".order-sidebar__animation").removeClass("active");
			player.stop();
		});
	});

	// FILTER CATALOG

	var filterCard = document.querySelector(".js-filterCard");
	if (filterCard) {
		var checkboxGroups = document.querySelectorAll(".filter-check");
		var sidebar = document.querySelector(".sidebar");

		var mixer = mixitup(filterCard);

		checkboxGroups.forEach(function (checkboxGroup) {
			checkboxGroup.addEventListener("change", function () {
				var checkboxes = checkboxGroup.querySelectorAll(
					'.filter-check input[type="checkbox"]'
				);
				var selectors = [];

				checkboxes.forEach(function (checkbox) {
					if (checkbox.checked) selectors.push(checkbox.value);
				});

				var selectorString =
					selectors.length > 0 ? selectors.join(",") : "all";

				mixer.filter(selectorString);

				sidebar.classList.add("active");
			});
		});
		window.addEventListener("scroll", function () {
			sidebar.classList.remove("active");
		});
	}

	// ANIMATION NUM CARD PAGE

	var endValue = parseInt($(".js-num").data("count"));

	function animateNumber(targetElement, start, end, duration) {
		var range = end - start;
		var current = start;
		var increment = end > start ? 1 : -1;
		var stepTime = Math.abs(Math.floor(duration / range));

		var timer = setInterval(function () {
			current += increment;
			$(targetElement).text(current);

			if (current == end) {
				clearInterval(timer);
			}
		}, stepTime);
	}

	animateNumber(".js-num span", 0, endValue, 2500);

	// CLIPBOARD JS

	if ($(".clipboard").length) {
		$(".clipboard").each(function () {
			var clipboardValue = $(this).find(".clipboard-value").text().trim();
			var clipboardButton = $(this).find(".clipboard-btn");

			var clipboard = new ClipboardJS(clipboardButton[0], {
				text: function () {
					return clipboardValue;
				},
			});

			clipboard.on("success", function (e) {
				var range = document.createRange();
				var selection = window.getSelection();
				var target = e.trigger
					.closest(".clipboard")
					.querySelector(".clipboard-value");

				range.selectNodeContents(target);
				selection.removeAllRanges();
				selection.addRange(range);
			});
		});
	}

	// MAIN MENU

	// CATALOG DESKTOP INIT

	$(document).on("click", function (e) {
		var container = $(
			".menu-wrap, .catalog-toggler, .search-toggler, .search, .contacts-dropdown"
		);
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.removeClass("open");
			$(".catalog-toggler").removeClass("active");
			$(".menu-overlay").removeClass("active");
			$(".main--menu .menu-item:nth-child(2)").addClass("active");
			$(".search").removeClass("open");
			$(".contacts-dropdown").removeClass("active");
		}
	});

	$(".catalog-toggler").click(function () {
		$(this).toggleClass("active");
		$(".menu-wrap").toggleClass("open");
		$(".menu-overlay").toggleClass("active");
	});

	$(".menu-item").hover(function () {
		$(".menu-item").removeClass("active");
	});

	$(".menu-background").on("mouseleave", function () {
		$(".menu-background .menu-item:nth-child(2)").addClass("active");
	});

	// HOME PAGE SIDEBAR HOVER CATALOG

	$(".sidebar .menu").hover(
		function () {
			$(".menu--main").addClass("open");
			$(".menu-overlay").addClass("active");
		},
		function () {
			$(".menu-background").one("mouseleave", function () {
				$(".menu-background .menu-item:nth-child(2)").addClass(
					"active"
				);
				$(".menu--main").removeClass("open");
				$(".menu-overlay").removeClass("active");
				$(".catalog-toggler").removeClass("active");
			});
		}
	);

	// CATEGORY PAGE SEO TEXT OPEN

	$(".catalog-seo__toggler").click(function () {
		$(this).toggleClass("active");
		$(".catalog-seo__hidden").toggle();
	});

	// INIT CATALOG MOBILE

	$(".js-cat-toggle").click(function () {
		$(".filter").addClass("open");
		$("body").addClass("hidden");
	});

	$(".filter-close__toggler").click(function () {
		$(".filter").removeClass("open");
		$("body").removeClass("hidden");
	});

	// INIT HAMBURGER MENU

	$(".hamburger").click(function () {
		$(".b-menu").addClass("open");
		$("body").addClass("hidden");
	});

	$(".b-menu__close").click(function () {
		$(".b-menu").removeClass("open");
		$("body").removeClass("hidden");
	});

	// INIT CATALOG MOBILE

	$(".catalog-init").click(function (e) {
		e.preventDefault();
		$(".menu-wrap").addClass("opens");
	});

	$(".menu-mobile__close").click(function () {
		$(".menu-wrap").removeClass("opens");
	});

	// INIT SUB CATALOG MOBILE

	$(".menu-toggler").click(function () {
		$(this).closest("li").find(".menu-inner").addClass("open");
	});

	$(".menu-inner__close, .menu-inner__back").click(function () {
		$(this).closest(".menu-inner").removeClass("open");
	});

	// CART MODAL INPUT NUMBER COUNTER

	$(document).on("mousedown", ".quantity-plus", function (event) {
		event.preventDefault();
		var input = $(this).siblings(".quantity-input");
		var currentValue = parseInt(input.val());
		input.val(currentValue + 1);

		// Проверка и добавление класса "active"
		if (currentValue + 1 > 1) {
			$(this)
				.closest(".quantity")
				.find(".quantity-minus")
				.addClass("active");
		}
	});

	$(document).on("mousedown", ".quantity-minus", function (event) {
		event.preventDefault();
		var input = $(this).siblings(".quantity-input");
		var currentValue = parseInt(input.val());

		if (currentValue > 1) {
			input.val(currentValue - 1);
		} else {
			// Если текущее значение 1 или меньше, устанавливаем 1
			input.val(1);
			$(this).removeClass("active");
		}

		// Проверка и удаление класса "active"
		if (currentValue - 1 <= 1) {
			$(this).removeClass("active");
		}
	});

	// REVIEW STAR RATING INSIDE MODAL
	if ($("#reviewStars").length) {
		$("#reviewStars").barrating({
			initialRating: 0,
		});
	}

	// SEARCH DROPDOWN OPEN

	$("#search input").focus(function () {
		$(this).closest("#search").addClass("active");
		$(this).closest("#search").find(".search-result").addClass("open");
		$("body").addClass("overlay");
	});

	$("#search input").blur(function () {
		$(this).closest("#search").removeClass("active");
		$(this).closest("#search").find(".search-result").removeClass("open");
		$("body").removeClass("overlay");
	});

	// SEARCH INIT MOBILE

	$(".search-toggler").click(function () {
		$(".search").toggleClass("open");
	});

	// INIT HEADER CONTACTS WINDOW

	$(".header-contacts").hover(
		function () {
			var $this = $(this);
			var $input = $(".contacts-callback input");
			var inputValue = $input.val().trim();

			if (inputValue !== "") {
				$(".contacts-dropdown").addClass("active");
			}

			$input.on("input", function () {
				var updatedValue = $(this).val().trim();

				if (updatedValue !== "") {
					$(".contacts-dropdown").addClass("active");
				} else {
					$(".contacts-dropdown").removeClass("active");
				}
			});

			setTimeout(function () {
				$this.addClass("active");
			}, 50);
		},
		function () {
			var $this = $(this);
			var $input = $(".contacts-callback input");

			$input.off("input");

			setTimeout(function () {
				$this.removeClass("active");
			}, 50);
		}
	);

	// HEADER PHONE VALIDATION

	// FILTER SLIDETOGGLE BLOCK

	$(".filter-toggler").on("mousedown", function (event) {
		event.preventDefault();

		$(this).find(".filter-toggler__arrow").toggleClass("active");
		$(this).next().toggle();
	});

	// CUSTOM SELECT LEFT ALIGN

	if ($(".js-select").length) {
		var select2Left = $(".js-select");
		select2Left.each(function () {
			$(this).select2({
				dropdownParent: $(this).parent(),
			});
		});
	}

	if ($(".js-select-search").length) {
		var select2Left = $(".js-select-search");
		select2Left.each(function () {
			$(this).select2({
				dropdownParent: $(this).parent(),
				language: {
					noResults: function () {
						return "Немае такого відділення";
					},
				},
			});
		});
		$(".js-select-search").on("select2:open", function (e) {
			$(".select2-search__field").attr(
				"placeholder",
				"Введіть відділення..."
			);
		});
	}

	// CUSTOM SELECT RIGHT ALIGN

	if ($(".js-select-right").length) {
		var select2Right = $(".js-select-right");
		select2Right.each(function () {
			$(this).select2({
				dropdownParent: $(this).parent(),
			});
		});

		select2Right.on("select2:open", function (e) {
			$(".select2-container").addClass("select2-container--custom");
		});

		select2Right.on("select2:close", function (e) {
			$(".select2-container").addClass("select2-container--custom");
		});
	}

	// CARD HEART ANIMATION

	$(".product-item__heart").click(function () {
		$(this).toggleClass("active");
	});

	$(".card-content__like").click(function () {
		$(this).toggleClass("active active-heart");
		setTimeout(function () {
			$(".card-content__like").removeClass("active");
		}, 700);
	});

	// SCROLL TO ANY SECTION

	$('.scroll[href*="#"]').on("click", function (e) {
		e.preventDefault();
		$(".scroll.active").removeClass("active");
		$(this).toggleClass("active");
		$("html, body").animate(
			{
				scrollTop: $($(this).attr("href")).offset().top - 40,
			},
			800,
			"linear"
		);
	});

	// ACCORDION JQUERY

	$(".accordion > li:first-child .accordion-toggler")
		.addClass("active")
		.next()
		.slideDown();

	$(".accordion-toggler").click(function () {
		$(this).toggleClass("active");
		$(this).next().slideToggle();
	});

	// MODAL MAGNIFIC POPUP INIT

	$(".modal-init").magnificPopup({
		type: "inline",
		fixedContentPos: true,
		removalDelay: 500,
		callbacks: {
			beforeOpen: function () {
				this.st.mainClass = this.st.el.attr("data-effect");
			},
		},
		midClick: true,
	});

	$(".modal-full").magnificPopup({
		type: "inline",
		fixedContentPos: true,
		removalDelay: 500,
		callbacks: {
			open: function () {
				$(".mfp-wrap").addClass("mfp-full");
				setTimeout(function () {
					$(".modal-popular__row").addClass("active");
				}, 350);
			},
			close: function () {
				$(".mfp-wrap").removeClass("mfp-full");
				$(".modal-popular__row").removeClass("active");
			},
			beforeOpen: function () {
				this.st.mainClass = this.st.el.attr("data-effect");
			},
		},
		midClick: true,
	});

	$(".js-modal-close").on("click", function () {
		$.magnificPopup.close();
	});

	// SLIDER HOME PAGE BANNER

	if ($(".banner-slider").length) {
		new Swiper(".banner-slider", {
			loop: true,
			spaceBetween: 6,
			wrapperClass: "swiper-wrapper",

			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},

			navigation: {
				nextEl: ".banner-nav__arrow--next",
				prevEl: ".banner-nav__arrow--prev",
			},
		});
	}

	// SLIDER CARD PAGE

	if ($(".card-nav").length) {
		var swiper = new Swiper(".card-nav", {
			loop: false,
			spaceBetween: 12,
			slidesPerView: 4,
			watchSlidesProgress: true,
			on: {
				touchEnd: function (s, e) {
					let range = 5;
					let diff = (s.touches.diff = s.isHorizontal()
						? s.touches.currentX - s.touches.startX
						: s.touches.currentY - s.touches.startY);
					if (diff < range || diff > -range) s.allowClick = true;
				},
				slideNextTransitionEnd: function (swiper) {
					var iframes = $(".card-for iframe");

					iframes.each(function () {
						try {
							this.contentWindow.postMessage(
								'{"event":"command","func":"pauseVideo","args":""}',
								"*"
							);
						} catch (e) {
							console.error("Ошибка при остановке видео:", e);
						}
					});
				},
			},
			breakpoints: {
				1280: {
					direction: "vertical",
					slidesPerView: 5,
				},
			},
		});
	}

	if ($(".card-for__slider").length) {
		var swiper2 = new Swiper(".card-for__slider", {
			loop: false,
			spaceBetween: 12,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".card-for__arrow--next",
				prevEl: ".card-for__arrow--prev",
			},
			thumbs: {
				swiper: swiper,
			},
		});
	}

	// SLIDER HOME PAGE BANNER
	if ($(".interest-slider").length) {
		new Swiper(".interest-slider", {
			loop: false,
			spaceBetween: 4,
			slidesPerView: "auto",
			slidesPerGroup: 3,
			wrapperClass: "swiper-wrapper",

			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},

			scrollbar: {
				el: ".swiper-scrollbar",
				draggable: true,
				dragSize: 240,
			},
			breakpoints: {
				767: {
					spaceBetween: 10,
					slidesPerGroup: 4,
				},
			},
		});
	}

	// // CUSTOM JS SCROLL

	if ($(".customScroll").length) {
		var elementsWithClass = document.querySelectorAll(".customScroll");

		elementsWithClass.forEach(function (element) {
			new SimpleBar(element, {autoHide: false});
		});
	}

	// ORDER PAGE CITY INPUT VALUE

	// $(".js-city-btn").click(function () {
	// 	var buttonText = $(this).find("span").text().trim();
	// 	$(".js-input-city").val(buttonText);
	// });

	// IOS FULL HEIGHT DIV BUG FIX

	var vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", vh + "px");

	window.addEventListener("resize", function () {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", vh + "px");
	});

	// RANGE SLIDER FILTER CATALOG

	if ($("#range-slider").length) {
		var stepsSlider = document.getElementById("range-slider");
		var input0 = document.getElementById("range-before");
		var input1 = document.getElementById("range-after");
		var inputs = [input0, input1];
		var updateSliderButton = document.querySelector(".range-btn");

		noUiSlider.create(stepsSlider, {
			start: [0, 300000],
			connect: true,
			range: {
				min: 0,
				max: 300000,
			},
			format: wNumb({
				decimals: 0,
				thousand: " ",
			}),
		});

		stepsSlider.noUiSlider.on("update", function (values, handle) {
			inputs[handle].value = values[handle];
		});

		inputs.forEach(function (input, handle) {
			input.addEventListener("change", function () {
				stepsSlider.noUiSlider.setHandle(handle, this.value);
			});

			input.addEventListener("keydown", function (e) {
				var values = stepsSlider.noUiSlider.get();
				var value = Number(values[handle]);

				var steps = stepsSlider.noUiSlider.steps();

				var step = steps[handle];

				var position;

				switch (e.which) {
					case 13:
						stepsSlider.noUiSlider.setHandle(handle, this.value);
						break;

					case 38:
						position = step[1];

						if (position === false) {
							position = 1;
						}

						if (position !== null) {
							stepsSlider.noUiSlider.setHandle(
								handle,
								value + position
							);
						}

						break;

					case 40:
						position = step[0];

						if (position === false) {
							position = 1;
						}

						if (position !== null) {
							stepsSlider.noUiSlider.setHandle(
								handle,
								value - position
							);
						}

						break;
				}
			});
		});
		updateSliderButton.addEventListener("click", function () {
			stepsSlider.noUiSlider.set([input0.value, input1.value]);
		});
	}

	// ANIMATION FOOTER LOGO

	$(".footer .socials-list li").hover(
		function () {
			var animationNumber = $(this).data("animation");
			$(".footer-logo svg").addClass("r-anim-" + animationNumber);
		},
		function () {
			var animationNumber = $(this).data("animation");
			$(".footer-logo svg").removeClass("r-anim-" + animationNumber);
		}
	);

	// ANIMATION CARD PAGE BUTTON

	$(".bubbly-button").click(function () {
		var $button = $(this);

		$button.toggleClass("animate");

		setTimeout(function () {
			$button.removeClass("animate");
		}, 700);
	});

	// ANIMATION CARD PAGE BUTTON

	$(".map-info__box").click(function () {
		$(".map-info__box.active").removeClass("active");
		$(this).toggleClass("active");
	});

	// MODAL MAP TABS

	if ($(window).width() < 1024) {
		$(".map-item").not(":first").hide();
		$(".map-nav__btn")
			.click(function () {
				$(".map-nav__btn")
					.removeClass("active")
					.eq($(this).index())
					.addClass("active");
				$(".map-item").hide().eq($(this).index()).fadeIn();
			})
			.eq(0)
			.addClass("active");
	}
});
