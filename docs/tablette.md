# Affichage tablette horizontal

Le mode paysage s’active à partir de 900 pixels de largeur. La navigation reste à gauche ; leçon et illustration sont côte à côte ; les propositions photographiques et la validation tiennent dans le même écran. Le style pastel, les cartes et les formes arrondies sont conservés.

Les collections et pages longues (chapitres, Parent, crédits, préparation du test, recherche, carnet et sources) utilisent des écrans successifs avec « Précédent / Suivant ». Les contrôles restent dans le document : les sélections de chapitres ne sont pas perdues en changeant de page. Le portrait conserve sa disposition fluide avec défilement.

Les sources détaillées et le zoom d’un schéma s’ouvrent volontairement en grand et peuvent nécessiter un défilement interne. Le bouton permettant de réduire le schéma reste accessible. Les interfaces de l’enfant en affichage normal ne nécessitent pas de défilement aux dimensions vérifiées.

Vérification dans Edge de bureau : 1280 × 800 et 1024 × 600, 178 notions dans les trois phases leçon/question/correction, pages des menus et pages adultes. Rapport : `verification-tablette.json` (1 233 contrôles, aucun dépassement détecté, aucune erreur JavaScript). Vérification supplémentaire des boutons, d’une réponse correcte, du bilan et de la rotation vers le portrait. Ce contrôle ne constitue pas un essai sur une Samsung physique.

Le service worker passe à `v2` et conserve les nouveaux fichiers `tablet.js` et `tablet.css` hors ligne. Pour recevoir la mise à jour : ouvrir avec Internet, fermer les onglets de l’application puis la rouvrir.

Captures : [leçon](captures/tablette-lecon.png), [quiz](captures/tablette-quiz.png), [schéma sur petit écran paysage](captures/tablette-schema.png).

## Correction de la première page des menus

Les longues listes sont désormais découpées avant de passer à une nouvelle page : les premiers chapitres restent avec leur titre. Les pages réellement vides sont supprimées. Contrôle par clics réels sur J’apprends et Je m’entraîne à 1280 × 800 et 1024 × 600 : chapitres présents immédiatement, 15 chapitres conservés, pages du catalogue non vides et sans débordement ; contrôle des autres menus. Test reproductible : `node tools/test_tablet_menus.cjs`. Cache actualisé en v3.
