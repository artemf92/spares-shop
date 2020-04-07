// Выбора фильтра в поиске
filterList.addEventListener('click', evt =>	{
	if (evt.target.tagName !== 'LI') return;
	classActive(evt, filterList);

	const dataSearch = evt.target.dataset.search;

	for (let i = 0; i < formSearch.length; i++) {
		if (formSearch[i].classList.contains(dataSearch)) {
			formSearch[i].style.display = 'block';
		} else {
			formSearch[i].style.display = 'none';
		}
	}
});

// Выбор раздела из карточек категорий
shopCards.addEventListener('click', (evt) => {
	const link = evt.target.dataset.link;
	localStorage.setItem('selectedCategory', link)
})

// Выбора раздела в "Популярное"
popularList.addEventListener('click', evt => classActive(evt, popularList))

// Выбора раздела "С этим товаром покупают"
listBuyWith.addEventListener('click', evt => classActive(evt, listBuyWith));

// Выбор раздела в шапке
navLinks.addEventListener('click', evt => {
	if(evt.target.tagName === 'LI') {
		loadCategoryItems(evt, navLinks, tyres);
		
	}

	const categoryName = evt.target.textContent;
		localStorage.setItem('selectedCategory', categoryName);
});