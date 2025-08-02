#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration des composants disponibles
const COMPONENTS = {
  button: {
    folder: 'Button',
    file: 'Button.tsx',
    dependencies: ['tailwind-merge'],
    description: 'Un composant Button avec variantes et tailles (HTML natif)'
  },
  alert: {
    folder: 'Alert',
    file: 'Alert.tsx',
    dependencies: ['tailwind-merge'],
    description: 'Un composant Alert avec variantes et sous-composants (Title, Description)'
  },
  // Exemple pour un futur composant avec Base UI
  // dialog: {
  //   folder: 'Dialog',
  //   file: 'Dialog.tsx',
  //   dependencies: ['tailwind-merge', '@base-ui-components/react'],
  //   description: 'Un composant Dialog avec Base UI'
  // }
  // Vous pourrez ajouter d'autres composants ici
};

// URL de base pour télécharger les composants
const BASE_URL = 'https://raw.githubusercontent.com/votre-username/mon-design-system/main/src/design-system/';

function showHelp() {
  console.log(`
Usage: npx mon-design-system <command> [options]

Commands:
  add <component>     Ajoute un composant à votre projet
  list                Liste tous les composants disponibles
  
Exemples:
  npx mon-design-system add button
  npx mon-design-system list
  
Composants disponibles:
${Object.entries(COMPONENTS).map(([name, config]) => 
  `  ${name.padEnd(12)} - ${config.description}`
).join('\n')}
`);
}

function listComponents() {
  console.log('\nComposants disponibles:\n');
  Object.entries(COMPONENTS).forEach(([name, config]) => {
    console.log(`  ${name.padEnd(12)} - ${config.description}`);
  });
  console.log('\nUtilisation: npx mon-design-system add <component>\n');
}

async function downloadComponent(componentName) {
  const component = COMPONENTS[componentName];

  if (!component) {
    console.error(`❌ Composant "${componentName}" non trouvé.`);
    console.log('\nComposants disponibles:');
    listComponents();
    process.exit(1);
  }

  console.log(`📦 Installation du composant ${componentName}...`);

  // Créer le dossier design-system s'il n'existe pas
  const designSystemDir = path.join(process.cwd(), 'src', 'design-system');
  if (!fs.existsSync(designSystemDir)) {
    fs.mkdirSync(designSystemDir, { recursive: true });
    console.log('✅ Dossier src/design-system créé');
  }

  // Créer le dossier du composant
  const componentDir = path.join(designSystemDir, component.folder);
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`✅ Dossier ${component.folder} créé`);
  }

  // Télécharger le composant dans son dossier
  const componentContent = getComponentContent(componentName);
  const filePath = path.join(componentDir, component.file);

  fs.writeFileSync(filePath, componentContent);
  console.log(`✅ ${component.file} ajouté dans ${component.folder}/`);

  // Mettre à jour l'index.ts
  updateIndex(componentName, component.folder, component.file);

  // Installer les dépendances
  if (component.dependencies.length > 0) {
    console.log('📦 Installation des dépendances...');
    try {
      execSync(`npm install ${component.dependencies.join(' ')}`, { stdio: 'inherit' });
      console.log('✅ Dépendances installées');
    } catch (error) {
      console.log('⚠️  Veuillez installer manuellement:', component.dependencies.join(' '));
    }
  }

  console.log(`\n✨ Composant ${componentName} installé avec succès !`);
  console.log(`\nImport: import { ${getComponentName(componentName)} } from '@/design-system';`);
}

function getComponentContent(componentName) {
  if (componentName === 'button') {
    return `"use client";

import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, forwardRef } from "react";

const variants: Record<string, string> = {
  default: "font-sm text-black dark:text-white font-normal",
  primary: "bg-black dark:bg-white text-white dark:text-black",
  secondary: "bg-gray-200 text-gray-800 dark:text-black",
  ghost: "hover:bg-gray-300/20",
  outline: "text-black border",
  link: "!bg-transparent"
};

const sizes: Record<string, string> = {
  sm: "text-sm py-1.5 px-2.5 rounded",
  md: "text-base py-1.5 px-3.5 rounded-md",
  link: "m-0 p-0"
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "font-medium cursor-pointer transition-colors",
          variants.default,
          variant !== "default" ? variants[variant] : "",
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
`;
  }

  if (componentName === 'alert') {
    return `"use client";

import { twMerge } from "tailwind-merge";
import { HTMLAttributes, forwardRef } from "react";

const variants: Record<string, string> = {
  default: "bg-background text-foreground border-border",
  destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
  success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300 [&>svg]:text-green-600 dark:[&>svg]:text-green-300",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-300",
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-300"
};

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variants;
  className?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={twMerge(
          "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Alert.displayName = "Alert";

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export const AlertTitle = forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={twMerge("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
);

AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
);

AlertDescription.displayName = "AlertDescription";
`;
  }

  return '';
}

function updateIndex(componentName, folderName, fileName) {
  const indexPath = path.join(process.cwd(), 'src', 'design-system', 'index.ts');
  const componentExportName = getComponentName(componentName);

  let exportLine, typeLine;

  if (componentName === 'alert') {
    // Pour Alert, on exporte les 3 composants
    exportLine = `export { Alert, AlertTitle, AlertDescription } from './${folderName}/${fileName.replace('.tsx', '')}';`;
    typeLine = `export type { AlertProps, AlertTitleProps, AlertDescriptionProps } from './${folderName}/${fileName.replace('.tsx', '')}';`;
  } else {
    // Pour les autres composants (Button, etc.)
    exportLine = `export { ${componentExportName} } from './${folderName}/${fileName.replace('.tsx', '')}';`;
    typeLine = `export type { ${componentExportName}Props } from './${folderName}/${fileName.replace('.tsx', '')}';`;
  }

  let content = '';
  if (fs.existsSync(indexPath)) {
    content = fs.readFileSync(indexPath, 'utf8');
  } else {
    content = '// Export des composants du design system\n';
  }

  // Ajouter l'export s'il n'existe pas déjà
  if (!content.includes(exportLine)) {
    content += `\n${exportLine}`;
  }
  if (!content.includes(typeLine)) {
    content += `\n${typeLine}`;
  }

  fs.writeFileSync(indexPath, content);
  console.log('✅ index.ts mis à jour');
}

function getComponentName(componentName) {
  return componentName.charAt(0).toUpperCase() + componentName.slice(1);
}

// Point d'entrée principal
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
}

switch (command) {
  case 'list':
    listComponents();
    break;
  case 'add':
    const componentName = args[1];
    if (!componentName) {
      console.error('❌ Veuillez spécifier un composant à ajouter');
      showHelp();
      process.exit(1);
    }
    downloadComponent(componentName);
    break;
  default:
    console.error(`❌ Commande inconnue: ${command}`);
    showHelp();
    process.exit(1);
}
