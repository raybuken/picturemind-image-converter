'use client'
import MainContent from "@/components/MainContent";
import { FilesProvider } from "@/context/FilesContext";

export default function Home() {

  return (
    <FilesProvider>
      <MainContent/>
    </FilesProvider>
  );
}
