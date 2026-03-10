import Time "mo:core/Time";
import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Location "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Event = {
    id : Text;
    title : Text;
    description : Text;
    date : ?Text;
    location : ?Text;
    image : Location.ExternalBlob;
    review : Text;
    createdAt : Int;
  };

  module Event {
    public func compareByTime(a : Event, b : Event) : Order.Order {
      Int.compare(a.createdAt, b.createdAt);
    };
  };

  let events = Map.empty<Text, Event>();

  func compareByTime(a : Event, b : Event) : Order.Order {
    Int.compare(a.createdAt, b.createdAt);
  };

  public shared ({ caller }) func createEvent(id : Text, title : Text, description : Text, date : ?Text, location : ?Text, image : Location.ExternalBlob, review : Text) : async () {
    if (events.containsKey(id)) {
      Runtime.trap("Event with this ID already exists");
    };

    let newEvent : Event = {
      id;
      title;
      description;
      date;
      location;
      image;
      review;
      createdAt = Time.now();
    };

    events.add(id, newEvent);
  };

  public query ({ caller }) func listEvents() : async [Event] {
    events.values().toArray().sort(compareByTime);
  };
};
