import React from "react";
import "../../styles/Upload.scss";
import { NavLink } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ImFileText2 } from "react-icons/im";
import { useState } from "react";
// import {Web3Storage} from "web3.storage"
import DocumentDetails from "./DocumentDetails";
import "react-dotenv"
import CheckDocDetails from "./CheckDocDetails";

function CheckDoc() {
  const [files, setFiles] = useState({});

  // async function storeFiles () {
  //   const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_TOKEN})
  //   const cid = await client.put(files)
  //   console.log('stored files with cid:', cid)
  //   return cid;
  // }

  const handleFileSelect = (evt) => {
    console.log("handle-fileSlect");
    const selectedFiles = evt.target.files;

    setFiles(selectedFiles);

    console.log(selectedFiles);
    const template = Object.values(selectedFiles).map((file) => 
       `<div class="file">
            <div class="name"><span>${file.name}</span></div>
            <div class="progress active"></div>
            <div class="done">
            </div>
        </div>`
    ).join("");

    console.log(template);
    document.getElementById("drop").classList.add("hidden");
    document.getElementById("upload-footer").classList.add("hasFiles");
    document.getElementById("importar").classList.add("active");
    setTimeout(() => {
      document.getElementById("list-files").innerHTML = template;
    }, 1000);
    Object.keys(files).forEach((file) => {
      let load = 2000 + file * 2000; // fake load
      setTimeout(() => {
        document
          .getElementById(`${file}`)
          .querySelector(".progress")
          .classList.remove("active");
        document
          .getElementById(`${file}`)
          .querySelector(".done")
          .classList.add("anim");
      }, load);
    });
  };
  const handleTriggerFileClick = (evt) => {
    console.log("handle-Trigger");
    document.getElementById("file-input").click();
    evt.preventDefault();
  };

  const handleDragEnter = (evt) => {
    console.log("handle-dragenter");
    document.getElementById("drop").classList.add("active");
    evt.preventDefault();
  };

  const handleDragOver = (evt) => {
    console.log("handle-dragOver");
    evt.preventDefault();
  };

  const handleDragLeave = (evt) => {
    console.log("handle-drahLeave");
    document.getElementById("drop").classList.remove("active");
    evt.preventDefault();
  };

  const handleDrop = (evt) => {
    console.log("handle-drop");
    document.getElementById("file-input").files = evt.dataTransfer.files;
    document.getElementById("drop").classList.remove("active");
    document.querySelector("footer").classList.add("hasFiles");
    evt.preventDefault();
  };

  const handleImportClick = () => {
    console.log("handle-ImportClick");
    document.getElementById("list-files").innerHTML = "";
    setFiles({});
    document.querySelector("footer").classList.remove("hasFiles");
    setTimeout(() => {
      document.getElementById("drop").classList.remove("hidden");
    }, 500);
  };

  return (
    <>
    <div className="upload-main">
    <div className="upload">
      <div className="upload-files">
        <header>
          <p>
            <FaCloudUploadAlt className="upload-icon" />
            <span className="up">up</span>
            <span className="load">load</span>
          </p>
        </header>
        <div
          className="upload-body"
          id="drop"
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          <ImFileText2 className="file-icon " />
          <p className="pointer-none">
            <b>Drag and drop</b> files here <br />
            <NavLink id="triggerFile" onClick={handleTriggerFileClick}>
              browse
            </NavLink>{" "}
            to begin the upload
          </p>
          <input
            type="file"
            id="file-input"
            multiple="multiple"
            onChange={handleFileSelect}
          />
        </div>
        <footer id="upload-footer">
          <div className="divider">
            <span>FILES</span>
          </div>
          <div className="list-files" id="list-files"></div>
          <button
            className="importar"
            id="importar"
            onClick={handleImportClick}
          >
            UPDATE FILES
          </button>
        </footer>
      </div>
    </div>
    </div>
    <CheckDocDetails files = {files}/>
    </>
  );
}

export default CheckDoc;
