import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";

export default function Cart({ first }) {
  const [show, setShow] = useState(false);
  const [api, setapi] = useState([]);
  useEffect(() => {
    fetch(
      `https://crudcrud.com/api/3026b00f665347d59b673ab8949222b5/cartitems`,
      { method: "GET" }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setapi(data);
        });
      } else {
        return res.json().then((data) => {
          console.log("something went wrong");
        });
      }
    });
  }, [first]);
  let totalprice = 0;
  api.map((i) => (totalprice += Number(i.price)));
  const listItem = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      {api.map((i) => (
        <tbody>
          <tr>
            <td>{i.name}</td>
            <td>{i.description}</td>
            <td>{i.price}</td>
            <td>{i.quantity}</td>
          </tr>
        </tbody>
      ))}
    </Table>
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const totalitem = api.length;
  const deletehandler = async () => {
    api.map(
      async (i) =>
        await axios.delete(
          `https://crudcrud.com/api/3026b00f665347d59b673ab8949222b5/cartitems/${i._id}`
        )
    );
    window.location.reload(false);
  };

  return (
    <>
      <Button
        variant="danger"
        style={{ float: "right" }}
        className="float-right mx-4 "
        onClick={handleShow}
      >
        MyCart {totalitem}
      </Button>
      {/* <Button variant="contained" style={{float: 'right'}} color="primary" className="float-right" >MY CART</Button> */}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {listItem}
          Total Price... <strong>{totalprice}</strong> Rs
          <br></br>
          <Button className="my-2" onClick={deletehandler}>
            Purchase NOW
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
