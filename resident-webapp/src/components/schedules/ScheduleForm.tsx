import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export default function ScheduleForm() {
    const [values, setValues] = useState({
        houseNo: "",
        visitorName: "",
        visitorNIC: "",
        visitorPhoneNo: "",
        vehicleNumber: "",
        visitDate: null,
        isApproved: false,
        comment: ""
    });

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleDateChange = (newValue: any) => {
        setValues({
            ...values,
            visitDate: newValue
        });
    };

    const handleCheckboxChange = (event: { target: { name: any; checked: any; }; }) => {
        setValues({
            ...values,
            [event.target.name]: event.target.checked
        });
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(values);
    };

    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Stack spacing={2}>
                <TextField name="houseNo" label="House Number" value={values.houseNo} onChange={handleChange} />
                <TextField name="visitorName" label="Visitor Name" value={values.visitorName} onChange={handleChange} />
                <TextField name="visitorNIC" label="Visitor NIC" value={values.visitorNIC} onChange={handleChange} />
                <TextField name="visitorPhoneNo" label="Visitor Phone Number" value={values.visitorPhoneNo} onChange={handleChange} />
                <TextField name="vehicleNumber" label="Vehicle Number" value={values.vehicleNumber} onChange={handleChange} />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Visit Date"
                        inputFormat="MM/dd/yyyy"
                        value={values.visitDate}
                        onChange={handleDateChange}
                        renderInput={(params: any) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={values.isApproved}
                            onChange={handleCheckboxChange}
                            name="isApproved"
                            color="primary"
                        />
                    }
                    label="Is Approved"
                />
                <TextField name="comment" label="Comment" value={values.comment} onChange={handleChange} />
            </Stack>
            <br />
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </form>
    );
}
