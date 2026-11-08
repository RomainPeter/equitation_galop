# Équi — version photographique du 8 novembre 2026

## Séparation de la version utilisée

Travail sur `feat/photos-pedagogiques`, depuis `main` au commit `82fa51b3645f41fe25b556527f3413048c787c86`.
Ni fusion dans `main`, ni changement de configuration GitHub Pages. `index.html`, le manifeste et l’icône restent identiques. Le répertoire voisin « Version de base » est conservé intact.

Aucun aperçu distant séparé n’est configuré dans ce dépôt : pas de workflow de prévisualisation ni de déploiement ajouté. Une branche GitHub ne publie pas automatiquement une deuxième application.

## Ouvrir la version

Depuis le dossier de ce dépôt sur la branche photographique :

```powershell
node tools/serve.cjs
```

Puis ouvrir <http://127.0.0.1:8766>. Node est nécessaire pour ce serveur, aucune dépendance ne l’est. Autre possibilité : `python -m http.server 8767`, puis <http://localhost:8767>.

Une tablette ne peut pas joindre l’adresse `127.0.0.1` du PC. Les contrôles décrits ici sont effectués dans Edge de bureau. Un véritable essai sur la Galaxy et un hébergement HTTPS séparé restent à prévoir.

## Périmètre confirmé dans le code

21 chapitres, 178 notions (139 G1, 39 bonus), trois modes distincts, 46 repères sur schémas, 29 entrées du carnet pratique, export/import local et synthèse vocale. L’interface réelle est dans `Equi.html`, l’enveloppe publiée dans `index.html`.

## Modifications pédagogiques

| Chapitre | Changement |
| --- | --- |
| Les trois robes de base | Photos réelles pour noir, alezan et bai en cours, exercices et corrections ; comparaison photographique bai/alezan dans `robes_04` ; précision sur les marques blanches. |
| Les outils du pansage (bonus) | Photos d’une étrille en caoutchouc, d’un bouchon, d’une brosse douce et d’un cure-pied. Les autres notions de ce chapitre gardent leur présentation initiale. |

Les trois questions de reconnaissance des robes disent maintenant « Touche le cheval noir / alezan / bai » pour corriger l’accord grammatical de l’ancienne consigne. Aucun changement de classement G1/bonus ou d’identifiant.

Le cours utilise le cheval `1` de chaque robe, l’entraînement et l’exercice intégré utilisent le cheval `2`, le test autonome utilise le cheval `3`. Le test ne reprend donc aucun des six chevaux montrés dans le cours ou l’entraînement. Les propositions sont mélangées à chaque question. Les corrections immédiates montrent le cheval de l’exercice ; les corrections finales du test montrent celui du test.

Les quatre outils ont chacun **une seule photographie**, réutilisée entre les modes. Il ne s’agit donc pas d’une évaluation de transfert entre plusieurs modèles de brosses. La dureté des poils ne se prouve pas sur une photo : une comparaison au toucher, avec l’enseignant, est explicitement proposée.

Les photos sont entières, affichées avec `object-fit: contain` : pas de coupe des crins ou des membres par un cadrage décoratif. Images en une colonne sur petit écran et deux colonnes à partir de 560 px. Boutons d’écoute de 48 px minimum. Aucun texte de consigne n’est posé sur l’image.

Les légendes d’exercice contiennent seulement l’auteur et la licence. Les textes alternatifs sont neutres (« Photographie à observer »), aucun titre de photo ne révèle la robe, les boutons audio lisent seulement le numéro de l’image. Les titres, sources et explications détaillées restent disponibles dans les leçons, corrections et crédits Parent. Les fichiers ont des identifiants neutres.

## Inventaire et droits

**13 photographies, 9 chevaux distincts, 4 outils distincts.** Consultation de la page individuelle de chaque fichier, sélection de sa licence propre, et examen visuel avant intégration. La classification repose sur la description ou les catégories de Commons **et** sur les critères visibles, jamais sur le seul nom du fichier. Il ne s’agit pas d’une validation vétérinaire ou génétique des robes.

| Identifiant | Sujet / usage | Auteur | Licence retenue | Source |
| --- | --- | --- | --- | --- |
| n1 | Noir, cours | Renato Mitra | CC BY-SA 2.0 | [ArabianSahid](https://commons.wikimedia.org/wiki/File:ArabianSahid.jpg) |
| n2 | Noir, entraînement | Tsaag Valren | CC BY-SA 4.0 | [Cheval crétois noir](https://commons.wikimedia.org/wiki/File:Cheval_cr%C3%A9tois_noir_-_Grillos_stables.jpg) |
| n3 | Noir, test | Ramón | CC BY-SA 2.0 | [Asturcon](https://commons.wikimedia.org/wiki/File:Asturcon.jpg) |
| a1 | Alezan, cours | PaintHorseGal | CC BY-SA 4.0 | [Chestnut mare](https://commons.wikimedia.org/wiki/File:Chestnut_mare.png) |
| a2 | Alezan, entraînement | Judi17 | CC BY-SA 2.0 | [Chestnut horse](https://commons.wikimedia.org/wiki/File:Chestnut_horse.jpg) |
| a3 | Alezan, test | IssamBarhoumi | CC BY-SA 4.0 | [Defia, jument Barbe](https://commons.wikimedia.org/wiki/File:Barbe_Horse_01.jpg) |
| b1 | Bai, cours | evelynbelgium | CC BY-SA 2.0 | [American quarter horse](https://commons.wikimedia.org/wiki/File:American_quarter_horse.jpg) |
| b2 | Bai, entraînement | Peter Broster | CC BY 2.0 | [Bay Horse, vallée de Rhyader](https://commons.wikimedia.org/wiki/File:Bay_Horse_%286014766934%29.jpg) |
| b3 | Bai, test | Jean | CC BY 2.0 | [Bay Horse](https://commons.wikimedia.org/wiki/File:Bay_Horse_%282902721873%29.jpg) |
| o1–o4 | Étrille, bouchon, brosse douce, cure-pied | Suzelfe | CC BY-SA 3.0 | Voir les quatre sources individuelles dans [credits.json](../assets/photos/credits.json) |

Les versions adaptées restent sous **la même licence que leur original**. Attribution visible, liens vers sources et licences dans Parent → Crédits photographiques, description des transformations dans l’inventaire. Les [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/), [3.0](https://creativecommons.org/licenses/by-sa/3.0/) et [4.0](https://creativecommons.org/licenses/by-sa/4.0/) permettent le partage et l’adaptation avec leurs conditions respectives.

Réduction proportionnelle à 1000 × 800 maximum, orientation EXIF si nécessaire, conversion WebP qualité 88 via une copie JPEG de travail. Aucune recoloration, aucun filtre, aucun recadrage. Certains téléchargements d’originaux ont été refusés par Commons ; l’aperçu officiel de la même page a alors servi de source de pixels. L’URL de l’original est conservée pour vérification. Le résultat local est la version effectivement utilisée dans l’application.

Poids des 13 WebP : **2 355 280 octets (2,36 Mo / 2,25 Mio)**. Les captures documentaires ne sont pas préchargées par l’application. Aucun hotlink ni clé API.

Exemples écartés : `Black horse.JPG` décrit en réalité un gris ; `Friesenstute.jpg` comporte un filigrane ; `Blackfinnhorse.jpg` montre une tonte rendant la lecture de la robe trompeuse ; `BayMare.jpg` coupe les pieds ; plusieurs portraits ne montrent pas suffisamment les membres. Pas de médias générés artificiellement.

## Schémas conservés et suites possibles

- Anatomie et détails du matériel : repères numérotés et schémas conservés. Aucun point anatomique ajouté sur photo.
- Allures : rythmes et explications conservés ; une photo fixe ne valide pas le mouvement.
- Comportement et sécurité : scénarios conservés, aucune émotion déduite d’une seule oreille photographiée.
- Aliments, notamment foin/paille : schémas et nuances existantes conservés. Une future série devra rendre la structure visible et varier les échantillons, sans dépendre de leur seule couleur.
- Robes bonus gris/pie/tacheté, espaces du club, vues d’ensemble du matériel : non photographiés dans cette itération. Leurs illustrations existantes restent présentes.

## Hors-ligne et mises à jour

Cache distinct `equi-photos:<chemin du site>:v1`, inventaire chargé depuis `credits.json`. Installation complète de l’application et des 13 photos avant activation. Suppression limitée aux anciens caches de ce même espace photographique ; les caches `equi-galop-v1` et d’autres applications sont préservés.

Le service worker sert une version cohérente depuis son cache. Pour une prochaine modification, **incrémenter la version de cache** dans `sw.js`. Ouvrir avec Internet, utiliser « Vérifier les mises à jour » dans Parent, fermer les onglets de l’application puis rouvrir pour activer une version en attente. Attendre « Prête hors ligne » dans Parent. Un échec de téléchargement laisse la nouvelle version non activée.

Le cache des images ne garantit pas une voix française hors connexion. La voix dépend du navigateur et des langues installées.

## Sauvegardes

La clé locale `equiCompleteV1`, les identifiants des 178 notions et le format `equi-complete-1` sont conservés. Aucune migration nécessaire depuis le `main` inspecté. Un autre domaine ou port possède son propre stockage : utiliser l’export/import pour transférer la progression entre le site actuel et un aperçu séparé.

## Vérifications réalisées

Edge de bureau en mode automatisé, fenêtres de 390, 600 et 800 px. Résultat détaillé : [verification-photos.json](verification-photos.json).

- Ouverture des 178 leçons, réponse correcte à leurs 178 questions, sélection et validation, corrections immédiates et chargement des images affichées.
- Contrôle des rôles cours/entraînement/test pour chaque robe et des annonces audio neutres des options photographiques.
- Bilan d’un test autonome de 5 questions avec une erreur volontaire, score 4/5, correction finale et reprise de cette seule erreur.
- Export/import réel via les boutons : statistiques conservées.
- Accès aux 13 crédits, décodage des 13 photos, aucune erreur JavaScript ni réponse HTTP locale en échec dans les parcours normaux.
- Absence de débordement horizontal aux trois largeurs sur accueil, Parent, crédits, cours, quiz, outils et préparation du test ; contrôle des boutons de choix et d’écoute.
- Première ouverture connectée, installation du service worker, passage hors ligne, rechargement du lanceur avec son iframe, ouverture de photos et de crédits sans réseau, message de téléchargement complet.
- Vérification de la conservation des caches étrangers et de l’ancien cache publié, suppression d’un cache photo obsolète.
- Échec de photo simulé séparément : message de récupération visible.
- Contrôle visuel des captures de la leçon, du quiz, de la correction et du cure-pied.

Pour reproduire les vérifications :

```powershell
npm install --no-save --package-lock=false playwright
node tools/test_photos.cjs
```

Le test utilise Microsoft Edge installé sur Windows et démarre son propre serveur local.

Non vérifiés : utilisation tactile et rendu physique sur Samsung Galaxy, qualité sonore réelle des voix, voix en mode avion sur Android, installation effective depuis Edge Android, cycle complet d’une deuxième version distante en attente. Le test vocal vérifie le texte soumis à la synthèse ; il ne juge pas la prononciation. Trois chevaux par robe restent un petit échantillon et ne garantissent pas la reconnaissance de toutes les variations réelles.

## Captures

- [Leçon sur le bai](captures/01-lecon-bai.png)
- [Quiz photographique](captures/02-quiz-photos.png)
- [Correction pédagogique](captures/03-correction.png)
- [Autre chapitre : cure-pied](captures/04-cure-pied.png)
