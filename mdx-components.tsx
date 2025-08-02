import { ButtonWrapper as Button } from '@/components/ButtonWrapper';
import { AlertWrapper as Alert, AlertDescriptionWrapper as AlertDescription } from '@/components/AlertWrapper';
import { ComponentPreview } from '@/components/ComponentPreviewWrapper';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/CardWrapper';
import { Input } from '@/components/InputWrapper';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/TableWrapper';
import { CodeBlock } from '@/components/CodeBlock';
import { CodeExample } from '@/components/CodeExample';
import { InstallCommand } from '@/components/InstallCommand';
import { InstallCommands } from '@/components/InstallCommands';
import { DownloadCodeWrapper } from '@/components/DownloadCodeWrapper';
import { InstallTabs } from '@/components/InstallTabs';

export function useMDXComponents(components: Record<string, unknown>): Record<string, unknown> {
  return {
    // Permet d'utiliser les composants du design system dans MDX
    Button,
    Alert,
    AlertDescription,
    ComponentPreview,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    CodeBlock,
    CodeExample,
    InstallCommand,
    InstallCommands,
    DownloadCode: DownloadCodeWrapper,
    InstallTabs,
    // Mapping pour les blocs de code markdown natifs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pre: (props: any) => {
      const child = props.children;
      if (child && child.props) {
        const code = child.props.children;
        // Récupère la langue à partir de la classe CSS (ex: language-tsx)
        const language = child.props.className?.replace('language-', '') || 'tsx';
        return <CodeBlock language={language}>{code}</CodeBlock>;
      }
      return <pre {...props} />;
    },
    // Vous pouvez ajouter d'autres composants ici
    ...components,
  };
} 
