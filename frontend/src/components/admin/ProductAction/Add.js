import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../axios";

export default function Add() {
  const history = useHistory();
  const [categories, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    fa_name: "",
    en_name: "",
    description: "",
    category: "",
    is_published: `true`,
  });
  const [images, setImages] = useState("");

  useEffect(() => {
    try {
      axiosInstance
        .get(`products/category/`)
        .then((res) => setCategory(res.data));
    } catch (error) {}
  }, []);

  const handleChange = (e) => {
    if ([e.target.name] == "image") {
      setImages({
        ...images,
        [e.target.name]: e.target.files,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // axiosInstance.post("products/product/", formData);

      var data = new FormData();
      data.append("image1", images.image[0]);
      data.append("fa_name", formData.fa_name);
      data.append("en_name", formData.en_name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("is_published", formData.is_published);

      var config = {
        method: "post",
        url: "/api/products/product/",
        data: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA5OTIyODM5LCJqdGkiOiIzNGFmM2U4MTMzMDg0M2UwODYyNDE0ZTFhM2VlZThiYSIsInVzZXJfaWQiOjF9.7THl3UmD0XTzGOf5Q7XQzMucwCThDgYFKEHDNLmKS1E",
          // Cookie:
          //   "csrftoken=CRzglYOmmqnzKEzXtDjxjxG7VgkpUXOWwwEnd27x7VGLXx5bolZr0Xk8sSUdyufN",
          // ...data.getHeaders(),
        },
        // body: JSON.stringify(model),
        data: data,
      };

      Axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          history.push("/admin");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
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
        <Button>
          <input type="file" id="image" onChange={handleChange} name="image" />
          <img src={`/${images.image}`} alt="" />
        </Button>
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

        <Select
          name="is_published"
          labelId="label"
          id="select"
          value={formData.is_published}
          onChange={handleChange}
        >
          <MenuItem value={`true`}>True</MenuItem>
          <MenuItem value={`false`}>False</MenuItem>
        </Select>

        <Button type="submit">asdas</Button>
      </form>
    </Grid>
  );
}
