import axios from 'axios'
import { useEffect, useState } from 'react';
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import SortIcon from '@mui/icons-material/Sort';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess"
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import Collapse from '@mui/material/Collapse';
import AssessmentIcon from "@mui/icons-material/Assessment";

function NavList() {
	const [data, setData] = useState([]);

	const [reports, setReports] = useState([]);
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
		setOpen((prevState => ({ ...prevState, [id]: !prevState[id] })))
	}

	const returnReportProps = (report) => {
		setReport(report)
	}

	return (
		<div style={{ display: 'flex' }}>
			<div>
				{groups.map((group) => {
					return (
						<List key={group['id']} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
							<ListItemButton onClick={() =>handleClick(group['id'])}>
								<ListItemIcon>
									<SortIcon />
								</ListItemIcon>
								<ListItemText primary={group['name']} />
								{open[group['id']] ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							<Collapse in={open[group['id']]} timeout="auto" unmountOnExit>
								{group['reportList'].map((rp) => {
									return (
										<List key={rp['reportId']} component="div" disablePadding >
											<ListItemButton onClick={() => returnReportProps(rp)} sx={{ pl: 4 }}>
												<ListItemIcon>
													<AssessmentIcon />
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
			{report ? <DisplayReports props={report} /> : <div>Select report</div>}
		</div >
	)
}

export function DisplayReports({ props }: { props: any }) {
	return (
		<PowerBIEmbed cssClassName='report-style-class'
			embedConfig={{
				type: 'report', // Supported types: report, dashboard, tile, visual, and qna.
				id: `${props['reportId']}`,
				embedUrl: `${props['embedUrl']}`,
				tokenType: models.TokenType.Embed,
				accessToken: `${props['embedToken']}`,
				settings: {
					panes: {
						filters: {
							expanded: false,
							visible: false
						}
					},
				}
			}} />
	)
}


export default NavList