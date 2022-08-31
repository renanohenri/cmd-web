import React from "react";   
import { MdCheckCircle, MdClose, MdWatchLater } from 'react-icons/md';
import{ Modal } from "react-bootstrap";

const ModalResult = (props) => {
    const [show, setShow] = React.useState(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
            <Modal.Header className="d-flex justify-content-center">
            {
                props.tipo === 'pontualidade' 
                ? <MdWatchLater size={140} color={'red'}></MdWatchLater>
                : props.tipo === 'success' 
                ? <MdCheckCircle size={140} color={'green'}></MdCheckCircle>
                : <MdClose size={140} color={'red'}></MdClose>
            }
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">{props.text}</Modal.Body>
            {
                props.url ?
                <Modal.Footer>
                    <div className="pb-4 d-flex justify-content-end">
                        <a href={props.url} className="btn btn-outline-secondary">Fechar</a>
                    </div>
                </Modal.Footer>
                : null
            }
            
            </Modal>
        </>
    );
}

export default ModalResult;