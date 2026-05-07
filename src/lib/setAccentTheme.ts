export function setAccentTheme(theme: string) {
    document.documentElement.setAttribute(
        "data-accent",
        theme
    );

    localStorage.setItem("accent-theme", theme);
}