import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddDealers() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      dealerName: "",
      dealerCode: "",
      contactNumber: "",
      country: "",
      state: "",
      city: "",
      lattitude: "",
      longitude: "",
      zipcode: "",
      Address: ""
    },
    validationSchema: Yup.object({
      dealerName: Yup.string()
        .required("Dealer name is required"),
      dealerCode: Yup.string()
        .required("Dealer code is required"),
      contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
        .required("Contact number is required"),
      country: Yup.string()
        .required("Country is required"),
      state: Yup.string()
        .required("State is required"),
      city: Yup.string()
        .required("City is required"),
      lattitude: Yup.number()
        .typeError("Latitude must be a number")
        .required("Latitude is required"),
      longitude: Yup.number()
        .typeError("Longitude must be a number")
        .required("Longitude is required"),
      zipcode: Yup.string()
        .matches(/^[0-9]{5,6}$/, "Zipcode must be 5 or 6 digits")
        .required("Zipcode is required"),
      Address: Yup.string()
        .required("Address is required")
        .min(10, "Address must be at least 10 characters"),
    }),

    onSubmit: async (values) => {
      console.log("values==>>", values);

      const result = await fetch("http://localhost:8991/V2/dealers/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Dealername: values.dealerName,
          dealerCode: values.dealerCode,
          Contactno: values.contactNumber,
          Country: values.country,
          State: values.state,
          City: values.city,
          lat: values.lattitude,
          long: values.longitude,
          Zipcode: values.zipcode,
          Mapadd: values.Address
        }),
      })
      const res = await result.json();
      console.log("res === >>", res);
      if (res.code === 200) {
        toast.success("Dealer created Successfully");
        navigate("/ShowDealers")
      } else {
        toast.error("Invalid Input");
      }
    }
  })

  const handleCancel = async () => {
    navigate('/ShowDealers')
  }

  return (
    <div className="categoryContainer">
      <div className="card shadow-sm col-md-8">
        <div className="card-body">
          <h5 className="card-title mb-4">Create Dealer</h5>
          <form onSubmit={formik.handleSubmit}>

            <div className="mb-3">
              <label htmlFor="dealerName" className="form-label">Dealer Name</label>
              <input
                type="text"
                name="dealerName"
                className="form-control"
                placeholder="Enter dealerName here..."
                value={formik.values.dealerName}
                onChange={formik.handleChange}
              // error={formik.touched.dealerName && formik.errors.dealerName}
              />
              {formik.touched.dealerName && formik.errors.dealerName && (
                <div className="text-danger">{formik.errors.dealerName}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="dealerCode" className="form-label">Dealer Code</label>
              <input
                type="text"
                name="dealerCode"
                className="form-control"
                placeholder="Enter dealerCode here..."
                value={formik.values.dealerCode}
                onChange={formik.handleChange}
              // error={formik.touched.dealerCode && formik.errors.dealerCode}
              />
              {formik.touched.dealerCode && formik.errors.dealerCode && (
                <div className="text-danger">{formik.errors.dealerCode}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                className="form-control"
                placeholder="Enter contactNumber here..."
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
              // error={formik.touched.contactNumber && formik.errors.contactNumber}
              />
              {formik.touched.contactNumber && formik.errors.contactNumber && (
                <div className="text-danger">{formik.errors.contactNumber}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                placeholder="Enter country here..."
                value={formik.values.country}
                onChange={formik.handleChange}
              // error={formik.touched.country && formik.errors.country}
              />
              {formik.touched.country && formik.errors.country && (
                <div className="text-danger">{formik.errors.country}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="Enter state here..."
                value={formik.values.state}
                onChange={formik.handleChange}
              // error={formik.touched.state && formik.errors.state}
              />
              {formik.touched.state && formik.errors.state && (
                <div className="text-danger">{formik.errors.state}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="Enter city here..."
                value={formik.values.city}
                onChange={formik.handleChange}
              // error={formik.touched.city && formik.errors.city}
              />
              {formik.touched.city && formik.errors.city && (
                <div className="text-danger">{formik.errors.city}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="lattitude" className="form-label">Latitude</label>
              <input
                type="number"
                name="lattitude"
                className="form-control"
                placeholder="Enter latitude here..."
                value={formik.values.lattitude}
                onChange={formik.handleChange}
              // error={formik.touched.lattitude && formik.errors.lattitude}
              />
              {formik.touched.lattitude && formik.errors.lattitude && (
                <div className="text-danger">{formik.errors.lattitude}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="longitude" className="form-label">Longitude</label>
              <input
                type="number"
                name="longitude"
                className="form-control"
                placeholder="Enter longitude here..."
                value={formik.values.longitude}
                onChange={formik.handleChange}
              // error={formik.touched.longitude && formik.errors.longitude}
              />
              {formik.touched.longitude && formik.errors.longitude && (
                <div className="text-danger">{formik.errors.longitude}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="zipcode" className="form-label">Zipcode</label>
              <input
                type="text"
                name="zipcode"
                className="form-control"
                placeholder="Enter zipcode here..."
                value={formik.values.zipcode}
                onChange={formik.handleChange}
              // error={formik.touched.zipcode && formik.errors.zipcode}
              />
              {formik.touched.zipcode && formik.errors.zipcode && (
                <div className="text-danger">{formik.errors.zipcode}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Address" className="form-label">Address</label>
              <textarea
                name="Address"
                className="form-control"
                placeholder="Enter Address here..."
                value={formik.values.Address}
                onChange={formik.handleChange}
              // error={formik.touched.Address && formik.errors.Address}
              />
              {formik.touched.Address && formik.errors.Address && (
                <div className="text-danger">{formik.errors.Address}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">Add</button>
            <button type="button" className="btn btn-danger ms-2" onClick={handleCancel}>Cancel</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddDealers;
