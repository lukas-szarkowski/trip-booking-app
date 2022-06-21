const uploaderEl = document.querySelector('.uploader');
const ulExcursionEl = document.querySelector('.excursions');
const liExcursionEl = document.querySelector('.excursions__item--prototype');
const ulSummaryEl = document.querySelector('.panel__summary');
const liSummaryEl = document.querySelector('.summary__item--prototype');
const formExcursionEl = document.querySelector('.excursions');
const orderTotalPriceEl = document.querySelector('.order__total-price-value');
const formPanelOrderEl = document.querySelector('.panel__order');

// functions

function readFile(e) {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.onload = function (event) {
		const content = event.target.result;
		const excursionsList = content.split(/[\r\n]+/gm);
		excursionsList.forEach(function (item) {
			const newLiExcursionEl = createNewExcursionEl(item);
			ulExcursionEl.appendChild(newLiExcursionEl);
		});
	};

	reader.readAsText(file, 'UTF-8');
}

function createNewExcursionEl(item) {
	const excursionList = item.split('","');
	const newLiExcursionEl = liExcursionEl.cloneNode(true);
	liExcursionEl.classList.remove('excursions__item--prototype');
	const title = newLiExcursionEl.querySelector('h2');
	const pEl = newLiExcursionEl.querySelector('p');
	const prices = newLiExcursionEl.querySelectorAll('.excursions__price');
	title.innerText = excursionList[1];
	pEl.innerText = excursionList[2];
	prices[0].innerText = excursionList[3];
	prices[1].innerText = excursionList[4].replace(/\"/g, '');
	return newLiExcursionEl;
}

function addExcursion(e) {
	e.preventDefault();
	const [tripTitle, numberOfAdults, priceAdult, numberOfChildren, priceChild] = getExcursion(e.target);
	if (checkData(numberOfAdults, numberOfChildren)) {
		const chosenExcursion = ulSummaryEl.querySelectorAll('.summary__name');
		chosenExcursion.forEach(function (item) {
			if (item.innerText === tripTitle) {
				const currentLiEl = item.parentElement.parentElement;
				ulSummaryEl.removeChild(currentLiEl);
			}
		});
	}
}

function getExcursion(item) {
	const priceElList = item.querySelectorAll('.excursions__price');
	const priceAdult = Number(priceElList[0].innerText);
	const priceChild = Number(priceElList[1].innerText);
	const numberOfAdults = Number(item.elements.adults.value);
	const numberOfChildren = Number(item.elements.children.value);
	const tripTitle = item.previousElementSibling.querySelector('h2').innerText;
	return [tripTitle, numberOfAdults, priceAdult, numberOfChildren, priceChild];
}

function checkData(num1, num2) {
	const errors = [];
	if (Number.isNaN(num1) || Number.isNaN(num2) || num1 < 0 || num2 < 0) {
		errors.push('Podano  blędną liczbę uczestników');
	} else if (num1 === 0 && num2 === 0) {
		errors.push('Podaj prawidłowoą liczbę uczestników');
	}
	if (errors.length > 0) {
		showErrors(errors);
	}
	return errors.length > 0 ? false : true;
}

function showErrors(err) {
	let text = ``;
	err.forEach(function (item) {
		text += `${item} \n`;
	});
	alert(`${text}`);
}

// Event Listeners

uploaderEl.addEventListener('change', readFile);
