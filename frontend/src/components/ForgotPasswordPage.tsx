import React, { useState, FormEvent } from 'react';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Add your password reset logic here
        try {
            // Simulating an asynchronous API request with a delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Display success message and reset the email input
            setIsSubmitted(true);
            setEmail('');
        } catch (error) {
            // Display error message or handle the error
            console.error('Password reset failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                {isSubmitted ? (
                    <p className="text-green-500 mb-4">
                        Password reset instructions sent to your email.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
