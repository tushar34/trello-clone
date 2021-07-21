import { combineReducers } from 'redux';
import Login from './Login';
import AllBoards from './Allboards';
import AddBoard from './Addboard';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import DelBoards from './Dellboard';
import EditBoards from './Editboard';
import ListBoard from './Listboard';
import CreateListOfBoard from './Createlistofboard';
import Dellistboard from './Dellistofboard';
import Editlistofboard from './Editlistofboard';
import Addcard from './Addcard';
import Card from './Card';
import Getcardsbyid from './Getcardbyid';
// import Getallcards from './Getallcards'
const persistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['GetcardsbyidReducer','CardReducer','AddcardReducer','EditlistofboardReducer','DellistboardReducer','CreateListOfBoardReducer','LoginReducer','AllBoardsReducer','AddBoardReducer','DellBoardReducer','EditBoardReducer','ListBoardReducer']
  };

const rootReducer = combineReducers({
    LoginReducer:Login,
    AllBoardsReducer:AllBoards,
    AddBoardReducer:AddBoard,
    DellBoardReducer:DelBoards,
    EditBoardReducer:EditBoards,
    ListBoardReducer:ListBoard,
    CreateListOfBoardReducer:CreateListOfBoard,
    DellistboardReducer:Dellistboard,
    EditlistofboardReducer:Editlistofboard,
    AddcardReducer:Addcard,
    CardReducer:Card,
    GetcardsbyidReducer:Getcardsbyid
    // GetallcardsReducer:Getallcards
});
export default persistReducer(persistConfig,rootReducer);