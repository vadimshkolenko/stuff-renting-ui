export interface Image {
  AddId: number
  createdAt: string
  destination: string
  encoding: string
  fieldname: string
  filename: string
  id: number
  mimetype: string
  originalname: string
  path: string
  size: number
  updatedAt: string
}

export interface Ad {
  Images: Array<Image>
  UserId: number
  assessedValue: number
  createdAt: string
  deposit: number
  description: string
  id: number
  name: string
  price: number
  updatedAt: string
}
