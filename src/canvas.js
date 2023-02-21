import React, { useState } from 'react';
import { fabric } from 'fabric';
import Navbar from './Navbar';

function Canvas() {
  const [canvas, setCanvas] = useState(null);
  const [text, setText] = useState('');

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imgObj = new Image();
      imgObj.src = event.target.result;

      imgObj.onload = () => {
        const canvas = new fabric.Canvas('canvas');
        setCanvas(canvas);

        // set canvas dimensions to fit entire page
        canvas.setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });

        const image = new fabric.Image(imgObj);

        // set image dimensions to fit canvas and center it
        const scaleFactor = Math.min(canvas.width / image.width, canvas.height / image.height);
        const imgWidth = image.width * scaleFactor;
        const imgHeight = image.height * scaleFactor;
        image.set({
          width: imgWidth,
          height: imgHeight,
          left: (canvas.width - imgWidth) / 2,
          top: (canvas.height - imgHeight) / 2
        });

        canvas.add(image);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const addText = () => {
    const textObject = new fabric.Text(text, {
      left: canvas.width / 2,
      top: canvas.height / 2,
      fill: '#fff'
    });

    canvas.add(textObject);
  };

  return (
    <div>
      <Navbar onImageUpload={handleImage} />
      <div className="container">
        <canvas id="canvas" />
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter text"
              value={text}
              onChange={handleTextChange}
            />
          </div>
          <div className="control">
            <button className="button is-primary" onClick={addText}>
              Add Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;