//Définition de la map tabSave (contient les clé, valeur des obstacles)
var tabSave = new Map();
//Définition de la variable obstacle (permet de savoir a quel obstacle nous en somme)
var obstacle = 0
//fonction qui modifie la value si on clique dessus
function newValue(pId){
    console.log(pId)
    //On récupère la div contenant le p
    divId = document.getElementById(pId)
    //Modification de la valeur de value (on lui donne une nouvelle valeur)
    value = prompt("Obstacle "+pId+": a ou b (a pour cactus et b pour oiseau)")
    if(value==="a"){
        value = "cactus"
    } else if(value==="b"){
        value = "oiseau"
    } else {
        alert("valeur incorrecte, veuillez taper a ou b sinon l'obstacle a sera mis par défaut")
        value = prompt("Obstacle a ou b")
        if(value==="a"){
            value = "cactus"
        } else if(value==="b"){
            value = "oiseau"
        } else {
            value = "cactus"
            console.log(value)
        }
    }
    //On récupère l'id du p a supprimer
    var pSupp = document.getElementById("p"+pId)
    //on supprime le p
    pSupp.remove()
    //on crée un nouveau p avec la nouvelle valeur (voir fonction newObstacles)
    let nP = document.createElement('p')
    nP.id = "p"+pId
    nP.classList.add("pob");
    var contenu = document.createTextNode('Obstacles '+ pId+": "+value)
    nP.addEventListener('click', function() {
        newValue(pId);
    });
    //On ajoute le contenu dans le p
    nP.appendChild(contenu)
    //On ajoute le p dans la div
    divId.appendChild(nP)
    //On supprime l'ancienne clé dans tabSave
    tabSave.delete(pId)
    //On ajoute une nouvelle combinaison clé valeur
    pId=parseInt(pId)
    tabSave.set(pId, value)
}

// fonction qui crée un nouvel obstacle, enregistre sa valeur et la transmet à tabSave
function newObstacle(){
    obstacle++
    //On defini une variable qui va contenir la valeur de l'obstacle
    var value = prompt("Obstacle "+obstacle+": a ou b (a pour cactus et b pour oiseau)")
    if(value==="a"){
        value = "cactus"
    } else if(value==="b"){
        value = "oiseau"
    } else {
        alert("valeur incorrecte, veuillez taper a ou b sinon l'obstacle a sera mis par défaut")
        value = prompt("Obstacle a ou b")
        if(value==="a"){
            value = "cactus"
        } else if(value==="b"){
            value = "oiseau"
        } else {
            value = "cactus"
            console.log(value)
        }
    }
    //On sauvegarde la value obtenue dans tabSave [clé=nombre obstacle, valeur=value]
    tabSave.set(obstacle, value)
    console.log(tabSave)
    // Sélectionne la section id secP
    let section = document.querySelector("#secP")
    // On crée une div
    var nDiv = document.createElement('div');
    //On donne une id à la div
    console.log("Id de l'obstacle : ",obstacle)
    nDiv.id = obstacle
    console.log("Id de la div : ",nDiv.id)
    // On donne une class a la div (css)
    nDiv.classList.add("divcss");
    // Ici on crée un p
    var nP = document.createElement('p')
    // Ici on donne une id au p
    nP.id = "p"+obstacle
    // On donne une class au p (css)
    nP.classList.add("pob");
    // On rajoute une intéraction click au boutons
    nP.addEventListener('click', function() {
        newValue(nDiv.id);
    });
    //On crée un contenu
    var contenu = document.createTextNode('Obstacles '+ obstacle+": "+value)
    //On ajoute le contenu dans le p
    nP.appendChild(contenu)
    //On ajoute le p dans la div
    nDiv.appendChild(nP)
    //On met le tout dans la section
    section.appendChild(nDiv)
}
//Fonction qui supprime le dernier obstacle enregistré
function lessObstacle(){
    let section = document.querySelector("#secP")
    var divSupp = document.getElementById(obstacle)
    divSupp.remove()
    tabSave.delete(obstacle)
    obstacle--
}
//Fonction qui crée des boutons dans le section
function newButtons(){
    // Sélectionne la section id secP
    let section = document.querySelector("#secP")
    // On crée les deux boutons et on leur donne une id
    var buttonPlus = document.createElement('button')
    var buttonMoins = document.createElement('button')
    buttonPlus.id = "buttonPlus"
    buttonMoins.id = "buttonMoins"
    // On ajoute du texte au bouton
    buttonPlus.innerHTML = 'Cliquez ici pour rajouter un obstacle';
    buttonMoins.innerHTML = 'Cliquez ici pour supprimez le dernier obstacle';
    // On ajoute une interaction au bouton
    buttonPlus.addEventListener('click', allButtons);
    buttonMoins.addEventListener('click', lessObstacle);
    // On ajoute nos boutons à la section
    section.appendChild(buttonPlus)
    section.appendChild(buttonMoins)
}
//Fonction qui gère la coordination des fonctions (première fonction appellé par le code)
function edition(){
    // Appel de la fonction newObstacle
    newObstacle();
    // Suppresion du premier bouton
    //var supp = document.getElementById("firstButton");
    //supp.remove();
    // Appel de la fonction newButton
    //newButtons();
}
//Fonction qui supprime les deux boutons
function suppTwoButtons(){
    let first = document.getElementById("firstButton")
    let second = document.getElementById("supprimer")
    first.remove()
    second.remove()
}
// Fonction qui supprime les boutons et les recrées en bas de page + Crée le nouvel obstacle
function allButtons(){
    suppTwoButtons()
    newObstacle()
}
// Fonction qui convertis tabSave en format Json
function convertToJSON() {
    const json = {};
    for (const [key, value] of tabSave) {
      json[key] = value;
    }
    return json;
  }
// Fonction qui convertis le fichier Json en stringify
function string(){
    // Récupération de convertToJSON et mise en variable
    var result = convertToJSON()
    // Passage en string de la var result
    var lol = JSON.stringify(result)
    // Renvoie de lol
    return lol

    // console.log(Object.values(result)) // Afficher seulement les valeurs 
    // var dgh = JSON.parse(JSON.stringify(result)); // == De Json à Js
}
// Fonction qui permet de télécharger un fichier text contenant tabSave en Json
function createDownloadableFile() {
    let content = string();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "obstacles.txt";
    link.href = url;
    link.click();
  }
// Fonction qui permet de récupérer les données à partir d'un fichier txt
var data = ""
function importFile(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function(event) {
      // Récupération du contenu du fichier
      var content = event.target.result;
      sessionStorage.setItem('listeDesObstacles', content);
      // Conversion du contenu en objet
      data = JSON.parse(content);
      // Affichage de la var data
      console.log(data);
      // Renvoie de data
      Affichage()
      suppTwoButtons()
      alert("Retournez au menu et lancer une partie")
      return data
      // console.log(Object.values(data))
    }
  }
// Fonction qui affiche les obstacles après lecture du fichier
var parcourir = 1
function Affichage(){
    valeurArray = data[parcourir]
    const taille = Object.keys(data).length;
    console.log(taille)
    // console.log("1 : ", data, parcourir)
    // console.log(valeurArray)
    // console.log("longueur ", tabSave.length)
    // console.log(data)
    // On crée l'obstacle 
        while(parcourir < taille+1){
            valeurArray = data[parcourir]
            console.log("log de valeur array", valeurArray)
            // Sélectionne la section id secP
            let section = document.querySelector("#secP")
            // On crée une div
            var nDiv = document.createElement('div');
            //On donne une id à la div
            console.log("Id de l'obstacle : ",parcourir)
            nDiv.id = parcourir
            console.log("Id de la div : ",nDiv.id)
            // On donne une class a la div (css)
            nDiv.classList.add("divcss");
            // Ici on crée un p
            var nP = document.createElement('p')
            // Ici on donne une id au p
            nP.id = "p"+parcourir
            // On donne une class au p (css)
            nP.classList.add("pob");
            //On crée un contenu
            var contenu = document.createTextNode('Obstacles '+ parcourir+": "+valeurArray)
            //On ajoute le contenu dans le p
            nP.appendChild(contenu)
            //On ajoute le p dans la div
            nDiv.appendChild(nP)
            //On met le tout dans la section
            section.appendChild(nDiv)
            //on augmente parcourir
            parcourir++
            console.log("valeur de : ",parcourir)
        }
}

// Fonction de gestion des obstacles en fonction du charger 
var perso = document.querySelector("#personnage");
var obstacles = document.querySelector("#obstacles");
var obstacles2 = document.querySelector("#obstacles2");
var obstacles3 = document.querySelector("#obstacles3");
var obstacles4 = document.querySelector("#obstacles4");
var accroupi = document.querySelector("#accroupi");
//liste des obstacles
var obstacleArray = [obstacles, obstacles2, obstacles3, obstacles4]
var parcou = 0
// Fonction pour déterminer quel obstacle va spawn
function obstacleCharger(){
    const taille2 = Object.keys(data).length;
    while (parcou < taille2+1){
        valeurArray = data[parcou]
        var randomNumber = data
        if (randomNumber==="cactus"){
            randomNumber=1
        } else {
            randomNumber=2
        }
        console.log("a", randomNumber)
        console.log(randomNumber);
        obstacleArray[randomNumber].style.display = "block";

        //verification que l'objet est passé ou qu'il y a eu contact
        var verification = setInterval(function(){
            var persoTop = parseInt(window.getComputedStyle(perso).getPropertyValue("top")) ;
            var obstaclesLeft = parseInt(window.getComputedStyle(obstacleArray[randomNumber]).getPropertyValue("left"));
            var obstaclesTop = parseInt(window.getComputedStyle(obstacleArray[randomNumber]).getPropertyValue("top"));

            if(obstaclesLeft<20 && obstaclesLeft >0 && (persoTop> 472 && randomNumber!=1 || persoTop<600 && randomNumber==1)){
                console.log(persoTop)
                obstacleArray[randomNumber].style.animation = "none";
                alert("Loose")
            }

            else if (obstaclesLeft  < 0) { // si l'obstacle n'est pas entré en collision avec le personnage
                obstacleArray[randomNumber].style.display = "none"; // on cache l'obstacle
                randomNumber = Math.floor(Math.random() * obstacleArray.length); // on génère un nombre aléatoire
                console.log(randomNumber, "reinit");
                obstacleArray[randomNumber].style.display = "block"; // nouvel obstacle selon le nombre aléatoire
            }
        },1)
    }
}
function plusPlus(){
    
}
