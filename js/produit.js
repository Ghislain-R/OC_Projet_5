/*Récupération de l'ID de l'appareil photo sélectionné*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

/*Fonction pour l'affichage du détail du produit*/
const AfficherProduit = async function() {
    /*Récupération des informations de l'appareil photo sélectionné par son id*/
    try {
        /*Execution de la requête GET*/
        let response = await fetch('http://localhost:3000/api/cameras/' + id);

        /*Si la réponse est OK, récupération des informations du produit*/
        if (response.ok) {
                    let Camera = await response.json();
                    console.log(Camera);

                    /*Récupération de l'Id de la section de la page où sera généré l'affichage dynamique*/
                    const FicheProduit = document.getElementById('fiche_camera');
                    
                    /*Création des conteneurs de la page*/
                    let FicheSectionGlobale = document.createElement('div');
                    let FicheSectionEntete = document.createElement('div');
                    let FicheSectionImage = document.createElement('div');
                    let FicheSectionDetail = document.createElement('div');
                    let FicheSectionDescription = document.createElement('div');                
                    let FicheSectionListe = document.createElement('div');                        

                    /*Création des éléments de la page*/
                    let ImageProduit = document.createElement('img');
                    let DescriptionProduit  = document.createElement('p');
                    let NomProduit = document.createElement('h3');
                    let PrixProduit = document.createElement('p'); 
                    let ChoixOption  = document.createElement('option');                   
                    let TitreListe = document.createElement('label');
                    let SelecteurListe = document.createElement('select');
                    let ChoixQuantite  = document.createElement('option');
                    let TitreQuantite = document.createElement('label'); 
                    let SelecteurQuantite = document.createElement('select');
                    let DivBoutonPanier = document.createElement('div');
                    let BoutonPanier = document.createElement('button');

                    /*Création des noeuds entre les élements*/
                    FicheProduit.appendChild(FicheSectionGlobale);
                    FicheSectionGlobale.appendChild(FicheSectionEntete);
                    FicheSectionGlobale.appendChild(FicheSectionDescription);
                    FicheSectionEntete.appendChild(FicheSectionImage);
                    FicheSectionEntete.appendChild(FicheSectionDetail);
                    FicheSectionImage.appendChild(ImageProduit);
                    FicheSectionDetail.appendChild(NomProduit);
                    FicheSectionDetail.appendChild(PrixProduit);
                    FicheSectionDetail.appendChild(FicheSectionListe);                    
                    FicheSectionListe.appendChild(ChoixOption);
                    FicheSectionListe.appendChild(TitreListe);
                    FicheSectionListe.appendChild(SelecteurListe);             
                    FicheSectionListe.appendChild(ChoixQuantite);
                    FicheSectionListe.appendChild(TitreQuantite);
                    FicheSectionListe.appendChild(SelecteurQuantite);         
                    FicheSectionDetail.appendChild(DivBoutonPanier);
                    DivBoutonPanier.appendChild(BoutonPanier);
                    FicheSectionDescription.appendChild(DescriptionProduit);

                    /*Affection des noms de classes aux éléments*/
                    FicheSectionGlobale.className = 'section_globale_produit';
                    FicheSectionEntete.className = 'section_entete_produit';
                    FicheSectionImage.className = 'section_image_produit';
                    FicheSectionDetail.className = 'section_detail_produit';
                    FicheSectionDescription.className = 'section_description_produit';
                    FicheSectionListe.className = 'section_listes_produit';
                    ImageProduit.className =  'img_produit'; 
                    DescriptionProduit.className = 'desc_produit'; 

                    /*Affectation des attributs aux éléments*/     
                    ImageProduit.setAttribute('src',Camera.imageUrl);
                    NomProduit.textContent = Camera.name;
                    PrixProduit.textContent = Camera.price / 100 +" €";
                    TitreListe.textContent = 'Lentille';
                    TitreQuantite.textContent = 'Quantité'; 
                    BoutonPanier.id = 'ajout_panier'        
                    BoutonPanier.type = 'submit';
                    BoutonPanier.name = 'add';
                    BoutonPanier.textContent = "Ajouter au panier"; 
                    DescriptionProduit.textContent = Camera.description;  

                    
                    /*****Récupération de la liste des options*****/
                    const Lentille = Camera.lenses;
                    /*Parcours de la liste des options  et ajout dans la liste déroulante*/
                    for (let i = 0; i < Lentille.length; i++) {  
                        const selectOption = document.createElement('option');
                        SelecteurListe.appendChild(selectOption);                   
                        selectOption.textContent = Lentille[i];
                        selectOption.setAttribute("value", Lentille[i]);
                    }   
                    
                    /*Boucle d'alimentation de la liste de sélection de la quantité de commande*/
                    for (let j = 1; j < 11; j++) {
                        const SelectQuantite = document.createElement('option');
                        SelecteurQuantite.appendChild(SelectQuantite);
                        SelectQuantite.setAttribute("value", j);
                        SelectQuantite.textContent = j;
                    }
                
                     
                    /*********************AJOUT DU PRODUIT DANS LE PANIER*************************/
                    /*Au clic sur le bouton "Ajouter au panier"*/
                    BoutonPanier.addEventListener("click", function (event) {
                    event.preventDefault();

                        /*Récupération des données du panier contenues dans localStorage*/
                        let ContenuPanier1 = JSON.parse(localStorage.getItem('ArticlePanier'));
                        console.log(ContenuPanier1);
                        console.log(id);

                        let m = 0
                        
                        /****************************Vérification du contenu du panier********************************************************************/
                        /*Si le contenu du panier n'est pas vide*/
                        if (ContenuPanier1){ 

                                /*Boucle sur ContenuPanier1 et récupération de la clé à modifier*/
                                for(var key in ContenuPanier1){

                                    console.log("<p>Key: "+key+" Valeur de nom: "+ContenuPanier1[key].IdCamera+", </p>"); 

                                    /*Si l'index de l'élément du LocalStorage est identique à l'Id du produit sélectionné*/
                                    if (ContenuPanier1[key].IdCamera === id){
                                        m ++

                                        /*Modification de la quantité et du prix du produit à partir de la quantité sélectionnée (Cumul de la quantité déjà présente avec la quantité à ajouter)*/
                                        ContenuPanier1[key].Quantite += parseFloat(SelecteurQuantite.value);
                                        ContenuPanier1[key].PrixCamera = ((ContenuPanier1[key].Quantite) * Camera.price) / 100;

                                        /*Envoi de la modification au LocalStorage*/
                                        localStorage.setItem('ArticlePanier',JSON.stringify(ContenuPanier1));
                                            
                                        /*Choix pour l'utilisateur d'afficher le panier ou de revenir à la page d'accueil*/
                                        if (window.confirm('Le produit '+Camera.name + " " +' a bien été ajouté. Souhaitez vous consulter votre panier ?')) 
                                        { 
                                            window.location.href = "panier.html";
                                            return;
                                        } 
                                        else 
                                        {
                                            window.location.href = "index.html";
                                            return;
                                        };

                                    };                    
                                };
                        }
                        /*Si le contenu du panier est vide*/
                        else
                        {   
                            /*Initialisation du tableau vide pour ajout du 1er élément de panier au LocalStorage*/
                            ContenuPanier1 = []

                            /*Constitution de l'objet JSON à envoyer au LocalStorage*/
                            let CameraAjout =
                            {
                                NomCamera: Camera.name,
                                IdCamera: Camera._id,
                                Quantite: parseFloat(SelecteurQuantite.value), 
                                PrixCamera: ((parseFloat(SelecteurQuantite.value)) * Camera.price) / 100 ,
                            };

                            console.log(CameraAjout);

                            /*Ajout de l'objet JSON dans le tableau*/
                            ContenuPanier1.push(CameraAjout);
                                    
                            /*Ajout du produit au LocalStorage*/        
                            localStorage.setItem('ArticlePanier',JSON.stringify(ContenuPanier1));
                                
                            /*Choix pour l'utilisateur d'afficher le panier ou de revenir à la page d'accueil*/
                            if (window.confirm('Le produit '+Camera.name + " " +' a bien été ajouté. Souhaitez vous consulter votre panier ?')) 
                            { 
                                window.location.href = "panier.html";
                                return;
                            } 
                            else 
                            {
                                window.location.href = "index.html";
                                return;
                            };

                        }
                        /********************************************************************************************************************************/

                        /*****Si le produit sélectionné par l'utilisateur n'était pas déjà présent dans le panier, alors on l'ajoute au LocalStorage*****/
                        if (m == 0) {
                            
                            /*Consitution de l'objet JSON a envoyer au panier*/ 
                            let AjoutProduit =
                            {
                                NomCamera: Camera.name,
                                IdCamera: Camera._id,
                                Quantite: parseFloat(SelecteurQuantite.value), 
                                PrixCamera: ((parseFloat(SelecteurQuantite.value)) * Camera.price) / 100 ,
                            };

                            console.log(AjoutProduit);

                            /*Chargement du produit*/
                            ContenuPanier1.push(AjoutProduit);

                            /*Ajout du produit au LocalStorage*/        
                            localStorage.setItem('ArticlePanier', JSON.stringify(ContenuPanier1));
                            console.log(ContenuPanier1);
                                
                            /*Choix pour l'utilisateur d'afficher le panier ou de revenir à la page d'accueil*/
                            if (window.confirm('Le produit '+Camera.name + " " +' a bien été ajouté. Souhaitez vous consulter votre panier ?')) 
                            { 
                                window.location.href = "panier.html";
                                return;
                            } 
                            else 
                            {
                                window.location.href = "index.html";
                                return;
                            };

                        };
                        /**********************************************************************************************************************************/

                    });                          

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


/*****Recherche du contenu du LocalStorage pour afficher la quantité de produits dans le panier*****/
/*Récupération des données contenues dans localStorage*/
let ContenuPanier = JSON.parse(localStorage.getItem('ArticlePanier'));
console.log(ContenuPanier);

/*Création de la page du récapitulatif panier*/
const QuantitePanier = document.getElementById('index_panier');

const NombreArticles = document.createElement('p');
QuantitePanier.appendChild(NombreArticles);


/*Si le panier est vide, affichage de la quantité 0*/
if(ContenuPanier == null || ContenuPanier.length === 0){   
    
    NombreArticles.textContent = '0';
    
} else {
    /*Si le panier contient des produits, parcours des élements du local storage et affichage du nombre de produits*/
    let i = 0;
    for (Produit of ContenuPanier) {
      
        i=  i + Produit.Quantite;
        NombreArticles.textContent = i;

    };
} 
/***************************************************************************************************/


 