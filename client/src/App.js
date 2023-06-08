import './App.css';
import './components/UI/input/Input';
import {useState} from 'react';
import Axios from 'axios';
import Modal from './components/modal/Modal'; 
import DropdownMultiSelect from './components/select/DropdownMultiSelect';
import { useTranslation } from 'react-i18next';
import LanguageContext from './LanguageContext';
import Dropdown from 'react-dropdown';
import { useRef } from 'react';

const lngs = {
  en: { nativeName: 'EN' },
  sk: { nativeName: 'SK' }
}

function App() {

  const [lng, setLng] = useState('en');
  const [selectedLng, setSelectedLng] = useState(null);

  const { t, i18n } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState();
  const [errorMessage, setErrorMessage] = useState(t('errorMessageEmpty'));
  const [SQLfromUser, setSQLfromUser] = useState("");

  const [allTableNamesListtoApp, setAllTableNamesListtoApp] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();
  const [databaseConnected, setDatabaseConnected] = useState(false);

  const textareaRef = useRef(null);

  const options = allTableNamesListtoApp.map((option) => ({
    value: option.table_name,
    label: option.table_name,
  }));

  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  // ziskanie vsetkych dat z databazy
  const getAllData = () => {
    setJsonData([]);
    sleep(5000);

    Axios.get('http://localhost:3001/all_data', {
      params: {
        selectedOptions: JSON.stringify(selectedOptions)
      }
    }).then((response) => { 
      setJsonData(response.data);
      console.log("I want JSON from these tables");
      console.log(selectedOptions);
      console.log("I want JSON from these tables");
    });
  };

  // na backend posleme sql query string od usera a odpoved vo formate json dostaneme ako response
  const convertButton = () => {
    setJsonData([]);
    sleep(5000);

    if (SQLfromUser.length === 0) {
      setJsonData();
    } else {
      Axios.post('http://localhost:3001/api/sql', {
        SQLfromUser,
      }).then(response => {
        setJsonData(response.data);
        console.log('==========================');
        console.log(jsonData);
        console.log('==========================');
      })
      .catch(error => {
        console.log("!!!!!!!!!!!!!!!!!!!!1");
        console.error(error);
        setErrorMessage(error.response.data || 'Unknown error');
        setJsonData();
      });
    }
  };

  // prevzaté z https://codesandbox.io/s/4t2xb?file=/src/App.js
  const exportData = () => {
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
  
    // prompt the user for the filename
    const filename = prompt(t('fileName'), "data.json");

    if (!filename) {
      return;
    }
  
    // create an invisible a element
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
  
    // set the href and download attributes of the a element and simulate a click on the element
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  
    // remove the a element and revoke the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const copy = () => {
    navigator.clipboard.writeText(textareaRef.current.value);
  };
  
  

  const handleTextAreaChangeJson = (e) => {
    setJsonData(JSON.parse(e.target.value))
  }

  const handleTextAreaChangeSQL = (event) => {
    setSQLfromUser(event.target.value);
  };

  const handleAllTableNamesListtoApp = (tableNames) => {
    setAllTableNamesListtoApp(tableNames);
    console.log("This is parent 2");
    console.log(tableNames);
    console.log("This is parent 2");
  }

  const handleDatabaseConnectedtoApp = () => {
    setDatabaseConnected(true);
  }

  return (
    <LanguageContext.Provider value={{ lng, setLng }}>

    <div className="App">
      <header>
        <h1>{t('header')}</h1>
      </header>
      <div className='body'>
        <div className='lng'>
          {Object.keys(lngs).map((lng) => (
            <button type='submit' key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng} >{lngs[lng].nativeName}</button>
          ))}
        </div>
        <button className='Btnconnect' onClick={() => setIsModalOpen(true)}>{t('connect')}</button>
        <div className='dropdown'>
          <DropdownMultiSelect className='DropdownMultiSelect' allOptions={options} selectedOptions={setSelectedOptions} disabled={databaseConnected ? false : true} />
          <button className='BtnGetJson' onClick={getAllData} disabled={databaseConnected ? false : true} >{t('showJson')}</button>
        </div>
        <div className='textAreaHeaders'>
          <div className='inputHeader'>
            {t('input')}
          </div>
          <div className='outputHeader'>
            {t('output')}
          </div>
        </div>
        <div className='textAreas'>
          <div className='SQLcodeArea'>
            <textarea className='textareaSQL' value={SQLfromUser} onChange={handleTextAreaChangeSQL} placeholder={t('textareaSQLPlaceholder')} ></textarea>
            <button className='BtnConvert' onClick={() => convertButton()}>{t('convert')}</button>
          </div>
          <div className='JSONcodeArea'>            
            <textarea className='textareaJson' ref={textareaRef} value={jsonData ? JSON.stringify(jsonData, null, 2) : t('errorMessageEmpty')} onChange={handleTextAreaChangeJson} disabled></textarea>
            <div className='BtnCopySave'>  
              <button className='BtnCopy' onClick={() => copy()}>{t('copy')}</button>
              <button className='BtnSave' onClick={() => exportData()}>{t('save')}</button>
            </div>
          </div>
        </div>
        <Modal showModal={isModalOpen} onClose={() => setIsModalOpen(false)} handleDatabaseConnectedtoApp={handleDatabaseConnectedtoApp} handleAllTableNamesListtoApp={handleAllTableNamesListtoApp} />
      </div>
    </div>

    </LanguageContext.Provider>
  );
};

export default App;
