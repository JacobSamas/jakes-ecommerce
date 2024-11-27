import Header from './components/Header';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-darkBlack text-lightGray">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
