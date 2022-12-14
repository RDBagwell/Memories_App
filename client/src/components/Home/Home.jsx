import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid, Paper} from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import { getPosts } from '../../actions/posts';

import useStyles from './styles';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
  
    useEffect(()=>{
      dispatch(getPosts())
    }, [currentId, dispatch]);
    
  return (
    <Grow in>
    <Container>
      <Grid className={classes.mainContainer}  container justifyContent="space-between" alignItems='stretch' spacing={3}>
        <Grid item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form  currentId={currentId} setCurrentId={setCurrentId} />
          <Paper elevation={6} >
            <Paginate />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home