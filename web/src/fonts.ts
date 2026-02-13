import {Geist, Geist_Mono, Public_Sans, Roboto} from "next/font/google"

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"]
})

export const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"]
})