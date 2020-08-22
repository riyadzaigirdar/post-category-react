import React, { useState } from "react";
import { Modal, Input, Button } from "@material-ui/core";
import useStateValue from "../../StateProvider";

function EditCatModal({
  Category,
  openEditModal,
  setOpenEditModal,
  modalStyle,
  paper,
}) {
  const [category, setCategory] = useState(Category.name || "");
  const dispatch = useStateValue()[1];

  const editCategory = (e) => {
    e.preventDefault();
    dispatch({
      type: "update_category",
      payload: {
        id: Category.id,
        name: category,
      },
    });
    setOpenEditModal(false);
  };
  return (
    <Modal
      open={openEditModal}
      onClose={() => {
        setOpenEditModal(false);
        setCategory(Category.name);
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={paper}>
        <form className="modal">
          <center>
            <h1>Edit Category</h1>
          </center>
          <Input
            className="inputfield"
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Input>
          <Button
            variant="contained"
            color="primary"
            disabled={category === Category.name}
            type="submit"
            onClick={editCategory}
          >
            Update
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default EditCatModal;
