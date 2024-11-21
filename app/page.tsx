'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // 用于页面跳转
import { MdOutlineTouchApp } from 'react-icons/md'; // 示例图标
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from 'next/link';

export default function HomePage() {

  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const messages = [
    { lang: 'zh', text: '有什么可以帮您的吗？' },
    { lang: 'en', text: 'How can I assist you?' },
    { lang: 'ja', text: '何かお手伝いできることがありますか？' },
  ];

  const handleClick = (action: string) => {
    if (action === 'main') {
      setIsLoading(true); // 开始显示 Loading 动画
      setTimeout(() => {
        router.push('/main'); // 跳转到 Main 页面
      }, 1500); // 假设动画持续 1.5 秒
    } else {
      console.log(`Button ${action} clicked!`);
    }
  };




  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // 每3秒切换一次
    return () => clearInterval(interval); // 清理定时器
  }, [messages.length]);
  return (
    <div className="flex flex-col min-h-screen px-10 py-10 bg-black text-white">
      {/* 标题和简介 */}
      <div className="text-center mb-16">
        <h1
          key={messages[currentIndex].lang} // 每次切换时触发动画
          className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-fade-in-out"
        >
          {messages[currentIndex].text}
        </h1>
        <p className="mt-4 text-lg text-gray-300 flex items-center justify-center gap-2 animate-fade-in">
          🚧 <span>Under Construction</span> 🔧⚙️
        </p>
      </div>

      {/* 居中居左的按钮列表 */}
      <div className="flex flex-col items-start justify-start">
        <ul className="space-y-4">
          <li className="text-xl font-semibold px-6 py-3 rounded-lg cursor-pointer bg-gradient-to-r from-blue-500 to-green-500 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105">
            <Link href="/main" prefetch={true}>
              Go to ChatTest1
            </Link>
          </li>
          <li
            onClick={() => handleClick('2')}
            className="text-xl font-semibold px-6 py-3 rounded-lg cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105"
          >
            Button 2
          </li>
          <li
            onClick={() => handleClick('3')}
            className="text-xl font-semibold px-6 py-3 rounded-lg cursor-pointer bg-gradient-to-r from-green-500 to-teal-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105"
          >
            Button 3
          </li>
          <li
            onClick={() => handleClick('4')}
            className="text-xl font-semibold px-6 py-3 rounded-lg cursor-pointer bg-gradient-to-r from-yellow-500 to-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105"
          >
            Button 4
          </li>
        </ul>
      </div>

      {/* SpeedInsights */}
      <div className="mt-10">
        <SpeedInsights />
      </div>

      {/* 音符 Loading 动画 */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="flex space-x-2">
            <div className="w-3 h-8 bg-purple-500 animate-bounce-note"></div>
            <div className="w-3 h-8 bg-blue-500 animate-bounce-note delay-100"></div>
            <div className="w-3 h-8 bg-green-500 animate-bounce-note delay-200"></div>
            <div className="w-3 h-8 bg-yellow-500 animate-bounce-note delay-300"></div>
            <div className="w-3 h-8 bg-red-500 animate-bounce-note delay-400"></div>
          </div>
        </div>
      )}
    </div>
  );
}

