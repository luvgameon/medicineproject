import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";
import MedicineList from "./MedicineList";

export default function AddMedicine() {
  const [trigger, setTrigger] = useState(0);

  const NameRef = useRef("");
  const desRef = useRef("");
  const PriceRef = useRef("");

  async function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const UserDetails = {
      name: NameRef.current.value,
      description: desRef.current.value,
      price: PriceRef.current.value,
      quantity: 1,
    };
    NameRef.current.value = "";
    desRef.current.value = "";
    PriceRef.current.value = "";
    await axios.post(
      "https://crudcrud.com/api/3026b00f665347d59b673ab8949222b5/items",
      UserDetails
    );
    setTrigger((trigger) => trigger + 1);
    console.log("trigger", trigger);
  }

  return (
    <>
      <div className="container my-5">
        <h3 style={{ textAlign: "center" }}>Add-Medicine</h3>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Medicine Name</Form.Label>
            <Form.Control type="text" placeholder="Name" ref={NameRef} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Description" ref={desRef} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Price" ref={PriceRef} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Medicine
          </Button>
        </Form>
        <br></br>

        {<MedicineList key={Math.random()} trigger={trigger} />}
      </div>
    </>
  );
}
