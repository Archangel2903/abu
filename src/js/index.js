import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';
import 'select2';

function fixedSize() {
    let header = $('header.header'),
        headerHeight = header.height(),
        headerTop = header.find('.header-top-wrap'),
        headerTopHeight = headerTop.height(),
        headerContent = header.find('.header-content-wrap'),
        headerContentHeight = headerContent.height(),
        content = $('main.content');

    if (header.hasClass('scrolling')) {
        headerTop.css('margin-top', '-' + headerTopHeight + 'px');
        content.css('padding-top', headerContentHeight + 'px');
    }
    else {
        headerTop.css('margin-top', '0');
        setTimeout(function () {
            headerHeight = header.height();
            content.css('padding-top', headerHeight + 'px');
        }, 300);
    }
}

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');

    fixedSize();
});

$(function () {
    $(window).on('resize', fixedSize);
    $(window).on('scroll', function () {
        let header = $('header.header');
        let offsetTop = header.offset().top;

        if (offsetTop > 0) {
            header.addClass('scrolling');
            fixedSize();
        } else {
            header.removeClass('scrolling');
            fixedSize();
        }
    });

    $('.header-content__menu-item').each(function (i, e) {
        if ($(e).find('.header-content__menu-dropdown').length) {
            $(e).addClass('dropdown-wrap');
        }
    });

    $('.header-content__menu-switch').on('click', function () {
        $(this).toggleClass('active');
        $(this).next().toggleClass('active');
    });

    // Swiper sliders
    let auto_slider = $('.auto-slider'),
        projects_slider = $('.projects__slider'),
        partners_slider = $('.our-partners__slider'),
        reviews_slider = $('.reviews__slider');

    if (auto_slider.length) {
        let autoSlider,
            slide = document.querySelectorAll('.auto-slider .swiper-slide').length;

        if (slide > 2) {
            autoSlider = new Swiper('.auto-slider', {
                observer: true,
                observeParents: true,
                autoplay: true,
                loop: true,
                slidesPerView: 1,
                allowTouchMove: false,
                navigation: false,
                pagination: false,
                scrollbar: false,
                dynamicBullets: false
            });
        }
    }

    if (projects_slider.length) {
        let slider,
            slide = document.querySelectorAll('.projects__slider .swiper-slide').length;

        if (slide > 4) {
            slider = new Swiper('.projects__slider', {
                observer: true,
                observeParents: true,
                autoplay: true,
                slidesPerView: 4,
                navigation: {
                    nextEl: projects_slider.prev().find('.swiper-button-next')[0],
                    prevEl: projects_slider.prev().find('.swiper-button-prev')[0],
                },
                breakpoints: {
                    991: {
                        slidesPerView: 3
                    },
                    767: {
                        slidesPerView: 2
                    },
                    575: {
                        slidesPerView: 1
                    }
                }
            });
        }
    }

    if (partners_slider.length) {
        let slider,
            slide = document.querySelectorAll('.our-partners__slider .swiper-slide').length;

        if (slide > 4) {
            slider = new Swiper('.our-partners__slider', {
                observer: true,
                observeParents: true,
                autoplay: true,
                spaceBetween: 77,
                slidesPerView: 4,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    1199: {
                        spaceBetween: 40,
                        slidesPerView: 3
                    },
                    767: {
                        slidesPerView: 2
                    },
                    575: {
                        slidesPerView: 1
                    }
                }
            });
        }
    }

    if (reviews_slider.length) {
        let slider,
            slide = document.querySelectorAll('.reviews__slider .swiper-slide').length;

        if (slide > 2) {
            slider = new Swiper('.reviews__slider', {
                observer: true,
                observeParents: true,
                autoplay: true,
                autoHeight: true,
                spaceBetween: 1,
                slidesPerView: 2,
                navigation: {
                    nextEl: reviews_slider.prev().find('.swiper-button-next')[0],
                    prevEl: reviews_slider.prev().find('.swiper-button-prev')[0],
                },
                breakpoints: {
                    991: {
                        autoHeight: false,
                        slidesPerView: 1
                    }
                }
            });
        }
    }

    /*
        if ($('.main-slider').length) {
            let slider;
            let slide = document.querySelectorAll('.main-slider .swiper-slide').length;

            if (slide > 1) {
                slider = new Swiper('.main-slider', {
                    observer: true,
                    observeParents: true,
                    loop: true,
                    autoplay: true,
                    spaceBetween: 25,
                    slidesPerView: 1,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    /!*scrollbar: {
                        el: '.swiper-scrollbar',
                    },*!/
                    dynamicBullets: true,
                });
            }
        }
    */

    if ($('.catalog-sidebar__dropdown-trigger')) {
        $('.catalog-sidebar__dropdown-trigger').on('click', function () {
            if ($(this).hasClass('rotate')) {
                $(this).toggleClass('rotate');
                $(this).next('.catalog-sidebar__dropdown').stop().slideToggle(300);
            }
            else {
                $('.catalog-sidebar__dropdown-trigger').removeClass('rotate');
                $('.catalog-sidebar__dropdown').stop().slideUp(300);
                $(this).toggleClass('rotate');
                $(this).next('.catalog-sidebar__dropdown').stop().slideToggle(300);
            }
        });
    }

    if ($('.select-style').length) {
        $('.select-style').select2({
            minimumResultsForSearch: -1,
        });
    }

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});