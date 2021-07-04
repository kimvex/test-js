/*
  Este solo fue una prueba para ejecutar con promesas y usar la recursividad
  en ella. El resultado no se agrega de forma en que van llegando pues 
  pero si se ejecutan de forma paralela.

  El código principal para ejecutar con los datos que se pidió en el README se encuentra en el
  archivo test.js
*/

const NETWORK_ERROR_PROBABILITY = 0.7;

function fakeFetch(ad, cb) {
  const fakeResponses = [
    { ad: 1, title: 'The first ad' },
    { ad: 2, title: 'The second ad' },
    { ad: 3, title: 'The third ad' },
    { ad: 4, title: 'The forth ad' },
    { ad: 5, title: 'The last ad' },
  ];
  const randomDelay = (Math.round(Math.random() * 1E4) % 40) + 1000;

  setTimeout(() => {
    const networkError = Math.random() <= NETWORK_ERROR_PROBABILITY;
    const currentAd = fakeResponses.find(resp => resp.ad === ad);

    if (networkError) {
      cb('Network error');
    } else {
      cb(null, currentAd);
    }
  }, randomDelay);
}

function getAd(ad, _try = 1) {
  return new Promise((resolve, reject) => {
    fakeFetch(ad, (err, res) => {
      if(err) {
        if (_try > 3) {
          return reject(`Failed to load the ad ${ad}`)
        }
        return resolve(getAd(ad, _try + 1))
      }
      res._try = _try
      resolve(res)
    })
  })
}

const ad1 = getAd(1, 1)
const ad2 = getAd(2, 1)
const ad3 = getAd(3, 1)
const ad4 = getAd(4, 1)
const ad5 = getAd(5, 1)

Promise.allSettled([ad1,ad2,ad3,ad4,ad5]).then((ads, _try) => {
  console.log(ads)
  for(let i = 0; i < 5; i++) {
    const { status, value: { ad, title } = {}, reason} = ads[i]
    if (status === 'rejected') {
      console.log(reason)
      break;
    }
  
    console.log(title)
    if (ad == 5) console.log('Done!')
  }
}).catch((err) => console.log(err));
