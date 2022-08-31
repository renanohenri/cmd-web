import React from "react";
import { Dropdown, ButtonGroup, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MdOutlineLogout } from "react-icons/md";
import { useSelector } from 'react-redux';
import { TiGroupOutline, TiClipboard, TiThLargeOutline, TiTabsOutline } from "react-icons/ti";
import { history } from '../history';
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import logo from './logo192.png';
import axios from "axios";
import styled from "styled-components";
import { version } from "../../package.json";

const Menu = styled.div`
  position: fixed;
  min-height: 100vh !important;
  height: 100vh;
  width: 5vw;
  background: #263B59;
  opacity: 100%;
  z-index: 1000;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Nav = styled.div`
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.12);
  margin-top: 0;
  height: 50px;
  width: 100%;
  background: #FDFDFD;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999;
  padding-right: 30px;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 28px;
`;

const BgIcon = styled.a`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #E8E8E8;
  background: ${props => props.selected === true ? '#485C79' : 'transparent' };
  &:hover {
    background: #485C79;
    color: #B1C4DF;
  }
`;

const BgLogo = styled.div`
  height: 50px;
  width: 5vw;
  background: #FDFDFD;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Versao = styled.div`
  color: #8097B6;
  font-size: 12px;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;

`

const Header = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const pathUrl = window.location.pathname;

    async function handleLogout(){
      dispatch(logout())
      axios.defaults.headers.Authorization = undefined;
      history.push('/')
    }

    return (
        
        <header>
          <Menu>
            <div style={{ display: 'flex', flexDirection: "column" }}>
              <BgLogo>
                <Image src={logo} width="40"/>
              </BgLogo>
              <Icons>
                <OverlayTrigger placement="right" overlay={<Tooltip>Quadro</Tooltip>}>
                  <BgIcon selected={pathUrl === '/home'} href="home">
                    <TiThLargeOutline></TiThLargeOutline>
                  </BgIcon>
                </OverlayTrigger>
                <OverlayTrigger placement="right" overlay={<Tooltip>Usuários</Tooltip>}>
                  <BgIcon selected={pathUrl === '/user' || pathUrl === '/new-user' || pathUrl === '/user-edit'} href="user">
                    <TiGroupOutline></TiGroupOutline>
                  </BgIcon>
                </OverlayTrigger>
                <OverlayTrigger placement="right" overlay={<Tooltip>Departamentos</Tooltip>}>
                  <BgIcon selected={pathUrl === '/department' || pathUrl === '/new-department'} href="department">
                    <TiTabsOutline></TiTabsOutline>
                  </BgIcon>
                </OverlayTrigger>
                <OverlayTrigger placement="right" overlay={<Tooltip>Licenças</Tooltip>}>
                  <BgIcon href="home">
                    <TiClipboard></TiClipboard>
                  </BgIcon>
                </OverlayTrigger>
              </Icons>
            </div>
            <Versao>
              <strong style={{ marginRight: '5px' }}>T.I</strong> { version }
            </Versao>
          </Menu>
          <Nav>
            <div style={{ marginLeft: '5vw', paddingLeft: '30px' }}>
              <span>Colégio Mãe de Deus</span>
            </div>
            <Dropdown focusFirstItemOnShow as={ButtonGroup} align={{ lg: 'end' }}>
              
              <Dropdown.Toggle id="dropdown-basic">

                <span>
                  Bem vindo(a), 
                </span>
                <span style={{ fontWeight: 600, paddingLeft: 10}}>
                  { user.name }
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Sair  <MdOutlineLogout color="grey" size={28} style={{ paddingLeft: 4 }}></MdOutlineLogout></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </header>

    )
}

export default Header;