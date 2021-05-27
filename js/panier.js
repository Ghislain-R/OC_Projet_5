/*Récupération des données contenues dans localStorage*/
let ContenuPanier = JSON.parse(localStorage.getItem('ArticlePanier'));
console.log(ContenuPanier);

/*Création de la page du récapitulatif panier*/
const FichePanier = document.getElementById('panier_commande');

/*Création des conteneurs de la page*/
let PanierSectionGlobale = document.createElement('div');
let PanierSectionProduits = document.createElement('div');
let PanierSectionFormulaire = document.createElement('div');
let PanierSectionRetour = document.createElement('div');

/*Création des noeuds entre les élements*/
FichePanier.appendChild(PanierSectionGlobale);
PanierSectionGlobale.appendChild(PanierSectionProduits)
PanierSectionGlobale.appendChild(PanierSectionRetour)
PanierSectionGlobale.appendChild(PanierSectionFormulaire)

/*Affectation des noms de classes aux élements*/
PanierSectionGlobale.className = 'section_globale_panier'
PanierSectionProduits.className = 'section_produits_panier'
PanierSectionRetour.className = 'section_retour_panier'
PanierSectionFormulaire.className = 'section_formulaire_panier'

/*****Vérification du contenu du panier*****/

/*Si le panier est vide*/
if(ContenuPanier == null || ContenuPanier.length === 0){     
    const PanierVide = document.createElement('p');
    PanierSectionProduits.appendChild(PanierVide);
    PanierVide.className = "panier_vide";
    PanierVide.textContent = "Votre panier est vide..."

    /*****************Gestion retour boutique panier vide******************/
    /*Ajout d'un bouton de retour vers la boutique (page index.html)*/
    let boutonRetourBoutiquePanierVide = document.createElement('button');
    PanierSectionProduits.appendChild(boutonRetourBoutiquePanierVide);
    boutonRetourBoutiquePanierVide.className = 'btn_retour_boutique';
    boutonRetourBoutiquePanierVide.title = 'Retour à la boutique';
    boutonRetourBoutiquePanierVide.textContent = 'Retour à la boutique';
    boutonRetourBoutiquePanierVide.type = 'submit';

    /*Au clic sur le bouton de retour boutique, renvoi sur la page de la liste des produits*/
    boutonRetourBoutiquePanierVide.addEventListener('click' , function (event) { 
        event.preventDefault();
        /*Affichage de la page d'accueil*/
        window.location.href = "index.html";
    });  
    /**********************************************************************/

} 
/*Si le panier contient des produits*/
else 
{
    /*Parcours des élements du local storage et affichage des produits*/
    let i = 0;
    for (Produit of ContenuPanier) {

        /*Création des éléments pour l'affichage des produits*/
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
        let ImageProduit = document.createElement('img');
        BlocImage.appendChild(ImageProduit);
        ImageProduit.setAttribute('src',Produit.UrlCamera);
        ImageProduit.className =  'img_produit_panier';
        /**********************************************************/

        const recapProduit = document.createElement('p');
        LigneProduit.appendChild(recapProduit);
        recapProduit.textContent = Produit.NomCamera+ " - Qté : " +Produit.Quantite
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

    /***************Gestion supression totale du panier***********/
    /*Ajout d'un bouton de suppression totale du panier*/
    let boutonSuppressionTotale = document.createElement('button');
    PanierSectionRetour.appendChild(boutonSuppressionTotale);
    boutonSuppressionTotale.className = 'btn_supprimer_panier_total';
    boutonSuppressionTotale.title = 'Vider le panier';
    boutonSuppressionTotale.textContent = 'Vider le panier';
    boutonSuppressionTotale.type = 'submit';

    /*Au clic sur le bouton du suppression totale du panier*/
    boutonSuppressionTotale.addEventListener('click' , function (event) { 
        event.preventDefault();
        /*Confirmation de suppression*/
        if (confirm("Confirmez-vous la suppression totale de votre panier ?")) {
            /*RAZ du localStorage*/
            localStorage.clear();
            /*Rechargement de la page*/
            document.location.reload();
        }
        else
        {
            /*L'utilisateur n'a pas confirmé, aucune action*/
        };
    });        
        /*************************************************************/

    /*****************Gestion retour boutique******************/
    /*Ajout d'un bouton de retour vers la boutique (page index.html)*/
    let boutonRetourBoutique = document.createElement('button');
    PanierSectionRetour.appendChild(boutonRetourBoutique);
    boutonRetourBoutique.className = 'btn_retour_boutique';
    boutonRetourBoutique.title = 'Retour à la boutique';
    boutonRetourBoutique.textContent = 'Continuer mes achats';
    boutonRetourBoutique.type = 'submit';

    /*Au clic sur le bouton de retour à la boutique*/
    boutonRetourBoutique.addEventListener('click' , function (event) { 
        event.preventDefault();
        /*Affichage de la page d'accueil*/
        window.location.href = "index.html";
    });
    /**********************************************************/

} 


/*********Calcul du montant total du panier********************/
/*Parcours du contenu du panier*/
let calculPrix = []
for (Produit of ContenuPanier) {
    let article = Produit.PrixCamera;
    calculPrix.push(article);
};

/*Cumul des montants contenus dans le panier*/
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


/*************Gestion du formulaire de commande****************/
/*Création de l'élément formulaire*/
 const formulaire = document.createElement('form');
 formulaire.className = 'formulaire_contact';
 PanierSectionFormulaire.appendChild(formulaire);
 
 const titreFormulaire = document.createElement('h3');
 formulaire.appendChild(titreFormulaire);
 formulaire.textContent = "Veuillez compléter le formulaire pour valider votre commande";

 /*Création du champ "Nom"*/
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

 /*Création du champ "Prénom"*/
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


 /*Création du champ "Adresse"*/
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

 /*Création du champ "Ville"*/
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

 /*Création du champ "Email"*/
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
 saisieChampMail.required = true;

 /*Création du bouton "Valider la commande"*/
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

/*****Envoi du contenu du panier  et du formulaire à l'API*****/
/*Au clic sur le bouton "Valider la commande"*/
boutonValidation.addEventListener("click", function (event) {

    /*****Contrôle que tous les champs du formulaire sont bien renseignés*****/
    let j = 0

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

    /*Vérification que les champs ne sont pas vide*/
    if (nomse == "" || taillenomse == '0') {
        j++
    }

    if (prenomse == "" || tailleprenomse == '0') {
        j++
    }

    if (adressese == "" || tailleadressese == '0') {
        j++
    }

    if (villese == "" || taillevillese == '0') {
        j++
    }

    if (emailse == "" || tailleemailse == '0') {
         j++
    }
    /*****************************************************************/

    /*Si au moins un champ est vide, on affiche un message d'erreur*/
    if (j >= 1) {
        console.log(j+"champs manquants")
        alert("Veuillez renseigner tous les champs du formulaire pour valider la commande")
        return
    }
  
    /*****Contrôle de valeurs saisies dans les champs avec les règles*****/
    /*Contrôle de la règle pour les champs Nom, Prénom et Ville*/
    let regex = /^[A-Z-a-z'éèàçùäëüôûêîï-\s]{2,40}$/
      
    if(!nomse.match(regex)) {
        alert("Le format du nom saisi n'est pas autorisé");
        document.getElementById("nom").focus();
        event.preventDefault()        
        return
    }

    if(!prenomse.match(regex)) {
        alert("Le format du prénom saisi n'est pas autorisé");
        document.getElementById("prenom").focus();
        event.preventDefault()
        return
    }

    if(!villese.match(regex)) {
        alert("Le format de la ville saisie n'est pas autorisé");
        document.getElementById("ville").focus();
        event.preventDefault()
        return
    }

    /*Contrôle de la règle pour le champ Email*/
    let regexmail  = /^[A-z0-9._-]+[@]{1}[A-z0-9._-]+[.]{1}[A-z]{2,10}$/

    if(!emailse.match(regexmail)) {
        alert("Le format de l'adresse mail saisie n'est pas autorisé");
        document.getElementById("email").focus();
        event.preventDefault()
        return
    }

    /*Contrôle de la règle pour le champ Adresse*/
    let regexadresse = /^[A-Z-a-z-0-9',éèàçùäëüôûêîï-\s]{5,80}$/

    if(!adressese.match(regexadresse)) {
        alert("Le format de l'adresse postale saisie n'est pas autorisé");
        document.getElementById("adresse").focus();
        event.preventDefault()
        return
    }    
    /****************************************************************************/

    /*Envoi du prix total au localStorage*/
    localStorage.setItem('PrixTotalCommande', PrixTotal);
    const storagePrice = localStorage.getItem('PrixTotalCommande');
    console.log(storagePrice);
                
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

    /*Création d'un objet regroupant l'objet contact et le tableau des produits*/
    let send = {
                contact,
                products,
            }
            console.log(send);
            

            /*Envoi des données à l'API*/
            const post = async function (data){
                try {
                    /*Execution de la requête GET*/
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

/************Gestion de la suppression d'un article du panier*************/
/*On récupère l'article associé au bouton poubelle*/
let bouttonSuppression = document.getElementsByClassName('btn_supprimer_panier');
for (let i = 0 ; i < bouttonSuppression.length; i++) {
    
    /*Au clic sur le bouton de suppression*/
    bouttonSuppression[i].addEventListener('click' , function (event) { 

        /*Récupération de l'Id sur produit*/
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
/************************************************************/


