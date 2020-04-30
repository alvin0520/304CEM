const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);


var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/getGame', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(game => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h2 = document.createElement('h2');
      h2.textContent = game.name;

      const p = document.createElement('p');
      game.description = game.description.substring(0, 300);
      p.textContent = `${game.description}......`;

      container.appendChild(card);
      card.appendChild(h2);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `It's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();