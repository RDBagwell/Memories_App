import {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin, googleLogout  } from '@react-oauth/google';
import useStyles from './styles'
import Input from './Input';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    
    const handleSubmit = ()=>{

    }

    const handleChange = ()=>{

    }

    const handleShowPassword = ()=> setShowPassword((prevShowPassword)=> !prevShowPassword);

    const switchMode = ()=>{
      setIsSignup(!isSignup);
      handleShowPassword(false)
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
                {/* {!isSignup && <GoogleLogin>Signin With Google</GoogleLogin>} */}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth