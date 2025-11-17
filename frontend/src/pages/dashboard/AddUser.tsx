import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Api from "@/lib/api";
import { apiUrl } from "@/lib/urls";
import { tableAction } from "@/store/actions/table-action";
import { SET_USERS } from "@/store/reducers/table-reducer";
import { Label } from "@radix-ui/react-label";
import { Mail, Phone, TriangleAlert, User, UserCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const dispatch = useDispatch();

  interface SignupFormValues {
    name: string;
    email: string;
    password: string;
   
    phoneNo: string;
    role: string;

  }

  const {
    reset,
    register:registerSignup,
    handleSubmit,
    watch,
    setValue,
    formState: { errors :signupErrors},
  } = useForm<SignupFormValues>();

  // Watch the role field to update selectedRole state
  const watchedRole = watch("role");

  useEffect(() => {
    if (watchedRole) {
      setSelectedRole(watchedRole);
    }
  }, [watchedRole]);



  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const resp = await Api.post({
      data,
      url: apiUrl.signUp,
    //   cb: () => {},
      cb: () =>dispatch(tableAction.getTable(apiUrl.users,SET_USERS)),
    });

    if (resp.status === 201) {
      reset();

    }
    setIsLoading(false);
  };

  return (
    <div>
      {/* <h1 className="< text-center text-2xl font-semibold drop-shadow-2xl ">Add Relationship Manager</h1> */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name" className="  font-medium">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="signup-name"
              type="text"
              placeholder="Enter your name"
              {...registerSignup("name", {
                "required": "Please enter the name",
                min: { value: 3, message: "name should have 3 charachter atleast" }, max: { value: 30, message: "max 30 charchter are allowed" }
              })}
              className="pl-10  noneOutline border-slate-700 text-zinc-800 placeholder:text-slate-600"
            />
          </div>
          {signupErrors.name && <p className=" flex items-center gap-2 my- mx-2 text-sm text-red-500"><span><TriangleAlert size={16} /></span><span>{signupErrors.name.message}</span></p>}
        </div>

        

        

        
        <div className="space-y-2">
          <Label htmlFor="signup-email" className="">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="signup-email"
              type="email"
              {...registerSignup("email", {
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
          {signupErrors.email && <p className=" flex items-center gap-2 my- mx-2 text-sm text-red-500"><span><TriangleAlert size={16} /></span><span>{signupErrors.email.message}</span></p>}
          {/* {signupErrors.email && <p style={{ color: "red" }}>{signupErrors.email.message}</p>} */}
        </div>
        
        
        <div className="space-y-2">
          <Label htmlFor="signup-phoneNo" className="">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="signup-phoneNo"
              type="number"
              {...registerSignup("phoneNo", {
                "required": "Please enter the Phone number",
                min: { value: 6000000000, message: "Please enter valid phone number" }, max: { value: 9999999999, message: "Please enter valid phone number" }
              })}
              placeholder="Enter your phone number"
              className="pl-10 noneOutline border-slate-700 text-zinc-800 placeholder:text-slate-600"
            />
          </div>
          {signupErrors.phoneNo && <p className=" flex items-center gap-2 my- mx-2 text-sm text-red-500"><span><TriangleAlert size={16} /></span><span>{signupErrors.phoneNo.message}</span></p>}
          {/* {signupErrors.phoneNo && <p style={{ color: "red" }}>{signupErrors.phoneNo.message}</p>} */}
        </div>

         <div className="space-y-2">
          <Label htmlFor="signup-role" className=" font-medium">Role</Label>
          <div className="relative">
            <UserCheck className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <select
              id="signup-role"
              {...registerSignup("role", {
                required: "Please select a role",
              })}
              className="w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md bg-white text-zinc-800 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="LEAD_OWNER">Lead Owner</option>
              <option value="LEAD_CLOSER">Lead Closer</option>
            </select>
          </div>
          {signupErrors.role && <p className=" flex items-center gap-2 my- mx-2 text-sm text-red-500"><span><TriangleAlert size={16} /></span><span>{signupErrors.role.message}</span></p>}
        </div>

    <div className="space-y-2">
          <Label htmlFor="password" className="  font-medium">Password</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...registerSignup("password", {
                "required": "Please enter the password",
                min: { value: 6, message: "password should have 6 charachter atleast" }, max: { value: 30, message: "max 30 charchter are allowed" }
              })}
              className="pl-10  noneOutline border-slate-700 text-zinc-800 placeholder:text-slate-600"
            />
          </div>
          {signupErrors.password && <p className=" flex items-center gap-2 my- mx-2 text-sm text-red-500"><span><TriangleAlert size={16} /></span><span>{signupErrors.password.message}</span></p>}
        </div>
       
        
        <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700" disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin mr-2">◌</div>
          ) : (
            <UserPlus className="mr-2 h-4 w-4" />
          )}
          Create Account
        </Button>
      </form>
    </div>
  )
}

export default AddUser