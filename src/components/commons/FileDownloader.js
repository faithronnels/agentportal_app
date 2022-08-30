import { saveAs } from "file-saver";

export const fileDownload = (data) => {
  const arr = data.fileUploadData;
  const JSZip = require("jszip");
  const zip = new JSZip();

  arr.forEach((element) => {
    const imageBlob = fetch(element.fileName).then((response) =>
      response.blob()
    );

    zip.file(
      element.fileDescription +
        "." +
        element.fileName.substring(
          element.fileName.lastIndexOf(".") + 1,
          element.fileName.length
        ),
      imageBlob
    );
  });

  zip
    .generateAsync({
      type: "blob",
    })
    .then(function (content) {
      saveAs(content, data.refNum + "_RegistrationDocuments");
    });
};
