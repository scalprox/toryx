// tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
    // Points d'entrée
    entry: {
        index: 'src/index.ts',
        // Pour les exports modulaires (toryx/prisma, toryx/express, etc.)
        // 'integrations/prisma/index': 'src/integrations/prisma/index.ts',
        // Ajoute d'autres entry points au besoin
    },

    // Formats de sortie
    format: ['cjs', 'esm'],

    // Génération des types
    dts: true,

    // Source maps
    sourcemap: true,

    // Clean dist avant build
    clean: true,

    // Splitting pour meilleur tree-shaking
    splitting: false,

    // Minification en production
    minify: false, // Garde lisible pour debug, les users minifieront eux-mêmes

    // Supporte les shims Node.js
    shims: true,

    // Gestion de platform
    platform: 'node',

    // Target ES moderne
    target: 'es2020',

    // Externalise les dépendances
    external: [
        // Ajoute ici les peer dependencies
        // '@prisma/client',
    ],

    // Banner pour le fichier généré
    banner: {
        js: '// Toryx - Type-safe error handling for TypeScript',
    },

    // Options TypeScript
    tsconfig: './tsconfig.json',
})