import './globals.css';

export const metadata = {
  title: 'Steal an Egg - Dashboard',
  description: 'Live Roblox Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#030712] text-white font-['Inter',sans-serif] antialiased select-none">
        {children}
      </body>
    </html>
  );
    }
