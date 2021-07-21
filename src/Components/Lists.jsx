import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Board from 'react-trello'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import { GetCardById, EditCard, DelCard, CreateListOfBoard, DelListOfBoard,AddCardOfList } from '../Store/Actions/Action';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import ListIcon from '@material-ui/icons/List';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import NotesIcon from '@material-ui/icons/Notes';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false },
        { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Lists(props) {
  // console.log(props);

  const board_id = props.location.state.boardid

  const token = useSelector((state) => state.LoginReducer.token)
  const dispatch = useDispatch();
  const [listidofboard, setlistidofboard] = useState('');
  console.log(listidofboard);

  //card detail state

  const [openCardDetailDialog, setopenCardDetailDialog] = useState(false)
  const [namedisplaystyle, setnamedisplaystyle] = useState(false)
  const [opencardfield, setopencardfield] = useState(false)
  const [cardNameDetail, setcardNameDetail] = useState('')
  // const [cardimage, setcardimage] = useState(null);

  const [OpenTextfield, setOpenTextfield] = useState(false);

  const [displayeditbtn, setdisplayeditbtn] = useState('inline-block')

  const [cardid, setcardid] = useState('')
  const [cardname, setcardname] = useState('')
  const [discription, setdiscription] = useState('')
  const [cardimage, setcardimage] = useState('');
  const [listid, setlistid] = useState('')
  const [boardid, setboardid] = useState('')

  console.log(cardimage);

  //end card detail state



  //console.log(dataofcard)
  const dataofcard = useSelector((state) => state.GetcardsbyidReducer)

  const listdata = useSelector((state) => state?.ListBoardReducer?.listboard?.data)
  //console.log(listdata);

  //const carddata = useSelector((state) => state?.CardReducer?.carddata?.data)
  const carddata = useSelector((state) => state.CardReducer)
  console.log(carddata);
  // `lane${i + 1}`
  // `list${i + 1}`
  const lane = [];
  listdata.forEach((element, i) => {
    lane.push({
      id: element._id, title: element.name, cards: carddata.carddata && carddata.carddata.data && carddata.carddata.data.length && carddata.carddata.data.filter((e) => e.listId === element._id).map((item, k) => {
        return {
          id: item._id,
          title: item.name,

        };
      })
    }
    )
  })
  const newData = { lanes: lane };
  console.log(newData)

  const handleCardClick = (id) => {
    dispatch(GetCardById(id, token, props))

    carddata.carddata.data.forEach((data) => {
      if (data._id == id) {
        setcardname(data.name)
        setdiscription(data.description)
        setcardid(data._id)
        setcardimage(data.image)
        setlistid(data.listId)
        setboardid(data.boardId)
      }
    })
    setopenCardDetailDialog(true)

  }

  const handleEditNameField = () => {
    setopencardfield(true)
    setnamedisplaystyle(true)
  }
  const handleEditsave = () => {
    dispatch(EditCard(cardimage, cardname, cardid, token, discription))
    setopenCardDetailDialog(false)
    setOpenTextfield(false)
    setdisplayeditbtn('inline-block')
    setnamedisplaystyle(false)
    setcardimage(null)
  }
  const cardDetailClose = () => {
    setopenCardDetailDialog(false)
    setOpenTextfield(false)
    setdisplayeditbtn('inline-block')
    setnamedisplaystyle(false)
    // setcardname('')
    // setdiscription('')

  }
  const handleeditbtn = () => {
    setOpenTextfield(true)
    setdisplayeditbtn('none')
  }
  const handleOnClickonTextarea = () => {
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
  const handleaddcard = (e) => {
    //  console.log(e.title)
    //  console.log(e.description)
    //  console.log(e.label)
    //  console.log(e.id)
    dispatch(AddCardOfList(listidofboard,e.title,board_id,e.label,token,props))
    console.log(e)
  }
  const handledelcard = (e) => {
    dispatch(DelCard(e, token))
  }
  const handleaddList = (e) => {
    //   console.log(e)
    dispatch(CreateListOfBoard(board_id, 1, e.title, token, props))
  }
  const handlelistdelete = (e) => {
    dispatch(DelListOfBoard(e, board_id, token, props))
  }
  return (
    <>
      <Board onLaneClick={(e) => setlistidofboard(e)} onLaneUpdate={(e) => console.log(e)} onLaneDelete={(e) => handlelistdelete(e)} onLaneAdd={(e) => handleaddList(e)} onCardDelete={(e) => handledelcard(e)} onCardAdd={(e) => handleaddcard(e)} onCardClick={(e) => handleCardClick(e)} canAddLanes={true} data={newData} draggable={true} editable={true} />


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
                    // {cardNameDetail}
                    <Typography variant="h6">{cardname}</Typography>
                    :
                    <>
                      <TextField style={{ padding: '0px' }}
                        autoFocus
                        id="outlined-basic"
                        defaultValue={cardname}
                        // variant="outlined"
                        size="small"
                        onChange={(e) => setcardname(e.target.value)}
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
                {/* {listNameDetail} */}
                <p style={{ margin: '0px', marginLeft: "33px" }} >in list </p>
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

                <div style={{ display: 'inline-block' }} >
                  <Button variant="contained" color="secondary" onClick={handleEditsave}>upload</Button>
                </div>

                <div>
                  <img style={{ height: '120px' }} src={cardimage} alt="image not found" />
                </div>


              </div>


            </div>

          </div>

          <div style={{ display: 'block', float: 'right', padding: '0 16px 8px 8px', width: 'calc(100% - 465px)', overflow: 'hidden', zIndex: '10' }}>
          </div>

        </div>

      </Dialog>
    </>
  )
}