const TT = document.getElementById('Title');
const Des = document.getElementById('Description');
const id = document.getElementById('id');
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/getGame', true);
request.onload = function () {
    var Gid  = id.value;
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(game => {
            if (game.id == Gid) {
                TT.value = game.name;
                Des.innerHTML = game.description;
            }
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `It's not working!`;
        app.appendChild(errorMessage);
    }
}

request.send();