import { Grid, Input, makeStyles, TextField } from "@material-ui/core";
import { Publish } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

const useStyle = makeStyles((theme) => ({
  root: {},
  avatar_holder: {
    backgroundSize: "contain",
    width: 100,
    height: 100,
    borderRadius: 15,
    marginLeft: 15,
    border: "solid #000 1px",
  },
  upload_img: {
    width: "100%",
    height: "",
  },
}));

export default function ImageInput(props) {
  const classes = useStyle();

  const { uploadedImage, setUploadedImage } = props;

  const [uploadImg, setUploadImg] = useState();
  useEffect(() => {
    if (props.defaultImg !== null) {
      setUploadImg(props.defaultImg);
    }
  }, [props.defaultImg]);

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadImg(reader.result);
      setUploadedImage(e.target.files);
    };
  };
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <input
        type="file"
        name={props.name}
        onChange={onChange}
        hidden
        ref={hiddenFileInput}
      />

      <Button
        startIcon={<Publish />}
        text={"  انتخاب " + props.label}
        onClick={handleClick}
        color="secondary"
        style={{
          height: "100%",
        }}
      />
      <div
        style={{ backgroundImage: `url(${uploadImg})` }}
        className={classes.avatar_holder}
      >
        {/* <img src={uploadImg} alt="" className={classes.upload_img} /> */}
      </div>
    </Grid>
  );
}
