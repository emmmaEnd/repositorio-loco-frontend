import { coerce, number, parse, safeParse } from "valibot"
import axios from "axios"
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import { toBoolean } from "../utils"

type ProductData ={
    [k: string]: FormDataEntryValue
}

// src/services/ProductService.ts

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  )

  return res.data.secure_url
}






export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price
    })

    if (result.success) {
      let image_url = ""
      const fileEntry = data.image

      // 
      if (fileEntry instanceof File && fileEntry.name !== "") {
        console.log("Subiendo imagen a Cloudinary...")
        console.log("Archivo recibido:", fileEntry)
        image_url = await uploadImage(fileEntry)
        console.log("Imagen subida:", image_url)
      }

      const payload = {
        name: result.output.name,
        price: result.output.price,
        image_url
      }

      console.log("Enviando producto al backend:", payload)

      const url = `${import.meta.env.VITE_API_URL}/api/products`
      await axios.post(url, payload)
    } else {
      throw new Error('Datos no válidos')
    }
  } catch (error) {
    console.log("Error en addProduct:", error)
  }
}





export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`
    const { data } = await axios(url)
    console.log("Datos crudos de la API:", data.data) // 
    const result = safeParse(ProductsSchema, data.data)
    if (result.success) {
      return result.output
    } else {
      throw new Error('Hubo un error')
    }
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return []
  }
}



export async function getProductById(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    const { data } = await axios(url)
    const result = safeParse(ProductSchema, data.data)
    if (result.success) {
      return result.output
    } else {
      throw new Error('Hubo un error')
    }
  } catch (error) {
    console.error("Error al obtener producto por ID:", error)
    return null
  }
}


export async function updateProduct(data: ProductData, id: Product['id']) {
  try {
    const NumberSchema = coerce(number(), Number)
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString())
    })

    if (result.success) {
      let image_url = ""
      const file = data.image as File

      if (file && file instanceof File && file.name) {
        image_url = await uploadImage(file)
      }

      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
      await axios.put(url, {
        ...result.output,
        image_url
      })
    }

  } catch (error) {
    console.log(error)
  }
}



export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
    
    
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
    
}