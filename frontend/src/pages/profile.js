import { useAuthContext } from "@/hooks/useAuthContext"
import { useEffect } from "react"
import { useRouter } from "next/router"


const Profile = () => {
    const {loading, user} = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
          router.push("/login")
          return
        }}, [loading, user, router])

    return (
       user && (user.username)
    )
}

export default Profile