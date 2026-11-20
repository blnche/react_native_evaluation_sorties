<style>@page { margin: 13mm 16mm; } h1 { margin-top: 0; } h2 { margin-top: 14px; }</style>

# Projet final — Variante C : « Mes sorties »

**En binôme** (un trinôme si nécessaire). Expo SDK 58, Expo Go. Vous pouvez partir du code vu en cours ou d'un projet neuf.

## Déroulé

| Heure | Étape |
|---|---|
| 9 h 00 | Présentation du sujet, constitution des binômes |
| 9 h 20 – 12 h 30 | Développement |
| **12 h 30** | **Rendu du code : plus aucune modification après cette heure** |
| 13 h 30 – 13 h 50 | Réflexion en binôme sur un extrait de code (20 min, sans ordinateur) |
| 14 h 00 – 16 h 00 | Reviews : environ 12 min par binôme, démo sur téléphone et questions |

<img src="file:///Users/fabricegouedard/Mille M Dropbox/1000FG/FORMATIONS/SupdeVinci/2026-2027/cours/expo-react-native-nov-26/Évaluation 2026/qr-depot.svg" style="float:right;width:28mm;margin:0 0 4px 10px">**Rendu avant 12 h 30**, par le lien de dépôt (ou le QR code ci-contre) : [https://www.dropbox.com/request/xyk8oftwdjx16pu7g56s](https://www.dropbox.com/request/xyk8oftwdjx16pu7g56s). Un zip par binôme, **sans `node_modules`** (moins de 5 Mo), nommé avec **la lettre de votre variante (C)** puis vos noms : `C-nom1-nom2.zip`. Si vous déposez plusieurs fois, c'est le dernier dépôt avant 12 h 30 qui compte. L'app doit se lancer avec `npm install` puis `npx expo start`. **Testez-la sur téléphone avant 12 h 30.**

## Fichiers fournis (ne pas les modifier)

- `src/data/sorties.js` : 12 sorties (id, titre, catégorie, date, lieu, prix, places restantes, image, description). Certains éléments n'ont **pas d'image**.
- `src/api/sorties.js` : une API simulée qui se comporte comme un vrai serveur :
  - `chargerSorties()` : tous les éléments. Le mode se choisit avec `choisirMode("succes" | "lent" | "vide" | "erreur500")` ; l'erreur 500 est ponctuelle ;
  - `chargerSortie(id)` : un élément ; un id inconnu lève une erreur `"introuvable"` ;
  - `rechercherParCategorie(categorie)` : les éléments d'une catégorie (ou `"Toutes"`) ; le délai de réponse est **aléatoire**.

## Ce que l'app doit faire (dans cet ordre)

### 1. Navigation
- Deux onglets : **Sorties** et **Favoris**. (Le troisième onglet, **Réservations**, vient avec le bonus.)
- Dans l'onglet Sorties, une **pile** : la liste, puis la fiche, `sorties/[id]`.
- La fiche se charge **à partir de l'id de l'adresse**. L'adresse `/sorties/S03` ouverte directement affiche le trail des remparts. Un id inconnu affiche un message clair et un moyen d'en sortir.

### 2. Liste et réseau
- La liste affiche les **quatre états** : chargement, erreur avec **Réessayer**, liste vide, succès. Un moyen de choisir le mode de l'API (pour la démo).
- Des boutons de **catégorie** (Toutes, Concert, Expo, Sport) qui utilisent `rechercherParCategorie`. En touchant vite plusieurs catégories, l'écran doit **toujours** afficher la dernière catégorie demandée.

### 3. Favoris partagés
- Un cœur sur chaque élément, dans la liste et sur la fiche. L'onglet **Favoris** affiche les éléments marqués ; un changement fait à un endroit se voit partout.
- Les favoris vivent dans un **store Zustand**.

### Bonus — Réservations (jusqu'à +2 points)
*Seulement quand les parties 1 à 3 marchent.* Ajoutez un onglet **Réservations**.

- Sur la fiche, un formulaire **« Réserver »** : **nom** et **nombre de places**.
- Validation : nom obligatoire, nombre entier de 1 aux **places restantes**. Une sortie complète (0 place) affiche « Complet » sans formulaire. Messages d'erreur visibles.
- L'onglet **Réservations** affiche les réservations (sortie, nom, places, total en euros). On peut **annuler** une réservation.
- Le formulaire reste utilisable quand le clavier est ouvert.

**Qualité attendue partout** : `FlatList` avec des clés stables ; rien sous l'encoche, la barre de statut ou les onglets ; un élément sans image s'affiche proprement ; des composants lisibles aux noms clairs.

**D'autres idées si vous avez tout fini** (non notées) : Mettre à jour les places restantes affichées après une réservation ; trier par date. Garder les favoris après fermeture (AsyncStorage).

## Notation sur 20

| Partie | Points |
|---|---|
| **Projet en binôme** : navigation (3), liste et réseau (4), favoris (3). Bonus réservations : jusqu'à +2, qui compensent des points perdus ailleurs (maximum 10) | 10 |
| **Questions orales sur votre code**, individuelles | 5 |
| **Extrait de code** : réponse écrite en binôme, puis chacun explique seul une question à l’oral | 5 |

Mieux vaut trois parties qui marchent et que vous comprenez qu'un bonus à moitié fait. À la review, **chacun** doit pouvoir expliquer n'importe quelle partie du projet ; on parlera de votre code et des grands principes vus en cours.
