const input1 = document.querySelector("#input1");
const select1 = document.querySelector("#select1");
const result = document.querySelector("#result");
const input2 = document.querySelector("#input2");
const select2 = document.querySelector("#select2");


input1.addEventListener("keyup", async function () {
    const amount = parseFloat(input1.value);
    if (isNaN(amount) || amount <= 0) {
        return;
    }

    const baseCurrency = select1.value;
    const targetCurrency = select2.value;
    const apiUrl = `https://v6.exchangerate-api.com/v6/433ba6cfe969214ab6883c60/latest/${baseCurrency}`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const rate = data.conversion_rates[targetCurrency];
        if (rate) {
            const convertedAmount = (amount * rate).toFixed(2);
            input2.value = convertedAmount;
        } else {
            result.innerHTML = `<p style="color: red;">Conversion rate for ${targetCurrency} not available.</p>`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        result.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});