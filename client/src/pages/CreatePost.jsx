import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormField, Loader } from "../components"
import { preview } from "../assets"
import { getRandomPrompt } from '../utils'

export default function CreatePost() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  async function generateImage() {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch(`${import.meta.env.VITE_APP_PROD_BACKEND_SERVER_BASE_URL}/api/v1/dalle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt })
        })
        const data = await response.json()
        console.log('data:', data)
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${data.photo}`
        })
        setGeneratingImg(false)
      } catch (error) {
        console.log(error)
        alert(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (form.prompt && form.photo) {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_PROD_BACKEND_SERVER_BASE_URL}/api/v1/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        })
        await response.json()
        alert('Success')
        navigate('/') // Redirect to home page after successful post
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please generate an image with proper details')
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSurpriseMe() {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({
      ...form,
      prompt: randomPrompt
    })
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the community
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Jon Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A Samurai riding a Horse on Mars, lomography."
            value={form.prompt}
            handleChange={handleChange}
            isSurpirseMe={true}
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          {/* clicking this button fires the image generation functionality */}
          <button
            type="button"
            onClick={generateImage}
            disabled={generatingImg || loading}
            className={`text-[#fff] bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading || generatingImg ? 'cursor-not-allowed' : ''}`}
          >
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with others in the community **
          </p>
          {/* clicking this button shares with the community */}
          <button
            type="submit"
            disabled={generatingImg || loading}
            className={`mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading || generatingImg ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}
