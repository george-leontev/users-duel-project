import { Modal, Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { ChallengeResultModel } from "../models/challenge-result-model";

interface ChallengeResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    result: ChallengeResultModel | null;
    animationDuration?: number;
}

export const ChallengeResultModal = ({
    isOpen,
    onClose,
    result,
    animationDuration = 3000,
}: ChallengeResultModalProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setShowResult(false);

            const animationTimer = setTimeout(() => {
                setIsAnimating(false);
                setShowResult(true);
            }, animationDuration);

            return () => clearTimeout(animationTimer);
        }
    }, [isOpen, animationDuration]);

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    };

    const battleAnimVariants = {
        animate: {
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            transition: {
                duration: 0.5,
                repeat: Infinity,
                repeatType: "mirror" as const,
            },
        },
    };

    const resultVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const renderContent = () => {
        if (isAnimating) {
            return (
                <motion.div key='animation' variants={modalVariants} initial='hidden' animate='visible' exit='exit'>
                    <motion.div variants={battleAnimVariants} animate='animate'>
                        <Typography variant='h4'>⚔️</Typography>
                    </motion.div>
                    <Typography variant='h6'>Epic Battle!</Typography>
                    <Typography variant='body2' sx={{ mt: 2 }}>
                        {result ? `Fighting against ${result.challengedPlayer}...` : "Preparing for battle..."}
                    </Typography>
                </motion.div>
            );
        }

        if (!showResult || !result) {
            return null;
        }

        return (
            <motion.div key='result' variants={resultVariants} initial='hidden' animate='visible'>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    <Typography variant='h4' color={result.won ? "green" : "red"}>
                        {result.won ? "🎉 Victory!" : "Defeat"}
                    </Typography>
                </motion.div>

                <Typography variant='h6'>{result.won ? "You won!" : "You lost!"}</Typography>

                <Typography variant='body1' sx={{ mt: 2 }}>
                    Winner: <strong>{result.winnerName}</strong>
                </Typography>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant='contained'
                        onClick={onClose}
                        sx={{ mt: 3 }}
                        color={result.won ? "success" : "error"}
                    >
                        Continue
                    </Button>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    textAlign: "center",
                    outline: "none",
                }}
            >
                <AnimatePresence mode='wait'>{renderContent()}</AnimatePresence>
            </Box>
        </Modal>
    );
};
