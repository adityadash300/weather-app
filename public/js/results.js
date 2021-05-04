const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const alertList = document.querySelector('#alerts')
const alertHead = document.querySelector("p.alert")
const noAlert = document.querySelector('#noalert')

const showResults = (address, locationEnabled, showAlerts) => {
    
    
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading'
    alertList.textContent = ''
    alertHead.textContent = ''
    noAlert.textContent = ''
    noAlert.style.backgroundColor = 'white'


    fetch(`/weather?address=${address}&location=${locationEnabled}`).then((response) => {
        response.json().then(({error, location, forecast, alerts}) =>{
            if(error){
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
                if(showAlerts){
                    if(alerts.length !== 0){
                        alertHead.textContent = 'Alerts:'
                        alerts = alerts.slice(0 ,5)
                        alerts.forEach(({headline, severity}) => {
                            var newItem = document.createElement('LI')
                            newItem.innerHTML = headline
                            alertList.appendChild(newItem)
                            if(severity === 'Severe'){
                                newItem.style.backgroundColor = '#ff6666'
                            }
                        })
                    } else {
                        noAlert.textContent = 'No Alerts to show!'
                        noAlert.style.backgroundColor = 'green'
                    }
                }
            }
        })
    })
}