async function getPrices() {
    document.getElementById("eth").innerHTML = "Loading...";
    document.getElementById("btc").innerHTML = "Loading...";

    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd&include_24hr_change=true");
    const data = await res.json();

    show("eth", "Ethereum", data.ethereum.usd, data.ethereum.usd_24h_change);
    show("btc", "Bitcoin", data.bitcoin.usd, data.bitcoin.usd_24h_change);
}

function show(id, name, price, change) {
    let arrow = change > 0 ? "⬆️" : "⬇️";
    let color = change > 0 ? "green" : "red";

    document.getElementById(id).innerHTML = `
        <h2>${name}</h2>
        <p>$${price}</p>
        <p style="color:${color}">${arrow} ${change.toFixed(2)}%</p>
    `;
}

document.getElementById("refresh").onclick = getPrices;
document.getElementById("eth").innerHTML = "⏳ Loading...";
document.getElementById("btc").innerHTML = "⏳ Loading...";

getPrices();