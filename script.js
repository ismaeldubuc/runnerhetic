var perso = document.querySelector("#personnage");
var obstacles = document.querySelector("#obstacles");
var obstacles2 = document.querySelector("#obstacles2");
var obstacles3 = document.querySelector("#obstacles3");
var obstacles4 = document.querySelector("#obstacles4");


var accroupi = document.querySelector("#accroupi");
//liste des obstacles
var obstacleArray = [obstacles, obstacles2, obstacles3, obstacles4]
var verification;
//fonction pour déterminer quel obstacle va spawn
var numeroObstacle;
var dejaPasseParLa = false;

function obstacleHandler(){
    var typeObstacle = 0;
    numeroObstacle = 1;
    typeObstacle = determinerTypeObstacle(numeroObstacle);
    obstacleArray[typeObstacle].style.display = "block";
    
    //verification s'il y a collision entre obstacles et perso
    verification = setInterval("detectionCollision()",1);
}
function detectionCollision(){
    var persoBottom = parseInt(window.getComputedStyle(perso).getPropertyValue("bottom")) ;
    var persoAccroupi = parseInt(window.getComputedStyle(accroupi).getPropertyValue("bottom")) ;
    var obstaclesLeft = parseInt(window.getComputedStyle(obstacleArray[typeObstacle]).getPropertyValue("left"));
    var obstaclesBottom = parseInt(window.getComputedStyle(obstacleArray[typeObstacle]).getPropertyValue("bottom"));
    //console.log("persoBottom:"+persoBottom+"|persoAccroupi:"+persoAccroupi+"|obstaclesLeft:"+obstaclesLeft+"|obstaclesBottom:"+obstaclesBottom);
    //console.log("obstaclesLeft:"+obstaclesLeft);
    //console.log("Déjà passé par là : "+dejaPasseParLa);

    if(obstaclesLeft<20 && obstaclesLeft >0 && (persoBottom< 114 && typeObstacle!=1 || (persoBottom>=50 && typeObstacle==1)) ){

        afficherResultatDuJeu();

    } else if ((obstaclesLeft  < 0) && (dejaPasseParLa==false)) { // si l'obstacle n'est pas entré en collision avec le personnage
        obstacleArray[typeObstacle].style.display = "none"; // on cache l'obstacle
        dejaPasseParLa = true;
        numeroObstacle++;
        score = score + 10
        typeObstacle = determinerTypeObstacle(numeroObstacle); // on génère un nombre aléatoire
        obstacleArray[typeObstacle].style.display = "block"; // nouvel obstacle selon le nombre aléatoire
        //console.log("Obstacles Left:"+obstaclesLeft);
        //console.log('Nombre obstacle franchi: ' + numeroObstacle);
    } else if ((obstaclesLeft > 0) && (dejaPasseParLa==true)) {
        dejaPasseParLa = false;
    }

    /*---------------- Vitesse des obstacles ---------------------*/
    if(score === 10){
        document.getElementById("obstacles").style.animationDuration = "2.4s";
        document.getElementById("obstacles2").style.animationDuration = "2.4s";
        document.getElementById("obstacles3").style.animationDuration = "2.4s";
        document.getElementById("obstacles4").style.animationDuration = "2.4s";
    }
    if(score === 20){
        document.getElementById("obstacles").style.animationDuration = "2.3s";
        document.getElementById("obstacles2").style.animationDuration = "2.3s";
        document.getElementById("obstacles3").style.animationDuration = "2.3s";
        document.getElementById("obstacles4").style.animationDuration = "2.3s";
    }
    if(score === 30){
        document.getElementById("obstacles").style.animationDuration = "2.2s";
        document.getElementById("obstacles2").style.animationDuration = "2.2s";
        document.getElementById("obstacles3").style.animationDuration = "2.2s";
        document.getElementById("obstacles4").style.animationDuration = "2.2s";
    }
    else if(score === 40){
        document.getElementById("obstacles").style.animationDuration = "2.1s";
        document.getElementById("obstacles2").style.animationDuration = "2.1s";
        document.getElementById("obstacles3").style.animationDuration = "2.1s";
        document.getElementById("obstacles4").style.animationDuration = "2.1s";
    }
    else if(score === 50){
        document.getElementById("obstacles").style.animationDuration = "2s";
        document.getElementById("obstacles2").style.animationDuration = "2s";
        document.getElementById("obstacles3").style.animationDuration = "2s";
        document.getElementById("obstacles4").style.animationDuration = "2s";
    }
    else if(score === 100){
        document.getElementById("obstacles").style.animationDuration = "1.5s";
        document.getElementById("obstacles2").style.animationDuration = "1.5s";
        document.getElementById("obstacles3").style.animationDuration = "1.5s";
        document.getElementById("obstacles4").style.animationDuration = "1.5s";
    }
    // la vitesse de l'obstacle passe à 1.7s
    else if(score === 150){
        document.getElementById("obstacles").style.animationDuration = "1s";
        document.getElementById("obstacles2").style.animationDuration = "1s";
        document.getElementById("obstacles3").style.animationDuration = "1s";
        document.getElementById("obstacles4").style.animationDuration = "1s";
}
    else if(score === 200)
{
        document.getElementById("obstacles").style.animationDuration = "0.8s";
        document.getElementById("obstacles2").style.animationDuration = "0.8s";
        document.getElementById("obstacles3").style.animationDuration = "0.8s";
        document.getElementById("obstacles4").style.animationDuration = "0.8s";
}
    
}
function afficherResultatDuJeu(titre = "Game Over") {
    var titleOver = titre;

    document.querySelector("#titreOver").innerText = titleOver;   
    document.querySelector("#score-over").innerText = " Score : " + score;
    obstacleArray[typeObstacle].style.animation = "none";


    pause = false;

    document.getElementById('titreOver').style.display = 'block'; 
    document.getElementById('button-pause').style.display = 'none';    
    document.getElementById('score').style.display = 'none';  
    document.getElementById('niveau').style.display = 'none';  
    document.getElementById('button-recommencer').style.display = 'block';  
    document.getElementById('button-quitter-over').style.display = 'block';  
    document.getElementById('score-pause').style.display = 'none';  
    document.getElementById('personnage').style.display = 'none'; 
    document.getElementById('obstacles').style.display = 'none'; 

    clearInterval(verification);
}
function isEmptyObject(value) {
    return Object.keys(value).length === 0 && value.constructor === Object;
}
function determinerTypeObstacle(numeroObstacle) {
    
    if (listeDesObstacles != undefined) {
        nomObstacle = listeDesObstacles[numeroObstacle];
        //console.log("Nom de l'obstacle:"+nomObstacle);
        switch (nomObstacle) {
            case 'oiseau':
                typeObstacle = 1;
                break;
            case 'cactus':
                typeObstacle = 0;
                break;
            default:
                afficherResultatDuJeu("Congratulations");
                break;
        }
    } else {
        typeObstacle = Math.floor(Math.random() * obstacleArray.length);
    } 
    
    return typeObstacle;
}

/* -------------- AFFICHE LE SCORE PENDANT LE JEU --------------- */
var score = 0 ;
var interval = setInterval(afficherScore);
var obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));
let pause = false;

document.querySelector("#niveau").innerText = "Niveau 1";

function afficherScore(){
    //score+=10;
    document.querySelector("#score").innerText = score;
    
    if(score == 1000){
    document.querySelector("#niveau").innerText = "Niveau 2";
    
     }
}

/* -------------- AFFICHE LA PAGE PAUSE QUAND ON CLIQUE SUR LE BOUTON PAUSE --------------- */

function pauseJeux(){
    
    var titlePause = "Pause";

    clearInterval(interval);
    pause = true;
    
    document.querySelector("#titrePause").innerText = titlePause;   
    document.querySelector("#score-pause").innerText = " Score : " + score;

    document.getElementById('titrePause').style.display = 'block';    
    document.getElementById('button-pause').style.display = 'none';    
    document.getElementById('score').style.display = 'none';  
    document.getElementById('niveau').style.display = 'none';  
    document.getElementById('button-reprendre').style.display = 'block';  
    document.getElementById('button-quitter').style.display = 'block';  
    document.getElementById('score-pause').style.display = 'block';
    document.getElementById('obstacles').style.display = 'none'
    document.getElementById('obstacles2').style.display = 'none'
    document.getElementById('obstacles3').style.display = 'none'
    document.getElementById('obstacles4').style.display = 'none'
    document.getElementById('personnage').style.display = 'none'

    document.getElementById('obstacles').style.opacity = "0";
    document.getElementById('obstacles').style.animationPlayState = "paused";

    document.getElementById('obstacles2').style.opacity = "0";
    document.getElementById('obstacles2').style.animationPlayState = "paused";

    document.getElementById('obstacles3').style.opacity = "0";
    document.getElementById('obstacles3').style.animationPlayState = "paused";

    document.getElementById('obstacles4').style.opacity = "0";
    document.getElementById('obstacles4').style.animationPlayState = "paused";


}

function repriseJeux(){
    pause = false;
    
    document.getElementById('titrePause').style.display = 'none'; 
    document.getElementById('button-pause').style.display = 'inline';    
    document.getElementById('score').style.display = 'inline';  
    document.getElementById('niveau').style.display = 'inline';  
    document.getElementById('button-reprendre').style.display = 'none';  
    document.getElementById('button-quitter').style.display = 'none';  
    document.getElementById('score-pause').style.display = 'none';
    document.getElementById('personnage').style.display = 'block'

    document.getElementById('obstacles').style.opacity = "1";
    document.getElementById('obstacles').style.animationPlayState = "running";

    document.getElementById('obstacles2').style.opacity = "1";
    document.getElementById('obstacles2').style.animationPlayState = "running";

    document.getElementById('obstacles3').style.opacity = "1";
    document.getElementById('obstacles3').style.animationPlayState = "running";

    document.getElementById('obstacles4').style.opacity = "1";
    document.getElementById('obstacles4').style.animationPlayState = "running";


    interval = setInterval(afficherScore, 100);

    obstacleHandler()
}

function recommencerJeux(){

}

//fonction pour faire sauter le personnage
function sauter(){
    if(perso.classList != "animation"){
        perso.classList.add('animation');
    }
    setTimeout(function(){
        perso.classList.remove('animation');
    },500)
};


/* -------------- TOUCHES --------------- */

//fonction pour déterminer la key à presser
document.addEventListener("keydown",function(e){
    if (keyUp === null) {
        if(e.key == 'a'){
            sauter()
        }
    } else {
        if(e.key == keyUp){
            sauter()
        }
    }
});

//afficher le perso accroupi et fait disparaitre le luffy normal

document.addEventListener("keydown",function(e){
    if (keySneak === null) {
        if(e.key == 'q'){
            perso.style.bottom = "40px"
            accroupi.style.display = "unset"
            //console.log ("persoBottom")
            console.log(parseInt(window.getComputedStyle(perso).getPropertyValue("bottom")))
            perso.style.display = "none"
        }
    } else {
        if(e.key === keySneak){
            perso.style.bottom = "40px"
            accroupi.style.display = "unset"
            //console.log ("persoBottom")
            console.log(parseInt(window.getComputedStyle(perso).getPropertyValue("bottom")))
            perso.style.display = "none"
        }
    }
});

//afficher le perso normal et disparaitre luffy accroupi
document.addEventListener("keyup",function(e){
    if (keySneak === null) {
        if(e.key=='q'){
            perso.style.bottom = "50px"
            accroupi.style.display = "none"
            //console.log ("persoBottom")
            perso.style.display = "unset"
        }
    } else {
        if(e.key === keySneak){
                perso.style.bottom = "50px"
                accroupi.style.display = "none"
                //console.log ("persoBottom")
                perso.style.display = "unset"
        }
    }
});

var listeDesObstaclesEnJson = sessionStorage.getItem('listeDesObstacles');
listeDesObstacles = JSON.parse(listeDesObstaclesEnJson);
console.log(listeDesObstacles);

var keyUp = sessionStorage.getItem('keyUp')
console.log("Touche pour sauter : ", keyUp)
var keySneak = sessionStorage.getItem('keyDown')
console.log("Touche pour accroupir : ", keySneak)
if ((keyUp === null) && (keySneak === null)){
    alert("N'oubliez pas configurez vos touches à la page option ! (Par défaut a : sauter q : s'accroupir)")
} else {
    var toucheSaut = keyUp
    var toucheBas = keySneak
    if (keyUp === ' ') {
        toucheSaut="Espace"
    } 
    if (keySneak === ' ') {
        toucheBas="Espace"
    } 
    alert("Sauter : "+ toucheSaut +" / S'accroupir : "+ toucheBas)
}
obstacleHandler();