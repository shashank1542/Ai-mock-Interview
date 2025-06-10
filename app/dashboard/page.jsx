"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import NeonCube from "./_components/NeonCube";
import FloatingSphere from "./_components/FloatingSphere";
import TextRing from "./_components/TextRing";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white font-['Orbitron'] px-6 py-10 overflow-hidden">

      {/* 3D Decorative Components */}
      {/* <div className="absolute bottom-5 right-5 w-44 h-44 md:w-56 md:h-56 z-0 pointer-events-none opacity-90">
  <NeonCube />
</div>

<div className="absolute bottom-5 left-5 w-40 h-40 md:w-52 md:h-52 z-0 pointer-events-none opacity-80">
  <FloatingSphere />
</div> */}

<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-11 w-full h-64 md:h-72 z-0 pointer-events-none opacity-70">
  <TextRing />
</div>



      {/* Soft Background Glows */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-cyan-400 rounded-full blur-[120px] opacity-10 animate-pulse"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-400 rounded-full blur-[120px] opacity-10 animate-pulse"></div>

      {/* Header */}
      <div className="flex justify-between items-center z-10 relative">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-pink-400 text-transparent bg-clip-text tracking-wide animate-fade-in-up drop-shadow-md">
            ⚡ Dashboard
          </h2>
          <p className="text-gray-300 text-sm mt-1 animate-fade-in-up delay-200">
            Create and start your AI Mock Interview with style
          </p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Main Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 z-10 relative">
        {/* Add Interview Panel */}
        <div className="md:col-span-1 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-cyan-300/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-transform hover:scale-[1.02] hover:shadow-cyan-300/30">
          <h3 className="text-xl font-semibold text-cyan-200 mb-4">
            🚀 Add New Interview
          </h3>
          <AddNewInterview />
        </div>

        {/* Interview List Panel */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-pink-300/20 shadow-[0_0_20px_rgba(255,0,255,0.1)] transition-transform hover:scale-[1.02] hover:shadow-pink-300/30">
          <h3 className="text-xl font-semibold text-pink-200 mb-4">
            📄 Interview List
          </h3>
          <InterviewList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
