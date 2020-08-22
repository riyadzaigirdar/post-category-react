import React, { useState } from "react";
import "./Category.css";
import useStateValue from "../../StateProvider";
import Button from "@material-ui/core/Button";
import EditCatModal from "../EditCatModel/EditCatModal";

function Category({ modalStyle, paper, category }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const dispatch = useStateValue()[1];

  function deleteCategory() {
    dispatch({
      type: "delete_category",
      payload: {
        id: category.id,
      },
    });
  }

  return (
    <React.Fragment>
      <div className="category">
        <span className="category__title">{category.name}</span>
        <div className="category__buttons">
          <Button
            onClick={() => setOpenEditModal(!openEditModal)}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
          <Button
            onClick={deleteCategory}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </div>
      </div>
      <EditCatModal
        Category={category}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        modalStyle={modalStyle}
        paper={paper}
      />
    </React.Fragment>
  );
}

export default Category;
