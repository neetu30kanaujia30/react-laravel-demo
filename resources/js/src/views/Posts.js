import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import PageHeader from "../components/PageHeader";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, likePost} from "../store/posts/actions";
import Button from "../components/Button";
import Cookies from 'universal-cookie';

function Posts() {
    const title = 'Posts';
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const {whole_user} = useSelector(state => state.users)
    const handleLikePost = (event, id) => {
        event.preventDefault();
        dispatch(likePost({post_id: id, id: cookies.get('user_id')})).then(()=>{
            location.reload();
        })
    }
    function likePersonName(post) {
        let temp = '';
        JSON.parse(post.like_by).forEach(makeString)
        function makeString(item) {
            temp += item + ' '
        }
        return temp;
    }
    function getDate(data_string) {
        let date = new Date(data_string);
        return date.toLocaleString().split(',')[0];
    }
    function getTime(data_string) {
        let date = new Date(data_string);
        return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    }
    const {allposts} = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(getPosts());
    }, []);
    useEffect(() => {
        console.log('allposts', allposts, 'whole_user', whole_user);
    }, [allposts]);
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
                            </Grid>
                        </Grid>
                        <Grid container justify={'center'} spacing={1} direction={'row'} alignItems={'center'}>
                            <Grid item>
                                <Table fullWidth={true} size={'large'} align={'center'}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="center">Post By</TableCell>
                                            <TableCell align="center">Title</TableCell>
                                            <TableCell align="center">Description</TableCell>
                                            <TableCell align="center">Time</TableCell>
                                            <TableCell align="center">Like By</TableCell>
                                            <TableCell align="center">Like</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(allposts.length !== 0) && allposts.map(function (post) {
                                            return (
                                                <TableRow key={post.id}>
                                                    <TableCell align="center">{post.id} </TableCell>
                                                    <TableCell align="center">{post.post_by.name} </TableCell>
                                                    <TableCell align="center">{post.title} </TableCell>
                                                    <TableCell align="left">{post.description} </TableCell>
                                                    <TableCell align="center">
                                                        <Grid container justify={'space-between'} spacing={1}
                                                              direction={'column'} alignItems={'center'}>
                                                            <Grid item>
                                                               {getDate(post.created_at)}
                                                            </Grid>
                                                            <Grid item>
                                                               {getTime(post.created_at)}
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {
                                                            post.like_by ?
                                                                likePersonName(post)
                                                                : 'No Likes'
                                                        }
                                                    </TableCell>
                                                    <TableCell align="center"><Button onClick={(event) => {
                                                        handleLikePost(event, post.id)
                                                    }}>
                                                        Like
                                                    </Button> </TableCell>
                                                </TableRow>
                                            );
                                        })}
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
export default Posts;
