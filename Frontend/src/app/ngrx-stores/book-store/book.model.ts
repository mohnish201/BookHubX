
export interface BooksI {
    _id: String,
    ISBN: number,
    title: String,
    author: String,
    summary: String,
    image: String,
    price: Price
    category: String
}

export interface Price{
    value:Number,
    currency:String,
    displayValue:String
}