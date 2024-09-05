const infoContinueButton = document.getElementById('infoContinue');
const headerShipping = document.querySelector('.headerShipping');
const shipping = document.getElementById('shipping');
infoContinueButton.addEventListener('click', () => {
    const info = document.getElementById('info');
    const headerInfo = document.querySelector('.headerInfo');

    shipping.style.display = 'block';
    info.style.display = 'none';
    headerShipping.style.backgroundColor = 'white';
    headerShipping.style.borderBottom = '0.5px solid black';
    headerInfo.style.backgroundColor = 'rgb(241, 241, 241)';
    headerInfo.style.border = 'none';
})

const shippingContinueButton = document.getElementById('shippingContinue');
shippingContinueButton.addEventListener('click', () => {
    const headerPayment = document.querySelector('.headerPayment');
    const payment = document.getElementById('payment');

    payment.style.display = 'block';
    shipping.style.display = 'none';
    headerPayment.style.backgroundColor = 'white';
    headerPayment.style.borderBottom = '0.5px solid black';
    headerShipping.style.backgroundColor = 'rgb(241, 241, 241)';
    headerShipping.style.border = 'none';
})