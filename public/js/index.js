
console.log("index")
const countries = [
  {
    code: 'GBP',
    currency: 'Pound',
    name: 'GBP - United Kingdom',
    image: 'img/Flag_of_the_United_Kingdom.svg.png',
    path: "gb"
  },
  {
    code: 'NGN',
    currency: 'Naira',
    name: 'NGN - Nigeria',
    image: 'img/Flag_of_Nigeria.png',
    path:  "ng"
  },
  {
    code: 'USD',
    currency: 'Dollar',
    name: 'USD - United States',
    image: 'img/Flag_of_the_United_States.svg.png',
     path: "us"
  },
  {
    code: 'EUR',
    currency: 'Euro',
    name: 'EUR - European Union',
    image: 'https://cdn.britannica.com/66/96866-050-BBAE91CE/Flag-European-Union.jpg',
    path: "eu"
  },
  {
    code: 'CAD',
    currency: 'Dollar',
    name: 'Canadian Dollar',
    image: 'img/Flag_of_Canada.svg.png',
     path: "ca"
  },
  {
    code: 'AUS',
    currency: 'Dollar',
    name: 'Australian Dollar',
    image: 'img/Flag_of_Aus.png',
     path: "au"
  },
]



var exchangeRates = {
  // GBP_NGN: 940,
  // GBP_USD: 1.3,
  // GBP_EUR: 1.15,
  // GBP_JPY: 170,
  // GBP_CAD: 1.7,
  // NGN_GBP: 0.0011,
  // NGN_USD: 0.0013,
  // NGN_EUR: 0.00125,
  // NGN_JPY: 0.15,
  // NGN_CAD: 0.0014,
  // USD_NGN: 750,
  // USD_EUR: 0.88,
  // USD_GBP: 0.77,
  // USD_JPY: 130,
  // USD_CAD: 1.2,
  // EUR_NGN: 800,
  // EUR_USD: 1.14,
  // EUR_GBP: 0.87,
  // EUR_JPY: 150,
  // EUR_CAD: 1.5,
  // JPY_NGN: 6.67,
  // JPY_USD: 0.0077,
  // JPY_EUR: 0.0067,
  // JPY_GBP: 0.0059,
  // JPY_CAD: 0.0091,
  // CAD_NGN: 700,
  // CAD_USD: 0.83,
  // CAD_EUR: 0.67,
  // CAD_GBP: 0.59,
  // CAD_JPY: 110,
};

function getRegionPrefix() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const region = parts.length > 0 ? parts[0] : null;

    if (region && region.length <= 3) {
      return `${region}`;
    }
    return "";
  }



function getReceivingCurrency(sendingCurrency){
  let code = "NGN"
  if(sendingCurrency.code === 'NGN'){
    code = "CAD"
  }
 
  return  countries.find((c) => c.code == code)
}


console.log("defaultPrefiz", getRegionPrefix())

const defaultCountry= countries.find((c) => c.path == getRegionPrefix()) || countries.find((c) => c.code == "CAD")

let selectedCountrySend = countries.find((c) => c.code === defaultCountry.code);
let selectedCountryReceive = getReceivingCurrency(selectedCountrySend);


console.log("defaultLocale", defaultCountry)

// Function to swap send and receive currencies
function swapCountries() {
  const temp = selectedCountrySend;
  selectedCountrySend = selectedCountryReceive;
  selectedCountryReceive = temp;

  updateSelectedCountryDisplay();
  updateExchangeRate();

  renderCountryOptions(
    'country-options-send',
    selectedCountrySend,
    selectedCountryReceive
  );
  renderCountryOptions(
    'country-options-receive',
    selectedCountryReceive,
    selectedCountrySend
  );
}

function updateSelectedCountryDisplay() {
  document.getElementById('country-box-send').innerHTML = `
    <img src="${selectedCountrySend.image}" class="country-image" alt="${selectedCountrySend.name}"> 
    <span class='selected-country-code'>${selectedCountrySend.code}</span>
  `;
  document.getElementById('country-box-receive').innerHTML = `
    <img src="${selectedCountryReceive.image}" class="country-image" alt="${selectedCountryReceive.name}"> 
   <span class='selected-country-code'> ${selectedCountryReceive.code}</span>
  `;
}


function renderCountryOptions(dropdownId, selectedCountry, excludedCountry) {
  const optionsContainer = document.getElementById(dropdownId);
  optionsContainer.innerHTML = '';

  countries
    .filter(
      (country) =>
        country.code !== selectedCountry.code &&
        country.code !== excludedCountry.code
    )
    .forEach((country) => {
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('option');
      optionDiv.innerHTML = `
        <img src="${country.image}" class="country-image" alt="${country.name}">
        <span class='mil-text-m'>${country.name}</span>
      `;
      optionDiv.onclick = () => selectCountry(dropdownId, country);
      optionsContainer.appendChild(optionDiv);
    });
}

function selectCountry(dropdownId, country) {
  if (dropdownId === 'country-options-send') {
    selectedCountrySend = country;
  } else {
    selectedCountryReceive = country;
  }
  updateSelectedCountryDisplay();
  updateExchangeRate();
  renderCountryOptions(
    'country-options-send',
    selectedCountrySend,
    selectedCountryReceive
  );
  renderCountryOptions(
    'country-options-receive',
    selectedCountryReceive,
    selectedCountrySend
  );
}

function updateExchangeRate() {
  const rateKey = `${selectedCountrySend.code}_${selectedCountryReceive.code}`;
  const rate = exchangeRates[rateKey] || 1;
  const sendInput = document.querySelector('.money-to-convert');
  const sendAmount = parseFloat(sendInput.value) || 0;

  if (sendAmount === 0) {
    setTimeout(() => {
      if (!sendInput.value || parseFloat(sendInput.value) === 0) {
        sendInput.value = '1';
        updateExchangeRate();
      }
    }, 2000);
  } else {
    const receiveAmount = sendAmount * rate;
    document.querySelector('.rate-change-input').innerHTML =
      receiveAmount.toFixed(2);
  }
}

document
  .querySelector('.money-to-convert')
  .addEventListener('input', updateExchangeRate);

document.addEventListener('DOMContentLoaded', function () {
  getExchangeRates();

  const sendDropdown = document.querySelector('.dropdown-send');
  const receiveDropdown = document.querySelector('.dropdown-receive');
  const swapButton = document.querySelector('.arrow-swap'); // Swap button element

  sendDropdown.addEventListener('click', function (event) {
    this.classList.toggle('active');
    receiveDropdown.classList.remove('active');
    event.stopPropagation();
  });

  receiveDropdown.addEventListener('click', function (event) {
    this.classList.toggle('active');
    sendDropdown.classList.remove('active');
    event.stopPropagation();
  });

  // Swap button click event
  swapButton.addEventListener('click', swapCountries);

  document.addEventListener('click', function (e) {
    if (!sendDropdown.contains(e.target)) sendDropdown.classList.remove('active');
    if (!receiveDropdown.contains(e.target))
      receiveDropdown.classList.remove('active');
  });

  updateSelectedCountryDisplay();
  renderCountryOptions(
    'country-options-send',
    selectedCountrySend,
    selectedCountryReceive
  );
  renderCountryOptions(
    'country-options-receive',
    selectedCountryReceive,
    selectedCountrySend
  );
});

async function getExchangeRates() {
  const url = "https://staging.ntradex.ca/api/v1/exchange-rates";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching exchange rates: ${response.status}`);
    }

    const responseData = await response.json();
    exchangeRates = {};

    // Loop through the data array
    responseData.data.forEach(item => {
      const { main_currency, other_currency, rate } = item;
      const key = `${other_currency}_${main_currency}`;

      exchangeRates[key] = parseFloat(rate);
    });

    return exchangeRates;
  } catch (error) {
    console.error('Error:', error);
  }
}

