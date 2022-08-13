import domtoimage from "dom-to-image";
// Convert dom to image function
const exportAsImage = async (el, imageFileName) => {
  domtoimage
    .toPng(el)
    .then(function (dataUrl) {
      const image = dataUrl;

      downloadImage(image, imageFileName);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
};
// dowload image function
const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;
  fakeLink.href = blob;
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  fakeLink.remove();
};

export default exportAsImage;
