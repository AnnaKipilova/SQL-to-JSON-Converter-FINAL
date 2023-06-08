// dokumentácia knižnice: https://react.i18next.com/

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    header: 'SQL to JSON Converter',
                    connect: 'Connect to database',
                    connectModal: 'Connect',
                    connectSuccess: 'Connection to database is active!',
                    ok: 'OK',
                    host: 'Host',
                    user: 'User',
                    password: 'Password',
                    database: 'Database',
                    dropdownMultiSelectPlaceholder: 'Select tables...',
                    dropdownMultiSelectSelectAll: 'Select all',
                    dropdownMultiSelectAllIsSelected: 'All is selected',
                    showJson: 'Display JSON',
                    textareaSQLPlaceholder: 'Type your SQL code here.',
                    convert: 'Convert',
                    save: 'Save',
                    errorMessageEmpty: 'Nothing to display',
                    fileName: 'Enter a filename',
                    input: 'SQL input',
                    output: 'JSON output',
                    copy: 'Copy',
                }
            },
            sk: {
                translation: {
                    header: 'Konvertor SQL do JSON',
                    connect: 'Pripojiť na databázu',
                    connectModal: 'Pripojiť',
                    connectSuccess: 'Pripojenie na databázu je aktívne!',
                    ok: 'OK',
                    host: 'Hostiteľský server',
                    user: 'Používateľ',
                    password: 'Heslo',
                    database: 'Databáza',
                    dropdownMultiSelectPlaceholder: 'Vybrať tabuľky...',
                    dropdownMultiSelectSelectAll: 'Vybrať všetky',
                    dropdownMultiSelectAllIsSelected: 'Všetky vybrané',
                    showJson: 'Zobraziť JSON',
                    textareaSQLPlaceholder: 'Tu zadajte SQL kód.',
                    convert: 'Konvertovať',
                    save: 'Uložiť',
                    errorMessageEmpty: 'Nie je čo zobraziť',
                    fileName: 'Zadajte názov súboru',
                    input: 'SQL vstup',
                    output: 'JSON výstup',
                    copy: 'Kopírovať',
                }
            }
        }
});

export default i18next;