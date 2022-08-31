import React from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap"; 
import styled from "styled-components";

const FixPopOver = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
`

const ItemLegend = styled.div`
    display: flex;
    justity-content: space-between;
    align-items: center
`

const ItemColor = styled.div`
    width: 20px;
    height: 10px;
    border-radius: 10px;
    background: ${props => props.color};
    margin-right: 10px
`



const Legenda = () =>{ 

    return(
        <FixPopOver>
            <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={
                        <Popover>
                            <Popover.Header as="h3">Legenda</Popover.Header>
                            <Popover.Body>
                                <ItemLegend>
                                    <ItemColor color="#fad081"></ItemColor> 
                                    Agendado para hoje
                                </ItemLegend>
                                <ItemLegend>
                                    <ItemColor color="#B4CCDF"></ItemColor> 
                                    Agendado para outro dia
                                </ItemLegend>
                            </Popover.Body>
                        </Popover>
                    }
            >
                <Button style={{ background: "#263B59" }}>Legenda</Button>
            </OverlayTrigger>
        </FixPopOver>
    )

}

export default Legenda;