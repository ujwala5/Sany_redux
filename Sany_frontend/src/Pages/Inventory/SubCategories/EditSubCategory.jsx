import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getSubCategoryByIdReducer } from '../../../features/subCategory/subCategorySlice';
import { useDispatch, useSelector } from 'react-redux';

function EditSubCategory() {
    const [categories, setCategories] = useState([]);

    const { subcategoryName, categoryName } = useSelector((state) => state.subCategory);
    console.log("subcategoryName =>", subcategoryName);
    console.log("categoryName =>", categoryName);

    const { subCatId } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            category: '',
            subCategoryName: ''
        },
        validationSchema: Yup.object({
            category: Yup.string().required("category Name is Required"),
            subCategoryName: Yup.string().required("subCategory Name is Required"),

        }),

        onSubmit: async (values) => {
            console.log("values==>", values)
            let result = await fetch(`http://localhost:8991/v2/subcategories/edit?SubCategoryid=${subCatId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Categoryname: values.category,
                    SubCategoryname: values.subCategoryName,
                    SubCategorystatus: 1
                }),
            })

            const response = await result.json()
            console.log("response==", response);
            if (response.code === 200) {
                navigate('/ShowSubCategories');
            }
        },

    })

    const fetchSubCategorybyId = async (subCatId) => {
        // const res = await fetch(`http://localhost:8991/V2/subCategory/${subCatId}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })

        dispatch(getSubCategoryByIdReducer(subCatId));
    }

    useEffect(() => {
        fetchSubCategorybyId(subCatId);
        // dispatch(getSubCategoryByIdReducer(subCatId));
    }, [dispatch, subCatId])

    useEffect(() => {
        formik.setFieldValue("category", categoryName);
        formik.setFieldValue("subCategoryName", subcategoryName);

    }, [categoryName, subcategoryName])

    const fetchCategoryName = async () => {
        const res = await fetch('http://localhost:8991/v2/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = await res.json();
        console.log("result==>", result.data);
        setCategories(result.data);
    }

    useEffect(() => {
        fetchCategoryName();
    }, [])


    const handleCancel = async () => {
        navigate('/ShowSubCategories');
    }

    return (
        <div className="categoryContainer">
            <div className="card shadow-sm col-md-8">
                <div className="card-body">
                    <h5 className="card-title mb-4">Create Sub Category</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="categoryName" className="form-label">
                                category
                            </label>
                            <select name="category" className="form-select" aria-label="Default select example" value={formik.values.category} onChange={formik.handleChange} error={formik.touched.category && formik.errors.category}
                            >
                                <option>Select categories</option>
                                {categories.map((item, index) => {
                                    return <option key={index} value={item.catname}>{item.catname}</option>
                                })}
                            </select>
                            {/* {
                error ? <p>{error}</p> : null
              } */}
                            <label htmlFor="categoryName" className="form-label mt-3">
                                Subcategory Name
                            </label>
                            <input
                                type="text"
                                name="subCategoryName"
                                className="form-control"
                                placeholder="subCategory Name"
                                value={formik.values.subCategoryName}
                                onChange={formik.handleChange}
                                error={formik.touched.subCategoryName && formik.errors.subCategoryName}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default EditSubCategory




// import { useFormik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSubCategories, getSubCategoryByIdReducer } from '../../../features/subCategory/subCategorySlice';

// function EditSubCategory() {
//     const [categories, setCategories] = useState([]);
//     const { subCategory, subcategoryName, categoryName } = useSelector((state) => state.subCategory);
//     const { subCatId } = useParams();

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const formik = useFormik({
//         initialValues: {
//             category: '',
//             subCategoryName: ''
//         },
//         validationSchema: Yup.object({
//             category: Yup.string().required("Category name is required"),
//             subCategoryName: Yup.string().required("Subcategory name is required"),
//         }),
//         onSubmit: async (values) => {
//             try {
//                 const result = await fetch(`http://localhost:8991/v2/subcategories/edit?SubCategoryid=${subCatId}`, {
//                     method: "PUT",
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         Categoryname: values.category,
//                         SubCategoryname: values.subCategoryName,
//                         SubCategorystatus: 1
//                     }),
//                 });

//                 const response = await result.json();
//                 if (response.code === 200) {
//                     navigate('/ShowSubCategories');
//                 }
//             } catch (error) {
//                 console.error("Error updating subcategory:", error);
//             }
//         },
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             // Step 1: Load all subcategories
//             await dispatch(fetchSubCategories());
//             // Step 2: After all are loaded, pick one by ID
//             dispatch(getSubCategoryByIdReducer(subCatId));
//         };
//         fetchData();
//     }, [dispatch, subCatId]);

//     useEffect(() => {
//         formik.setFieldValue("category", categoryName);
//         formik.setFieldValue("subCategoryName", subcategoryName);
//     }, [categoryName, subcategoryName]);

//     const fetchCategoryName = async () => {
//         try {
//             const res = await fetch('http://localhost:8991/v2/categories', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });
//             const result = await res.json();
//             setCategories(result.data);
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//         }
//     };

//     useEffect(() => {
//         fetchCategoryName();
//     }, []);

//     const handleCancel = () => {
//         navigate('/ShowSubCategories');
//     };

//     return (
//         <div className="categoryContainer">
//             <div className="card shadow-sm col-md-8">
//                 <div className="card-body">
//                     <h5 className="card-title mb-4">Edit Sub Category</h5>
//                     <form onSubmit={formik.handleSubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="category" className="form-label">Category</label>
//                             <select
//                                 name="category"
//                                 className="form-select"
//                                 value={formik.values.category}
//                                 onChange={formik.handleChange}
//                             >
//                                 <option value="">Select categories</option>
//                                 {categories.map((item, index) => (
//                                     <option key={index} value={item.catname}>
//                                         {item.catname}
//                                     </option>
//                                 ))}
//                             </select>
//                             {formik.touched.category && formik.errors.category && (
//                                 <div className="text-danger mt-1">{formik.errors.category}</div>
//                             )}

//                             <label htmlFor="subCategoryName" className="form-label mt-3">Subcategory Name</label>
//                             <input
//                                 type="text"
//                                 name="subCategoryName"
//                                 className="form-control"
//                                 placeholder="Subcategory Name"
//                                 value={formik.values.subCategoryName}
//                                 onChange={formik.handleChange}
//                             />
//                             {formik.touched.subCategoryName && formik.errors.subCategoryName && (
//                                 <div className="text-danger mt-1">{formik.errors.subCategoryName}</div>
//                             )}
//                         </div>
//                         <button type="submit" className="btn btn-primary">Update</button>
//                         <button type="button" className="btn btn-danger ms-2" onClick={handleCancel}>Cancel</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EditSubCategory;

