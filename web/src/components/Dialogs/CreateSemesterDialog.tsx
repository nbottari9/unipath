import { Dialog, DialogTitle, DialogContent, Box, TextField, Button } from "@mui/material";
import React, { FormEvent } from "react";

export const CreateSemesterDialog = ({ open, onClose, create }: { open: boolean, onClose: any, create: any }) => {
    return (

        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {    
                    component: 'form',
                onSubmit: (e: any) => {
                    const formData = new FormData(e.currentTarget)
                    const formJson = Object.fromEntries(formData.entries());
                    const name = formJson.name
                    e.preventDefault();
                    onClose();

                    create(name)
                }
                }
            }}
            >
            <DialogTitle>Create a Semester</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                        id="name"
                        name="name"
                        label={"Semester Name"}
                        variant={"outlined"}
                        sx={{ mb: 1 }}
                    />
                    <Button variant={"contained"} type="submit">Create</Button>
                </Box>
            </DialogContent>
        </Dialog>

    )
}