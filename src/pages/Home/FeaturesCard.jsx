import React from "react";
import LandingPageLine from "./LandingPageLine";

const FeaturesCard = ({
  FeaturesCardTitle,
  FeaturesCardDesc,
  FeaturesCardImg,
  FeaturesCardVideo,
}) => {
  return (
    <>
      <div className="featuresCardContainer">
        <div className="featuresCardContainer-left">
          <h2 className="title">{FeaturesCardTitle}</h2>
          <p className="desc"> {FeaturesCardDesc}</p>
        </div>
        <div className="featuresCardContainer-right">
          {FeaturesCardImg ? (
            <img src={FeaturesCardImg} alt="FeaturesCardImg" />
          ) : (
            <></>
          )}
          {FeaturesCardVideo ? (
            <video autoPlay loop muted playsInline width={"70%"} height={"60%"}>
              {" "}
              <source src={FeaturesCardVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <></>
          )}
        </div>
      </div>
      <LandingPageLine />
    </>
  );
};

export default FeaturesCard;
