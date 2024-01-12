import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Edit = (props) => {
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

  const [username, setUsername] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
    setProductName(props.data.name)
    setProductDescription(props.data.description)
    setProductPrice(props.data.price)
  }, [props.data]);

  const handleSubmit = async () => {
    const data = {
      username: username,
      name: productName,
      description: productDescription,
      price: productPrice,
      id: props.data.id
    };

    props.submitClick(data)
    handleClose()
  }

  const handleDelete = async () => {
    const data = {
      username: username,
      id: props.data.id
    };

    props.deleteClick(data)
    handleClose()
  }

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
            <h3 className="Auth-form-title">Edit product</h3>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter Username"
                    name='username'
                    type='text'
                    value={username}
                    required
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Product name</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter product name"
                    name='productName'
                    type='text'
                    value={productName}
                    required
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Product description</label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter product description"
                    name='productDescription'
                    type='text'
                    value={productDescription}
                    required
                    disabled
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Price</label>
                  <input
                    name='price'
                    type="number"
                    className="form-control mt-1"
                    placeholder="Enter price"
                    value={productPrice}
                    required
                    onChange={e => setProductPrice(e.target.value)}
                  />
                </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {handleDelete()}}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => {handleClose()}}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {handleSubmit()}}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}