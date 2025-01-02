'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setLanguage } from '../store';
import type { Locale } from '../i18n/locales';

const LanguageSelector = () => {
    const dispatch = useAppDispatch();
    const currentLang = useAppSelector(state => state.language.current);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const languages: { locale: Locale; label: string }[] = [
        { locale: 'cn', label: '简体中文' },
        { locale: 'en', label: 'English' },
        { locale: 'ja', label: '日本語' }
    ];

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getCurrentLabel = () => {
        return languages.find(lang => lang.locale === currentLang)?.label;
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
                <span className="text-sm font-medium">{getCurrentLabel()}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* 下拉菜单 */}
            <div
                className={`
          absolute right-0 mt-2 w-40 rounded-md shadow-lg
          backdrop-blur-sm bg-white/10 border border-white/20
          transition-all duration-300 transform origin-top
          ${isOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
        `}
            >
                <div className="py-1">
                    {languages.map(({ locale, label }) => (
                        <button
                            key={locale}
                            onClick={() => {
                                dispatch(setLanguage(locale));
                                setIsOpen(false);
                            }}
                            className={`
                w-full text-left px-4 py-2 text-sm
                transition-colors duration-300
                ${currentLang === locale
                                    ? 'bg-white/20 text-white'
                                    : 'hover:bg-white/10'}
              `}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LanguageSelector; 