"use client"

// React
import { useState, useEffect, useCallback } from 'react';

// Material UI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

// Local
// src/components/Accordions/SemesterAccordion.js
import PathwayDialog from '@/components/Dialogs/PathwayDialog.js';
// is this the right pathway dialog - Rohan M?

import PathwayCard from '@/components/Cards/PathwayCard';
import EditPathwayDialog from "@/components/Dialogs/EditPathwayDialog";
import NoPathways from "@/components/Layouts/NoPathways";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import Tooltip from "@mui/material/Tooltip";


// Everything is a disaster, just spammed any everywhere please please fix
// Component: PathwaysPage
//TODO: transition between: grid <--> list view
//TODO: use accordion component in pathway details page
export default function PathwaysPage() {
    const theme = useTheme();
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    // TODO: retype
    const [pathways, setPathways] = useState<any>([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingPathway, setEditingPathway] = useState({});


    const fetchPathways = useCallback(async () => {
        console.log("api not implemented!")
        // const { data, errors } = await client.models.Pathway.list();
        // if (errors) {
        //     console.error(errors)
        // }
        // if (data) {
        //     setPathways(data)
        //     setLoading(false)
        // }

    }, [])


    useEffect(() => {
        fetchPathways()
    }, [fetchPathways])

    const handleEdit = async (editedFields: any) => {
        console.log("edit, api not implemented!")
        fetchPathways()

    }
    const handleDelete = async (id: any) => {
        console.log("delete, api not implemented!")
        fetchPathways()
    }

    const handleCreate = async (fields: any) => {
        console.log("create, api not implemented!")
        fetchPathways()
    }

    const handleEditDialogOpen = () => {
        setEditDialogOpen(true);
    }

    const handleCreateDialogOpen = () => {
        setCreateDialogOpen(true);
    }

    const handleCreateDialogClose = () => {
        setCreateDialogOpen(false);
    }

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    }


    return (
        <Box
        >
            {/*Popup Dialog*/}
            <PathwayDialog
                open={createDialogOpen}
                handleClose={handleCreateDialogClose}
                handleCreate={handleCreate}
            />
            <EditPathwayDialog
                open={editDialogOpen}
                handleClose={handleEditDialogClose}
                handleEditPathway={handleEdit}
                pathway={editingPathway}
            />
            {/*Heading*/}
            <Box
                component="header"
                sx={{
                    mb: 2,
                }}
            >
                <Typography variant="h4">My Pathways</Typography>
            </Box>

            {/*Loading state (below heading)*/}
            {
                loading ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : (
                    <></>
                )
            }


            {
                pathways.length === 0 || !pathways ?

                    <NoPathways />
                    :
                    /*Pathway Cards*/
                    <Box
                        sx={{
                            overflow: "visible !important",
                            display: "grid",
                            alignItems: "center",
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 6,

                        }}
                    >
                        {
                            pathways.map((pathway: any) => {
                                return (
                                    <PathwayCard
                                        key={pathway.id}
                                        pathway={pathway}
                                        handleEditDialogOpen={handleEditDialogOpen}
                                        handlePathwayDelete={handleDelete}
                                        handleSetEditingPathway={setEditingPathway}
                                    />
                                )
                            })
                        }
                    </Box>
            }
            {/*Bottom right corner*/}
            <Tooltip title={"Create Pathway"} placement="left">
                <SpeedDial
                    ariaLabel={"Create Pathway"}
                    icon={<SpeedDialIcon openIcon={<MapIcon />} />}
                    onClick={handleCreateDialogOpen}
                    sx={{
                        position: 'fixed',
                        bottom: '4%',
                        right: '4%',
                        transform: 'translateZ(0px)',
                        mb: { "xs": 4, "md": 0 }
                    }}>
                </SpeedDial>
            </Tooltip>
        </Box>

    )
}

