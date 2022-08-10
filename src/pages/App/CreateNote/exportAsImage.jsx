import html2canvas from "html2canvas";

const exportAsImage = async (el, imageFileName) => {
  const canvas = await html2canvas(el, { backgroundColor: "rgba(0,0,0,0)" });
  console.log(canvas, "canvas");
  const image = canvas.toDataURL("image/svg", 1.0);

  // const image = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");

  downloadImage(image, imageFileName);
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
