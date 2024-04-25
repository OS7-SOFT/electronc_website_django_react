import React, { useContext } from "react";
import { Form, Row, InputGroup } from "react-bootstrap";
import { AddressContext } from "../../screens/CheckoutScreen";

const AddressInfo = () => {
  const { setAddressData, shippingAddress, addressData } =
    useContext(AddressContext);

  const handelChange = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    const { name, value } = event.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Row className="mb-3">
      <Form.Group controlId="validationCustom01" className="mb-3">
        <Form.Control
          name="firstName"
          value={addressData.firstName}
          required
          type="text"
          placeholder="First name"
          onChange={handelChange}
        />
      </Form.Group>
      <Form.Group controlId="validationCustom02" className="mb-3">
        <Form.Control
          name="lastName"
          value={addressData.lastName}
          required
          type="text"
          placeholder="Last name"
          onChange={handelChange}
        />
      </Form.Group>
      <Form.Group controlId="validationCustomUsername" className="mb-3">
        <InputGroup hasValidation>
          <Form.Control
            name="address"
            value={addressData.address}
            type="text"
            placeholder="Address"
            aria-describedby="inputGroupPrepend"
            required
            onChange={handelChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your address
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="validationCustomUsername" className="mb-3">
        <InputGroup hasValidation>
          <Form.Control
            name="email"
            value={addressData.email}
            type="email"
            placeholder="Email"
            aria-describedby="inputGroupPrepend"
            required
            onChange={handelChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter correct email
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group controlId="validationCustom03" className="mb-3">
        <Form.Control
          type="text"
          value={addressData.city}
          name="city"
          placeholder="City"
          required
          onChange={handelChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid city.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="validationCustom04" className="mb-3">
        <Form.Control
          name="country"
          value={addressData.country}
          type="text"
          placeholder="Country"
          required
          onChange={handelChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid country.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="validationCustom05" className="mb-3">
        <Form.Control
          name="zip_code"
          value={addressData.zip_code}
          type="text"
          placeholder="Zip code"
          required
          onChange={handelChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid zip code.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="validationCustom05" className="mb-3">
        <Form.Control
          name="phone"
          value={addressData.phone}
          type="number"
          placeholder="Telephone"
          required
          onChange={handelChange}
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid phone.
        </Form.Control.Feedback>
      </Form.Group>
    </Row>
  );
};

export default AddressInfo;
