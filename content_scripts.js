const formatter = new Intl.NumberFormat("es-AR");
function init() {
  fetch("https://dolarapi.com/v1/dolares/blue").then(async (res) => {
    const data = await res.json();
    const valorDolar = data.venta;
    console.log("RES", data);
    const priceContainers = document.querySelectorAll(
      "div.andes-money-amount-combo__main-container"
    );
    const polyPriceContainers = document.querySelectorAll(
      "div.poly-price__current"
    );
    [...priceContainers, ...polyPriceContainers].forEach((element) => {
      const currencyElement = document.createElement("span");
      currencyElement.innerHTML = "U$D";
      currencyElement.className += "andes-money-amount__currency-symbol";
      const price = element.querySelector(
        "span.andes-money-amount__fraction"
      ).innerHTML;
      const preFormat = (
        Number(price.replaceAll(".", "").replaceAll(",", ".")) / valorDolar
      ).toFixed(2);
      const priceUSD = formatter.format(preFormat.toString());
      const newPriceElementSpan = document.createElement("span");
      newPriceElementSpan.innerHTML = priceUSD;
      newPriceElementSpan.className += "andes-money-amount__fraction";
      const container = document.createElement("span");
      container.className +=
        "andes-money-amount andes-money-amount--cents-superscript";
      container.appendChild(currencyElement);
      container.appendChild(newPriceElementSpan);
      element.appendChild(container);
    });
  });
}

setTimeout(() => {
  init();
}, 5000);
