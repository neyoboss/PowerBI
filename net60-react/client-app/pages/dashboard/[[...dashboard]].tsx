import { useState, useEffect } from "react"
import axios from "axios";
import dynamic from "next/dynamic";
import { TokenType } from 'powerbi-models';
import Link from "next/link";
import Button from '@mui/material/Button';
import { useRouter } from "next/router";

export default function Dashboard() {
    const router = useRouter();

    const [embedUrl, setEmbedUrl] = useState();
    const [embedToken, setEmbedToken] = useState();

    const getDashboard = () => {
        axios.get(`https://powerbi.corp.kmwe.com:6443/api/workspace/${(router.query.groupId as string)}/dashboard/${(router.query.dashId as string)}`)
            .then(res => {
                setEmbedToken(res.data['embedToken'])
                setEmbedUrl(res.data['embedUrl'])
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        if (router.isReady) {
            getDashboard();
            const refresh = setInterval(() => getDashboard(), 60000*5);
            return () => clearInterval(refresh);
        }
    }, [router.isReady])

    const Pbi = dynamic(() => import('powerbi-client-react').then((module) => module.PowerBIEmbed), { ssr: false });

    return (
        <>
            <div className='square' >
                <Button variant="contained" sx={{ backgroundColor: "#1fa7d4", position: 'absolute' }}>
                    <Link href={{
                        pathname: `../`,
                    }}>
                        <b className="textColor">Back</b>
                    </Link>
                </Button>
                <img src="/kmwe_logo.png" alt={'KMWE Logo'} className="image" />
            </div>
            <Pbi cssClassName='dashboard-style-class'
                embedConfig={{
                    type: 'dashboard', // Supported types: report, dashboard, tile, visual, and qna.
                    id: `${router.query.dashId as string}`,
                    embedUrl: `${embedUrl}`,
                    tokenType: TokenType.Embed,
                    accessToken: `${embedToken}`,
                    // pageView:'fitToWidth'
                }
                }
            />
        </>
    )
}