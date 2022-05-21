/* Global Variables */
const generator = document.querySelector('#generate');
const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=94352f8227422f892a647936cfff4a44&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//An event listener for the element with the id: generate, with a callback function to execute when it is clicked.
generator.addEventListener('click', () => {
    let zip = document.querySelector('#zip').value;
    let feelings = document.querySelector('#feelings').value;
    console.log(feelings);
    getWeather(baseURL, zip, apiKey)
        .then(data => {
            //Add data POST request
            postData('/add', {
                temp: data.main.temp,
                content: feelings,
                date: newDate
            })
        }).then(updateUI())
})


//Get request async function
const getWeather = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipCode + apiKey);

    try {
        return await res.json();
    } catch (error) {
        console.log('error: ', error);
    }
}

//Post async fnction
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
};

//function to updat the UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        request.json().then(data => {
            console.log(data);
            date.innerHTML = `Date: ${data.date} `;
            content.innerHTML = `Feeling: ${data.content}`;
            temp.innerHTML = `Temp: ${Math.round(data.temp)} degrees`;
        });
    } catch (error) {
        console.log("error", error);
    }
}

