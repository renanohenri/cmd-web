import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import axios from "axios";
import { Alert } from "react-bootstrap"; 
import Header from "./Header";
import Loader from "./Loader";
import { useSelector } from 'react-redux';
import Modelo from "./Modelo";
import Legenda from "./Legenda";
import ModalResult from "./ModalResult";

const DragDropContextContainer = styled.div`
  margin-top: 0.5rem
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};



const lists = ["Aguardando", "Retirada", "Concluido"];



function DragList() {
  const [elements, setElements] = React.useState(undefined);
  const [ pontualidade, setPontualidade ] =  React.useState(false)
  const user = useSelector(state => state.user);
  const isLogged = user.isLogged

  useEffect(() =>{
    if (isLogged){
      axios.defaults.headers.Authorization = `Bearer ${user.token}`;
    }
    const fetchData = async () => {
      setElements(await getItens());
    }
    fetchData().catch(console.error)
    atualizarBoard();
  },[])

  const getItens = async () => {
  
    const elements = {
      aguardando: [],
      retirada: [],
      concluido: []
    }
    const response = await axios.get('https://cmd-londrina.herokuapp.com/agendas');
    const data = response.data;
    const keys = Object.keys(elements);
  
    data.forEach(element => {
        keys.forEach(key => {
          if(key.toUpperCase() === element.status){
            elements[key].push(element)
          }
        })
    });
    verificarPontualidade(elements.aguardando)
    return elements
  }
  
  const changeStatus = async (uuid, status) => {
    return await axios.put('https://cmd-londrina.herokuapp.com/agendas/update', { uuid: uuid, status: status});
  }

  const atualizarBoard = () => {
    setInterval(() => {
      if (isLogged){
        axios.defaults.headers.Authorization = `Bearer ${user.token}`;
      }
      setElements(undefined)
      const fetchData = async () => {
        setElements(await getItens());
      }
      fetchData().catch(console.error)
    }, 60000)
  }

  const getHoraAtual = () => {
    var hr = new Date().getHours().toString()
    var min = new Date().getMinutes().toString();
    hr.length < 2 ? hr = '0' + hr : hr = hr;
    min.length < 2 ? min = '0' + min : min = min;
    const hora = hr + ':' + min
    return hora;
  }

  const verificarPontualidade = (elem) =>{
    if(elem !== undefined){
      elem.forEach(e => {
        if(e.horario === getHoraAtual()){
          setPontualidade(true)
        }
      });
    }
  }

  const onDragEnd = async (result) => {

    if (!result.destination) return;
    const listCopy = { ...elements };
    const sourceList = listCopy[result.source.droppableId.toLowerCase()];

    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    
    listCopy[result.source.droppableId.toLowerCase()] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId.toLowerCase()];
    removedElement["status"] = result.destination.droppableId.toUpperCase();
    listCopy[result.destination.droppableId.toLowerCase()] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    changeStatus(result.draggableId, result.destination.droppableId.toUpperCase());
      
    setElements(listCopy)
      
  };

  return (
      <>
        <Header/>
        <Modelo>
          <h3 style={{ marginBottom: '1.5rem' }}>Quadro de Solicitações</h3>
          <Alert style={{ margin: 0 }} variant={'warning'}>
            Somente os cards de hoje em diante são exibidos no quadro!
          </Alert>
          {
            elements !== undefined ?
              <DragDropContextContainer>
                <DragDropContext onDragEnd={onDragEnd}>
                  <ListGrid>
                    {lists.map((listKey) => (
                      <DraggableElement
                        elements={elements[listKey.toLowerCase()]}
                        key={listKey}
                        prefix={listKey}
                      />
                    ))}
                  </ListGrid>
                </DragDropContext>
              </DragDropContextContainer>
            :
              null

          }
        </Modelo>
        {
          elements !== undefined 
          ?  <Loader show={false}/> 
          :  <Loader show={true}/>
        }
        <Legenda/>
        { pontualidade ? <ModalResult text="Tem um agendamento para agora. Cuidado para não atrasar!" tipo="pontualidade" ></ModalResult> : null }
      </>
  );
}

export default DragList;
