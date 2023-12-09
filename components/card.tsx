"use client";

import React, {useState} from "react";
import Image from "next/image";
import VeganIcon from "@/assets/vegan.png";
import { UserIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import {HeartIcon as HeartIconSolid} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  title: string;
  servingPortions?: number;
  isVegetarian?: boolean;
  isFavorite?: boolean;
  image: string;
};

function Card({ id, title, servingPortions, isVegetarian, isFavorite, image }: Props) {
  const router = useRouter();

  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const clickCard = () => {
    router.push(`/recipe/${id}`);
  };

  const clickHeart = (event: any) => {
    event.stopPropagation();
    setIsFavoriteState(!isFavoriteState);
  }

  return (
    <div
      className="bg-[#743f22] w-60 h-80 border-2 border-[#743f22] rounded-lg relative cursor-pointer"
      onClick={clickCard}
    >
      <Image
        className="rounded-lg"
        src={image}
        alt={title}
        width={240}
        height={240}
      />
      <div className="flex flex-col gap-1 px-1 pt-1 items-center w-full">
        <h3>{title}</h3>
        <div className="flex">
          {[...Array(servingPortions)].map((_, i) => (
            <UserIcon key={i} className="w-5 h-5" />
          ))}
        </div>
        {isVegetarian && (
          <Image src={VeganIcon.src} alt="Vegan" width={20} height={20} />
        )}
      </div>
      <div className="absolute top-2 right-2 z-50" onClick={clickHeart}>
        {isFavoriteState ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
      </div>
    </div>
  );
}

export default Card;
