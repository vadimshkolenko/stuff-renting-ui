export interface Deal {
  AddId: number
  createdAt: string
  dateEnd: string
  dateStart: string
  id: number
  landlordId: number
  name: string
  price: number
  renterId: number
  status: string
  updatedAt: string
}

export type Role = 'landlord' | 'renter'
