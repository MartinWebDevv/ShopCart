import React from "react";

export const PromoCodes = [
    //Save 10% purchase
    {
        code:"SAVE10",
        discountType:"PERCENT",
        value: 10,
        active: true
    },
    //Take $5 off purchase
    {
        code:"TAKE5",
        discountType:"FIXED",
        value: 500,
        active: true
    },
    //Save 15% when you spend $50 or more, cap of $30 discount
    {
        code:"WELCOME",
        discountType:"PERCENT",
        value: 15,
        minSubtotal: 5000, //we type it in cents
        maxDiscount: 3000,
        // adding a duration for the coupon
        startsAt: "2025-09-01",
        expiresAt: "2025-10-01",
        active:true
    }
]