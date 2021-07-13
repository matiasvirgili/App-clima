// key de la api
var key = 'e37af9d9318762439b04c25caa4fb9b6'

//Caputurar campos a cambiar

var bucarCiudad = document.getElementById('buscar-ciudad')
var iconoToday = document.getElementById('contenedor-imagen-today')
var dia = document.getElementById('dia')
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

var mostrarDatos = function (obj) {
  //extrar hora y convertilo a hora legible
  var dateSpanish = new Date(obj.dt * 1000).toLocaleString('es-ES', {
    timeStyle: 'short',
  })

  //mostrar la temperatura y la hora
  hora.textContent = dateSpanish
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
  var sunriseHora = new Date(obj.sys.sunrise * 1000).toLocaleString('es-ES', {
    timeStyle: 'short',
  })
  var sunsetHora = new Date(obj.sys.sunset * 1000).toLocaleString('es-ES', {
    timeStyle: 'short',
  })
  sunrise.textContent = sunriseHora + 'hs'
  sunset.textContent = sunsetHora + 'hs'
}

var getWeatherData = async function (ciudad, key) {
  //hacer un request a la API y hacer un objeto que contenga los datos
  //fetch
  var res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&lang=sp`,
  )
  var data = await res.json()

  //mostrar los datos en pantalla
  mostrarDatos(data)
  console.log(data)
}

contenedorBusqueda.addEventListener('submit', (e) => {
  e.preventDefault()
  getWeatherData(bucarCiudad.value, key)
})

// cargar la pagina muestre una ciudad directamente

window.onload = function () {
  getWeatherData('buenos aires', key)
}
