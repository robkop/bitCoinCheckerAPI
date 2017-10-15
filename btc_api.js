window.onload = function () {
    getBTC()
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

        }
    };



};
document.getElementById('refreshBTN').addEventListener('click', function () {
    getBTC();
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
});