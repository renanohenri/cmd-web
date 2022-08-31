import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";
import { MdCheck } from 'react-icons/md';

const ColumnHeader = styled.div`
  margin-bottom: 20px;
  // border-bottom: 1px solid #E2E2E2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Badge = styled.div`
  width: 22px;
  height: 22px;
  background-color: #E3E3E3;
  font-size: 14px;
  display: flex;
  justify-content: center;
  border-radius: 50%
`;

const DroppableStyles = styled.div`
  height: auto;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 500;
  padding: 10px;
  background:  #F4F5F7;
`;

const DraggableElement = ({ prefix, elements }) => (
  <DroppableStyles>
    <ColumnHeader> 
      <div>
        { prefix === 'Concluido' ? <MdCheck color="green" size="30px"/> : null}  
        { prefix }
      </div>
      <Badge>
        { elements.length }
      </Badge>
    </ColumnHeader>
    <Droppable droppableId={`${prefix}`}>
      {(provided, snapshot) => (
        <div {...provided.droppableProps} ref={provided.innerRef} style={{ background: snapshot.isDraggingOver ? '#f2f2f2': null }}>
          {elements.map((item, index) => (
            <ListItem key={item.uuid} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DroppableStyles>
);

export default DraggableElement;
