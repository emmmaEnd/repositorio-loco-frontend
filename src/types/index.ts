import { object, string, number, boolean, Output, array, optional, nullable } from "valibot"


export const DraftProductSchema = object({
  name: string(),
  price: number()
})

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
  image_url: optional(nullable(string())) //  esta línea permite image_url como opcional
})

export const ProductsSchema = array(ProductSchema)
export type Product = Output<typeof ProductSchema>


