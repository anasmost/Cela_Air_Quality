# AIR QUALITY:

# Technologies:

NodeJS + BD de votre choix (La connexion du service utilise Knex).

# Fonctionnalités:

C'est une API REST chargée d'exposer les informations sur la qualité de l'air d'une ville la plus proche à des coordonnées GPS
en utilisant iqair ( https://www.iqair.com/fr/commercial/air-quality-monitors/airvisual-platform/api ), combinée à un service CRON qui alimente la BD associée avec les mise à jour régulière de la qualité de l'air de Paris.

### API REST

- `/air-quality?lat=[latitude]&lon=[lon]` : requiert 2 arguments à la chaîne de requête et retourne le dernier calcul sur la polution de la ville la plus proche aux coordonnées géographiques renseignées.

La réponse est à l'exemple de ce qui suit :

```
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
```

Si une quelconque erreur s'est produite, la réponse du serveur HTTP a le format suivant :

```
{
"message":"Missing query params : Provide both \"lat\" and \"lon\"",
"statusText":"Bad Request"
}
```

- `/max-timestamp` : retourne le plus récent des moments où la pollution de la ville de Paris à vécu la plus grande valeur de indice "aqius".

### CRON Task

Chaque minute, ce service enrégistre dans la BD la plus récente valeur de l'indice de pollution "aqius" accompagné du moment (timestamp) associé.

# Installation:

1. Configuration:

- s'inscrire sur "iqair" et créer un API KEY ( https://www.iqair.com/fr/dashboard/api )
  - NOTE: L'activation d'une clé peut prendre jusqu'à 5 minutes. ( entretemps, vous pouvez donc prendre un café..sinon un smoothie serait pas mal aussi 🙂 )
- Créer une BD dans le DBMS de votre choix en lui associant un utilisateur propriétaire avec des droits de lecture et écriture nécessaires, les données desquels vous allez mettre dans le fichiers de configuration ".env" tel ce qui suit.
- Ajouter un fichier `.env` à la racine du projet qui contient les données de configuration nécessaire, à savoir :

```
IQAIR_URL=[https://api.airvisual.com/v2/]
IQAIR_KEY=[IQAIR_API_KEY]

DB_PROVIDER= intitulé du serveur DB [pg | pg-native | sqlite3 | mysql | etc] ("pg" = PostgreSQL par défaut, consultez https://knexjs.org/guide/#node-js )
DB_HOST=localhost (Hostname)
DB_PORT=5432 (Port)
DB_NAME=[Nom de la Base de données connectée à ce service, utlisée pour sauvegarder les données Iqair]
DB_USER=[Nom d'utilisateur de ce service]
DB_PASS=[Mot de passe]

PORT=[Port qui sera utilisé par le serveur HTTP de l'API REST]
```

# Tests automatisés

D'abord, Assurez vous que vous exécutez les tests sur un environnement Windows.<br>
Si ce n'est pas le cas ou vous rencontrez un problème lors de l'exécution, remplacez le script "test" dans -package.json- par `NODE_OPTIONS=--experimental-vm-modules npx jest`.<br>
Pour exécuter les tests :<br>

1. `cd <path/to/root/folder>`
2. `npm t`
