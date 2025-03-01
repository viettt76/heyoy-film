'use client';

import { MovieItem } from '@/components/MovieItem';
import { BaseMovieData, MovieType } from '@/app/dataType';
import { searchMovieService } from '@/lib/services/movieService';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/navigation';
import useMoviesPerSlide from '@/hooks/useMoviesPerSlide';

export default function SearchMovie() {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword');
    const page = Number(searchParams.get('page'));
    const router = useRouter();

    const moviesPerSlide = useMoviesPerSlide();

    const [results, setResults] = useState<{
        movies: BaseMovieData[];
        totalPages: number;
    }>({
        movies: [],
        totalPages: 0,
    });

    useEffect(() => {
        (async () => {
            try {
                if (keyword) {
                    const { data } = await searchMovieService(keyword, page);
                    setResults({
                        movies: data.data.items.map((i: any) => ({
                            movieId: i._id,
                            name: i.name,
                            slug: i.slug,
                            thumbUrl: `${process.env.NEXT_PUBLIC_BASE_MOVIE_IMAGE}${i.thumb_url}`,
                            type: i.type === 'series' ? MovieType.TV : MovieType.MOVIE,
                        })),
                        totalPages: Math.ceil(
                            data.data.params.pagination.totalItems / data.data.params.pagination.totalItemsPerPage,
                        ),
                    });
                } else {
                    setResults({
                        movies: [],
                        totalPages: 0,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [keyword, page]);

    return (
        <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-10 pt-6">
            <div className="text-orange-400 text-2xl">Tìm kiếm &quot;{keyword}&quot;</div>
            <div
                className={`grid gap-x-2 gap-y-4 mt-2`}
                style={{
                    gridTemplateColumns: `repeat(${moviesPerSlide}, minmax(0, 1fr))`,
                }}
            >
                {results.movies.map((m, index) => {
                    return (
                        <MovieItem
                            movieId={m.movieId}
                            name={m.name}
                            slug={m.slug}
                            thumbUrl={m.thumbUrl}
                            type={m.type}
                            isFirst={index % moviesPerSlide === 0}
                            isLast={(index + 1) % moviesPerSlide === 0}
                            key={`movie-${m.movieId}`}
                        />
                    );
                })}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={(p) => router.push(`/search?keyword=${keyword}&page=${p.selected + 1}`)}
                pageRangeDisplayed={5}
                pageCount={results.totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="mt-4 mb-4 flex justify-center text-white gap-x-2"
                breakClassName="w-8 h-8 flex items-center justify-center bg-gray/40"
                pageClassName="w-8 h-8 flex items-center justify-center bg-gray/40"
                previousClassName="w-8 h-8 flex items-center justify-center bg-gray/40"
                nextClassName="w-8 h-8 flex items-center justify-center bg-gray/40"
                activeClassName="text-primary"
                disabledClassName="hidden"
            />
        </div>
    );
}
