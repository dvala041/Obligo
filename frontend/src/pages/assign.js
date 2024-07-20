import {useState, useEffect} from 'react'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useRouter } from 'next/router'
import ChoreForm from '@/components/choreForm'


const Assign = () => {
    const {user, loading, dispatch: userDispatch} = useAuthContext()
    const router = useRouter()


    //first check if the user is logged in has permission to go here (not admin or not logged in)
    if((!loading && !user)) {
        router.push("/login")
        return
    }

    else if(user.role === "Member") {
        router.push("/")
        return
    }

    return (
        <>
        <ChoreForm />
        </>
    )



}

export default Assign
