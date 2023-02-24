import React from "react";
import "./Navbar.css"

const Navbar = ({ handleImage, handleAddText, handleClearCanvas, handleDownloadPdf, handleTextChange, handleFontChange, handleFontSizeChange, text, font, fontSize }) => {
  return (
    <nav>
      <input type="file" id="imgLoader" onChange={handleImage} />
      <button onClick={handleAddText}>Add Text</button>
      <button onClick={handleClearCanvas}>Clear Canvas</button>
      <button onClick={handleDownloadPdf}>Download PDF</button>
      <input type="text" placeholder="Enter Text" value={text} onChange={handleTextChange} />
      <input type="text" placeholder="Enter Font" value={font} onChange={handleFontChange} />
      <input type="number" placeholder="Enter Font Size" min="1" max="100" value={fontSize} onChange={handleFontSizeChange} />
    </nav>
  );
};

export default Navbar;