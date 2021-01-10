import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase/Firebase'
import { withRouter } from 'react-router'
import User from '../User/User'
 
const Admin = (props) => {

    const [user, setUSer] = useState(null)

    useEffect(() =>{
        if (auth.currentUser){
            setUSer(auth.currentUser)
        } else{
            console.log("admin", props.history)
            props.history.push('/login')
        }
    },[props.history])

    return (
        <div>
            <h3>Admin</h3>
            {
                user  && (
                   <User user={user}/>
                )
            }
        </div>
    )
}

export default withRouter(Admin)
