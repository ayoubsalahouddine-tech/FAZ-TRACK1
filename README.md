# FAZ TRACK - Gestion de Transport

Un système professionnel de gestion de transport et de logistique construit avec React 19, TypeScript, Vite et Tailwind CSS.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18.0.0 ou supérieur
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone https://github.com/ayoubsalahouddine-tech/FAZ-TRACK1.git
cd FAZ-TRACK1

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés Supabase

# Démarrer le serveur de développement
npm run dev
```

L'application s'ouvrira automatiquement sur `http://localhost:5173`

## 🛠 Technologies Utilisées

- **React 19** - Framework UI moderne
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server ultrarapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Navigation SPA
- **Supabase** - Backend et authentification
- **TanStack Query** - Gestion d'état asynchrone
- **React Hook Form** - Gestion optimisée des formulaires
- **Zod** - Validation de schémas TypeScript
- **ESLint** - Linting du code
- **Prettier** - Formatage du code

## 📁 Structure du Projet

```
FAZ-TRACK1/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── Button.tsx
│   ├── pages/              # Pages de l'application
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Clients.tsx
│   │   ├── Packages.tsx
│   │   ├── Trips.tsx
│   │   ├── Trucks.tsx
│   │   ├── Drivers.tsx
│   │   ├── Cashbox.tsx
│   │   ├── Reports.tsx
│   │   └── Settings.tsx
│   ├── layouts/            # Layouts réutilisables
│   │   └── MainLayout.tsx
│   ├── hooks/              # Custom hooks React
│   ├── services/           # Services API
│   ├── lib/                # Utilitaires et configurations
│   │   ├── supabase.ts
│   │   └── queryClient.ts
│   ├── types/              # Définitions TypeScript
│   │   └── index.ts
│   ├── styles/             # Styles globaux
│   │   └── globals.css
│   ├── assets/             # Images et ressources
│   ├── App.tsx             # Composant principal
│   └── main.tsx            # Point d'entrée
├── database/
│   └── schema.sql          # Schéma SQL Supabase
├── docs/
│   └── SETUP.md            # Guide d'installation
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── .eslintrc.cjs
├── .prettierrc.json
└── README.md
```

## 🎨 Thème

### Palette de Couleurs
- **Primaire (Violet):** #6D28D9
- **Blanc:** #FFFFFF
- **Gris Clair:** #F3F4F6

### Fonctionnalités du Thème
- Design moderne et professionnel
- Mode clair
- Responsive sur mobile, tablette et desktop
- Accessibilité WCAG

## 📋 Pages de l'Application

- **Login** - Authentification utilisateur avec validation Zod
- **Dashboard** - Vue d'ensemble et statistiques
- **Clients** - Gestion des clients
- **Colis** - Suivi des colis
- **Voyages** - Gestion des voyages
- **Camions** - Gestion du parc automobile
- **Chauffeurs** - Gestion des chauffeurs
- **Caisse** - Gestion financière
- **Rapports** - Génération de rapports
- **Paramètres** - Configuration de l'application

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de dev

# Production
npm run build        # Build pour la production
npm run preview      # Prévisualiser le build

# Qualité du Code
npm run lint         # Vérifier les erreurs
npm run lint:fix     # Corriger automatiquement
npm run format       # Formater le code
npm run type-check   # Vérifier les types TypeScript
```

## 🔐 Authentification

L'authentification est gérée par Supabase. Configurez vos clés d'environnement dans `.env.local`:

```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

## 📚 Documentation Supplémentaire

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query)
- [Supabase Docs](https://supabase.com/docs)
- [Guide de Configuration](./docs/SETUP.md)

## 🤝 Contribution

Les contributions sont bienvenues! Veuillez:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Ayoub Salahouddine

---

**Fait avec ❤️ pour FAZ TRACK**
