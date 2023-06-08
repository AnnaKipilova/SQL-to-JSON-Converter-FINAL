import style from './ConnectForm.module.css';
import Axios from 'axios';
import Input from '../UI/input/Input';
import React, { useState, FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const ConnectForm = (
    {
        onSuccess,
        handleAllTableNamesList
    }) => {

    const { t, i18n } = useTranslation();

    // const [host, setHost] = useState("dbs.kpi.fei.tuke.sk");
    // const [user, setUser] = useState("kipilova");
    // const [password, setPassword] = useState("kipilova");
    // const [database, setDatabase] = useState("kipilova");

    const [host, setHost] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [database, setDatabase] = useState("");
    const [connectError, setConnectError] = useState("");

    // pripojenie na databazu
    const connectToDatabase = (event) => {
        event.preventDefault(); // aby sa neotvorila nova stranka pri submitnuti

        Axios.post('http://localhost:3001/connect', {
        host: host,
        user: user,
        password: password,
        database: database,
        }).then(response => {
            handleAllTableNamesList(response.data);
            setConnectError("");
            onSuccess();
        }).catch((error) => {
            console.error('Failed to connect to database:', error.message);
            setConnectError("Can't connect to database!");
        });
    };

    return (
        <div className={style.databaseForm}>
            <form onSubmit={connectToDatabase}>
                <Input label={t('host')} type="text" onChange={host => setHost(host)} value={host} />
                <Input label={t('user')} type="text" onChange={user => setUser(user)} value={user} />
                <Input label={t('password')} type="password" onChange={password => setPassword(password)} value={password} />
                <Input label={t('database')} type="text" onChange={database => setDatabase(database)} value={database} />
                {connectError && (
                    <div className={style.connectError}>
                        {connectError}
                    </div>
                )}
                <button className={style.buttonSubmit} type='submit'>{t('connectModal')}</button>
            </form>
        </div>
        
    );
};

export default ConnectForm;