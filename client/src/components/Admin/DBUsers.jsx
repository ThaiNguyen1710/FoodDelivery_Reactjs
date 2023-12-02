import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../api";
import { setAllUserDetail } from "../../context/actions/allUsersAction";
import DataTable from "./DataTable";
import { avatar } from "../../assets";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetail(data));
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData) => (
              <img
                src={rowData.photoURL ? rowData.photoURL : avatar}
                className="w-32 h-16 object-contain rounded-md"
                alt=""
              />
            ),
          },
          {
            title: "Name",
            field: "name",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Phone",
            field: "phone",
          },
          {
            title: "Address",
            field: "address",
          },
          {
            title: "Type",
            field: "type",
           
          },
          {
            title: "Verified",
            field: "emailVerified",
            render: (rowData) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                  rowData.emailVerified ? "bg-red-500" : "bg-emerald-500"
                }`}
              >
                {rowData.emailVerified ? " Not Verified" : "Verified"}
              </p>
            ),
          },
        ]}
        data = {allUsers}
        title="List of Users"
        // actions={[
        //   {
        //     icon: "edit",
        //     tooltip: "Edit Data",
        //     onClick: (event, rowData) => {
        //       alert("You want to edit" + rowData.productId);
        //     },
        //   },
        //   {
        //     icon: "delete",
        //     tooltip: "Delete Data",
        //     onClick: (event, rowData) => {
        //       if (window.confirm("Are you sure?")) {
        //         deleteAProduct(rowData.productId).then((res) => {
        //           dispatch(alertSuccess("Product Deleted "));
        //           setInterval(() => {
        //             dispatch(alertNULL());
        //           }, 3000);
        //           getAllProducts().then((data) => {
        //             dispatch(setAllProducts(data));
        //           });
        //         });
        //       }
        //     },
        //   },
        // ]}
      />
    </div>
  );
};

export default DBUsers;
