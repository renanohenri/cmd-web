import React, { useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap"; 
import ModalResult from "./ModalResult";
import axios from "axios";
import Header from "./Header";
import { useSelector } from 'react-redux';
import Modelo from "./Modelo";

const DepartamentsForm = () =>{
    const [ form, setForm ] = React.useState({})
    const [ errors, setErrors ] =  React.useState({})
    const [ success, setSuccess ] =  React.useState(false)
    const [ failed, setFailed ] =  React.useState(false)
    const user = useSelector(state => state.user);
    const isLogged = user.isLogged

    useEffect(() =>{
        if (isLogged){
            axios.defaults.headers.Authorization = `Bearer ${user.token}`;
        } 
    },[])


    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        });
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }


    const postDepartment = async () =>{

        const response = await axios.post('https://cmd-londrina.herokuapp.com/department', form)
        
        if(response.status === 200){
            setFailed(false)
            setSuccess(true)
        } else {
            setSuccess(false)
            setFailed(true)
        }
        
        return response
    }


    const findFormErrors = () => {
        const { department } = form
        const newErrors = {}

        if ( !department || department === '') newErrors.department = 'Campo não pode ser nulo';

        return newErrors;

    }

    const handleSubmit = async e => {
        e.preventDefault();

        const newErrors = findFormErrors();

        if(!newErrors) {
            return
        } else{
            await postDepartment()
        }

    }

    return(

        <>
            <Header></Header>
            <Modelo>

                <h3 style={{ marginBottom: '1.5rem' }}>Novo Departamento</h3>

                <div className="pb-4 ">
                    <Alert variant={'warning'}>
                        Preencha todos os campos. É essencial cadastrar um departamento!
                    </Alert>
                </div>

                <Form onSubmit={handleSubmit} className="p-4 block-example border border-dark rounded mb-0">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome do departamento:</Form.Label>
                        <Form.Control onChange={ e => setField('department', e.target.value) } type="text" placeholder="Insira o nome do departamento" />
                    </Form.Group>

                    <Button type="submit" variant="outline-success">Cadastrar</Button>
                </Form>
            


            </Modelo>
            { success ? <ModalResult text="Departamento cadastrado com sucesso!" url="department"  tipo="success" ></ModalResult> : null }
            { failed ? <ModalResult text="Falha ao cadastrar departamento, tente novamente mais tarde!" tipo="failed" ></ModalResult> : null }
        </>

    )

}

export default DepartamentsForm;