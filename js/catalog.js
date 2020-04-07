const breadCrumbNav = document.querySelector('.breadcrumb');
const breadCrumb = breadCrumbNav.querySelectorAll('.breadcrumb-item');
const itemCard = document.querySelector('.item-card'); 
const itemMain = document.querySelector('.selected__item');
const catalogMain = document.querySelector('.item-main');
const productWrapper = itemMain.querySelector('.product-wrapper');


// Обработчики событий

// Выбор категории в навигации
navLinks.addEventListener('click', evt => {
	const content = evt.target.textContent;
	if(evt.target.tagName === 'LI') {
		sectionName.style.display = 'block';
		catalogMain.style.display = 'flex';
		itemMain.style.display = 'none';

		loadCategoryItems(evt, navLinks, tyres);

		if(breadCrumbNav.children[2]) {
			breadCrumbNav.children[2].remove();
		}

	}

	const categoryName = evt.target.textContent;
		localStorage.setItem('selectedCategory', categoryName);
});

// // Пагинация при просмотре товаров
pagination.addEventListener('click', evt => {
	classActivePagination(evt, pagination);
	renderNewPageItems(evt, tyres);
})

// Выбор товара в каталоге
shopItems.addEventListener('click', ({target}) => {
	if(target.parentElement.classList.contains('not-available')) return;

	// Добавление новго раздела в хлебных крошках и добавления ссылки для предыдущего раздела
	const title = target.parentElement.children[3].textContent;
	for( let i = 1; i < breadCrumb.length; i++) {
		if (i === breadCrumb.length - 1) {
			const link = document.createElement('a');
			link.href = '/catalog.html';
			prevLink = breadCrumb[i].textContent;
			breadCrumb[i].textContent = '';
			link.textContent = prevLink;
			breadCrumb[i].append(link);
		}
		breadCrumb[i].classList.remove('active');
		breadCrumb[i].removeAttribute('aria-current');

	}

	const li = document.createElement('li');
	li.classList.add('breadcrumb-item', 'active');
	li.setAttribute('aria-current', 'page')
	li.textContent = title;
	breadCrumbNav.append(li);

	// Отключение и включение секций
	sectionName.style.display = 'none';
	catalogMain.style.display = 'none';

	sectionBuyWith.style.display = 'block';
	itemMain.style.display = 'flex';

	const article = target.parentElement.dataset.article;

	// Поиск по артикулу в массивы товара
	for(let i = 0; i < tyres.length; i++) {
		if (tyres[i].id === article) {
			productWrapper.innerText = '';
			getPreloader(productWrapper);
			setTimeout( () => {
				const product = renderProductPage(tyres[i]);
				removePreloader();
				productWrapper.insertAdjacentHTML('beforeend', product);	
			}, 800)
			
			return;
		}
	}

});

(function () {
	const title = localStorage.getItem('selectedCategory');
	main.style.display = 'block';
	sectionBuyWith.style.display = 'none';
	// Заполняем хлебные крошки
	breadCrumb[1].textContent = title;

	// Выводим название раздела
	sectionTitle.textContent = title; 

	for(let j = 0; j < navLinks.children.length; j++) {
		if(navLinks.children[j].textContent === title) {
			navLinks.children[j].classList.add('active');
		}
	}

	getPreloader(shopItems);

	serverLoadItems(tyres);

	renderPagination(tyres);
})();

