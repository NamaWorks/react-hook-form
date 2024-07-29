import { useForm } from "react-hook-form"
import { moveLabel } from "./../../functions/moveLabel"

import './Form.css'

const Form = () => {
  

  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues:{
      username: "",
      email: "",
      password: "",
      terms: false,
      newsletter: true,
    }
  })

  const submit = (formData) => {
    console.log(formData)
    alert("form sent succesfully")
  }

  const checkboxWatched = watch("terms")

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>


        <h1>Create account</h1>

{/* NAME FIELD */}
        <div className="form-field">
          <label htmlFor="username">
            Username
          </label>
          <input 
            onFocus={function(e){moveLabel(e.target)}}
            type="text" id="username"
            {...register("username",
              {
                required:{
                  value:true,
                  message: "You must add a username"
                },
              }
            )} 
            // placeholder="Username"
          />
          { formState.errors.username && (formState.errors.email.type === "required" && <p className="error-control-msg" >{formState.errors.username.message}</p>) }

        </div>

{/* EMAIL FIELD */}
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input 
            onFocus={function(e){moveLabel(e.target)}}
            type="text" id="email"
            {...register("email",
              {
                required:{
                  value: true,
                  message: "You must add an email"
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Must use a correct email",
                },
              }
            )} 
            // placeholder="Email"
          />
          { formState.errors.email && (formState.errors.email.type === "pattern" && <p className="error-control-msg" >{formState.errors.email.message}</p>) }
          { formState.errors.email && (formState.errors.email.type === "required" && <p className="error-control-msg" >{formState.errors.email.message}</p>) }
        </div>

{/* PASSWORD FIELD */}
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input 
            onFocus={function(e){moveLabel(e.target)}}
            type="password" id="password"
            {...register("password",
                {
                  required:{
                    value: true,
                    message: "You must add a password"
                  },
                  pattern:{
                    value:/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/,
                    message: "Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character"
                  },
                }

              )} 
              // style={{borderColor: formState.errors.password && "red"}}
            // placeholder="Password"
          />
          { formState.errors.password && (formState.errors.password.type === "pattern" && <p className="error-control-msg" >{formState.errors.password.message}</p>) }
          { formState.errors.password && (formState.errors.password.type === "required" && <p className="error-control-msg" >{formState.errors.password.message}</p>) }
        </div>

{/* CHECKBOX FIELD */}
        <div className="form-field checkbox-field">
          <input 
            type="checkbox"  id="terms"
            {...register("terms",
              {
                required:{
                  value:true,
                  message: "This is mandatory for signing up"
                },
              }
            )}
          />
          <label htmlFor="terms">I accept my data being treated and sold to third party agents</label>
        </div>

{/* NEWSLETTER JOIN FIELD */}
          {
            checkboxWatched && (
              <div className="form-field checkbox-field">
              <input 
                type="checkbox" id="newsletter"
                {...register("newsletter",
                  {
                    required:{
                      value: false,
                    }
                  }
                )}
              />
              <label htmlFor="newsletter">Would you like to join our newsletter?</label>
              
            </div>
            )
          }


{/* SUBMIT BUTTON */}
          <button disabled={!checkboxWatched}>Sign Up</button>


      </form>
    </>
  )
}

export default Form