"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

type CustomEvent = {
  title: string;
  start: Date;
  end: Date;
  desc?: string;
};

const ItineraryPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);

  // We split the AI Hackathon into two separate events because react-big-calendar 
  // only displays events on the time grid in 'day' view if they start and end on the same day.
  // Multi-day events show as all-day entries instead, which is not what we want for visibility.
  const events: CustomEvent[] = [
    {
      title: "AI Hackathon - Day 1",
      start: new Date(2025, 3, 5, 9, 0),
      end: new Date(2025, 3, 5, 23, 59),
      desc: "Kickoff sessions and team formation.",
    },
    {
      title: "AI Hackathon - Day 2",
      start: new Date(2025, 3, 6, 0, 0),
      end: new Date(2025, 3, 6, 23, 0),
      desc: "Hacking, demos, and closing ceremony.",
    },
  ];

  type ItineraryItem = {
    time: string;
    activity: string;
  };

  const itinerary: Record<string, ItineraryItem[]> = {
    "April 5, 2025": [
      { time: "9:30 AM", activity: "Opening Remarks" },
      { time: "12:00 PM", activity: "Lunch" },
      { time: "2:00 PM", activity: "Workshop: Intro to AI" },
      { time: "5:00 PM", activity: "Team Formation" },
    ],
    "April 6, 2025": [
      { time: "9:00 AM", activity: "Hacking Begins" },
      { time: "12:00 PM", activity: "Lunch" },
      { time: "3:00 PM", activity: "Project Presentations" },
      { time: "5:00 PM", activity: "Closing Ceremony" },
    ],
  };

  const exportToGoogleCalendar = () => {
    const formatDate = (date: Date) => moment(date).utc().format("YYYYMMDDTHHmmss[Z]");
  
    const title = "AI Hackathon";
    const start = events[0].start;
    const end = events[events.length - 1].end;
  
    // Combine event descriptions
    const eventDescriptions = events
      .map((event, index) => `Day ${index + 1}: ${event.desc || ""}`)
      .join("\n");
  
    // Combine itinerary details
    const itineraryDetails = Object.entries(itinerary)
      .map(([date, items]) => {
        const dayBlock = [`\n${date}`];
        items.forEach((item) => {
          dayBlock.push(`• ${item.time} - ${item.activity}`);
        });
        return dayBlock.join("\n");
      })
      .join("\n");
  
    const description = `${eventDescriptions}\n\nItinerary:\n${itineraryDetails}`;
  
    const link = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent(description)}`;
  
    window.open(link, "_blank");
  };


  return (
    <div className="container mx-auto p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Event Itinerary</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600">
          Time zone: <strong>{Intl.DateTimeFormat().resolvedOptions().timeZone}</strong>
        </div>
        <div className="flex gap-4">
        <button
            onClick={exportToGoogleCalendar}
            className="bg-[#768a96] text-white px-4 py-2 rounded hover:bg-[#627885]"
            >
            Add to Google Calendar
        </button>
        </div>
      </div>

      <div className="mb-8">
        <Calendar
          localizer={localizer}
          events={events}
          defaultView={Views.WEEK}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="bg-white shadow-lg rounded-lg p-4"
          tooltipAccessor="desc"
          onSelectEvent={(event: CustomEvent) => setSelectedEvent(event)}

        />
      </div>

      {/* Modal for event click */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {moment(selectedEvent.start).format("MMM D, YYYY h:mm A")} –{" "}
              {moment(selectedEvent.end).format("h:mm A")}
            </p>
            {selectedEvent.desc && <p className="text-gray-700 mb-4">{selectedEvent.desc}</p>}
            <button className="bg-[#768a96] text-white px-4 py-2 rounded hover:bg-[#627885]">
              See More Info
            </button>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Detailed Schedule</h2>
        <div className="overflow-x-auto">
          {/* This is the detailed itinerary table displayed below the calendar.
              The number of columns dynamically matches the number of days in the event,
              with each column representing one day and its scheduled items. */}
          <table className="table-auto w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Time</th>
                {Object.keys(itinerary).map((date) => (
                  <th key={date} className="border border-gray-300 px-4 py-2">
                    {date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(itinerary)[0].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {Object.values(itinerary)[0][index].time}
                  </td>
                  {Object.keys(itinerary).map((date) => (
                    <td key={date} className="border border-gray-300 px-4 py-2">
                      {itinerary[date][index]?.activity || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
