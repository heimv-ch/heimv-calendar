export function resolveClassNames(classNames: Record<string, boolean>) {
	return Object.entries(classNames).reduce((acc, [className, active]) => acc + (active ? ` ${className}` : ""), "");
}
