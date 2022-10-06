import { ButtonGroup} from "@mui/material";
import ChangeUsername from "./ChangeUsername";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";


const EditUser = () => {
    



    return(
        <ButtonGroup aria-label="large button group" size="large" orientation="vertical">
           <ChangeUsername />
           <ChangeEmail />
           <ChangePassword/>
        </ButtonGroup>
        
    )
}

export default EditUser;