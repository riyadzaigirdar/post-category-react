import React, { useState } from "react";
import { Modal, Input, Button } from "@material-ui/core";
import useStateValue from "../../StateProvider";
import uuid from "react-uuid";
import "./CreateCatAddToPost.css";

function CreateCatAddToPost({
  setCatsInField,
  modalStyle,
  paper,
  openCreateCatModal,
  setOpenCreateCatModal,
}) {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useStateValue()[1];

  const createCategory = (e) => {
    e.preventDefault();
    dispatch({
      type: "add_category",
      payload: {
        id: uuid(),
        name: newCategory,
      },
    });
    setCatsInField((prevState) => [
      ...prevState,
      {
        id: uuid(),
        name: newCategory,
      },
    ]);
    setNewCategory("");
    setOpenCreateCatModal(false);
  };
  return (
    <Modal
      open={openCreateCatModal}
      onClose={() => {
        setOpenCreateCatModal(false);
        setNewCategory("");
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={paper}>
        <form className="modal">
          <center>
            <h1>Create Category</h1>
          </center>
          <Input
            className="inputfield"
            type="text"
            placeholder="Enter Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          ></Input>
          <Button
            variant="contained"
            color="secondary"
            disabled={!newCategory}
            type="submit"
            onClick={createCategory}
          >
            Create
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateCatAddToPost;
