import { makeStyles, mergeClasses } from "@material-ui/styles";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../axios";
import Button from "../../CustomComponents/Button";
import ImageInput from "../../CustomComponents/ImageInput";
import TextField from "../../CustomComponents/TextField";

const useStyle = makeStyles((theme) => ({
  root: {},
}));
export default function AddCategory() {
  const { register, handleSubmit, watch, errors, setValue, control } = useForm(
    {}
  );
  const [uploading, setuploading] = useState(false);

  const [uploadedImage1, setUploadedImage1] = useState({ length: 0 });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const onSubmit = (data) => {
    const formData = new FormData();
    if (uploadedImage1.length === 0) {
      null;
    } else {
      formData.append("image1", uploadedImage1[0]);
    }

    formData.append("fa_name", data.fa_name);
    formData.append("en_name", data.en_name);
    formData.append("description", data.description);

    axiosInstance.post("products/category/", formData).then((res) => {
      location.reload();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        inputRef={register}
        name="fa_name"
        label="اسم فارسی دسته بندی"
      />
      <TextField
        inputRef={register}
        name="en_name"
        label="اسم انگلیسی دسته بندی"
      />
      <TextField
        inputRef={register}
        multiline
        rows={5}
        name="description"
        label="توضیح کوتاه"
      />
      <ImageInput
        name="image1"
        label="تصویر اول"
        uploadedImage={uploadedImage1}
        setUploadedImage={setUploadedImage1}
      />
      <Button text="ثبت" type="submit" />
    </form>
  );
}
