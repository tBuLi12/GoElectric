import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route index element={<div>Dupa</div>}/>
          <Route path='dupa' element={<div>dupa</div>}/>
          <Route path='login' element={<LoginForm/>}/>
          <Route path='dishes' element={<WithUser>{user => <Dishes user={user}/>}</WithUser>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
