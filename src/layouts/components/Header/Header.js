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
        title: 'Nổi tiếng',
        to: '/movie/popular/page/1',
        params: {
          title: 'Phim nổi tiếng',
        },
      },
      //   {
      //     title: 'Now Playing',
      //     to: '/movie/now-playing/page/1',
      //     params: {
      //       title: 'Now Playing Movies',
      //     },
      //   },
      {
        title: 'Sắp chiếu',
        to: '/movie/upcoming/page/1',
        params: {
          title: 'Phim sắp chiếu',
        },
      },
      {
        title: 'Đánh giá cao',
        to: '/movie/top-rated/page/1',
        params: {
          title: 'Phim được đánh giá cao nhất',
        },
      },
    ],
  },
  {
    title: 'TV Shows',
    data: [
      {
        title: 'Nổi tiếng',
        to: '/tv/popular/page/1',
        params: {
          title: 'Nổi tiếng',
        },
      },
      {
        title: 'Phát sóng hôm nay',
        to: '/tv/airing-today/page/1',
        params: {
          title: 'Phát sóng hôm nay',
        },
      },
      //   {
      //     title: 'On TV',
      //     to: '/tv/on-the-air/page/1',
      //     params: {
      //       title: 'On TV TV Shows',
      //     },
      //   },
      {
        title: 'Đánh giá cao',
        to: '/tv/top-rated/page/1',
        params: {
          title: 'TV Shows được đánh giá cao nhất',
        },
      },
    ],
  },
  // {
  //     title: 'People',
  //     data: [
  //         {
  //             title: 'Popular People',
  //             to: '/person',
  //         },
  //     ],
  //     mobileNone: true,
  // },
  // {
  //     title: 'More',
  //     data: [
  //         {
  //             title: 'Discussions',
  //             to: '/discuss',
  //         },
  //         {
  //             title: 'Leaderboard',
  //             to: '/leaderboard',
  //         },
  //         {
  //             title: 'Support',
  //             to: '/talk',
  //         },
  //         {
  //             title: 'API',
  //             href: 'https://developer.themoviedb.org/docs',
  //         },
  //     ],
  //     mobileNone: true,
  // },
];

function Header() {
  const { userCurrent } = useContext(UserContext);

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.headerRight)}>
        <Link to='/'>
          <img className={clsx(styles.logo)} src={logo} alt='Heyoy' />
        </Link>
        <ul className={clsx(styles.nav)}>
          {menuLeft.map((item, index) => {
            return (
              <li
                key={`menu-item-${index}`}
                className={clsx(styles.navItem, {
                  [styles['mobile-none']]: item?.mobileNone,
                })}
              >
                <Menu placement='bottom-start' data={item.data}>
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
