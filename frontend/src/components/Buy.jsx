import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../../utils/utils";
function Buy() {
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [course, setCourse] = useState({});
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const [customerName, setCustomerName] = useState(user?.user?.firstName || "");
    const [customerAddress, setCustomerAddress] = useState({
        line1: "",
        city: "",
        state: "",
        postal_code: "",
        country: "IN",
    });

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token]);

    useEffect(() => {
        const fetchBuyCourseData = async () => {
            try {
                const response = await axios.post(
                    `${BACKEND_URL}/course/buy/${courseId}`,
                    {
                        customerName: customerName,
                        customerAddress: customerAddress,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );
                setCourse(response.data.course);
                setClientSecret(response.data.clientSecret);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error?.response?.status === 400) {
                    setError("You have already purchased this course");
                    navigate("/purchases");
                } else {
                    setError(error?.response?.data?.errors);
                }
            }
        };

        if (customerName && customerAddress.line1) {
            fetchBuyCourseData();
        }
    }, [courseId, customerName, customerAddress]);

    const handlePurchase = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe or Elements not found");
            return;
        }

        setLoading(true);
        const card = elements.getElement(CardElement);

        if (!card) {
            setLoading(false);
            return;
        }

        const { error: paymentMethodError, paymentMethod } =
            await stripe.createPaymentMethod({
                type: "card",
                card,
            });

        if (paymentMethodError) {
            setCardError(paymentMethodError.message);
            setLoading(false);
            return;
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.user?.email,
                        name: customerName,
                    },
                },
            });

        if (confirmError) {
            setCardError(confirmError.message);
        } else if (paymentIntent.status === "succeeded") {
            const paymentInfo = {
                email: user?.user?.email,
                userId: user.user._id,
                courseId: courseId,
                paymentId: paymentIntent.id,
                amount: paymentIntent.amount,
                status: paymentIntent.status,
            };

            try {
                await axios.post(`${BACKEND_URL}/order`, paymentInfo, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                toast.success("Payment Successful");
                navigate("/purchases");
            } catch (error) {
                toast.error("Error in making payment");
            }
        }

        setLoading(false);
    };

    return (
        <>
            {error ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg">
                        <p className="text-lg font-semibold">{error}</p>
                        <Link
                            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center"
                            to={"/purchases"}
                        >
                            Purchases
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row my-40 container mx-auto">
                    <div className="w-full md:w-1/2">
                        <h1 className="text-xl font-semibold underline">Order Details</h1>
                        <div className="flex items-center text-center space-x-2 mt-4">
                            <h2 className="text-gray-600 text-sm">Total Price</h2>
                            <p className="text-red-500 font-bold">₹{course.price}</p>
                        </div>
                        <div className="flex items-center text-center space-x-2">
                            <h1 className="text-gray-600 text-sm">Course name</h1>
                            <p className="text-red-500 font-bold">{course.title}</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                            <h2 className="text-lg font-semibold mb-4">Process your Payment!</h2>
                            <form onSubmit={handlePurchase}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full border rounded px-3 py-2 text-sm"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Street address"
                                        value={customerAddress.line1}
                                        onChange={(e) =>
                                            setCustomerAddress({
                                                ...customerAddress,
                                                line1: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2 text-sm"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={customerAddress.city}
                                        onChange={(e) =>
                                            setCustomerAddress({
                                                ...customerAddress,
                                                city: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2 text-sm mt-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        value={customerAddress.state}
                                        onChange={(e) =>
                                            setCustomerAddress({
                                                ...customerAddress,
                                                state: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2 text-sm mt-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Postal Code"
                                        value={customerAddress.postal_code}
                                        onChange={(e) =>
                                            setCustomerAddress({
                                                ...customerAddress,
                                                postal_code: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2 text-sm mt-2"
                                        required
                                    />
                                </div>

                                <label
                                    className="block text-gray-700 text-sm mb-2"
                                    htmlFor="card-number"
                                >
                                    Credit/Debit Card
                                </label>
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#424770",
                                                "::placeholder": {
                                                    color: "#aab7c4",
                                                },
                                            },
                                            invalid: {
                                                color: "#9e2146",
                                            },
                                        },
                                    }}
                                />

                                <button
                                    type="submit"
                                    disabled={!stripe || loading}
                                    className="mt-8 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                                >
                                    {loading ? "Processing..." : "Pay"}
                                </button>

                                {cardError && (
                                    <p className="text-red-500 font-semibold text-xs mt-2">
                                        {cardError}
                                    </p>
                                )}
                            </form>

                            <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center">
                                <span className="mr-2">🅿️</span> Other Payments Method
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Buy;
