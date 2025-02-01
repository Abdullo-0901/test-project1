import { useEffect } from "react";
import { Header, Sidebar } from "../../../component";

export function Layout() {
  useEffect(() => {
    get();
  }, []);

  async function get() {
    const response = await fetch(import.meta.env.VITE_BASE_ULR);
    console.log(response.json());
  }

  return (
    <div className="">
      <Header />
      <Sidebar />
        
    </div>
  );
}
