import React from "react";
import ReactPlayer from "react-player";

const LiveStream = ({ streamLink }) => {
  return (
    <ReactPlayer
      url={streamLink}
      width="100%"
      height="100%"
      controls
      style={{ borderRadius: "1rem" }}
    />
  );
};

export default LiveStream;
