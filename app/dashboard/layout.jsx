"use client";
import React, { createContext, useState } from "react";
import Header from "./_components/Header";
import logo from "../../public/logo.svg";

export const WebCamContext = createContext();

const DashboardLayout = ({ children }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  return (
    <div
      className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-black text-white font-['Orbitron'] relative overflow-hidden"
      style={{ WebkitFontSmoothing: "antialiased" }}
    >
      {/* Neon glowing circles background */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500 rounded-full blur-[140px] opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-fuchsia-500 rounded-full blur-[140px] opacity-20 animate-pulse"></div>

      {/* Glassy Header Wrapper */}
      <div className="backdrop-blur-md bg-white/5 border border-cyan-400/30 shadow-[0_0_30px_rgba(0,255,255,0.2)] rounded-b-3xl sticky top-0 z-50">
        <Header logo={logo} />
      </div>

      {/* Main content container with neon border and glass effect */}
      <main className="mx-5 md:mx-20 lg:mx-36 mt-12 p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-purple-400/30 shadow-[0_0_40px_rgba(255,0,255,0.2)] animate-float-in">
        <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
          {children}
        </WebCamContext.Provider>
      </main>
    </div>
  );
};

export default DashboardLayout;
