import { useContext } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Header.module.scss';
import logo from '~/assets/images/logo.png';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import AddMovie from './AddMovie';
import Language from './Language';
import Search from './Search';
import UserAction from './UserAction';
import { UserContext } from '~/Context/UserProvider';

const menuLeft = [
    {
        title: 'Movies',
        data: [
            {
                title: 'Popular',
                to: '/movie/popular/page/1',
                params: {
                    title: 'Popular Movies',
                },
            },
            {
                title: 'Now Playing',
                to: '/movie/now-playing/page/1',
                params: {
                    title: 'Now Playing Movies',
                },
            },
            {
                title: 'Upcoming',
                to: '/movie/upcoming/page/1',
                params: {
                    title: 'Upcoming Movies',
                },
            },
            {
                title: 'Top Rated',
                to: '/movie/top-rated/page/1',
                params: {
                    title: 'Top Rated Movies',
                },
            },
        ],
    },
    {
        title: 'TV Shows',
        data: [
            {
                title: 'Popular',
                to: '/tv/popular/page/1',
                params: {
                    title: 'Popular',
                },
            },
            {
                title: 'Airing Today',
                to: '/tv/airing-today/page/1',
                params: {
                    title: 'Airing Today TV Shows',
                },
            },
            {
                title: 'On TV',
                to: '/tv/on-the-air/page/1',
                params: {
                    title: 'On TV TV Shows',
                },
            },
            {
                title: 'Top Rated',
                to: '/tv/top-rated/page/1',
                params: {
                    title: 'Top Rated TV Shows',
                },
            },
        ],
    },
    {
        title: 'People',
        data: [
            {
                title: 'Popular People',
                to: '/person',
            },
        ],
        mobileNone: true,
    },
    {
        title: 'More',
        data: [
            {
                title: 'Discussions',
                to: '/discuss',
            },
            {
                title: 'Leaderboard',
                to: '/leaderboard',
            },
            {
                title: 'Support',
                to: '/talk',
            },
            {
                title: 'API',
                href: 'https://developer.themoviedb.org/docs',
            },
        ],
        mobileNone: true,
    },
];

function Header() {
    const { userCurrent } = useContext(UserContext);

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.headerRight)}>
                <Link to="/">
                    <img className={clsx(styles.logo)} src={logo} alt="Heyoy" />
                </Link>
                <ul className={clsx(styles.nav)}>
                    {menuLeft.map((item, index) => {
                        return (
                            <li
                                key={`menu-item-${index}`}
                                className={clsx(styles.navItem, { [styles['mobile-none']]: item?.mobileNone })}
                            >
                                <Menu placement="bottom-start" data={item.data}>
                                    <Button text>{item.title}</Button>
                                </Menu>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className={clsx(styles.headerLeft)}>
                <div className={clsx(styles['user-actions'])}>
                    <AddMovie userCurrent={userCurrent} />

                    <Language />

                    <UserAction userCurrent={userCurrent} />
                </div>

                <Search />
            </div>
        </div>
    );
}

export default Header;
