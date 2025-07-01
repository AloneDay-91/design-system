"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StackIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Image from "next/image";

export interface Tab {
  title: string;
  icon: React.ReactNode;
  image: string;
}

export interface Hero195Props {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonUrl: string;
  secondaryButtonUrl?: string;
  tabs?: Tab[];
}

const Hero195 = ({
  title = "Beautiful blocks for Shadcn UI.",
  description = "Shadcnblocks.com offers the best collection of components and blocks for shadcn/ui.",
  primaryButtonText = "Download",
  primaryButtonUrl = "https://shadcnblocks.com",
  secondaryButtonUrl,
  secondaryButtonText,
}: Hero195Props) => {

  return (
    <section className="">
      <div className="container">
        <div className="border-border border-x py-22">
          <div className="relative mx-auto max-w-2xl p-2">
            <div className="text-center flex flex-row gap-2 justify-center items-center">
            <motion.span 
              className="border rounded-md bg-background shadow-lg p-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
              > 
              <StackIcon width="48" height="48"/>
            </motion.span>
            <motion.h1
              className="mx-1 text-center text-5xl font-bold tracking-tighter md:text-7xl m-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
            >
              {title}
            </motion.h1>
            </div>
            <motion.p
              className="text-muted-foreground mx-auto mx-2 mt-6 max-w-xl text-center text-lg font-normal md:text-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              {description}
            </motion.p>
            <motion.div
              className="mx-2 mt-6 flex justify-center gap-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <Button asChild>
                <a href={primaryButtonUrl}>{primaryButtonText}</a>
              </Button>
              {secondaryButtonText && (
                <Button variant="outline" asChild>
                  <a href={secondaryButtonUrl}>{secondaryButtonText}</a>
                </Button>
              )}
            </motion.div>
          </div>
          <motion.div
            className="mt-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            <p className="font-medium text-muted-foreground lg:text-left">
              Built with open-source technologies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group flex aspect-square h-12 items-center justify-center p-0",
                )}
              >
                <Image
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg"
                  alt="shadcn/ui logo"
                  width={24}
                  height={24}
                  className="h-6 grayscale opacity-70 brightness-90 dark:invert transition-all group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:saturate-100"
                />
              </a>
              <a
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group flex aspect-square h-12 items-center justify-center p-0",
                )}
              >
                <Image
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg"
                  alt="TypeScript logo"
                  width={24}
                  height={24}
                  className="h-6 grayscale opacity-70 brightness-90 dark:invert transition-all group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:saturate-100"
                />
              </a>
              <a
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group flex aspect-square h-12 items-center justify-center p-0",
                )}
              >
                <Image
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg"
                  alt="React logo"
                  width={24}
                  height={24}
                  className="h-6 grayscale opacity-70 brightness-90 dark:invert transition-all group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:saturate-100"
                />
              </a>
              <a
                href="#"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group flex aspect-square h-12 items-center justify-center p-0",
                )}
              >
                <Image
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg"
                  alt="Tailwind CSS logo"
                  width={24}
                  height={24}
                  className="h-6 grayscale opacity-70 brightness-90 dark:invert transition-all group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:saturate-100"
                />
              </a>
            </div>
          </motion.div>
          <motion.div
            className="mt-16 md:mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          >
            <div className="relative isolate">
              <div className="relative z-10">
                <iframe src="https://design.elouanb.fr/docs" frameBorder="0" className="border-border aspect-[16/10] p-6 w-full border shadow-[0_6px_20px_rgb(0,0,0,0.12)]"></iframe>
                <BorderBeam duration={8} size={100} />
              </div>
              <span className="-inset-x-1/5 bg-border absolute top-0 -z-10 h-px [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
              <span className="-inset-x-1/5 bg-border absolute bottom-0 -z-10 h-px [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
              <span className="-inset-x-1/5 border-border absolute top-12 h-px border-t border-dashed [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
              <span className="-inset-x-1/5 border-border absolute bottom-12 h-px border-t border-dashed [mask-image:linear-gradient(to_right,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
              <span className="-inset-y-1/5 left-1/6 border-border absolute w-px border-r border-dashed [mask-image:linear-gradient(to_bottom,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
              <span className="-inset-y-1/5 right-1/6 border-border absolute w-px border-r border-dashed [mask-image:linear-gradient(to_bottom,transparent_1%,black_10%,black_90%,transparent_99%)]"></span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Hero195 };
