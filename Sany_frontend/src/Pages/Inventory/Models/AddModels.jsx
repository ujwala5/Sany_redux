import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addModels } from '../../../features/model/modelSlice';



function AddModels() {

  const [subcategories, setSubategories] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      Subcategory: "",
      ModelCode: "",
      modelDescription: "",
      BrochureUrl: ""
    },
    validateSchema: Yup.object({
      Subcategory: Yup.string()
        .required("subCategory is required"),
      ModelCode: Yup.string()
        .required("Model code is required"),
      modelDescription: Yup.string()
        .required("modelDescription is required"),
      BrochureUrl: Yup.string()
        .required("Brochure Url is required")
    }),

    onSubmit: async (values) => {
      try {
        console.log("values==>", values);

        // const res = await fetch("http://localhost:8991/V2/models/create", {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     Subcatname: values.Subcategory,
        //     Modelcode: values.ModelCode,
        //     Modeldesc: values.modelDescription,
        //     Brochureurl: values.BrochureUrl
        //   }),
        // })

        // const response = await res.json();
        // console.log("response =>", response);

        const res = await dispatch(addModels(values)).unwrap();

        if (res.code == 200) {
          toast.success("Model created successfully")
          navigate('/ShowModels')
        } else {
          toast.error("Something went wrong")
        }
      } catch (err) {
        toast.error(err.message);
      }


    }
  })

  const handleCancel = async () => {
    navigate("/ShowModels");
  }

  const fetchSubcategories = async () => {
    const res = await fetch("http://localhost:8991/V2/subcategories", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const result = await res.json();
    console.log("result==>>", result.data);
    setSubategories(result.data);
  }

  useEffect(() => {
    fetchSubcategories();
  }, [])



  return (

    <div className="categoryContainer">
      <div className="card shadow-sm col-md-8">
        <div className="card-body">
          <h5 className="card-title mb-4">Create Model</h5>
          <hr />
          <form onSubmit={formik.handleSubmit}>

            <div className="mb-3">
              <label htmlFor="dealerName" className="form-label">Subcategory</label>

              <select
                name="Subcategory"
                className="form-select mb-3"
                placeholder="Select Subcategory "

                value={formik.values.Subcategory}
                onChange={formik.handleChange}

              >
                <option value="">Subcategory</option>
                {subcategories.map((item, index) => {
                  // console.log("item =>", item)
                  return <option key={index} value={item.subcatname}>{item.subcatname}</option>
                })}

              </select>

              <div>
                <input
                  type="text"
                  name="ModelCode"
                  className="form-control mb-3"
                  placeholder="Enter ModelCode here..."
                  value={formik.values.ModelCode}
                  onChange={formik.handleChange}
                // error={formik.touched.ModelCode && formik.errors.ModelCode}
                />
                {formik.touched.ModelCode && formik.errors.ModelCode && (
                  <div className="text-danger">{formik.errors.ModelCode}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="Address" className="form-label">Model Description</label>
                <textarea
                  name="modelDescription"
                  className="form-control mb-3"
                  placeholder="Enter model Description here..."
                  value={formik.values.modelDescription}
                  onChange={formik.handleChange}
                // error={formik.touched.modelDescription && formik.errors.modelDescription}
                />
                {formik.touched.modelDescription && formik.errors.modelDescription && (
                  <div className="text-danger">{formik.errors.modelDescription}</div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="BrochureUrl"
                  className="form-control mb-3"
                  placeholder="Enter brochure url here..."
                  value={formik.values.BrochureUrl}
                  onChange={formik.handleChange}
                // error={formik.touched.BrochureUrl && formik.errors.BrochureUrl}
                />
                {formik.touched.BrochureUrl && formik.errors.BrochureUrl && (
                  <div className="text-danger">{formik.errors.BrochureUrl}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">Add</button>
              <button type="button" className="btn btn-danger ms-2" onClick={handleCancel}>Cancel</button>

            </div>
          </form>
        </div>
      </div>
    </div>


  )
}

export default AddModels