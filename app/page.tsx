'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // 用于页面跳转
import { MdOutlineTouchApp } from 'react-icons/md'; // 示例图标

export default function HomePage() {
  const router = useRouter();

  const handleClick = (action: string) => {
    if (action === 'main') {
      router.push('/main'); // 跳转到 Main 页面
    } else {
      console.log(`Button ${action} clicked!`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gradientStart to-gradientEnd animate-gradient">
      {/* 页面内容 */}
      <div className="grid grid-cols-2 gap-6 p-10 bg-white shadow-lg rounded-xl">
        {/* 按钮 1 - 跳转到 Main */}
        <button
          onClick={() => handleClick('main')}
          className="flex flex-col items-center justify-center p-6 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-blue-600 transition-all duration-300"
        >
          <MdOutlineTouchApp size={40} className="mb-2" />
          <span className="text-lg font-semibold">Go to Main</span>
        </button>
        {/* 按钮 2 */}
        <button
          onClick={() => handleClick('2')}
          className="flex flex-col items-center justify-center p-6 bg-green-500 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-green-600 transition-all duration-300"
        >
          <MdOutlineTouchApp size={40} className="mb-2" />
          <span className="text-lg font-semibold">Button 2</span>
        </button>
        {/* 按钮 3 */}
        <button
          onClick={() => handleClick('3')}
          className="flex flex-col items-center justify-center p-6 bg-yellow-500 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-yellow-600 transition-all duration-300"
        >
          <MdOutlineTouchApp size={40} className="mb-2" />
          <span className="text-lg font-semibold">Button 3</span>
        </button>
        {/* 按钮 4 */}
        <button
          onClick={() => handleClick('4')}
          className="flex flex-col items-center justify-center p-6 bg-red-500 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-red-600 transition-all duration-300"
        >
          <MdOutlineTouchApp size={40} className="mb-2" />
          <span className="text-lg font-semibold">Button 4</span>
        </button>
      </div>
    </div>
  );
}