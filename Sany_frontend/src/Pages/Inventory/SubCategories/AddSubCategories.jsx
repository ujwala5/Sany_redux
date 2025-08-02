import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSubCategories } from '../../../features/subCategory/subCategorySlice';

function AddSubCategories() {

  const [categories, setCategories] = useState([]);

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
      // let result = await fetch('http://localhost:8991/v2/subcategories/create', {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     Categoryname: values.category,
      //     SubCategoryname: values.subCategoryName

      //   }),
      // })

      // const response = await result.json()
      // console.log("response==", response);


      const res = await dispatch(addSubCategories(values)).unwrap();
      console.log("res==>>", res);

      if (res.code === 200) {
        navigate('/ShowSubCategories');
      }
    },

  })


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

export default AddSubCategories
