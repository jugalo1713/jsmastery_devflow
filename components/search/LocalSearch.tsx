"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { useRouter } from "next/navigation";

interface Props {
  route: string;
  imgSrc: string;
  placeHolder: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeHolder, otherClasses }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQueryh] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
            value: searchQuery,
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchQuery, searchParams, router, route]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="Search"
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeHolder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQueryh(e.target.value);
        }}
        className="paragrapg-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
      />
    </div>
  );
};
export default LocalSearch;
