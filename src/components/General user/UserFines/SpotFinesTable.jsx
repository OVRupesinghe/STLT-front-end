import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import useFineContext from "../../../hooks/useFineContext";
import { policeDivisions } from "../Constants";
import image from "../../../images/like.png";
import { Button } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckIcon from '@mui/icons-material/Check';
import ResponsiveDialog from "./PaymentModal";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useGeneralUserContext from "../../../hooks/useGeneralUserContext";
import {useEffect, useState} from "react";


function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

function getDivisionName(divisionId) {
  for (const [divisionName, id] of policeDivisions) {
    if (id === divisionId) {
      return divisionName;
    }
  }
  return "Unknown Division"; // Return a default value if the division ID is not found
}

export default function SpotFinesTable() {

  const { searchKey } = useGeneralUserContext();
  const { spotFines } = useFineContext();
  const [filteredRows, setFilteredRows] = useState([]);
  useEffect(() => {
    // Filter rows based on the search key
    const newFilteredRows = spotFines.filter((item) => {
      const description = item.description.toLowerCase();
      return description.includes(searchKey.toLowerCase());
    });

    setFilteredRows(newFilteredRows);
  }, [searchKey, spotFines ]);
  if (spotFines.length === 0 || spotFines.length === undefined) {
    return (
      <div className="flex flex-col items-center  h-screen">
        <img src={image} alt="empty" className="w-10 h-10" />
        <Typography variant="h6" className="my-5">
          Great News! You have no spot fines
        </Typography>
      </div>
    );
  } else {
    const spotFineData = filteredRows.map((fine) => ({
      referenceId: fine.reference_id,
      offence: fine.description,
      status: fine.status,
      division: getDivisionName(fine.police_divisionid),
      date: formatDate(fine.date),
      dueDate: formatDate(fine.due_date),
      amount: `Rs. ${fine.amount.toFixed(2)}`,
      time: fine.time,
      demerits: fine.demerit_points,
    }));

    const StatusRenderer = ({ status }) => {
      if (status == "1") {
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
      } else if (status == "2") {
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
    };

    const columns = [
      {
        field: "offence",
        headerName: "Offence",
        flex: 1,
        headerAlign: "center",

      },
      {
        field: "status",
        headerName: "Payment Status",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => <StatusRenderer status={params.row.status} />,
      },
      {
        field: "division",
        headerName: "Police Division",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "amount",
        headerName: "Total Payable",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "dueDate",
        headerName: "Due Date",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return (
            <Typography variant="body2">
              {params.value}
            </Typography>
          );
        }
      },
      {
        field: "demerits",
        headerName: "Demerit Points",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "date", headerName: "Date", flex: 1, align: "center", headerAlign: "center", renderCell: (params) => {
          return (
            <Typography variant="body2">
              {params.value}
            </Typography>
          );
        }
      },
      { field: "time", headerName: "Time", flex: 1, align: "center", headerAlign: "center" },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          if (params.row.status == "1") {
            return (
              <Button
                startIcon={<CheckCircleIcon />}
                variant="contained"
                color="primary"
                className="rounded-full bg-green-700"
                sx={{ boxShadow: 'none', textTransform: 'none' }}
              >
                Fine Paid
              </Button>)
          } else {
            return <ResponsiveDialog id={params.value} />;
          }

        },
      },
    ];

    const rows = spotFineData.map((item, index) => ({
      id: index + 1,
      offence: item.offence,
      status: item.status,
      division: item.division,
      amount: item.amount,
      dueDate: item.dueDate,
      date: item.date,
      time: item.time,
      demerits: item.demerits,
      actions: item.referenceId,
    }));
    return (
      <div
        style={{
          height: "70vh",
          width: "95%",
          margin: "auto",
        }}
        className="rounded-2xl"
      >
        <DataGrid
          className="rounded-2xl border-none"
          {...spotFineData}
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
          rowHeight={90}
          rows={rows}
          columns={columns}
          initialState={{
            ...spotFineData.initialState,
            sorting: {
              ...spotFineData.initialState?.sorting,
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
    );
  }
}
