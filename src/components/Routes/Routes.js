import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Admin from '../Admin/Admin'
import Navbar  from '../Fixed/Navbar'
import Login from '../Login/Login'
import { auth } from '../Firebase/Firebase'
import Reset from '../Fixed/Reset'

const Routes = () => {

    const [userDB, setUserDB] = useState(false)

    useEffect(() =>{
        auth.onAuthStateChanged(user => {
            if(user) {
                setUserDB(user)
            } else {
                setUserDB(null)
            }
        })
    }, [])

    return userDB !== false ? (
        <Router>
            <div className="container">
                <Navbar userDB={userDB}/>
                <Switch>
                    <Route path='/login'>
                        <Login/>
                    </Route>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/reset">
                        <Reset />
                    </Route>
                    <Route path="/">
                        Inicio...
                    </Route>
                </Switch>
            </div>
        </Router>
    ) : (
        <div className="container">
            <p className="mt-10">Cargando ....</p>
        </div>
    )
}

export default Routes
