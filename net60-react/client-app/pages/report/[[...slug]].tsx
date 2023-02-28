import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TokenType } from 'powerbi-models';
import Link from "next/link";
import Button from '@mui/material/Button';

export default function Report() {

	const router = useRouter();

	const [embedUrl, setEmbedUrl] = useState();
	const [embedToken, setEmbedToken] = useState();
	
	useEffect(() => {
		if (router.isReady) {
			axios.get(`https://localhost:7295/api/workspace/${(router.query.workspaceId as string)}/report/${router.query.reportId as string}`)
				.then(res => {
					setEmbedToken(res.data['embedToken'])
					setEmbedUrl(res.data['embedUrl'])
				})
				.catch(erorr => console.log(erorr));
		}
	}, [router.isReady])

	const Pbi = dynamic(() => import('powerbi-client-react').then((module) => module.PowerBIEmbed), { ssr: false });

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
			<Pbi cssClassName='report-style-class'
				embedConfig={{
					type: 'report', // Supported types: report, dashboard, tile, visual, and qna.
					id: `${router.query.reportId as string}`,
					embedUrl: `${embedUrl}`,
					tokenType: TokenType.Embed,
					accessToken: `${embedToken}`,
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