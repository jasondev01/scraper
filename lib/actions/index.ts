'use server'

import { scrapeAmazonProduct } from "../scraper"

export async function Scrape(url: string) {
    if(!url) return

    try {
        const scrapeProduct = await scrapeAmazonProduct(url)

        if (!scrapeProduct) return;

        console.log({scrapeProduct})
        
    } catch (error: any) {
        throw new Error(`Failed to scrape: ${error.message}`)
    }
}

// wip