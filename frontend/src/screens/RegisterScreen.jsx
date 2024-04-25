import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Container,
  Form,
  FormCheck,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { register } from "../redux/actions/userActions";
import { Loader } from "../components/index";
import { motion } from "framer-motion";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const [validated, setValidated] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmValid, setConfirmValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [confirmInvalid, setConfirmInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const CheckFields = useCallback(() => {
    //username
    if (formData.username.trim() === "") {
      setUsernameValid(false);
      setUsernameInvalid(true);
    } else {
      setUsernameValid(true);
      setUsernameInvalid(false);
    }

    //email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setEmailValid(emailRegex.test(formData.email));
    setEmailInvalid(!emailRegex.test(formData.email));
    //password
    if (formData.password.trim().length > 7) {
      setPasswordValid(true);
      setPasswordInvalid(false);
    } else {
      setPasswordValid(false);
      setPasswordInvalid(true);
    }

    //Confirm password
    if (
      formData.confirm.trim() !== "" &&
      formData.confirm === formData.password
    ) {
      setConfirmValid(true);
      setConfirmInvalid(false);
    } else {
      setConfirmValid(false);
      setConfirmInvalid(true);
    }

    return passwordValid && confirmValid && usernameValid && emailValid;
  }, [formData]);

  //if logged successed push user to home
  useEffect(() => {
    userInfo && navigate("/");
  }, [userInfo, navigate]);

  useEffect(() => {
    validated && CheckFields();
  }, [validated, CheckFields]);

  const handelChange = (event) => {
    const { name, value } = event.target;
    setFormData((pervData) => {
      return { ...pervData, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    CheckFields() &&
      dispatch(register(formData.username, formData.email, formData.password));

    setValidated(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      id={"login"}
    >
      <div className="p-3">
        <Container>
          <div className="header">
            <h2 className="text-uppercase text-center mb-4">Sign up</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            {loading ? "" : error && <Alert variant={"danger"}>{error}</Alert>}
            <Form.Group className="mb-3">
              <InputGroup hasValidation>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  onChange={handelChange}
                  isValid={usernameValid}
                  isInvalid={usernameInvalid}
                />
                <Form.Control.Feedback type="invalid">
                  Username is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup hasValidation>
                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  onChange={handelChange}
                  isValid={emailValid}
                  isInvalid={emailInvalid}
                />
                <Form.Control.Feedback type="invalid">
                  {formData.email
                    ? "Email sayntex is incorrect"
                    : "Email is requird"}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup hasValidation>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  onChange={handelChange}
                  isValid={passwordValid}
                  isInvalid={passwordInvalid}
                />
                <Form.Control.Feedback type="invalid">
                  Password must be equal or larg than 8 character
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3">
              <InputGroup hasValidation>
                <Form.Control
                  name="confirm"
                  type="password"
                  placeholder="Confirm Password"
                  aria-describedby="inputGroupPrepend"
                  onChange={handelChange}
                  isValid={confirmValid}
                  isInvalid={confirmInvalid}
                />
                <Form.Control.Feedback type="invalid">
                  Password not matchs
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {loading ? (
              <Loader title={"Registeration..."} />
            ) : (
              <button className="w-100">Register</button>
            )}
            <p className="mt-3">
              I have an Accoun?
              <Link
                to={"/Login/"}
                style={{ textDecoration: "none", marginLeft: "10px" }}
              >
                <span className="signup">Singin</span>
              </Link>
            </p>
          </Form>
        </Container>
      </div>
    </motion.div>
  );
};

export default Register;
