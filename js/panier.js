/*Récupération des données contenues dans localStorage*/
let ContenuPanier = JSON.parse(localStorage.getItem('ArticlePanier'));
console.log(ContenuPanier);

/*Création de la page du récapitulatif panier*/
const FichePanier = document.getElementById('panier_commande');

/*Création des conteneurs de la page*/
let PanierSectionGlobale = document.createElement('div');
let PanierSectionProduits = document.createElement('div');
let PanierSectionFormulaire = document.createElement('div');

/*Création des noeuds entre les élements*/
FichePanier.appendChild(PanierSectionGlobale);
PanierSectionGlobale.appendChild(PanierSectionProduits)
PanierSectionGlobale.appendChild(PanierSectionFormulaire)

PanierSectionGlobale.className = 'section_globale_panier'
PanierSectionProduits.className = 'section_produits_panier'
PanierSectionFormulaire.className = 'section_formulaire_panier'



/***********************************/
/*Vérification du contenu du panier*/
/***********************************/

/*Si le panier est vide*/
if(ContenuPanier == null || ContenuPanier.length === 0){     
    const PanierVide = document.createElement('p');
    PanierSectionProduits.appendChild(PanierVide);
    PanierVide.className = "panier_vide";
    PanierVide.textContent = "Votre panier est vide"

} else {
    /*Si le panier contient des produits, parcours des élements du local storage et affichage des produits*/
    let i = 0;
    for (Produit of ContenuPanier) {
        const TableauProduit = document.createElement('div');
        PanierSectionProduits.appendChild(TableauProduit);
        TableauProduit.className = 'tableau_produits_panier';
        

        const LigneProduit = document.createElement('div');
        TableauProduit.appendChild(LigneProduit)
        LigneProduit.className = 'ligne_produit_panier'


        const BlocImage = document.createElement('div')
        LigneProduit.appendChild(BlocImage)
        BlocImage.className = ''


        /**********Récupération de l'image du produit**************/
        const AfficherProduit = async function() {
            /*Récupération de l'image de l'appareil photo via son ID*/
            try {
                let response = await fetch('http://localhost:3000/api/cameras/' + Produit.IdCamera);
                if (response.ok) {
                        let Camera = await response.json();
                        console.log(Camera);
        
            let ImageProduit = document.createElement('img');
            BlocImage.appendChild(ImageProduit);
            ImageProduit.setAttribute('src',Camera.imageUrl);
            ImageProduit.className =  'img_produit_panier';

                }
                else {
                    console.error('Retour du serveur : ', response.status);
                    alert('Erreur rencontrée : ' + response.status);
                } 
            } catch (error) {
                alert("Erreur : " + error);
            }
        };
        
        /*Appel de la fonction AfficherProduit*/
        AfficherProduit();
        /**********************************************************/

        const recapProduit = document.createElement('p');
        LigneProduit.appendChild(recapProduit);
        //recapProduit.textContent = /*Produit.Quantite + " " + */Produit.NomCamera /*+ " () " + Produit.Lentille;*/
        recapProduit.textContent = Produit.NomCamera+ " - Qté : " +Produit.Quantite // Produit.Lentille;*/
        recapProduit.className = 'produit_panier'

        const prixProduit = document.createElement('div');
        LigneProduit.appendChild(prixProduit);
        prixProduit.className = 'prix_produit_panier';
        prixProduit.id = i++;

        const prix = document.createElement('p');
        prixProduit.appendChild(prix);
        prix.textContent = Produit.PrixCamera + " €"
        prix.className = "prix_produit"

        /*Ajout d'un bouton de suppression du produit*/
        const bouttonSuppression = document.createElement('button');
        prixProduit.appendChild(bouttonSuppression);
        bouttonSuppression.className = 'btn_supprimer_panier';
        bouttonSuppression.title = 'Supprimer le produit du panier';

        const iconeBoutonSupprimer = document.createElement('i');
        bouttonSuppression.appendChild(iconeBoutonSupprimer);
        iconeBoutonSupprimer.className = 'fas fa-trash-alt';

    };
} 

/******************************************************/
/*********Calcul du montant total du panier************/
/******************************************************/
let calculPrix = []
for (Produit of ContenuPanier) {
    let article = Produit.PrixCamera;
    calculPrix.push(article);
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const PrixTotal = calculPrix.reduce(reducer, 0);
console.log(PrixTotal);

/*Affichage du prix total du panier*/
const sectionTotal = document.createElement('div');
PanierSectionProduits.appendChild(sectionTotal);
sectionTotal.className = 'total_panier';

const total = document.createElement('p');
sectionTotal.appendChild(total);
total.className = 'montant_total_panier';
total.textContent = "Montant total de la commande : " + PrixTotal + " €";
/**************************************************************/
/**************************************************************/
/**************************************************************/


/****************************************************************/
/*******************Formulaire de commande***********************/
/****************************************************************/
 const formulaire = document.createElement('form');
 formulaire.className = 'formulaire_contact';
 PanierSectionFormulaire.appendChild(formulaire);
 
 const titreFormulaire = document.createElement('h3');
 formulaire.appendChild(titreFormulaire);
 formulaire.textContent = "Veuillez compléter le formulaire pour valider votre commande";



 /*******Champ "Nom"********/
 const champNom = document.createElement('div');
 formulaire.appendChild(champNom);
 champNom.className = 'div_form';

 const libelleChampNom = document.createElement('label');
 champNom.appendChild(libelleChampNom);
 libelleChampNom.setAttribute('for', 'nom');
 libelleChampNom.textContent = 'Nom';

 const saisieChampNom = document.createElement('input');
 champNom.appendChild(saisieChampNom);
 saisieChampNom.setAttribute('type', 'text');
 saisieChampNom.setAttribute('class', 'champ_form');
 saisieChampNom.setAttribute('id','nom');
 saisieChampNom.name = "Nom";
 saisieChampNom.required = true;


 /*Vérification de la validité du nom*/
 /*saisieChampNom.addEventListener("change", function (event) {
     if (isValid(saisieChampNom.value)) {
     } else {
         alert("Aucun chiffre ou symbole n'est autorisé.")
         event.preventDefault()
     }
 });*/


 /*******Champ "Prénom"*******/
 const champPrenom = document.createElement('div');
 formulaire.appendChild(champPrenom);
 champPrenom.className = 'div_form';

 const libelleChampPrenom = document.createElement('label');
 champPrenom.appendChild(libelleChampPrenom);
 libelleChampPrenom.setAttribute('for', 'prenom');
 libelleChampPrenom.textContent = 'Prénom';

 const saisieChampPrenom = document.createElement('input');
 champPrenom.appendChild(saisieChampPrenom);
 saisieChampPrenom.setAttribute('type', 'text');
 saisieChampPrenom.setAttribute('class', 'champ_form');
 saisieChampPrenom.setAttribute('id','prenom');
 saisieChampPrenom.name = "Prénom";
 saisieChampPrenom.required = true;


 /*******Champ "Adresse"*******/
 const champAdresse = document.createElement('div');
 formulaire.appendChild(champAdresse);
 champAdresse.className = 'div_form';

 const libelleChampAdresse = document.createElement('label');
 champAdresse.appendChild(libelleChampAdresse);
 libelleChampAdresse.setAttribute('for', 'adresse');
 libelleChampAdresse.textContent = 'Adresse';

 const saisieChampAdresse = document.createElement('textarea');
 champAdresse.appendChild(saisieChampAdresse);
 saisieChampAdresse.setAttribute('type', 'text');
 saisieChampAdresse.setAttribute('class', 'champ_form');
 saisieChampAdresse.setAttribute('id','adresse');
 saisieChampAdresse.name = "Adresse";
 saisieChampAdresse.required = true;

 /*******Champ "Ville"*******/
 const champVille = document.createElement('div');
 formulaire.appendChild(champVille);
 champVille.className = 'div_form';
 
 const libelleChampVille = document.createElement('label');
 champVille.appendChild(libelleChampVille);
 libelleChampVille.setAttribute('for', 'ville');
 libelleChampVille.textContent = 'Ville';
 
 const saisieChampVille = document.createElement('input');
 champVille.appendChild(saisieChampVille);
 saisieChampVille.setAttribute('type', 'text');
 saisieChampVille.setAttribute('class', 'champ_form');
 saisieChampVille.setAttribute('id','ville');
 saisieChampVille.name = "Ville";
 saisieChampVille.required = true;

 /*******Champ "Email"*******/
 const champMail = document.createElement('div');
 formulaire.appendChild(champMail);
 champMail.className = 'div_form';

 const libelleChampMail = document.createElement('label');
 champMail.appendChild(libelleChampMail);
 libelleChampMail.setAttribute('for', 'email');
 libelleChampMail.textContent = 'Email';

 const saisieChampMail = document.createElement('input');
 champMail.appendChild(saisieChampMail);
 saisieChampMail.setAttribute('type', 'email');
 saisieChampMail.setAttribute('class', 'champ_form');
 saisieChampMail.setAttribute('id','email');
 saisieChampMail.name = "Adresse mail";
 /*saisieChampMail.setAttribute('pattern', '[A-z0-9._-]+[@]{1}[A-z0-9._-]+[.]{1}[A-z]{2,10}')*/
 saisieChampMail.required = true;



 /*******Bouton "Validation"*******/
 const champValidation = document.createElement('div');
 formulaire.appendChild(champValidation);
 champValidation.className = 'div_form_bouton';

 let boutonValidation = document.createElement('button');
 champValidation.appendChild(boutonValidation);
 boutonValidation.type = 'submit';
 boutonValidation.name = 'add';
 boutonValidation.id = 'valid';
 boutonValidation.textContent = "Valider la commande";
 boutonValidation.className = 'btn_valider_panier';



/**************************************************************/
/**************************************************************/
/**************************************************************/

/**************************************************************/
/*****Envoi du contenu du panier  et du formulaire à l'API*****/
/**************************************************************/
boutonValidation.addEventListener("click", function (event) {

    /*Contrôle que tous les champs du formulaire sont bien renseignés*/
    let j = 0

    /*console.log(document.getElementById("nom").length)
    console.log(document.getElementById("nom").value)*/

    /*Recupération des valeurs saisies dans les champs*/
    var nom = document.getElementById("nom").value;
    var nomse = nom.trim(); 
    var taillenomse = nomse.length;

    var prenom = document.getElementById("prenom").value;
    var prenomse = prenom.trim(); 
    var tailleprenomse = prenomse.length;

    var adresse = document.getElementById("adresse").value;
    var adressese = adresse.trim(); 
    var tailleadressese = adressese.length;

    var ville = document.getElementById("ville").value;
    var villese = ville.trim(); 
    var taillevillese = villese.length;

    
    var email = document.getElementById("email").value;
    var emailse = email.trim(); 
    var tailleemailse = emailse.length;

    /*console.log(nomse);
    console.log(taillenomse);

    console.log(prenomse);
    console.log(tailleprenomse);

    console.log(adressese);
    console.log(tailleadressese);

    console.log(villese);
    console.log(taillevillese);

    console.log(emailse);
    console.log(tailleemailse);*/


    if (nomse == "" || taillenomse == '0') {
        j++
        console.log(j)  
    }

    if (prenomse == "" || tailleprenomse == '0') {
        j++
        console.log(j)
    }

    if (adressese == "" || tailleadressese == '0') {
        j++
        console.log(j)
    }

    if (villese == "" || taillevillese == '0') {
        j++
        console.log(j)
    }

    if (emailse == "" || tailleemailse == '0') {
         j++
         console.log(j)
    }

    /*Si au moins un champ n'est pas renseigné, on affiche un message d'erreur*/
    if (j >= 1) {
        console.log(j+"champs manquants")
        alert("Veuillez renseigner tous les champs du formulaire pour valider la commande")
        return
    }
  

    /*Contrôle du contenu des champs avec les règles*/
    let regex = /^[A-Z-a-z'éèàçùäëüôûê\s]{2,40}$/
    /*let regex = /[a-zA-Z][']\$/*/
      
    if(!nomse.match(regex)) {
        alert("Le nom est Invalide");
        document.getElementById("nom").focus();
        event.preventDefault()        
        return
    }

    if(!prenomse.match(regex)) {
        alert("Le prénom est Invalide");
        document.getElementById("prenom").focus();
        event.preventDefault()
        return
    }

    if(!villese.match(regex)) {
        alert("La ville est Invalide");
        document.getElementById("adresse").focus();
        event.preventDefault()
        return
    }

    /*let regexmail  = /^[A-z0-9._-]+[@]{1}[A-z0-9._-]+[.]{1}[A-z]{2,10}$/

    if(!emailse.match(regexmail)) {
        alert("Le format de l'adresse mail n'est pas autorisé");
        document.getElementById("email").focus();
        event.preventDefault()
        return
    }*/

    let regexadresse = /^[A-Z-a-z-0-9',\s]{5,80}$/
    if(!adressese.match(regexadresse)) {
        alert("Le format de l'adresse postale n'est pas autorisé");
        document.getElementById("adresse").focus();
        event.preventDefault()
        return
    }    
   
 /****************************************************************************/

/*Envoi du prix total au localStorage*/
localStorage.setItem('PrixTotalCommande', PrixTotal);
const storagePrice = localStorage.getItem('PrixTotalCommande');
console.log(storagePrice);
             

/*Envoi à l'API */
/*Tableau et objet demandé par l'API pour la commande*/
/*Création de l'objet "contact"*/
let contact = {
    firstName: saisieChampPrenom.value,
    lastName: saisieChampNom.value,
    address: saisieChampAdresse.value,
    city: saisieChampVille.value,
    email: saisieChampMail.value,
}
console.log(contact);

         
/*Création du tableau des produits (id des caméras présentes dans le panier)*/
let products = [];
for (Produit of ContenuPanier) {
    let IDProduit = Produit.IdCamera;
    products.push((IDProduit));
}
console.log(products);
console.log(ContenuPanier);

/*Création d'un objet regroupant les éléments du formulaire et les produits*/
let send = {
            contact,
            products,
        }
        console.log(send);
        

        /*Envoi des données à l'API*/
        const post = async function (data){
            try {
                let response = await fetch ('http://localhost:3000/api/cameras/order', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',                        
                    }

                });
                if(response.ok) {
                    let data = await response.json();
                    console.log(data.orderId);
                    localStorage.setItem("responseOrder", data.orderId);
                    window.location = "confirmation.html";
                    localStorage.removeItem("ArticlePanier");

                } else {
                    event.preventDefault();
                    console.error('Retour du serveur : ', response.status);
                    alert('Erreur rencontrée : ' + response.status);
                } 
            } catch (error) {
                alert("Erreur : " + error);
            } 
        };
        post(send);


 
});


/***********************************************************/
/***********************************************************/
/***********************************************************/

/***********************************************************/
/************Suppression d'un article du panier*************/
/***********************************************************/
/*On récupère l'article associé au bouton poubelle*/
let bouttonSuppression = document.getElementsByClassName('btn_supprimer_panier');
for (let i = 0 ; i < bouttonSuppression.length; i++) {
bouttonSuppression[i].addEventListener('click' , function (event) { 
event.preventDefault();
let id = this.closest('.prix_produit_panier').id;

/*On supprime l'article du localStorage*/
ContenuPanier.splice(id, 1);

/*On enregistre le nouveau localStorage*/
localStorage.setItem('ArticlePanier', JSON.stringify(ContenuPanier));
JSON.parse(localStorage.getItem('ArticlePanier'));

alert('Cet article a bien été supprimé !');
window.location.href = "panier.html";   

/*Si après suppression, le contenu du panier est vide, on recharge la page*/
if (ContenuPanier.length == 0) {
localStorage.removeItem("ArticlePanier");
document.location.reload();
}

}); 
};
/**********************************************************/
/**********************************************************/
/**********************************************************/