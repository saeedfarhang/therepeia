import {
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import TextField from "../../CustomComponents/TextField";
import ImageInput from "../../CustomComponents/ImageInput";
import IconButton from "../../CustomComponents/IconButton";
import Notification from "../../CustomComponents/Notification";
import Button from "../../CustomComponents/Button";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../axios";
import { useForm } from "react-hook-form";
import { Add, Description } from "@material-ui/icons";
import axios from "axios";
import InputField from "../../CustomComponents/InputField";
import AddCategory from "./AddCategory";
import ExcelAdd from "./ExcelAdd";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "100px 0",
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    padding: "30px 40px",
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
  },
  description_field: {
    width: "100%",
    margin: "4px 0",
  },
  select: {
    width: "40%",
    margin: 4,
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function AddProduct({ match }) {
  const [mode, setMode] = useState("");
  const [product, setProduct] = useState({ loaded: false, data: {} });

  useEffect(() => {
    match.params.id ? setMode("edit") : setMode("add");
  }, []);
  useEffect(() => {
    if (mode === "edit") {
      axiosInstance
        .get(`products/product/${match.params.id}/`)
        .then((res) => setProduct({ loaded: true, data: res.data.product }));
    } else if (mode === "add") {
      setProduct({ loaded: true });
    }
  }, [mode]);

  const history = useHistory();
  const classes = useStyle();
  const [categories, setCategory] = useState([{ id: "1" }, { id: "2" }]);

  useEffect(() => {
    axiosInstance.get("products/category/").then((res) => {
      setCategory(res.data);
    });
  }, ["products/category/"]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [uploading, setuploading] = useState(false);

  const { register, handleSubmit, watch, errors, setValue, control } = useForm(
    {}
  );

  const [uploadedImage1, setUploadedImage1] = useState({ length: 0 });
  const [uploadedImage2, setUploadedImage2] = useState({ length: 0 });
  const [uploadedImage3, setUploadedImage3] = useState({ length: 0 });
  const [uploadedImage4, setUploadedImage4] = useState({ length: 0 });
  const [uploadedImage5, setUploadedImage5] = useState({ length: 0 });

  const [technicalInfo, setTechnicalInfo] = useState([]);
  var technicalInfoDic = {};
  const StrToDic = (str) => {
    if (str) {
      setTechnicalInfo(str.split("-"));
      technicalInfo.map((item) => {
        technicalInfoDic[item.split(":")[0]] = item.split(":")[1];
      });
    } else {
      return;
    }
    return technicalInfoDic;
  };

  const [AddCategoryOpen, setAddCategoryOpen] = useState(false);

  const handleAddCategory = () => {
    setAddCategoryOpen(true);
  };

  const handleClose = () => {
    setAddCategoryOpen(false);
    setExcelAdd(false);
  };

  useEffect(() => {
    uploadedImage1 && setValue("image1", uploadedImage1);
    uploadedImage2 && setValue("image2", uploadedImage2);
    uploadedImage3 && setValue("image3", uploadedImage3);
    uploadedImage4 && setValue("image4", uploadedImage4);
    uploadedImage5 && setValue("image5", uploadedImage5);
  }, [
    uploadedImage1,
    uploadedImage2,
    uploadedImage3,
    uploadedImage4,
    uploadedImage5,
  ]);

  const onSubmit = (Data) => {
    console.log(mode);
    let formData = new FormData();
    if (uploadedImage1.length === 0) {
      null;
    } else {
      formData.append("image1", uploadedImage1[0]);
    }
    if (uploadedImage2.length === 0) {
      null;
    } else {
      formData.append("image2", uploadedImage2[0]);
    }
    if (uploadedImage3.length === 0) {
      null;
    } else {
      formData.append("image3", uploadedImage3[0]);
    }
    if (uploadedImage4.length === 0) {
      null;
    } else {
      formData.append("image4", uploadedImage4[0]);
    }
    if (uploadedImage5.length === 0) {
      null;
    } else {
      formData.append("image5", uploadedImage5[0]);
    }

    formData.append("fa_name", Data.fa_name);
    formData.append("en_name", Data.en_name);
    formData.append("technical_info", Data.technical_info);
    formData.append("description", Data.description);
    formData.append("category", Data.category);
    formData.append("price", Data.price);
    console.log(Data.category, Data.fa_name);
    formData.append("is_published", Data.is_published);

    var config;
    if (mode === "add") {
      config = {
        method: "post",
        url: "/api/products/product/",
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
        data: formData,
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
    } else if (mode === "edit") {
      config = {
        method: "put",
        url: `/api/products/product/${match.params.id}/`,
        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "Bearer " + localStorage.getItem("access_token")
            : null,
        },
        data: formData,
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
    }

    axios(config)
      .then((res) => {
        console.log(res);
        setNotify({
          isOpen: true,
          message: "تغییرات با موفقیت ذخیره شد",
          type: "success",
        });
        history.goBack();
      })
      .catch((error) => {
        console.log(error);

        switch (error.response) {
          case "unique email":
            setNotify({
              isOpen: true,
              message: "این ایمیل قبلا در دیتابیس استفاده شده",
              type: "error",
            });
            break;
          case "unique phoneNumber":
            setNotify({
              isOpen: true,
              message: "این شماره تلفن قبلا در دیتابیس استفاده شده",
              type: "error",
            });
            break;
          default:
            setNotify({
              isOpen: true,
              message: "مشکلی وجود دارد",
              type: "error",
            });
            break;
        }
        if (error.response.data.error === "unique email") {
          setNotify({
            isOpen: true,
            message: "این ایمیل قبلا در دیتابیس استفاده شده",
            type: "error",
          });
        }
      });
  };

  const [addImage, setAddImage] = useState(false);
  const handleAddImage = () => {
    setAddImage((state) => !state);
  };

  const [excelAdd, setExcelAdd] = useState(false);
  const handleExcelBtn = () => {
    setExcelAdd((state) => !state);
  };

  return (
    <div className={classes.root}>
      <Grid>
        <Paper className={classes.paper}>
          {product.loaded ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button
                text="افزودن با اکسل"
                startIcon={<Description />}
                color="secondary"
                onClick={handleExcelBtn}
              />
              <Dialog open={excelAdd} onClose={handleClose}>
                <DialogTitle>افزودن با فایل اکسل</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    از طریق فرم زیر میتوانید محصولات خود را به وسیله فایل اکسل
                    ایجاد کنید. فرمت های مورد قبول: .xslx
                  </DialogContentText>
                  <ExcelAdd />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} type="file" text="انصراف" />
                </DialogActions>
              </Dialog>
              <Divider variant="middle" style={{ margin: 10 }} />
              <Typography variant="h6">اطلاعات محصول</Typography>
              <Grid container direction="column" justify="center">
                <Grid container item>
                  <TextField
                    inputRef={register({
                      required: "این فیلد نمیتواند خالی باشد",
                    })}
                    name="fa_name"
                    label="نام فارسی"
                    defaultValue={product.data ? product.data.fa_name : null}
                  />
                  <TextField
                    inputRef={register({
                      required: "این فیلد نمیتواند خالی باشد",
                    })}
                    name="en_name"
                    label="نام انگلیسی"
                    defaultValue={product.data ? product.data.en_name : null}
                  />
                </Grid>
                <Divider variant="middle" style={{ margin: 10 }} />
                <Typography variant="body2">مشخصات فنی</Typography>
                <Grid item style={{ width: "100%" }}>
                  <TextField
                    inputRef={register()}
                    helperText="این فیلد را به صورت زیر پر کنید: مشخصه:دیتا-مشخصه2:دیتا-مشخصه3:دیتا..."
                    type="text"
                    name="technical_info"
                    label="توضیحات فنی محصول"
                    multiline
                    className={classes.description_field}
                    rows={5}
                    defaultValue={
                      product.data ? product.data.technical_info : null
                    }
                  />
                </Grid>
                <Divider variant="middle" style={{ margin: 10 }} />
                <Typography variant="body2">متن توضیحات</Typography>
                <Grid item style={{ width: "100%" }}>
                  <TextField
                    inputRef={register()}
                    type="text"
                    name="description"
                    label="متن توضیحات محصول"
                    multiline
                    className={classes.description_field}
                    rows={5}
                    defaultValue={
                      product.data ? product.data.description : null
                    }
                  />

                  <TextField
                    inputRef={register({
                      required: "این فیلد نمیتواند خالی باشد",
                    })}
                    name="price"
                    label="قیمت"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    defaultValue={product.data ? product.data.price : null}
                  />
                </Grid>
              </Grid>
              <Divider variant="middle" style={{ margin: 10 }} />
              <Typography variant="body2">تصاویر محصول</Typography>
              <Grid
                container
                item
                direction="column"
                style={{ width: "100%" }}
                justify="center"
                alignItems="center"
              >
                <ImageInput
                  name="image1"
                  label="تصویر اول"
                  uploadedImage={uploadedImage1}
                  setUploadedImage={setUploadedImage1}
                  defaultImg={product.data ? product.data.image1 : null}
                />
                <IconButton icon={<Add />} onClick={handleAddImage} />

                <Collapse in={addImage}>
                  <ImageInput
                    name="image2"
                    label="تصویر دوم"
                    uploadedImage={uploadedImage2}
                    setUploadedImage={setUploadedImage2}
                    defaultImg={product.data ? product.data.image2 : null}
                  />
                  <Divider style={{ margin: 10 }} />
                  <ImageInput
                    name="image3"
                    label="تصویر سوم"
                    uploadedImage={uploadedImage3}
                    setUploadedImage={setUploadedImage3}
                    defaultImg={product.data ? product.data.image3 : null}
                  />
                  <Divider style={{ margin: 10 }} />

                  <ImageInput
                    name="image4"
                    label="تصویر سوم"
                    uploadedImage={uploadedImage4}
                    setUploadedImage={setUploadedImage4}
                    defaultImg={product.data ? product.data.image4 : null}
                  />
                  <Divider style={{ margin: 10 }} />

                  <ImageInput
                    name="image5"
                    label="تصویر پنجم"
                    uploadedImage={uploadedImage5}
                    setUploadedImage={setUploadedImage5}
                    defaultImg={product.data ? product.data.image5 : null}
                  />
                </Collapse>

                <Grid container justify="center" alignItems="center">
                  <InputField
                    className={classes.select}
                    id="is_published"
                    name="is_published"
                    label="وضعیت"
                    control={control}
                    defaultValue={""}
                    variant="outlined"
                    margin="normal"
                    defaultValue={
                      product.data ? product.data.is_published : null
                    }
                  >
                    <MenuItem value={1}>انتشار</MenuItem>
                    <MenuItem value={0}>پیش نویس</MenuItem>
                  </InputField>

                  <InputField
                    className={classes.select}
                    id="category"
                    name="category"
                    label="دسته بندی"
                    control={control}
                    defaultValue={""}
                    variant="outlined"
                    margin="normal"
                    defaultValue={product.data ? product.data.category : null}
                  >
                    {categories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.fa_name}
                      </MenuItem>
                    ))}
                  </InputField>
                  <IconButton icon={<Add />} onClick={handleAddCategory} />
                  <Dialog
                    open={AddCategoryOpen}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      افزودن دسته بندی
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        از طریق فرم زیر میتوانید دسته بندی خود را اضافه کنید.
                        برای حذف یا تغییر دسته بندی، از داشبورد اقدام کنید.
                      </DialogContentText>
                      <AddCategory />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} text="انصراف" />
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
              <Button type="submit" text="افزودن" />
            </form>
          ) : null}
        </Paper>
        <Notification notify={notify} setNotify={setNotify} />
      </Grid>
    </div>
  );
}
