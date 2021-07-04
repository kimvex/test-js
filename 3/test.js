/*
  Este es el código principal, aquí se ejecuta el código
  con lo requerido en el README
*/

const NETWORK_ERROR_PROBABILITY = 0.1;

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

const timers = []
let actual_ad = 1
let ads = ['ad1', 'ad2', 'ad3', 'ad4', 'ad5']

// Se obtendran los ads y en caso de fallar se ejecutara de forma recursiva
const reqAd = (ad, _try = 1) => {
  fakeFetch(ad, (error, res) => {
    if(error) {
      if(_try > 3) {
        show_ad(ad, null, error)
        return
      }
      // Descomentar para ver el log de los intentos de obtener el ad
      // console.log(`intento: ${_try} -- Error: ${error} -- ad: ${ad}`)
      return reqAd(ad, _try + 1)
    }

    show_ad(ad, res.title, null)
  })
}

// Se ejecuta la peticiones de ads
for (let index = 0; index < ads.length; index++) {
  reqAd(index + 1, 1)
}

// Mostramos los mensajes de los ads de forma ordenada
// y los vamos mostrando. Si el ad no se ajusta al orden
// se agrega de nuevo un timer pare que se vuelva a consultar
const show_ad = (ad, title, error) => {
  if (ad == actual_ad && !error) {
    actual_ad++
    console.log(title)
    if (ad == ads.length) {
      console.log('Done!')
      stop_process()
    }
    return
  }

  if (error && ad == actual_ad) {
    console.log(`Failed to load the ad ${ad}`)
    actual_ad = 0
    stop_process()
    return
  }

  if(error && ad == 1) {
    stop_process()
    return
  }
  
  if(actual_ad == 0) {
    stop_process()
    return
  }

  timers.push(setTimeout(() => {
    show_ad(ad, title, error)
  }, 10))
}

// Se detiene el proceso una vez que los ads fueron mostrados
// o que se genero un error.
const stop_process = () =>  {
  process.exit()

  //En caso de no usar el process se puede limpiar los timers
  // let size_timers = timers.length
  // while(size_timers > 0) {
  //   clearTimeout(timers[size_timers - 1]);
  //   size_timers--
  // }
}
