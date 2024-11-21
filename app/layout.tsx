import { getLocaleOnServer } from '@/i18n/server';
import './styles/globals.css';
import './styles/markdown.scss';
import LocaleLayout from './LocaleLayout'; // 导入客户端布局组件

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocaleOnServer(); // 在服务器端获取语言
  return (
    <html lang={locale}>
      <body>
        {/* 将 locale 传递到客户端组件 */}
        <LocaleLayout locale={locale}>{children}</LocaleLayout>
      </body>
    </html>
  );
}