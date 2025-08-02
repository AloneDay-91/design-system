"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const themes = [
	{
		key: "system",
		icon: Monitor,
		label: "Thème système",
	},
	{
		key: "light",
		icon: Sun,
		label: "Thème clair",
	},
	{
		key: "dark",
		icon: Moon,
		label: "Thème sombre",
	},
];

export type ThemeSwitcherProps = {
	value?: "light" | "dark" | "system";
	onChange?: (theme: "light" | "dark" | "system") => void;
	defaultValue?: "light" | "dark" | "system";
	className?: string;
};

export const ThemeSwitcher = ({
	value,
	onChange,
	defaultValue = "system",
	className,
}: ThemeSwitcherProps) => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const [currentTheme, setCurrentTheme] = useControllableState({
		defaultProp: defaultValue,
		prop: value,
		onChange: (newTheme) => {
			if (newTheme) {
				setTheme(newTheme);
				onChange?.(newTheme);
			}
		},
	});

	const handleThemeClick = useCallback(
		(themeKey: "light" | "dark" | "system") => {
			setCurrentTheme(themeKey);
		},
		[setCurrentTheme]
	);

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
		// Sync with next-themes if no controlled value
		if (!value && theme) {
			setCurrentTheme(theme as "light" | "dark" | "system");
		}
	}, [theme, value, setCurrentTheme]);

	if (!mounted) {
		return null;
	}

	const activeTheme = currentTheme || theme;

	return (
		<div
			className={cn(
				"relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border",
				className
			)}
		>
			{themes.map(({ key, icon: Icon, label }) => {
				const isActive = activeTheme === key;
				return (
					<button
						aria-label={label}
						className="relative h-6 w-6 rounded-full transition-colors hover:bg-accent/50"
						key={key}
						onClick={() =>
							handleThemeClick(key as "light" | "dark" | "system")
						}
						type="button"
					>
						{isActive && (
							<motion.div
								className="absolute inset-0 rounded-full bg-secondary"
								layoutId="activeTheme"
								transition={{ type: "spring", duration: 0.5 }}
							/>
						)}
						<Icon
							className={cn(
								"relative z-10 m-auto h-4 w-4 transition-colors",
								isActive
									? "text-foreground"
									: "text-muted-foreground"
							)}
						/>
					</button>
				);
			})}
		</div>
	);
};
