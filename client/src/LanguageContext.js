import React from 'react';

const LanguageContext = React.createContext({
  lng: 'en',
  setLng: () => {},
});

export default LanguageContext;