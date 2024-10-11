import clsx from 'clsx';
import Header from '../components/Header';
import styles from './MainLayout.module.scss';
import Footer from '../components/Footer';

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={clsx(styles.slider)}></div>
            {children}
            <Footer />
        </div>
    );
}

export default MainLayout;
