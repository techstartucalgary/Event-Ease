import Image from "next/image";
import { Attendee } from "../types";

interface AttendeeCardProps {
    attendee: Attendee;
    onMessageClick: (attendee: Attendee) => void;
}

export default function AttendeeCard({
    attendee,
    onMessageClick,
}: AttendeeCardProps) {
    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                    {attendee.avatar ? (
                        <Image
                            src={attendee.avatar}
                            alt={attendee.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-background text-foreground">
                            <i className="fas fa-user"></i>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-grow">
                <h3 className="font-medium text-gray-900">{attendee.name}</h3>
                <p className="text-sm text-gray-500">{attendee.role}</p>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    {attendee.team && (
                        <p className="text-sm font-medium text-surface">
                            {attendee.team}
                        </p>
                    )}
                    {attendee.checkInTime && (
                        <p className="text-xs text-gray-500">
                            Checked in: {attendee.checkInTime}
                        </p>
                    )}
                </div>
                <button
                    onClick={() => onMessageClick(attendee)}
                    className="p-2 text-surface hover:bg-blue-50 rounded-full 
                            transition-all duration-200 active:scale-95"
                    aria-label={`Message ${attendee.name}`}
                >
                    <i className="fas fa-comment-alt"></i>
                </button>
            </div>
        </div>
    );
}
