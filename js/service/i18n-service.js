var gTrans = {
    title: {
        en: "emili's book shop",
        he: 'חנות הספרים של אמילי',
    },

    'add-book': {
        en: 'add a new book',
        he: 'הוסף ספר חדש',
    },
    'title-id': {
        en: 'id',
        he: 'קוד',
    },
    'title-name': {
        en: 'name',
        he: 'שם',
    },
    'title-price': {
        en: 'price',
        he: 'מחיר',
    },
    'title-actions': {
        en: 'actions',
        he: 'פעולות',
    },
    'btn-read': {
        en: 'read',
        he: 'קרא',
    },
    'btn-update': {
        en: 'update',
        he: 'עדכן',
    },
    'btn-delete': {
        en: 'delete',
        he: 'מחק',
    },
    'btn-prev': {
        en: 'prev',
        he: 'הקודם',
    },
    'btn-next': {
        en: 'next',
        he: 'הבא',
    },
    'label-book-name': {
        en: 'book name',
        he: 'שם הספר',
    },
    'label-book-price': {
        en: 'book price',
        he: 'מחיר הספר',
    },
    'btn-submit-book': {
        en: 'add book',
        he: 'הוסף ספר',
    },
    'label-new-price': {
        en: 'new price',
        he: 'מחיר חדש',
    },
    'btn-submit-price': {
        en: 'submit new price',
        he: 'שלח מחיר חדש',
    },
    rate: {
        en: 'rate',
        he: 'דרג',
    },
    'placeholder-book-name':{
        en:'book name here',
        he:'שם הספר כאן'
    },
    'placeholder-book-price':{
        en:'price',
        he:'מחיר'
    },
    'placeholder-new-price':{
        en:'new price here',
        he:'מחיר'
    }
};

function changeLang(lang){
    gLang = lang;
}

function getLang(){
    return gLang;
}

function doTrans(){
    var elsTrans = document.querySelectorAll('[data-trans');
    elsTrans.forEach(function(el){
        var elKey = el.dataset.trans;
        var txt = getTrans(elKey);

        if(el.nodeName === 'INPUT')  el.setAttribute('placeholder', txt);
        else el.innerText = txt;
    })
}

function getTrans(transKey){
    var txtObj = gTrans[transKey];
    if(!txtObj) return 'UNKNOWN';
    var txt = txtObj[gLang];
    if(!txt) txt = txtObj.en;
    return txt;
}

function convertDollarShekel(){
    var elPriceCells = document.querySelectorAll('.price-cell');
    elPriceCells.forEach(function(priceCell){
        var price = priceCell.dataset.priceDollars;
        if (gLang==='he') priceCell.innerText= new Intl.NumberFormat('he-IL',{style:'currency',currency:'ILS'}).format(price*3.3); 
        else priceCell.innerText= new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(price);
    })
}