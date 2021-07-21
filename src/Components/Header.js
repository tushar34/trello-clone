import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core/';
import { Link, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Authlogout } from '../Store/Actions/Action';
import AppsIcon from '@material-ui/icons/Apps';
import trelloicon from '../Icon/trello.svg';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    margin: '5px',
    height: '40px',
    width: '45px',
    float: 'left',
    padding: '0.5em',
    borderRadius: '10%',
    background: 'rgb(82 150 193)',
    color: 'white',

  },
  title: {
    flexGrow: 1,
  },
}));


function Header(props) {
  console.log(props)


  const authtoken = useSelector(state => state.LoginReducer.token);

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleLogout = (e, props) => {
    e.preventDefault();
    dispatch(Authlogout());

    // props.history.push('/');

  }
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#026AA7' }} position="static">
        <Toolbar style={{ minHeight: '45px' }}>
          <div style={{ display: 'flex', position: 'relative', right: '25px' }}>
            {/* className={classes.menuButton} */}

            <IconButton style={{
              margin: '5px',
              height: '40px',
              width: '45px',
              float: 'left',
              padding: '0.5em',
              borderRadius: '10%',
              background: 'rgb(82 150 193)',
              color: 'white',
            }} aria-label="menu">
              <AppsIcon />
            </IconButton>
          </div>
          <div style={{display:'inline-flex',flexGrow: 1 ,justifyContent:'center',alignItems:'center'}}>
            <div style={{display:'inline-flex'  }}>
              <IconButton style={{
                margin: '5px',
                height: '40px',
                width: '45px',
                float: 'left',
                padding: '0.5em',
                borderRadius: '10%',
                // background: 'rgb(82 150 193)',
                color: 'white',
              }} aria-label="menu">
                <img src={trelloicon} alt="React Logo" />
                {/* /home/planete/Desktop/task2/trelloclone/src/Icon */}
              </IconButton>

            </div>

            <div style={{display:'inline-flex' ,alignItems:'center' ,justifyContent:'center'}}>
              <Typography variant="h6"  >
                Trello-Clone
              </Typography>
            </div>
          </div>
          {authtoken == null ?
            <>
              <Button color="inherit" to="/" component={Link}  >sign-in</Button>
              {/* <Button color="inherit">sign-up</Button> */}
            </>
            :
            <>
              <Button color="inherit" to='/boards' component={Link}  >Bords</Button>
              <Button color="inherit" to='/' component={Link} onClick={(e) => handleLogout(e, props)}>Logout</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </div >
  )
}
export default Header;