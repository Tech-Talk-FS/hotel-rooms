// [(1,5), (2,4), (6,8), (7,7)].
//[1,2,1,2], [1,2,2,1], [2,1,2,1], [2,1,1,2]

function allocateRooms(customers) {
  // Write code here

  const allocateRooms = [];
  const roomSchedules = [
    //index = room nmber
    //the days scheduled
    //the start and end date of block
  ];
  let i = 0;
  function pickRoom() {
    if (i === customers.length) {
      i--;
      return allocateRooms;
    }
    const [cs, ce] = customers[i];
    i++;
    let found = false;
    for (let r = 0; r < roomSchedules.length; r++) {
      let available = true;
      console.log(r, roomSchedules);
      for (const [s, e] of roomSchedules[r]) {
        //do the rooms colflict
        if (ce <= s || e <= cs) available = false;
      }
      if (available) {
        found = true;
        allocateRooms.push(r);
        roomSchedules[r].push([cs, ce]);
        const allocations = pickRoom();
        return allocations;
      }
    }
    if (!found) {
      allocateRooms.push(roomSchedules.length);
      roomSchedules.push([[cs, ce]]);
      return pickRoom();
    }
  }
  return pickRoom().map((v) => v + 1);
}

const rooms = allocateRooms([
  [1, 5],
  [2, 4],
  [6, 8],
  [7, 7],
]);

console.log(rooms);
