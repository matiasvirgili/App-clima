// key de la api
var key = 'e37af9d9318762439b04c25caa4fb9b6'

//Caputurar campos a cambiar
var bucarCiudad = document.getElementById('buscar-ciudad')
var ciudad = document.getElementById('ciudad')
var iconoToday = document.getElementById('contenedor-imagen-today')
var diaActual = document.getElementById('dia')
var hora = document.getElementById('hora')
var contenedorBusqueda = document.getElementById('contenedor-busqueda')
var temp = document.getElementById('temp')
var velocidadViento = document.getElementById('velocidad-viento')
var humedad = document.getElementById('humedad')
var porcentajeHumedad = document.getElementById('porcentaje-humedad')
var manitoHumedad = document.getElementById('manitoHumedad')
var visibilidad = document.getElementById('visibilidad')
var sunrise = document.getElementById('amanecer')
var sunset = document.getElementById('atardecer')
var descripcion = document.getElementById('descripcion-tiempo')
var logoDescricion = document.getElementById('icono-descripcion')

//cargar la pagina muestre una ciudad directamente
window.onload = function () {
  getWeatherData('buenos aires', key)
}

//hacer un request a la API y hacer un objeto que contenga los datos
var getWeatherData = async function (ciudad, key) {
  //fetch
  var res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}`,
  )
  var data = await res.json()

  //mostrar los datos en pantalla
  mostrarDatos(data)
}

contenedorBusqueda.addEventListener('submit', (e) => {
  e.preventDefault()
  getWeatherData(bucarCiudad.value, key)
})

var getWeatherDataWeek = async function (lat, lon) {
  var res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=metric`,
  )
  var data = await res.json()
  mostrarDatosSemanales(data)
}

var mostrarDatosSemanales = function (obj) {
  //mostrar los dias semanales
  for (let i = 1; i < 8; i++) {
    var dia = new Date(obj.daily[i].dt * 1000)
    var nombreDia = dia.getUTCDay()
    var nombreDiaActual
    var diaSemanal = document.getElementById('dia' + i)
    var tempSemanal = document.getElementById('temp' + i)
    var contenedorLogo = document.getElementById('cont' + i)
    var iconoClimaSemana = obj.daily[i].weather[0].icon
    var indiceUV = document.getElementById('uv-indice')

    if (nombreDia === 0) {
      nombreDia = 'Sun'
      nombreDiaActual = 'Sunday'
    }
    if (nombreDia === 1) {
      nombreDia = 'Mon'
      nombreDiaActual = 'Monday'
    }
    if (nombreDia === 2) {
      nombreDia = 'Tue'
      nombreDiaActual = 'Tuesday'
    }
    if (nombreDia === 3) {
      nombreDia = 'Wed'
      nombreDiaActual = 'Wednesday'
    }
    if (nombreDia === 4) {
      nombreDia = 'Thu'
      nombreDiaActual = 'Thursday'
    }
    if (nombreDia === 5) {
      nombreDia = 'Fri'
      nombreDiaActual = 'Friday'
    }
    if (nombreDia === 6) {
      nombreDia = 'Sat'
      nombreDiaActual = 'Saturday'
    }
    diaSemanal.textContent = nombreDia
    diaActual.textContent = nombreDiaActual
    tempSemanal.textContent =
      obj.daily[i].temp.max.toFixed(0) +
      '°' +
      '   ' +
      obj.daily[i].temp.min.toFixed(0) +
      '°'
    contenedorLogo.innerHTML = `<img src='/icons/${iconoClimaSemana}.png'></img`
    indiceUV.textContent = obj.current.uvi.toFixed(2)
  }
}

var mostrarDatos = function (obj) {
  var lat = obj.coord.lat
  var lon = obj.coord.lon

  getWeatherDataWeek(lat, lon)
  //extrar hora y convertilo a hora legible
  var dateSpanish = new Date(obj.dt * 1000 + obj.timezone * 1000)
  var date = dateSpanish.getUTCHours() + ':' + dateSpanish.getUTCMinutes()

  //mostrar el nombre de la ciudad en la foto
  ciudad.textContent = obj.name

  //mostrar la temperatura y la hora
  hora.textContent = date
  temp.textContent = (obj.main.temp - 271).toFixed(0) + '°C'

  //mostrar icono en today
  var iconoClima = obj.weather[0].icon
  iconoToday.innerHTML = `<img src='/icons/${iconoClima}.png'></img`

  //mostrar la velocidad del viento
  velocidadViento.textContent = obj.wind.speed.toFixed(2) + 'km/h'

  //mostrar humedad
  humedad.textContent = obj.main.humidity + '%'
  if (obj.main.humidity < 50) {
    porcentajeHumedad.textContent = 'light'
    manitoHumedad.innerHTML = '<img src="/img/manito.PNG"></img>'
  } else {
    if (obj.main.humidity > 50) {
      porcentajeHumedad.textContent = 'heavy'
      manitoHumedad.innerHTML = '<img src="/img/manitoAbajo.PNG"></img>'
    } else {
      porcentajeHumedad.textContent = 'normal'
      manitoHumedad.innerHTML = '<img src="/img/manito.PNG"></img>'
    }
  }

  //mostrar visibilidad
  visibilidad.textContent = obj.visibility / 1000 + 'km'

  //mostrar amanecer y atardecer
  var sunriseHora = new Date(obj.sys.sunrise * 1000 + obj.timezone * 1000)
  var amanecer = sunriseHora.getUTCHours() + ':' + sunriseHora.getUTCMinutes()

  var sunsetHora = new Date(obj.sys.sunset * 1000 + obj.timezone * 1000)
  var atardecer = sunsetHora.getUTCHours() + ':' + sunsetHora.getUTCMinutes()

  sunrise.textContent = amanecer + 'hs'
  sunset.textContent = atardecer + 'hs'

  //Descripcion del tiempo
  descripcion.textContent = obj.weather[0].description

  //logo descripcion del tiempo
  var logo = obj.weather[0].icon
  logoDescricion.innerHTML = `<img src='/icons/${logo}.png'></img`
}
