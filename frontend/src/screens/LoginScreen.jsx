import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Container,
  Form,
  FormCheck,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { login } from "../redux/actions/userActions";
import { Loader } from "../components/index";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginScreen = () => {
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [validated, setValidated] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const CheckFields = useCallback(() => {
    //email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setEmailValid(emailRegex.test(email));
    setEmailInvalid(!emailRegex.test(email));
    //password
    if (password.trim() === "") {
      setPasswordValid(false);
      setPasswordInvalid(true);
    } else {
      setPasswordValid(true);
      setPasswordInvalid(false);
    }
    console.log(passwordValid, emailValid);
    return passwordValid && emailValid;
  }, [email, password, emailValid, passwordValid]);

  //if logged successed push user to home
  useEffect(() => {
    userInfo && navigate("/");
  }, [userInfo, navigate]);

  useEffect(() => {
    validated && CheckFields();
  }, [validated, CheckFields]);

  function handelPassword(event) {
    setPassword(event.target.value);
  }

  function handelEmail(event) {
    setEmail(event.target.value);
  }

  //Check fields
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(CheckFields());
    CheckFields() && dispatch(login(email, password));

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
            <h2 className="text-uppercase text-center mb-4">Sign in</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            {loading
              ? ""
              : error && (
                  <Alert variant={"danger"}>Invalid Login attempt</Alert>
                )}
            <Form.Group className="mb-3">
              <InputGroup hasValidation>
                <Form.Control
                  name="email"
                  type="text"
                  placeholder="Email"
                  aria-describedby="inputGroupPrepend"
                  onChange={handelEmail}
                  isValid={emailValid}
                  isInvalid={emailInvalid}
                />
                <Form.Control.Feedback type="invalid">
                  {email ? "Email sayntex is incorrect" : "Email is requird"}
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
                  onChange={handelPassword}
                  isValid={passwordValid}
                  isInvalid={passwordInvalid}
                />
                <Form.Control.Feedback type="invalid">
                  Password is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Group className=" d-flex">
                <FormCheck className="mx-2" />
                <FormLabel htmlFor="">Remember me</FormLabel>
              </Form.Group>
              {emailValid && (
                <span className="forget-password">Forget Password</span>
              )}
            </div>
            {loading ? (
              <Loader title={"Logging in..."} />
            ) : (
              <button className="w-100">Sign in</button>
            )}

            <p className="mt-3">
              Don't have an Accoun?
              <Link
                to={"/register/"}
                style={{ textDecoration: "none", marginLeft: "10px" }}
              >
                <span className="signup">Singup</span>
              </Link>
            </p>
          </Form>
        </Container>
      </div>
    </motion.div>
  );
};

export default LoginScreen;
