'use client';

import { Moon, MagnifyingGlass, Sun } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AlignJustify, ChevronRight } from 'lucide-react';
import { Drawer } from 'flowbite-react';
import useDebounce from '@/hooks/useDebounce';
import { searchMovieService } from '@/lib/services/movieService';
import { BaseMovieData, MovieType } from '@/app/dataType';
import useClickOutside from '@/hooks/useClickOutside';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function MovieHeader() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const [isOpenSidebarModal, setIsOpenSidebarModal] = useState(false);

    const handleShowSidebarModal = () => setIsOpenSidebarModal(true);
    const handleCloseSidebarModal = () => setIsOpenSidebarModal(false);

    const [width, setWidth] = useState(0);
    const parentRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);

    const [searchValue, setSearchValue] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchResult, setSearchResult] = useState<{
        movies: BaseMovieData[];
        totalItems: number;
    }>({ movies: [], totalItems: 0 });

    const keywordSearch = useDebounce(searchValue, 400);

    const searchRef = useRef<HTMLDivElement | null>(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateSide = () => {
            if (parentRef.current && headerRef.current) {
                setWidth(parentRef.current.offsetWidth);
            }
            setIsMobile(window.innerWidth < 576 ? true : false);
        };

        updateSide();
        window.addEventListener('resize', updateSide);

        return () => {
            window.removeEventListener('resize', updateSide);
        };
    }, []);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const handleShowSearchResult = () => setShowSearchResult(true);
    const handleHideSearchResult = () => setShowSearchResult(false);

    useClickOutside(searchRef, handleHideSearchResult);

    useEffect(() => {
        (async () => {
            try {
                if (keywordSearch) {
                    const { data } = await searchMovieService(keywordSearch);
                    setSearchResult({
                        movies: data.data.items.map((i: any) => ({
                            movieId: i._id,
                            name: i.name,
                            slug: i.slug,
                            thumbUrl: i.thumb_url,
                            type: i.type === 'series' ? MovieType.TV : MovieType.MOVIE,
                        })),
                        totalItems: data.data.params.pagination.totalItems,
                    });
                } else {
                    setSearchResult({
                        movies: [],
                        totalItems: 0,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [keywordSearch]);

    return (
        <div ref={parentRef} className="w-full">
            <div ref={headerRef} className="h-16 bg-[#0a0a0a] shadow-sm fixed top-0 left-0 z-50" style={{ width }}>
                <div className="absolute top-0 left-2 sm:left-3 md:left-4 xl:left-5 h-full flex items-center justify-center">
                    <AlignJustify className="text-white" onClick={handleShowSidebarModal} />
                </div>
                {isOpenSidebarModal && (
                    <Drawer
                        open={isOpenSidebarModal}
                        onClose={handleCloseSidebarModal}
                        className="bg-[#0a0a0a] border-r border-[#2d2d2d]"
                    >
                        <Drawer.Items className="flex flex-col gap-y-3">
                            <Link href="/favorites" className="text-white block" onClick={handleCloseSidebarModal}>
                                Phim yêu thích
                            </Link>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="text-white flex items-center w-fit">
                                        Thể loại <ChevronRight />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    side={isMobile ? 'bottom' : 'right'}
                                    align="start"
                                    className="bg-[#2d2d2d] border-[#2d2d2d] border w-fit px-4 py-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
                                >
                                    {JSON.parse(sessionStorage.getItem('genreList') ?? '[]').map((g: any) => (
                                        <Link
                                            href={`/genre/${g.slug}`}
                                            className="text-white hover:text-orange-400 text-sm"
                                            key={`genre-${g.slug}`}
                                            onClick={handleCloseSidebarModal}
                                        >
                                            {g.name}
                                        </Link>
                                    ))}
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className="text-white flex items-center w-fit">
                                        Quốc gia <ChevronRight />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent
                                    side={isMobile ? 'bottom' : 'right'}
                                    align="start"
                                    className="bg-[#2d2d2d] border-[#2d2d2d] border w-fit px-4 py-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4"
                                >
                                    {JSON.parse(sessionStorage.getItem('countryList') ?? '[]').map((g: any) => (
                                        <Link
                                            href={`/country/${g.slug}`}
                                            className="text-white hover:text-orange-400 text-sm"
                                            key={`country-${g.slug}`}
                                            onClick={handleCloseSidebarModal}
                                        >
                                            {g.name}
                                        </Link>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </Drawer.Items>
                    </Drawer>
                )}
                <div className="max-w-[1064px] px-10 h-full mx-auto flex items-center justify-between gap-x-2 sm:gap-x-3 md:gap-x-6">
                    <div className="flex items-center">
                        <Link href="/" className="block w-fit">
                            <Image
                                className="w-8 sm:w-9 md:w-12 aspect-square"
                                src="/images/logo.png"
                                width={50}
                                height={50}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div
                        ref={searchRef}
                        className="max-w-96 flex-1 flex rounded-3xl items-center pe-4 h-fit bg-white relative"
                    >
                        <input
                            value={searchValue}
                            className="w-full rounded-3xl px-4 py-2 border-none outline-none bg-transparent text-black"
                            placeholder="Tìm kiếm phim"
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') router.push(`/search?keyword=${searchValue}`);
                            }}
                            onFocus={handleShowSearchResult}
                        />
                        <MagnifyingGlass className="text-black" />
                        {searchResult.movies.length > 0 && showSearchResult && (
                            <div
                                className={`py-1 flex flex-col bg-white rounded-sm shadow-all-sides ${
                                    isMobile
                                        ? 'fixed top-[calc(3.8rem)] left-2 right-2 '
                                        : 'absolute top-[calc(100%+0.3rem)] left-0 right-0'
                                }`}
                            >
                                {searchResult.totalItems > 0 && (
                                    <Link
                                        href={`/search?keyword=${searchValue}`}
                                        className="text-primary text-sm px-4 mb-1"
                                    >
                                        Xem tất cả
                                    </Link>
                                )}
                                {searchResult.movies.slice(0, 10).map((r) => (
                                    <Link
                                        href={`/${r.slug}`}
                                        className="text-black px-4 line-clamp-1 break-all"
                                        key={`result-${r.movieId}`}
                                        onClick={() => {
                                            handleHideSearchResult();
                                            setSearchValue('');
                                        }}
                                    >
                                        {r.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            onClick={toggleTheme}
                            className="relative w-12 h-6 bg-muted rounded-full transition-all duration-300 flex items-center justify-between px-1"
                        >
                            {theme === 'dark' ? (
                                <Moon className="absolute top-1 right-1 w-4 h-4" />
                            ) : (
                                <Sun className="absolute color-red top-1 left-1 w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-16"></div>
        </div>
    );
}
