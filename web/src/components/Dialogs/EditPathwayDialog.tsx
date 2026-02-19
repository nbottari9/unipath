
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// TODO: rework this entire thing with server actions
// oh god using _: any im desperate af
export default function EditPathwayDialog({open, handleClose, handleEditPathway, pathway}: {open: boolean, handleClose: () => void, handleEditPathway: (_: any) => void, pathway: any}) {
    // const client = generateClient({authMode: 'userPool'});
    //
    // async function handleEdit(formData) {
    //     "use server"
    //     const rawFormData = {
    //         id: formData.id,
    //         name: formData.name,
    //         degree: formData.degree,
    //         institution: formData.institution,
    //         yog: formData.yog,
    //         degreeLevel: formData.degreeLevel
    //     }
    //
    //     await client.models.Pathway.update(rawFormData);
    // }


    return (
        <>
        <Dialog
            open={open}
            onClose={handleClose}
            // action={handleEdit}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (e: any) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const newName = formJson.pathwayTitle;
                        const newDegree = formJson.degreeMajor;
                        const newInstitution = formJson.school;
                        const newYOG = formJson.yearOfGrad;
                        const newDegreeLevel = formJson.degreeType;

                        handleEditPathway({id: pathway.id, name: newName, degree: newDegree, institution: newInstitution, yog: newYOG, degreeLevel: newDegreeLevel});
                        handleClose();
                }}

            }}
        >
            <DialogTitle>Edit Pathway: {pathway.name}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="pathwayTitle"
                    name="pathwayTitle"
                    label="Pathway Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={pathway.name}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="degreeMajor"
                    name="degreeMajor"
                    label="Degree Major"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={pathway.degree}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="school"
                    name="school"
                    label="School"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={pathway.institution}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="yearOfGrad"
                    name="yearOfGrad"
                    label="Year of Grad"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={pathway.yog}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="degreeType"
                    name="degreeType"
                    label="Degree Type"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={pathway.degreeLevel}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Edit</Button>
            </DialogActions>
        </Dialog>
</>
    )
}