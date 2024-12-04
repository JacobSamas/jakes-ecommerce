"use client";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname(); 

  const excludePaths = ["/auth/login", "/auth/signup"];

  return (
    <html lang="en">
      <body className="bg-darkBlack text-lightGray">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
        />
        <Provider store={store}>
          {!excludePaths.includes(pathname) && <Header />}
          <main>{children}</main>
          {!excludePaths.includes(pathname) && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
