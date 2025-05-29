"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteTripButton({ tripId }: { tripId: string }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/trips/${tripId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                router.push('/trips');
                router.refresh();
            } else {
                const data = await response.json();
                console.error('Error deleting trip:', data.error);
                alert('Failed to delete trip. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting trip:', error);
            alert('Failed to delete trip. Please try again.');
        } finally {
            setIsDeleting(false);
            setShowConfirmation(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowConfirmation(true)}
                className="text-red-500 hover:text-red-600"
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete Trip'}
            </button>

            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Delete Trip</h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this trip? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-700"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
