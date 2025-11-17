import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { TriangleAlert } from "lucide-react"
import Api from "@/lib/api"
import { apiUrl } from "@/lib/urls"

 
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { authAction } from "@/store/actions/auth-action"
// import { error } from "console"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
   interface Errors {
    email: string,
    password: string
  }
  const navigate=useNavigate()
  const {
    register,
    handleSubmit:handleSubmitLogin,
  
    formState: { errors },
  } = useForm<Errors>({ mode: "onBlur" })

  const dispatch=useDispatch()

  const onLogin=async(data:any)=>{
    console.log(data)
    dispatch(authAction.signIn(data,
      () => {
        navigate('/portal')
      }
    ))
    // let res=await Api.post({ data, url: apiUrl.login, show: 0 })
    // console.log("c;lmklemfvc ev==",res.status)
    // if(res.status==200){
    //    navigate("/portal")
    //    dispatch

    // }

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitLogin(onLogin)}>
            <FieldGroup>
              <Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>

  <Input
    id="email"
    type="email"
    placeholder="xyz@aaft.com"
    {...register("email", {
      required: "Please enter the email address",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    })}
  />

  {errors.email && (
    <p className="flex items-center gap-2 mx-2 text-red-500">
      <span><TriangleAlert /></span>
      <span>{errors.email.message}</span>
    </p>
  )}
</Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" {...register("password", {
                      required: "Please enter the password",
                      // minLength: {
                      //   value: 8,
                      //   message: "Password should have at least 8 characters",
                      // },
                      // maxLength: {
                      //   value: 15,
                      //   message: "Password should not exceed 15 characters",
                      // },
                    })} />
                {errors.password && (
    <p className="flex items-center gap-2 mx-2 text-red-500">
      <span><TriangleAlert /></span>
      <span>{errors.password.message}</span>
    </p>
  )}
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
