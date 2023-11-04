import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import Payment from '@mui/icons-material/Payment';
import CheckCircle from "@mui/icons-material/CheckCircle";
import ViewFineModal from "./VideoCardModal";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useFineContext from "../../../hooks/useFineContext";
import ResponsiveDialog from "./PaymentModal";
import image from "../../../images/like.png";

function formatDate(inputDateString) {
    const inputDate = new Date(inputDateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = inputDate.toLocaleDateString("en-US", options);
    return formattedDate;
}

function hasDatePassed(dueDate) {
    // Parse the dueDate string into a Date object
    const dueDateObj = new Date(dueDate);

    // Get the current date
    const currentDate = new Date();

    // Compare the two dates
    return currentDate > dueDateObj;
}

export default function VideoViolationsTable() {

    const axios = useAxiosPrivate();
    const { setVideoFines } = useFineContext();
    const [details, setDetails] = useState([]);
    const getVideoViolations = async () => {
        try {
            const response = await axios.get("upload/video-fines");
            console.log(response.data);
            setVideoFines(response.data);
            setDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getVideoViolations();
    }, []);
    const ButtonRenderer = (props) => {
        if (props.status === 1) {
            return (
                <Button
                    startIcon={<CheckCircle />}
                    variant="contained"
                    color="error"
                    className="bg-green-700 rounded-full"
                    sx={{ boxShadow: 'none', textTransform: 'none' }}
                >
                    Fine Paid
                </Button>
            );
        } else {
            return (
                <ResponsiveDialog id={props.referenceId} />
            )
        }
    }

    const StatusRenderer = (props) => {
        const has_passed = hasDatePassed(props.dueDate);


        if (props.status === 1) {
            return (
                <Button
                    startIcon={<CheckIcon />}
                    variant="contained"
                    color="error"
                    className="bg-green-700 rounded-full"
                    sx={{ boxShadow: 'none', textTransform: 'none' }}
                >
                    Settled
                </Button>
            );
        } else {
            if (has_passed) {
                return (
                    <Button
                        startIcon={<ErrorIcon />}
                        variant="contained"
                        color="error"
                        className="bg-red-700 rounded-full"
                        sx={{ boxShadow: 'none', textTransform: 'none' }}
                    >
                        Overdue
                    </Button>
                );
            } else {
                return (
                    <Button
                        startIcon={<PendingActionsIcon />}
                        variant="contained"
                        color="primary"
                        className="rounded-full"
                        sx={{ boxShadow: 'none', textTransform: 'none' }}
                    >
                        Pending
                    </Button>
                );
            }
        }


    }

    const AppealRenderer = (props) => {

        const dateString = props.dateString; //21 Jun 2023 format string
        const time = props.time; //12:23 format string
        const inputDate = new Date(dateString + ' ' + time);

        // Calculate the date and time 48 hours from the given date and time
        const resultDate = new Date(inputDate.getTime() + 48 * 60 * 60 * 1000); // 48 hours in milliseconds

        // Calculate the hours remaining until the appeal
        const currentDateTime = new Date();
        const hoursRemaining = Math.round((resultDate - currentDateTime) / (60 * 60 * 1000));

        // Format the result date and time
        const resultDateString = resultDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        const resultTimeString = resultDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const status = props.status;

        if (status === 0) {
            if (hoursRemaining > 0) {
                return (
                    <Stack direction="column" >
                        <Typography variant="body2" className="text-gray-600">
                            {resultDateString}, {resultTimeString}
                        </Typography>
                        <Button
                            startIcon={<AccessTimeIcon />}
                            className="text-gray-600 rounded-full"
                            sx={{ boxShadow: 'none', textTransform: 'none' }}
                        >
                            {hoursRemaining}h
                        </Button>
                    </Stack>
                );
            } else {
                return (
                    <Stack direction="column" >
                        <Typography variant="body2" color="text.secondary" className="text-gray-600">
                            {resultDateString}, {resultTimeString}
                        </Typography>
                        <Button
                            startIcon={<AccessTimeIcon />}
                            className=" rounded-full"
                            color="error"
                            sx={{ boxShadow: 'none', textTransform: 'none' }}
                        >
                            Date passed
                        </Button>
                    </Stack>
                );
            }
        } else {
            return (
                <Stack direction="column" >
                    <Button
                        startIcon={<AccessTimeIcon />}
                        className="text-gray-600 rounded-full"
                        sx={{ boxShadow: 'none', textTransform: 'none' }}
                    >
                        Paid
                    </Button>
                </Stack>
            );
        }
    }

    const columns = [
        {
            field: "vidName",
            headerName: "Video Evidence",
            height: 'auto',
            padding: '20px',
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <ViewFineModal thumbnail={params.value[0]} items={params.value[1]} isPassed={params.value[2]} />
            ),
            flex: 1,
        },
        {
            field: "offence",
            headerName: "Offence",
            flex: 1,
            headerAlign: "center",
            align: "center",
        }
        ,
        {
            field: "status",
            headerName: "Payment Status",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <StatusRenderer
                    status={params.value[0]}
                    dueDate={params.value[1]}
                />
            ),
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        { field: "dueDate", headerName: "Due Date", flex: 1, headerAlign: "center", align: "center" },
        {
            field: "appealBefore",
            headerName: "Appeal Before",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <AppealRenderer
                    dateString={params.value[0]} time={params.value[1]} status={params.value[2]}
                />
            )
        },

        {
            field: "actions", headerName: "Actions", flex: 1, headerAlign: "center", align: "center",
            renderCell: (params) => (
                <ButtonRenderer status={params.value[0]} referenceId={params.value[1]} />
            )
        }
    ];

    if (details.length === 0 || details.length === undefined) {
        return (
            <div className="flex flex-col items-center  h-screen">
                <img src={image} alt="empty" className="w-10 h-10" />
                <Typography variant="h6" className="my-5">
                    Great News! You have no video fines
                </Typography>
            </div>
        );
    } else {
        const rows = details.map((item, index) => ({
            id: index + 1,
            vidName: [item.thumbnail, item, hasDatePassed(item.due_date)],
            offence: item.description,
            status: [item.status, item.due_date],
            appealBefore: [formatDate(item.due_date), item.time, item.status],
            location: item.city + ', ' + item.district,
            division: item.division,
            dueDate: formatDate(item.due_date),
            actions: [item.status, item.reference_id],
        }));
        return (

            <div
                style={{
                    height: "70vh",
                    width: "95%",
                    margin: "auto",
                }}

                className='rounded-2xl'
            >
                <DataGrid className='rounded-2xl border-none'
                    {...details}
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {},
                        "& .name-column--cell": {
                            color: "#475569",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderTop: "solid 1px #e0e0e0",
                            color: "#020617",
                            fontWeight: "extra-bold",
                            fontSize: "16px",
                        },
                        "& .MuiDataGrid-virtualScroller": {},
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            color: "white",
                        },
                    }}
                    rowHeight={120}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        ...details.initialState,
                        sorting: {
                            ...details.initialState?.sorting,
                            sortModel: [
                                {
                                    field: "rating",
                                    sort: "desc",
                                },
                            ],
                        },
                    }}
                />
            </div>
        )
    }
}