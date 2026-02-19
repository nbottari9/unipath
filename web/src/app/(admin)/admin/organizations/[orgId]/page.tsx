"use client"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useCallback } from "react"

// TODO: remove all the fucking anys in this and fix apis
export default function OrganizationPage({ params }: { params: { orgId: string } }) {
    const router = useRouter()

    const [org, setOrg] = useState<any>()
    const [courseCatalog, setCourseCatalog] = useState<any>()
    const [loading, setLoading] = useState(true)


    const getOrg = useCallback(async (id: string) => {
        console.log("api not implemented")
        // const { data, errors } = await client.models.Organization.get({ id: id })
        // if (errors) console.error(errors)

        // if (!data) {
        //     router.push("/admin")
        // } else {
        //     setOrg(data)
        // }
        // setLoading(false)
    }, [router])

    const getCourseCatalog = useCallback(async () => {
        const { data, errors } = await org!.courseCatalog()
        if (errors) console.error(errors)
        if (!data) {
            setCourseCatalog(undefined)
        } else {
            setCourseCatalog(data)
        }

    }, [org])

    const createCourseCatalog = async () => {
        // const { errors } = await client.models.CourseCatalog.create({ orgId: params.orgId })
        // if (errors) console.error(errors)
        // getCourseCatalog()
        console.log("api not implemented")
    }

    useEffect(() => {
        getOrg(params.orgId)
    }, [getOrg, params.orgId])

    useEffect(() => {
        if (org) {
            getCourseCatalog()
        }
    }, [org, getCourseCatalog])




    return (

        <Box>
            {loading ? <Typography>Loading...</Typography> :
                <Box>
                    <Typography variant="h1">{org!.name}</Typography>
                    <Typography variant="h2">{org!.location!.streetAddress}</Typography>
                    <Typography variant="h2">{org!.location!.city}, {org!.location!.state} {org!.location!.zipCode}</Typography>
                </Box>
            }
            <br />
            <br />

            <Box>
                <Typography variant="h3">Course Catalogs in this organization</Typography>
                <Box>
                    {
                        courseCatalog ?
                            <Link href={`/admin/course-catalogs/${courseCatalog.id}`}>
                                <Typography>{courseCatalog.id}</Typography>
                            </Link> :
                            <Box>
                                <Typography>No course catalog found for this organization</Typography>
                                <Button onClick={createCourseCatalog}>Create course catalog</Button>
                            </Box>
                    }

                </Box>
                <Box>
                    {
                        org?.users?.map((user: any) => {
                            return (
                                <Typography key={user}>{user}</Typography>
                            )
                        })
                    }
                </Box>
            </Box>

        </Box>
    )
}

