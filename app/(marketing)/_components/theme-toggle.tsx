"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
    return window.localStorage.getItem("plana-theme") === "light";
}

function getServerSnapshot() {
    return false;
}

export function ThemeToggle() {
    const light = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    useEffect(() => {
        document.documentElement.classList.toggle("light-mode", light);
        document.body.classList.toggle("light-mode", light);
        document.querySelectorAll(".landing-shell").forEach((el) => {
            el.classList.toggle("light-mode", light);
        });
    }, [light]);

    const toggle = () => {
        const next = !light;
        window.localStorage.setItem("plana-theme", next ? "light" : "dark");
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid size-8 place-items-center border border-[var(--landing-line)] text-[var(--landing-muted)] hover:text-[var(--landing-orange)] transition-colors cursor-pointer"
        >
            {light ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
        </button>
    );
}

