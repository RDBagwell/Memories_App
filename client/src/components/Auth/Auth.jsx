import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '../../utils';
import useStyles from './styles'
import Input from './Input';
import { AUTH } from '../../constants/actionTypes';
import { signup, signin } from '../../actions/auth' 

const Auth = () => {
    const initalState = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    const [ isSignup, setIsSignup ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ formData, setFormData ] = useState(initalState)

    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useNavigate()
    
    const handleSubmit = (e)=>{
      e.preventDefault();
      if(isSignup){
        dispatch(signup(formData, history))
      } else {
        dispatch(signin(formData, history))
      }
    }

    const handleChange = (e)=>{
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = ()=> setShowPassword((prevShowPassword)=> !prevShowPassword);

    const switchMode = ()=>{
      setIsSignup(!isSignup);
      setShowPassword(false)
    }


  return (
    <Container>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar } >
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant='h5' >
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name='firstName' label="First Name" handleChange={handleChange}  autoFocus  half />
                  <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                </> 
              )
            }

            {!isSignup && <GoogleLogin 
            onSuccess={ async (response)=> {
              const result = await createOrGetUser(response);
              const token = await response.credential
              try {
                dispatch({type: AUTH, data: { result, token } });
                history('/');
              } catch (error) {
                console.log(error)
              }
               
              }} 
            onError={()=>{
              console.log('Login Failed')
            }} 
            />
            }

            <Input name='email' label="Email Address" handleChange={handleChange} type='email' />
            <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type="password" /> }
            <Button type='submit' variant='contained' color='primary' className={classes.submit} fullWidth>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign In' : 'Do not have an account? Sign Up'}
                </Button>
                
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth