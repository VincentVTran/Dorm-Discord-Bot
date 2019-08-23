const { database } = require('./database');

var driver = new database();
//driver.addRoom("VincentTran","1004")
driver.getRoom("VincentTran");