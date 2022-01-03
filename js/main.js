"use strict";

(function () {
  'use strict';

  var navMainWrapper = document.querySelector('.main-nav__wrapper');
  var navMain = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');
  navMainWrapper.classList.remove('main-nav__wrapper--nojs');
  navMain.classList.remove('main-nav--nojs');

  if (navMain.classList.contains('main-nav--opened')) {
    navMain.classList.remove('main-nav--opened');
    navMain.classList.add('main-nav--closed');
  }

  var navToggleOnClick = function navToggleOnClick() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  };

  navToggle.addEventListener('click', navToggleOnClick); // Инициализация Swiper

  if (document.querySelector('.swiper-container')) {
    // eslint-disable-next-line no-new
    new window.Swiper('.swiper-container', {
      slidesPerView: 1,
      grabCursor: true,
      // Стрелки
      navigation: {
        prevEl: '.reviews__prev',
        nextEl: '.reviews__next'
      },
      // Буллеты
      pagination: {
        el: '.swiper-pagination',
        // Буллеты
        clickable: true
      }
    });
  } // Modal


  var form = document.querySelector('.feedback__form');

  if (form) {
    var lastName = form.querySelector('[name=lastname]');
    var firstName = form.querySelector('[name=firstname]'); //   const patronymicName = form.querySelector("[name=patronymic]");
    //   const tel = form.querySelector("[name=tel]");

    var email = form.querySelector('[name=email]');
    var openError = document.querySelector('.modal--error');
    var openSend = document.querySelector('.modal--send');
    var closeError = openError.querySelector('.modal__button--close');
    var closeSend = openSend.querySelector('.modal__button--close');
    document.addEventListener('DOMContentLoaded', function () {
      // событие загрузки страницы
      // выбираем на странице все элементы типа textarea и input
      document.querySelectorAll('textarea, input').forEach(function (e) {
        // если данные значения уже записаны в sessionStorage,
        // то вставляем их в поля формы
        // путём этого мы как раз берём данные из памяти браузера,
        // если страница была случайно перезагружена
        if (e.value === '') e.value = window.localStorage.getItem(e.name, e.value); // на событие ввода данных (включая вставку с помощью мыши) вешаем обработчик

        e.addEventListener('input', function () {
          // и записываем в sessionStorage данные, в качестве
          // имени используя атрибут name поля элемента ввода
          window.localStorage.setItem(e.name, e.value);
        });
      });
    });
    form.addEventListener('submit', function (evt) {
      if (!lastName.value || !firstName.value || !email.value) {
        evt.preventDefault();
        openError.classList.add('modal--show');

        if (!lastName.value) {
          lastName.classList.add('form-input--error');
          lastName.focus();
        } else {
          lastName.classList.remove('form-input--error');
        }

        if (!firstName.value) {
          firstName.classList.add('form-input--error');
          firstName.focus();
        } else {
          firstName.classList.remove('form-input--error');
        }

        if (!email.value) {
          email.classList.add('form-input--error');
          email.focus();
        } else {
          email.classList.remove('form-input--error');
        }
      } else {
        openSend.classList.add('modal--show');
      }
    });
    closeError.addEventListener('click', function (evt) {
      evt.preventDefault();
      openError.classList.remove('modal--show');
    });
    closeSend.addEventListener('click', function (evt) {
      evt.preventDefault();
      openSend.classList.remove('modal--show');
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        if (openError.classList.contains('modal--show')) {
          evt.preventDefault();
          openError.classList.remove('modal--show');
        }

        if (openSend.classList.contains('modal--show')) {
          evt.preventDefault();
          openSend.classList.remove('modal--show');
        }
      }
    });
  }

  var filterTab = document.querySelectorAll('.filter__tab');
  var filterContent = document.querySelectorAll('.filter__content');

  if (filterTab) {
    filterTab.forEach(function (button, index) {
      var btnOnClick = function btnOnClick() {
        if (!filterContent[index].classList.contains('filter__content--active')) {
          filterContent.forEach(function (content) {
            content.classList.remove('filter__content--active');
          });
          filterTab.forEach(function (button) {
            button.classList.remove('filter__tab--active');
          });
        }

        filterContent[index].classList.add('filter__content--active');
        filterTab[index].classList.add('filter__tab--active');
      };

      button.addEventListener('click', btnOnClick);
    });
  }
})();