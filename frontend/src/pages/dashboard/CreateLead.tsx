import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/input";
import Api from "@/lib/api";
import { apiUrl } from "@/lib/urls";
import { tableAction } from "@/store/actions/table-action";
import { SET_LEADS } from "@/store/reducers/table-reducer";
import { Label } from "@radix-ui/react-label";
import { ArrowUpDown, Eye, Mail, Phone, TriangleAlert, User, UserCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

const CreateLead = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  interface leadeFormValues {
    name: string;
    email: string;
    phoneNo: string;
     duplicateIt:boolean,
    source:string
  }

  const {
    reset,
    register:registerLead,
    handleSubmit,
    watch,
    setValue,
    formState: { errors :leadErrors},
  } = useForm<leadeFormValues>();
  const [showTable,setTable]=useState({
    visiblity:false,
    row:[]
  })

  const leadsCol=[
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
    {
      accessorKey: "status",
      header: "Status",
      //   cell: ({ row }) => <span>{row.getValue("email")}</span>,
    },
   
    {
      accessorKey: "",
      header: "Action",
        cell: ({ row }) => <Link to ={"/portal/leads/"+row?.original._id}><Eye/></Link>,
    }
  ]





  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const resp = await Api.post({
      data,
      url: apiUrl.leads,
      cb: () => dispatch(tableAction.getTable(apiUrl.leads, SET_LEADS)),
    });
    console.log("=====",resp)
    if (resp.status === 201) {
      reset();

    }
    else if(resp.status==400){
        setTable({
            visiblity:true,
            row:resp.response.data.data
        })
    }
    setIsLoading(false);
  };

  return (
    <div>
      {/* <h1 className="< text-center text-2xl font-semibold drop-shadow-2xl ">Add Relationship Manager</h1> */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="leads-name" className="  font-medium">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="leads-name"
              type="text"
              placeholder="Enter your name"
              {...registerLead("name", {
                "required": "Please enter the name",
                min: { value: 3, message: "name should have 3 charachter atleast" }, max: { value: 30, message: "max 30 charchter are allowed" }
              })}
              className="pl-10  noneOutline border-slate-700 text-zinc-800 placeholder:text-slate-600"
            />
          </div>
          {leadErrors.name && <p className=" flex items-center gap-2 my- mx-2 text-sm text-red-500"><span><TriangleAlert size={16} /></span><span>{leadErrors.name.message}</span></p>}
        </div>

        

        

        
        <div className="space-y-2">
          <Label htmlFor="leads-email" className="">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="leads-email"
              type="email"
              {...registerLead("email", {
                "required": "Please enter the email address",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              className="pl-10 noneOutline border-slate-700 text-zinc-800 placeholder:text-slate-600"
            />

          </div>
          {leadErrors.email && <p className=" flex items-center gap-2 my- mx-2 text-sm text-red-500"><span><TriangleAlert size={16} /></span><span>{leadErrors.email.message}</span></p>}
          {/* {leadErrors.email && <p style={{ color: "red" }}>{leadErrors.email.message}</p>} */}
        </div>
        
        
        <div className="space-y-2">
          <Label htmlFor="leads-phoneNo" className="">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="leads-phoneNo"
              type="number"
              {...registerLead("phoneNo", {
                "required": "Please enter the Phone number",
                min: { value: 6000000000, message: "Please enter valid phone number" }, max: { value: 9999999999, message: "Please enter valid phone number" }
              })}
              placeholder="Enter your phone number"
              className="pl-10 noneOutline border-slate-700 text-zinc-800 placeholder:text-slate-600"
            />
          </div>
          {leadErrors.phoneNo && <p className=" flex items-center gap-2 my- mx-2 text-sm text-red-500"><span><TriangleAlert size={16} /></span><span>{leadErrors.phoneNo.message}</span></p>}
          {/* {leadErrors.phoneNo && <p style={{ color: "red" }}>{leadErrors.phoneNo.message}</p>} */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="leads-Source" className="  font-medium">Source</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="leads-Source"
              type="text"
              placeholder="Enter Source"
              {...registerLead("source", {
                "required": "Please enter the Source",
                min: { value: 3, message: "Source should have 3 charachter atleast" }, max: { value: 30, message: "max 30 charchter are allowed" }
              })}
              className="pl-10  noneOutline border-slate-700 text-zinc-800 placeholder:text-slate-600"
            />
          </div>
          {leadErrors.source && <p className=" flex items-center gap-2 my- mx-2 text-sm text-red-500"><span><TriangleAlert size={16} /></span><span>{leadErrors.source.message}</span></p>}
        </div>
         
{
    showTable.visiblity?
    <>
    <Label htmlFor="duplicateIt" className="font-medium text-red-500 my-4 py-4">
    Duplicate Lead
  </Label>
    <DataTable columns={leadsCol} data={showTable.row} />
    <div className="space-y-2">
  

  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="duplicateIt"
      {...registerLead("duplicateIt")}
      className="h-4 w-4 border-slate-700 text-primary"
    />
    <Label htmlFor="duplicateIt" className="text-slate-700">
      Add anyway (allow duplicate)
    </Label>
  </div>

  {leadErrors.duplicateIt && (
    <p className="flex items-center gap-2 text-sm text-red-500">
      <TriangleAlert size={16} />
      {leadErrors.duplicateIt.message}
    </p>
  )}
</div>

    </>
    
    :<></>
}
   
        
        <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700" disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin mr-2">◌</div>
          ) : (
            <UserPlus className="mr-2 h-4 w-4" />
          )}
          {"Add"}
        </Button>
      </form>
    </div>
  )
}

export default CreateLead