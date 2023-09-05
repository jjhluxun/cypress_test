function newData(length){
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i)
    result += str[Math.floor(Math.random() * str.length)];
  return result;
}

module.exports =
    {
        companyName: `自动化测试租户${newData(6)}`,
        positions:
    [{
    buildingId: "b867fe69e76b11ea963d0242ac1c0002",
    buildingName: "T1",
    floorId: "4ff401c8e76c11ea963d0242ac1c0032",
    floorName: "L5"
}, {
    buildingId: "b867fe69e76b11ea963d0242ac1c0001",
    buildingName: "T2",
    floorId: "4ff401c8e76c11ea963d0242ac1c0003",
    floorName: "L6",
    area:`${newData(10)}`
}],
    travelPermit: true,
    flexibleSpacePermit: true,
    companyLegalPerson:"江军",
    invoiceInfos:
[{
    invoiceTitle: `自动化测试租户${newData(6)}`,
    taxpayerNo: `${newData(16)}`
}],
    totalParkingSpotCount: 1
}