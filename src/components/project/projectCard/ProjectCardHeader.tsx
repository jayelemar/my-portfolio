import Image from "next/image";
import React, { FC } from "react";

type ProjectCardHeader = {
  desktopImage: string;
  mobileImage: string;
};

const ProjectCardHeader: FC<ProjectCardHeader> = ({
  desktopImage,
  mobileImage,
}) => {
  return (
    <div className="lg:no-repeat relative  flex h-[210px] w-full items-center justify-center overflow-hidden bg-green-50 sm:h-[300px] lg:bg-[110%] ">
      <Image
        src={desktopImage}
        alt=""
        width={300}
        height={200}
        className="duration-800 absolute transition-all ease-in-out group-hover:scale-110"
        loading="lazy"
      />

      <div className="relative hidden w-[700px] items-center justify-center sm:flex">
        <Image
          src="/work/laptop-view.png"
          alt="laptop-view"
          width={470}
          height={470}
          loading="lazy"
          className="z-10 hidden overflow-hidden sm:flex"
        />
        <Image
          src={mobileImage}
          alt=""
          width={100}
          height={470}
          className="absolute right-24  top-[170px] z-10 w-[100px] overflow-hidden"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ProjectCardHeader;
