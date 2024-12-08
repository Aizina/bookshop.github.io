"use client";

import { Provider } from "react-redux";
import store, {persistor} from "@/store/index";
import React from "react"; // Ensure this import exists
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Header from "@/components/Header";
import { PersistGate } from 'redux-persist/integration/react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
