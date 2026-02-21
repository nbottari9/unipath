"use client"
import { CalendarViewDayOutlined } from '@mui/icons-material'
import { Box, SpeedDial, SpeedDialIcon, Tooltip, useTheme } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Grid from '@mui/material/Grid'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { Semester } from '../../../../components/Semester/Semester'
import { CreateSemesterDialog } from '../../../../components/Dialogs/CreateSemesterDialog'
import { CoursesContext } from '@/contexts/CoursesContext'


// just rewrite this atp
const Pathway = ({ params }: { params: { id: string } }) => {

    const theme = useTheme()
    //state
    const selectionSet = useMemo(() => ["id", "name", "classes.*"] as const, []);
    // type SemesterWithClasses = SelectionSet<Schema["Semester"]["type"], typeof selectionSet>
    const courseCatalogSelectionSet = useMemo(() => ["id", "courses.*"] as const, [])
    const [semesters, setSemesters] = useState<any[]>()
    const [loading, setLoading] = useState(true)
    const [createSemesterDialogOpen, setCreateSemesterDialogOpen] = useState(false)
    const [courses, setCourses] = useState<any[]>()
    const [catalogId, setCatalogId] = useState<string>()

    // data fetching




    const fetchSemesters = useCallback(async () => {
        console.log("Fetch semesters")
    }, [selectionSet])

    const getCatalogId = useCallback(async () => {
        console.log("get catalog id")
    }, [])

    const getCourses = useCallback(async () => {
        console.log("get courses")
    }, [catalogId])

    useEffect(() => {
        fetchSemesters()
    }, [fetchSemesters])

    useEffect(() => {
        if (catalogId) {
            getCourses()
        }
    }, [catalogId, getCourses])

    useEffect(() => {
        // setLoading(true)
        getCatalogId()
        setLoading(false)
    }, [getCatalogId])

    //interact handlers
    const openCreateSemesterDialog = () => {
        setCreateSemesterDialogOpen(true)
    }

    const closeCreateSemesterDialog = () => {
        setCreateSemesterDialogOpen(false)
    }

    //crud handlers
    const createSemester = async (name: string) => {
        console.log("create semester with name ", name)
    }

    const deleteSemester = async (id: string) => {
        console.log("delete semsester ", id)
    }

    const addClassesToSemester = async (semesterId: string, courses: any[]) => {

        for (let i = 0; i < courses.length; i++) {
            // const { data, errors } = await client.models.Class.create({
            //     semesterId: semesterId,
            //     name: courses[i].name,
            //     code: courses[i].code,
            //     credits: courses[i].credits,
            // })
            console.log("creating course: ", courses[i].name)
            // if (errors) console.error(errors)
        }

        fetchSemesters()
    }


    // this function is called when a drag and drop event occurs and handles the logic of reordering semesters and courses
    const handleDragAndDrop = (results: DropResult) => {
        const { source, destination, type } = results


        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        if (type === "semester") {
            const reorderedSemesters = [...semesters!]
            const semesterSourceIndex = source.index
            const semesterDestinationIndex = destination.index
            const [removedSemester] = reorderedSemesters.splice(semesterSourceIndex, 1)
            reorderedSemesters.splice(semesterDestinationIndex, 0, removedSemester)

            setSemesters(reorderedSemesters)
        }


        const courseSourceIndex = source.index
        const courseDestinationIndex = destination.index

        const semesterSourceIndex = semesters!.findIndex((s) => s.id === source.droppableId)
        const semesterDestinationIndex = semesters!.findIndex((s) => s.id === destination.droppableId)

        const newSourceCourses = [...semesters![semesterSourceIndex].classes]
        const newDestinationCourses = source.droppableId !== destination.droppableId ? [...semesters![semesterDestinationIndex].classes] : newSourceCourses


        const [deletedItem] = newSourceCourses.splice(courseSourceIndex, 1)

        newDestinationCourses.splice(courseDestinationIndex, 0, deletedItem)


        const newSemesters = [...semesters!]

        newSemesters[semesterSourceIndex] = {
            ...semesters![semesterSourceIndex],
            classes: newSourceCourses
        }
        newSemesters[semesterDestinationIndex] = {
            ...semesters![semesterDestinationIndex],
            classes: newDestinationCourses
        }

        console.log("here", newSemesters)
        setSemesters(newSemesters)
    }

    return (
        <Box>
            {loading ? <Box>Loading...</Box> :
                <CoursesContext.Provider value={courses!}>
                    <Box>


                        <Grid container spacing={4} sx={{
                            "--Grid-columnSpacing": "2em",
                            "--Grid-rowSpacing": "0.5em",
                            flexWrap: "nowrap"
                        }}>

                            <DragDropContext onDragEnd={handleDragAndDrop}>

                                {/* code for draggable semesters
                    <Droppable droppableId="root" type="semester" direction="horizontal">
                        {
                            (provided) => (
                                <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ display: "flex", minWidth: "100%" }}>
                                    {
                                        semesters.map((s, i) => (
                                            <DraggableSemester key={s.id} title={s.title} courses={s.courses} index={i} />
                                        ))
                                    }
                                    {provided.placeholder}
                                </Box>
                            )
                        }
                    </Droppable> */}
                                {
                                    semesters ? semesters.map((s, i) => (

                                        <Semester key={s.id} classes={s.classes} name={s.name} id={s.id} handleSemesterDelete={deleteSemester} addClassesToSemester={addClassesToSemester} />
                                    )) : <Box>No Semesters</Box>
                                }

                            </DragDropContext>
                        </Grid>


                        <Tooltip title={"Add Semester"} placement="left">
                            <SpeedDial
                                ariaLabel={"Add Semester"}
                                icon={<SpeedDialIcon openIcon={<CalendarViewDayOutlined />} />}
                                onClick={openCreateSemesterDialog}
                                sx={{
                                    position: 'fixed',
                                    bottom: '4%',
                                    right: '4%',
                                    transform: 'translateZ(0px)',
                                    mb: { "xs": 4, "md": 0 }
                                }}>
                            </SpeedDial>
                        </Tooltip>
                        <CreateSemesterDialog open={createSemesterDialogOpen} onClose={closeCreateSemesterDialog} create={createSemester} />
                    </Box>
                </CoursesContext.Provider>
            }
        </Box>
    )
}

export default Pathway