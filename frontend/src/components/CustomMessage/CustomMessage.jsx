import { Modal, Button } from "react-bootstrap";
function ConfirmMessage({
  title,
  message,
  showMssage,
  haveButton,
  handelClose,
}) {
  return (
    <Modal show={showMssage}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        {haveButton === "close" ? (
          <Button
            variant={"danger"}
            onClick={() => {
              handelClose();
            }}
          >
            Close
          </Button>
        ) : haveButton === "yse-no" ? (
          <Button
            variant={"btn"}
            onClick={() => {
              handelClose();
            }}
          >
            Yes - no
          </Button>
        ) : (
          haveButton === "confirm" && (
            <Button
              variant={"primary"}
              onClick={() => {
                handelClose();
              }}
            >
              Confirm
            </Button>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmMessage;
