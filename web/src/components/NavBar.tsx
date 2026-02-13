"use client"
import { INavBarButton } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaCheckToSlot, FaGraduationCap, FaMap, FaUser } from 'react-icons/fa6';

const navBarButtons: INavBarButton[] = [
    {
        name: "Pathways",
        url: "pathways",
        icon: FaMap
    },
    {
        name: "Institutions",
        url: "institutions",
        icon: FaGraduationCap
    },
    {
        name: "Tasks",
        url: "tasks",
        icon: FaCheckToSlot
    }
]

const NavBarButton = ({ props }: { props: INavBarButton }) => {
    // return (
    //     <button aria-label={props.name} className="p-2 cursor-pointer rounded-xl hover:bg-neutral-100 transition-all duration-200 ease-out">
    //         <props.icon size={"1.5em"} />
    //     </button>
    // )
    return (
        <li><a className="h-full btn" href={props.url}><props.icon size={"1.75em"} /></a></li>
    )
}

export const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // return (
    //     <div className="w-full fixed top-0 left-0 z-50 shadow flex-row flex p-2 gap-4 bg-[#EEEEEE]">
    //         <Image src="/logo.png" width={200} height={50} alt="UniPath Logo" />
    //         {
    //             navBarButtons.map((b, idx) => (
    //                 <NavBarButton key={idx} props={b} />
    //             ))
    //         }
    //     </div>
    // );
    // return (
    //     <div className="navbar bg-base-100 shadow-sm flex justify-start items-center gap-2 h-full">
    //         <div className="">
    //             <Link href="/">
    //                 <Image src="/logo.png" alt="UniPath.io Logo" width={200} height={50} />
    //             </Link>
    //         </div>
    //         <div className="h-full">
    //             <ul className="menu menu-horizontal items-center gap-2">
    //                 {
    //                     navBarButtons.map((b, idx) => (
    //                         <NavBarButton key={idx} props={b} />
    //                     ))
    //                 }

    //                 {/* <li>
    //                     <details>
    //                         <summary>Parent</summary>
    //                         <ul className="bg-base-100 rounded-t-none p-2">
    //                             <li><a>Link 1</a></li>
    //                             <li><a>Link 2</a></li>
    //                         </ul>
    //                     </details>
    //                 </li> */}
    //             </ul>
    //         </div>
    //         <div className="flex-3 justify-end flex p-4">
    //             <FaUser />
    //         </div>
    //     </div>
    // )
    return (
         <nav
      className={`
        fixed z-50 transition-all duration-500
        ${scrolled
          ? "w-[90%] left-1/2 -translate-x-1/2 top-4 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl py-2 scale-[0.98]"
          : "w-full left-0 top-0 rounded-none py-4 scale-100"
        }
      `}
    >
      <div className="flex justify-begin items-center max-w-6xl mx-auto px-8">
        <div className="relative h-full w-[200px] flex items-center">
            <Image src={"/logo_no_text.png"} width={50} height={50} alt={"UniPath.io logo"} className={`transition-all duration-500 object-contain ${scrolled ? "opacity-100 scale-100" : "opacity-0 scale-95" } hover:cursor-pointer`}/>
            <Image src={"/logo.png"} width={200} height={50} alt={"UniPath.io logo"} className={`transition-all duration-500 object-contain ${scrolled ? "opacity-0 scale-110" : "opacity-100 scale-100"} hover:cursor-pointer`}/>
        </div>

        

        <div className="flex gap-6 font-medium">
          <a href="#" className="hover:text-gray-600 transition">Home</a>
          <a href="#" className="hover:text-gray-600 transition">Projects</a>
          <a href="#" className="hover:text-gray-600 transition">Contact</a>
        </div>
      </div>
    </nav>
    )
}