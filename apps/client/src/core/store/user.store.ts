/**
 author: william   email:362661044@qq.com
 create_at:2023/5/25 2:06 PM
 **/
import {create} from 'zustand'

type IUserInfo = {
    id:string,
    name:string
    phone:string
}

type State = {
    userInfo:IUserInfo|null,
    setUserInfo:(data:Partial<IUserInfo>) => void
}

export const useUserInfo = create<State>((set)=>{
    return {
        userInfo:null,
        setUserInfo:(data)=>{
            console.log(data)
            set((preState)=>{
                return {...preState,...data}
            })
        }
    }
})