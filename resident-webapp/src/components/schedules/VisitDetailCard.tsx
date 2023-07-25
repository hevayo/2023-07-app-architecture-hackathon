import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { API } from '../../api';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import { ActualVisit } from "../../types/domain";


interface VisitDetailCardProps {
    visitId: string;
}

const VisitDetailCard: React.FC<VisitDetailCardProps> = ({ visitId }) => {
    const navigate = useNavigate();
    const [actualVisits, setScheduleVisit] = useState<ActualVisit | undefined>(undefined);
    const { getAccessToken } = useAuthContext();


    async function getVisit() {
        const accessToken = await getAccessToken();
        console.log(accessToken);
        let url: string = '/actualVisits/' + visitId;
        API.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                console.log(response);
                setScheduleVisit(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (actualVisits === undefined) {
            getVisit();
        }
    }, [actualVisits]);

    const approve = async () => {
        const accessToken = await getAccessToken();
        API.put('/actualVisits', { ...actualVisits, isApproved: true }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response: AxiosResponse) => {
            navigate(`/visit/actual/` + response.data.visitId);
        }).catch((error: any) => {
            console.log(error);
        });
    };


    const approveVisit = () => {
        approve();
        // Add code here to handle the approval of the visit
        console.log(`Visit ${visitId} has been approved.`);
    };

    return (
        <Box>
            <Typography variant="h5" component="div">
                Visit Details
            </Typography>
            {actualVisits &&
                <Card sx={{ maxWidth: 400 }}>
                    <CardContent>
                        <Typography>
                            In Time: {actualVisits.inTime} <br />
                            Out Time: {actualVisits.outTime} <br />
                            House No: {actualVisits.houseNo} <br />
                            Visitor Name: {actualVisits.visitorName} <br />
                            Visitor NIC: {actualVisits.visitorNIC} <br />
                            Visitor Phone No: {actualVisits.visitorPhoneNo} <br />
                            Vehicle Number: {actualVisits.vehicleNumber} <br />
                            Visit Date: {actualVisits.visitDate} <br />
                            Is Approved: {actualVisits.isApproved ? "Yes" : "No"} <br />
                            Comment: {actualVisits.comment} <br />
                            Visit Id: {actualVisits.visitId}
                        </Typography>
                        {actualVisits.isApproved === false &&
                            <Button variant="contained" color="primary" onClick={approveVisit}>
                                Approve
                            </Button>
                        }
                    </CardContent>
                </Card>
            }
            {actualVisits === undefined && <Typography variant="h6" component="div">Not Found</Typography>}
        </Box>
    );
};

export default VisitDetailCard;
