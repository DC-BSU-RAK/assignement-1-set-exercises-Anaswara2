// jss for the petrol calculator
window.onload = () => {
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener('change', calculate)
    })
}

function calculate () {
    const Petrol_Price = document.querySelector('#Petrol_Price').value;
    const liters = document.querySelector('#liters').value;

    if (!Petrol_Price || !liters) return;

    document.querySelector('#totalAmount').innerText = Petrol_Price * liters;
}
