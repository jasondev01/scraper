'use client'

import { Scrape } from "@/lib/actions"
import { FormEvent, useState } from "react"

const isValidUrl = (url: string) => {
    try {
        const parsedUrl = new URL(url)
        const hostname = parsedUrl.hostname

        if( 
            hostname.includes('amazon.com') || 
            hostname.includes('amazon') || 
            hostname.endsWith('amazon') ||
            hostname.endsWith('embtaku.pro') ||
            hostname.endsWith('embtaku') ||
            hostname.endsWith('gogohd.net') ||
            hostname.endsWith('gogohd') 
        ) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

export default function Searchbar() {
    const [ searchInput, setSearchInput ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isValidLink = isValidUrl(searchInput) 

        if(!isValidLink) return alert('Provide valid amazon link')

        try {
            setIsLoading(true)

            // scrape
            const product = await Scrape(searchInput)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form 
            className="flex flex-wrap gap-4 mt-12" 
            onSubmit={handleSubmit}
        > 
            <input 
                type="text"
                placeholder="Enter product link"
                className="searchbar-input"
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <button 
                type="submit" 
                className="searchbar-btn"
                disabled={isLoading || searchInput === ''}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}
