import React from 'react';
import "./profile.css";
import profile  from "../../img/profile.jpg"; // Assuming this is the correct import for the user image



const UserInfo = () => {
  return (
    <div className="user-info-container">
    <div className="left-section">
        <img src={profile} alt="User Image" /> {/* Use the imported profile image */}
        <button id="edit-image">Edit Image</button>
    </div>
    <div className="right-section">
        <h2>Kotiswar Kaithepalli</h2>
        <div className="user-details">
            <div className="user-detail">
                <label htmlFor="email">Email:</label> {/* Use "htmlFor" instead of "for" */}
                <p>R Kotiswar525@gmail.com</p>
            </div>
            <div className="user-detail">
                <label htmlFor="phone">Phone:</label>
                <p>+91 8074334426</p>
            </div>
            <div className="user-detail">
                <label htmlFor="address">Address:</label>
                <p>Enter address here</p>
            </div>
            <div className="user-detail">
                <label htmlFor="aadhar">Aadhar Card:</label>
                <p>Enter Aadhar Card number here</p>
            </div>
            <div className="user-detail">
                <label htmlFor="pan">PAN Card:</label>
                <p>Enter PAN Card number here</p>
            </div>
            <div className="user-detail">
                <label htmlFor="abha">Abha ID:</label>
                <p>Enter Abha ID here</p>
            </div>
        </div>
    </div>
</div>
  );
};

export default UserInfo;