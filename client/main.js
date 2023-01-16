const baseURL = `http://localhost:4000/api`;

const complimentList = document.querySelector('#compliment-list')
const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const form = document.getElementById("complimentComment")

const customComplimentForm = document.getElementById("customComplimentForm")
const customComplimentBtn = document.getElementById("customComplimentBtn")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};


const complimentCallback = ({data: compliments}) => displayCompliments(compliments);
const getAllComplimentEntries = () => axios.get(`${baseURL}/compliments`).then(complimentCallback);
const addCompliment = body => axios.post(`${baseURL}/compliments`, body).then(complimentCallback);
const deleteCompliment = id => axios.delete(`${baseURL}/compliments/${id}`).then(complimentCallback);

const complimentCard = document.createElement('div');



const displayCompliments = (complimentsArr) => {
    complimentList.innerHTML = ``
    for (let i = 0; i < complimentsArr.length; i++) {
        createComplimentCard(complimentsArr[i])
    }
}


function createComplimentCard(compliment) {
    const complimentCard = document.createElement('div');

    complimentCard.innerHTML = complimentCardComponent(compliment);
    complimentList.appendChild(complimentCard);
}


const complimentCardComponent = (compliment) => {
	return `<div>
	<H3>${compliment.author}</H3>
	<P>${compliment.text}</P>
	<button onclick="deleteCompliment(${compliment.id})">delete</button>
	</div>
	`
}

function customSubmitHandler(e) {
    e.preventDefault()
    let name = document.querySelector('#id')
    alert(`Awesome work ${name}`);
}

function submitHandler(e) {
    e.preventDefault()

    // get values from form
    let author = document.querySelector('#author')
    let text = document.querySelector('#text')

    let compliment = {
        text: text.value,
        author: author.value
    }

    addCompliment(compliment);

    // clear the form
    author.value = ''
    text.value = ''
}

// Listeners
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
form.addEventListener('submit', submitHandler)

// get all compliments on start up
getAllComplimentEntries()