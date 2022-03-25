import React from 'react';
import { Routes, Route} from 'react-router-dom'

import { Group } from './pages/Group/Group'
import { Home } from './pages/Home/Home'
import { Notes } from './pages/Notes/Notes'
import { Schedule } from './pages/Schedule/Schedule'
import { Subjects } from './pages/Subjects/Subjects'
import { Settings } from './pages/Settings/Settings';

import { NavigationMenu} from './components/NavigationMenu/NavigationMenu'
import { Layout } from './components/Layout/Layout';
import { Login } from './pages/Login/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='group' element={<Group/>}/>
        <Route path='notes' element={<Notes/>}/>
        <Route path='schedule' element={<Schedule/>}/>
        <Route path='subjects' element={<Subjects/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='login' element={<Login/>}/>
      </Route>
    </Routes>
  );
}

export default App;
