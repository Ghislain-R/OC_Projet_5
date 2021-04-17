/*Récupération de l'id de la commande*/
let idCommande = localStorage.getItem('responseOrder');
console.log(idCommande);

/*Récupération du prix total de la commande*/
let montantTotalCommande = localStorage.getItem('PrixTotalCommande');
console.log(montantTotalCommande);

/*Page de confirmation de commande*/
const FicheConfirmation = document.getElementById('confirmation_commande');
const ConfirmationSectionGlobale = document.createElement('div');
FicheConfirmation.appendChild(ConfirmationSectionGlobale);
ConfirmationSectionGlobale.className = 'commande_confirmation';

/*const titreConfirmation = document.createElement('h3');
ConfirmationSectionGlobale.appendChild(titreConfirmation );
titreConfirmation .textContent = "ORICAM'S vous remercie de votre commande !";*/

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

/*const TitreRecap = document.createElement('p');
ConfirmationSectionRecap.appendChild(TitreRecap);
TitreRecap.textContent = "Récapitulatif de votre commande : ";*/

const NumeroCommandeRecap = document.createElement('p');
ConfirmationSectionRecap.appendChild(NumeroCommandeRecap);
/*NumeroCommandeRecap.textContent = "Numéro de commande : " + orderId;*/
NumeroCommandeRecap.textContent = "Votre numéro de commande : " + idCommande;
NumeroCommandeRecap.className = "numero_commande";

const MontantCommandeRecap = document.createElement('p');
ConfirmationSectionRecap.appendChild(MontantCommandeRecap);
MontantCommandeRecap.textContent = "Montant total de votre commande : " + montantTotalCommande+ " €";
MontantCommandeRecap.className = "montant_commande";

/*RAZ du localStorage*/
localStorage.clear();