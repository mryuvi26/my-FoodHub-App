import { useState } from "react";
import { UploadCloud, XCircle } from "lucide-react";
import api from "../../api";

export default function AddItem() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: null,
    preview: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async () => {
    if (!form.image) return setError("Please upload product image");
    if (!form.name) return setError("Product name is required");
    if (!form.category) return setError("Please select category");
    if (!form.price) return setError("Product price is required");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("image", form.image);

      const res = await api.post("/api/food/add-food", formData);

      if (res.data.success) {
        // alert("✅ Food Item Added");
        setForm({
          name: "",
          description: "",
          category: "",
          price: "",
          image: null,
          preview: null,
        });
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Server error while adding item");
    }
  };

  const inputClass =
    "w-full border dark:border-gray-600 px-3 py-2 rounded-lg " +
    "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 " +
    "outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="max-w-3xl w-full relative">

      {/* ERROR TOAST */}
      {error && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 w-[90%] sm:w-80
          bg-white dark:bg-[#0E1116] border dark:border-gray-700
          rounded-xl shadow-lg">

          <div className="flex gap-3 p-4 text-sm">
            <XCircle className="text-orange-500" />
            <span className="flex-1 text-gray-700 dark:text-gray-200">
              {error}
            </span>
            <button
              onClick={() => setError("")}
              className="text-gray-500 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="h-1 bg-orange-500 rounded-b-xl"></div>
        </div>
      )}

      {/* CARD */}
      <div className="
        bg-white dark:bg-[#0E1116]
        border dark:border-gray-700
        rounded-2xl p-6 sm:p-8 space-y-6
      ">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Add New Product
        </h2>

        {/* IMAGE UPLOAD */}
        <div>
          <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
            Upload Image
          </p>

          <label
            className="
              w-36 h-28 border-2 border-dashed rounded-xl
              flex flex-col items-center justify-center
              text-gray-400 cursor-pointer
              hover:border-orange-500
              overflow-hidden
            "
          >
            {form.preview ? (
              <img
                src={form.preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <UploadCloud />
                <span className="text-xs mt-1">Upload</span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* PRODUCT NAME */}
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Product name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Type here"
            className={inputClass}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Product description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write here"
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* CATEGORY + PRICE */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select category</option>
              <option>Salad</option>
              <option>Rolls</option>
              <option>Deserts</option>
              <option>Sandwich</option>
              <option>Cake</option>
              <option>Pure veg</option>
              <option>Pasta</option>
              <option>Noodles</option>
            </select>
          </div>

          <div className="w-full sm:w-32">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="$ 20"
              className={inputClass}
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="
            bg-orange-500 hover:bg-orange-600
            text-white px-10 py-2 rounded-lg
            text-sm font-semibold transition
          "
        >
          ADD ITEM
        </button>
      </div>
    </div>
  );
}