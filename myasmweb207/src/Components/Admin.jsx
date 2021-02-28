
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Container from '@material-ui/core/Container';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import WatchIcon from '@material-ui/icons/Watch';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  AdminCate from './AdminCate'
import AdminProduct from './AdminProduct'
import AdminOrder from './AdminOrder'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


function Admin() {
    
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const a1style = {
    padding: "40px 30px 5px 30px",
  }
    return(
        <div className="max-w-full bg-gray-100">
            <Router>
            <div className="h-28 relative"></div>
            <Container maxWidth="md">
              <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                showLabels
                className={classes.root}
              >
                <BottomNavigationAction 
                  label={<Link to="/Product" style={a1style}>Product </Link>}  
                  icon={<WatchIcon/>} 
                />

                <BottomNavigationAction 
                  label={<Link to="/category" style={a1style}>Category </Link>} 
                  icon={<CollectionsBookmarkIcon/>} 
                />
                
                <BottomNavigationAction 
                  label={<Link to="/order" style={a1style}>order</Link>} 
                  icon={<FileCopyIcon/>} 
                />
                
              </BottomNavigation>
            </Container>
  
            <Route path="/Product" component={ AdminProduct } />
            <Route path="/category" component={ AdminCate }/>
            <Route path="/order" component={ AdminOrder }/>
            <Route path="/admin" component={ AdminProduct }  exact={true}/>
            </Router>
        </div>
    );
}
export default Admin;