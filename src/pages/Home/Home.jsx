import React from "react";
import "./Home.css";
import "./Home.scss";
import { Link } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import MainCard from "../../components/gameCard/MainCard";
import features from "./FeaturesCardsDetails.js";
import FeaturesCard from "./FeaturesCard";
import { image } from "../../useAssets/useAssets.js";

const Home = () => {
  return (
    <>
      <section id="hero-section">
        <div className="hero-section-top-curve">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="container">
          <div className="side-info">
            <span>Earn by playing and winning</span>
            <h1>Simple Games</h1>
            <hr />
            <Link to="/games">Play</Link>
          </div>
          <HStack
            overflowX={"auto"}
            css={{
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "::-webkit-scrollbar-thumb": {
                // height: "100px",
                borderRadius: "10px",
                WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
              },
            }}
            cursor={"grab"}
          >
            <MainCard
              cardHeading={"Image 1"}
              cardSubHeading={"Category 1"}
              cursor={"grab"}
              gameThumbnailLargeSrc={image.clickWarsFight}
              gameThumbnailSmallSrc={image.clickWarsFight}
            />
            <MainCard
              cardHeading={"Image 2"}
              cardSubHeading={"Category 2"}
              cursor={"grab"}
              gameThumbnailLargeSrc={image.clickWar}
              gameThumbnailSmallSrc={image.clickWar}
              cardLink="/games/click-war"
            />
            <MainCard
              cardHeading={"Image 2"}
              cardSubHeading={"Category 2"}
              cursor={"grab"}
              gameThumbnailLargeSrc={image.clickWarsBattleRoyal}
              gameThumbnailSmallSrc={image.clickWarsBattleRoyal}
            />
          </HStack>
        </div>
      </section>
      <section id="about-us">
        <div className="about-us-top-curve">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="features">
          {features.map((feature, index) => (
            // <>
            <FeaturesCard
              key={index}
              FeaturesCardTitle={feature.title}
              FeaturesCardDesc={feature.desc}
              FeaturesCardVideo={feature.videoSrc}
            />
            // </>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
