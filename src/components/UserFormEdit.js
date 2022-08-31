import React, { useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap"; 
import axios from "axios";
import ModalResult from "./ModalResult";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { useSelector } from 'react-redux';
import Modelo from "./Modelo";

const getDepartment = async () => {

    const response = await axios.get('https://cmd-londrina.herokuapp.com/departamentos')
    return response.data;
}

const FormExibition = (props) => {
    const [ form, setForm ] = React.useState(props.user)
    const [ errors, setErrors ] =  React.useState({})
    const [ success, setSuccess ] =  React.useState(false)
    const [ failed, setFailed ] =  React.useState(false)
    const user = useSelector(state => state.user);
    const isLogged = user.isLogged


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

    const updateUser = async () =>{
        const response = await axios.put('https://cmd-londrina.herokuapp.com/usuarios', form)

        if(response.status === 200){
            setFailed(false)
            setSuccess(true)
        } else {
            setSuccess(false)
            setFailed(true)
        }
        
        return response
    }

    useEffect(() => {
        if (isLogged){
            axios.defaults.headers.Authorization = `Bearer ${user.token}`;
        } 
        if( Object.keys(form).length === 4){
            updateUser()
        }

    }, [form])


    const findFormErrors = () => {
        const { name, email, department } = form
        const newErrors = {}

        if ( !name || name === '') newErrors.name = 'Campo não pode ser nulo';
        if ( !email || email === '') newErrors.email = 'Campo não pode ser nulo';
        if ( !department || department === 0 ) newErrors.department = 'Campo não pode ser nulo';

        return newErrors;

    }

    const handleSubmit = async e => {
        e.preventDefault();

        const newErrors = findFormErrors();

        if (Object.keys(newErrors).length > 0){
            setErrors(newErrors);
        }else {
            updateUser();
        }

    }

    const FeedbackError = (error) => {
        if(!!error){
            return (
                <Form.Text style={{ color: '#EB453D' }}>
                    { error }
                </Form.Text>
            )
        }
    }


    if(props.departments !== undefined){
        return(
            <>
                <Form onSubmit={handleSubmit} className="p-4 block-example border border-dark rounded mb-0">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control defaultValue={form.name} type="text" onChange={ e => setField('name', e.target.value) }  isInvalid={ !!errors.name } placeholder="Insira o nome do usuario" />
                        { FeedbackError(errors.name) }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control defaultValue={form.email} type="email" onChange={ e => setField('email', e.target.value) } isInvalid={ !!errors.email } placeholder="Insira o email do usuario" />
                        { FeedbackError(errors.email) }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Select defaultValue={form.departamento_id} isInvalid={ !!errors.department } onChange={ e => setField('department', e.target.value) }>
                            <option value={0}></option>
                            {props.departments.map((item,index) => (
                                <option value={item.id}>{ item.name }</option>
                            ))}
                        </Form.Select>
                        { FeedbackError(errors.department) }
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button type="submit" variant="outline-success">Salvar</Button>
                        <Button type="submit" variant="outline-danger">Excluir</Button>
                    </div>
                </Form>
                { success ? <ModalResult text="Usuário atualizado com sucesso!" url="user"  tipo="success" ></ModalResult> : null }
                { failed ? <ModalResult text="Falha ao atualizar usuario, tente novamente mais tarde!" tipo="failed" ></ModalResult> : null }
            </>
            
            
        
        )
    } else {
        return(
            <></>
        )
    }
}



const UserFormEdit = () =>{
    const [departments, setDepartments] = React.useState(undefined);
    const location = useLocation()
    const user = location.state.user

    useEffect(() =>{

        const fetchData = async () => {
            setDepartments(await getDepartment());
            
        }
        fetchData().catch(console.error);
    
    },[])

    return(

        <>
            <Header></Header>
            <Modelo>

                <h3 style={{ marginBottom: '1.5rem' }}>Editar usuário</h3>

                <Alert variant={'warning'}>
                    A senha é gerada automaticamente e enviada ao email cadastrado.
                </Alert>

                <FormExibition user={user} departments={departments}></FormExibition>

            </Modelo>
        </>

    )

}

export default UserFormEdit;