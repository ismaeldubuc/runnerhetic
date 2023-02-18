var perso = document.querySelector("#personnage");
var obstacles = document.querySelector("#obstacles");
var obstacles2 = document.querySelector("#obstacles2");
var obstacles3 = document.querySelector("#obstacles3");
var obstacles4 = document.querySelector("#obstacles4");
var accroupi = document.querySelector("#accroupi");
//liste des obstacles
var obstacleArray = [obstacles, obstacles2, obstacles3, obstacles4]

//fonction pour déterminer quel obstacle va spawn

function obstacleHandler(){
    var randomNumber = Math.floor(Math.random() * obstacleArray.length);
    console.log(randomNumber);
    obstacleArray[randomNumber].style.display = "block";

    //verification s'il y a collision entre obstacles et perso
    var verification = setInterval(function(){
        var persoBottom = parseInt(window.getComputedStyle(perso).getPropertyValue("bottom")) ;
        var persoAccroupi = parseInt(window.getComputedStyle(accroupi).getPropertyValue("bottom")) ;
        var obstaclesLeft = parseInt(window.getComputedStyle(obstacleArray[randomNumber]).getPropertyValue("left"));
        var obstaclesBottom = parseInt(window.getComputedStyle(obstacleArray[randomNumber]).getPropertyValue("bottom"));

console.log(persoBottom)

         if(obstaclesLeft<20 && obstaclesLeft >0 && (persoBottom< 114 && randomNumber!=1 || (persoBottom>=50 && randomNumber==1))){

            var titleOver = "Game Over";

            document.querySelector("#titreOver").innerText = titleOver;   
            document.querySelector("#score-over").innerText = " Score : " + score;
            obstacleArray[randomNumber].style.animation = "none";


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

            clearInterval(interval);
            
        }


        else if (obstaclesLeft  < 0) { // si l'obstacle n'est pas entré en collision avec le personnage
            obstacleArray[randomNumber].style.display = "none"; // on cache l'obstacle
            randomNumber = Math.floor(Math.random() * obstacleArray.length); // on génère un nombre aléatoire
            console.log(randomNumber, "reinit"); // console log
            obstacleArray[randomNumber].style.display = "block"; // nouvel obstacle selon le nombre aléatoire
        }
    },1)
}

/* -------------- AFFICHE LE SCORE PENDANT LE JEU --------------- */
let score = 0 ;
var interval = setInterval(afficherScore, 100);
var obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));
let pause = false;

document.querySelector("#niveau").innerText = "Niveau 1";

function afficherScore(){
    score++;
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
    if(e.keyCode==65){
        sauter()
    }
});

//afficher le perso accroupi et fait disparaitre le luffy normal

document.addEventListener("keydown",function(e){
    if(e.keyCode==80){
        perso.style.bottom = "40px"
        accroupi.style.display = "unset"
        console.log ("persoBottom")
        console.log(parseInt(window.getComputedStyle(perso).getPropertyValue("bottom")))
        perso.style.display = "none"
    }
});

//afficher le perso normal et disparaitre luffy accroupi
document.addEventListener("keyup",function(e){
    if(e.keyCode==80){
        perso.style.bottom = "50px"
        accroupi.style.display = "none"
        console.log ("persoBottom")
        perso.style.display = "unset"
    }
});


obstacleHandler();