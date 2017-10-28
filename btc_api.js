let values = [];
let symbols = [];
window.onload = function () {

    getBTC();
    getETH();
    shittyButtonInfo();
};



function getBTC() {
    const req = new XMLHttpRequest();
    req.open('GET', 'https://blockchain.info/pl/ticker');
    req.send();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var x = JSON.parse(req.responseText);
            document.getElementById('descWARN').style.display = 'none';
            document.getElementById('descSUCCESS').style.display = 'block';
            document.getElementById('PLN').innerHTML = '1 BTC = ' + x.PLN.last + ' ' + x.PLN.symbol;
            document.getElementById('USD').innerHTML = '1 BTC = ' + x.USD.last + ' ' + x.USD.symbol;
            document.getElementById('EUR').innerHTML = '1 BTC = ' + x.EUR.last + ' ' + x.EUR.symbol;
            document.getElementById('GBP').innerHTML = '1 BTC = ' + x.GBP.last + ' ' + x.GBP.symbol;

            values[0] = x.PLN.last;
            values[1] = x.USD.last;
            values[2] = x.EUR.last;
            values[3] = x.GBP.last;
            symbols[0] = x.PLN.symbol;
            symbols[1] = x.USD.symbol;
            symbols[2] = x.EUR.symbol;
            symbols[3] = x.GBP.symbol;
            myMyBTCvalue();
            const y = new Date();
            const d = y.toLocaleDateString();
            if (y.getHours() < 10) {
                var hours = '0' + y.getHours();
            } else {
                var hours = y.getHours();
            }
            if (y.getMinutes() < 10) {
                var minutes = '0' + y.getMinutes();
            } else {
                var minutes = y.getMinutes();
            }
            document.getElementById('descSUCCESS').innerText = 'Last rate update: ' + y.toLocaleDateString() +
                ' ' + hours + ':' + minutes;
        } else {
            document.getElementById('descWARN').innerHTML = 'No conection to API. Sorry, try again later.'
            document.getElementById('descSUCCESS').innerText = 'not updated';
        }
    };

};
document.getElementById('refreshBTN').addEventListener('click', function () {
    getBTC();
    getETH();
});




document.getElementById('shittyButton').addEventListener('click', function () {
    this.style.display = 'none';
    localStorage.setItem('shittyButtonClicked', 'yes');
});

function shittyButtonInfo() {
    if (localStorage.getItem('shittyButtonClicked') === 'yes') {
        document.getElementById('shittyButton').style.display = 'none';
    }
}
setInterval(function () {
    getBTC();
    getETH();
    myMyBTCvalue();
}, 60000);

function getETH() {
    const req = new XMLHttpRequest();
    req.open('GET', 'https://etherchain.org/api/statistics/price');
    req.send();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var x = JSON.parse(req.responseText);
            document.getElementById('getETH').innerHTML = `1 ETH = ${x.data[x.data.length - 1].usd} $`;
        } else {
            document.getElementById('getETH').innerHTML = `etherchain.org does not work`;
        }
    };
}

function hideOrNieHide(a) {
    const u = document.getElementsByClassName('myw');
    let i = 0;
    for (i = 0; i < u.length; i++) {
        u[i].style.display = a;
    }
}

function myMyBTCvalue() {
    const y = localStorage.getItem('btc');
    if (y === null || y === undefined) {
        hideOrNieHide('none');
    } else if (y == 0) {
        hideOrNieHide('none');
    } else {
        hideOrNieHide('block');
        const x = localStorage.getItem('btc');
        const myPLN = x * values[0];
        const myUSD = x * values[1];
        const myEUR = x * values[2];
        const myGBP = x * values[3];

        document.getElementById('myPLN').innerHTML = `${x} BTC = ${myPLN.toFixed(2)} ${symbols[0]}`;
        document.getElementById('myUSD').innerHTML = `${x} BTC = ${myUSD.toFixed(2)} ${symbols[1]}`;
        document.getElementById('myEUR').innerHTML = `${x} BTC = ${myEUR.toFixed(2)} ${symbols[2]}`;
        document.getElementById('myGBP').innerHTML = `${x} BTC = ${myGBP.toFixed(2)} ${symbols[3]}`;
    }


}
document.getElementById('saveMyBTCvalue').addEventListener('click', saveMyValue);

function saveMyValue() {
    const x = document.getElementById('myBTCvalue').value;
    localStorage.setItem('btc', x);
    myMyBTCvalue()
}