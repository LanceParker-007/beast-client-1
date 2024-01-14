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
            <video controls width={"100px"} height={"100px"}>
              {" "}
              <source
                src={"src/assets/videos/background_color.mp4"}
                type="video/mp4"
              />
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
