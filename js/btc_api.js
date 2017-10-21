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
    getETH();;
});

function resolveBTC() {
    const fiatValue = document.getElementById('fiatGet').value;
    const currency = document.getElementById('formSlect').value;
    const url = 'https://blockchain.info/tobtc?currency=' + currency + '&value=' + fiatValue;
    const xp = new XMLHttpRequest();
    xp.open('GET', url);
    xp.send();
    xp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cp = xp.responseText;
            document.getElementById('resultInBTC').value = cp;
        };
    };
};
document.getElementById('btcCheckFunc').addEventListener('click', function () {
    resolveBTC();
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
    getETH()
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