import { useSelector } from "react-redux"
// import userAvtar from "/userAvtar.png"
import { LogOut, User } from "lucide-react";
import {  useState } from "react";
import { Link } from "react-router-dom";


import { imageURL } from "@/lib/urls";

const PortalHeader = ({ children }: any) => {
 

  const { name } = useSelector((state: any) => ({
    name: state.auth?.user?.name,

    role:state.auth?.user?.role
  }));
  const [openDrawer, setDrawer] = useState(false)
  
 
  return (
    <div className="mx-none flex items-center justify-between border-none bg-white w-full px-2 shadow-lg text-zinc-800 sticky top-0 z-30">
      <div>
        <img className="w-26" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwvlK4A3na_NZwXpasXr2AS2qnFERKRHF5g&s"/>
      </div>
      

      <div className="flex gap-2 items-center">
        
        
        <h1 className=" font-semibold text-lg">{name}</h1>
        <div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={"data:image/png;base64,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" } className="w-full h-full object-cover" onClick={() => setDrawer(prev => !prev)}></img>

          </div>
         
        </div>

      </div>
    </div>
  )
}

export default PortalHeader

