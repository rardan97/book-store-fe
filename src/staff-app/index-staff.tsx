
import ReactDOM from 'react-dom/client';
import AppStaff from './AppStaff';
import { ThemeProvider } from './context/ThemeContext';
import { AppWrapper } from './components/common/PageMeta';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
<StrictMode>      
    <BrowserRouter>
    
    
<ThemeProvider>
    <AppWrapper>
        <AppStaff />
    </AppWrapper>
</ThemeProvider>
</BrowserRouter>
</StrictMode>
);
