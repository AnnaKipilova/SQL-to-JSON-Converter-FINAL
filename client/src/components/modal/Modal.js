import style from './Modal.module.css';

import ConnectForm from '../connectForm/ConnectForm';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Modal = (
    {
        showModal,
        onClose,
        handleAllTableNamesListtoApp,
        handleDatabaseConnectedtoApp
    }) => {

    const { t, i18n } = useTranslation();

    const [databaseConnected, setDatabaseConnected] = useState(false);
    const [allTableNamesList, setAllTableNamesList] = useState();

    function handleAllTableNamesList(tableNames) {
        setAllTableNamesList(tableNames);
        handleAllTableNamesListtoApp(tableNames);
    }

    const handleDatabaseConnected = () => {
        setDatabaseConnected(true);
        handleDatabaseConnectedtoApp(true);
    }

    // inšpirované z https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.keyCode === 27) {
                onClose();
            }
        }

        window.addEventListener('keydown', handleEscapeKey);

        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };

    }, [onClose]);

    return (
        <>
            {showModal && (
                <>
                
                <div className={style.modal}>
                <div className={style.background} onClick={onClose} />
                    {!databaseConnected ? (
                        <ConnectForm onSuccess={handleDatabaseConnected} handleAllTableNamesList={handleAllTableNamesList} />
                    ) : (
                        <div>
                            <h2 className={style.h2}>{t('connectSuccess')}</h2>
                            <button className='connectOKButton' type='submit' onClick={onClose} >{t('ok')}</button>
                        </div>
                    )}
                </div>
                </>
            )}
        </>
    );
};

export default Modal;