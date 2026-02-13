import { publicSans, roboto } from '@/fonts';
import React from 'react'
import { FaEllipsisV } from 'react-icons/fa';
import { FaArrowRight, FaGraduationCap, FaMapLocation } from 'react-icons/fa6';

const Comp = () => {
    return (
         <div className="flex flex-col p-4 bg-neutral-200 rounded-2xl justify-start gap-10">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center gap-4">
                    <div className="flex flex-row items-center gap-3">   
                        <FaMapLocation className="text-2xl"/>
                        <h1 className={`text-2xl ${publicSans.className}`}>Pathway 1</h1>
                    </div>
                    <button className="hover:cursor-pointer hover:bg-neutral-300 rounded-full p-1 transition-all duration-100">
                        <FaEllipsisV className="text-lg"/>
                    </button>
                </div>
                <p className={`text-sm text-gray-600 ${roboto.className}`}>
                    TYPE, MAJOR
                </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                        <FaGraduationCap className="text-xl"/>
                        <p className={`${publicSans.className}`}>SCHOOL, YOG</p>
                    </div>
                    <button className="hover:cursor-pointer rounded-full p-1 transition-all duration-100 hover:bg-neutral-300">
                        <FaArrowRight className="text-2xl"/>
                    </button>
                </div>
            </div>
    )
}

export default function PathwaysPage () {
    

    return (
        <div className="flex items-center justify-center">
        <div className="grid items-start grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-5/6 gap-4">
        
            <Comp/>
            <Comp/>
            <Comp/>
            <Comp/>
            <Comp/>
            <Comp/>
        </div>
</div>

    );
}