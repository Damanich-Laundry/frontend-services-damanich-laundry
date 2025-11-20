"use client";

import React, {useEffect, useMemo, useRef} from "react";
import {Box} from "@mui/material";
import {useRouter} from "next/navigation";
import {
    OrderFormHeader,
    OrderForm,
    OrderFormFooter,
    OrderFormData,
    OrderFormRef,
} from "@/components/modules/orders-page";
import {useCustomers, useServices} from "@/hooks";
import type {
    Customer,
} from "@/components/modules/customer-page/types";

const CreateOrderPageClient = () => {
    const router = useRouter();
    const formRef = useRef<OrderFormRef>(null);
    const {customers: customerData} = useCustomers();
    const {services: serviceRecords} = useServices();

    const handleSubmit = (data: OrderFormData) => {
        console.log("Order data to submit:", data);
        router.push("/orders");
    };

    const handleCancel = () => {
        router.push("/orders");
    };

    const handleAddNewCustomer = () => {
        router.push("/customers?action=add");
    };

    const formattedCustomers = useMemo<Customer[]>(() => {
        const dateFormatter = new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        return customerData.map((customer) => ({
            id: customer.id.toString(),
            name: customer.name,
            phone: customer.phone ?? "-",
            address: customer.address ?? "-",
            totalTransaction: `${customer.total_orders} pesanan`,
            registeredDate: customer.member_since
                ? dateFormatter.format(new Date(customer.member_since))
                : "Belum terdaftar",
        }));
    }, [customerData]);


    useEffect(() => {
    }, []);

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
            <OrderFormHeader onBack={handleCancel}/>

            <OrderForm
                ref={formRef}
                customers={formattedCustomers}
                // services={serviceRecords}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                onAddNewCustomer={handleAddNewCustomer}
            />

            <OrderFormFooter
                onCancel={handleCancel}
                onSave={() => {
                    formRef.current?.submit();
                }}
            />
        </Box>
    );
};

export default CreateOrderPageClient;

