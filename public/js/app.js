const weatherForm = document.querySelector('form')
const search = document.querySelector('#search-box')
const alertBox= document.querySelector("#alertBox")
const locationButton = document.querySelector('#location-button')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    address = search.value
    showAlerts = alertBox.checked

    showResults(address, false, showAlerts)
})

locationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Your browser does not support location')
    }
    showAlerts = alertBox.checked

    navigator.geolocation.getCurrentPosition((position) => {
        address = `${position.coords.latitude},${position.coords.longitude}`
        showAlerts = alertBox.checked
        
        showResults(address, true, showResults)
    })
})