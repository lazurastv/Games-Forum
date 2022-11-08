import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { UpdateCredentialsRequest, UserControllerApi, UserCredentialsUpdate } from "../../api/api";

interface Passwords {
    old: string;
    new: string;
    newAgain: string;
}

export default function PasswordPopup({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [passwords, setPasswords] = useState<Passwords>({ old: "", new: "", newAgain: "" });

    const updatePassword = async () => {
        if (!passwords.old || !passwords.new || passwords.new !== passwords.newAgain) {
            return;
        }
        await new UserControllerApi().updateCredentials({
            id: id,
            userCredentialsUpdate: {
                currentPassword: passwords.old,
                password: passwords.new,
            }
        }, { credentials: "include" });
        setIsOpen(false);
    }

    return (
        <Box sx={{ width: "45%" }}>
            <Button
                onClick={() => setIsOpen(true)}
                disableElevation
                variant="outlined"
                color="secondary"
                sx={{
                    color: "text.primary",
                    borderColor: "secondary.main",
                    width: "100%"
                }}
            >
                Zmień hasło
            </Button>
            <Popup
                position="center center"
                modal={true}
                open={isOpen}
                closeOnDocumentClick={false}
                closeOnEscape={false}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "primary.main",
                    color: "text.primary",
                    padding: "40px",
                }}>
                    <TextField
                        onChange={(val) => setPasswords({ ...passwords, old: val.target.value })}
                        required
                        margin="normal"
                        label="Stare hasło"
                        autoFocus
                        color="secondary"
                        type="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        onChange={(val) => setPasswords({ ...passwords, new: val.target.value })}
                        required
                        margin="normal"
                        label="Nowe hasło"
                        color="secondary"
                        type="password"
                        autoComplete="new-password"
                    />
                    {passwords.new !== passwords.newAgain && <Typography>Hasła nie są zgodne!</Typography>}
                    <TextField
                        onChange={(val) => setPasswords({ ...passwords, newAgain: val.target.value })}
                        required
                        margin="normal"
                        label="Powtórz nowe hasło"
                        color="secondary"
                        type="password"
                        autoComplete="new-password"
                    />
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                        gap: "20px"
                    }}>
                        <Button
                            onClick={updatePassword}
                            variant="contained"
                            color="secondary"
                            sx={{
                                color: "text.primary",
                                borderColor: "secondary.main"
                            }}
                        >
                            OK
                        </Button>
                        <Button
                            onClick={() => setIsOpen(false)}
                            variant="outlined"
                            color="secondary"
                            sx={{
                                color: "text.primary",
                                borderColor: "secondary.main"
                            }}
                        >
                            Anuluj
                        </Button>
                    </Box>
                </Box>
            </Popup>
        </Box>
    )
}