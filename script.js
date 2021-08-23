'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//https://restcountries.eu/rest/v2/name/name

// https://geocode.xyz/52.508,13.381?geoit=json


// async function whereAmI () {
    
//         const res = await fetch(`https://restcountries.eu/rest/v2/name/pakistan`)
//         if(!res.ok) throw new Error(`${res.status}, plz try again later`)
//         const [data] = await res.json();
//         const [neighbour] = data.borders;
//         console.log(neighbour);
//         const html = `
//         <article class="country">
//           <img class="country__img" src="${neighbour.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${neighbour.name}</h3>
//             <h4 class="country__region">${neighbour.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +neighbour.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${neighbour.languages[1].name}</p>
//             <p class="country__row"><span>💰</span>${neighbour.currencies[0].name}</p>
//           </div>
//         </article>
//         `;
//           countriesContainer.insertAdjacentHTML('beforeend', html);
//           countriesContainer.style.opacity = 1;
//     }

// btn.addEventListener('click', whereAmI)


function getCountry(country, status) {
    const html = `
    <article class="country">
    ${status === undefined ? '' : status }
    <img class="country__img" src="${country.flag}" />
    <div class="country__data">
      <h3 class="country__name">${country.name}</h3>
      <h4 class="country__region">${country.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +country.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

async function whereAmI (country) {
    
        const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`)
        if(!res.ok) throw new Error(`${res.status}, plz try again later`)
        const [data] = await res.json();
        getCountry(data);

        const [neighbour] = data.borders;
        console.log(neighbour);

        const resNei = await fetch(`https://restcountries.eu/rest/v2/name/${neighbour}`)
        if(!resNei.ok) throw new Error(`${resNei.status}, plz try again later`)
        const [dataNei] = await resNei.json();
        console.log(dataNei);
        getCountry(dataNei, 'Neighbour')
      
    }

btn.addEventListener('click', () => {
    const country = prompt('Enter coutry name and get its neighbour info');
    whereAmI(country)
})