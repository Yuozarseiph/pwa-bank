"use client";
import Link from "next/link";

const banks = [
  { id: 1, img: "/banks/sepah-low.png", name: "سپه", slug: "sepah" },
  { id: 2, img: "/banks/melli-low.png", name: "ملی", slug: "melli" },
  { id: 3, img: "/banks/mellat-low.png", name: "ملت", slug: "mellat" },
  {
    id: 4,
    img: "/banks/iran-zamin-low.png",
    name: "ایران زمین",
    slug: "iran-zamin",
  },
  { id: 5, img: "/banks/saderat-low.png", name: "صادرات", slug: "saderat" },
  { id: 6, img: "/banks/blu-bank-low.png", name: "بلو", slug: "blu-bank" },
  { id: 7, img: "/banks/bank-refah-low.png", name: "رفاه", slug: "refah" },
  {
    id: 8,
    img: "/banks/Bank-Mehr-Iran-low.png",
    name: "مهر ایران",
    slug: "mehr-iran",
  },
  { id: 9, img: "/banks/bank-saman-low.png", name: "سامان", slug: "saman" },
];

const BankList = () => {
  return (
    <>
      <h2 className="mt-5 text-xl font-bold flex items-center gap-2">
        <span className="h-2 w-2 bg-[#0094da] rounded-full inline-block"></span>
        بانک های تحت پوشش
      </h2>
      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-5 sm:gap-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 mt-8">
        {banks.map((item) => (
          <li
            key={item.id}
            className="hover:scale-105 transition-all duration-300 flex justify-center"
          >
            <Link
              href={`/banks/${item.slug}`}
              className="flex justify-center items-center cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 p-2 bg-[#f1f5f9] rounded-xl object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BankList;
