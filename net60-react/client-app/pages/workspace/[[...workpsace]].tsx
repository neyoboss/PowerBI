import axios from 'axios'
import { useEffect, useState } from 'react';
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import { TokenType } from 'powerbi-models';
import AssessmentIcon from "@mui/icons-material/Assessment";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from "next/link";
import Button from '@mui/material/Button';

export default function Workspace() {

    const router = useRouter();
    const [report, setReport] = useState();
    const [reports, setReports] = useState([]);
    const {groupId} = router.query;

    useEffect(() => {
        if (router.isReady) {
            axios.get(`https://powerbi.corp.kmwe.com:6443/api/workspace/${groupId}`)
                .then(res => {
                    setReports(res.data)
                })
                .catch(erorr => console.log(erorr));
        }
    }, [router.isReady])

    const returnReportProps = (report) => {
        setReport(report)
    }

    return (
        <>
            <div className='square' style={{ position: 'absolute' }}>
                <Button variant="contained" sx={{ backgroundColor: "#1fa7d4", position: 'absolute' }}>
                    <Link href={{
                        pathname: `../`,
                    }}>
                        <b className="textColor">Back</b>
                    </Link>
                </Button>
                <img src="/kmwe_logo.png" alt={'KMWE Logo'} className="image" />
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ marginTop: '3.4%' }}>
                    {reports.map((rp) => {
                        return (
                            <List style={{ color: '#f1f1f1' }} key={rp['reportId']} component="div" disablePadding >
                                <ListItemButton onClick={() => returnReportProps(rp)} sx={{ pl: 4, backgroundColor: '#275e9a' }}>
                                    <ListItemIcon>
                                        <AssessmentIcon style={{ color: "#f1f1f1" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={rp['reportName']} />
                                </ListItemButton>
                            </List>
                        )
                    })}
                </div>
                {report ? <DisplayReport props={report} /> : <div>Select report</div>}
            </div >
        </>
    )
}

export function DisplayReport({ props }: { props: any }) {
    const Pbi = dynamic(() => import('powerbi-client-react').then((module) => module.PowerBIEmbed), { ssr: false });

    return (
        <>
            <Pbi cssClassName='report-style-class'
                embedConfig={{
                    type: 'report', // Supported types: report, dashboard, tile, visual, and qna.
                    id: `${props['reportId']}`,
                    embedUrl: `${props['embedUrl']}`,
                    tokenType: TokenType.Embed,
                    accessToken: `${props['embedToken']}`,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: true
                            }
                        },
                        bars: {
                            statusBar: { visible: false }
                        }
                    }
                }}
            />
        </>
    )
}