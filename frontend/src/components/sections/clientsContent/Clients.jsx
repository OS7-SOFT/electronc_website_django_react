import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList } from "../../../redux/actions/userActions";
import { BoxDashboard, ConfirmMessage, DataTabel, Loader } from "../../index";
import {
  Alert,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
  Table,
} from "react-bootstrap";

const Clients = () => {
  const sortParams = [
    { id: 1, name: "name", value: "name" },
    { id: 2, name: "Total Orders (min)", value: "min-orders" },
    { id: 3, name: "Total Orders  (max)", value: "max-orders" },
  ];

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const {
    loading,
    error,
    users,
    nextPage,
    pageCount,
    previousPage,
    pageNumber,
  } = userList;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingDetails,
    error: erorrDetails,
    success: successDetails,
  } = userDetails;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: erorrDelete,
    success: successDelete,
  } = userDelete;

  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmMsg, setShowConfirmMsg] = useState(false);
  const [id, setId] = useState(null);
  const [filterData, setFilterData] = useState({
    keysearch: "",
    country: "",
    sort: "",
    size: 15,
    pageNumber: 1,
  });

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    handelFilter(
      filterData.keysearch,
      filterData.sort,
      filterData.country,
      filterData.size,
      filterData.pageNumber
    );
  }, [filterData]);

  function handelTable() {
    return (
      <div>
        {loading ? (
          <div className={"my-5"}>
            <Loader title={"Loading..."} />
          </div>
        ) : error ? (
          <Alert variant={"danger"}>{error}</Alert>
        ) : users ? (
          <Table style={{ width: "100%" }} striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country</th>
                <th>City</th>
                <th>Total Orders</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name ? user.name : "Unknowe"}</td>
                  <td>{user.email}</td>
                  <td>{user.phone ? user.phone : "Unknowe"}</td>
                  <td>{user.country ? user.country : "Unknowe"}</td>
                  <td>{user.city ? user.city : "Unknowe"}</td>
                  <td>{user.orders}</td>
                  <td>
                    <i
                      className="fa fa-eye"
                      onClick={() => {
                        //handelGetDetails(order.id);
                        setShowDetails(true);
                      }}
                    ></i>
                    <i
                      className="fa fa-trash"
                      onClick={() => {
                        setShowConfirmMsg(true);
                        setId(user.id);
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className={"my-5"}>
            <Alert className={"text-center"}>No there any clients</Alert>
          </div>
        )}
      </div>
    );
  }

  function InputFilters() {
    return (
      <Form onChange={handelChange}>
        <Row>
          <Col>
            <div>
              <Form.Label>Show :</Form.Label>
              <Form.Control as="select" name="size">
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </Form.Control>
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label>Country :</Form.Label>
              <Form.Control as="select" name="country">
                <option value={""}>-- Select Country--</option>
                <option value={"Yemen"}>Yemen</option>
                <option value={"Japan"}>Japan</option>
                <option value={"UAE"}>UAE</option>
                <option value={"Egypt"}>Egypt</option>
              </Form.Control>
            </div>
          </Col>
          <Col>
            <div>
              <Form.Label>Sort By :</Form.Label>
              <Form.Control as="select" name="sort">
                <option value="">-- Select --</option>
                {sortParams.map((params) => (
                  <option key={params.id} value={params.value}>
                    {params.name}
                  </option>
                ))}
              </Form.Control>
            </div>
          </Col>
          <Col>
            <div className="search">
              <Form.Label>Search :</Form.Label>
              <FormGroup>
                <FormControl
                  type="text"
                  name="keysearch"
                  placeholder="Search keyword"
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  const handelChange = (event) => {
    const { name, value } = event.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
      pageNumber: 1,
    }));
  };

  const handelChangePage = (number) => {
    setFilterData((prevData) => ({
      ...prevData,
      pageNumber: number,
    }));
  };

  const handelNextOrPreviousPage = (link) => {
    if (link) {
      const newLink = link.slice(link.indexOf("?"));
      dispatch(getUserList(newLink));
    }
  };

  const handelFilter = (keyword, sort, country, size, pageNumber) => {
    dispatch(
      getUserList(
        `?keysearch=${keyword
          .trim()
          .toLowerCase()}&page=${pageNumber}&sort=${sort}&country=${country}&page-size=${size}`
      )
    );
  };

  const handelDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handelCloseMessage = () => {
    setShowConfirmMsg(false);
  };

  return (
    <div>
      <ConfirmMessage
        showConfirmMsg={showConfirmMsg}
        title={"Delete Clients"}
        message={`Are you sure to delete this client?`}
        isloading={loadingDelete}
        error={erorrDelete}
        isSuccess={successDelete}
        handelClose={handelCloseMessage}
        handelClick={() => {
          handelDelete(id);
        }}
      />
      <Row>
        <BoxDashboard
          title={"Today Profite"}
          icon={"dollar"}
          money={"4523"}
          color={"#4dbd74"}
        />
        <BoxDashboard
          title={"Today Profite"}
          icon={"dollar"}
          money={"4523"}
          color={"#4dbd74"}
        />
        <BoxDashboard
          title={"Today Profite"}
          icon={"dollar"}
          money={"4523"}
          color={"#4dbd74"}
        />
        <BoxDashboard
          title={"Today Profite"}
          icon={"dollar"}
          money={"4523"}
          color={"#4dbd74"}
        />
      </Row>
      <Row>
        <DataTabel
          table={handelTable()}
          dataList={userList}
          filterInput={InputFilters()}
          handelChangePage={handelChangePage}
          handelNextOrPreviousPage={handelNextOrPreviousPage}
        />
      </Row>
    </div>
  );
};

export default Clients;
