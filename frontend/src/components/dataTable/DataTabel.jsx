import "./DataTable.css";
import { Col, Card } from "react-bootstrap";
import { Pagination } from "../index";

function DataTabel({
  table,
  filterInput,
  dataList,
  handelChangePage,
  handelNextOrPreviousPage,
}) {
  const { loading, error, pageCount, nextPage, previousPage, pageNumber } =
    dataList;

  return (
    <Col className="p-3">
      <Card id="data-table" className="p-3">
        <Card.Header>{filterInput}</Card.Header>
        <>{table}</>
        {loading
          ? ""
          : error
          ? ""
          : pageCount > 1 && (
              <Pagination
                pageCount={pageCount}
                previousPage={previousPage}
                nextPage={nextPage}
                pageNumber={pageNumber}
                handelChangeNumber={handelChangePage}
                handelNextOrPreviousPage={handelNextOrPreviousPage}
              />
            )}
      </Card>
    </Col>
  );
}

export default DataTabel;
