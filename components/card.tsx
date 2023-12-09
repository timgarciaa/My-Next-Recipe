import React from "react";
import Image from "next/image";
import BurgerImg from "@/assets/burger.jpg";
import VeganIcon from "@/assets/vegan.png";
import { UserIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";

type Props = {};

function card({}: Props) {
  return (
    <div className="bg-[#743f22] w-60 h-80 border-2 border-[#743f22] rounded-lg relative">
      <Image
        className="rounded-lg"
        src={BurgerImg.src}
        alt="Burger"
        width={240}
        height={240}
      />
      <div className="flex flex-col gap-1 px-1 pt-1 items-center w-full">
        <h3>Chicken Adobo</h3>
        <div className="flex">
          <UserIcon className="w-5 h-5" />
          <UserIcon className="w-5 h-5" />
          <UserIcon className="w-5 h-5" />
        </div>
        <Image src={VeganIcon.src} alt="Vegan" width={20} height={20} />
      </div>
      <div className="absolute top-2 right-2">
        <HeartIcon className="w-5 h-5" />
      </div>
    </div>
  );
}

export default card;
