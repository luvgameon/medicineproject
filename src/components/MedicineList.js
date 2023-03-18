import React, { useEffect, useState } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import Cart from "./Cart";

const MedicineList = ({ trigger }) => {
  const [api, setapi] = useState([]);
  const [first, setfirst] = useState(0);

  console.log("triger child m", trigger);

  useEffect(() => {
    fetch(`https://crudcrud.com/api/3026b00f665347d59b673ab8949222b5/items`, {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setapi(data);
          console.log("chal raha hai");
        });
      } else {
        return res.json().then((data) => {
          console.log("something went wrong");
        });
      }
    });
  }, [trigger]);

  return (
    <>
      <span>
        <Cart key={Math.random()} first={first} />
      </span>
      <br />
      <br />
      <br />

      <div className="container">
        <h3 style={{ textAlign: "center" }}>All Available Medicines </h3>
        <Table className="my-4" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Descption</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {api.map((i) => (
              <tr>
                <td>{i.name}</td>
                <td>{i.description}</td>
                <td>{i.price}</td>
                <td>{i.quantity}</td>
                <td>
                  <button
                    onClick={() => {
                      const cartDetails = {
                        name: i.name,
                        description: i.description,
                        price: i.price,
                        quantity: i.quantity,
                      };
                      axios.post(
                        "https://crudcrud.com/api/3026b00f665347d59b673ab8949222b5/cartitems",
                        cartDetails
                      );
                      setfirst((first) => first + 1);
                    }}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default MedicineList;
