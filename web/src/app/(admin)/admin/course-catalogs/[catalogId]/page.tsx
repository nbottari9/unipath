"use client"

import { Box, Button, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CreateCourseDialog } from "@/components/Dialogs/CreateCourseDialog"

// TODO: retyping, remove anys, and make work
export default function CourseCatalogPage({ params }: { params: { catalogId: string } }) {
    const router = useRouter()

    // TODO: These need to be retyped at some point
    const [courseCatalog, setCourseCatalog] = useState<any>()
    const [loading, setLoading] = useState(true)
    const [org, setOrg] = useState<any>()
    const [courses, setCourses] = useState<any>()

    const [createCourseDialogOpen, setCreateCourseDialogOpen] = useState(false)

    const getCourseCatalog = useCallback(async (id: string) => {
        console.log("api call not implemented!")
        // if (errors) console.error(errors)
        // if (!data) {
        //     router.push("/admin")
        // } else {
        //     setCourseCatalog(data)

        // }
        // setLoading(false)
    }, [])


    // probably wont need either of these functions with new api

    // const getOrg = useCallback(async () => {
    //     const { data, errors } = await courseCatalog!.org()
    //     if (errors) console.error(errors)
    //     console.log(data)
    //     if (!data) {
    //         setOrg(undefined)
    //     } else {
    //         setOrg(data)
    //     }
    // }, [courseCatalog])

    // const getCourses = useCallback(async () => {
    //     const { data, errors } = await courseCatalog!.courses()
    //     if (errors) console.error(errors)
    //     console.log(data)
    //     if (!data) {
    //         setCourses(undefined)
    //     } else {
    //         setCourses(data)
    //     }
    // }, [courseCatalog])

    useEffect(() => {
        getCourseCatalog(params.catalogId)
    }, [params.catalogId, getCourseCatalog])

    // useEffect(() => {
    //     if (courseCatalog) {
    //         getOrg()
    //     }
    // }, [courseCatalog, getOrg])

    // useEffect(() => {
    //     if (courseCatalog) {
    //         getCourses()
    //     }
    // }, [courseCatalog, getCourses])

    //create course dialog

    const openCreateCourseDialog = () => {
        setCreateCourseDialogOpen(true)
    }

    const closeCreateCourseDialog = () => {
        setCreateCourseDialogOpen(false)
    }

    const createCourse = async (name: string, code: string, credits: number) => {
        console.log("api not implemented1")
        // const { errors } = await client.models.Course.create({ name: name, code: code, credits: credits, catalogId: courseCatalog!.id })
        // if (errors) console.error(errors)
        // getCourses()
    }


    return (
        <Box>
            {loading ? <Typography>Loading...</Typography> :
                <Box>
                    <Typography>Course Catalog: {courseCatalog!.id}</Typography>
                    {
                        org ? <Box>
                            <Typography>Organization: {org!.name}</Typography>
                            <Typography>Organization ID: {org!.id}</Typography>
                            <Typography>Courses in this catalog:</Typography>
                        </Box> : <Typography>Loading...</Typography>
                    }

                    {
                        courses ?
                            courses!.map((course: any) => {
                                return <Box key={course.id}>
                                    <Typography>{course.id} {course.code}-{course.name} Credits: {course.credits}</Typography>
                                </Box>
                            }) :
                            <Typography>No courses in this catalog</Typography>
                    }
                    <Box>
                        <Button variant="outlined" onClick={openCreateCourseDialog}>Create a new course in this catalog</Button>
                    </Box>
                </Box>

            }
            <CreateCourseDialog open={createCourseDialogOpen} onClose={closeCreateCourseDialog} createCourse={createCourse} />
        </Box>

    )
}