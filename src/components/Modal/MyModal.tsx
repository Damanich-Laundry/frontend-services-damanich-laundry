import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface MyModalProps {
    title: string;
    onOpen: () => void;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
    children: React.ReactNode;
}

export default function MyModal(props: MyModalProps) {
    const getMaxWidth = (size?: string) => {
        switch (size) {
            case "xs": return "xs";
            case "sm": return "sm";
            case "md": return "md";
            case "lg": return "lg";
            case "xl": return "xl";
            case "2xl": return "xl";
            case "3xl": return "xl";
            case "4xl": return "xl";
            case "5xl": return "xl";
            case "full": return false;
            default: return "md";
        }
    };

    return (
        <Dialog
            open={props.isOpen}
            onClose={() => props.onOpenChange(false)}
            maxWidth={getMaxWidth(props.size)}
            fullWidth={props.size === "full"}
            fullScreen={props.size === "full"}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    border: '1px solid #e5e7eb',
                }
            }}
        >
            <DialogTitle sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid #e5e7eb',
                py: 2
            }}>
                {props.title}
                <IconButton
                    onClick={() => props.onOpenChange(false)}
                    size="small"
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ py: 3 }}>
                {props.children}
            </DialogContent>
        </Dialog>
    );
}
