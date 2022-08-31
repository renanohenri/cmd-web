import React, { useEffect } from "react";
import { Table, Alert } from "react-bootstrap"; 
import Loader from "./Loader";
import axios from "axios";
import Header from "./Header";
import { useSelector } from 'react-redux';
import Modelo from "./Modelo";

const getDepartment = async () => {

    const response = await axios.get('https://cmd-londrina.herokuapp.com/departamentos')
    return response.data;
}

const Departaments = () =>{ 
    const [departments, setDepartments] = React.useState(undefined);
    const user = useSelector(state => state.user);
    const isLogged = user.isLogged

    useEffect(() =>{
        if (isLogged){
            axios.defaults.headers.Authorization = `Bearer ${user.token}`;
        } 
        const fetchData = async () => {
            setDepartments(await getDepartment());
            
        }
        fetchData().catch(console.error);
    
    },[])


    return(
        <>
            <Header></Header>
            <Modelo>

                <h3 style={{ marginBottom: '1.5rem' }}>Departamentos</h3>

                <Alert variant={'warning'}>
                    Para criar usuários é necessário que existam departamentos!
                </Alert>
                
                <div className="pb-4 d-flex justify-content-end">
                    <a href="new-department" className="btn btn-outline-success">Novo departamento</a>
                </div>
                

                {

                    departments !== undefined ?
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Usuários cadastrados</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departments.map((depart,_) => (
                                        <tr key={ depart.id }>
                                            {/* <td>{ user.id }</td> */}
                                            <td>{ depart.name }</td>
                                            <td>{ depart.count }</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    :
                        null
                }
                
               
            </Modelo>
            { 
                departments !== undefined ? <Loader show={false}></Loader> : <Loader show={true}></Loader>
            }
        </>
    )

}

export default Departaments;