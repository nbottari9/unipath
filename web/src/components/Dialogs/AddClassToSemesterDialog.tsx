import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, Input, TextField } from "@mui/material";
import React, { FormEvent, Suspense, SyntheticEvent, useContext } from "react";
import { CoursesContext } from "ROOT/src/contexts/CoursesContext";

export const AddCourseToSemesterDialog = ({ open, onClose, addClassesToSemester, semesterId, name }: { open: boolean, onClose: any, addClassesToSemester: any, semesterId: string, name: string }) => {

    const courses = useContext(CoursesContext)

    const [selectedCourses, setSelectedCourses] = React.useState<any[]>([]);

    const handleOnChange = (event: SyntheticEvent, value: any[]) => {
        console.log(value)
        setSelectedCourses(value);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                slotProps={{
                    paper: {
                        component: 'form',
                    onSubmit: (e: any) => {
                        e.preventDefault();
                        onClose();
                        addClassesToSemester(semesterId, selectedCourses); // add classes to semester
                        setSelectedCourses([]) //clear selected courses for next time
                    }
                    }
                }}
                >
                <DialogTitle>Adding Course to {name}</DialogTitle>
                <DialogContent>
                    <Autocomplete sx={{ p: 1 }}
                        limitTags={2}
                        multiple
                        value={selectedCourses}
                        options={courses}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name!}
                        autoFocus
                        onChange={handleOnChange}
                        renderInput={(params) => (
                            <>
                                <TextField {...params} label="Select courses to add" placeholder="Courses" name="course" />
                                <Box sx={{ p: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Button variant="contained" type="submit">Add</Button>
                                </Box>
                            </>
                        )}
                    />
                </DialogContent>

            </Dialog>
        </>
    )
}