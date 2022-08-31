import './App.css';
import DragList from './components/DragList';
import Users from './components/Users';
import UserForm from './components/UserForm';
import UserFormEdit from './components/UserFormEdit';
import Departaments from './components/Departaments';
import DepartamentsForm from './components/DepartamentsForm';
import Login from './components/Login';
import { Router, Routes, Route, Navigate } from "react-router-dom";
import { history } from "./history";
import { useLayoutEffect, useState } from "react";
import { useSelector } from 'react-redux';

const CustomRouter = ({ isPrivate, history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};


const Rotas = () => {
  const user = useSelector(state => state.user);
  const isLogged = user.isLogged

  return (
    <div>
        <CustomRouter history={history}>
          <Routes>
            <Route exact path='/' element={<Login/>} />
            <Route exact path='/home' element={ !isLogged ? <Navigate to="/"/> : <DragList/>} />
            <Route exact path='/department' element={!isLogged ? <Navigate to="/"/> : <Departaments/>} />
            <Route exact path='/user' element={!isLogged ? <Navigate to="/"/> : <Users/>} />
            <Route exact path='/new-user' element={!isLogged ? <Navigate to="/"/> : <UserForm/>} />
            <Route exact path='/new-department' element={!isLogged ? <Navigate to="/"/> : <DepartamentsForm/>} />
            <Route exact path='/user-edit' element={!isLogged ? <Navigate to="/"/> : <UserFormEdit/> } />
          </Routes>
        </CustomRouter>
    </div>
  );
}

export default Rotas;
