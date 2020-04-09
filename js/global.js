const navLinks = document.querySelector('.nav-links');
const filterList = document.querySelector('.filter-list');
const popularList = document.querySelector('.popularity-nav');
const listBuyWith = document.querySelector('.buy__with .container .popularity-nav');
const hamburger = document.querySelector('.hamburger-menu');
const main = document.querySelector('main');
const mainShop = document.querySelector('.shop');
const sectionTitle = document.querySelector('.section-title');
const sectionName = document.querySelector('.section-name');
const shopItems = document.querySelector('.items-wrapper');
const pagination = document.querySelector('.pagination');
const next = document.getElementById('next-page');
const prev = document.getElementById('prev-page');
const searchFilter = document.forms['global-filter'];
const formSearch = document.querySelectorAll('.search-form');
const shopCards = document.querySelector('.shop-wrapper');
const sectionBuyWith = document.querySelector('.buy__with');

// for (let i = 0; i < formSearch.length; i++) {
// 	console.dir(formSearch[i])
// }
// console.log(formSearch[0])

const mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 10,
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
     breakpoints: {
         640: {
           slidesPerView: 2,
           spaceBetween: 40
         },
         1200: {
         	slidesPerView: 4,
         	spaceBetween: 10
         }
     }
});


////
// Функции
////

function classActive(evt, list) {
	if (evt) {
		evt.preventDefault();	
	}
	
	const item = evt.target;

	for (let i = 0; i < list.children.length; i++) {
		if (list.children[i].classList[1] === 'active') {
			list.children[i].classList.remove('active');
		}
	}
	item.classList.toggle('active');
}


// Функция добавления класса activate блоку пагинации
function classActivePagination(evt, list) {
	if (evt) {
		evt.preventDefault();
	}

	const item = evt.target;
	const lastPage = pagination.children.length - 2 + '';
	for (let i = 0; i < list.children.length; i++) {
		if (list.children[i].firstElementChild.classList[1] === 'activate') {
			list.children[i].firstElementChild.classList.remove('activate');
		}
	}

	item.classList.toggle('activate');
}

function clearMain() {
	main.style.display = 'none';
}

// Очистка списка страниц при переключении разделов
function clearPagination(evt) {
	const pages = pagination.children.length;
	const li = pagination.children;

	// for (let i = 0; i < pages - 1; i++) {
	// 	pagination.children[1].remove();
	// }

	pagination.innerHTML = '';
}

// Очистка списка товаров, при переключении разделов
function clearShopItems() {
	shopItems.innerHTML = '';
}


function renderShop(section) {
	mainShop.style.display = 'block';
	sectionBuyWith.style.display = 'none';
	// Заполняем хлебные крошки
	breadCrumb[1].textContent = section;

	// Выводим название раздела
	sectionTitle.textContent = section; 
}

// Создание карточки товара
function createCard({name, favorites, price, season, imgUrl, sale, id, available}) {
	let newPrice = price.split('');
	let addPrice = newPrice.splice(newPrice.length - 3, 0, ' ');

	return `
	<div class="item-card filtered ${(available !== null)?'':'not-available'}" data-article="${id}">
		<span class="pop-sale" style='display: ${(sale)?'block':'none'}'>Sale</span>
		<div class="right-top">
			<i class="favorites-icon"><img src="img/${favorites = 'favorites'}.svg" alt=""></i>
			<i class="favorites-icon"style='display: ${(season) ? 'inline' : 'none'}'><img src="img/${season}.svg" alt=""></i>
		</div>
		<img src="${imgUrl}" alt="" class="item-picture">
		<h4>${name}</h4>
		<span class="item-price">${(available !== null)?newPrice.join('') + ' ₽':'нет в наличии'}</span>
		<span class="get-msg" style='display : ${(available === null) ? 'block':'none'}'>Сообщить о поступлении</span>
	</div>
	`
}

// Рендеринг пагинации в разделе товаров
function renderPagination(category) {
	const fragment = document.createDocumentFragment();
	const pages = (category.length % 12 === 0) ? category.length / 12 : Math.floor(category.length / 12) + 1;

	for (let i = 1; i <= pages; i++) {
		const li = document.createElement('li');
		const a = document.createElement('a');
		li.classList.add('page-item');
		a.classList.add('page-link');
		a.setAttribute('href', '#');

		a.textContent = i;
		(i === 1) ? a.classList.add('activate') : '';

		li.append(a);
		fragment.appendChild(li);
	}

	pagination.append(fragment);
	
}

// Установка прелоадера
function getPreloader(section) {
	const preloader = `
	<div class="spinner-grow" role="status">
	  <span class="sr-only">Loading...</span>
	</div>
	`;

	section.insertAdjacentHTML('beforeend', preloader);
}

// Удаление прелоадера
function removePreloader() {
	const preloader = document.querySelector('.spinner-grow');
	preloader.remove();
}

// Вывод каталога товаров с задержкой(имитация подгрузки с сервера)
function serverLoadItems(category) {
	setTimeout( () => {
		shopItems.innerText = '';
		for (let i = 1; i <= 12; i++) {
			const item = createCard(category[i-1]);
			shopItems.insertAdjacentHTML('beforeend', item);
		}
	}, 1000)
}

// Функция рендеринга списка товаров, выбранной категории
function loadCategoryItems(evt, element, category) {
	const content = evt.target.textContent;

	classActive(evt, navLinks);
	clearMain();
	clearShopItems();
	renderShop(content);

	getPreloader(shopItems);
	serverLoadItems(category);

	clearPagination();
	renderPagination(category);
}

// Переход на другую страницу товаров(пагинация)
function renderNewPageItems(evt, categories) {
	let pageNum = evt.target.textContent;
	shopItems.innerHTML = '';

	for (let i = (12 * pageNum - 11); i <= (pageNum * 12) && i < tyres.length; i++) {
		const item = createCard(categories[i-1]);
		shopItems.insertAdjacentHTML('beforeend', item);
	} 


}

/////
// Обработчики событий
/////



// 
// searchFilter.addEventListener('submit', evt => {
// 	evt.preventDefault();
// 	console.dir(evt.target.action)
// })


// console.log(link)
