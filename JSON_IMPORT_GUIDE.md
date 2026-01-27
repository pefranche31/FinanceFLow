# Guide d'Import JSON pour FinanceFlow

## Problème Identifié

Votre fichier JSON `financeflow_export_all_2026-01-18.json` est trop volumineux pour être importé directement dans l'application. Cela est dû à la limite de stockage du navigateur (localStorage) qui est généralement limitée à environ 5MB par domaine.

## Solutions Disponibles

### 1. Utiliser l'Outil de Division (Recommandé)

Nous avons créé un outil pour diviser automatiquement votre fichier en parties plus petites :

```bash
node split_json_tool.js financeflow_export_all_2026-01-18.json export_part 1000
```

Cet outil a déjà été exécuté et a généré 3 fichiers :
- `export_part_1.json` (1000 transactions)
- `export_part_2.json` (1000 transactions) 
- `export_part_3.json` (434 transactions)

### 2. Procédure d'Import

1. **Ouvrez l'application FinanceFlow** dans votre navigateur
2. **Allez dans Paramètres** > "Données & Maintenance"
3. **Cliquez sur "Importer écritures"**
4. **Sélectionnez l'onglet "JSON"**
5. **Importation par parties** :
   - Commencez par `export_part_1.json`
   - Attendez la confirmation de succès
   - Continuez avec `export_part_2.json`
   - Terminez avec `export_part_3.json`

### 3. Vérification

Après l'import de toutes les parties :
- Allez dans "Opérations" pour voir toutes vos transactions
- Vérifiez que le nombre total de transactions est bien de 2434
- Les comptes, catégories et budgets ont été importés automatiquement

## Alternative : Import Partiel

Si vous ne souhaitez pas importer toutes les transactions, vous pouvez :

1. **Créer un fichier plus petit** en utilisant l'outil de division avec un batch size plus petit
2. **Exporter vos données actuelles** avant d'importer le nouveau fichier
3. **Importer uniquement les transactions récentes** en créant un fichier filtré

## Support

Si vous rencontrez des problèmes :
- Vérifiez que les fichiers JSON sont valides
- Assurez-vous que l'application a suffisamment d'espace de stockage
- Essayez avec un navigateur différent (Chrome, Firefox, Edge)

## Informations Techniques

- **Limite de taille** : ~4MB par fichier
- **Format requis** : JSON valide avec transactions, categories, accounts, budgets
- **Fusion automatique** : Les données existantes ne sont pas écrasées

🎉 **Vos données sont maintenant prêtes à être importées sans problème de taille !**