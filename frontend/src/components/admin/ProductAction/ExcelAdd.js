import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../CustomComponents/Button";
import TextField from "../../CustomComponents/TextField";

export default function ExcelAdd(props) {
  const [uploading, setuploading] = useState(false);
  const [uploadfile, setuploadFile] = useState(false);

  const handleChange = (e) => {
    setuploadFile(e.target.files);
    // console.log(uploadfile);
    console.log(e.target.files);
  };

  useEffect(() => {
    console.log(uploadfile);
  }, [uploadfile]);

  const handleSubmit = (data) => {
    const formdata = new FormData();
    if (uploadfile.length === 0) {
      null;
      console.log("null");
    } else {
      formdata.append("file", uploadfile[0]);
      console.log("not null");
    }
    const config = {
      method: "post",
      url: "/api/products/excel/",
      headers: {
        Authorization: localStorage.getItem("access_token")
          ? "Bearer " + localStorage.getItem("access_token")
          : null,
      },
      data: formdata,
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        let percentage = Math.floor((loaded * 100) / total);
        console.log(`${loaded} kb of ${total}kb | ${percentage}%`);
        if (percentage < 100) {
          setuploading(true);
        } else {
          setuploading(false);
        }
      },
    };
    axios(config).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <Button type="submit" text="ثبت" />
      </form>
    </div>
  );
}
