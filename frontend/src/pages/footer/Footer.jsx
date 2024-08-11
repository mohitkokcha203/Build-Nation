import React from "react";
import "./footer.scss";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
function Footer() {
  return (
    <div className="footer">
      <div className="info">
        <div className="infohead">
          <h5>ABOUT</h5>
          <p>Contact us</p>
          <p>About us</p>
        </div>
        <div className="infohead">
          <h5>HELP</h5>
          <p>Payments</p>
          <p>FAQ</p>
        </div>
        <div className="infohead">
          <h5>CONSUMER POLICY</h5>
          <p>Security</p>
          <p>Privacy</p>
          <p>Terms of use</p>
          <p>Cancellation & Returns</p>
        </div>
        <div className="infohead social">
          <h5>Social</h5>
          <p>
            {" "}
            <TiSocialFacebook />
          </p>
          <p>
            {" "}
            <TiSocialTwitter />
          </p>
          <p>
            {" "}
            <TiSocialYoutube />
          </p>
          <p>
            <TiSocialLinkedin />
          </p>
        </div>
      </div>
      <p className="developer">Developed By Rahul  and Mohit </p>
    </div>
  );
}

export default Footer;
