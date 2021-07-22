import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';

function fixedSize() {
    let header = $('header.header');
    let headerHeight = header.height();
    let headerContent = header.find('.header-content-wrap');
    let headerContentHeight = headerContent.height();
    let content = $('main.content');

    if (header.hasClass('scrolling')) {
        content.css('padding-top', headerContentHeight + 'px');
    }
    else {
        content.css('padding-top', headerHeight + 'px');
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
        }
        else {
            header.removeClass('scrolling');
            setTimeout(fixedSize, 300);
        }
    });

    $('.header-content__menu-item').each(function (i, e) {
        if ($(e).find('.header-content__menu-dropdown').length) {
            $(e).addClass('dropdown-wrap');
        }
    });

    // Swiper slider
    if ($('.swiper-container').length) {
        let slider,
            autoSlider,
            sliderNavOutside,
            sliderNavInside;

        let slide = document.querySelectorAll('.main-slider .swiper-slide').length;
        let slideOutside = document.querySelectorAll('.slider.nav-outside .swiper-slide').length;
        let slideInside = document.querySelectorAll('.slider.nav-inside .swiper-slide').length;

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

        if (slideOutside > 4) {
            sliderNavOutside = new Swiper('.slider.nav-outside', {
                observer: true,
                observeParents: true,
                autoplay: true,
                loop: true,
                slidesPerView: 4,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            });
        }

        if (slideInside > 4) {
            sliderNavInside = new Swiper('.slider.nav-inside', {
                observer: true,
                observeParents: true,
                autoplay: true,
                loop: true,
                slidesPerView: 4,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            });
        }

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
                /*scrollbar: {
                    el: '.swiper-scrollbar',
                },*/
                dynamicBullets: true,
            });
        }
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