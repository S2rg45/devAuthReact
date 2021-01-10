import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth } from '../Firebase/Firebase'
import { withRouter } from 'react-router'

const Navbar = (props) => {

    const logOut = () => {
        auth.signOut()
            .then(() => {
                console.log(props)
                props.history.push('/login')
            })
            .catch((error) =>{
                console.log(error)
            })
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Auth</Link>            
            <div>
                <div className="d-flex">
                    <NavLink className="btn btn-dark mr-2" to="/" exact>
                        Inicio
                    </NavLink>
                    {
                        props.userDB !== null ? (
                        <NavLink className="btn btn-dark mr-2" to="/admin">
                            Admin
                        </NavLink>
                        ) : null                            
                    }
                    {
                        props.userDB !== null ? (
                            <button 
                                className="btn btn-dark"
                                onClick={() => logOut()}
                            >Cerrar sesion
                            </button>
                        ) : (
                            <NavLink className="btn btn-dark mr2" to="/login">
                                Login
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)