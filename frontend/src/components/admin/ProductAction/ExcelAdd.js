import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../CustomComponents/Button";
import Notification from "../../CustomComponents/Notification";

export default function ExcelAdd(props) {
  const [uploading, setuploading] = useState(false);
  const [uploadfile, setuploadFile] = useState(false);
  const history = useHistory();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

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
    axios(config)
      .then((res) => {
        setNotify({
          isOpen: true,
          message: `ایتم های ${res.data} ایجاد شدند`,
          type: "success",
        });
        history.push("/admin");
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: "مشکلی وجود دارد. فایل انتخاب شده را بررسی کنید",
          type: "error",
        });
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <Button type="submit" text="ثبت" />
      </form>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}
