"use client"

const unEnroll = (id: number) => {
    alert(`Unenrolling from club ${id}`);
}

export default function UnenrollButton(club: { id: number }) {
    return (
        <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            onClick={() => unEnroll(club.id)}
        >
            Unenroll
        </a>
    );
}
