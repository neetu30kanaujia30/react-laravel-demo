import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import Button from "../components/Button";
import Container from "@material-ui/core/Container";
import PageHeader from "../components/PageHeader";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {getUsers} from "../store/users/actions";
import Avatar from "@material-ui/core/Avatar";
import Profile from "./Profile";
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";
function Dashboard() {
    const title = 'Users';
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const {allusers} = useSelector(state => state.users)
    const {auth_user} = useSelector(state => state.users)
    useEffect(() => {
        dispatch(getUsers({id : cookies.get('user_id')}));

    }, []);
    useEffect(() => {
        console.log("-----",allusers,allusers.length);
    }, [allusers]);
    return (
        <Grid>
            <Grid align={'center'}>
                <Container maxWidth="lg">
                    <Paper style={{
                        padding: 30,
                        margin: '20px auto',
                    }} elevation={10}>
                        <Grid container justify={'space-between'} spacing={1} direction={'row'} alignItems={'center'}>
                            <Grid item>
                                <PageHeader title={title}/>
                            </Grid>
                            <Grid item>
                              <Profile/>
                            </Grid>
                        </Grid>
                        <Grid container justify={'center'} spacing={1} direction={'row'} alignItems={'center'}>
                            <Grid item>
                                <Table fullWidth={true} size={'large'} align={'center'}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="center">Profile Picture</TableCell>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Email</TableCell>
                                            <TableCell align="center">Phone Number</TableCell>
                                            <TableCell align="center">Location</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            (allusers.length !== 0) && allusers.map(function(user){
                                         return(
                                             <TableRow key={user.id}>
                                             <TableCell align="center">{user.id} </TableCell>
                                             <TableCell align="center">
                                                 <Grid  justify={'center'} alignItems={'center'}>
                                                     <Avatar   lg={{ width: 60, height: 72 }} alt="" src={user.profile_pic}/>
                                                 </Grid>
                                             </TableCell>
                                             <TableCell align="center">{user.name}</TableCell>
                                             <TableCell align="center">{user.email}</TableCell>
                                             <TableCell align="center">{user.phone}</TableCell>
                                             <TableCell align="center">
                                                 <Button
                                                     style={{textDecoration: 'none'}}
                                                 >
                                                     <Link to={'/maps'}>
                                                         View Location
                                                     </Link>
                                                 </Button>
                                             </TableCell>
                                             </TableRow>
                                         );
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
}
export default Dashboard;
