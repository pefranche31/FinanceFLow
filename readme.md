# **📊 FinanceFlow Pro**

FinanceFlow Pro est une application de gestion de finances personnelles légère, rapide et 100 % auto-hébergée. Conçue initialement comme une application frontend (Single Page Application), elle a été adaptée pour s'exécuter sur un serveur local avec un stockage persistant via un micro-backend Node.js.

## **🏗 Architecture & Choix Techniques**

* **Frontend :** React 18, Tailwind CSS, Recharts (Graphiques) et SheetJS (Import bancaire Excel/CSV). Tout le frontend est encapsulé dans un fichier unique `index.html`.  
* **Backend :** Node.js avec Express. Un micro-serveur ultra-léger (env. 30 lignes de code) qui sert l'application et gère l'API de sauvegarde.  
* **Base de données :** Fichier plat JSON (`data.json`). Aucun moteur de base de données lourd (SQL/NoSQL) n'est requis, facilitant ainsi grandement les sauvegardes et la maintenance.  
* **Hébergement :** Conteneur Docker (image `node:20-alpine`) géré via CasaOS.

## **🖥 Environnement Serveur**

L'application est déployée sur le serveur domestique principal :

* **Hardware :** Dell OptiPlex 3080 Micro (Intel Core i3, 16 Go RAM)  
* **OS :** Debian 13 "Trixie" \+ CasaOS  
* **Stockage persistant :** SSD 1 To monté sur `/mnt/ssd_data`  
* **Accès Sécurisé :** Via VPN Tailscale (aucun port exposé sur internet).

## **📂 Arborescence du Projet**

Le projet réside dans `/mnt/ssd_data/financeflow/`.

/mnt/ssd\_data/financeflow/  
├── docker-compose.yml       \# Fichier de déploiement Docker  
├── package.json             \# Dépendances Node.js (express)  
├── server.js                \# Code du micro-serveur backend  
├── data/                      
│   └── data.json            \# 💾 LA BASE DE DONNÉES (Créé automatiquement)  
└── public/  
    └── index.html           \# Code source de l'interface (React/Tailwind)

## **🚀 Déploiement**

Si le conteneur doit être recréé ou migré vers un nouveau serveur, voici la procédure :

**Création des répertoires (avec droits utilisateur 1000:1000) :**  
sudo mkdir \-p /mnt/ssd\_data/financeflow/public  
sudo mkdir \-p /mnt/ssd\_data/financeflow/data  
sudo chown \-R 1000:1000 /mnt/ssd\_data/financeflow

1. 

**Démarrage du service Docker :** Se placer dans le dossier racine de l'application et lancer docker compose :  
cd /mnt/ssd\_data/financeflow  
sudo docker compose up \-d

2.   
3. **Accès :** L'application écoute sur le port **8082**.  
   * En local : `http://192.168.1.47:8082`  
   * À distance (Tailscale) : `http://pepilsserver.tailcace3e.ts.net:8082`

## **🛡️ Sécurité & Accès Extérieur**

En tant qu'ingénieur sécurité, l'approche Zero Trust est respectée : L'application ne possède pas de système d'authentification propre (login/mot de passe) car elle est isolée derrière **Tailscale**. Elle ne doit en aucun cas être exposée publiquement via un reverse proxy classique sans l'ajout préalable d'un middleware d'authentification (ex: Authelia / Authentik) ou d'un .htpasswd sur le conteneur.

## **💾 Sauvegarde et Restauration**

Le choix d'une base JSON rend la sauvegarde triviale. Vous avez deux options :

**Option 1 : Via l'interface utilisateur (Recommandée pour l'utilisateur)**

* **Sauvegarder :** Aller dans *Paramètres \> Exporter JSON*.  
* **Restaurer :** Aller dans *Paramètres \> Restaurer JSON* et charger le fichier précédent.

**Option 2 : Côté Serveur (Recommandée pour les backups automatisés)** Il suffit de sauvegarder le fichier suivant : `/mnt/ssd_data/financeflow/data/data.json` *Note : Si un système de backup (ex: rsync ou Borg) tourne sur le serveur, il suffit d'inclure ce chemin dans les tâches de sauvegarde régulières.*

## **🛠 Maintenance & Logs**

Pour voir ce qui se passe sous le capot (requêtes API entrantes, erreurs éventuelles du serveur Node.js) :

sudo docker logs \-f financeflow

Pour redémarrer l'application :

sudo docker compose restart financeflow

