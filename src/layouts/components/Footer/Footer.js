import clsx from 'clsx';
import styles from './Footer.module.scss';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.social)}>
                <Link to="/facebook">
                    <FacebookIcon className={clsx(styles.socialIcon)} />
                </Link>
                <Link to="/instagram">
                    <InstagramIcon className={clsx(styles.socialIcon)} />
                </Link>
                <Link to="/twitter">
                    <TwitterIcon className={clsx(styles.socialIcon)} />
                </Link>
                <Link to="/youtube">
                    <YoutubeIcon className={clsx(styles.socialIcon)} />
                </Link>
            </div>
            <div className={clsx(styles.footerContent)}>
                <div className={clsx(styles.contentMember)}>
                    <ul>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Audio and Subtiles</Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Media Center</Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Privacy</Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <div className={clsx(styles.contentMember)}>
                    <ul>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Audio Description</Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Investor Relations</Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Legal Notices</Link>
                        </li>
                    </ul>
                </div>
                <div className={clsx(styles.contentMember)}>
                    <ul>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Help Center</Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Jobs</Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Cookie Preferences</Link>
                        </li>
                    </ul>
                </div>
                <div className={clsx(styles.contentMember)}>
                    <ul>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Gift Cards</Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Terms Of Use</Link>
                        </li>
                        <li>
                            <Link className={clsx(styles.contentLink)} to="/">Corporate Information</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={clsx(styles.copyRight)}>
            <Link className={clsx(styles.copyRightLink)} to="/">@Bản quyền thuộc HQB Heyoy</Link></div>
        </div>
    );
}

export default Footer;
