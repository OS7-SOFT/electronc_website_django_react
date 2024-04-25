import React from "react";
import { Alert, Card, Table } from "react-bootstrap";
import { Loader } from "..";

const BasicTable = ({ title, productData }) => {
  const { loading, error, products } = productData;

  return (
    <Card className={"p-2"}>
      <Card.Title>{title}</Card.Title>
      <Card.Body>
        {loading ? (
          <Loader title={"Loading..."} />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Table striped>
            <thead>
              <tr>
                <td>Name</td>
                <td>Sold</td>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>

                    <td>{product.sold_count}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default BasicTable;
