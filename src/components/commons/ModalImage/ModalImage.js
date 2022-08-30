import React, { Fragment, useState } from "react";
import { FaEye } from "react-icons/fa";
// import fileIcon from "../../../assets/icons/file.svg";

import "./ModalImage.css";

const ModalImage = ({
  src,
  alt,
  caption,
  disabled,
  useImage,
  imageClassName,
  buttonClass,
  buttonTitle,
}) => {
  const [showImage, setShowImage] = useState(false);

  const onClickShowHandler = () => {
    setShowImage(true);
  };
  const onClickHideHandler = () => {
    setShowImage(false);
  };

  return (
    <Fragment>
      {useImage ? (
        <img
          src={src}
          color="transparent"
          onClick={!disabled ? onClickShowHandler : undefined}
          alt={alt}
          className={imageClassName}
        />
      ) : (
        <button
          type="button"
          className={`${buttonClass} `}
          onClick={onClickShowHandler}
          disabled={disabled}
        >
          <div className="flex flex-row justify-center h-full text-white bg-inherit p-2 text-center">
            <FaEye size={20} className="inline-flex mr-1" />{" "}
            <span>{buttonTitle}</span>
          </div>
        </button>
      )}

      {showImage && (
        <div
          id="myModal"
          className="block fixed pt-[100px] left-0 top-5 w-full h-full overflow-auto bg-black"
        >
          <span
            className="absolute top-[15px] right-4 text-[#f1f1f1] text-[40px] font-bold  z-40 mt-16 hover:text-[#bbbbbb] hover:cursor-pointer "
            onClick={onClickHideHandler}
          >
            &times;
          </span>

          <img
            src={src}
            className="m-auto block w-[80%] max-w-[700px] p-0"
            id="img01"
            alt={alt}
          />

          <div id="caption" className="capitalize font-bold">
            {caption}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ModalImage;
