"use client";

// React imports
import { useState, useEffect, useCallback } from 'react';

// Material UI imports
import { useTheme } from '@mui/material/styles';

// Assuming DragDropContext will be used later
import TaskHeaderCard from "@/components/Cards/TaskHeaderCard";
import TaskCard from "@/components/Cards/TaskCard";

import { Box } from "@mui/material";

// TODO: remove anys, and make fucking work
export default function Lists() {
    // State management    
    const [tasks, setTasks] = useState<any>([]);

    // Use theme from Material UI
    const theme = useTheme();

    const fetchTasks = useCallback(async () => {
        console.log("api not implemented")
        // const { data, errors } = await client.models.Task.list();
        // errors ? console.error(errors) : setTasks(data);

    }, [/*client*/])


    useEffect(() => {
        fetchTasks()
    }, [fetchTasks]);

    const handleTaskDelete = async (id: any) => {
        // const { data, errors } = await client.models.Task.delete({ id: id });
        // errors ? console.error(errors) :
        //     fetchTasks();
        // console.log('deleted');
        console.log("delete, api not implemented")
    }

    // rename this to standarized create
    const handleTaskAddClick = async () => {
        // const { errors, data } = await client.models.Task.create({
        //     title: "",
        //     details: "",
        //     date: null,
        //     important: false,
        //     done: false
        // })
        // errors ? console.error(errors) :
        //     fetchTasks();
        // console.log('added a task');
        console.log("create, api not implemented")
    }

    return (
        <>
            <TaskHeaderCard handleAddTask={handleTaskAddClick} />
            <Box>
                {
                    tasks.map((t: any, idx: number) => {
                        return (
                            (idx === tasks.length - 1) ?
                                <TaskCard key={t.id} task={t} borderBottomRadius={'20px'} onDeleteClick={() => handleTaskDelete(t.id)} />
                                : <TaskCard key={t.id} task={t} borderBottomRadius={'0px'} onDeleteClick={() => handleTaskDelete(t.id)} />
                        )
                    })
                }
            </Box>
        </>
    );
}