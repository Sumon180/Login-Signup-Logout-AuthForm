import { useState, ChangeEvent, FormEvent, FC } from 'react';
import { FormErrors, FormData, FormInput } from '../types/types';

const SignUpPage: FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors = {};

        if (formData.firstName.trim() === '') {
            newErrors.firstName = 'First Name is required';
            isValid = false;
        }

        if (formData.lastName.trim() === '') {
            newErrors.lastName = 'Last Name is required';
            isValid = false;
        }

        if (formData.email.trim() === '') {
            newErrors.email = 'Email is required';
            isValid = false;
        }

        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validate = validateForm()
        if (validate) {
            console.log(formData); // Replace with your sign-up logic
        }
    };

    const FormInput: FC<FormInput> = ({ id, name, type, label }) => {
        return (
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                    {label}
                </label>
                <input
                    className={`appearance-none border ${errors[name] ? 'border-red-500' : 'border-gray-300'
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    id={id}
                    name={name}
                    type={type}
                    placeholder={label}
                    value={formData[name]}
                    onChange={handleChange}
                />
                {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
            </div>
        )
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput id="firstName" name="firstName" type="text" label="First Name" />
                    <FormInput id="lastName" name="lastName" type="text" label="Last Name" />
                    <FormInput id="email" name="email" type="email" label="Email" />
                    <FormInput id="password" name="password" type="password" label="Password" />
                    <input id="password" name="password" type="password" placeholder='Enter Name' />

                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
