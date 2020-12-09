import {
  Button,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../axios";
import Axios from "axios";

const useStyle = makeStyles(() => ({
  imagePre: {
    width: "30%",
  },
}));

export default function Edit({ match }) {
  const classes = useStyle();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [categories, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    fa_name: "",
    en_name: "",
    description: "",
    category: "",
    is_published: false,
  });
  const [images, setImages] = useState("");

  useEffect(() => {
    try {
      axiosInstance.get(`products/product/${match.params.id}/`).then((res) => {
        setProduct(res.data.product);
        setFormData(res.data.product);

        var blob = null;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", res.data.product.image1);
        xhr.responseType = "blob";

        blob = xhr.response;
        // LoadAndDisplayFile(blob);

        // xhr.send();

        var myReader = new FileReader();
        var buffer = myReader.readAsArrayBuffer(blob);
        //  = e.srcElement.result; //arraybuffer object

        var image1 = new File([buffer]);
        const objectURL = URL.createObjectURL(image1);
        console.log(objectURL);
        // const objectURL = URL.createObjectURL(File);
        // const image = URL.createObjectURL(res.data.product.image1);
        // var filelist = new FileList(file);

        setImages({ image1: [image1] });
      });

      axiosInstance
        .get(`products/category/`)
        .then((res) => setCategory(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e) => {
    if ([e.target.type] == "file") {
      console.log(e.target.files);
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
  console.log(images);

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // axiosInstance.post("products/product/", formData);

      var data = new FormData();
      console.log(images.image1[0]);
      data.append("image1", images.image1[0]);
      data.append("fa_name", formData.fa_name);
      data.append("en_name", formData.en_name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("is_published", formData.is_published);

      var config = {
        method: "put",
        url: `/api/products/product/${match.params.id}/`,
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
          // console.log("done");
          // history.push("/admin");
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
          <input
            // files={images.image}
            type="file"
            id="image"
            onChange={handleChange}
            name="image1"
          />
          <img src={images.image} alt="" className={classes.imagePre} />
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
        </Select>
        <Button type="submit">asdas</Button>
      </form>
    </Grid>
  );
}
