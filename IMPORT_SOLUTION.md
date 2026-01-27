# Solution pour l'Erreur de Quota LocalStorage

## Problème Identifié

Vous rencontrez l'erreur suivante lors de l'import :
```
QuotaExceededError: Failed to execute 'setItem' on 'Storage': Setting the value of 'bt_transactions' exceeded the quota.
```

Cela signifie que votre navigateur a atteint la limite de stockage du localStorage (généralement ~5MB).

## Cause Principale

Le problème ne vient pas de la taille de votre fichier d'import (551KB), mais du fait que vous avez déjà beaucoup de données dans l'application. Lorsque vous essayez d'ajouter les nouvelles transactions aux données existantes, cela dépasse la limite totale.

## Solution Implémentée

L'application propose maintenant deux modes d'import :

### 1. Mode Fusion (par défaut)
- **Ajoute** les nouvelles transactions aux données existantes
- **Conserve** vos données actuelles
- **Nécessite** suffisamment d'espace disponible

### 2. Mode Remplacement (nouveau)
- **Remplace** complètement les données existantes
- **Libère** de l'espace en supprimant les anciennes données
- **Solution** lorsque le quota est atteint

## Comment Utiliser le Mode Remplacement

1. **Lancez l'import** comme d'habitude
2. **Si l'espace est insuffisant**, l'application affichera une boîte de dialogue :
   ```
   ⚠️ Espace insuffisant dans le stockage local!
   
   Espace actuellement utilisé: X.XMB
   Espace nécessaire pour l'import: Y.YMB
   Total après import: Z.ZMB
   
   Souhaitez-vous:
   - ANNULER: Conserver vos données actuelles
   - OK: Tout effacer et importer uniquement le nouveau fichier
   ```

3. **Cliquez sur OK** pour activer le mode remplacement
4. **Vos anciennes données seront effacées** et remplacées par le nouveau fichier
5. **L'import réussira** car l'espace sera libéré

## Procédure Recommandée

### Option 1: Import avec Remplacement (Simple)
1. **Exportez vos données actuelles** (Paramètres > Exporter)
2. **Import du nouveau fichier** en mode remplacement
3. **Vos nouvelles données** seront importées sans problème

### Option 2: Import par Parties (Avancé)
1. **Exportez vos données actuelles** (sauvegarde)
2. **Utilisez l'outil de division** pour créer des fichiers plus petits
3. **Import des parties une par une** en mode fusion
4. **Toutes vos données** seront combinées

## Fichiers Disponibles

- `export_part_1.json` (1000 transactions, 226KB)
- `export_part_2.json` (1000 transactions, 229KB)
- `export_part_3.json` (434 transactions, 102KB)

## Conseils

1. **Faites toujours une sauvegarde** avant d'importer
2. **Le mode remplacement est irréversible** - vos anciennes données seront perdues
3. **Pour les gros imports**, préférez le mode remplacement ou l'import par parties
4. **Vérifiez l'espace disponible** dans les outils de développement (F12 > Application > Local Storage)

## Support

Si vous avez besoin d'aide supplémentaire :
- Consultez le guide `JSON_IMPORT_GUIDE.md`
- Utilisez l'outil `split_json_tool.js` pour diviser d'autres fichiers
- Contactez-moi pour une assistance personnalisée

🎉 **Votre problème de quota est maintenant résolu avec le mode remplacement !**