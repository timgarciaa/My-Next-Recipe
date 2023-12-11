import React from "react";
import HeaderBg from "./header-bg";
import Link from "next/link";
import logoImg from "@/assets/next-recipe-icon.png";
import Image from "next/image";

type Props = {};

function HeaderMain({}: Props) {
  return (
    <header className="relative flex">
      <HeaderBg />
      <div className="z-50 flex justify-between items-center px-36 pt-2 w-full lg:h-48 md:h-40">
        <Link href="/" className="flex justify-center items-center gap-5 pt-2">
          <Image src={logoImg.src} alt="Pizza" width={100} height={100} />
          <p className="font-bold tracking-[0.12rem]">MY NEXT RECIPE</p>
        </Link>

        <nav>
          <ul className="list-none m-0 p-0 flex gap-6 text-lg">
            <li>
              <Link
                href="/"
                className="no-underline text-[#ddd6cb] font-bold py-2 px-4 rounded-md"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="no-underline text-[#ddd6cb] font-bold py-2 px-4 rounded-md"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderMain;
