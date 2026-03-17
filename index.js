
try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("autor").innerHTML = `Photo By: ${data.user.name}`
} catch (err) {
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzM3NDAwNTJ8&ixlib=rb-4.1.0&q=80&w=1080")`
    document.getElementById("autor").innerHTML = `By: Kalem Emsley`
}

try {
    const resp = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    if (!resp.ok) {
        throw Error("Something went wrong")
    }
    const data = await resp.json()
    document.getElementById("icon").innerHTML = `<img src="${data.image.small}" />`
    document.getElementById("name").innerHTML = data.name
    document.getElementById("price").innerHTML = `
            <div>🎯: ${data.market_data.current_price.eur} €</div>
            <div>📈: ${data.market_data.high_24h.eur} €</div>
            <div>📉: ${data.market_data.low_24h.eur} €</div>`
} catch (err) {
    console.error(err)
}

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



navigator.geolocation.getCurrentPosition(async pos => {
    try {
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude
    const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
    if (!res.ok) {
        throw Error("Weather data not available")
    }
    const data = await res.json()
    document.getElementById("weather").innerHTML = `
        <div class="weatherTop">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
            ${Math.round(data.main.temp)}º
        </div>
        <div>${data.weather[0].main}</div>
        <div>${data.name}, ${data.sys.country}</div>
        `
    } catch (err){
        console.error(err)
    }
})