"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [light, setLight] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("plana-theme") === "light");

    useEffect(() => {
        document.querySelector(".landing-shell")?.classList.toggle("light-mode", light);
    }, [light]);

    const toggle = () => {
        const next = !light;
        setLight(next);
        window.localStorage.setItem("plana-theme", next ? "light" : "dark");
        document.querySelector(".landing-shell")?.classList.toggle("light-mode", next);
    };

    return <button type="button" onClick={toggle} aria-label="Toggle theme" className="grid size-8 place-items-center border border-[var(--landing-line)] text-[var(--landing-muted)] hover:text-[var(--landing-orange)] transition-colors">{light ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}</button>;
}
