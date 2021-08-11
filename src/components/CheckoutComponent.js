import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js"
import React from 'react'

const PUBLIC_KEY = "pk_test_51JN3blBxEtXhmPeDGxDCcQJhvOLbec0TH37Ivao1PoxSDU09yU4pFY4eBV2mOOHBmvKlEsYvFlwQSY2gcISg6Jow00RM7fC4cv";

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function CheckoutComponent() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentFormComponent />
        </Elements>
    )
}