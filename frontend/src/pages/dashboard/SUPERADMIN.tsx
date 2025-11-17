import AnimatedModal from "@/components/ui/AnimatedModal";
import LeadCards from "@/components/ui/BannerCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { SET_MODAL } from "@/store/reducers/notify";
import { ArrowUpDown, Eye, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "./AddUser";
import { apiUrl } from "@/lib/urls";
import Api from "@/lib/api";
import CreateLead from "./CreateLead";
import { SET_USER } from "@/store/reducers/auth.reducer";
import { tableAction } from "@/store/actions/table-action";
import { SET_LEADS, SET_USERS } from "@/store/reducers/table-reducer";
import { Link } from "react-router";

const SUPERADMIN = () => {
  const dispatch=useDispatch()
//   const [users,setUser]=useState([])
  const {users,leads}=useSelector(
    (state: any) => state?.table

  )
  const modalSetting:any={
    "addTeam":{
        "title":"Add Team Member",
        "body":<AddUser/>
    },
    "addLead":{
        "title":"Add Lead",
        "body":<CreateLead/>
    }
  }
  

  let [modalType,setType]=useState("addTeam")
  const commonCol = [
    {
      accessorKey: "name",
      header: ({ column }: any) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: any) => <span>{row.getValue("name")}</span>,
    },

    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.getValue("email")}</span>,
    },
    
    {
      accessorKey: "phoneNo",
      header: "Contact No",
      //   cell: ({ row }) => <span>{row.getValue("email")}</span>,
    },
  ];
  let columns=[...commonCol,{
      accessorKey: "role",
      header: "Role",
      //   cell: ({ row }) => <span>{row.getValue("email")}</span>,
    },]
  const leadsCol=[
        ...commonCol,{
      accessorKey: "status",
      header: "Status",
      //   cell: ({ row }) => <span>{row.getValue("email")}</span>,
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned to",
        cell: ({ row }) =>
        {
            console.log("dkwndweconerfvc=",row)
            let assignedTo=row?.getValue("assignedTo")
            return (<span>{assignedTo?.email}</span>)
        }
    },
    {
      accessorKey: "",
      header: "Action",
        cell: ({ row }) => <Link to ={"/portal/leads/"+row?.original._id}><Eye/></Link>,
    }
  ]

  useEffect(()=>{


   dispatch(tableAction.getTable(apiUrl.users,SET_USERS))
   dispatch(tableAction.getTable(apiUrl.leads,SET_LEADS))
  },[])
  
  const openModal=(type:string)=>{
      setType(type); 
      console.log("dlwn a cjw sc===",modalType)
      dispatch(SET_MODAL(true))
      
  }
  return (
    <div>
      <div className="w-full ">
        {/* <CardHeader>

        <CardTitle>Login to your account</CardTitle>
         </CardHeader>
        <CardContent> */}
        <LeadCards />
        {/* </CardContent> */}
      </div>
      <div className="flex col-12 gap-4 flex-wrap">
        <Card className="flex-[3/4]">
          <CardHeader className="flex justify-between">
            <p className="leading-none font-semibold">Registered Employee</p>
            <Button onClick={() => openModal("addTeam")}>Add</Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={users} />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="flex justify-between">
            <p className="leading-none font-semibold">Leads</p>
            <Button onClick={() =>openModal("addLead")}>Add</Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={leadsCol} data={leads} />
          </CardContent>
        </Card>
      </div>
       {/* <AnimatedModal heading={"Add Team Member"} body={<AddUser/>} /> */}
       <AnimatedModal heading={modalSetting?.[modalType].title} body={modalSetting?.[modalType].body} />
    </div>
  );
};

export default SUPERADMIN;

