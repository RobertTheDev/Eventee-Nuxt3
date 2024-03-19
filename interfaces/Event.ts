import type DateTime from "./DateTime";
import type IEventVenue from "./EventVenue";

export default interface IEvent {
    _id: string;
    category: string;
    description: string;
    end: DateTime;
    imageUrl: string;
    slug: string;
    start: DateTime;
    title: string;
    type: string;
    venue: IEventVenue;
}
