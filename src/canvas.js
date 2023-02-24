import React, { useState } from "react";
import { fabric } from "fabric";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import NavBar from "./Navbar";

const Canvas = () => {
  const [text, setText] = useState("");
  const [font, setFont] = useState("");
  const [fontSize, setFontSize] = useState(40);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFontChange = (e) => {
    setFont(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleClearCanvas = () => {
    const canvas = new fabric.Canvas("canvas");
    canvas.clear();
  };

  const handleDownloadPdf = () => {
    const canvas = new fabric.Canvas("canvas");
    const imgData = canvas.toDataURL({
      format: "jpeg",
      quality: 0.8,
    });
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    pdf.save("download.pdf");
  };

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        const canvas = new fabric.Canvas("canvas");
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgAspectRatio = imgObj.width / imgObj.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;
        let scaleFactor = 1;
  
        if (imgAspectRatio > canvasAspectRatio) {
          // image is wider than canvas
          scaleFactor = canvasWidth / imgObj.width;
        } else {
          // image is taller than canvas
          scaleFactor = canvasHeight / imgObj.height;
        }
  
        const image = new fabric.Image(imgObj, {
          left: 0,
          top: 0,
          scaleX: scaleFactor,
          scaleY: scaleFactor,
        });
        
        canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);
        canvas.renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddText = () => {
    const canvas = new fabric.Canvas("canvas");
    const textObj = new fabric.Text(text, {
      left: canvas.width / 2,
      top: canvas.height / 2,
      fontFamily: font,
      fontSize: parseInt(fontSize),
      fill: "#000000",
    });
    canvas.add(textObj);
  };

  return (
    <div className="canvas-container">
      <NavBar
        handleImage={handleImage}
        handleAddText={handleAddText}
        handleClearCanvas={handleClearCanvas}
        handleDownloadPdf={handleDownloadPdf}
        handleTextChange={handleTextChange}
        handleFontChange={handleFontChange}
        handleFontSizeChange={handleFontSizeChange}
        fontSize={fontSize}
      />
      <canvas id="canvas" width={700} height={500}></canvas>
    </div>
  );
};

export default Canvas;