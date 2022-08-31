import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700
`;

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const colorBdBlue = "#B4CCDF";
const colorBdYellow = "#FFD082";

const DragItem = styled.div`
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  border-radius: 3px;
  border-left: 4px solid ${props => new Date(props.dataItem).getDate() + 1 === new Date().getDate() ?  colorBdYellow : colorBdBlue};
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.12);
  background: #fffffa;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
  opacity: ${props => props.statusItem === 'CONCLUIDO' ? 0.3 : 1 }
`;

const BgDate = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;
  background: ${props => new Date(props.dataItem).getDate() + 1 === new Date().getDate() ?  colorBdYellow : colorBdBlue};
  display: 'flex';
`;

const ListItem = ({ item, index }) => {
  
  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate() + 1;

    return [
            (dd>9 ? '' : '0') + dd,
            (mm>9 ? '' : '0') + mm
           ].join('/');
  };


  return (
    <Draggable draggableId={item.uuid} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            statusItem={item.status}
            dataItem={item.data_agendamento}
          >
            <CardHeader> 
              <BgDate statusItem={item.status} dataItem={item.data_agendamento}>
                { new Date(item.data_agendamento).yyyymmdd() }
              </BgDate>
              <BgDate statusItem={item.status} dataItem={item.data_agendamento}>
                { item.horario }
              </BgDate>
            </CardHeader>
            <CardFooter>
              <strong>{item.name}</strong>
              <div>
                <strong>{ item.qtd_solicitada_ipad }</strong> IPads
              </div>
            </CardFooter>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
