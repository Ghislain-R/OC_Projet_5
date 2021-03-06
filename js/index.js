/*Excection de la fonction de récupération de la liste des caméras*/
const RecupCameras =  async function() {
    /*Récupération des données de l'API*/
    try {
        /*Execution de la requête GET*/
        let response = await fetch('http://localhost:3000/api/cameras');

        /*Si la réponse est OK, récupération de la liste des produits*/
        if (response.ok) {

            let ListeCameras = await response.json();
            console.log(ListeCameras);

	        /*Boucle de parcours sur la liste des éléments JSON renvoyés par l'AP*/
            for (let Camera of ListeCameras) {
                const CameraDiv = document.getElementById('liste_cameras');

                const CameraSection = document.createElement('section');
                CameraDiv.appendChild(CameraSection);
                CameraSection.className = 'camera';
        
                /*Création du lien vers la page produit.html avec l'ID du produit*/
                const productLink = document.createElement("a");
                productLink.href = "produit.html?id=" + Camera._id;
                CameraSection.appendChild(productLink);
                productLink.className = 'section_zoom';
                productLink.setAttribute('title',Camera.name);
        
                /*Ajout de l'image avec les attributs (src, alt et title)*/
                const CameraImg = document.createElement('img');
                productLink.appendChild(CameraImg);
                CameraImg.setAttribute('src', Camera.imageUrl);
                CameraImg.setAttribute('alt', 'Appareil photo ' + Camera.name);
                CameraImg.setAttribute('title', 'Appareil photo ' + Camera.name);
        
                /*Création d'une div (CameraRef) avec les informations nom et prix du produit*/
                const CameraRef = document.createElement('div');
                productLink.appendChild(CameraRef);
                CameraRef.className = 'camera_ref';
        
                /*Ajout d'une balise h3 pour afficher le nom du produit*/
                const h3CameraRef = document.createElement('h3');
                CameraRef.appendChild(h3CameraRef);
                h3CameraRef.textContent = Camera.name;
        
                /*Ajout d'une balise p pour afficher le prix du produit*/
                const pCameraRef = document.createElement('p');
                CameraRef.appendChild(pCameraRef);
                pCameraRef.textContent = Camera.price / 100 + " €";
            }
        } else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    } catch (error) {
        alert("Erreur : " + error);
    }
}

/*Appel de la fonction RecupCameras*/
RecupCameras();

/*Appel de la fonction calculpanier (Détermination de la quantité de produits dans le panier*/
calculpanier();


