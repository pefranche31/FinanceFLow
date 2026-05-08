# FinanceFlow Pro (v2) - Description Technique et Fonctionnelle

## Description Générale

FinanceFlow Pro est une application web de gestion financière personnelle "Single-File" (fichier unique). Elle permet aux utilisateurs de suivre, analyser et optimiser leurs finances en toute confidentialité. La version 2.0 introduit une architecture de stockage robuste basée sur **IndexedDB**, levant les limites de quota des navigateurs, et ajoute des fonctionnalités avancées de comptabilité personnelle.

## Architecture Technique

### Stack Technique

* **Frontend**: React 18 (via CDN) avec Babel Standalone pour la transpilation à la volée.

* **UI Framework**: Tailwind CSS (via CDN) pour le styling réactif et le mode sombre.

* **Visualisation**: Recharts pour les graphiques d'analyse.

* **Traitement de données**: SheetJS (xlsx) pour le parsing des fichiers Excel.

* **Stockage (Nouveau)**: **localForage** servant d'abstraction vers **IndexedDB**. Cela permet un stockage asynchrone de grande capacité (plusieurs centaines de Mo).

* **Build**: Aucun outil de build requis (fonctionne directement en ouvrant le fichier HTML).

### Structure du Code

Le code réside intégralement dans un fichier `index.html` unique :

* **Composants React**: Architecture modulaire (App, StatCard, MultiSelect, Icon...).

* **Hooks**: Utilisation intensive de `useState`, `useEffect`, `useMemo` pour la performance, et `useRef`.

* **Gestion d'état**: État local centralisé, hydraté au démarrage depuis la base de données locale.

* **Routage**: Système de navigation par onglets (Dashboard, Opérations, Paramètres) géré par état.

### Fonctionnalités Techniques Clés

1. **Gestion des Données (Mise à jour v2)**

   * **Stockage Illimité**: Transition de `localStorage` vers `IndexedDB` pour supporter des années d'historique sans erreur "QuotaExceeded".

   * **Migration Automatique**: Algorithme au démarrage détectant les anciennes données `localStorage` pour les migrer vers `IndexedDB` de manière transparente.

   * **Sauvegarde Asynchrone**: Persistance non-bloquante des transactions pour fluidifier l'interface.

2. **Import/Export**

   * Importation intelligente de fichiers Excel (.xlsx) et CSV.

   * **Parsing adaptatif**: Détection automatique des colonnes (Date, Libellé, Montant, Débit/Crédit) selon différents formats bancaires (Standard, CA, Boursorama...).

   * Export/Import complet au format JSON pour les sauvegardes manuelles.

3. **Logique Métier**

   * Gestion des **Binômes** (Rapprochement) : Liaison logique entre deux écritures.

   * Gestion des **Mouvements Internes** : Exclusion optionnelle des statistiques.

   * Calculs de soldes cumulés et de moyennes mensuelles dynamiques.

## Fonctionnalités Utilisateur

### Tableau de Bord

* **Synthèse**: Indicateurs clés (Solde, Entrées, Sorties, Taux d'épargne).

* **Analyse Temporelle**: Graphique en barres de l'évolution mensuelle avec ligne de moyenne.

* **Analyse Structurelle**:

  * Camembert de répartition par Titulaire ou par Compte.

  * Camembert de répartition globale par Catégorie.

* **Filtres Globaux**: Sélection multiple de comptes, période personnalisée (Mois, Trimestre, Année, dates libres).

### Gestion des Opérations

* **Liste Interactive**: Tableau des transactions avec tri dynamique multi-critères.

* **Filtres Avancés**:

  * Recherche textuelle instantanée.

  * Filtre par type (Dépense/Recette).

  * Filtre multi-catégories.

  * **Filtre par Montant** : Recherche par valeur exacte ou plage (Min/Max).

  * **Mode Valeur Absolue** : Option pour trier et filtrer les montants sans tenir compte du signe (utile pour comparer l'ampleur des dépenses et revenus).

  * Filtre par statut (Rapprochés / En attente).

* **Rapprochement Bancaire**: Outil pour lier manuellement deux transactions (ex: virement compte A vers compte B) avec gestion des écarts (dates ou montants légèrement différents).

* **Édition par Lots (Batch Mode)**: Modification massive de la catégorie pour un ensemble de transactions filtrées.

### Paramètres

* **Configuration**: Ajout/Modification/Suppression de comptes (avec couleur et propriétaire) et de catégories.

* **Maintenance**: Outils d'importation, d'exportation de sauvegarde, et de réinitialisation complète (Wipe).

* **Apparence**: Bascule manuelle entre Mode Clair et Mode Sombre.

## Workflow Utilisateur

### Workflow Principal

1. **Initialisation**: Définition des comptes (Perso, Joint, etc.).

2. **Alimentation**: Import des fichiers bancaires ou saisie manuelle.

3. **Organisation**:

   * Catégorisation assistée (saisie rapide ou par lots).

   * Rapprochement des virements internes pour neutraliser les impacts.

4. **Pilotage**: Analyse des tendances via le Dashboard pour ajuster ses dépenses.

## Points Forts

1. **Performance & Robustesse**: Grâce à IndexedDB, l'application est rapide et stable même avec un gros volume de données.

2. **Confidentialité Totale**: "Local-First", aucune donnée ne transite par Internet.

3. **Ergonomie**: Interface moderne (Tailwind), retours visuels (Toasts, Modales), et UX soignée (saisie intuitive).

4. **Autonomie**: Portabilité extrême via un fichier unique, sans dépendance serveur.

## Limitations

1. **Synchronisation**: Pas de synchro automatique entre appareils (nécessite un export/import manuel du JSON).

2. **Navigateur**: Les données sont liées au navigateur spécifique utilisé sur la machine.

3. **Thread Unique**: Le traitement de très gros fichiers Excel (> 10k lignes) peut figer momentanément l'interface (pas de Web Workers implémentés).

## Conclusion

FinanceFlow Pro est passée d'un simple outil de suivi budgétaire à une véritable application de comptabilité personnelle résiliente. L'adoption d'IndexedDB garantit la pérennité des données utilisateur, tandis que les fonctions de rapprochement et de filtrage avancé offrent une précision d'analyse professionnelle, le tout en conservant la simplicité d'un fichier unique.