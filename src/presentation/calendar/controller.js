import { EventService } from "../../services/dao/mongo/services/event.service.js";

export class CalendarController {
  static getEvents = async (req, res) => {
    try {
        const events = await EventService.getEvents()
        res.json({
          ok: true,
          evento: events,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'internal server error'})
    }
  };
  static createEvent = async (req, res) => {
    const reqEvent = req.body;
    const uid = req.uid

    try {
        console.log(uid);
      const newEvent = await EventService.createEvent(reqEvent, uid);

      console.log(newEvent);
      res.json({
        ok: true,
        evento:newEvent,
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'internal server error'})
    }
  };
  static updateEvents = async (req, res) => {

    const event = req.body
    const id = req.params.id

    const uid = req.uid

    try {

        const updateEvent = await EventService.updateEvent(event, id, uid)
        
        res.json({
          ok: true,
          evento: updateEvent,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok:false, msg: 'internal server error'})
    }
  };
  static deleteEvents = async (req, res) => {
    const id = req.params.id

    const uid = req.uid
    try {
        const deleteEvent = await EventService.updateEvent(id, uid)
        res.json({
          ok: true,
          evento: updateEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'internal server error'})
    }
  };
}
