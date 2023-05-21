import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const token = sessionStorage.getItem("authorization");
    
    if (!token) {
      router.push("/login");
    }
  });

  return (
    <div>
      Hello, World!
    </div>
  )
}
