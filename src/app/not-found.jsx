import Link from "next/link";
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="error-content-area my-5">
            <h1 className="error-heading text-orange-400">404 Error</h1>
            <Image width={800} height={400} className="error-img py-10" src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="File Not Found" />
            <div className="error-content pt-8 text-gray-400">
                <h3 className="text-xl font-bold">Are you&apos;re lost?</h3>
                <p>It looks like nothing was found at this location.</p>
                <Link href="/" className="error-button font-semibold rounded-lg">Go to Home</Link>
            </div>
        </div>
    )
}
