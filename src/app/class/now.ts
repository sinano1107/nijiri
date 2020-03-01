export class Now {
  id: string;
  uid: string;
  campusId: number;
  time: number;

  constructor(id: string, uid: string, campusId: number, time: number) {
    this.id = id;
    this.uid = uid;
    this.campusId = campusId;
    this.time = time;
  }
}
