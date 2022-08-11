import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

const exportAsImage = async (el, imageFileName) => {
  // const canvas = await html2canvas(el, {
  //   backgroundColor: "rgba(0,0,0,0)",
  //   scale: 4,
  // });
  // const image = canvas.toDataURL("image/jpge");
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
