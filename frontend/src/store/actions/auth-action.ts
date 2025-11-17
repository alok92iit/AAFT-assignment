import Api from "@/lib/api"
import { SET_TOKEN, SET_USER } from "../reducers/auth.reducer"

// import { URLs } from "@/lib/urls"
import { Dispatch } from "@reduxjs/toolkit"
import { apiUrl } from "@/lib/urls"


export const authAction={
    signIn: (data:any, cb:any):any => async (dispatch:Dispatch, _:any) => {
        try {
            const res = await Api.post({ url: apiUrl.login, data,show:0 })
            if (res?.status !== 200) return
            console.log("the data ==", res.data)
            const { token, user } = res.data
            // console.log(token , user , 'adfasdfasfasfssadfasd')
            // dispatch(SET_LOGIN_AUTH({
            //     token,
            //     ...user
            // }))
            // const { token, user, toolboxToken, subscription = null } = res.data
            dispatch(SET_TOKEN(token))
            // dispatch(SET_TOOLBOX_TOKEN(toolboxToken))
            // dispatch(SET_MFA_REQUIRED(true))
            // let currentRole = user?.role;
            // let currentSecondaryRole = ("learnerRole" in user && user?.learnerRole) ? "LEARNER" : currentRole
            // const newData = { ...user }
            // newData['role'] = currentSecondaryRole;
            // newData['secondaryRole'] = ("learnerRole" in user && user?.learnerRole) ? currentRole : "LEARNER"

            dispatch(SET_USER(user))
            // dispatch(SET_SUBSCRIPTION_PLAN(subscription || null))
            // dispatch(SET_LEADERBOARD_ID({}))
            cb()
        } catch (error) {
            console.error("error", error)
        }
    },
    // signOut: (cb) => async (dispatch, _) => {
    //     try {
    //         const res = await Api.get({ url : '/logout' })
    //         if(res && res?.status === 200){
    //             dispatch(RESET_STATE_DISCUSSIONFORUM())
    //             sessionStorage.removeItem('primarycolor')
    //             sessionStorage.removeItem('secondarycolor')
    //             dispatch(ResetActions.resetAllStates())
    //             cb()
    //         }else{  

    //         }
    //     } catch (error) {

    //     }
    // },
}