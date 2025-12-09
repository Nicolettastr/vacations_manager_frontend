import { useEffect, useState } from "react";

const themes = ["light", "dark", "classic", "tema4"] as const;
type Theme = (typeof themes)[number];

export const ThemeSwitcher = () => {
  const [theme, setThemeState] = useState<Theme>("light");

  const setTheme = (newTheme: Theme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <span className="font-medium">Tema:</span>
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`
            px-3 py-1 rounded border 
            ${
              theme === t
                ? "border-primary bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                : "border-input bg-card text-[hsl(var(--foreground))]"
            }
            transition-colors
          `}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
};
