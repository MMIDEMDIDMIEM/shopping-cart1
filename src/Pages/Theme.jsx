import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function Theme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <label className="swap swap-rotate">
        {/* input اللي بيتحكم */}
        <input
          type="checkbox"
          onChange={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          checked={theme === "light"}
        />

        {/* Sun icon (light mode) */}
              <SunIcon className="swap-off h-10 w-10 text-yellow-500" />

        {/* Moon icon (dark mode) */}
        <svg
          className="swap-on h-10 w-10 fill-current text-blue-950-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64 13a1 1 0 00-1.05-.14A8.05 8.05 0 0117.22 14 8.15 8.15 0 019.08 5.49 8.59 8.59 0 009.33 3.5a1 1 0 00-1.3-1.14A10.14 10.14 0 1022 14.05a1 1 0 00-.36-1.05z" />
        </svg>
      </label>
    </div>
  );
}

export default Theme;
