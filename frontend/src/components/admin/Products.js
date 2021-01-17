import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { axiosInstance } from "../../axios";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "../CustomComponents/TextField";
import { Search } from "@material-ui/icons";
import IconButton from "../CustomComponents/IconButton";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  imagePre: {
    width: "50px",
  },
  outlined: {
    input: {
      padding: 0,
    },
  },
}));

export default function Orders() {
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [searchin, setSearchin] = useState("fa_name");

  useEffect(() => {
    try {
      axiosInstance.get("/products/product/").then((res) => {
        setProduct(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  function Delete(id) {
    if (confirm("are you sure?")) {
      axiosInstance
        .delete(`products/product/${id}/`)
        .then((res) => location.reload());
    } else {
      return;
    }
  }

  const classes = useStyles();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    searchValue !== ""
      ? axiosInstance
          .get(`products/search/?q=${searchValue}&in=${searchin}`)
          .then((res) => {
            setProduct(res.data);
          })
      : null;
  };
  const handleSelect = (event) => {
    setSearchin(event.target.value);
  };

  const isotime = (datetime) => {
    var date = datetime.split("T")[0];
    var time = datetime.split("T")[1];
    time = time.split(":")[0] + ":" + time.split(":")[1];
    return `${date} -- ${time}`;
  };

  // useEffect(() => {
  //   console.log("sadsa");
  //   if (searchValue === "") {
  //     try {
  //       axiosInstance.get("/products/product/").then((res) => {
  //         setProduct(res.data);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [=]);

  return (
    <Fragment>
      <Title>محصولات</Title>
      <Grid container alignItems="center">
        <TextField
          name="product_search"
          label="جستوجو"
          value={searchValue}
          onChange={handleSearch}
        />
        <FormControl>
          {/* <InputLabel id="demo-simple-select-label">بر اساس:</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchin}
            onChange={handleSelect}
            variant="outlined"
            style={{ height: 40 }}
          >
            <MenuItem classes={{ input: classes.input }} value="fa_name">
              اسم فارسی
            </MenuItem>
            <MenuItem value="en_name">اسم لاتین</MenuItem>
            <MenuItem value="description">توضیحات</MenuItem>
          </Select>
        </FormControl>
        <IconButton icon={<Search />} />
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>اسم فارسی</TableCell>
            <TableCell>اسم انگلیسی</TableCell>
            <TableCell>تاریخ</TableCell>
            {/* <TableCell>category</TableCell> */}
            <TableCell>عملیات</TableCell>
            <TableCell>تصویر</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.fa_name}</TableCell>
              <TableCell>{product.en_name}</TableCell>
              <TableCell>{isotime(product.date_added)}</TableCell>
              {/* <TableCell>{category.fa_name}</TableCell> */}
              <TableCell>
                <Link to={`/admin/product/edit/${product.id}`}>
                  <IconButton icon={<EditIcon />} aria-label="edit" />
                </Link>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => Delete(product.id)}
                  aria-label="delete"
                />
              </TableCell>
              <TableCell align="right">
                <img src={product.image1} alt="" className={classes.imagePre} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to={`product/add`}>افزودن محصول</Link>
      </div>
    </Fragment>
  );
}
