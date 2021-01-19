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
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "../CustomComponents/TextField";
import {
  ArrowBackIos,
  ArrowForwardIos,
  ArrowLeft,
  ArrowRight,
  Search,
} from "@material-ui/icons";
import IconButton from "../CustomComponents/IconButton";
import Notification from "../CustomComponents/Notification";
import Button from "../CustomComponents/Button";

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

export default function Orders(props) {
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [searchin, setSearchin] = useState("fa_name");
  const [paging, setPaging] = useState({
    count: 0,
    next: "",
    previous: "",
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    searchValue !== ""
      ? axiosInstance
          .get(`products/search/?q=${searchValue}&in=${searchin}`)
          .then((res) => {
            setProduct(res.data);
          })
      : null;
  }, [searchValue]);

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

  useEffect(() => {
    axiosInstance
      .get("/products/list/")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setProduct(res.results);
        setPaging({
          count: res.count,
          next: res.next,
          previous: res.previous,
        });
        console.log(res);
      });
  }, []);

  const Pages = () => {
    var pagenumbers = 0;
    if (paging.count % 10 === 0) {
      pagenumbers = paging.count / 10;
    } else {
      pagenumbers = (paging.count - (paging.count % 10)) / 10 + 1;
    }
    var list = [];
    console.log(pagenumbers);
    for (const i of Array(pagenumbers).keys()) {
      list.push(
        <Button
          key={i}
          onClick={() => handlePaging(i + 1)}
          text={i + 1}
          variant="outlined"
        />
      );
    }
    return list;
    // console.log(list);
  };
  console.log(paging);
  function Delete(id) {
    if (confirm("are you sure?")) {
      axiosInstance
        .delete(`products/product/${id}/`)
        .then((res) => location.reload());
    } else {
      return;
    }
  }

  const handlePaging = (state) => {
    Number.isInteger(state)
      ? axiosInstance
          .get(`products/list/?page=${state}`)
          .then((res) => {
            console.log(res.data);
            return res.data;
          })
          .then((res) => {
            setProduct(res.results);
            setPaging({
              count: res.count,
              next: res.next,
              previous: res.previous,
            });
            console.log(res);
          })
      : state === "next"
      ? paging.next !== null
        ? axiosInstance
            .get(`${paging.next}`)
            .then((res) => {
              console.log(res.data);
              return res.data;
            })
            .then((res) => {
              setProduct(res.results);
              setPaging({
                count: res.count,
                next: res.next,
                previous: res.previous,
              });
              console.log(res);
            })
        : null
      : paging.previous !== null
      ? axiosInstance
          .get(`${paging.previous}`)
          .then((res) => {
            console.log(res.data);
            return res.data;
          })
          .then((res) => {
            setProduct(res.results);
            setPaging({
              count: res.count,
              next: res.next,
              previous: res.previous,
            });
            console.log(res);
          })
      : null;
  };

  return (
    <Fragment>
      <Title>محصولات</Title>
      <Grid container alignItems="center" justify="space-between">
        <Grid
          container
          item
          alignItems="center"
          style={{ width: "fit-content" }}
        >
          <TextField
            name="product_search"
            label="جستوجو"
            value={searchValue}
            onChange={(e) => handleSearch(e)}
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
        <ButtonGroup size="small" variant="contained">
          <IconButton
            size="small"
            icon={<ArrowRight />}
            onClick={() => handlePaging("next")}
          />
          {Pages()}
          <IconButton
            size="small"
            icon={<ArrowLeft />}
            onClick={() => handlePaging("prev")}
          />
        </ButtonGroup>
      </div>
      <Link to={`product/add`}>
        <Button color="secondary" text="افزودن محصول" />
      </Link>
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}
