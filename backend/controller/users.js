import { findByAggregate } from "../utils/dbOperation.js"

export const allUsers=async(req,res)=>{
    let {role}=req.query
    let query=[
        {
            "$match":{
                "role":{
                    "$ne":"OWNER"
                }
            }
        },
        {
            "$project":{
                password:0
            }
        }
    ]
    if(role=="LEAD_CLOSER"){
        query.push({
            "$match":{
                "role":"LEAD_CLOSER"
            }
        })
    }
    let users=await findByAggregate("users",query)
    return res.status(200).json({data:users})
}