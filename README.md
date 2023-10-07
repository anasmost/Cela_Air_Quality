# Mini-Projet "AIR QUALITY":
# But:
Création d'un API REST en Node Js.

# Contexte:
Le but de ce projet est de créer un API REST chargé d'exposer les informations sur la qualité de l'air d'une ville la plus proche à des coordonnées GPS
en utilisant iqair ( https://www.iqair.com/fr/commercial/air-quality-monitors/airvisual-platform/api )


# Tâches:

1. Configuration:
-   s'inscrire sur "iqair" et créer un API KEY ( https://www.iqair.com/fr/dashboard/api )
    -   NOTE: L'activation d'une clé peut prendre jusqu'à 5 minutes. ( entretemps, vous pouvez donc prendre un café..sinon un smoothie serait pas mal aussi 🙂 )
-   tester la récupération de la qualité de l'air ( https://api-docs.iqair.com/ par longitude/latitude ) sur Postman/Insomnia ( ou CURL si vous êtes fan de ligne de commande )
    -   l'endpoint ``v2/nearest_city`` de l'API iqair

2. Intégration:
-   créer un API REST Node Js ( vous êtes libre de choisir le framework )
-   créer un endpoint ( à vous de décider du nom de ROUTE ) 
    -   paramètre: les coordonnées longitude et latitude
    -   dans cet endpoint, le serveur doit faire appel à l'api d'IQAIR pour récupérer la qualité de l'air ( à voir "nearest_city" dans leur documentation ) et retourner le format ci-dessous:
    
    {
        "result":{
            "pollution": {
                "ts": "2019-08-04T01:00:00.000Z",
                "aqius": 55,
                "mainus": "p2",
                "aqicn": 20,
                "maincn": "p2"
            }
        }
    }

3. CRON:
-   implémenter un CRON qui va vérifier la qualité de l'air de Paris ( lat: 48.856613 long: 2.352222 ) toutes les minutes ( et le stocker dans la base ) + stocker aussi le date/time de la qualité de l'air.

-   ( optionel: ) ajouter un endpoint qui va retourner la DATETIME où la ville de Paris est la plus polluée ( en se basant sur les données collectées via le CRON )
 
Les données doivent être stockés en BDD ( libre à vous de définir la techno )
-   Ces implémentations doivent être documentés;

## Point bonus:
-   Documentation
-   tests unitaires / intégrations
-   Docker/Makefile
