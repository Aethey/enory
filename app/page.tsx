'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useAppSelector, useAppDispatch } from './hooks';
import ToggleSwitch from './components/home/ToggleSwitch';
import LanguageSelector from './components/LanguageSelector';
import { locales } from './i18n/locales';
import Link from 'next/link';

// 添加施工动画组件
const ConstructionAnimation = () => (
  <div className="construction-animation">
    <svg className="gear-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" />
      <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" fill="currentColor" />
    </svg>
  </div>
);

export default function HomePage() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const currentLang = useAppSelector(state => state.language.current);
  const t = locales[currentLang];
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChatTest1Click = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/main');
    }, 1000);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'
      : 'bg-gradient-to-br from-gray-50 via-gray-100 to-white text-gray-800'
      }`}>
      {/* 背景元素 */}
      <div className="geometric-background">
        <svg className="geometric-shape" width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="currentColor" />
        </svg>
        <svg className="geometric-shape" width="50" height="50" viewBox="0 0 50 50">
          <rect x="10" y="10" width="30" height="30" fill="currentColor" />
        </svg>
        <svg className="geometric-shape" width="50" height="50" viewBox="0 0 50 50">
          <polygon points="25,5 45,40 5,40" fill="currentColor" />
        </svg>
        <svg className="geometric-shape" width="60" height="60" viewBox="0 0 60 60">
          <path d="M30 5L55 50H5L30 5Z" fill="currentColor" />
        </svg>
        <svg className="geometric-shape" width="40" height="40" viewBox="0 0 40 40">
          <rect x="5" y="5" width="30" height="30" transform="rotate(45 20 20)" fill="currentColor" />
        </svg>
        <svg className="geometric-shape" width="45" height="45" viewBox="0 0 45 45">
          <circle cx="22.5" cy="22.5" r="15" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* 顶部工具栏 */}
      <div className="fixed top-0 right-0 p-4 flex items-center space-x-4 z-50">
        <LanguageSelector />
        <ToggleSwitch />
      </div>

      {/* 主要内容 */}
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <h1 className="text-5xl font-light tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text mb-8">
          {t.hero.greeting}
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl text-center mb-12">
          {t.hero.subtitle}
        </p>

        {/* 按钮容器 */}
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={handleChatTest1Click}
            className="group block w-full p-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                </svg>
                <span className="text-lg font-light">{t.buttons.startChat}</span>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300">
                →
              </span>
            </div>
          </button>

          {[t.buttons.explore, t.buttons.features, t.buttons.about].map((text, index) => (
            <button
              key={index}
              className="group block w-full p-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 relative"
              onClick={() => console.log(`${text} clicked`)}
            >
              <div className="flex items-center justify-between opacity-50">
                <span className="text-lg font-light">{text}</span>
                <ConstructionAnimation />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-light">{t.buttons.developing}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-8 rounded-full bg-gradient-to-t from-cyan-400 to-blue-500 animate-pulse-glow`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
      )}

      <SpeedInsights />
    </div>
  );
}

