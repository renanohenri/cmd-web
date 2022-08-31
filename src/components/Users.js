import React, { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { MdSettings, MdSearch, MdUnfoldMore, MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Loader from "./Loader";
import { useSelector } from 'react-redux';
import Modelo from "./Modelo";
import Pagination from "./Pagination";
import styled from "styled-components";


var curretTypeSort = 0;

const PerPage = styled.div`
    display: flex;
    align-items: center;
    height: 35.5px;2
    width: auto;
    border: 0.5px solid #E9ECEF;
    border-radius: 3px;
    padding-left: 8px;
    padding-right: 8px;
`

const Search = styled.div`
    width: 300px;
    height: 40px;
    font-size: 16px;
    background: #ffffff;
    display: flex;
    align-items: center;
    border: 1px solid #D9D9D9;
    color: #454A67;
    padding-left: 10px;
    border-radius: 3px;
`

const InputSearch = styled.input`
    width: 300px;
    height: 38px;
    font-size: 16px;
    border: none;
    background: #ffffff;
    color: #454A67;
    padding-left: 10px;
`

const Users = () =>{ 
    const [users, setUsers] = React.useState(undefined);
    const [copyUsers, setCopyUsers] = React.useState(undefined);
    const user = useSelector(state => state.user);
    const isLogged = user.isLogged
    const [currentPage, setCurrentPage] = useState(1);
    const [userPerPage, setUserPerPage] = useState(5);


    useEffect(() =>{
        if (isLogged){
            axios.defaults.headers.Authorization = `Bearer ${user.token}`;
        }
        const fetchData = async () => {
            const response = await axios.get('https://cmd-londrina.herokuapp.com/usuarios');
            setUsers(response.data);
            setCopyUsers(response.data)
        }
        fetchData().catch(console.error);
    
    },[])

    //retorna usuarios atuais
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUsers = copyUsers ? copyUsers.slice(indexOfFirstUser, indexOfLastUser) : [];
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
    };

    function changePerPage(number) {
        setUserPerPage(number)
    }

    function searchStringInArray (str, strArray) {
        let result = []

        for (var j=0; j<strArray.length; j++) {
            if (strArray[j].name.toLowerCase().includes(str.toLowerCase())){
                result.push(strArray[j]);
            }
        }

        return result
    }

    function handleChange(event) {
        const result = searchStringInArray(event.target.value, users)
        setCopyUsers(result);
        setCurrentPage(1)
    }
    
    return(
        <>
            <Header></Header>
            <Modelo>

                <h3 style={{ marginBottom: '1.5rem' }}>Usuários</h3>

                <Alert variant={'warning'}>
                    Para que os professores tenham acesso ao Mãe de Deus App é necessário cadastra-los nos sistema!
                </Alert>
                
                <div className="pb-4 d-flex justify-content-between">
                    <Search>
                        <MdSearch size={24} color={'#B2B2B2'}></MdSearch>
                        <InputSearch type="text" placeholder="Pesquisar" onChange={handleChange}></InputSearch>
                    </Search>
                    <a href="new-user" className="btn btn-outline-success">Novo usuário</a>
                </div>

                {
                    copyUsers !== undefined ?
                    

                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    {/* <th></th> */}
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Senha</th>
                                    <th>Departamento</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentUsers.map((user,_) => (
                                        <tr key={ user.id }>
                                            <td>{ user.name }</td>
                                            <td>{ user.email }</td>
                                            <td>{ user.password }</td>
                                            <td>{ user.named }</td>
                                            <td className="d-flex justify-content-center">
                                                <Link to={'/user-edit'} state={{ user }}>
                                                    <MdSettings></MdSettings>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    :
                        null
                }
                {
                    copyUsers !== undefined? 
                    <div className="d-flex justify-content-between">
                        <Pagination userPerPage={userPerPage} totalUser={copyUsers.length} paginate={paginate} current={currentPage}></Pagination> 
                        <div className="d-flex">
                            <PerPage>
                                Por página
                            </PerPage>
                            <select className="select" defaultValue={userPerPage} onChange={e => changePerPage(e.target.value)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    </div>
                    : null
                }
                
            </Modelo>

            {
                users !== undefined ?  <Loader show={false}/> :  <Loader show={true}/>
            }
        </>
       
    )

}

export default Users;