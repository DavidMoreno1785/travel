const resultsContainer = document.getElementById("results");
const inputDestiny = document.getElementById("inputDestiny");
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
let dataObject = {};

const getData = async () =>{
  await fetch('./api/travel_recommendation_api.json').
  then(
    response => response.json()
  ).then(data => dataObject = data);
}

const findDestiny = () => { 
  let text = inputDestiny.value.toLowerCase();
  if(dataObject != {}){

    switch (text) {
      case 'beaches':
      case 'beach':
        generateCards(dataObject.beaches);
        break;
      case 'countries':
      case 'country':
        generateCards(dataObject.countries);
        break;
      case 'temples':
      case 'temple':
        generateCards(dataObject.temples);
        break;
      default:
        let message = document.createElement('p');
        message.setAttribute('class', 'notFound');
        message.textContent = 'No results found.';
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(message);
        break;
    }

    
    
  }else{
    let message = document.createElement('p');
    message.textContent = 'No results found';
    resultsContainer.appendChild(message);
  }

}

const generateCards = (data) =>{

  let cards = document.createElement('div');

  cards.setAttribute('class', 'cards');

  resultsContainer.innerHTML = '';
  resultsContainer.appendChild(cards);

  data.forEach(element => {
    let card = document.createElement('div');
    let img = document.createElement('img');
    let title = document.createElement('h3')
    let description = document.createElement('p');
    let btn = document.createElement('button');

    img.setAttribute('class', 'card-img');
    img.setAttribute('src', element.imageUrl);
    
    title.setAttribute('class', 'card-title');
    title.textContent = element.name;
    
    description.setAttribute('class', 'card-description');
    description.textContent = element.description;

    btn.setAttribute('class', 'card-btn');
    btn.textContent = 'Visit';

    card.setAttribute('class', 'card');
    card.setAttribute('id', element.id);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(btn);


    cards.appendChild(card);

  });
}

const clearResults = () =>{
  resultsContainer.innerHTML = '';
  inputDestiny.value = '';
}


getData();