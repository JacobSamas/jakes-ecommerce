"use client";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
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
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
