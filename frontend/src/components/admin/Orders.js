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
import { IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const [products, setProduct] = useState([{ category: 3 }]);
  const [category, setCategory] = useState({});
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    try {
      axiosInstance
        .get("/products/product/")
        .then((res) => setProduct(res.data));
    } catch (error) {
      console.log(error);
    }
    console.log("asdas");
  }, [update]);

  const Category = (props) => {
    useEffect(() => {
      try {
        axiosInstance
          .get(`products/category/${props.catid}/`)
          .then((res) => setCategory(res.data.category));
      } catch (error) {
        console.log(error);
      }
    }, []);

    return (
      <Typography key={category.id} variant="body1">
        {category.fa_name}
      </Typography>
    );
  };

  function Delete(id) {
    if (confirm("are you sure?")) {
      axiosInstance
        .delete(`products/product/${id}/`)
        .then((res) => setUpdate(1));
    } else {
      return;
    }
  }

  const classes = useStyles();

  return (
    <Fragment>
      <Title>Products</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>اسم</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>category</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.fa_name}</TableCell>
              <TableCell>{product.en_name}</TableCell>
              <TableCell>{product.date_added}</TableCell>
              <TableCell>
                <Category catid={product.category} />
              </TableCell>
              <TableCell align="right">
                <Link to={`/admin/product/edit/${product.id}`}>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Link>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => Delete(product.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to={`product/add`}>Add a product</Link>
      </div>
    </Fragment>
  );
}
