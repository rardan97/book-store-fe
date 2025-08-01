import { useCallback, useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Alert from "../ui/alert/Alert";
import { editCategories, getCategoryValueById } from "../../api/Category";
import type { Category } from "../../interfaces/Category.interface";


type CategoryEditProps = {
    onSuccess: () => void;
    idCat: number;
};

interface Errors {
    categoryName: string;
    categoryDescription: string;
}

export default function CategoryEdit({onSuccess, idCat} : CategoryEditProps) {

    const { isOpen, openModal, closeModal } = useModal();
    const [categoryId, setCategoryId] = useState<number>();  
    const [categoryName, setCategoryName] = useState<string>("");
    const [categoryDescription, setCategoryDescription] = useState<string>("");
    const [errorsAll, setErrorsAll] = useState<string>("");
    
    const [errors, setErrors] = useState<Errors>({
        categoryName: '',
        categoryDescription: ''
    });
            
    const getCategoryById = useCallback(async (): Promise<void> => {
        const token = localStorage.getItem("staff_accessToken");
        if (!token){
            return;
        }
        try {
            const response = await getCategoryValueById(token, idCat);
            console.log("Success processing data");
            setCategoryId(response.categoryId);
            setCategoryName(response.categoryName);
            setCategoryDescription(response.categoryDescription || "");
        } catch (error) {
            console.log("Failed processing data", error);
            throw error;
        }
    }, [idCat]);
    
    useEffect(() => {
            if (isOpen) {
                getCategoryById();
            }
    }, [isOpen, getCategoryById]);


    function validateForm(): boolean{
        console.log("proccess validation");
        let valid = true;
        const errorsCopy = {... errors}
        
        if(categoryName.trim()){
            errorsCopy.categoryName = '';
        }else{
            errorsCopy.categoryName = 'email is required';
            valid = false;
        }
    
        if(categoryDescription.trim()){
            errorsCopy.categoryDescription = '';
        }else{
            errorsCopy.categoryDescription = 'password is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }
    
    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("staff_accessToken");
        if (!token) {
            return;
        }
        if (validateForm()) {
            try {
                if (categoryId === undefined) {
                    throw new Error("categoryId is undefined");
                }
                const newCategory: Category = {
                    categoryId,
                    categoryName,
                    categoryDescription,
                };
            
                const result = await editCategories(token, categoryId, newCategory);
                if(result){
                    console.log("success add data", result);
                    setCategoryName("");
                    setCategoryDescription("");
                    setErrorsAll("");
                    onSuccess();
                    closeModal();
                }else{
                    setErrorsAll("Login gagal. Cek email/password.");
                }
            } catch (err) {
                console.error("Gagal login", err);
                setErrorsAll("Login gagal. Cek email/password.");
            }
        }

        console.log("Saving changes...");
        closeModal();
    };
    

    return (
    <>
    <div className=" border-gray-200 rounded-2xl dark:border-gray-800">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <button
                onClick={openModal}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
                <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                        fill=""
                    />
                </svg>
            Edit Category
            </button>
        </div>

        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Edit Category
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Edit your data category.
                    </p>
                </div>
                <form className="flex flex-col" onSubmit={handleSave}>
                    {errorsAll && 
                        <Alert
                            variant="error"
                            title="Error Authentication"
                            message={errorsAll}
                        />
                    }

                    <div className="custom-scrollbar h-[220px] overflow-y-auto px-2 pb-3">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <Input placeholder="category ID"
                                type="hidden"
                                value={categoryId ?? ''}
                                onChange={(e) => setCategoryId(Number(e.target.value))}
                            />
                            <div className="col-span-2">
                                <Label>Category Name</Label>
                                <Input placeholder="category name"
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                                {errors.categoryName && <p className="text-red-500 text-sm">{errors.categoryName}</p>}
                            </div>
                            <div className="col-span-2">
                                <Label>Category Deskripsi</Label>
                                <Input placeholder="category Desc"
                                    type="text"
                                    value={categoryDescription}
                                    onChange={(e) => setCategoryDescription(e.target.value)}
                                />
                                {errors.categoryDescription && <p className="text-red-500 text-sm">{errors.categoryDescription}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-2 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={closeModal}>Close</Button>
                        <Button size="sm" type="submit">Update</Button>
                    </div>
                </form>
            </div>
        </Modal>
    </div>
    </>
    );
}