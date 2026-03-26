import { useAppDispatch, useAppSelector } from "@/state/hooks";

import Error from "@/components/Error";
import Loader from "@/components/Loader/Loader";
import { fetchGuests } from "@/state/slices/guestsSlice";
import { useEffect } from "react";

const GuestsTable = () => {
    const { guests, isLoading, error } = useAppSelector(state => state.guests);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchGuests());
    }, [dispatch]);

    if(isLoading) return <Loader />;
    if(error) return <Error message={error.message} />

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 border-collapse hidden md:table">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-gray-300 text-center">Имя</th>
                        <th className="px-4 py-2 border border-gray-300 text-center">Прийдет(да/нет)</th>
                        <th className="px-4 py-2 border border-gray-300 text-center">Комментарий</th>
                        <th className="px-4 py-2 border border-gray-300 text-center">Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map(guest => (
                        <tr key={guest.id} className="border-t">
                            <td className="px-4 py-2 border border-gray-300 text-center">{guest.name}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{guest.isCome ? "Да" : "Нет"}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{guest.comment || "-"}</td>
                            <td className="px-4 py-2 border border-gray-300 text-center">{new Date(guest.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Карточки для мобайла */}
            <div className="flex flex-col gap-4 md:hidden">
                {guests.map((guest) => (
                    <div
                        key={guest.id}
                        className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray"
                    >
                        <p><span className="font-semibold">Имя:</span> {guest.name}</p>
                        <p><span className="font-semibold">Прийдет:</span> {guest.isCome ? "Да" : "Нет"}</p>
                        <p><span className="font-semibold">Комментарий:</span> {guest.comment || "-"}</p>
                        <p><span className="font-semibold">Дата:</span> {new Date(guest.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GuestsTable;