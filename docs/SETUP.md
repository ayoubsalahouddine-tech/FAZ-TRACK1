# Guide de Configuration - FAZ TRACK

## Configuration Initiale

### 1. Cloner le Repository
```bash
git clone https://github.com/ayoubsalahouddine-tech/FAZ-TRACK1.git
cd FAZ-TRACK1
```

### 2. Installation du Frontend
```bash
cd frontend
npm install
```

### 3. Configuration Supabase

1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Dans les paramètres du projet, copier:
   - `Project URL`
   - `Anon Key`

4. Créer le fichier `.env.local`:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Initialiser la Base de Données

1. Aller dans l'éditeur SQL de Supabase
2. Exécuter le script `database/schema.sql`
3. Vérifier que toutes les tables sont créées

## Démarrage du Projet

```bash
cd frontend
npm run dev
```

L'application s'ouvrira sur `http://localhost:5173`

## Variables d'Environnement

| Variable | Description | Exemple |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | URL du projet Supabase | https://xxx.supabase.co |
| `VITE_SUPABASE_ANON_KEY` | Clé anonyme Supabase | eyJxxx... |
| `VITE_API_URL` | URL de l'API backend | http://localhost:3000 |

## Déploiement

### Préparation
```bash
npm run build
npm run type-check
npm run lint
```

### Sur Vercel
1. Push sur GitHub
2. Connecter le repo à Vercel
3. Ajouter les variables d'environnement
4. Déployer

### Sur Netlify
1. Connecter le repo GitHub à Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Ajouter les variables d'environnement
5. Déployer

## Troubleshooting

### Erreur: "Missing Supabase environment variables"
- Vérifier que `.env.local` existe
- Vérifier les clés SUPABASE_URL et ANON_KEY
- Redémarrer le serveur de dev

### Port 5173 déjà utilisé
```bash
# Utiliser un autre port
npm run dev -- --port 3000
```

### Dépendances non installées
```bash
rm -rf node_modules package-lock.json
npm install
```
