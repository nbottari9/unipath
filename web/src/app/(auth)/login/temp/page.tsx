"use client"
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";




export default function TempLoginPage() {
// TODO: Fix anys rewrite everything

    const [orgs, setOrgs] = useState<any[]>()
    const [selectedOrgId, setSelectedOrgId] = useState<any>()

    const getOrgs = useCallback(async () => {
        const data = await fetch("http://localhost:3000/api/orgs")
        const orgs = await data.json()
        setOrgs(orgs.orgs)
        console.log(orgs.orgs)
    }, [setOrgs])

    useEffect(() => {
        getOrgs()
    }, [getOrgs])



    const handleOnSearch = (string: string, results:any) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result: any) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item:any) => {
        // the item selected
        console.log(item.id)
        setSelectedOrgId(item.id)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ pr: "25%" }}>
                <Typography>Sign in</Typography>
                <form>
                    <Box>
                        <Typography>Email</Typography>
                        <TextField autoComplete="email" type="email" />
                    </Box>
                    <Box>
                        <Typography>Password</Typography>
                        <TextField autoComplete="current-password" type="password" />
                    </Box>
                    <Box>
                        <Button>Sign in</Button>
                    </Box>
                </form>
            </Box>
            <Box>
                <Typography>Sign up</Typography>
                <form>
                    <Box>
                        <Typography>Email</Typography>
                        <TextField autoComplete="email" name="email" type="email" />
                    </Box>
                    <Box>
                        <Typography>Name</Typography>
                        <TextField autoComplete="name" name="name" type="text" />
                    </Box>
                    <Box>
                        <Typography>Institution</Typography>
                        {/* <AutoSuggestSearchBar HTMLElementNameAttr="institution"  */}
                        {/* <ReactSearchAutocomplete items={orgs!} onHover={handleOnHover} onFocus={handleOnFocus} onSelect={handleOnSelect} onSearch={handleOnSearch} /> */}
                    </Box>
                    <Box>
                        <Typography>Password</Typography>
                        <TextField autoComplete="current-password" name="password" type="password" />
                        <textarea name="institution" value={selectedOrgId!} hidden />
                    </Box>
                    <Box>
                        <Button type="submit">Sign up</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}