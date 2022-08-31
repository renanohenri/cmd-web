import React, { useEffect } from "react";
import styled from "styled-components";
import { Form, Button, Alert, Image } from "react-bootstrap"; 
import imgBackground from "../assets/_home.jpg"
import Loader from "./Loader"
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { history } from '../history';
import axios from "axios";
import { version } from "../../package.json";
import logo from './logo192.png';

const FullArea = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    min-height: 100%;
    background: url(${imgBackground}) fixed;
    background-position: center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: inset 0 0 50em black;
`;

const RectArea = styled.div`
    width: 55%;
    height: auto;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 70px;
    padding-right: 70px;
    border-radius: 10px;

`;

const FormField = styled.div`
    width: 50%;
    height: auto;
    display: flex;
    align-items: end;
    flex-direction: column;
    padding-bottom: 40px;
    padding-top: 40px;

`;

const Login = () => {
    const [ form, setForm ] = React.useState({})
    const [showLoader, setShowLoader] = React.useState(false);
    const [error, setErrors] = React.useState(null);
    const dispatch = useDispatch();

    useEffect(() =>{
        setShowLoader(false)
    },[])
    
    const handleLogin = async e =>{
        setShowLoader(true);
        e.preventDefault();

        let data = []

        try {
            data = await axios.post('https://cmd-londrina.herokuapp.com/authenticate', form)
        } catch (error) {
            data = { error: 'Indisponibilidade do servidor!'}
        }

        data = data.data || data;

        if (data.token){
            dispatch(login(data))
            axios.defaults.headers.Authorization = `Bearer ${data.token}`;
            history.push('/home')
        }else{
            setErrors(data.error)
            setTimeout(() => {
                setErrors(null)
            }, 8000);
        }
        setShowLoader(false);
    }
    
    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        });
    }

    const FeedbackError = () => {
        if(error != null){
            return (
                <Alert style={{ width: '78%', margin: 0 }} variant={'danger'}>
                   { error }
                </Alert>
            )
        }
    }

    return(
        <FullArea className="body-login">
            <RectArea>
                <Image src={logo} width="250"/>
                <div style={{ width: '1px', height: '80%', background: '#CACACA' }}></div>
                <FormField>
                    <h1 style={{color: '#273B5A', fontWeight: 800, margin: 0 }}>T.I</h1>
                    <h5  style={{ fontWeight: 300 }}>Bem vindo!</h5>
                    { FeedbackError() }
                    <Form className="pt-2">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={ e => setField('email', e.target.value) } type="email" placeholder="Insira seu email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control onChange={ e => setField('password', e.target.value) } type="password" placeholder="Insira sua senha" />
                        </Form.Group>
                        <Button onClick={handleLogin}  style={{ width: '100%', marginTop: '10px' }} variant="primary">
                            Entrar
                        </Button>   
                    </Form>
                    <div className="pt-3" style={{ color: "gray", fontSize: 14 }} > 
                    CMD TI - { version }
                    </div>
                </FormField>
            </RectArea>
            {
                showLoader === true ? <Loader show={true}></Loader> : <Loader show={false}></Loader> 
            }
            
        </FullArea>
    )
}

export default Login;