import { Button, ButtonGroup, DiaglogActions, DialogContent, DialogContentText } from "@mui/material";

const EditUser = () => {
    

    const handleAction = (action) => {

    }

    return(
        <ButtonGroup aria-label="large button group" size="large" orientation="vertical">
            <Button onClick={() =>  handleAction('changeUsername')}>Change Username</Button>
            <Button onClick={() =>  handleAction('changeEmail')}>Change Email</Button>
            <Button onClick={() =>  handleAction('changePassword')}>Change Password</Button>
            <Button onClick={() =>  handleAction('deleteAccount')}>Delete Account</Button>
        </ButtonGroup>
        
    )
}

export default EditUser;