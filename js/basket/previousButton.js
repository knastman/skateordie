const shippingPreviousButton = document.querySelector('.shippingPrevious');
const paymentPreviousButton = document.querySelector('.paymentPrevious');

const infoPage = document.getElementById('info');
const shippingPage = document.getElementById('shipping');
const paymentPage = document.getElementById('payment');

const headerInfo = document.querySelector('.headerInfo');
const headerShipping = document.querySelector('.headerShipping');
const headerPayment = document.querySelector('.headerPayment');

shippingPreviousButton.addEventListener('click', () => {
    infoPage.style.display = 'flex';
    shippingPage.style.display = 'none';

    headerInfo.style.backgroundColor = 'white';
    headerInfo.style.borderBottom = '0.5px solid black';
    headerShipping.style.backgroundColor = 'rgb(241, 241, 241)';
    headerShipping.style.border = 'none';
})

paymentPreviousButton.addEventListener('click', () => {
    shippingPage.style.display = 'flex';
    paymentPage.style.display = 'none';

    headerShipping.style.backgroundColor = 'white';
    headerShipping.style.borderBottom = '0.5px solid black';
    headerPayment.style.backgroundColor = 'rgb(241, 241, 241)';
    headerPayment.style.border = 'none';
})