const uploaderEl = document.querySelector('.uploader');
const ulExcursionEl = document.querySelector('.excursions');
const liExcursionEl = document.querySelector('.excursions__item--prototype');
const ulSummaryEl = document.querySelector('.panel__summary');
const liSummaryEl = document.querySelector('.summary__item--prototype');
const formExcursionEl = document.querySelector('.excursions');
const orderTotalPriceEl = document.querySelector('.order__total-price-value');
const formPanelOrderEl = document.querySelector('.panel__order');

// functions

function readFile (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const content = event.target.result;
        const excursionsList = content.split(/[\r\n]+/gm);
        excursionsList.forEach(function (item) {
            const newLiExcursionEl = createNewExcursionEl(item);
            ulExcursionEl.appendChild(newLiExcursionEl);
             
        });
    }

    reader.readAsText(file, 'UTF-8');
}

function createNewExcursionEl (item) {
    const excursionList = item.split(('","'));
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

// Event Listeners

uploaderEl.addEventListener('change', readFile);
