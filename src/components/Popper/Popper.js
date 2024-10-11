import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import clsx from 'clsx';
import styles from './Popper.module.scss';

function Popper({ className, content, children }) {
    const _content = <div className={clsx(styles.content)}>{content}</div>;

    return (
        <Tippy zIndex={999999} className={className} interactive content={_content} placement="bottom">
            {children}
        </Tippy>
    );
}

Popper.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired 
}

export default Popper;
