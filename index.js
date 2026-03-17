
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(resp => resp.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("autor").innerHTML = `Photo By: ${data.user.name}`
    })
    .catch(err => {
        console.log(err)
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzM3NDAwNTJ8&ixlib=rb-4.1.0&q=80&w=1080")`
        document.getElementById("autor").innerHTML = `By: Kalem Emsley`

    })

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(resp => {
        if (!resp.ok) {
            throw Error("Something went wrong")
        }
        return resp.json()
    })
    .then(data => {
        document.getElementById("icon").innerHTML = `<img src="${data.image.small}" />`
        document.getElementById("name").innerHTML = data.name
        document.getElementById("price").innerHTML = `
            <div>🎯: ${data.market_data.current_price.eur} €</div>
            <div>📈: ${data.market_data.high_24h.eur} €</div>
            <div>📉: ${data.market_data.low_24h.eur} €</div>`
    })
    .catch(err => {
        console.log(err)

    })

function updateClock() {
    const now = new Date()
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const date = `${dayName} ${day} ${month} ${year}`
    document.getElementById("date").innerHTML = date
    const time = now.toTimeString().split(" ")[0]
    document.getElementById("time").innerHTML = time

}
setInterval(updateClock, 1000)


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const weatherresp = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
        const weatherdata = await weatherresp.json()
        console.log(weatherdata)
        document.getElementById("weather").innerHTML = `
        <div class="weatherTop">
            <img src="http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png"/>
            ${Math.round(weatherdata.main.temp)}º
        </div>
        <div>${weatherdata.weather[0].main}</div>
        <div>${weatherdata.name}, ${weatherdata.sys.country}</div>
        `

    }, (error) => {
        console.error("Error al obtener la ubicación: ", error.message);
    });
} else {
    console.log("Tu navegador no soporta geolocalización.");
} 