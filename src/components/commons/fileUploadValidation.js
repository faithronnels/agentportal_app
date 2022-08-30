export const checkFileValidation = (fileObject, maximumFileSize = 512000) => {
  const file = fileObject.target.files[0];
  let error = "";

  if (file.size > maximumFileSize) {
    error = "invalid size";
  }
  if (!file.name.toLowerCase().match(/\.(jpg|jpeg|png|jfif|pdf)$/)) {
    error = "invalid file type";
  }
  return error;
};
