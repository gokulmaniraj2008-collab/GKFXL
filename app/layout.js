export const metadata = {
  title: 'AI Website Architect',
  description: 'Build websites through AI interviews. No code. No guesswork.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0a0a0f' }}>
        {children}
      </body>
    </html>
  );
}
