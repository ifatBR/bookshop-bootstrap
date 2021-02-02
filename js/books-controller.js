'use strict';

function onInit() {
    renderBooks();
    renderPagination();
}

function renderBooks() {
    var books = getBooks();
    var lang = getLang();
    var strHtml = books.map(function (book) {
            return `
        <tr> 
            <td class="row-start id-cell ">${book.id}</td>
            <td class="name-cell text-capitalize ">${book.name}</td>
            <td class="price-cell " data-price-dollars="${book.price}"></td>
            <td class="d-flex flex-wrap justify-content-around action"><button class="btn text-capitalize btn-info my-1" data-trans="btn-read" onclick="onReadBook('${book.id}')" data-toggle="modal" data-target="#read-book">Read</button>
            <button class="btn text-capitalize btn-info my-1" data-trans="btn-update" onclick="onUpdateBook('${book.id}')" data-toggle="modal" data-target="#update-price">Update</button>
            <button class="btn btn-info text-capitalize my-1"  data-trans="btn-delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>

        </tr>`;
        })
        .join('');

    document.querySelector('.books-list').innerHTML = strHtml;
    doTrans();
    convertDollarShekel();

}


function renderModal(elModal) {
    var currBook = getCurrBook();
    elModal.querySelector('.book-name').innerText = currBook.name;
    elModal.querySelector('.book-cover').src = currBook.imgUrl;
    elModal.querySelector('.book-description').innerText = currBook.description;
    elModal.querySelector('div.rate.num').innerText = currBook.rate;
    doTrans();
    convertDollarShekel();
}

function renderPagination(){
    var pagesCount = getPagesCount();
    var currIdx =  getCurrIdx();
    var startIdx = currIdx;

    if(pagesCount-startIdx <3) startIdx = pagesCount-3;
    var elPaginationUl = document.querySelector('.pagination ul');
    // var strHtml = `<li><button class="end-button prev" data-trans="btn-prev" onclick="onChangePage(-1)">Prev</button></li>`
    var strHtml = `<li><a class="nav-link active prev text-light font-weight-bold" data-trans="btn-prev" onclick="onChangePage(-1)">Prev</a></li>`
    for(var i=startIdx; i<startIdx+3; i++){
        var numEphasize= (i===currIdx)? 'text-warning font-weight-bold': 'text-light';
        strHtml+=`<li><a class="nav-link active page-num ${numEphasize}" onclick="onGoToPage(${(i)})">${(i+1)}</a></li>`
    }
    strHtml += `<li><a class="nav-link active next text-light font-weight-bold" data-trans="btn-next" onclick="onChangePage(1)">Next</a></li>`
    elPaginationUl.innerHTML = strHtml;
    doTrans();
}



function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
    renderPagination();
}

function onAddBook() {
    var elBookDetails = document.querySelector('.new-book.modal');
    elBookDetails.classList.remove('hide');
    renderPagination();

}

function onSubmitBook(ev){
    ev.preventDefault();

    var elBookName = document.querySelector('input[name=book-name]');
    var elBookPrice = document.querySelector('input[name=book-price]');
    var bookName = elBookName.value;
    var bookPrice = elBookPrice.value;
    addBook(bookName, bookPrice);
    
    elBookName.value = '';
    elBookPrice.value = '';
    renderBooks();
}

function onUpdateBook(bookId) {
    setCurrBookById(bookId);
}

function onSubmitNewPrice(ev,elForm){
    ev.preventDefault();
    elForm.classList.add('hide');

    var elPriceInput = elForm.querySelector('input');
    var newPrice = elPriceInput.value;
    var bookId = getCurrBook().id;
    updateBook(bookId, newPrice);

    elPriceInput.value = '';
    renderBooks();
}

function onHideModal(className) {
    var elModal = document.querySelector(`${className}.modal`);
    elModal.classList.add('hide');
}

function onReadBook(bookId) {
    setCurrBookById(bookId);
    var elBookDetails = document.querySelector('#read-book');
    // elBookDetails.classList.remove('hide');
    renderModal(elBookDetails);
}

function onChangeRate(rateDiff) {
    changeRate(rateDiff);
    var bookId = getCurrBook().id;
    onReadBook(bookId);
}

function onChangePage(pageDiff){
    changePage(pageDiff);
    renderBooks();
    renderPagination();
}

function onGoToPage(pageIdx){
    updatePageIdx(pageIdx);
    renderBooks();
    renderPagination();

}

function onSortBooks(sortBy){
    setSortBy(sortBy);
    renderBooks();
}

function onChangeLang(lang){
    changeLang(lang);
    if(lang==='he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    renderBooks();
}