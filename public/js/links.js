function getRegionPrefix() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const region = parts.length > 0 ? parts[0] : null;

    if (region && region.length <= 3) {
      return `/${region}`;
    }
    return "";
  }

const prefix = getRegionPrefix();

 
document.querySelectorAll("a[data-path]").forEach(link => {
    const path = link.getAttribute("data-path");
    link.setAttribute("href", prefix + path);
});

const localeOptions = [
  {
    name: "Australia",
    path: "/au",
    image: "img/Flag_of_Australia.png"
    
  },
    {
    name: "Canada",
    path: "/",
    image: "img/Flag_of_Canada.svg.png"
  },
]

let defaultLocale = localeOptions.find((c) => c.path == getRegionPrefix()) || localeOptions.find((c) => c.name == "Canada")

function updateDefaultLocale() {
  const country = defaultLocale;
  document.getElementById('default-country').innerHTML = `
    <img src="${country.image}" class="country-image" alt="${country.name}"> 
  `;
}

function renderLocaleOptions(){
  const ul = document.createElement("ul");
  
  localeOptions
  .filter((country)=>country.name != defaultLocale.name)
  .forEach(country => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = country.path;
    a.textContent = country.name;

    li.appendChild(a);
    ul.appendChild(li);
  });
  
  const target = document.getElementById("default-country");
  target.insertAdjacentElement("afterend", ul);
}


document.addEventListener('DOMContentLoaded', function () {
  
  updateDefaultLocale();
  renderLocaleOptions();

 
});