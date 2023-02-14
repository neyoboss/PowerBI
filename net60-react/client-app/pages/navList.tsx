import axios from 'axios'
import { useEffect, useState } from 'react';
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import SortIcon from '@mui/icons-material/Sort';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess"
// import { models } from 'powerbi-client';
import{TokenType} from 'powerbi-models';
import Collapse from '@mui/material/Collapse';
import AssessmentIcon from "@mui/icons-material/Assessment";
import dynamic from 'next/dynamic';

function NavList() {
	const [groups, setGroups] = useState([]);

	const [report, setReport] = useState();
	const [open, setOpen] = useState(true);

	useEffect(() => {
		const fetchGroups = async () => await axios.get(`https://localhost:7295/api/groups`).then(res => {
			console.log(res.data)
			setGroups(res.data)
		})
		fetchGroups().catch(erorr => console.log(erorr));
	}, [])


	const handleClick = (id) => {
		setOpen(((prevState: any) => ({ ...prevState, [id]: !prevState[id] })))
	}

	const returnReportProps = (report) => {
		setReport(report)
	}

	return (
		<div style={{ display: 'flex', backgroundColor: '#275e9a' }}>
			<div style={{ marginTop: '3%' }}>
				{groups.map((group) => {
					return (
						<List key={group['id']} sx={{ width: '100%', maxWidth: 360, bgcolor: '#275e9a' }} component="nav">
							<ListItemButton style={{ color: "#f1f1f1" }} onClick={() => handleClick(group['id'])}>
								<ListItemIcon >
									<SortIcon style={{ color: "#f1f1f1" }} />
								</ListItemIcon>
								<ListItemText primary={group['name']} />
								{open[group['id']] ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							<Collapse in={open[group['id']]} timeout="auto" unmountOnExit>
								{(group['reportList'] as any).map((rp) => {
									return (
										<List style={{ color: '#f1f1f1' }} key={rp['reportId']} component="div" disablePadding >
											<ListItemButton onClick={() => returnReportProps(rp)} sx={{ pl: 4 }}>
												<ListItemIcon>
													<AssessmentIcon style={{ color: "#f1f1f1" }} />
												</ListItemIcon>
												<ListItemText primary={rp['reportName']} />
											</ListItemButton>
										</List>
									)
								})}
							</Collapse>
						</List >
					)
				})}
			</div>
			<div className='square'><img src="/kmwe_logo.png" alt={'KMWE Logo'} className="image" /></div>
			{report ? <DisplayReports props={report} /> : <div>Select report</div>}
		</div >
	)
}

export function DisplayReports({ props }: { props: any }) {
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


export default NavList