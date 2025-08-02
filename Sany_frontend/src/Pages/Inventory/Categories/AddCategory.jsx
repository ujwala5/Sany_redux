import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './AddCategory.css';
import Navbar from '../../../Component/Navbar/Navbar';
import { addCategory } from '../../../features/categories/categorySlice';
import { useDispatch } from 'react-redux';

function AddCategory() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { categoryName: "" },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("category Name is Required"),
    }),

    onSubmit: async (values) => {
      console.log("values==>>", values);
  
      const res = await dispatch(addCategory(values.categoryName)).unwrap();

      // const res = await result.json();
      console.log("res==>>", res);

      if (res.code === 200) {
        navigate('/showCategories');
      }
    }
  })

  const handleCancel = async () => {
    navigate('/showCategories')
  }

  return (

    <>
      {/* <Navbar /> */}
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
    </>

  )
}

export default AddCategory;