import React from "react";


function Panels(props) {
  const { style, btn_id, img_url, content, fnc } = props.data;
  
  return (
    <div className={style}>
      <div className="content">
        <h3>{content}</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex
          ratione. Aliquid!
        </p>
        {btn_id === "sign-in-btn" ? (
          <button className="btn transparent" id={btn_id} onClick={fnc}>
            Sign In
          </button>
        ) : (
          <button className="btn transparent" id={btn_id} onClick={fnc}>
            Sign up
          </button>
        )}
      </div>
      <img src={img_url} className="image" alt="" />
    </div>
  );
}

export default Panels;
