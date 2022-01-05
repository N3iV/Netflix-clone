import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../Context/ListContext/ListContext";
import { deleteLists, getLists } from "../../Context/ListContext/apiCalls";
export default function ListList() {
  const { lists, dispatch } = useContext(ListContext);
  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    console.log("Delete");
    deleteLists(dispatch, id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 350 },
    { field: "genre", headerName: "Genre", width: 220 },
    { field: "title", headerName: "Title", width: 260 },
    { field: "type", headerName: "Type", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/lists/" + params.row._id, list: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}