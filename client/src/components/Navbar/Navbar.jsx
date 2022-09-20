import { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { googleLogout } from '@react-oauth/google';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import memories from '../../images/memories.png';
import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();

    const logOut = ()=>{
        dispatch({ type: LOGOUT });
        history('/');
        setUser(null)
    }

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link}  to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt='Memories' height='60'/>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture} >
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={()=>{
                               googleLogout();
                               logOut()
                            }}>Logout</Button>
                        </div>
                    ):(
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )                   
                }
            </Toolbar>
        </div>
    </AppBar>
  )
}

export default Navbar