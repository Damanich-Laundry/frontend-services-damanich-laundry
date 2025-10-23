import React from "react";
import {
    Modal,
    ModalContent,
    ModalBody,
    ModalHeader,
} from "@heroui/react";

interface MyModalProps {
    title: string;
    onOpen: () => void;
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
    children: React.ReactNode;
}

export default function MyModal(props: MyModalProps) {

   const modalClassNames = {
        backdrop: "bg-black/50 backdrop-blur-sm",
        base: "border-gray-200 bg-white text-gray-900",
        header: "border-b border-gray-200",
        body: "py-6",
        footer: "border-t border-gray-200",
    };

    return (
        <>
            <Modal scrollBehavior="inside"  size={props.size} isOpen={props.isOpen} onOpenChange={props.onOpenChange} title={props.title}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
