/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "regal-blue": "#243c5a",
            },
            height: {
                small: "3rem",
                medium: "4.3rem",
                large: "5.3rem",
            },
        },
    },
    plugins: [],
};
