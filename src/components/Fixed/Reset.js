import React, { useState,useCallback }from 'react'
import { auth } from '../Firebase/Firebase'
import { withRouter } from 'react-router'


const Reset = (props) => {
    
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const register = e => {
        e.preventDefault()
        if(!email.trim()){
            setError("Ingrese el Email")
            return
        }
        
        setError(null) 
        recover()
    }

    const recover = useCallback( async () => {
        try {
            await auth.sendPasswordResetEmail(email)
            props.history.push('/login')
        } catch (error) {
            console.log(error)
            setError(error)
        }
    },[email, props.history])

    return (
        <div className="mt-5">
        <h3 className="text-center">
            Registrar Nueva contraseña
        </h3>
        <hr/>
        <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form onSubmit={register}>
                    {
                        error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )
                    }
                   <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese su Email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                    />
                    <button className="btn btn-dark btn-lg btn-block mt-5" type="submit">
                           Reinicar Contraseña
                    </button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default withRouter(Reset)
