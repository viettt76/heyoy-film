import Footer from '../components/Footer';
import Header from '../components/Header';

const HeaderFooterLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default HeaderFooterLayout;
