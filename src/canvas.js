import React, { useState } from 'react';
import { fabric } from 'fabric';

function ImageLoader() {
  const [canvas, setCanvas] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imgObj = new Image();
      imgObj.src = event.target.result;

      imgObj.onload = () => {
        const image = new fabric.Image(imgObj);
        image.set({
          left: 250,
          top: 250,
          angle: 20,
          padding: 10,
          cornersize: 10
        });
        
        canvas.add(image);
      };
    };

    reader.readAsDataURL(file);
  };

  const initCanvas = (canvas) => {
    setCanvas(canvas);
  };

  return (
    <div>
      <input type="file" id="imgLoader" onChange={handleImage} />
      <canvas ref={initCanvas} />
    </div>
  );
}

export default ImageLoader;
