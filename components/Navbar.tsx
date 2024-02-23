import Image from "next/image";
import Link from "next/link";

const navIcons = [
    { src: '/assets/icons/search.svg', alt: 'search' },
    { src: '/assets/icons/black-heart.svg', alt: 'black-heart' },
    { src: '/assets/icons/user.svg', alt: 'user' },
]

export default function Navbar() {
    return (
        <header className="w-full ">
            <nav className="nav">
                <Link href="/" className="flex items-center gap-1">
                    <Image 
                        src='/assets/icons/logo.svg'
                        alt="Website Logo"
                        height={27}
                        width={27}
                    />

                    <p className="nav-logo">
                        Price<span className="text-primary">Nope</span>
                    </p>
                </Link>
                <div className="flex items-center gap-5">
                    {navIcons.map((icon) => (
                        <Image 
                            key={icon.alt}
                            src={icon.src}
                            alt={icon.alt}
                            height={28}
                            width={28}
                            className="object-contain"
                        />
                    ))}
                </div>
            </nav>
        </header>
    )
}
