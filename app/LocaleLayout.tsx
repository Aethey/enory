'use client'; // 客户端组件

import { Provider } from 'react-redux';
import store from './store';

export default function LocaleLayout({
    children,
    locale,
}: {
    children: React.ReactNode;
    locale: string; // 从服务端传递的语言
}) {
    return (
        <Provider store={store}>
            <div className="overflow-x-auto" data-locale={locale}>
                <div className="w-screen h-screen min-w-[300px]">{children}</div>
            </div>
        </Provider>
    );
}