import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const SweetAlert = () => {
    const [isOpen, setOpen] = useState(false);
    const SweetAlert = withReactContent(Swal);

  return (
    <SweetAlert
    warning
    showCancel
    show={isOpen} //Notice how we bind the show property to our component state
    confirmBtnText="Yes, delete it!"
    confirmBtnBsStyle="danger"
    title="Are you sure?"
    onConfirm={() => console.log("hey")}
    onCancel={() => {
      console.log("bye");
      setOpen(false); // Don't forget to close the modal
    }}
    focusCancelBtn
  >
    You will not be able to recover this imaginary file!
  </SweetAlert>
  )
}
