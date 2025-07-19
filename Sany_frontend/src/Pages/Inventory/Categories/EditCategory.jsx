import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './AddCategory.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryByIdReducer, updateCategoryById } from '../../../features/categories/categorySlice'

function EditCategory() {

    const navigate = useNavigate();

    const { categoryId } = useParams();
    const { category_name } = useSelector((state) => state.categories);
    // console.log({ category_name })

    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: { categoryName: "" },
        validationSchema: Yup.object({
            categoryName: Yup.string().required("category Name is Required"),
        }),

        onSubmit: async (values) => {
            console.log("values==>>", values);

            let catName = values.categoryName;

            // let res = await fetch(`http://localhost:8991/V2/categories/edit?Categoryid=${categoryId}`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         Categoryname: values.categoryName,
            //         Categorystatus: 1

            //     }),
            // })

            // const res_ = await res.json();
            // console.log(res_);

            let res = await dispatch(updateCategoryById({ categoryId, catName })).unwrap();

            if (res.code == 200) {
                navigate('/showCategories');
            }
        }
    })

    const handleCancel = async () => {
        navigate('/showCategories')
    }

    let getCategoryById = async (id) => {
        // let response = await fetch(`http://localhost:8991/V2/categories/${id}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })

        // let res_ = await response.json()
        // console.log("res_==>>", res_);

        // let catname = res_.data[0].catname;
        // console.log("catname==>", catname);

        dispatch(getCategoryByIdReducer(id))

    }

    useEffect(() => {
        getCategoryById(categoryId);
    }, [dispatch, categoryId])

    useEffect(() => {
        formik.setFieldValue('categoryName', category_name);
    }, [category_name])


    return (
        <div className="categoryContainer">
            <div className="card shadow-sm col-md-8">
                <div className="card-body">
                    <h5 className="card-title mb-4">Create Category</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="categoryName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                name="categoryName"
                                className="form-control"
                                placeholder="Category Name"
                                value={formik.values.categoryName}
                                onChange={formik.handleChange}
                                error={formik.touched.categoryName && formik.errors.categoryName}
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

export default EditCategory
