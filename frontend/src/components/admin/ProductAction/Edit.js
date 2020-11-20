import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../axios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export default function Edit({ match }) {
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [categories, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    fa_name: "",
    en_name: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    try {
      axiosInstance.get(`products/product/${match.params.id}/`).then((res) => {
        setProduct(res.data);
        setFormData(res.data);
      });
      axiosInstance
        .get(`products/category/`)
        .then((res) => setCategory(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e) => {
    <Alert severity="error">This is an error alert — check it out!</Alert>;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put(`products/product/${match.params.id}/`, formData);
    history.push("/admin");
  };

  return (
    <Grid>
      <form onSubmit={handleSubmit} method="post">
        <TextField
          name="fa_name"
          id="standard-basic"
          label="fa_name"
          value={formData.fa_name}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="en_name"
          id="standard-basic"
          label="en_name"
          value={formData.en_name}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="description"
          id="standard-basic"
          label="description"
          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
        <InputLabel id="label">category</InputLabel>
        <Select
          name="category"
          labelId="label"
          id="select"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.fa_name}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit">asdas</Button>
      </form>
    </Grid>
  );
}
