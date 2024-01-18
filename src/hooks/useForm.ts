import {useState, ChangeEvent, SetStateAction, Dispatch} from 'react';

interface FormValues {
    [key: string]: string;
}

interface FormHook {
    values: FormValues;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setValues: Dispatch<SetStateAction<FormValues>>;
}

export function useForm(initialValues: FormValues = {}): FormHook {
    const [values, setValues] = useState<FormValues>(initialValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}