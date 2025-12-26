/**
 * Inline script to apply dark mode immediately before page renders
 * This prevents flickering by setting the dark class before hydration
 */
export default function DarkModeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const savedDarkMode = localStorage.getItem('isDarkMode');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const isDark = savedDarkMode ? JSON.parse(savedDarkMode) : prefersDark;

              if (isDark) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              console.error('Dark mode init error:', e);
            }
          })();
        `,
      }}
    />
  );
}
