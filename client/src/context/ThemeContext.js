import React, { createContext, useState, useEffect } from 'react';

// Create a context for theme
export const ThemeContext = createContext();

// Create a provider for the context
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check if the user has a saved theme preference in localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedTheme);
    }, []);

    // Toggle the dark mode and save the preference
    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newTheme = !prev;
            localStorage.setItem('darkMode', newTheme); // Save to localStorage
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
