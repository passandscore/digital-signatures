import React from "react";
import Image from "next/image";

const Preloader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "white", fontWeight: "bold" }}>
        Digital Signatures
      </h1>
      <h2 style={{ fontSize: "1.2rem", color: "#4299E1", fontWeight: "bold" }}>
        Signing & Verifying
      </h2>
      {/* <Image
        src="/preloader.gif"
        alt="preloader"
        priority
        width={100}
        height={15}
      /> */}
    </div>
  );
};

export default Preloader;
