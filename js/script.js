//"base de dados" do histórico
var locais = JSON.parse(localStorage.getItem("historico_de_locais")) || [];


// ------ Iniciar -------
mapa(-49,-11,0); //Inicia o mapa


function limpar(id){
    // deixa a DIV do mapa em branco
    elemento("#"+id).innerHTML = "";
}

function desenharMapa(x,y,zoom) {
    //cria um novo mapa, mas não o substitui no HTML
    //por isso precisa de uma função pra limpar
    var map = new ol.Map({
        target: 'map',
        layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
        ],
        view: new ol.View({
        center: ol.proj.fromLonLat([x,y]),
        zoom: zoom
        })
    });
}

function mapa(x,y,zoom){
    //apaga o mapa com as coordenadas antigas
    limpar("map");

    //mostra o mapa com as coordenadas novas
    desenharMapa(x,y,zoom);

    //mostra o historico
    mostrarLocais();
}

//limita o valor das entradas
function limite(id,min,max){
    var item = elemento("#"+id);
    if(item.value<min){ item.value = min; }else 
    if(item.value>max){ item.value = max; }
}

//função principal que faz a busca a partir dos dados do usuario
function localizar(){
    //pega os valores das caixas de texto
    var x = elemento("#x").value;
    var y = elemento("#y").value;
    var zoom = elemento("#zoom").value;

    //define o valor como zero, caso esteja vazio, não causando problemas no histórico
    if(x == ""){ x = 0; }
    if(y == ""){ y = 0; }
    if(zoom == ""){ zoom = 0; }

    //adiciona um novo local no histórico
    novoLocal(x,y,zoom);

    //salva no storage
    salvar();

    //chama a função que cria o mapa
    mapa(x,y,zoom);
}

//Pega um elemento
function elemento(item){ return document.querySelector(item); }




// -------------- Histórico ---------------

//mostra os locais anteriores
function mostrarLocais(){
    limpar("locais");

    //para cada local, ele cria um botão
    for(local of locais){
        //cria o botão e o texto dele
        var botaoLocal = document.createElement("button");
        var botaoTexto = document.createTextNode(local[0]+", "+local[1]+", "+local[2]);

        //diz que o texto deve ficar dentro do botao
        botaoLocal.appendChild(botaoTexto);

        botaoLocal.setAttribute("class", "botao botao-dark");
        
        //diz que o botao tem que ficar dentro da DIV dos locais
        elemento("#locais").appendChild(botaoLocal);
    }
}

function novoLocal(x,y,zoom) {
    var novoLocal = [x,y,zoom];
    locais.push(novoLocal);
}

function apagarHistorico() {
    locais = [];
    mostrarLocais();
    salvar();
}

function salvar(){
    localStorage.setItem("historico_de_locais", JSON.stringify(locais));
}