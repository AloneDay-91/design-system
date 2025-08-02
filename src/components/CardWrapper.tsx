"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/design-system";

import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps
} from "@/design-system";

export function CardWrapper(props: CardProps) {
  return <Card {...props} />;
}

export function CardHeaderWrapper(props: CardHeaderProps) {
  return <CardHeader {...props} />;
}

export function CardTitleWrapper(props: CardTitleProps) {
  return <CardTitle {...props} />;
}

export function CardDescriptionWrapper(props: CardDescriptionProps) {
  return <CardDescription {...props} />;
}

export function CardContentWrapper(props: CardContentProps) {
  return <CardContent {...props} />;
}

export function CardFooterWrapper(props: CardFooterProps) {
  return <CardFooter {...props} />;
}

export { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
};
