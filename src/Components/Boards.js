import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { AddBoard, DelBoard } from '../Store/Actions/Action';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListOfBoard, FetchBords, EditBoard, GetAllCards } from '../Store/Actions/Action';
import EditIcon from '@material-ui/icons/Edit';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    maindiv: {
        // border: '1px solid red',
        display: 'inline-block',
    },
    card: {
        margin: '10px 5px 5px 5px',
        display: 'inline-block',
        // border: '1px solid grey',

    },
    cardcontent: {
        display: 'inline-block',
        background: 'rgb(82 150 193)',
        height: '60px',
        width: '150px',
        // height: 'auto',
        // width: 'auto',

        // border: '1px solid black',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Boards(props) {
    const [board, setboard] = useState('');
    const [open, setopen] = useState(false);
    const [editopen, seteditopen] = useState(false);
    const [editboardname, seteditboardname] = useState('');
    const [boardid, setboardid] = useState();
    console.log(boardid);



    const user_id = useSelector(state => state.LoginReducer.id);

    const token = useSelector(state => state.LoginReducer.token);
    const dispatch = useDispatch();

    const classes = useStyles();
    const fetchboards = useSelector(state => state.AllBoardsReducer.boards);
    console.log(fetchboards);


    useEffect(() => {
        dispatch(FetchBords(token, props));
    }, [0])

    const handleAddBoard = () => {
        dispatch(AddBoard(token, user_id, board, props))
        setopen(false);
    }

    const onclickhandle = () => {
        setopen(true);
    }

    const handleClose = () => {
        setopen(false);
    }
    const handleOnDelete = (id) => {
        dispatch(DelBoard(id, token, props));
    }

    const handleedit = (id, name) => {
        seteditopen(true);
        seteditboardname(name);
        setboardid(id);
    }

    const editdone = () => {
        dispatch(EditBoard(boardid, editboardname, token, props))
        seteditopen(false)
    }

    const handleCardClick = (id) => {
        dispatch(ListOfBoard(id, token, props))
        dispatch(GetAllCards(id, token, props))

    }
    const handleOnDragEnd = (e) => {
        console.log(e)
        // const items =Array.from(charecter);
        // const [reorderedItem]= items.splice(result.source.index,1)
        // item.splice(result.destination.index,0,reorderedItem);
        // updatecharecter(items )
    }
    return (
        <DragDropContext onDragEnd={(e) => handleOnDragEnd(e)}>
            <Droppable droppableId='droppable' direction="horizontal" >
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className={classes.maindiv}>
                        {fetchboards && fetchboards.data && fetchboards.data.length > 0 && fetchboards.data.map((Data, i) => {
                            return (
                                <Draggable key={Data._id} draggableId={Data._id} index={i}>
                                    {(provided) => (
                                        <Card  {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} className={classes.card}  >
                                            <CardContent key={i} className={classes.cardcontent} >
                                                <div style={{ display: 'inline-block', width: '150px' }}>
                                                    <div style={{ display: 'inline-block' }}>
                                                        <EditIcon onClick={() => handleedit(Data._id, Data.name)} />
                                                    </div>
                                                    <div style={{ display: 'inline-block', float: 'right' }}>
                                                        <DeleteIcon onClick={() => handleOnDelete(Data._id)} />
                                                    </div>
                                                </div>
                                                <div onClick={e => handleCardClick(Data._id)}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Typography variant="h5" component="h2">
                                                            {Data.name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </Draggable>
                            )
                        })
                        }
                        {provided.placeholder}

                        <Card className={classes.card} onClick={onclickhandle} >

                            <CardContent className={classes.cardcontent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                <AddIcon style={{}} />

                                <Typography variant="button" display="block">
                                    ADD-Board
                                </Typography>
                            </CardContent>
                        </Card>

                        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                            <DialogTitle id="form-dialog-title">Add-Board</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Board Name"
                                    type="text"
                                    fullWidth
                                    name="board"
                                    onChange={e => setboard(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={handleAddBoard} >
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>


                        <Dialog open={editopen} onClose={() => seteditopen(false)} TransitionComponent={Transition}>
                            <DialogTitle id="form-dialog-title">Edit-Board</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Board Name"
                                    type="text"
                                    fullWidth
                                    value={editboardname}
                                    onChange={e => seteditboardname(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={editdone} >
                                    Done
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}