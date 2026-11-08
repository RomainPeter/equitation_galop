# Équi — Mon premier Galop

Application indépendante, non officielle.

## Version photographique séparée
Branche `feat/photos-pedagogiques`, issue de `main`. 13 photos locales : 3 chevaux par robe de base (cours, entraînement et test distincts), 4 outils de pansage. Les autres schémas restent présents. Crédits et préparation hors ligne dans l’espace Parent.

## Aperçu local

```powershell
node tools/serve.cjs
```

Ouvrir <http://127.0.0.1:8766>. Le serveur ne nécessite aucune dépendance. Aucun aperçu distant séparé n’est configuré. La publication GitHub Pages existante n’est pas changée par cette branche.

Voir [le bilan détaillé, les sources, les limites et les captures](docs/photos-pedagogiques.md).

## Tablette
Ouvrir le site dans Edge Android et utiliser la commande d’installation ou d’ajout à l’écran d’accueil disponible dans cette version du navigateur. Tester ensuite en mode avion. Les voix distantes ne deviennent pas disponibles hors ligne.

## Mises à jour
Incrémenter la version du cache photographique dans `sw.js` après modification des fichiers. Ouvrir avec Internet, fermer les anciens onglets et rouvrir pour activer une version en attente. Vérifier le message « Prête hors ligne » dans Parent. La voix peut encore dépendre d’Internet.

## Progression
Les données restent dans le navigateur. Utiliser l’export/import de l’application pour les sauvegarder. Aucun compte ni microphone.
