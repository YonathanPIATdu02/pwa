/*
 *  Variables globales
 */

// Booléen indiquant si la partie est en cours
let playing = false;

// Niveau de difficulté (3: easy, 2: medium, 1: hard)
// = nombre de secondes pendant lesquelles le cookie est immobile
let difficulty = 3;

// Nombre de clics sur le cookie
let clickCount = 0;

// Temps restant
let remainingTime = 15;

// Numéro de la cellule où se trouve le cookie
// = numéro de l'enfant dans une grille de 9 éléments div de classe col-4
let cell = 4;

// Zone d'affichage du score et du temps restant
let state = document.querySelector("#state");

// Zone d'affichage du score
let score = document.querySelector("span#score");

// Zone d'affichage du score final (fenêtre modale)
let finalScore = document.querySelector("#click-count");

// Zone d'affichage du temps restant
let time = document.querySelector("span#time");

// Bouton de démarrage
let startButton = document.querySelector("button");


// Cookie à cliquer
let cookie = document.querySelector("img#cookie");

//navbar
let navbar = document.querySelector("header.navbar"); 
//console.log(navbar)
let modalShare = document.querySelector("#modal-share");

tabcookie = document.querySelector("#tabcookie")
//console.log(tabcookie.childElementCount)

let rand = 0;


function change(){
   rand = Math.floor(Math.random()* tabcookie.childElementCount)
   tabcookie.children[rand].appendChild(cookie) 
}

function displayfenetremodale(){
    finalScore.innerHTML = clickCount;
    modalShare.classList.add("active");

}

function reset(){
    remainingTime = 15;
    startButton.style.display = "none";
    clickCount = 0;
    state.className = "columns mt-2 d-block";
}

function countdown(){
    if(remainingTime == 0){
        time.innerHTML = remainingTime + "s";
        playing = false;
        state.className = "columns mt-2 d-none";
        score.innerHTML = 0;
        displayfenetremodale();
        

    }
    else{
        if (remainingTime<=5){
            time.style.color = "red";
        }
        else if (remainingTime<=10){
            time.style.color = "orange";
        }
        else{
            time.style.color = "white";
        }
        time.innerHTML = remainingTime + "s";
        remainingTime -= 1;
        window.setTimeout(countdown, 1000);
    }
}


//ecouteur de start
startButton.addEventListener("click",()=>{
    reset();

    playing = true;
    countdown();
    
    
},false)

//ecouteur de cookie
cookie.addEventListener("click", function(event) {
    if (playing) { // Si la partie est en cours
        // Mise à jour du score
        if(difficulty === 1){
            change()
        }
        
        clickCount++;
        score.innerHTML = clickCount;
    }
});

function loadscore(){
    tbody.innerHTML = '<div class="loading loading-lg"></div>'
    fetch("http://piat0005/s4/cooki/cookieclicker/hall_of_fame.php?n=5")
    .then((reponse)=>{
        console.log(reponse)
        return reponse.json();
    })
    .then((json)=>{
        tbody.innerHTML = ""
        //console.log(json)
        json.forEach(element => {
            tbody.innerHTML += `<tr style="color:black"><td>${element.score}</td><td>${element.nickname}</td><td>${element.date}</td></tr>`
        });
    })
}
//ecouteur de la croix de modaleshare
let closemodalshare = document.querySelector("#close-modal-share")
function fclosemodalshare(){
    modalShare.classList = "modal";
    startButton.style.display = "block";
    loadscore()
}
closemodalshare.addEventListener("click",()=>{
    fclosemodalshare()
})

//ecouteur de la barre de navigation 
navbar = document.querySelector(".navbar");
modalSetting = document.querySelector("#modal-settings");
navbar.addEventListener("click",()=>{
    modalSetting.classList.add("active");
})

//ecouteur de la croix de modal setting
let closemodalsetting = document.querySelector("#close-modal-settings");
closemodalsetting.addEventListener("click",()=>{
    modalSetting.classList = "modal";
    
    //affiche les valeurs
    for(let i = 0; i < difficultyform.length;i++){
        if(difficultyform[i].children[0].checked){
            difficulty = 3-i;
            console.log(difficulty)
        }
    }
    
    console.log(colorform[0].value);

    navbar.style.background = colorform[0].value
})


//recup la couleur
let colorform = document.getElementsByClassName("form-input");


//recup la dificulter
let difficultyform = document.getElementsByClassName("form-radio");

//button submit nickname
/*
var myHeaders = new Headers();
var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
let subnick = document.querySelector("#subnick")
*/

subnick.addEventListener("submit",()=>{
    //console.log(subnick.children[0].value)
    var url = "http://piat0005/s4/cooki/cookieclicker/save_score.php?score="+clickCount+"&nickname="+subnick.children[0].value;
    //console.log(url)
    fetch(url)
        .then((reponse)=>{
            //console.log(reponse);
        })
    fclosemodalshare()
    event.preventDefault();

},false)  

let tbody = document.createElement("tbody")
tablehalloffame = document.querySelector("table.table")
tablehalloffame.appendChild(tbody)
loadscore()