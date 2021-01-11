import React, { useState, useCallback }  from 'react'
import { auth, db } from '../Firebase/Firebase'
import { withRouter } from 'react-router'


const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registers, setRegister] = useState(true)
    const [error, setError] = useState(null)

    const register = e => {
        e.preventDefault()
        if(!email.trim()){
            setError("Ingrese el Email")
            return
        }
        if(!password.trim()){
            setError("Ingrese el password")
            return
        }
        if (password.length < 6) {
            setError("Password debe ser mayor a 6")
            return
        }
        setError(null)  

        if (registers) {
            newRegister()
        } else {
            login()
        }
    }

    const login = useCallback(async() => {
        try {
            const loginUser = await auth.signInWithEmailAndPassword(email, password)
            setEmail('')
            setPassword('')
            setError(null)       
            props.history.push('/admin')
        } catch (error) {

            if (error.code === 'auth/invalid-email'){
                setError("Email no valido")
            }

            if (error.code === 'auth/user-not-found'){
                setError("Email no registrado ...")
            }           

            if (error.code === 'auth/wrong-password'){
                setError("Contraseña incorrecta ...")
            }           
        }
        },[email, password, props.history])

    const newRegister = useCallback ( async() =>{
        try {
            const newUser = await auth.createUserWithEmailAndPassword(email, password)
            await db.collection('users').doc(newUser.user.uid).set({
                email: newUser.user.email,
                uid: newUser.user.uid  
            })
            await db.collection(newUser.user.email).add({
                name: 'task new',
                date: Date.now()
            })
            setEmail('')
            setPassword('')
            setError(null)
            props.history.push('/admin')

        } catch (error) {
            console.log(error)
            if (error.code === 'auth/invalid-email'){
                setError("Email no valido")
            }

            if(error.code === 'auth/email-already-in-use'){
                setError("Email ya se encuentra registrado")
            }
        }
    }, [email, password, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    registers ? "Registro de usuarios" : "Login de acceso"
                }
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
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese su Password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <button className="btn btn-dark btn-lg btn-block mt-5" type="submit">
                           {
                               registers ? 'Registrarse' : 'Acceder'
                           } 
                        </button>
                        <button 
                            onClick={() => setRegister(!registers)}
                            className="btn btn-info btn-sm btn-block mb-2"
                            type="button"
                        >
                            {
                                registers ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"
                            }
                        </button>
                        {
                            !registers ? (
                                <button 
                                    onClick={() => props.history.push('/reset')}
                                    className="btn btn-danger btn-sm btn-block mb-2"
                                    type="button"
                                >
                                    Recuperar Contraseña
                                </button>
                            ) : null
                                
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)

