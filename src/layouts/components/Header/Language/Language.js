import { useState, createContext } from 'react';
import Button from '~/components/Button';
import Popper from './Popper';

export const LanguageContext = createContext();

const language = {
    title: 'Language References',
    data: [
        {
            title: 'Tiếng Việt',
        },
        {
            title: 'Tiếng Anh',
        },
        {
            title: 'Tiếng Trung',
        },
    ],
};

function Language() {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true);
    };

    return (
        <LanguageContext.Provider value={[show, setShow]}>
            <div>
                <Popper addMessage language={language}>
                    <Button outline onClick={handleClick}>
                        VI
                    </Button>
                </Popper>
            </div>
        </LanguageContext.Provider>
    );
}

export default Language;
