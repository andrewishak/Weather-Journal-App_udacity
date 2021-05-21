// Personal API Key for OpenWeatherMap API
const openWeatherMapKey = '599d78a31b59f8f0c36348b76d921d75&units=metric';
const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const baseUrl = 'http://localhost:3000/';
// Event listener to add function to existing HTML DOM element

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click',generateData);

/* Function called by event listener */
function generateData(){
    let zipCode = document.getElementById('zip').value;
    if(zipCode.length < 1){
        alert("You should enter a zipCode !");
        return ;
    }
    let feelings = document.getElementById('feelings').value;

    getWeatherData(openWeatherMapUrl,openWeatherMapKey,zipCode)
    .then((data)=>{
        console.log(data);
        if (data.main !== undefined){
            postData('addWeatherData',{
                date : (new Date()).toString(),
                temperature : data.main.temp,
                feelings : feelings
            })
            .then(() => {
                updateUi();
            });
        }else{
            alert(data.message);
        }
    }).catch((error) => {
        console.log('error', error);
    });
     
}
/* Function to GET Web API Data*/
const getWeatherData = async(url,key,zipCode) => {
    url = url + zipCode + '&appid=' + key;
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}
/* Function to POST data */
const postData = async(url, data) => {
    const res = await fetch(baseUrl + url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temperature: data.temperature,
            date: data.date,
            feelings: data.feelings
        })
    });

    try {
        return res;
    } catch (error) {
        console.log('error', error);
    }
}
/* Function to GET Project Data */
const getData = async(url) => {
    const res = await fetch(baseUrl + url);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

function updateUi(){
    getData('all').then((data) => {
        console.log(data);
        document.getElementById('date').innerHTML = 'Date :- ' + data.date;
        document.getElementById('temp').innerHTML = 'Temperature :- ' +data.temperature;
        document.getElementById('content').innerHTML = 'Your feelings :- ' +data.feelings;
    }).catch((error) => {
        console.log('error', error);
    });
}