import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListOfBoard, EditCard, GetAllCards, DelCard, GetCardsOfList, CreateListOfBoard, AddCardOfList, DelListOfBoard, EditListOfBoard } from '../Store/Actions/Action';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import ListIcon from '@material-ui/icons/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import NotesIcon from '@material-ui/icons/Notes';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    maindiv: {
        display: 'inline-block',
    },
    card: {
        margin: '10px 5px 5px 5px',
        display: 'inline-block',
        verticalAlign: 'top',



    },
    cardcontent: {
        display: 'inline-block',
        background: 'rgb(82 150 193)',
        height: 'auto',
        width: '150px',


    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function List(props) {

    //dnd
    // const [charecter, updatecharecter] = useState(finalSpaceCharecters)
    // console.log(props)
    // console.log(props.location.state.boardid)
    const classes = useStyles();

    //    const allcards = useSelector(state => state.GetallcardsReducer)
    const allcards = useSelector(state => state.CardReducer)
    // console.log(allcards);

    const [showDeleteIcon, setshowDeleteIcon] = useState('')

    // state for card_detail 
    const [cardIdDetail, setcardIdDetail] = useState('')
    const [cardNameDetail, setcardNameDetail] = useState('')
    const [listNameDetail, setlistNameDetail] = useState('')
    const [discription, setdiscription] = useState(null);
    // console.log(discription)
    const [cardimage, setcardimage] = useState(null);
    // const displayImage = `../../../npod_api/${cardimage}`
    //console.log(cardimage)
    // console.log(cardimage)

    const [namedisplaystyle, setnamedisplaystyle] = useState(false)

    const [opencardfield, setopencardfield] = useState(false)
    // console.log(discription)
    //after add discription
    const [Carddiscription, setCarddiscription] = useState('')
    // console.log(Carddiscription);
    const [OpenTextfield, setOpenTextfield] = useState(false);
    const [displayeditbtn, setdisplayeditbtn] = useState('inline-block')




    const [order, setrorder] = useState("")
    const [name, setname] = useState("")

    const [card_name, setcard_name] = useState("")
    const [card_order, setcard_order] = useState("")

    const [displayAddbtn, setdisplayAddbtn] = useState(true)

    const [openCardDetailDialog, setopenCardDetailDialog] = useState(false)


    const [openaddlist, setopenaddlist] = useState(false);
    const [openeditlist, setopeneditlist] = useState(false);
    const [addbutton, setaddbutton] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const user_id = useSelector(state => state.LoginReducer.id);
    const token = useSelector(state => state.LoginReducer.token);
    const ListBoard = useSelector(state => state.ListBoardReducer.listboard);
    const board_id = props.location.state.boardid;

    const [list_id, setlist_id] = useState('');
    const [list_name, setlist_name] = useState('');



    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(ListOfBoard(board_id, token, props));
        dispatch(GetAllCards(token))

    }, [])


    const handlecreatelist = () => {

        dispatch(CreateListOfBoard(board_id, order, name, token, props))
        setopenaddlist(false)

    }

    const handledelete = (list_id) => {
        setAnchorEl(null)
        dispatch(DelListOfBoard(list_id, board_id, token, props))
    }

    const handleonedit = (list_id, name) => {
        console.log(list_id);
        console.log(name);
        // setlist_id(list_id);
        // setlist_name(name);
        setopeneditlist(true);
        setAnchorEl(null);
    }

    const handlesubmit = () => {
        setopeneditlist(false)
        dispatch(EditListOfBoard(list_id, list_name, board_id, token, props))
    }
    const handleOpenMenu = (event, id, name) => {
        setAnchorEl(event.currentTarget);
        setlist_id(id);
        setlist_name(name);
        dispatch(GetCardsOfList(id, token, props));


    }
    const handleaddcard = (id) => {

        dispatch(AddCardOfList(id, card_name, board_id, card_order, token, props))
        setaddbutton('')
        setcard_order("");
        setcard_name("");
    }
    const handleAddCardbtn = (id) => {
        setaddbutton(id)
        setdisplayAddbtn(false)

    }
    const handleClosebtn = () => {
        setdisplayAddbtn(true)
        setaddbutton('')
    }

    const opencardDialog = (id, card_name, list_name, discription, image) => {
        console.log('name', card_name)
        console.log('list_name', list_name)
        console.log('discription', discription)
        console.log('image', image)

        setopenCardDetailDialog(true)
        setcardIdDetail(id)
        setcardNameDetail(card_name)
        setlistNameDetail(list_name)
        setdiscription(discription)
        setcardimage(image)

    }

    const handleCardDelete = (id) => {

        dispatch(DelCard(id, token, props))
    }
    const cardDetailClose = () => {
        setopenCardDetailDialog(false)
        setOpenTextfield(false)
        setdisplayeditbtn('inline-block')
        setnamedisplaystyle(false)
    }
    const handleEditsave = () => {
        dispatch(EditCard(cardimage, cardNameDetail, cardIdDetail, token, discription))

        setopenCardDetailDialog(false)
        setOpenTextfield(false)
        setdisplayeditbtn('inline-block')
        setnamedisplaystyle(false)
        setcardimage(null)
    }
    const handleeditbtn = () => {
        setOpenTextfield(true)
        setdisplayeditbtn('none')
    }
    const handleEditfield = () => {
        setOpenTextfield(true)
        setdisplayeditbtn('none')
    }
    const handleCardDetailClosebtn = () => {
        setOpenTextfield(false)
        setdisplayeditbtn('inline-block')
    }
    const handleEditNameField = () => {
        setopencardfield(true)
        setnamedisplaystyle(true)
    }
    const handleOnClickonTextarea = () => {
        setOpenTextfield(true)
        setdisplayeditbtn('none')
    }
    // const [dragcard,setdragcard]= useState(allcards)
    const handleOnDragEnd = (e) => {
        console.log(e)
        // const items =Array.from(charecter);
        // const [reorderedItem]= items.splice(result.source.index,1)
        // item.splice(result.destination.index,0,reorderedItem);
        // updatecharecter(items )
    }
    return (
        <DragDropContext onDragEnd={(e) => handleOnDragEnd(e)}>
            {/* <Droppable droppableId="droppable" direction="vertical" >
                {(provided, snapshot) => ( {...provided.droppableProps} ref={provided.innerRef} */}
            <div className={classes.maindiv}>
                {ListBoard && ListBoard.data && ListBoard.data.length > 0 && ListBoard.data.map((Data, i) => (
                    // <Draggable key={Data._id} draggableId={Data._id} index={i}>
                    //     {(provided, snapshot) => (
                    // {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef}
                    <Card className={classes.card}  >
                        <CardContent className={classes.cardcontent}  >
                            <div style={{ display: 'inline-block' }}>
                                <div style={{ display: 'inline-block' }}>
                                    <div style={{ display: 'inline-block', width: '160px' }}>
                                        <div style={{ display: 'inline-block', width: '130px' }}>

                                            <Typography variant="h5" component="h2"   >
                                                {Data.name}
                                            </Typography>

                                        </div>

                                        <div style={{ display: 'inline-block', float: 'right', position: 'sticky' }}>
                                            <ListIcon onClick={(e) => handleOpenMenu(e, Data._id, Data.name)} />
                                        </div>
                                    </div>
                                    <Divider />
                                  
                                    <Droppable droppableId="droppable"  direction="vertical"   >
                                        {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef} className='scrollbar' style={{maxHeight: '300px', overflowY: 'auto' }}>
                                                {allcards && allcards.carddata && allcards.carddata.data && allcards.carddata.data.length > 0 && allcards.carddata.data.map((data, i) => (
                                                   <>
                                                        {data.listId == Data._id ?
                                                            <>
                                                                <div  style={{ display: 'block', margin: '3px' }}>
                                                                    <Draggable  key={data._id} draggableId={data._id} index={i}>
                                                                        {(provided) => (
                                                                            <Card  {...provided.draggableProps} {...provided.dragHandleProps} innerRef={provided.innerRef} onMouseOut={() => setshowDeleteIcon('')} onMouseOver={() => setshowDeleteIcon(data._id)} style={{ height: '50px' }}  >

                                                                                <div onClick={() => opencardDialog(data._id, data.name, Data.name, data.description, data.image)} style={{ display: 'inline-block', height: '25px', width: '118px' }}>
                                                                                    <CardContent style={{ padding: '0px' }}  >
                                                                                        <Typography style={{ marginLeft: '5px' }} variant="body2" display="block" gutterBottom key={i} >{data.name}</Typography>
                                                                                    </CardContent>
                                                                                </div>


                                                                                {showDeleteIcon == data._id &&
                                                                                    <div onMouseOver={() => setshowDeleteIcon(data._id)} style={{ display: 'inline-block' }}>
                                                                                        <DeleteIcon fontSize='small' onClick={() => handleCardDelete(data._id)} />
                                                                                    </div>
                                                                                }
                                                                            </Card>
                                                                        )}
                                                                    </Draggable>
                                                                </div>
                                                            </>
                                                            : <></>}
                                                    </>

                                                ))
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                    
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={() => setAnchorEl(null)}
                                    >
                                        <MenuItem onClick={(e) => handleonedit(Data._id, Data.name)} >Edit</MenuItem>
                                        <MenuItem onClick={() => handledelete(Data._id)}>Delete</MenuItem>
                                    </Menu>
                                    <Divider />

                                    <div style={{ display: 'inline-flex', width: '158px', alignItems: "center", justifyContent: 'center' }}>
                                        <Button color='primary ' id="standard-basic" label="Add-card" onClick={() => handleAddCardbtn(Data._id)}>add card</Button>
                                    </div>
                                </div>

                            </div>
                            {addbutton == Data._id &&
                                <>
                                    <div style={{ display: 'inline-block', marginTop: '10px' }}>
                                        <div>
                                            <TextField id="standard-basic" label="Add-card" onChange={(e) => setcard_name(e.target.value)} />
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <TextField id="standard-basic" label="card-order" onChange={(e) => setcard_order(e.target.value)} />
                                        </div>
                                        <div style={{ display: 'inline-block' }}>
                                            <Button style={{ padding: '3px 0px 0px 0px', justifyContent: 'left' }} >
                                                <CloseIcon style={{}} fontSize='small' onClick={handleClosebtn} />
                                            </Button>
                                        </div>
                                        <div style={{ display: 'inline-block', marginLeft: '22px', marginTop: '5px' }}>
                                            <Button variant="contained" color='secondary' style={{ padding: '3px 0px 0px 0px' }} onClick={() => handleaddcard(Data._id)}  >add</Button>
                                        </div>
                                    </div>
                                </>
                            }

                        </CardContent>

                    </Card>
                    //     )}
                    // </Draggable>
                )
                )}
                {/* {provided.placeholder} */}








                <Card style={{ position: 'relative' }} className={classes.card} onClick={() => setopenaddlist(true)} >

                    <CardContent className={classes.cardcontent} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <AddIcon style={{}} />

                        <Typography variant="button" display="block">
                            ADD-List
                        </Typography>
                    </CardContent>
                </Card>

                <Dialog open={openaddlist} onClose={() => setopenaddlist(false)} TransitionComponent={Transition} >
                    <DialogTitle id="form-dialog-title">Add-List</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="List Name"
                            type="text"
                            fullWidth
                            name="board"
                            onChange={(e) => setname(e.target.value)}

                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            label="order"
                            type="text"
                            fullWidth
                            name="board"
                            onChange={(e) => setrorder(e.target.value)}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handlecreatelist}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openeditlist} onClose={() => setopeneditlist(false)} TransitionComponent={Transition}  >
                    <DialogTitle id="form-dialog-title">Edit-List</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="List Name"
                            type="text"
                            value={list_name}
                            onChange={(e) => setlist_name(e.target.value)}
                            fullWidth

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handlesubmit}  >
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog scroll='body' aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description" open={openCardDetailDialog} onClose={() => setopenCardDetailDialog(false)} maxWidth='sm' fullWidth='true' TransitionComponent={Transition}  >

                    <div style={{ height: '600px' }}>

                        <div style={{ display: 'inline-block', width: '490px', marginTop: '15px', marginBottom: '20px' }}>

                            <div style={{ display: 'inline-block', marginLeft: '15px', width: 'auto' }}>
                                <div style={{ display: 'inline-block' }}>
                                    <VideoLabelIcon />
                                </div>
                                {/* <div style={{ display: 'inline-block', border: '1px solid red', height: 'auto', width: "auto" }}> */}
                                <div>
                                    <div onClick={handleEditNameField} style={{ display: 'inline-block', marginLeft: '34px', top: '11px', position: "absolute" }}>
                                        {namedisplaystyle == false ?
                                            <Typography variant="h6">{cardNameDetail}</Typography>
                                            :
                                            <>
                                                <TextField style={{ padding: '0px' }}
                                                    autoFocus
                                                    id="outlined-basic"
                                                    defaultValue={cardNameDetail}
                                                    // variant="outlined"
                                                    size="small"
                                                    onChange={(e) => setcardNameDetail(e.target.value)}
                                                />
                                            </>
                                        }
                                    </div>
                                    {namedisplaystyle == true &&
                                        <div style={{ marginBottom: '10px', display: 'inline-block', marginLeft: '30px', marginTop: '10px', width: '115px' }}>
                                            <div style={{ display: 'inline-block' }}>
                                                <Button variant="contained" color="primary" onClick={() => handleEditsave()}  >Save</Button>
                                            </div>
                                            <div style={{ display: 'inline-block', float: 'right', position: 'relative', top: '5px' }}>
                                                <CloseIcon onClick={() => setnamedisplaystyle(false)} />
                                            </div>
                                        </div>
                                    }
                                </div>
                                {/* <div style={{display: 'inline-block', marginLeft: '10px', top: '11px', position: "absolute" }}>
                                {opencardfield &&
                                    <>
                                        
                                    </>
                                }
                            </div> */}

                                <div style={{ display: 'block' }}>
                                    <p style={{ margin: '0px', marginLeft: "33px" }} >in list {listNameDetail}</p>
                                </div>
                                {/* </div> */}
                            </div>


                            <div style={{ display: 'inline-block', position: 'absolute', right: '2px', marginRight: '15px' }}>
                                <DialogContent style={{ padding: '0px' }}>
                                    <CloseIcon fontSize='small' onClick={() => cardDetailClose()} />
                                </DialogContent>
                            </div>
                        </div>


                        <div style={{ display: 'block', float: 'left', margin: '0', overflowX: 'hidden', overflowY: 'auto', minHeight: '24px', padding: '0 8px 8px 16px', position: 'relative', width: '410px', zIndex: '0' }}>

                            <div style={{ marginBottom: '30px' }} >
                                <div style={{ display: 'inline-block', position: 'relative', top: '8px' }}>
                                    <NotesIcon />
                                </div>
                                <div style={{ display: 'inline-block', position: 'absolute', top: '8px', marginLeft: '8px' }}>
                                    <h3 style={{ margin: '0px' }}>description</h3>
                                </div>
                                <div style={{ display: 'inline-block', marginLeft: '120px' }}>
                                    <Button style={{ display: displayeditbtn }} variant="contained" color="secondary" onClick={handleeditbtn}>Edit</Button>
                                </div>
                                <div>
                                    {discription == null || discription == '' ?
                                        <>
                                            {OpenTextfield == false &&
                                                <>

                                                    <div onClick={handleOnClickonTextarea} style={{ marginLeft: '31px', height: '70px', backgroundColor: '#dbd8d8' }}>
                                                        <p>Add a more detailed description ...</p>
                                                    </div>
                                                </>

                                            }
                                        </>
                                        :
                                        <>
                                            {OpenTextfield == false &&
                                                <div style={{ marginLeft: "33px" }} onClick={handleEditfield} >
                                                    <p>{discription}</p>
                                                </div>
                                            }
                                        </>
                                    }

                                    {OpenTextfield &&
                                        <>
                                            <div className='ptag' style={{ marginLeft: '31px', height: '70px', backgroundColor: '#dbd8d8' }}>
                                                {/* <TextField placeholder="Add a more detailed description ..."   ></TextField> */}
                                                <TextField style={{ width: '377px' }}
                                                    autoFocus
                                                    id="filled-multiline-static"
                                                    rows={4}
                                                    defaultValue={discription}
                                                    placeholder="Add a more detailed description"
                                                    variant="filled"
                                                    onChange={(e) => setdiscription(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ display: 'inline-block', marginLeft: '30px', marginTop: '10px', width: '115px' }}>
                                                <div style={{ display: 'inline-block' }}>
                                                    <Button variant="contained" color="primary" onClick={() => handleEditsave()}  >Save</Button>
                                                </div>
                                                <div style={{ display: 'inline-block', float: 'right', position: 'relative', top: '5px' }}>
                                                    <CloseIcon onClick={handleCardDetailClosebtn} />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'inline-block', position: 'relative', top: '8px' }}>
                                    <PhotoCameraIcon />
                                </div>
                                <div style={{ display: 'inline-block', marginLeft: '8px' }}>
                                    <h3 style={{ margin: '0px' }}>image</h3>
                                </div>
                                <div style={{ marginLeft: '22px' }}>
                                    <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                                        <input onChange={(e) => setcardimage(e.target.files[0])} type="file" />
                                    </div>
                                    {/* {cardimage && */}
                                    <div style={{ display: 'inline-block' }} >
                                        <Button variant="contained" color="secondary" onClick={handleEditsave}>upload</Button>
                                    </div>
                                    <div>
                                        <img src={cardimage} alt="image not found" />
                                        {/* <img src={require('../../../npod_api/src/uploads/1626180657560.jpg')} alt="image not found" /> */}
                                        {/* src="../../../npod_api/src/uploads/1626180657560.jpg" */}
                                    </div>

                                    {/* } */}
                                </div>


                            </div>

                        </div>

                        <div style={{ display: 'block', float: 'right', padding: '0 16px 8px 8px', width: 'calc(100% - 465px)', overflow: 'hidden', zIndex: '10' }}>
                        </div>

                    </div>

                </Dialog>



            </div >
            {/* )}
             </Droppable> */}
        </DragDropContext>
    )
}


