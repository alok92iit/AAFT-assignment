

import { Outlet } from "react-router-dom"
// import { refreshAccessToken } from "@/lib/utils"
import { useEffect } from "react"
import PortalHeader from "./header";
// import { useEffect, useState } from "react";

export default function Portal() {
  // const navigate = useNavigate();
  // const [position, setPosition] = useState(0);
  // const speed = 2;
  // const text = "🛠️ Our learning lab is getting a quick upgrade! Downloads are paused for a bit — we’ll be right back, smarter and smoother!";
  // useEffect(() => {
    // const containerWidth = document.getElementById('marquee-container')?.offsetWidth || 0;
    // const textWidth = document.getElementById('marquee-text')?.offsetWidth || 0;

    // const animation = () => {
    //   setPosition(prev => {
    //     if (prev <= -textWidth) {
    //       return containerWidth;
    //     }
    //     return prev - speed;
    //   });

    //   animationRef.current = requestAnimationFrame(animation);
    // };

    // const animationRef = { current: requestAnimationFrame(animation) };

  //   return () => {
  //     cancelAnimationFrame(animationRef.current);
  //   };
  // }, []);
  useEffect(() => {
      // navigate("/");
      // console.log("kl;mvkmvckmkcvmeois ,m km ",document.cookie);
      // const checkToken = async () => {
      //   const token = await refreshAccessToken();
      //   console.log("cjnc x,m convc,scvonv===",token)
      //   if (!token) {
      //     navigate("/");
      //   }
      // };
  
      // checkToken();
      }, []);
  return (
    // <SidebarProvider>
    //   <AppSidebar />
      <main className="flex-1 mx-0 px-0 flex flex-col bg-[--secondaryBack]">

        <PortalHeader >
        </PortalHeader>
        
        <div className="p-[1.13rem]  m-3  flex-1">
          <Outlet />
        </div>

      </main>
    // </SidebarProvider>
  )
}
