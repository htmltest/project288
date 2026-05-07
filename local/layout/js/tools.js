/*
изменения помечены словом customfix
*/

$(document).ready(function() {

	$.validator.addMethod('phoneRU',
		function(phone_number, element) {
			return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
		},
		'Ошибка заполнения'
	);

	$('form').each(function() {
		initForm($(this));
	});

	$('.table-scroll').mCustomScrollbar({
		axis: 'x'
	});

	$('body').on('click', '.window-link', function(e) {
		windowOpen($(this).attr('href'));
		e.preventDefault();
	});

	$('body').on('keyup', function(e) {
		if (e.keyCode == 27) {
			windowClose();
		}
	});

	$(document).click(function(e) {
		if ($(e.target).hasClass('window')) {
			windowClose();
		}
	});

	$(window).resize(function() {
		windowPosition();
	});

	$('body').on('click', '.window-close, .window-btn-close', function(e) {
		windowClose();
		e.preventDefault();
	});

	$('.main-popular .main-popular-content').each(function() {
		var curBlock = $(this);
		var curBig = curBlock.find('.main-big');
		if (curBig.length == 1) {
			curBlock.find('.main-mini-list').prepend('<div class="main-mini main-mini-mobile">' +
														'<a href="' + curBig.find('a').attr('href') + '">' +
															'<div class="main-mini-photo"><img src="' + curBig.find('.main-big-photo img').attr('data-src') + '" alt="" /></div>' +
															'<div class="main-mini-type">' + curBig.find('.main-big-type').html() + '</div>' +
															'<div class="main-mini-date-mobile">' + curBig.find('.main-big-date-mobile').html() + '</div>' +
															'<div class="main-mini-title">' + curBig.find('.main-big-title').html() + '</div>' +
															'<div class="main-mini-anonce">' + curBig.find('.main-big-anonce').html() + '</div>' +
															'<div class="main-mini-info">' +
																'<div class="main-mini-info-date">' + curBig.find('.main-big-info-date').html() + '</div>' +
																'<div class="main-mini-info-view">' + curBig.find('.main-big-info-view').html() + '</div>' +
															'</div>' +
														'</a>' +
														'<div class="main-mini-type-links">' + curBig.find('.main-big-type-links').html() + '</div>' +
													'</div>');
		}
	});

	$('body').on('click', '.main-news-more .btn', function(e) {
		var curLink = $(this);
		if (!curLink.hasClass('loading')) {
			curLink.addClass('loading');
			$.ajax({
				type: 'POST',
				url: curLink.attr('href'),
				dataType: 'html',
				cache: false
			}).done(function(html) {
				var newHTML = $(html);
				$('.main-news-list').append(newHTML.find('.main-news-list').html());
				$('.main-news-list .lzy_img').each(function() {
					var lazyImage = $(this);
					lazyImage.attr('src', lazyImage.attr('data-src'));
					lazyImage.removeClass('lzy_img');
				});
				if (newHTML.find('.main-news-more .btn').length > 0) {
					curLink.attr('href', newHTML.find('.main-news-more .btn').attr('href'));
					curLink.removeClass('loading');
				} else {
					curLink.parent().remove();
				}
				$(window).trigger('scroll');
			});
		}
		e.preventDefault();
	});

	$('body').on('click', '.main-popular-more .btn', function(e) {
		var curLink = $(this);
		if (!curLink.hasClass('loading')) {
			curLink.addClass('loading');
			$.ajax({
				type: 'POST',
				url: curLink.attr('href'),
				dataType: 'html',
				cache: false
			}).done(function(html) {
				var newHTML = $(html);
				$('.main-popular .main-mini-list').append(newHTML.find('.main-mini-list').html());
				$('.main-popular .main-mini-list .lzy_img').each(function() {
					var lazyImage = $(this);
					lazyImage.attr('src', lazyImage.attr('data-src'));
					lazyImage.removeClass('lzy_img');
				});
				if (newHTML.find('.main-popular-more .btn').length > 0) {
					curLink.attr('href', newHTML.find('.main-popular-more .btn').attr('href'));
					curLink.removeClass('loading');
				} else {
					curLink.parent().remove();
				}
				$(window).trigger('scroll');
			});
		}
		e.preventDefault();
	});

	$('.main-projects-list').slick({
		infinite: false,
		slidesToShow: 5,
		slidesToScroll: 5,
		prevArrow: '<button type="button" class="slick-prev" aria-label="Previous project"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.22379 10L13 18.3777L11.6371 20L-4.37114e-07 10L11.6371 -5.08674e-07L13 1.62234L3.22379 10Z" /></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Next project"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.77621 10L8.8276e-07 1.62234L1.3629 -5.08674e-07L13 10L1.3629 20L1.50361e-07 18.3777L9.77621 10Z" /></svg></button>',
		dots: false,
		responsive: [
			{
				breakpoint: 1159,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: false,
					dots: true
				}
			}
		]
	});

	$('.menu-link').click(function(e) {
		if ($('html').hasClass('menu-open')) {
			$('.wrapper').css({'top': 'auto'});
			$('html').removeClass('menu-open');
			$(window).scrollTop($('.wrapper').data('curScroll'));
		} else {
			$('.wrapper').css({'top': -$(window).scrollTop()});
			$('.wrapper').data('curScroll', $(window).scrollTop());
			$('html').addClass('menu-open');
		}
		e.preventDefault();
	});

	$(document).click(function(e) {
		if ($(e.target).hasClass('header-inner')) {
			if ($('html').hasClass('menu-open')) {
				$('.wrapper').css({'top': 'auto'});
				$('html').removeClass('menu-open');
				$(window).scrollTop($('.wrapper').data('curScroll'));
			}
		}
	});

	$('.header-search-link').click(function(e) {
		$('.header-search').addClass('open');
		$('.header-search-input input').trigger('focus');
		e.preventDefault();
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.header-search').length == 0) {
			$('.header-search').removeClass('open');
		}
	});

	$('.marketing-media-select-title').click(function() {
		$(this).parent().toggleClass('open');
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.marketing-media-select').length == 0) {
			$('.marketing-media-select').removeClass('open');
		}
	});

	$('.gallery').each(function() {
		var curGallery = $(this);
		curGallery.find('.gallery-list').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			prevArrow: '<button type="button" class="slick-prev"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.22379 10L13 18.3777L11.6371 20L-4.37114e-07 10L11.6371 -5.08674e-07L13 1.62234L3.22379 10Z" /></svg></button>',
			nextArrow: '<button type="button" class="slick-next"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.77621 10L8.8276e-07 1.62234L1.3629 -5.08674e-07L13 10L1.3629 20L1.50361e-07 18.3777L9.77621 10Z" /></svg></button>',
			dots: false,
			responsive: [
				{
					breakpoint: 1159,
					settings: {
						arrows: false,
						dots: true
					}
				}
			]
		}).on('setPosition', function(event, slick) {
			var currentSlide = curGallery.find('.gallery-list').slick('slickCurrentSlide') + 1;
			curGallery.find('.gallery-ctrl-current').html(currentSlide);
		});
	});

	$('.brand-footer-close').click(function(e) {
		$('.brand-footer').fadeOut();
		e.preventDefault();
	});

	$('body').on('click', '.form-reset input', function() {
		window.setTimeout(function() {
			$('.form-select select').trigger('chosen:updated');
			$('.form-file input').each(function() {
				var curInput = $(this);
				var curField = curInput.parent();
				if (curInput.val() == '') {
					curField.find('.form-file-name').html('');
					curField.removeClass('success');
				}
			});
		}, 100);
	});

	$('.menu-section').each(function() {
		var curSection = $(this);
		if (curSection.next().hasClass('menu-section-list')) {
			curSection.addClass('with-submenu');
			curSection.append('<span></span>');
		}
	});

	$('.menu-section span').click(function(e) {
		if ($(window).width() < 1160) {
			if ($(this).parent().hasClass('with-submenu')) {
				$(this).parent().toggleClass('open');
				e.preventDefault();
			}
		}
	});

	$('body').on('click', '.article-social a', function(e) {
		var curLink = $(this);
		var curSocial = curLink.parent();
		var curTitle = encodeURIComponent(curSocial.data('title'));
		var curDescription = encodeURIComponent(curSocial.data('description'));
		var curUrl = encodeURIComponent(curSocial.data('url'));

		switch (curLink.data('id')) {
			case 'tg':
				popupCenter('https:///t.me/share/url?url=' + curUrl + '&text=' + curTitle + '. ' + curDescription, curTitle);
				break;

			case 'fb':
				popupCenter('https://www.facebook.com/sharer/sharer.php?u=' + curUrl, curTitle);
				break;

			case 'vk':
				popupCenter('https://vk.com/share.php?url=' + curUrl + '&description=' + curTitle + '. ' + curDescription, curTitle);
				break;

			case 'tw':
				var text = curTitle || curDescription || '';
				if (curTitle.length > 0 && curDescription.length > 0) text = curTitle + ' - ' + curDescription;
				if (curDescription.length > 0) text = '&text=' + text;
				popupCenter('https://twitter.com/intent/tweet?url=' + curUrl + text, curTitle);
				break;

			default:
				break;
		}

		e.preventDefault();
	});

	$('body').on('change', '.window-policy-checkbox input', function() {
		if ($(this).prop('checked')) {
			$(this).parents().filter('form').find('.window-policy-error').removeClass('visible');
			$(this).parents().filter('form').find('.form-submit .btn').prop('diabled', false).removeClass('disabled');
		} else {
			$(this).parents().filter('form').find('.window-policy-error').addClass('visible');
			$(this).parents().filter('form').find('.form-submit .btn').prop('diabled', true).addClass('disabled');
		}
	});

	$('.page-404-menu ul li a').click(function(e) {
		var curLi = $(this).parent();
		if (!curLi.hasClass('active')) {
			$('.page-404-menu ul li.active').removeClass('active');
			curLi.addClass('active');

			var curIndex = $('.page-404-menu ul li').index(curLi);
			$('.page-404-tab').stop(true, true);
			$('.page-404-tab:visible').fadeOut(100, function() {
				$('.page-404-tab').eq(curIndex).fadeIn(100);
			});
		}
		e.preventDefault();
	});

	$('nav ul li').each(function() {
		if ($(this).find('ul').length > 0) {
			$(this).addClass('with-submenu');
		}
	});

	$('.up-link').click(function(e) {
		$('html, body').animate({'scrollTop': 0});
		e.preventDefault();
	});

	$('body').on('change', '#activity-other', function(e) {
		if ($(this).prop('checked')) {
			$('#activity-other-text').addClass('visible');
		} else {
			$('#activity-other-text').removeClass('visible');
		}
	});

	if ($('.article-infinity').length > 0) {
		$('.article-infinity').data('loading', false);
		$('.article-infinity').find('.article-infinity-item').eq(0).addClass('active');

		$(window).on('load resize scroll', function() {
			var curInifinity = $('.article-infinity');
			var curScroll = $(window).scrollTop();
			var curHeight = $(window).height();
			var curArticle = curInifinity.find('.article-infinity-item.active');
			if (curArticle.length > 0) {
				if (!curInifinity.data('loading')) {
					if ((curScroll + curHeight) > ((curArticle.offset().top + curArticle.height()) / 2)) {
						if (curArticle.attr('data-next') !== undefined) {
							curInifinity.data('loading', true);
							$.ajax({
								type: 'POST',
								url: curArticle.attr('data-next'),
								dataType: 'html',
								cache: false
							}).done(function(html) {
								curInifinity.append(html);
								curInifinity.find('.article-infinity-item:last').addClass('next');
								$('.article-infinity .lzy_img').each(function() {
									var lazyImage = $(this);
									lazyImage.attr('src', lazyImage.attr('data-src'));
									lazyImage.removeClass('lzy_img');
								});

								curInifinity.find('.article-infinity-item:last .gallery').each(function() {
									var curGallery = $(this);
									curGallery.find('img').eq(0).on('load', function() {
										curGallery.find('.gallery-list').slick({
											infinite: true,
											slidesToShow: 1,
											slidesToScroll: 1,
											adaptiveHeight: true,
											prevArrow: '<button type="button" class="slick-prev"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.22379 10L13 18.3777L11.6371 20L-4.37114e-07 10L11.6371 -5.08674e-07L13 1.62234L3.22379 10Z" /></svg></button>',
											nextArrow: '<button type="button" class="slick-next"><svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.77621 10L8.8276e-07 1.62234L1.3629 -5.08674e-07L13 10L1.3629 20L1.50361e-07 18.3777L9.77621 10Z" /></svg></button>',
											dots: false,
											responsive: [
												{
													breakpoint: 1159,
													settings: {
														arrows: false,
														dots: true
													}
												}
											]
										}).on('setPosition', function(event, slick) {
											var currentSlide = curGallery.find('.gallery-list').slick('slickCurrentSlide') + 1;
											curGallery.find('.gallery-ctrl-current').html(currentSlide);
										});
									});
								});

								$('.to-link').each(function() {
									var curItem = $(this);
									curItem.replaceWith('<a href="' + curItem.attr('data-href') + '" target="_blank">' + curItem.html() + '</a>');
								});
							});
						}
					}
				}
				if ((curScroll + curHeight / 2) > (curArticle.offset().top + curArticle.height())) {
					var nextArticle = curArticle.next();
					if (nextArticle.length > 0) {
						curArticle.removeClass('active');
						nextArticle.addClass('active').removeClass('next');
						curInifinity.data('loading', false);
					}
				}
			}
			var visibleArticle = curInifinity.find('.article-infinity-item').eq(0);
			curInifinity.find('.article-infinity-item').each(function() {
				var checkArticle = $(this);
				if ((curScroll + curHeight / 2) > (checkArticle.offset().top)) {
					visibleArticle = checkArticle;
				}
			});
			var visibleTitle = visibleArticle.attr('data-title');
			var visibleURL = visibleArticle.attr('data-url');
			if ($('title').text() != visibleTitle) {
				if (typeof (history.pushState) != 'undefined') {
					history.pushState(null, null, visibleURL);
					$('title').text(visibleTitle);
				}
			}
		});
	}

	$('.to-link').each(function() {
		var curItem = $(this);
		curItem.replaceWith('<a href="' + curItem.attr('data-href') + '" target="_blank">' + curItem.html() + '</a>');
	});

	window.setInterval(function(e) {
		$('.main-big:visible').each(function() {
            if ($(this).find('.main-big-type').length == 1) {
                $(this).find('.main-big-type-links').css({'top': $(this).find('.main-big-type').offset().top - $(this).offset().top, 'opacity': 1});
                $(this).find('.main-big-type').css({'opacity': 0});
            }
		});

		$('.main-mini').each(function() {
			if ($(this).find('.main-mini-type').length > 0) {
				$(this).find('.main-mini-type-links').css({'top': $(this).find('.main-mini-type').offset().top - $(this).offset().top, 'opacity': 1});
				$(this).find('.main-mini-type').css({'opacity': 0});
			}
		});

		$('.page-404-tab-item').each(function() {
			$(this).find('.main-mini-type-links').css({'top': $(this).find('.main-mini-type').offset().top - $(this).offset().top, 'opacity': 1});
			$(this).find('.main-mini-type').css({'opacity': 0});
		});

		$('.category-wrap').each(function() {
			$(this).find('.category-content-type-links').css({'top': $(this).find('.category-content-type').offset().top - $(this).offset().top, 'opacity': 1});
			$(this).find('.category-content-type').css({'opacity': 0});
		});
	}, 100);

	$('body').on('click', '.article-info-item-authors span', function() {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
		} else {
			$('.article-info-item-authors span.open').removeClass('open');
			$(this).addClass('open');
			if ($(window).width() < 1160) {
				var curBlock = $(this).find('strong');
				curBlock.css({'transform': 'none'});
				if (curBlock.offset().left < 0) {
					curBlock.css({'transform': 'translateX(' + (-curBlock.offset().left) + 'px)'});
				}
				if ((curBlock.offset().left + curBlock.outerWidth()) > $(window).width()) {
					curBlock.css({'transform': 'translateX(' + ($(window).width() - (curBlock.offset().left + curBlock.outerWidth())) + 'px)'});
				}
			}
		};
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.article-info-item-authors span').length == 0 && !($(e.target).parent().hasClass('article-info-item-authors'))) {
			$('.article-info-item-authors span.open').removeClass('open');
		}
	});

	$('body').on('click', '.main-partners-item > a', function(e) {
		if ($(window).width() < 1170) {
			var curBlock = $(this).parent();
			if (curBlock.find('.main-partners-item-window').length > 0) {
				if (curBlock.hasClass('open')) {
					curBlock.removeClass('open');
				} else {
					$('.main-partners-item.open').removeClass('open');
					curBlock.addClass('open');
				}
				e.preventDefault();
			}
		}
	});

	$('body').on('click', '.main-partners-item-window-close', function(e) {
		$('.main-partners-item.open').removeClass('open');
		e.preventDefault();
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.main-partners-item').length == 0) {
			$('.main-partners-item.open').removeClass('open');
		}
	});

	$('.guide-sort-title').click(function() {
		$('.guide-sort').toggleClass('open');
	});

	$('.guide-filter-dropdown-current').click(function() {
		$('.guide-filter-dropdown-current').toggleClass('open');
		$('.guide-filter-dropdown-list').toggleClass('open');
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.guide-sort').length == 0) {
			$('.guide-sort').removeClass('open');
		}
	});

	$('.guide-sort-item a').click(function(e) {
		var curItem = $(this).parent();
		var curGroup = curItem.parent();
		if (!curItem.hasClass('active')) {
			$('.guide-sort-item.active').removeClass('active');
			curItem.addClass('active');
			$('.guide-sort-group.active').removeClass('active');
			curGroup.addClass('active');
		} else {
			curGroup.find('.guide-sort-item').addClass('active dir-active');
			curItem.removeClass('active dir-active');
		}
		$('.guide-sort').removeClass('open');
		filterGuide();
		e.preventDefault();
	});

	$('.guide-filter-search .form-input input').keyup(function() {
		if ($(window).width() > 1159) {
			filterGuide();
		}
	});

	$('.guide-filter-type-list .form-radio input').change(function() {
		if ($(window).width() > 1159) {
			filterGuide();
		}
	});

	$('.guide-filter-mobile-link').click(function() {
		var curWidth = $(window).width();
		var curScroll = $(window).scrollTop();
		$('.wrapper').data('curScroll', curScroll);
		$('html').addClass('guide-filter-open');
		if (curWidth < 480) {
			curWidth = 480;
		}
		$('meta[name="viewport"]').attr('content', 'width=' + curWidth);
	});

	$('.guide-filter-mobile-close').click(function(e) {
		$('html').removeClass('guide-filter-open');
		$('meta[name="viewport"]').attr('content', 'width=device-width');
		$(window).scrollTop($('.wrapper').data('curScroll'));
		e.preventDefault();
	});

	$('.guide-filter-mobile-reset').click(function(e) {
		$('.guide-filter-search .form-input input').val('');
		$('.guide-filter-type-list .form-radio input').eq(0).prop('checked', true);
		e.preventDefault();
	});

	$('.guide-filter-submit a').click(function(e) {
		$('.guide-filter-mobile-close').trigger('click');
		filterGuide();
		e.preventDefault();
	});

	$('.guide-filter form').each(function() {
		var curForm = $(this);
		var validator = curForm.validate();
		if (validator) {
			validator.destroy();
		}
		curForm.validate({
			ignore: '',
			submitHandler: function(form) {
				filterGuide();
			}
		});
	});

	$('body').on('click', '.guide-list-container .pager a', function(e) {
		var curLink = $(this);
		if (!curLink.hasClass('active')) {
			$('.guide-list-container .pager a.active').removeClass('active');
			curLink.addClass('active');
			if (e.originalEvent === undefined) {
				filterGuide();
			} else {
				filterGuide(true);
			}
		}
		e.preventDefault();
	});

	$('body').on('click', '[data-href]', function(e) {
		window.location = $(this).attr('data-href');
		e.preventDefault();
	});

});

$(window).on('load', function() {
	if (window.location.hash != '') {
		var curBlock = $(window.location.hash);
		if (curBlock.length > 0) {
			$('html, body').animate({'scrollTop': curBlock.offset().top - $('header').height()}, 100);
		}
	}
});

function popupCenter(url, title) {
	var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
	var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	var left = ((width / 2) - (480 / 2)) + dualScreenLeft;
	var top = ((height / 3) - (360 / 3)) + dualScreenTop;
	var newWindow = window.open(url, title, 'scrollbars=yes, width=' + 480 + ', height=' + 360 + ', top=' + top + ', left=' + left);
	if (window.focus) {
		newWindow.focus();
	}
}

const $html = $('html');
const $window = $(window);
const $header = $('header');
const $headerTop = $('.header-top', $header);
const $headerInner = $('.header-inner', $header);
let headerTopHeight = $headerInner.height();
$window.on('load resize scroll', function() {
	if (!$html.hasClass('fixed')) {
		headerTopHeight = $headerInner.height();
		document.documentElement.style.cssText = `--header-height: ${headerTopHeight}px`;
	}
	var curScroll = $window.scrollTop();

	var headerHeight = 132;
	if ($window.width() < 1160) {
		headerHeight = 55;
	}
	headerHeight = headerTopHeight;
	if (curScroll > $header.offset().top + headerHeight) {
		$html.addClass('fixed');
	} else {
		$html.removeClass('fixed');
	}

	$('.banner-side').each(function() {
		var curBanner = $(this);
		if (curBanner.hasClass('banner-side-static')) {
			return;
		}
		curBanner.height(curBanner.find('.banner-side-wrap').height());
		var curSide = curBanner.parent();
		var curBlock = curSide.parent();
		var curHeader = 0;
		if ($html.hasClass('fixed')) {
			curHeader = $headerInner.height();
		}
		if (curScroll + curHeader > curBlock.offset().top + (curSide.offset().top - curBlock.offset().top)) {
			var newTop = curScroll + curHeader - curBlock.offset().top;
			var curBottom = 39;
			if (curBlock.hasClass('main-popular-container')) {
				curBottom = -16;
			}
			if (curBlock.hasClass('main-popular-container') && curBlock.find('.pager').length > 0) {
				curBottom = -33;
			}
			if (curBlock.hasClass('main-news-container') && curBlock.find('.pager').length > 0) {
				curBottom = 22;
			}
			if (curBlock.hasClass('main-news-companies')) {
				curBottom = 64;
			}
			if (curBlock.find('.magazine-archive-list').length > 0) {
				curBottom = -11;
			}
			if (curBlock.find('.magazines-list').length > 0) {
				curBottom = -3;
			}
			if (curBlock.hasClass('project')) {
				curBottom = -27;
			}
			if (curBlock.hasClass('search')) {
				curBottom = -33;
			}
			if (curBlock.find('.publishers-team').length > 0) {
				curBottom = -28;
			}
			if (curBlock.find('.marketing-list').length > 0) {
				curBottom = -1;
			}
			if (curBlock.find('.article-subscribe').length > 0) {
				curBottom = -25;
			}
			if (newTop + curBanner.height() < curBlock.height() + (curSide.offset().top - curBlock.offset().top - curBottom)) {
				curBanner.css({'top': curHeader, 'position': 'fixed', 'left': curBanner.offset().left});
			} else {
				curBanner.css({'top': curBlock.height() - curBanner.height() - curBottom, 'position': 'relative', 'left': 'auto'});
			}
		} else {
			curBanner.css({'top': 'auto', 'position': 'relative', 'left': 'auto'});
		}
	});

	if (curScroll > $window.height()) {
		$('.up-link').addClass('visible');
	} else {
		$('.up-link').removeClass('visible');
	}

	if (curScroll + $window.height() > $('footer').offset().top) {
		$('.up-link').css({'margin-bottom': (curScroll + $window.height()) - $('footer').offset().top});
	} else {
		$('.up-link').css({'margin-bottom': 0});
	}
});

$(window).on('resize', function() {
	$('.form-select select').chosen('destroy');
	$('.form-select select').chosen({disable_search: true});
});

$(window).on('load resize', function() {
	$('.main-calendar-list').each(function() {
		var curList = $(this);

		curList.find('.main-calendar-item-inner').css({'min-height': '0px'});

		curList.find('.main-calendar-item-inner').each(function() {
			var curBlock = $(this);
			var curHeight = curBlock.outerHeight();
			var curTop = curBlock.offset().top;

			curList.find('.main-calendar-item-inner').each(function() {
				var otherBlock = $(this);
				if (otherBlock.offset().top == curTop) {
					var newHeight = otherBlock.outerHeight();
					if (newHeight > curHeight) {
						curBlock.css({'min-height': newHeight + 'px'});
					} else {
						otherBlock.css({'min-height': curHeight + 'px'});
					}
				}
			});
		});
	});

	if ($(window).width() > 1159) {
		$('.main-calendar-list, .main-navigator-list, .magazine-archive-years, .page-404-tab-list').each(function() {
			var curList = $(this);
			if (curList.hasClass('slick-slider')) {
				curList.slick('unslick');
			}
		});
	} else {
		$('.main-calendar-list, .magazine-archive-years, .page-404-tab-list').each(function() {
			var curList = $(this);
			if (!curList.hasClass('slick-slider')) {
				curList.slick({
					infinite: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: false
				});
			}
		});

		$('.main-navigator-list').each(function() {
			var curList = $(this);
			if (!curList.hasClass('slick-slider')) {
				curList.slick({
					infinite: false,
					slidesToShow: 4,
					slidesToScroll: 4,
					arrows: false,
					dots: true,
					responsive: [
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3
							}
						},
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2
							}
						}
					]
				});
			}
		});
	}

});

function initForm(curForm) {
	curForm.find('.form-select select').chosen({disable_search: true});

	curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

	curForm.find('.form-file input').change(function() {
		var curInput = $(this);
		var curField = curInput.parent();
		curField.find('.form-file-name').html(curInput.val().replace(/.*(\/|\\)/, ''));
		curField.addClass('success');
	});

	curForm.validate({
		ignore: '',
		showErrors: function(errorMap, errorList) {
			if (curForm.find('.window-policy-checkbox').length > 0) {
				if (curForm.find('.window-policy-checkbox input').prop('checked')) {
					curForm.find('.window-policy-error').removeClass('visible');
					curForm.find('.form-submit .btn').prop('diabled', false).removeClass('disabled');
				} else {
					curForm.find('.window-policy-error').addClass('visible');
					curForm.find('.form-submit .btn').prop('diabled', true).addClass('disabled');
				}
				if (this.numberOfInvalids() == 0) {
					curForm.find('.form-submit .btn').prop('diabled', false).removeClass('disabled');
				} else {
					curForm.find('.form-submit .btn').prop('diabled', true).addClass('disabled');
				}
			}
			this.defaultShowErrors();
		},
		submitHandler: function(form) {
			if ($(form).hasClass('ajax-form')) {
				var formData = new FormData(form);

				if ($(form).find('[type=file]').length != 0) {
					var file = $(form).find('[type=file]')[0].files[0];
					formData.append('file', file);
				}

				windowOpen($(form).attr('action'), formData);
			} else {
				form.submit();
			}
		}
	});
}

function windowOpen(linkWindow, dataWindow) {
	if ($('html').hasClass('menu-open')) {
		$('.wrapper').css({'top': 'auto'});
		$('html').removeClass('menu-open');
		$(window).scrollTop($('.wrapper').data('curScroll'));
	}

	if ($('.window').length > 0) {
		windowClose();
	}

	var curPadding = $('.wrapper').width();
	var curWidth = $(window).width();
	if (curWidth < 480) {
		curWidth = 480;
	}
	var curScroll = $(window).scrollTop();
	$('html').addClass('window-open');
	curPadding = $('.wrapper').width() - curPadding;
	$('body').css({'margin-right': curPadding + 'px'});
	$('body').append('<div class="window"><div class="window-loading"></div></div>')
	$('.wrapper').css({'top': -curScroll});
	$('.wrapper').data('curScroll', curScroll);
	$('meta[name="viewport"]').attr('content', 'width=' + curWidth);

	$.ajax({
		type: 'POST',
		url: linkWindow,
		processData: false,
		contentType: false,
		dataType: 'html',
		data: dataWindow,
		cache: false
	}).done(function(html) {
		$('.window').append('<div class="window-container window-container-preload"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

		windowPosition();

		$('.window-container-preload').removeClass('window-container-preload');

		$('.window form').each(function() {
			initForm($(this));
		});

		$('.window #activity-other').each(function() {
			if ($(this).prop('checked')) {
				$('#activity-other-text').addClass('visible');
			} else {
				$('#activity-other-text').removeClass('visible');
			}
		});

	});
}

function windowPosition() {
	if ($('.window').length > 0) {
		$('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

		$('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
		if ($('.window-container').height() > $('.window').height() - 80) {
			$('.window-container').css({'top': 40, 'margin-top': 0, 'padding-bottom': 40});
		}
	}
}

function windowClose() {
	if ($('.window').length > 0) {
		$('.window').remove();
		$('html').removeClass('window-open');
		$('body').css({'margin-right': 0});
		$('.side-developer, .side-copyrights').css({'margin-right': 0});
		$('.wrapper').css({'top': 0});
		$(window).scrollTop($('.wrapper').data('curScroll'));
		$('meta[name="viewport"]').attr('content', 'width=device-width');
	}
}

var arr = document.querySelectorAll('img.lzy_img');

if ('IntersectionObserver' in window) {
	document.addEventListener('DOMContentLoaded', function() {

		const imageObserver = new IntersectionObserver(function(entries, imgObserver) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					const lazyImage = entry.target
					lazyImage.src = lazyImage.dataset.src
					lazyImage.classList.remove('lzy_img');
					imgObserver.unobserve(lazyImage);
				}
			})
		});
		for (var i = 0; i < arr.length; i++) {
			imageObserver.observe(arr[i]);
		}
	})
} else {
	for (var i = 0; i < arr.length; i++) {
		var lazyImage = arr[i];
		lazyImage.src = lazyImage.dataset.src
		lazyImage.classList.remove('lzy_img');
	}
}

function filterGuide(isScroll) {
	$('.guide-list-container').addClass('loading');
	var curForm = $('.guide-filter form');
	var curData = curForm.serialize();
	curData += '&PAGEN_1=' + $('.pager a.active').attr('data-value'); // customfix - PAGEN_1
	curData += '&sort=' + $('.guide-sort-item.active').attr('data-value') + '&sortdir=' + $('.guide-sort-item.active').attr('data-dir');
	var countParameters = 0;
	if ($('.guide-filter-search .form-input input').val() != '') {
		countParameters++;
	}
	if (!$('.guide-filter-type .form-radio input').eq(0).prop('checked')) {
		countParameters++;
	}
	$('.guide-filter-mobile-link span').remove();
	if (countParameters > 0) {
		$('.guide-filter-mobile-link').append('<span>' + countParameters + '</span>');
	}
	$.ajax({
		type: 'POST',
		url: curForm.attr('action'),
		dataType: 'html',
		data: curData,
		cache: false
	}).done(function(html) {
		$('.guide-list-container .main-news-list').html($(html).find('.main-news-list').html());
		$('.guide-list-container .pager').html($(html).find('.pager').html());

		// customfix
		if ( $( html ).find( '.pager' ).length )
		{
			$( '.guide-list-container .pager' ).show();
		}
		else
		{
			$( '.guide-list-container .pager' ).hide();
		}
		//----------


		// customfix

		/*$('.guide-header-status-from').html($(html).find('.main-news-list').attr('data-statusfrom'));
		$('.guide-header-status-to').html($(html).find('.main-news-list').attr('data-statusto'));
		$('.guide-header-status-count').html($(html).find('.main-news-list').attr('data-statuscount'));*/

		if ( $( html ).find( '.pager' ).length )
		{
			$('.guide-header-status-from').html($(html).find('.pager').attr('data-statusfrom'));
			$('.guide-header-status-to').html($(html).find('.pager').attr('data-statusto'));
			$('.guide-header-status-count').html($(html).find('.pager').attr('data-statuscount'));
		}
		else
		{
			var itemsCount = $( '.main-news-item' ).length;

			if ( itemsCount )
			{
				$('.guide-header-status-from').html(1);
			}
			else
			{
				$('.guide-header-status-from').html(0);
			}

			$('.guide-header-status-to').html(itemsCount);
			$('.guide-header-status-count').html(itemsCount);
		}


		//----------


		$('.guide-list-container').removeClass('loading');
		if (isScroll) {
			$('html, body').animate({'scrollTop': $('.guide-filter').offset().top});
		}
	});
}


$(document).ready(function() {

    $('.menu-section-list-business-title span').click(function(e) {
        $(this).parent().parent().toggleClass('open');
        e.preventDefault();
    });

    $('.magazine-archive-item-contain-title span').click(function(e) {
        let curWidth = $(window).width();
        if (curWidth < 1160) {
            if (curWidth < 480) {
                curWidth = 480;
            }
            const curScroll = $(window).scrollTop();
            $('html').addClass('magazine-archive-item-mobile-open');
            $('.wrapper').css({'top': -curScroll});
            $('.wrapper').data('curScroll', curScroll);
            $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
            $(this).parents().filter('.magazine-archive-item').addClass('mobile-open');
        }
    });

    $('.magazine-archive-item-preview-text-close').click(function(e) {
        if ($('html').hasClass('magazine-archive-item-mobile-open')) {
            $('html').removeClass('magazine-archive-item-mobile-open');
            $('.wrapper').css({'top': 0});
            $(window).scrollTop($('.wrapper').data('curScroll'));
            $('meta[name="viewport"]').attr('content', 'width=device-width');
            $('.magazine-archive-item.mobile-open').removeClass('mobile-open');
        }
    });

});