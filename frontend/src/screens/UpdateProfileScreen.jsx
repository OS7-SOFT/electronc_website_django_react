import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomMessage, Loader } from "../components/index";
import { Alert, Container, Form, InputGroup } from "react-bootstrap";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";
import { updateProfile } from "../redux/actions/userActions";

const UpdateProfile = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading, error, success } = userUpdateProfile;

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      setTimeout(() => {
        navigate(`/profile/${userInfo.id}`);
        window.location.reload();
      }, 2000);
    }
  }, [success, dispatch, navigate, userInfo]);

  const handelChange = (event) => {
    const { name, value } = event.target;
    setFormData((pervData) => {
      return { ...pervData, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      dispatch(updateProfile(formData));
    }
    setValidated(true);
  };

  return userInfo ? (
    <div>
      <div id={"login"}>
        {loading
          ? ""
          : success && (
              <CustomMessage
                title={"Updated Successfully"}
                showMssage={success}
                message={"Your Profile has been updated successfully"}
              />
            )}
        <div className="p-3">
          <Container>
            <div className="header">
              <h2 className="text-uppercase text-center mb-4">
                Update Profile
              </h2>
            </div>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {loading
                ? ""
                : error && <Alert variant={"danger"}>{error}</Alert>}
              <Form.Group controlId="validationCustomUsername" className="mb-3">
                <InputGroup hasValidation>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Full name"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={handelChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Full name is requird
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="validationCustomUsername" className="mb-3">
                <InputGroup hasValidation>
                  <Form.Control
                    as={"select"}
                    name="country"
                    type="text"
                    placeholder="Country"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={handelChange}
                  >
                    <option value={"Yemen"}>Yemen</option>
                    <option value={"Japan"}>Japan</option>
                    <option value={"UAE"}>UAE</option>
                    <option value={"Egypt"}>Egypt</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Country is requird
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="validationCustomUsername" className="mb-3">
                <InputGroup hasValidation>
                  <Form.Control
                    name="city"
                    type="text"
                    placeholder="City"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={handelChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    City is requird
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="validationCustomUsername" className="mb-3">
                <InputGroup hasValidation>
                  <Form.Control
                    name="phone"
                    type="number"
                    placeholder="Phone number"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={handelChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Phone is requird
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <InputGroup hasValidation>
                  <Form.Control
                    name="imageUrl"
                    type="file"
                    placeholder="Choose image"
                    aria-describedby="inputGroupPrepend"
                    onChange={handelChange}
                  />
                </InputGroup>
              </Form.Group> */}

              {loading ? (
                <Loader title={"Registeration..."} />
              ) : (
                <button className="w-100">Update</button>
              )}
            </Form>
          </Container>
        </div>
      </div>
    </div>
  ) : (
    <h1 className={" text-center"} style={{ marginBlock: "100px" }}>
      404 No there any Page
    </h1>
  );
};

export default UpdateProfile;
