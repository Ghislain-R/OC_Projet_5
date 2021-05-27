/*Fonction: Recherche du contenu du LocalStorage pour afficher la quantité de produits dans le panier*****/
function calculpanier() {

    /*Récupération des données contenues dans localStorage*/
    let ContenuPanier = JSON.parse(localStorage.getItem('ArticlePanier'));
    console.log(ContenuPanier);

    /*Création de l'élément du récapitulatif panier*/
    const QuantitePanier = document.getElementById('index_panier');

    const NombreArticles = document.createElement('p');
    QuantitePanier.appendChild(NombreArticles);

    /*Si le panier est vide*/
    if(ContenuPanier == null || ContenuPanier.length === 0){   
        
        NombreArticles.textContent = '0';
        
    } else {
        /*Si le panier contient des produits, parcours des élements du local storage et cumul des quantités de tous les produits*/
        let i = 0;
        for (Produit of ContenuPanier) {      
            i=  i + Produit.Quantite;
            NombreArticles.textContent = i;
        };
    }
}

/*Fonction : Choix pour l'utilisateur d'afficher le panier ou de revenir à la page d'accueil*/
function confirmation(NomCam){
/*L'utilisateur peut choisir d'accéder à la page du panier ou de revenir à la page d'accueil*/    
if (window.confirm('Le produit '+NomCam + " " +' a bien été ajouté. Souhaitez vous consulter votre panier ?'))                                       
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

