const localeOptions = [
  {
    name: "Australia",
    path: "/au",
    image: "/img/Flag_of_Aus.png"
  },
  {
    name: "Canada",
    path: "/ca",
    image: "/img/Flag_of_Canada.svg.png"
  },
  {
    name: "Ghana",
    path: "/gh",
    image: "/img/Flag_of_Ghana.png"
  },
  {
    name: "Kenya",
    path: "/ke",
    image: "/img/Flag_of_Kenya.png"
  },
  {
    name: "Nigeria",
    path: "/ng",
    image: "/img/Flag_of_Nigeria.svg"
  },
  {
    name: "U.S.A",
    path: "/us",
    image: "/img/Flag_of_the_United_States.svg.png"
  },
  {
    name: "Great Britain",
    path: "/gb",
    image: "/img/Flag_of_the_United_Kingdom.svg.png"
  },
  {
    name: "China",
    path: "/cn",
    image: "/img/Flag_of_China.svg"
  },
  {
    name: "Singapore",
    path: "/sg",
    image: "/img/Flag_of_Singapore.svg"
  },
  {
    name: "Denmark",
    path: "/dk",
    image: "/img/Flag_of_Denmark.svg"
  },
  {
    name: "Germany",
    path: "/de",
    image: "/img/Flag_of_Germany.svg"
  },

]

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



let defaultLocale = localeOptions.find((c) => c.path == getRegionPrefix()) || localeOptions.find((c) => c.name == "Canada")


function updateDefaultLocale() {
  const country = defaultLocale;
  document.getElementById('default-country').innerHTML = `
    <img src="${country.image}" class="country-image" alt="${country.name}">
    <i class="fas fa-chevron-down nx-region-chevron"></i>
  `;
}

function renderLocaleOptions(){
  const ul = document.createElement("ul");

  localeOptions
  .filter((country) => country.name != defaultLocale.name)
  .forEach(country => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = country.path;

    const img = document.createElement("img");
    img.src = country.image;
    img.alt = country.name;

    a.appendChild(img);
    a.appendChild(document.createTextNode(country.name));

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