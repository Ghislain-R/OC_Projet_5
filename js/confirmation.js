/*Récupération de l'id de la commande*/
let idCommande = localStorage.getItem('responseOrder');
console.log(idCommande);

/*Récupération du prix total de la commande*/
let montantTotalCommande = localStorage.getItem('PrixTotalCommande');
console.log(montantTotalCommande);

/*Création des élément pour l'affichage de la confirmation de commande*/
const FicheConfirmation = document.getElementById('confirmation_commande');
const ConfirmationSectionGlobale = document.createElement('div');
FicheConfirmation.appendChild(ConfirmationSectionGlobale);
ConfirmationSectionGlobale.className = 'commande_confirmation';

const texteConfirmation1 = document.createElement('h3');
ConfirmationSectionGlobale.appendChild(texteConfirmation1);
texteConfirmation1.textContent = "Votre commande a bien été enregistrée !";

const texteConfirmation3 = document.createElement('p');
ConfirmationSectionGlobale.appendChild(texteConfirmation3 );
texteConfirmation3.textContent = "ORICAM'S vous remercie"

/*Récapitulatif de votre commande*/
const ConfirmationSectionRecap = document.createElement('div');
ConfirmationSectionGlobale.appendChild(ConfirmationSectionRecap);
ConfirmationSectionRecap.className = 'recap_confirmation';

const NumeroCommandeRecap = document.createElement('p');
ConfirmationSectionRecap.appendChild(NumeroCommandeRecap);
NumeroCommandeRecap.textContent = "Votre numéro de commande : " + idCommande;
NumeroCommandeRecap.className = "numero_commande";

const MontantCommandeRecap = document.createElement('p');
ConfirmationSectionRecap.appendChild(MontantCommandeRecap);
MontantCommandeRecap.textContent = "Montant total de votre commande : " + montantTotalCommande+ " €";
MontantCommandeRecap.className = "montant_commande";

/*****************Gestion retour boutique******************/
/*Ajout d'un bouton de retour vers la boutique (page index.html)*/
let boutonRetourBoutique = document.createElement('button');
ConfirmationSectionRecap.appendChild(boutonRetourBoutique);
boutonRetourBoutique.className = 'btn_retour_boutique';
boutonRetourBoutique.title = 'Retour à la boutique';
boutonRetourBoutique.textContent = 'Retour à la boutique';
boutonRetourBoutique.type = 'submit';

/*Au clic sur le bouton de retour à la boutique*/
boutonRetourBoutique.addEventListener('click' , function (event) { 
    event.preventDefault();
    /*Affichage de la page d'accueil*/
    window.location.href = "index.html";
});
/***********************************************************/

/*RAZ du localStorage*/
localStorage.clear();