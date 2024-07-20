import { useFamilyContext } from "@/hooks/useFamilyContext"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


const AllChores = () => {
    const {family, dispatch} = useFamilyContext()
    const { user, loading, dispatch: userDispatch } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if(!loading && !user) {
            router.push("/login")
            return 
        }
    }, [user, router, loading])



    return(
        <>
        Hello
        </>
    )
}

export default AllChores