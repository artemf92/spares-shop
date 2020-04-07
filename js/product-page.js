function renderProductPage({ 
	name,
	favorites,
	price,
	season,
	bigUrl,
	sale,
	id,
	available,
	manufacturer,
	diameter,
	speedIndex,
	series
}) {
	const creditPrice = Math.round(price / 24);

	let newPrice = price.split('');
	let addPrice = newPrice.splice(newPrice.length - 3, 0, ' ');

	return `
	<div class="selected__item--preview">
		<div class="item--left-top">
			<span class="selected__item--sale" style="display: ${(sale !== null) ? 'block':'none'}">Sale</span>
			<span class="selected__item--gift">+ подарок</span>
			<span class="selected__item--creditType">0/0/24</span>
			<span class="selected__item--creditCalc">${creditPrice}₽ в месяц</span>
		</div>
		<div class="item--right-top">
				<i class="favorites-icon"><img src="img/${season}.svg" alt=""></i>
		</div>
		<img src="${bigUrl}" alt="" class="selected__item--picture">
		<span class="selected__item--oldPrice old-price">${Math.round((price * 100)/85)}₽</span>
		<span class="selected__item--newPrice new-price">${newPrice.join('')}₽</span>
		<button class="zhlob-btn">Нашли дешевле? Снизим цену!</button>
	</div>

	<div class="selected__item--card">
		<h2 class="selected__item--title">${name}</h2>
		<span class="article--item">Код товара: ${id}</span>
		<div class="ratings">
			<i class="favorite-icon"><img src="img/${favorites = 'favorites'}.svg" alt=""></i>
			<i class="favorite-icon"><img src="img/rating.svg" alt=""></i>
			<i class="favorite-icon"><img src="img/stars.png" alt=""></i>	
		</div>
		<h3 class="parameters">Характеристики</h3>
		<table class='parameters--table'>
			<tr class='parameters--table-row'>
				<td class="parameters--table-cell">Производитель</td>
				<td class="parameters--table-cell">${manufacturer}</td>
			</tr>
			<tr class='parameters--table-row'>
				<td class="parameters--table-cell">Диаметр</td>
				<td class="parameters--table-cell">${diameter}</td>
			</tr>
			<tr class='parameters--table-row'>
				<td class="parameters--table-cell">Сезон</td>
				<td class="parameters--table-cell">Всесезонная</td>
			</tr>
			<tr class='parameters--table-row'>
				<td class="parameters--table-cell">Индекс скорости нагрузки</td>
				<td class="parameters--table-cell">${speedIndex}</td>
			</tr>
			<tr class='parameters--table-row'>
				<td class="parameters--table-cell">Серия</td>
				<td class="parameters--table-cell">${series}</td>
			</tr>
		</table>
		<span class="show-more">показать еще</span>
		<button class="product--buy">Купить шину</button>
	</div>	
`
}