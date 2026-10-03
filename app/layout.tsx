import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata={title:"MPSC Library | Free Study Material",description:"Free MPSC books, notes, previous papers and study material."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="mr"><body>{children}</body></html>}