import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './MultiMenu.module.scss'
import Button from '~/components/Button';

function MenuItem({ item, onClick }) {
    return (
        <div className={clsx(styles.menuItem ,{
            [styles.separate]: item.separate
        })}>
            <Button menu to={item.to} href={item.href} onClick={onClick}>
            <div>
                {item.icon}
                <span className={clsx(styles.menuItemTitle)}>{item.title}</span>
            </div>
        </Button>
        </div>
    );
}

MenuItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func
}

export default MenuItem;
