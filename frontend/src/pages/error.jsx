import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Error = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    props.closeClick()
    setShow(false);
  } 
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(props.show == true){
      handleShow()
    }
  })

  const [error, setError] = useState('');

  useEffect(() => {
    setError(props.data)
  }, [props.data]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>                
            <h3 className="Auth-form-title">Error</h3>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                  <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {handleClose()}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}