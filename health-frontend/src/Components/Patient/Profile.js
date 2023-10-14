import React from "react";
import "../../styles/profile.css";

function Profile({data}) {
  return (
    <div className="profile-main">
      <div className="profile-photo">
        <div className="profileimg-con"></div>
        <div className="profileimg-upload"> 
            Upload Image
        </div>
      </div>
      <div className="profile-info">
        <div class="profile-info-main">
              <div className="profile-info-sub">Name : {data.name }</div>
              <div className="profile-info-sub">Etherium Id : {data.eth_id}</div>
              <div className="profile-info-sub">ABHA ID : {data.abha_id}</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
