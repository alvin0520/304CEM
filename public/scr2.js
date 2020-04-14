const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

const row1 = document.createElement('div');
row1.setAttribute('class','row row-cols-4');

const col1 = document.createElement('div');
col1.setAttribute('class','col');
col1.appendChild(document.createTextNode("Title"));

const col2 = document.createElement('div');
col2.setAttribute('class','col-6');
col2.appendChild(document.createTextNode("Description"));

const col3 = document.createElement('div');
col3.setAttribute('class','col');
col3.appendChild(document.createTextNode("Delete or Modify"));

app.appendChild(container);
container.appendChild(row1);
row1.appendChild(col1);
row1.appendChild(col2); 
row1.appendChild(col3); 

//const rowblank =  document.createElement('div');
//rowblank.setAttribute('class','row');
//container.appendChild(rowblank);

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/getGame', true);
request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(game => {
            const row =  document.createElement('div');
            row.setAttribute('class','row row-cols-4');
            
            const col = document.createElement('div');
            col.setAttribute('class','col');
            col.appendChild(document.createTextNode(game.name));
            
            const coll = document.createElement('div');
            coll.setAttribute('class','col-6');
            coll.appendChild(document.createTextNode(game.description));

            container.appendChild(row);
            row.appendChild(col);
            row.appendChild(coll);
            
            const colb = document.createElement('div');
            colb.setAttribute('class','col');
            const form = document.createElement('form');
            form.setAttribute("action",'delete');
            form.setAttribute("method","POST");
            const hidd = document.createElement('input');
            hidd.setAttribute("type","hidden");
            hidd.setAttribute("name","id");
            hidd.setAttribute("value",game.id);
            form.appendChild(hidd);
            const imgbtn = document.createElement("input");
            imgbtn.setAttribute("type","submit");
            imgbtn.setAttribute("value"," ");
            imgbtn.setAttribute("style",'background:url(https://unpkg.com/@icon/dripicons/icons/document-delete.svg) no-repeat;border:none;')
            form.appendChild(imgbtn);
            

            const form2 = document.createElement('form');
            form2.setAttribute("action",'modify');
            form2.setAttribute("method","POST");
            const hidd2 = document.createElement('input');
            hidd2.setAttribute("type","hidden");
            hidd2.setAttribute("name","id");
            hidd2.setAttribute("value",game.id);
            form2.appendChild(hidd2);
            const imgbtn2 = document.createElement("input");
            imgbtn2.setAttribute("type","submit");
            imgbtn2.setAttribute("value"," ");
            imgbtn2.setAttribute("style",'background:url(https://unpkg.com/@icon/dripicons/icons/document-edit.svg) no-repeat;border:none;')
            form2.appendChild(imgbtn2);


            colb.appendChild(form);
            colb.appendChild(form2);
            row.appendChild(colb);
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `It's not working!`;
        app.appendChild(errorMessage);
    }
}
request.send();