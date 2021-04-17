/*récupération de l'ID de l'appareil photo*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

const AfficherProduit = async function() {
    /*Récupération des informations de l'appareil photo sélectionné par son id*/
    try {
        let response = await fetch('http://localhost:3000/api/cameras/' + id);
        if (response.ok) {
                let Camera = await response.json();
                console.log(Camera);

                const FicheProduit = document.getElementById('fiche_camera');
            
                /*Création des conteneurs*/
                let FicheSectionGlobale = document.createElement('div');
                let FicheSectionEntete = document.createElement('div');
                let FicheSectionImage = document.createElement('div');
                let FicheSectionDetail = document.createElement('div');
                let FicheSectionDescription = document.createElement('div');
                let FicheSectionListe = document.createElement('div')

                /*Création des éléments de la page*/
                let ImageProduit = document.createElement('img');
                let DescriptionProduit  = document.createElement('p');
                let NomProduit = document.createElement('h3');
                let PrixProduit = document.createElement('p'); 
                let ChoixOption  = document.createElement('option');   
                let BoutonPanier = document.createElement('button');
                let TitreListe = document.createElement('label');
                let SelecteurListe = document.createElement('select');

                let TitreQuantite = document.createElement('label'); /*Selecteur number*/
                let SelecteurQuantite = document.createElement('select'); /*Selecteur number*/

                /*Création des noeuds entre les élements*/
                FicheProduit.appendChild(FicheSectionGlobale);

                FicheSectionGlobale.appendChild(FicheSectionEntete);
                FicheSectionGlobale.appendChild(FicheSectionDescription);

                FicheSectionEntete.appendChild(FicheSectionImage);
                FicheSectionEntete.appendChild(FicheSectionDetail);

                FicheSectionImage.appendChild(ImageProduit);

                FicheSectionDetail.appendChild(NomProduit);
                FicheSectionDetail.appendChild(PrixProduit);
                FicheSectionDetail.appendChild(TitreListe);
                FicheSectionDetail.appendChild(SelecteurListe);
                FicheSectionDetail.appendChild(ChoixOption);
                FicheSectionDetail.appendChild(BoutonPanier);

              
                FicheSectionDetail.appendChild(TitreQuantite);/*Selecteur number*/
                FicheSectionDetail.appendChild(SelecteurQuantite);/*Selecteur number*/
                

                FicheSectionDescription.appendChild(DescriptionProduit);

                /*Ajout des attributs aux éléments*/
                FicheSectionGlobale.className = 'section_globale_produit';
                FicheSectionEntete.className = 'section_entete_produit';
                FicheSectionImage.className = 'section_image_produit';
                FicheSectionDetail.className = 'section_detail_produit';
                FicheSectionDescription.className = 'section_description_produit'

                ImageProduit.className =  'img_produit'; 
                DescriptionProduit.className = 'desc_produit';        
                    
                ImageProduit.setAttribute('src',Camera.imageUrl);
                NomProduit.textContent = Camera.name;
                PrixProduit.textContent = Camera.price / 100 +" €";
                TitreListe.textContent = 'Lentille';
                TitreQuantite.textContent = 'Quantité';
 
                BoutonPanier.id = 'ajout_panier'        
                BoutonPanier.type = 'submit';
                BoutonPanier.name = 'add';
                /*BoutonPanier.id = 'submit';*/
                BoutonPanier.textContent = "Ajouter au panier"; 

                DescriptionProduit.textContent = Camera.description;  

              
                /*Récupération de la liste des options*/
                const Lentille = Camera.lenses;
                
                for (let i = 0; i < Lentille.length; i++) {  
                const selectOption = document.createElement('option');
                SelecteurListe.appendChild(selectOption);                   
                selectOption.textContent = Lentille[i];
                selectOption.setAttribute("value", Lentille[i]);
                }   

                for (let j = 1; j < 11; j++) {
                    const SelectQuantite = document.createElement('option');
                    SelecteurQuantite.appendChild(SelectQuantite);
                    SelectQuantite.setAttribute("value", j);
                    SelectQuantite.textContent = j;
                }
        
                /*****************************************************************************/
                /*********************AJOUT DU PRODUIT DANS LE PANIER*************************/
                /*****************************************************************************/
                /*Au clic sur le bouton "Ajouter au panier", stockage de l'article dans LocalStorage*/
                BoutonPanier.addEventListener("click", function (event) {
                event.preventDefault();

                /****************************************************************/
                /*************Gestion quantité multiples dans le panier***********/


                /*************Récupération des données contenues dans localStorage*/
                let ContenuPanier1 = JSON.parse(localStorage.getItem('ArticlePanier'));
                console.log(ContenuPanier1);     

                

                /****************************************************************** */
                  
                console.log(id);
                /*Initialisation du nouveau tableau qui sera envoyé au local storage*/  
                let ContenuPanier2 = [];
                
                /*Initialisation de la variable pour cumuler les quantités du produit affiché présent dans le local storage*/
                let QuantiteProduitPanierExistante = 0

                /*Si le LocalStorage actuel contient des éléménts*/
                if (ContenuPanier1) {

                    for (Toto of ContenuPanier1)
                    {  
                    /*Récupération de l'index de la ligne lue*/
                    console.log(ContenuPanier1.indexOf(Toto.IdCamera));

                    /*Récupération de l'IdCamera de la ligne lue*/
                    var un_objet= Toto

                    var la_valeur = Toto.IdCamera; 
                    console.log(la_valeur);

                        /*Comparaisons de l'IdCamera de la ligne lue avec l'Id du produit en cours affiché sur la page*/
                        /*Si les 2 Id sont identique, on ne reprend pas le produit, on incrémente sa quantité déjà présente dans le panier*/
                        if (la_valeur === id)                   
                        {
                          QuantiteProduitPanierExistante += Toto.Quantite
                          console.log(la_valeur+"/"+id+" sont égaux");
                        }
                        /*Si les 2 Id ne sont pas identique, on reprend le produit*/
                        else {
                            /*On récupère les informations du produit*/
                            let CameraSelection1 = 
                            {
                                NomCamera: Toto.NomCamera,
                                IdCamera: Toto.IdCamera,
                                /*LentilleCamera: select.value,*/
                                Quantite: Toto.Quantite,
                                PrixCamera: Toto.PrixCamera,
                            };

                            console.log(CameraSelection1);
                            /*On envoie le produit dans le tableau qui sera envoyé au LocalStorage*/ 
                            ContenuPanier2.push(CameraSelection1);
                        };

                    };
                

                }
                /*Si le LocalStorage actuel est vide*/
                else 
                {
                  /*Aucun Contrôle, le produit sélectionné va être ajouté au LocalStorage*/
                };


                /*On Ajoute le produit en cours affiché en additionnant la quantité ajoutée à celle déjà présente dans le panier*/
                let CameraSelectionEnCours  = 
                {
                  NomCamera: Camera.name,
                  IdCamera: Camera._id,
                  Quantite: QuantiteProduitPanierExistante + parseFloat(SelecteurQuantite.value),  /*A modifier, ajouter la quantité saisie dans la page*/
                  PrixCamera: ((QuantiteProduitPanierExistante + parseFloat(SelecteurQuantite.value)) * Camera.price) / 100 ,
                };

                /*On envoie le produit dans le tableau qui sera envoyé au LocalStorage*/ 
                ContenuPanier2.push(CameraSelectionEnCours);
              
                console.log(ContenuPanier2);


                /*On supprime la clé ArticlePanier du LocalStorage*/   
                localStorage.removeItem('ArticlePanier') 
                  
                /*On recréé la clé ArticlePanier dans le LocalStorage avec le nouveau tableau des produits créé (ContenuPanier2)*/
                localStorage.setItem('ArticlePanier', JSON.stringify(ContenuPanier2));
                console.log(ContenuPanier2);
               /* JSON.parse(localStorage.getItem('ArticlePanier'));*/
                /************************************************************************** */
                if (window.confirm(Camera.name + " " +' a bien été ajouté. Souhaitez vous consulter votre panier ?')) 
                { 
                  window.location.href = "panier.html";
                } 
                else 
                {
                  window.location.href = "index.html";
                };




                /*stockage des données du/de la camera dans localStorage*/
               /* let CameraSelection = {
                NomCamera: Camera.name,
                IdCamera: Camera._id,*/
                /*LentilleCamera: select.value,*/
                /*Quantite: 2,
                PrixCamera: (Camera.price * 2)  / 100,
                };
                console.log(CameraSelection);*/

                /*let ContenuPanier = JSON.parse(localStorage.getItem('ArticlePanier'));
                if(ContenuPanier) {
                    ContenuPanier.push(CameraSelection);
                    localStorage.setItem('ArticlePanier', JSON.stringify(ContenuPanier));
                    console.log(ContenuPanier);
                if (window.confirm(Camera.name + " " +' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                    window.location.href = "panier.html";
                } else {
                    window.location.href = "index.html";
                }
                } else {
                    ContenuPanier = [];
                    ContenuPanier.push(CameraSelection);
                    localStorage.setItem('ArticlePanier', JSON.stringify(ContenuPanier));
                    console.log(ContenuPanier);
                if (window.confirm(Camera.name + " " +' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                    window.location.href = "panier.html";
                } else {
                    window.location.href = "index.html";
                }
                }*/
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


/*******************************************************************************************/
/*Recherche du contenu du LocalStorage pour afficher la quantité de produits dans le panier*/
/*******************************************************************************************/
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
/*******************************************************************************************/
/*******************************************************************************************/
/*******************************************************************************************/

 