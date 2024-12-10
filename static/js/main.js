;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Parallax
	var parallax = function() {
		if ( !isiPad() || !isiPhone() ) {
			$(window).stellar();
		}
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// event.preventDefault();

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	
	var stickyBanner = function() {
		var $stickyElement = $('.sticky-banner');
		var sticky;
		if ($stickyElement.length) {
		  sticky = new Waypoint.Sticky({
		      element: $stickyElement[0],
		      offset: 0
		  })
		}
	}; 

	// Document on load.
	$(function(){
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		stickyBanner();
	});


}());



document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Отменяем стандартное поведение ссылки

        const targetID = this.getAttribute('href').substring(1); // Получаем ID цели
        const targetSection = document.getElementById(targetID); // Находим секцию

        // Программный скролл к цели
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
	const expandableHeaders = document.querySelectorAll('.header');
	const allContents = document.querySelectorAll('.content');
  
	// Функция для закрытия всех блоков
	function closeAllSections() {
	  allContents.forEach(content => {
		content.style.maxHeight = null;
	  });
	}
  
	expandableHeaders.forEach(header => {
	  header.addEventListener('click', (e) => {
		e.stopPropagation(); // Останавливаем распространение кликов
  
		const content = header.nextElementSibling;
  
		if (content.style.maxHeight) {
		  // Если блок открыт, закрываем его
		  content.style.maxHeight = null;
		} else {
		  // Закрываем все блоки и открываем текущий
		  closeAllSections();
		  content.style.maxHeight = content.scrollHeight + 'px';
		}
	  });
	});
  
	// Обнаруживаем клики вне всех блоков
	document.addEventListener('click', (e) => {
	  if (!e.target.closest('.expandable')) { // Проверяем, клик вне блоков
		closeAllSections();
	  }
	});
  });
  
  






  //video ---------------------------------------------------------------------------------


  let player;

// Загружаем YouTube API и создаем плеер
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '',
    width: '640',
    videoId: '8vr3HRQS8zI', // ID видео
    playerVars: {
      autoplay: 0,
      controls: 1,
      mute: 0, // Отключаем заглушение звука
      rel: 0,
      showinfo: 0,
      modestbranding: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    }
  });
}

// Когда плеер готов
function onPlayerReady(event) {
  console.log("YouTube плеер готов");
}

// Проверяем видимость элемента с IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
  const targetSection = document.getElementById("section3");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (player) {
        if (entry.isIntersecting) {
          player.playVideo(); // Начать воспроизведение при видимости
        } else {
          player.pauseVideo(); // Поставить на паузу, когда выходит из области
        }
      }
    });
  }, observerOptions);

  observer.observe(targetSection);
});

// Дополнительный обработчик состояния
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    console.log("Видео воспроизводится");
  }

  if (event.data === YT.PlayerState.PAUSED) {
    console.log("Видео приостановлено");
  }
}



window.addEventListener('DOMContentLoaded', function () {
	console.log('DOM полностью загружен');
  
	const menuLinks = document.querySelectorAll('.sf-menu a');
	const sections = document.querySelectorAll('.section');
	const menu = document.getElementById('fh5co-menu-wrap');
  
	if (!menu) {
	  console.error('Ошибка: Элемент с ID #fh5co-menu-wrap не найден!');
	  return;
	}
  
	/** Проверяем текущую видимую секцию и подсвечиваем соответствующий пункт навигации */
	function highlightCurrentSection() {
	  const scrollPosition = window.scrollY + 100; // Смещение, чтобы учесть верхнюю навигационную панель
	  console.log('Скролл на позицию:', scrollPosition);
  
	  let currentSectionIndex = -1; 
  
	  sections.forEach((section, index) => {
		console.log(
		  `Проверяем секцию: ${section.id} с верхней границей ${section.offsetTop - 100}, нижней границей ${section.offsetTop + section.offsetHeight}`
		);
		if (scrollPosition >= section.offsetTop - 100 && scrollPosition < section.offsetTop + section.offsetHeight) {
		  currentSectionIndex = index;
		}
	  });
  
	  console.log('Текущий индекс секции:', currentSectionIndex);
  
	  // Сбрасываем все активные классы
	  menuLinks.forEach(link => link.classList.remove('active'));
  
	  // Подсвечиваем текущую активную ссылку
	  if (currentSectionIndex >= 0 && menuLinks[currentSectionIndex]) {
		console.log('Добавляем active к:', menuLinks[currentSectionIndex]);
		menuLinks[currentSectionIndex].classList.add('active');
	  }
	}
  
	/** При клике на ссылку */
	menuLinks.forEach(link => {
	  link.addEventListener('click', function (e) {
		e.preventDefault();
		const targetId = link.getAttribute('href').substring(1);
		const targetSection = document.getElementById(targetId);
  
		if (targetSection) {
		  console.log('Плавный скролл к:', targetId);
		  window.scrollTo({
			top: targetSection.offsetTop - 50,
			behavior: 'smooth',
		  });
		}
	  });
	});
  
	// Добавляем слушатель скролла
	window.addEventListener('scroll', highlightCurrentSection);
  
	// Повторяем подсветку при изменении размера экрана
	window.addEventListener('resize', highlightCurrentSection);
  
	// Запускаем подсветку при загрузке страницы
	highlightCurrentSection();
  });
  