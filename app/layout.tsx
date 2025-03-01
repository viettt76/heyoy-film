import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import MovieHeader from '@/components/MovieHeader';
import ScrollToTop from '@/components/ScrollToTop';

import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import './globals.css';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Heyoy Film',
    description: 'Heyoy Film',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProviderWrapper>
                    <Toaster position="top-right" richColors />
                    <div>
                        <ScrollToTop />
                        <div className="flex flex-col h-screen">
                            <MovieHeader />
                            <div className="flex-1">
                                <div className="bg-[#191919] h-full">{children}</div>
                            </div>
                        </div>
                    </div>
                </ThemeProviderWrapper>
            </body>
        </html>
    );
}
