import { useCallback, useEffect, useState } from "react";
import { useAppDataContext } from "../contexts/app-data-context";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import type { PlayerModel } from "../models/player-model";
import { useAuth } from "../contexts/app-auth-context";
import type { ChallengeResultModel } from "../models/challenge-result-model";
import { ChallengeResultModal } from "../components/challenge-result-modal";

export const HomePage = () => {
    const { getPlayersAsync, getPlayerAsync, createChallenge } = useAppDataContext();
    const { user } = useAuth();
    const [players, setPlayers] = useState<PlayerModel[] | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [challengeResult, setChallengeResult] = useState<ChallengeResultModel | null>(null);

    useEffect(() => {
        (async () => {
            const players = await getPlayersAsync();

            if (players) {
                const sortedPlayers = players.sort((a, b) => b.score - a.score);
                setPlayers(sortedPlayers);
            }
        })();
    }, [getPlayersAsync]);

    const startChallengeHandler = useCallback(
        async (challengedId: number, challengedName: string) => {
            setIsModalOpen(true);
            console.log(challengedId);

            const challenge = await createChallenge(challengedId);

            if (challenge) {
                const winner = await getPlayerAsync(challenge.winnerId);

                if (!players) {
                    return;
                }

                const updatedPlayers = players
                    .map((player) => (player.id === winner?.id ? { ...player, score: player.score + 1 } : player))
                    .sort((a, b) => b.score - a.score);

                setPlayers(updatedPlayers);

                const won = winner?.userId === user?.userId;
                setChallengeResult({
                    won,
                    winnerName: winner?.userName ?? "",
                    challengedPlayer: challengedName,
                });
            }
        },
        [createChallenge, getPlayerAsync, players, user?.userId]
    );

    const closeModal = () => {
        setIsModalOpen(false);
        setChallengeResult(null);
    };

    return (
        <div className='flex justify-center items-center w-screen pt-32'>
            <TableContainer component={Paper} sx={{ width: "40vw", height: "50vh" }}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead sx={{ backgroundColor: "gray", color: "white" }}>
                        <TableRow>
                            <TableCell sx={{ color: "whitesmoke" }}>Player</TableCell>
                            <TableCell sx={{ color: "whitesmoke" }}>Score</TableCell>
                            <TableCell align='right' />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players &&
                            players.map((player) => (
                                <TableRow key={player.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component='th' scope='row'>
                                        {player.userName}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {player.score}
                                    </TableCell>
                                    <TableCell align='right' component='th' scope='row'>
                                        {player.userId !== user?.userId && (
                                            <Button
                                                onClick={() => {
                                                    startChallengeHandler(player.id, player.userName);
                                                }}
                                                variant='contained'
                                            >
                                                Challenge
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ChallengeResultModal isOpen={isModalOpen} onClose={closeModal} result={challengeResult} />
        </div>
    );
};
