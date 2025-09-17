import { useEffect, useState } from "react";
import { useAppDataContext } from "../contexts/app-data-context";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import type { PlayerModel } from "../models/player-model";

export const HomePage = () => {
    const { getUsersAsync } = useAppDataContext();
    const [players, setPlayers] = useState<PlayerModel[] | undefined>();

    useEffect(() => {
        (async () => {
            const players = await getUsersAsync();

            if (players) {
                setPlayers(players);
            }
        })();
    }, [getUsersAsync]);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell align='right'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players &&
                            players.map((u) => (
                                <TableRow key={u.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        {u.userName}
                                    </TableCell>
                                    <TableCell align='right' component='th' scope='row'>
                                        <Button>Challenge</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
