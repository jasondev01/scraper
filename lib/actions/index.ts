'use server'

import { revalidatePath } from "next/cache"
import Product from "../models/product"
import { connectToDB } from "../mongoose"
import { scrapeAmazonProduct } from "../scraper"
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils"

export async function Scrape(url: string) {
    if(!url) return

    try {
        connectToDB()

        const scrapeProduct = await scrapeAmazonProduct(url)

        if (!scrapeProduct) return;

        let product = scrapeProduct

        const existingProduct = await Product.findOne({ url: scrapeProduct.url })

        if(existingProduct) {
            const updatePriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapeProduct.currentPrice }
            ]

            product = {
                ...scrapeProduct,
                priceHistory: updatePriceHistory,
                lowestPrice: getLowestPrice(updatePriceHistory),
                highestPrice: getHighestPrice(updatePriceHistory),
                averagePrice: getAveragePrice(updatePriceHistory)
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapeProduct.url, },
            product, 
            { upsert: true, new: true }
        )

        // revalidatePath(`/products/${newProduct._id}`)

        console.log({newProduct})
    } catch (error: any) {
        throw new Error(`Failed to scrape: ${error.message}`)
    }
}

// wip